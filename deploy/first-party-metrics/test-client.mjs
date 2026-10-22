import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import {readFileSync} from 'node:fs';
const code=readFileSync(new URL('./client.js',import.meta.url),'utf8');
function harness({host='thepracticalbible.com',search='',dnt='0',stored={},path='/question/what-happens-after-death'}={}){
  const sent=[],listeners={},domListeners={},timers=[],session=new Map(),local=new Map(Object.entries(stored));
  const location={hostname:host,pathname:path,search,href:`https://${host}${path}${search}`};
  const store=m=>({getItem:k=>m.get(k)??null,setItem:(k,v)=>m.set(k,v),removeItem:k=>m.delete(k)});
  const document={referrer:'',visibilityState:'visible',hasFocus:()=>true,body:{appendChild(){}},createElement:()=>({style:{}}),addEventListener:(n,f)=>domListeners[n]=f};
  class Element{closest(){return this}}
  const ctx={location,document,navigator:{doNotTrack:dnt},URL,URLSearchParams,sessionStorage:store(session),localStorage:store(local),crypto:{randomUUID:()=> 'aaaaaaaa-aaaa-4aaa-aaaa-aaaaaaaaaaaa'},AbortSignal:{timeout:()=>null},Element,Date,Set,Map,JSON,queueMicrotask:f=>f(),setTimeout:()=>{},setInterval:f=>timers.push(f),addEventListener:(n,f)=>listeners[n]=f,fetch:async(url,opt)=>{sent.push({url,...JSON.parse(opt.body)});return {ok:true}},history:{pushState(_s,_t,p){location.pathname=p},replaceState(_s,_t,p){location.pathname=p}}};
  ctx.window=ctx;vm.runInNewContext(code,ctx);
  return {sent,ctx,listeners,domListeners,timers,local,Element};
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
