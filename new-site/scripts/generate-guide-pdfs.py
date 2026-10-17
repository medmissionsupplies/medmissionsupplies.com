"""Create the reviewed one-page MMS buying sheets and a combined booklet.

Run after import-research-guides.py. PDFs are checked in; CI needs no Python.
"""
from pathlib import Path
from html import escape
import json, re
from reportlab.pdfgen import canvas
from reportlab.lib.colors import HexColor
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import Paragraph
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from pypdf import PdfReader, PdfWriter

site = Path(__file__).resolve().parents[1]
raw = (site/'src/research-guides.generated.mjs').read_text(encoding='utf-8')
guides = json.loads(raw.split('export const researchGuides = ', 1)[1].rstrip().rstrip(';'))
out = site/'public/guidesheets'
out.mkdir(parents=True, exist_ok=True)
regular, bold = 'Helvetica', 'Helvetica-Bold'
font = Path('C:/Windows/Fonts')
if (font/'segoeui.ttf').exists():
    pdfmetrics.registerFont(TTFont('MMS', str(font/'segoeui.ttf')))
    pdfmetrics.registerFont(TTFont('MMS-Bold', str(font/'segoeuib.ttf')))
    pdfmetrics.registerFontFamily('MMS', normal='MMS', bold='MMS-Bold', italic='MMS', boldItalic='MMS-Bold')
    regular, bold = 'MMS', 'MMS-Bold'
ink, accent, muted = '#16333D', '#0A6F69', '#4B6067'
W, H = A4
margin = 44
width = W-2*margin

def clean(value):
    return str(value).replace('\u2011','-').replace('\u2013','-').replace('\u2014',' - ')

def paragraph(c, text, x, top, w, size=11.5, color=ink, weight=False, leading=None):
    style=ParagraphStyle('text', fontName=bold if weight else regular, fontSize=size,
                         leading=leading or size*1.36, textColor=HexColor(color), spaceAfter=0)
    p=Paragraph(text, style)
    _,h=p.wrap(w,H)
    p.drawOn(c,x,top-h)
    return top-h

book = PdfWriter()
# Two concise contents pages make the combined sheets a usable compendium.
contents_path=out/'.mms-contents.tmp.pdf'
toc=canvas.Canvas(str(contents_path),pagesize=A4,pageCompression=1)
for label, entries in [('Equipment buying guides',[(i,g) for i,g in enumerate(guides) if g['equipmentId']]),('Buying, setup and ownership',[(i,g) for i,g in enumerate(guides) if not g['equipmentId']])]:
    toc.setFillColor(HexColor(ink));toc.rect(0,H-125,W,125,fill=1,stroke=0)
    paragraph(toc,'MED MISSION SUPPLIES',margin,H-27,width,10,'#8CD8CE',True)
    paragraph(toc,'Equipment Buying Compendium',margin,H-51,width,25,'#FFFFFF',True,29)
    paragraph(toc,label,margin,H-91,width,13,'#DCEEEB')
    y=H-151
    paragraph(toc,'Choose a topic. Each page gives the essentials and links to its complete online guide.',margin,y,width,10,muted)
    y-=42
    for index,g in entries:
        url='https://medmissionsupplies.com/resources/'+g['id']+'.html'
        next_y=paragraph(toc,f'<a href="{url}" color="{ink}">{escape(clean(g["sheet"]["title"]))}</a>',margin,y,width-34,11,ink,True)
        paragraph(toc,str(index+3),W-margin-23,y,23,10,accent)
        y=min(y-25,next_y-10)
    if y<55:raise ValueError('Compendium contents overflow: '+label)
    paragraph(toc,'Sources reviewed October 2026 · Full analysis and evidence: medmissionsupplies.com/articles.html',margin,40,width,8,muted)
    toc.showPage()
