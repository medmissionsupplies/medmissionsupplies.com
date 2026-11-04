import tempfile
import unittest
from datetime import datetime, timedelta, timezone
from pathlib import Path
from server import Store, validate, page, EMAIL_ATTEMPT_EVENTS, ASSESSMENT_PROGRESS_EVENTS

def payload(**kw):
    return dict(page='/question/what-happens-after-death',target='none',source='google_paid',event='article_view',quality='visitor',receipt='aaaaaaaa-aaaa-4aaa-aaaa-aaaaaaaaaaaa',**kw)

class Counters(unittest.TestCase):
    def test_release_events_require_correct_site_page_and_target(self):
        scenarios = [
            ("thepracticalbible.com","/read/genesis/1","/read/genesis/2","chapter_next_click"),
            ("thepracticalbible.com","/read/genesis/1","none","chapter_audio_60s"),
            ("thepracticalbible.com","/question/one","/question/two","question_next_click"),
            ("thepracticalbible.com","/question/one","none","question_answered"),
            ("missionarydoctors.com","/hospitals/sample","external","hospital_contact_click"),
        ]
        scenarios += [("medmissionsupplies.com","/services.html","/contact.html",e)
                      for e in ["equipment_quote_click","equipment_service_click","careers_contact_click"]]
        scenarios += [(s,"/","none",e) for s in ["psychologytestai.com","personalitytestai.com"]
                      for e in ["report_ai_ready","report_ai_failed","report_pdf_downloaded"]]
        for host,path,target,event in scenarios:
            p = dict(payload(),page=path,target=target,event=event,quality="test")
            self.assertEqual(validate(host,"https://"+host,p)[1:6],(path,target,"google_paid",event,"test"))
            for bad in [dict(p,target="share"),dict(p,email="example.invalid")]:
                with self.assertRaises(ValueError):validate(host,"https://"+host,bad)
            with self.assertRaises(ValueError):validate("meetingstoneai.com","https://meetingstoneai.com",p)
    def test_email_milestones_are_scoped_and_private(self):
        self.assertEqual(len(EMAIL_ATTEMPT_EVENTS),9)
        self.assertEqual(ASSESSMENT_PROGRESS_EVENTS,{'test_progress_25','test_progress_50','test_progress_75'})
        for event in EMAIL_ATTEMPT_EVENTS | ASSESSMENT_PROGRESS_EVENTS:
            for host in ['personalitytestai.com','psychologytestai.com']:
                for quality in ['visitor','test']:
                    p=dict(payload(),page='/',event=event,quality=quality)
                    row=validate(host,'https://'+host,p)
                    self.assertEqual(row[4:6],(event,quality))
                    for key in ['email','code','answers','error','report_id']:
                        with self.assertRaises(ValueError):validate(host,'https://'+host,dict(p,**{key:'private'}))
            for host in ['thepracticalbible.com','medmissionsupplies.com','missionarydoctors.com','meetingstoneai.com']:
                with self.assertRaises(ValueError):validate(host,'https://'+host,dict(payload(),page='/',event=event))
    def test_email_milestones_preserve_retry_dedup_and_test_separation(self):
        with tempfile.TemporaryDirectory(dir=Path(__file__).parent) as tmp:
            s=Store(str(Path(tmp)/'data.sqlite'))
            for n,event in enumerate(sorted(EMAIL_ATTEMPT_EVENTS | ASSESSMENT_PROGRESS_EVENTS)):
                for j,quality in enumerate(['visitor','test']):
                    p=dict(payload(),page='/',event=event,quality=quality,receipt=f'{n*2+j:08x}-aaaa-4aaa-aaaa-aaaaaaaaaaaa')
                    row=validate('personalitytestai.com','https://personalitytestai.com',p)
                    s.record(row);s.record(row)
            rows=s.report()['rows']
            self.assertEqual(len(rows),24)
            self.assertTrue(all(r['count']==1 for r in rows))
            self.assertTrue(all(set(r)=={'day','site','page','target','source','event','quality','count'} for r in rows))
    def test_privacy_and_input_boundary(self):
        p=payload()
        for bad in [dict(p,phone='123'),dict(p,page='/question/topic?email=private'),dict(p,event='answers'),dict(p,source='raw-search-term'),dict(p,target='https://external.test/private'),dict(p,receipt='person-id')]:
            with self.assertRaises(ValueError):validate('thepracticalbible.com','https://thepracticalbible.com',bad)
        for host,origin in [('pairbondai.com','https://pairbondai.com'),('thepracticalbible.com','https://evil.test')]:
            with self.assertRaises(ValueError):validate(host,origin,p)
        self.assertIsNone(validate('thepracticalbible.com','https://thepracticalbible.com',p,dnt='1'))
        self.assertIsNone(validate('thepracticalbible.com','https://thepracticalbible.com',p,gpc='1'))
        self.assertIsNone(validate('thepracticalbible.com','https://thepracticalbible.com',p,ua='Googlebot'))
        with self.assertRaises(ValueError):validate('thepracticalbible.com','https://thepracticalbible.com',dict(p,event='profile_saved'))
    def test_no_sensitive_path_and_aliases(self):
        self.assertEqual(page('personality','/profile/someone'),'/other')
        self.assertEqual(page('mms','/resources/ultrasound/index.html'),'/resources/ultrasound.html')
        self.assertEqual(page('mms','/articles/'),'/articles.html')
    def test_dedup_qa_and_retention(self):
        with tempfile.TemporaryDirectory(dir=Path(__file__).parent) as tmp:
            s=Store(str(Path(tmp)/'data.sqlite'))
            p=payload()
            row=validate('thepracticalbible.com','https://thepracticalbible.com',p)
            now=datetime(2026,10,22,tzinfo=timezone.utc)
            s.record(row,now);s.record(row,now)
            test=validate('thepracticalbible.com','https://thepracticalbible.com',dict(p,quality='test',receipt='bbbbbbbb-bbbb-4bbb-bbbb-bbbbbbbbbbbb'))
            s.record(test,now)
            report=s.report()
            self.assertEqual(sum(r['count'] for r in report['rows'] if r['quality']=='visitor'),1)
            self.assertEqual(sum(r['count'] for r in report['rows'] if r['quality']=='test'),1)
            s.record(row,now+timedelta(days=100))
            self.assertEqual(len(s.report()['rows']),1)
            self.assertEqual(s.report()['rows'][0]['count'],1)
            self.assertNotIn('receipt',str(s.report()))
if __name__=='__main__': unittest.main()
