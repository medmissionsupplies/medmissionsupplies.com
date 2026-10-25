"""On-demand private dashboard. Uses existing SSH; retrieves only aggregate counts."""
import argparse,json,subprocess
from pathlib import Path
REMOTE=r'''
import json,sqlite3,datetime
from pathlib import Path
p=Path('/var/lib/first-party-metrics/counts.sqlite3')
with sqlite3.connect('file:'+str(p)+'?mode=ro',uri=True) as db:
 keys=['day','site','page','target','source','event','quality','count']
 rows=[dict(zip(keys,r)) for r in db.execute('SELECT * FROM counts ORDER BY day,site,page')]
 started=db.execute("SELECT value FROM metadata WHERE key='started_at'").fetchone()[0]
legacy={}
files={'bible_campaigns':'/var/lib/practical-bible/data/traffic-counts.json','bible_article_opens':'/var/lib/practical-bible/data/read-counts.json','doctors_campaigns':'/var/lib/missionary-doctors/traffic-data/traffic-counts.json','personality_campaigns':'/var/lib/assessment-traffic/personality/traffic-counts.json','psychology_campaigns':'/var/lib/assessment-traffic/psychology/traffic-counts.json'}
for name,path in files.items():
 p=Path(path)
 if p.is_file():legacy[name]={'modified_at':datetime.datetime.fromtimestamp(p.stat().st_mtime,datetime.timezone.utc).isoformat(),'data':json.loads(p.read_text())}
print(json.dumps({'schema':1,'started_at':started,'generated_at':datetime.datetime.now(datetime.timezone.utc).isoformat(),'timezone':'UTC','rows':rows,'legacy':legacy}))
'''
def main():
 p=argparse.ArgumentParser();p.add_argument('--output',required=True);p.add_argument('--ledger',required=True);p.add_argument('--coverage');p.add_argument('--measurement-releases');a=p.parse_args()
 result=subprocess.run(['ssh','meetingstone-vps','sudo','-n','python3','-'],input=REMOTE,text=True,capture_output=True,check=True)
 data=json.loads(result.stdout)
 ledger=json.loads(Path(a.ledger).read_text(encoding='utf-8-sig'))
 # Whitelist business aggregates; never include credentials or unrelated state in the dashboard.
 data['ads']=[{k:x.get(k) for k in ['campaign','platform','site','platform_campaign_id','status','allocated_cash_cap','media_lifetime_cap','media_spend','reported_impressions','reported_clicks','reported_link_clicks','last_observed_at','outcome_status']} for x in ledger['items']]
 data['budget']={'ceiling':ledger['cash_ceiling'],'continuation_hold':ledger.get('held_unallocated_continuation'),'essential_reserve':ledger['reserve']['allocated'],'combined_remaining':'Unknown until OpenAI allocation and current Meta settlement are reconciled.'}
 data['coverage']=json.loads(Path(a.coverage).read_text(encoding='utf-8-sig')) if a.coverage and Path(a.coverage).exists() else {}
 # A verified frontend-release timestamp, never inferred from the first event or collector upload.
 releases=Path(a.measurement_releases) if a.measurement_releases else Path(a.output)/'Website-Metric-Releases.json'
 if releases.exists():
  recorded=json.loads(releases.read_text(encoding='utf-8-sig'))
  data['measurement_releases']={k:recorded[k] for k in ['assessment_funnel_milestones'] if isinstance(recorded.get(k),str)}
 output=Path(a.output);output.mkdir(parents=True,exist_ok=True)
 template=Path(__file__).with_name('dashboard.html').read_text(encoding='utf-8')
 html=template.replace('__METRICS_DATA__',json.dumps(data).replace('<','\\u003c'))
 # Prepare both files before replacing the prior snapshots.
 for name,body in [('Website-Traffic-Data.json',json.dumps(data,indent=2)+'\n'),('Website-Traffic-Dashboard.html',html)]:
  (output/(name+'.tmp')).write_text(body,encoding='utf-8')
 for name in ['Website-Traffic-Data.json','Website-Traffic-Dashboard.html']:
  (output/(name+'.tmp')).replace(output/name)
 print(json.dumps({'dashboard':str(output/'Website-Traffic-Dashboard.html'),'refreshed_at':data['generated_at'],'aggregate_rows':len(data['rows']),'visitor_events':sum(r['count'] for r in data['rows'] if r['quality']=='visitor'),'test_events_separate':sum(r['count'] for r in data['rows'] if r['quality']=='test')}))
if __name__=='__main__':main()
