import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import {readFileSync} from 'node:fs';
const code=readFileSync(process.env.METRICS_CLIENT_PATH || new URL('./client.js',import.meta.url),'utf8');
function harness({host='thepracticalbible.com',search='',dnt='0',stored={},path='/question/what-happens-after-death'}={}){
  const sent=[],elements=[],listeners={},domListeners={},timers=[],session=new Map(),local=new Map(Object.entries(stored));
  const location={hostname:host,pathname:path,search,href:`https://${host}${path}${search}`};
  const store=m=>({getItem:k=>m.get(k)??null,setItem:(k,v)=>m.set(k,v),removeItem:k=>m.delete(k)});
  const document={referrer:'',visibilityState:'visible',hasFocus:()=>true,body:{appendChild(el){elements.push(el)}},createElement:()=>({style:{}}),addEventListener:(n,f)=>domListeners[n]=f};
  class Element{closest(){return this}}
  const ctx={location,document,navigator:{doNotTrack:dnt},URL,URLSearchParams,sessionStorage:store(session),localStorage:store(local),crypto:{randomUUID:()=> 'aaaaaaaa-aaaa-4aaa-aaaa-aaaaaaaaaaaa'},AbortSignal:{timeout:()=>null},Element,Date,Set,Map,JSON,queueMicrotask:f=>f(),setTimeout:()=>{},setInterval:f=>timers.push(f),addEventListener:(n,f)=>listeners[n]=f,fetch:async(url,opt)=>{sent.push({url,...JSON.parse(opt.body)});return {ok:true}},history:{pushState(_s,_t,p){location.pathname=p},replaceState(_s,_t,p){location.pathname=p}}};
  ctx.window=ctx;vm.runInNewContext(code,ctx);
  return {sent,elements,ctx,listeners,domListeners,timers,local,Element};
}
test('untagged traffic counts article views without identity or raw query',()=>{
  const h=harness({search:'?email=secret&search=private'});
  assert.deepEqual(h.sent.map(x=>x.event),['visit_start','page_view','article_view']);
  assert.equal(h.sent[0].source,'direct_unknown');assert.ok(!JSON.stringify(h.sent).includes('secret'));
});
test('QA survives navigation and has a separate quality bucket',()=>{
  const h=harness({search:'?traffic_test=1&utm_medium=cpc&utm_source=google'});
  h.ctx.history.pushState(null,'','/library');
  assert.ok(h.sent.every(e=>e.quality==='test'));assert.equal(h.local.get('site-metrics-internal'),'1');
  assert.equal(h.sent.filter(e=>e.event==='page_view').length,2);
});
test('privacy signals and excluded Pairbond collect nothing',()=>{
  assert.equal(harness({dnt:'1'}).sent.length,0);
  assert.equal(harness({host:'pairbondai.com'}).sent.length,0);
});
test('MissionaryDoctors hides the QA badge while query and persisted QA visits remain excluded',()=>{
  for(const options of [{search:'?traffic_test=1'},{stored:{'site-metrics-internal':'1'}}]){
    const h=harness({host:'missionarydoctors.com',path:'/apply',...options});
    h.ctx.history.pushState(null,'','/hospitals');
    assert.equal(h.elements.length,0);
    assert.ok(h.sent.length>0);
    assert.ok(h.sent.every(e=>e.quality==='test'));
    assert.equal(h.local.get('site-metrics-internal'),'1');
  }
});
test('Other sites retain their QA label and ordinary Doctors visitors remain visitors',()=>{
  for(const host of ['thepracticalbible.com','medmissionsupplies.com','meetingstoneai.com','personalitytestai.com','psychologytestai.com']){
    const h=harness({host,path:'/',search:'?traffic_test=1'});
    assert.equal(h.elements.length,1);
    assert.ok(h.sent.every(e=>e.quality==='test'));
  }
  const h=harness({host:'missionarydoctors.com',path:'/apply'});
  assert.equal(h.elements.length,0);
  assert.ok(h.sent.every(e=>e.quality==='visitor'));
});
test('engaged reading requires focused time AND trusted interaction',()=>{
  const h=harness();for(let i=0;i<61;i++)h.timers[0]();
  assert.ok(!h.sent.find(e=>e.event==='engaged_article'));
  h.listeners.pointerdown({isTrusted:true});h.timers[0]();h.timers[0]();
  assert.equal(h.sent.filter(e=>e.event==='engaged_article').length,1);
});
test('assessment milestones do not carry answers or repeat in the page',()=>{
  const h=harness({host:'personalitytestai.com',path:'/'});
  h.listeners['site-metric']({detail:'test_completed'});h.listeners['site-metric']({detail:'test_completed'});
  h.listeners['site-metric']({detail:{event:'profile_saved',answers:'private'}});
  assert.equal(h.sent.filter(e=>e.event==='test_completed').length,1);
  assert.ok(!JSON.stringify(h.sent).includes('private'));
});

const emailEvents=['email_requested','email_code_sent','email_code_presented','email_send_failed','email_security_failed','email_verify_failed','email_rate_limited','report_link_sent','report_link_failed','test_progress_25','test_progress_50','test_progress_75'];
test('email milestones are assessment-only, test-aware and once per page',()=>{
  for(const host of ['personalitytestai.com','psychologytestai.com']){
    const h=harness({host,path:'/',search:'?traffic_test=1'});
    for(const event of emailEvents){
      h.listeners['site-metric']({detail:event});h.listeners['site-metric']({detail:event});
      assert.equal(h.sent.filter(e=>e.event===event).length,1);
    }
    assert.ok(h.sent.every(e=>e.quality==='test'));
    h.listeners['site-metric']({detail:{event:'email_requested',email:'private@example.invalid',code:'00000000'}});
    assert.ok(!JSON.stringify(h.sent).includes('private@example'));
    assert.ok(h.elements.every(e=>e.style.cssText.includes('pointer-events:none')));
  }
  for(const host of ['thepracticalbible.com','medmissionsupplies.com','missionarydoctors.com','meetingstoneai.com']){
    const h=harness({host,path:'/'});const before=h.sent.length;
    for(const event of emailEvents)h.listeners['site-metric']({detail:event});
    assert.equal(h.sent.length,before);
  }
});
test('email milestones respect privacy and retain existing report outcomes',()=>{
  const privateTab=harness({host:'personalitytestai.com',path:'/',dnt:'1'});
  for(const event of emailEvents)privateTab.listeners['site-metric']({detail:event});
  assert.equal(privateTab.sent.length,0);
  const h=harness({host:'psychologytestai.com',path:'/'});
  for(const event of ['report_preview','email_verified','report_viewed','report_linked']){
    h.listeners['site-metric']({detail:event});
    assert.equal(h.sent.filter(e=>e.event===event).length,1);
  }
});
