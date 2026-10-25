import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import {readFileSync} from 'node:fs';
const template=readFileSync(new URL('./dashboard.html',import.meta.url),'utf8');
const script=template.split('</script><script>')[1].split('</script>')[0];
function render({start,generated='2026-10-25T22:00:00Z',to,quality='visitor',rows=[]}={}){
  const data={started_at:'2026-10-22T00:00:00Z',generated_at:generated,rows,ads:[],budget:{},legacy:{},coverage:{personality:{live:true},psychology:{live:true}},measurement_releases:start?{assessment_funnel_milestones:start}:{}};
  const els={};const get=id=>els[id]??={value:({site:'all',source:'all',quality}[id]||''),textContent:id==='data'?JSON.stringify(data):'',add(){},addEventListener(){}};
  const ctx={document:{getElementById:get},Option:function(){},Date,Set,JSON,Number};
  vm.runInNewContext(script,ctx);if(to||quality!=='visitor'){if(to)get('to').value=to;get('quality').value=quality;ctx.render();}
  return els;
}
test('old snapshots and date ranges do not fabricate zero email counts',()=>{
  assert.match(render().outcomes.innerHTML,/Email requested<\/td><td class="num">Not measured/);
  const old=render({start:'2026-10-25T21:00:00Z',to:'2026-10-24'});
  assert.match(old.outcomes.innerHTML,/Email requested<\/td><td class="num">Not measured/);
  assert.match(old.outcomes.innerHTML,/35 of 140 answered<\/td><td class="num">Not measured/);
  assert.match(old['email-measurement'].textContent,/Earlier activity is unmeasured, not zero/);
});
test('new milestones separate test events, provider acceptance and report reading',()=>{
  const row={day:'2026-10-25',site:'personality',page:'/',target:'none',source:'meta_paid',event:'email_code_sent',quality:'visitor',count:2};
  const options={start:'2026-10-25T21:00:00Z',rows:[row,{...row,quality:'test',count:7}]};
  const visitor=render(options),qa=render({...options,quality:'test'});
  assert.match(visitor.outcomes.innerHTML,/Code send confirmed<\/td><td class="num">2/);
  assert.match(qa.outcomes.innerHTML,/Code send confirmed<\/td><td class="num">7/);
  assert.match(visitor.outcomes.innerHTML,/Provider accepted; not inbox placement or reading/);
  assert.match(visitor.outcomes.innerHTML,/Full report displayed; not proof it was read/);
  assert.match(visitor['email-measurement'].textContent,/at most once per browser page/);
});
