import contextlib,io,json,tempfile,unittest
from pathlib import Path
from types import SimpleNamespace
from unittest.mock import patch
import refresh_dashboard

class DashboardRefresh(unittest.TestCase):
 def test_aggregate_refresh_preserves_platform_budget_support_and_curated_html(self):
  with tempfile.TemporaryDirectory(dir=Path(__file__).parent) as tmp:
   output=Path(tmp)
   original={'schema':1,'started_at':'2026-10-22T00:00:00Z','generated_at':'2026-10-25T20:00:00Z','timezone':'UTC','rows':[],'legacy':{},'ads':[{'platform_campaign_id':'existing','media_spend':8,'custom_ad_baseline':4}],'budget':{'ceiling':700,'combined_remaining':'Reviewed settlement'},'coverage':{'personality':{'live':True}},'support_escalation':{'receipt':'existing'},'latest_doctors_correction':{'preserve':True},'platform_status_history':[1,2]}
   (output/'Website-Traffic-Data.json').write_text(json.dumps(original))
   head='<html><body><section>Curated dated campaign status</section><script id="data" type="application/json">'
   tail='</script><script>/* reviewed custom renderer */</script></body></html>'
   (output/'Website-Traffic-Dashboard.html').write_text(head+json.dumps(original)+tail)
   (output/'Website-Metric-Releases.json').write_text(json.dumps({'assessment_funnel_milestones':'2026-10-25T21:00:00Z'}))
   ledger=output/'ledger.json';ledger.write_text(json.dumps({'items':[],'cash_ceiling':700,'reserve':{'allocated':100}}))
   raw={k:original[k] for k in ['schema','started_at','timezone','legacy']}
   raw.update(generated_at='2026-10-25T22:00:00Z',rows=[{'site':'personality','quality':'test','event':'email_requested','count':1}])
   with patch('sys.argv',['refresh','--output',str(output),'--ledger',str(ledger)]),patch('refresh_dashboard.subprocess.run',return_value=SimpleNamespace(stdout=json.dumps(raw))),contextlib.redirect_stdout(io.StringIO()):refresh_dashboard.main()
   current=json.loads((output/'Website-Traffic-Data.json').read_text())
   for key in original.keys()-raw.keys():self.assertEqual(current[key],original[key],key)
   self.assertEqual(current['rows'],raw['rows'])
   self.assertEqual(current['measurement_releases']['assessment_funnel_milestones'],'2026-10-25T21:00:00Z')
   html=(output/'Website-Traffic-Dashboard.html').read_text()
   self.assertTrue(html.startswith(head));self.assertTrue(html.endswith(tail))

if __name__=='__main__':unittest.main()