toc.save()
book.append(PdfReader(str(contents_path)))
for index, g in enumerate(guides):
    path=out/(g['id']+'.pdf')
    c=canvas.Canvas(str(path),pagesize=A4,pageCompression=1)
    c.setTitle(g['sheet']['title']+' | Med Mission Supplies')
    c.setAuthor('Med Mission Supplies')
    c.setSubject('Practical equipment purchasing guide; full analysis and sources online')
    c.setFillColor(HexColor(ink));c.rect(0,H-120,W,120,fill=1,stroke=0)
    paragraph(c,'MMS / EQUIPMENT BUYING GUIDE',margin,H-26,width,10,'#8CD8CE',True)
    title=escape(clean(g['sheet']['title']))
    title_size=25 if len(title)<47 else 22
    paragraph(c,title,margin,H-51,width,title_size,'#FFFFFF',True,28)
    y=H-142
    y=paragraph(c,escape(clean(g['sheet']['summary'])),margin,y,width,12.2,ink,True)-17
    upgrade_label='CONSIDER ALTERNATIVES WHEN' if g['key'] in ['oxygen','neonatal','laboratory','point-of-care','clinical-essentials'] else 'PAY MORE WHEN'
    fields=[('START HERE','firstChoice'),(upgrade_label,'upgradeWhen'),('WATCH THE BUDGET','budgetWatch'),('CHECK THE SUPPORT','supportCheck')]
    for label,key in fields:
        y=paragraph(c,label,margin,y,width,9,accent,True)-4
        y=paragraph(c,escape(clean(g['sheet'][key])),margin,y,width)-12
    c.setStrokeColor(HexColor('#C7D9D7'));c.line(margin,y+2,W-margin,y+2)
    y-=12
    y=paragraph(c,'THREE QUESTIONS FOR THE SUPPLIER',margin,y,width,10,accent,True)-7
    for n,q in enumerate(g['sheet']['askSupplier'],1):
        y=paragraph(c,f'<b>{n}.</b> '+escape(clean(q)),margin,y,width,11.2)-6
    y-=8
    sources={s['id']:s for s in g['research']['sources']}
    refs=[sources[s] for s in g['sheet']['sourceIds'] if sources[s]['url'].startswith('https://')][:3]
    ref_text=' · '.join(f'<a href="{escape(s["url"],quote=True)}" color="{accent}">{escape(clean(s.get("publisher") or s["title"]))}</a>' for s in refs)
    if ref_text:
        y=paragraph(c,'Selected sources: '+ref_text,margin,y,width,8.5,muted)-10
    if y<92:
        raise ValueError(f'Guide sheet overflow: {g["id"]} ends at {y:.1f}')
    url='https://medmissionsupplies.com/resources/'+g['id']+'.html'
    paragraph(c,f'<a href="{url}" color="{accent}"><b>Read the full guide, model comparisons and source notes online →</b></a>',margin,76,width,10)
    paragraph(c,'Reviewed '+g['reviewedAt']+' · Purchasing guidance; confirm the exact unit, local requirements and support before ordering.',margin,53,width,8,muted)
    c.showPage();c.save()
    r=PdfReader(str(path))
    if len(r.pages)!=1: raise ValueError('Guide must be one page: '+g['id'])
    extracted=re.sub(r'\s+', '', r.pages[0].extract_text())
    for text in [g['sheet']['title'],g['sheet']['summary'],g['reviewedAt'],*[g['sheet'][k] for _,k in fields],*g['sheet']['askSupplier']]:
        if re.sub(r'\s+', '',clean(text)) not in extracted: raise ValueError('PDF missing guide text: '+g['id'])
    book.append(r)
    book.add_outline_item(g['sheet']['title'],index+2)
book.add_metadata({'/Title':'MMS Equipment Buying Compendium','/Author':'Med Mission Supplies'})
book.write(str(out/'mms-buying-guide-sheets.pdf'))
contents_path.unlink()
print(json.dumps({'individualSheets':len(guides),'bookletPages':len(book.pages),'output':str(out)}))
