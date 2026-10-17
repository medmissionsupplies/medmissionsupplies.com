"""Import approved MMS editorial research and cleared photographs into the site.

Usage: python scripts/import-research-guides.py ../editorial-review
The website build uses the resulting checked-in module; Python is not a runtime dependency.
"""
from pathlib import Path
import json, sys, shutil

site=Path(__file__).resolve().parents[1]
source=Path(sys.argv[1]).resolve()
read=lambda name:json.loads((source/name).read_text(encoding='utf-8-sig'))
catalog=read('catalog-index.json')
equipment={x['id']:x for x in catalog['equipment']}
category_names={x['id']:x['name'] for x in catalog['categories']}
sheets={x['id']:x for x in read('guide-sheets.json')['sheets']}
photos={x['id']:x for x in read('photo-assets.json')['photos']}
inputs=['imaging-surgery-eye.json','critical-care.json','procedures-diagnostics.json','facilities-clinic.json','clinic-essentials.json','buyer-features.json','specialist-guides.json','compendium-imaging-operations.json','compendium-hospital-operations.json']
feature_photos={'free-equipment':'beds','quote-gaps':'anesthesia','hospital-ready':'sterilization','repair-or-replace':'ventilators','one-or-two':'ultrasound','c-arm-detectors':'xray','ct-tube-budget':'ct-mri','ultrasound-probes':'ultrasound','service-contracts':'surgical-tables','mri-site-readiness':'ct-mri','dr-retrofit':'xray'}
feature_photos.update({'pacs-image-workflow':'ultrasound','equipment-power':'anesthesia','replacement-parts':'infusion','equipment-shipping':'beds','end-of-support':'ventilators','rent-or-buy':'xray','equipment-handover':'surgical-tables','maintenance-records':'anesthesia','infusion-consumables':'infusion','sterile-processing-workflow':'sterilization','facility-oxygen':'oxygen','equipment-software-support':'laboratory'})
data=[]
for filename in inputs:
    for original in read(filename)['articles']:
        a=json.loads(json.dumps(original))
        a.pop('legacy',None)  # Internal comparison notes remain in the research archive.
        key=a['id']; item=equipment.get(key); sheet=sheets.get(key) or a.pop('guideSheet',None)
        if not sheet: raise ValueError('Missing quick guide: '+key)
        ids={s['id'] for s in a['sources']}
        for sid in sheet['sourceIds']:
            if sid not in ids:raise ValueError('Unknown quick-guide source '+key+'/'+sid)
        for s in a['sources']:
            if s['url'].startswith(('C:', 'archive:')) or 'givingtree' in s['url'].lower():
                s.update(url='archive:historical-equipment-material',title='Earlier equipment material retained in the research archive',publisher='Historical equipment notes')
        picture=key if item else feature_photos[key]
        photo=photos[picture]
        public_photo={k:v for k,v in photo.items() if k not in ['variants','sourceWidth','sourceHeight']}
        if not item:
            public_photo.update(modelMatch='category',captionContext='Illustrative equipment photograph: '+photo['caption'],modelMatchNote='This photograph illustrates the equipment context. It is not evidence of a product, supplier, software configuration or service package recommended in this guide.')
        body=' '.join([a['verdict']]+[p for section in a['sections'] for p in section['paragraphs']]+[c.get('why','') for c in a.get('choices',[])])
        id=key+'-buying-guide' if item else key
        data.append(dict(id=id,key=key,kind='research-guide',equipmentId=key if item else None,title=a['title'],summary=a['dek'],categoryId=item['category'] if item else 'decisions',category=category_names[item['category']] if item else 'Procurement & service',image='guides/'+picture,photo=public_photo,minutes=max(3,round(len(body.split())/200)),sections=[[s['heading'],' '.join(s['paragraphs'])] for s in a['sections']],related=[key] if item else [picture],socialTitle=a['social']['title'],socialDescription=a['social']['description'],socialHeadline=sheet['title'],socialStrapline='Practical equipment buying guidance.',reviewedAt='2026-10-17' if filename=='specialist-guides.json' or filename.startswith('compendium-') else '2026-10-16',sheet=sheet,research=a))
        data[-1]['searchTerms']=' '.join(a.get('coverage',[])+[c['model'] for c in a.get('choices',[])])
        if not item and key in ['c-arm-detectors','ct-tube-budget','ultrasound-probes','mri-site-readiness','dr-retrofit','pacs-image-workflow']:
            data[-1].update(categoryId='imaging',category=category_names['imaging'])
if len(data)!=46 or len({a['id'] for a in data})!=len(data):raise ValueError('Expected 46 unique guides')
if len([a for a in data if a['equipmentId']])!=23:raise ValueError('Equipment guide coverage mismatch')
serialized=json.dumps(data,ensure_ascii=False,indent=2)
if 'giving tree' in serialized.lower() or 'givingtree' in serialized.lower():raise ValueError('Unremoved legacy brand text in imported content')
(site/'src/research-guides.generated.mjs').write_text('// Original MMS editorial research. Edit through the reviewed source import.\nexport const researchGuides = '+serialized+';\n',encoding='utf-8')
# Keep the complete research out of the initial browser bundle. Each article is
# its own lazy data module; the build still renders its complete static HTML.
index=[]
page_dir=site/'src/research-pages';page_dir.mkdir(exist_ok=True)
loaders=[]
for g in data:
    compact={k:v for k,v in g.items() if k!='research'}
    compact['sections']=[[title,''] for title,_ in compact['sections']]
    index.append(compact)
    (page_dir/(g['id']+'.mjs')).write_text('export default '+json.dumps(g,ensure_ascii=False,indent=2)+';\n',encoding='utf-8')
    loaders.append(json.dumps(g['id'])+': () => import("./research-pages/'+g['id']+'.mjs")')
(site/'src/research-guide-index.generated.mjs').write_text('export const researchGuides = '+json.dumps(index,ensure_ascii=False,indent=2)+';\n',encoding='utf-8')
(site/'src/research-page-loaders.generated.mjs').write_text('export const researchPageLoaders = {\n'+',\n'.join(loaders)+'\n};\n',encoding='utf-8')
dest=site/'public/assets/photos/guides';dest.mkdir(parents=True,exist_ok=True)
credits=[]
for key,p in photos.items():
    shutil.copy2(source/p['variants'][-1]['src'],dest/(key+'.webp'))
    credits.append(f"{key}.webp\n{p['caption']}\n{p['photographer']} — {p['license']}\nSource: {p['sourcePage']}\nLicense: {p['licenseUrl']}\n{p.get('creditNote','')}\n{p['changes']}\n")
(site/'licenses/Equipment-guide-photography.txt').write_text('\n'.join(credits),encoding='utf-8')
print(json.dumps({'guides':len(data),'equipment':23,'photos':len(photos)}))
