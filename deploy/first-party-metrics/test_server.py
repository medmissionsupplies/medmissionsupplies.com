import tempfile
import unittest
from datetime import datetime, timedelta, timezone
from pathlib import Path
from server import Store, validate, page

def payload(**kw):
    return dict(page='/question/what-happens-after-death',target='none',source='google_paid',event='article_view',quality='visitor',receipt='aaaaaaaa-aaaa-4aaa-aaaa-aaaaaaaaaaaa',**kw)

class Counters(unittest.TestCase):
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
