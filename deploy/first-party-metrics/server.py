"""First-party daily counters. No raw events, identities, IPs, cookies or query strings stored.

Public surface: one versioned script and write-only POST. Reports require SSH/local disk.
"""
import hashlib
import json
import os
import re
import sqlite3
import threading
import time
from contextlib import contextmanager
from datetime import datetime, timedelta, timezone
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import urlsplit

HOSTS = {"thepracticalbible.com": "bible", "medmissionsupplies.com": "mms",
         "missionarydoctors.com": "doctors", "meetingstoneai.com": "meetingstone",
         "personalitytestai.com": "personality", "psychologytestai.com": "psychology"}
SOURCES = {"direct_unknown", "google_paid", "meta_paid", "other_paid", "search_organic",
           "facebook_organic", "instagram_organic", "linkedin_organic", "social_other", "owned_referral", "referral_other"}
EVENTS = {"page_view", "visit_start", "article_view", "engaged_visit", "engaged_article",
          "link_click", "article_click", "cta_click", "outbound_click", "share_click", "app_store_click",
          "test_started", "first_answer", "test_completed", "profile_saved", "existing_profile_loaded",
          "report_preview", "email_verified", "report_viewed", "report_linked",
          "inquiry_accepted", "pathway_click"}
SITE_EVENTS = {
    "personality": {"test_started", "first_answer", "test_completed", "profile_saved", "existing_profile_loaded", "report_preview", "email_verified", "report_viewed", "report_linked"},
    "psychology": {"test_started", "first_answer", "test_completed", "profile_saved", "existing_profile_loaded", "report_preview", "email_verified", "report_viewed", "report_linked"},
    "mms": {"inquiry_accepted"}, "doctors": {"pathway_click"}}
SPECIAL = set().union(*SITE_EVENTS.values())
BOT = re.compile(r"bot|crawler|spider|headless|lighthouse|facebookexternalhit|preview|curl|python|wget|uptime", re.I)
SAFE_PATH = re.compile(r"^/[a-z0-9/_-]*(?:\.html)?$")
RECEIPT = re.compile(r"^[0-9a-f-]{36}$")

def canonical_host(host):
    return host.lower().removeprefix("www.")

def page(site, value):
    if not isinstance(value, str) or len(value) > 240 or not SAFE_PATH.fullmatch(value):
        raise ValueError("invalid public page")
    value = value.rstrip("/") or "/"
    if value == "/index.html": value = "/"
    if site in {"personality", "psychology"}:
        return value if value in {"/", "/privacy", "/how-it-works"} else "/other"
    if site == "meetingstone":
        return value if value in {"/", "/inquiry", "/privacy-policy", "/terms-of-use"} else "/other"
    if any(x in value.split("/") for x in ["api", "admin", "profile", "account", "results", "preview", "playground"]):
        return "/other"
    if site == "bible":
        if re.fullmatch(r"/(question|positive-news)/[a-z0-9-]+", value) or re.fullmatch(r"/read/[a-z0-9-]+/\d{1,3}", value): return value
        return value if value in {"/", "/library", "/library/illustrated", "/top-100", "/controversial", "/read", "/question", "/positive-news", "/about", "/privacy", "/needs", "/project", "/submit"} else "/other"
    if site == "mms":
        value = value.removesuffix("/index.html")
        if value in {"/offerings", "/articles", "/contact", "/services", "/about", "/employment", "/measurement"}: value += ".html"
        if re.fullmatch(r"/(resources|equipment)/[a-z0-9-]+(?:\.html)?", value):
            return value if value.endswith(".html") else value + ".html"
        return value if value in {"/", "/index.html", "/contact.html", "/equipment.html", "/services.html", "/about.html", "/careers.html", "/learn.html", "/privacy.html", "/offerings.html", "/articles.html", "/employment.html", "/measurement.html"} else "/other"
    if site == "doctors":
        if re.fullmatch(r"/(news|hospitals|needs)/[a-z0-9-]+", value): return value
        return value if value in {"/", "/hospitals", "/news", "/needs", "/about", "/contact", "/apply", "/privacy"} else "/other"
    raise ValueError("unknown site")

def validate(host, origin, payload, ua="", dnt="", gpc=""):
    host = canonical_host(host)
    if host not in HOSTS or origin not in {"https://"+host, "https://www."+host}: raise ValueError("origin")
    if dnt == "1" or gpc == "1" or BOT.search(ua): return None
    if not isinstance(payload, dict) or set(payload) != {"page", "target", "source", "event", "quality", "receipt"}: raise ValueError("schema")
    site = HOSTS[host]
    if payload["event"] not in EVENTS or payload["source"] not in SOURCES or payload["quality"] not in {"visitor", "test"}: raise ValueError("enum")
    if payload["event"] in SPECIAL and payload["event"] not in SITE_EVENTS.get(site, set()): raise ValueError("site event")
    if not isinstance(payload["receipt"], str) or not RECEIPT.fullmatch(payload["receipt"]): raise ValueError("receipt")
    target = payload["target"]
    if target not in {"none", "external", "app_store", "phone", "email", "share", *["site:"+s for s in HOSTS.values()]}:
        target = page(site, target)
    return (site, page(site, payload["page"]), target, payload["source"], payload["event"], payload["quality"], payload["receipt"])

