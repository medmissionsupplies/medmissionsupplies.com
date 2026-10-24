/* Daily first-party totals. Never sends queries, answers, scores, contacts or visitor IDs. */
(() => {
  'use strict';
  if (window.__siteMetricsInstalled) return;
  const sites = {'thepracticalbible.com':'bible','medmissionsupplies.com':'mms','missionarydoctors.com':'doctors','meetingstoneai.com':'meetingstone','personalitytestai.com':'personality','psychologytestai.com':'psychology'};
  const host = location.hostname.replace(/^www\./,'');
  const site = sites[host];
  if (!site) return; // Includes Pairbond, previews and localhost.
  window.__siteMetricsInstalled = true;
  const storage = {get(k){try{return sessionStorage.getItem(k)}catch{return null}},set(k,v){try{sessionStorage.setItem(k,v)}catch{}}};
  const q = new URLSearchParams(location.search);
  let internal = q.get('traffic_test') === '1' || /(?:qa|test)(?:_|-|$)/i.test(q.get('utm_campaign')||'') || navigator.webdriver === true;
  try {
    if (q.get('traffic_test') === '0') localStorage.removeItem('site-metrics-internal');
    if (internal) localStorage.setItem('site-metrics-internal','1');
    internal = internal || localStorage.getItem('site-metrics-internal') === '1';
  } catch { /* Explicit QA stays excluded for this page even without storage. */ }
  if (internal) {
    // An informational label must not intercept navigation or discard in-progress answers.
    // End testing explicitly with ?traffic_test=0 after the current task is finished.
    const badge = document.createElement('div');
    badge.textContent = 'Internal test mode · excluded';
    badge.style.cssText='position:fixed;top:4px;right:4px;z-index:2147483646;pointer-events:none;background:#112a35;color:#fff;padding:3px 6px;border-radius:4px;font:10px system-ui;box-shadow:0 2px 8px #0005';
    document.body.appendChild(badge);
  }
  const permitted = () => navigator.doNotTrack !== '1' && navigator.globalPrivacyControl !== true;
  function safePath(path) {
    if (!/^\/[a-z0-9/_-]*(?:\.html)?$/.test(path) || path.length > 240) return '/other';
    path = path.replace(/\/$/,'') || '/';
    if (/\/(api|admin|profile|account|results|preview|playground)(\/|$)/.test(path)) return '/other';
    if (['personality','psychology'].includes(site) && !['/','/privacy','/how-it-works'].includes(path)) return '/other';
    if (site==='meetingstone' && !['/','/privacy-policy','/terms-of-use'].includes(path)) return '/other';
    return path==='/index.html'?'/':path;
  }
  function article(path) {
    return site==='bible' ? /^\/(question|positive-news)\/[^/]+$|^\/read\/[^/]+\/\d+$/.test(path) :
      site==='mms' ? /^\/resources\/[^/]+$/.test(path) :
      site==='doctors' ? /^\/news\/(?!archive$|editorial-policy$|hospital-updates$)[^/]+$/.test(path) : false;
  }
  function incomingSource() {
    const medium=(q.get('utm_medium')||'').toLowerCase(), src=(q.get('utm_source')||'').toLowerCase();
    if (/^(cpc|ppc|paid_social|paid)$/.test(medium)) return src==='google'?'google_paid':/^(facebook|instagram|meta)$/.test(src)?'meta_paid':'other_paid';
    if (/^(facebook|instagram|linkedin)$/.test(src) && medium==='organic_social') return src+'_organic';
    let ref=''; try{ref=new URL(document.referrer).hostname.replace(/^www\./,'')}catch{}
    if (ref===host) return null;
    if (sites[ref]) return 'owned_referral';
    if (/(^|\.)(google\.[a-z.]+|bing\.com|duckduckgo\.com|search\.yahoo\.com)$/.test(ref)) return 'search_organic';
    if (/(^|\.)(facebook|instagram|linkedin)\.com$/.test(ref)) return ref.includes('facebook')?'facebook_organic':ref.includes('instagram')?'instagram_organic':'linkedin_organic';
    return ref?'referral_other':null;
  }
  let source='direct_unknown', visit;
  try{visit=JSON.parse(storage.get('site-metrics-visit')||'null')}catch{}
  const incoming=incomingSource(), isNew=!visit || Date.now()-visit.at>1800000 || (incoming && incoming!==visit.source);
  if (!isNew) source=visit.source;
  if (incoming) source=incoming;
  function touch(){storage.set('site-metrics-visit',JSON.stringify({at:Date.now(),source}));}
  let current=safePath(location.pathname), seconds=0, interacted=false, engaged=false;
  let delivered=new Set(), routeKey=location.pathname, viewStarted=false;
  const lastClick=new Map();
  function send(event,target='none',path=current) {
    if (!permitted() || current==='/other') return;
    let receipt; try {receipt=crypto.randomUUID()} catch{return}
    const body=JSON.stringify({event,target,page:path,source,quality:internal?'test':'visitor',receipt});
    const attempt=(n)=>fetch('/__metrics/v1/event',{method:'POST',headers:{'Content-Type':'text/plain'},body,credentials:'omit',referrerPolicy:'no-referrer',keepalive:true,signal:AbortSignal.timeout(8000)})
      .then(r=>{if(!r.ok && n<1) setTimeout(()=>{if(permitted())attempt(n+1)},1500)})
      .catch(()=>{if(n<1)setTimeout(()=>{if(permitted())attempt(n+1)},1500)});
    void attempt(0); touch();
  }
  function once(event){if(delivered.has(event))return;delivered.add(event);send(event)}
  function view(){
    if(document.visibilityState!=='visible'||viewStarted)return;
    viewStarted=true; send('page_view'); if(article(current))send('article_view');
  }
  function route(){
    if(location.pathname===routeKey)return;
    routeKey=location.pathname;current=safePath(routeKey);seconds=0;interacted=false;engaged=false;viewStarted=false;delivered=new Set();view();
  }
  for(const name of ['pushState','replaceState']){
    const original=history[name];history[name]=function(...args){const result=original.apply(this,args);queueMicrotask(route);return result;};
  }
  addEventListener('popstate',route);
  document.addEventListener('visibilitychange',view);
  for(const name of ['pointerdown','keydown','scroll'])addEventListener(name,e=>{if(e.isTrusted)interacted=true},{passive:true});
  setInterval(()=>{
    if(document.visibilityState==='visible'&&document.hasFocus())seconds++;
    if(!engaged&&seconds>=60&&interacted){engaged=true;once('engaged_visit');if(article(current))once('engaged_article');}
  },1000);
  document.addEventListener('click',e=>{
    if(!e.isTrusted)return;
    const el=e.target instanceof Element?e.target.closest('a,button,[data-metric]'):null;
    if(!el || el.textContent?.includes('Internal test mode'))return;
    const action=el.getAttribute('data-metric');
    if(action==='share_click'||/^Share this article/i.test(el.getAttribute('aria-label')||'')||(el.tagName==='BUTTON'&&/^(share|copy link|copy article link|copy post text|more apps)/i.test(el.textContent.trim()))){send('share_click','share');return;}
    if(el.tagName!=='A')return;
    let url;try{url=new URL(el.getAttribute('href'),location.href)}catch{return;}
    let target='external',event='outbound_click';
    if(url.protocol==='tel:')target='phone';
    else if(url.protocol==='mailto:')target='email';
    else if(!['http:','https:'].includes(url.protocol))return;
    else if(url.hostname.replace(/^www\./,'')===host){
      if(url.pathname===location.pathname&&url.hash)return;
      target=safePath(url.pathname);event=article(target)?'article_click':'link_click';
      if(site!=='meetingstone'&&/^\/(contact|inquiry|apply)(\.html)?\/?$/.test(url.pathname))event='cta_click';
    } else if(/^(apps\.apple\.com|play\.google\.com)$/.test(url.hostname)){target='app_store';event='app_store_click';}
    else if(sites[url.hostname.replace(/^www\./,'')]){target='site:'+sites[url.hostname.replace(/^www\./,'')];event='cta_click';}
    else if(/(^|\.)(facebook|twitter|linkedin|whatsapp)\.com$/.test(url.hostname) && /share|intent/i.test(url.pathname)){target='share';event='share_click';}
    const key=event+target;
    if(Date.now()-(lastClick.get(key)||0)<1500)return;
    lastClick.set(key,Date.now());send(event,target);
    if(site==='doctors'&&/^\/(hospitals|apply)(\/|$)/.test(current)&&event==='outbound_click'&&seconds>=60&&interacted)once('pathway_click');
  },true);
  const outcomes=new Set(['test_started','first_answer','test_completed','profile_saved','existing_profile_loaded','report_preview','email_verified','report_viewed','report_linked','inquiry_accepted']);
  addEventListener('site-metric',e=>{const event=e.detail;if(typeof event==='string'&&outcomes.has(event))once(event)});
  if(isNew)send('visit_start');
  view();
})();
