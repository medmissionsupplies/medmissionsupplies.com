"""Run from an uploaded, tested release with sudo. Scoped, backed-up proxy integration."""
from pathlib import Path
import datetime, fcntl, hashlib, json, shutil, subprocess, urllib.request

HERE=Path(__file__).resolve().parent
ROOT=Path('/opt/first-party-metrics')
NAMES=['thepracticalbible.com','medmissionsupplies.com','missionary-doctors','meetingstoneai.com','personalitytestai.com','psychologytestai.com']
def run(*args):return subprocess.run(args,check=True,capture_output=True,text=True).stdout
def blocks(text):
    import re
    for m in re.finditer(r'(?m)^server\s*\{',text):
        depth=1;i=m.end()
        while depth and i<len(text):
            if text[i]=='{':depth+=1
            elif text[i]=='}':depth-=1
            i+=1
        assert depth==0
        yield m.start(),i,text[m.start():i]

lock=open('/var/lock/first-party-metrics-install.lock','w');fcntl.flock(lock,fcntl.LOCK_EX)
stamp=datetime.datetime.now(datetime.timezone.utc).strftime('%Y%m%dT%H%M%SZ')
release=ROOT/'releases'/stamp;release.mkdir(parents=True)
backup=ROOT/'backups'/stamp;backup.mkdir(parents=True)
for name in ['server.py','client.js','nginx.conf','first-party-metrics.service','test_server.py']:
    shutil.copy2(HERE/name,release/name)
run('python3','-m','unittest','discover','-s',str(release),'-p','test_server.py')
changes=[]
for name in NAMES:
    path=Path('/etc/nginx/sites-enabled')/name
    text=path.read_text()
    candidates=[(a,b,content) for a,b,content in blocks(text) if ('proxy_pass http://127.0.0.1:300' in content or 'current;' in content)]
    assert len(candidates)==1,(name,'ambiguous application block')
    a,b,content=candidates[0]
    if 'include /opt/first-party-metrics/current/nginx.conf;' not in content:
        first=content.index('{')+1
        new=content[:first]+'\n    include /opt/first-party-metrics/current/nginx.conf;\n'+content[first:]
        changes.append((path,text,text[:a]+new+text[b:]))
    shutil.copy2(path,backup/name)
current=ROOT/'current';previous=current.resolve() if current.exists() else None
unit=Path('/etc/systemd/system/first-party-metrics.service')
if unit.exists():shutil.copy2(unit,backup/unit.name)
try:
    temp=ROOT/'next';temp.symlink_to(release);temp.replace(current)
    shutil.copy2(release/'first-party-metrics.service',unit)
    run('systemctl','daemon-reload')
    run('systemctl','enable','--now','first-party-metrics.service')
    run('systemctl','restart','first-party-metrics.service')
    import time
    for attempt in range(20):
        try:
            with urllib.request.urlopen('http://127.0.0.1:3196/health',timeout=2) as r:assert r.status==200
            break
        except Exception:
            if attempt==19:raise
            time.sleep(.3)
    for path,old,new in changes:path.write_text(new)
    run('nginx','-t');run('systemctl','reload','nginx')
    receipt={'installed_at':stamp,'release':str(release),'backup':str(backup),'hosts':NAMES,'private_listener':'127.0.0.1:3196','public_report_endpoint':False,'sha256':{n:hashlib.sha256((release/n).read_bytes()).hexdigest() for n in ['server.py','client.js']}}
    (release/'receipt.json').write_text(json.dumps(receipt,indent=2))
    print(json.dumps(receipt))
except Exception:
    for path,old,new in changes:path.write_text(old)
    if previous:
        temp=ROOT/'rollback';temp.symlink_to(previous);temp.replace(current)
        if (backup/unit.name).exists():shutil.copy2(backup/unit.name,unit)
        run('systemctl','daemon-reload');run('systemctl','restart','first-party-metrics.service')
    else:run('systemctl','stop','first-party-metrics.service')
    run('nginx','-t');run('systemctl','reload','nginx')
    raise