class Store:
    def __init__(self, path):
        self.path = path
        self.lock = threading.Lock()
        self.rate = {}
        with self.connect() as db:
            db.executescript('''PRAGMA journal_mode=WAL;
              CREATE TABLE IF NOT EXISTS counts(day TEXT,site TEXT,page TEXT,target TEXT,source TEXT,event TEXT,quality TEXT,n INTEGER,
                PRIMARY KEY(day,site,page,target,source,event,quality));
              CREATE TABLE IF NOT EXISTS receipts(digest TEXT PRIMARY KEY,expires INTEGER);
              CREATE TABLE IF NOT EXISTS metadata(key TEXT PRIMARY KEY,value TEXT);
              ''')
            db.execute("INSERT OR IGNORE INTO metadata VALUES('started_at',?)", (datetime.now(timezone.utc).isoformat(),))
    @contextmanager
    def connect(self):
        db = sqlite3.connect(self.path, timeout=10)
        try:
            with db: yield db
        finally: db.close()
    def record(self, row, now=None):
        now = now or datetime.now(timezone.utc)
        site, path, target, source, event, quality, receipt = row
        digest = hashlib.sha256((site+":"+receipt).encode()).hexdigest()
        with self.lock, self.connect() as db:
            minute = int(now.timestamp()) // 60
            key = (site, minute)
            self.rate = {k:v for k,v in self.rate.items() if k[1] >= minute-1}
            if self.rate.get(key, 0) >= 1200: return False
            db.execute("DELETE FROM receipts WHERE expires < ?", (int(now.timestamp()),))
            if db.execute("SELECT 1 FROM receipts WHERE digest=?", (digest,)).fetchone(): return True
            self.rate[key] = self.rate.get(key,0)+1
            db.execute("INSERT INTO receipts VALUES(?,?)", (digest, int(now.timestamp())+10800))
            db.execute("INSERT INTO counts VALUES(?,?,?,?,?,?,?,1) ON CONFLICT(day,site,page,target,source,event,quality) DO UPDATE SET n=n+1", (now.date().isoformat(),site,path,target,source,event,quality))
            db.execute("DELETE FROM counts WHERE day < ?", ((now.date()-timedelta(days=89)).isoformat(),))
            return True
    def report(self):
        with self.connect() as db:
            keys = ["day","site","page","target","source","event","quality","count"]
            rows = [dict(zip(keys,r)) for r in db.execute("SELECT * FROM counts ORDER BY day,site,page")]
            return {"schema":1,"started_at":db.execute("SELECT value FROM metadata WHERE key='started_at'").fetchone()[0], "generated_at":datetime.now(timezone.utc).isoformat(), "timezone":"UTC", "rows":rows}

class Handler(BaseHTTPRequestHandler):
    def log_message(self, *args): pass
    def reply(self, status, body=b"", kind="application/json"):
        self.send_response(status)
        self.send_header("Content-Type", kind)
        self.send_header("Cache-Control", "no-store")
        self.send_header("X-Content-Type-Options", "nosniff")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)
    def do_GET(self):
        if self.path == "/__metrics/v1/client.js" and canonical_host(self.headers.get("Host", "")) in HOSTS:
            return self.reply(200, Path(__file__).with_name("client.js").read_bytes(), "application/javascript")
        if self.path == "/health": return self.reply(200, b'{"status":"ok","schema":1}')
        self.reply(404)
    def do_POST(self):
        if self.path != "/__metrics/v1/event": return self.reply(404)
        try:
            size = int(self.headers.get("Content-Length", "0"))
            if not 0 < size <= 1024: return self.reply(413)
            data = json.loads(self.rfile.read(size))
            row = validate(self.headers.get("Host", ""), self.headers.get("Origin", ""), data,
                           self.headers.get("User-Agent", ""), self.headers.get("DNT", ""), self.headers.get("Sec-GPC", ""))
            if row is None: return self.reply(204)
            if not self.server.store.record(row): return self.reply(429)
            self.reply(204)
        except (ValueError, TypeError, KeyError): self.reply(400)
        except Exception: self.reply(503)  # No request payload or identifying metadata in logs.

if __name__ == "__main__":
    path = os.environ.get("METRICS_DB", "/var/lib/first-party-metrics/counts.sqlite3")
    server = ThreadingHTTPServer(("127.0.0.1", int(os.environ.get("PORT", "3196"))), Handler)
    server.store = Store(path)
    server.serve_forever()
