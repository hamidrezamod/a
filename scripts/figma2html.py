#!/usr/bin/env python3
"""Figma JSON -> pixel-exact static HTML/CSS converter.

Usage: python3 scripts/figma2html.py <frame_id> <out_html> [geometry_json]
"""
import json, sys, os, re

FRAME_ID = sys.argv[1]
OUT_HTML = sys.argv[2]
GEO = sys.argv[3] if len(sys.argv) > 3 else None

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
full = json.load(open(os.path.join(BASE, 'figma-import/full.json')))
geom_doc = json.load(open(GEO))['document'] if GEO else None

doc = full['document']

def find(n, tid):
    if n.get('id') == tid:
        return n
    for c in n.get('children', []):
        r = find(c, tid)
        if r:
            return r
    return None

def find_geo(n, tid):
    if not n:
        return None
    if n.get('id') == tid:
        return n
    for c in n.get('children', []):
        r = find_geo(c, tid)
        if r:
            return r
    return None

root = find(doc, FRAME_ID)
if not root:
    sys.exit(f'frame {FRAME_ID} not found')

FONT_MAP = {
    'Manrope': ('Manrope', {'Regular': 400, 'Medium': 500, 'SemiBold': 600, 'Bold': 700, 'ExtraLight': 200, 'Light': 300, 'ExtraBold': 800}),
    'Vazirmatn': ('Vazirmatn', {'Regular': 400, 'Medium': 500, 'SemiBold': 600, 'Bold': 700}),
}

css_blocks = []
assets = set()
class_of = {}

def rgba(f):
    if f.get('type') == 'SOLID':
        c = f['color']
        return f"rgba({round(c['r']*255)}, {round(c['g']*255)}, {round(c['b']*255)}, {round(c.get('a',1),3)})"
    return None

def bg_for(n):
    props = []
    for f in [f for f in n.get('fills', []) or [] if f.get('visible', True)]:
        if f.get('type') == 'IMAGE' and f.get('imageRef'):
            ref = f['imageRef']
            assets.add(ref)
            mode = f.get('scaleMode', 'FILL')
            size = {'FILL': 'cover', 'FIT': 'contain', 'STRETCH': '100% 100%'}.get(mode, 'cover')
            props.append(f"background-image: url('assets/{ref.replace('/', '_')}.png'); background-size: {size}; background-position: center; background-repeat: no-repeat")
        elif f.get('type') == 'GRADIENT_LINEAR':
            stops = ', '.join(f"{rgba({'type':'SOLID','color':s['color']})} {round(s['position']*100,1)}%" for s in f.get('gradientStops', []))
            props.append(f"background-image: linear-gradient(90deg, {stops})")
        elif f.get('type') == 'SOLID':
            props.append(f"background-color: {rgba(f)}")
    return props

def stroke_for(n):
    out = []
    strokes = [s for s in n.get('strokes', []) or [] if s.get('visible', True)]
    if strokes and n.get('strokeWeight'):
        w = n['strokeWeight']
        col = rgba(strokes[0])
        if col:
            out.append(f"border: {w}px solid {col}")
    return out

def svg_for(n):
    g = find_geo(geom_doc, n['id']) if geom_doc else None
    bb = n.get('absoluteBoundingBox') or {}
    w = bb.get('width', 0); h = bb.get('height', 0)
    if not g:
        return None
    has_geom = bool(g.get('fillGeometry') or g.get('strokeGeometry'))
    if not has_geom:
        return None
    pad = max(n.get('strokeWeight') or 0, 2)
    parts = []
    fills = [f for f in n.get('fills', []) or [] if f.get('visible', True)]
    fillc = rgba(fills[0]) if fills else '#000'
    for geo in g.get('fillGeometry', []) or []:
        parts.append(f'<path d="{geo.get("path","")}" fill="{fillc}" fill-rule="evenodd"/>')
    strokes = [s for s in n.get('strokes', []) or [] if s.get('visible', True)]
    strokec = rgba(strokes[0]) if strokes else None
    sw = n.get('strokeWeight', 1)
    for geo in g.get('strokeGeometry', []) or []:
        parts.append(f'<path d="{geo.get("path","")}" fill="{strokec or fillc}"/>')
    if not parts:
        return None
    W = w + 2 * pad; H = h + 2 * pad
    return f'<svg style="margin: {-pad:.1f}px; display:block" width="{W:.2f}" height="{H:.2f}" viewBox="{-pad:.2f} {-pad:.2f} {W:.2f} {H:.2f}" xmlns="http://www.w3.org/2000/svg">{"".join(parts)}</svg>'

ALIGN_MAIN = {'MIN': 'flex-start', 'CENTER': 'center', 'MAX': 'flex-end', 'SPACE_BETWEEN': 'space-between'}
ALIGN_CROSS = {'MIN': 'flex-start', 'CENTER': 'center', 'MAX': 'flex-end', 'BASELINE': 'baseline', 'STRETCH': 'stretch'}

def emit(n, parent, depth=0):
    cls = 'n' + n['id'].replace(':', '-')
    class_of[n['id']] = cls
    bb = n.get('absoluteBoundingBox') or {}
    w, h = bb.get('width', 0), bb.get('height', 0)
    rules = []
    inner = ''
    t = n.get('type')

    if parent is None:
        rules.append(f"position: relative; width: {w:.1f}px; height: {h:.1f}px; margin: 0 auto")
    elif parent.get('layoutMode'):
        # flex child
        if n.get('layoutGrow') == 1:
            rules.append('flex-grow: 1')
        la = n.get('layoutAlign')
        if la in ('STRETCH', 'FILL'):
            rules.append('align-self: stretch' if parent['layoutMode'] == 'HORIZONTAL' else '')
            if la == 'FILL' and parent['layoutMode'] == 'VERTICAL':
                rules.append('align-self: stretch')
        if n.get('layoutPositioning') == 'ABSOLUTE':
            pass
    else:
        pb = parent.get('absoluteBoundingBox') or {}
        rules.append(f"position: absolute; left: {bb.get('x',0)-pb.get('x',0):.1f}px; top: {bb.get('y',0)-pb.get('y',0):.1f}px")

    if t != 'TEXT':
        rules.append(f"width: {w:.1f}px")
        rules.append(f"height: {h:.1f}px")

    # container behavior
    if t in ('FRAME', 'COMPONENT', 'INSTANCE', 'COMPONENT_SET'):
        lm = n.get('layoutMode')
        if lm:
            rules.append('display: flex')
            rules.append('flex-direction: ' + ('row' if lm == 'HORIZONTAL' else 'column'))
            if n.get('itemSpacing'):
                rules.append(f"gap: {n['itemSpacing']:.1f}px")
            pt, pr, pbm, pl = n.get('paddingTop',0), n.get('paddingRight',0), n.get('paddingBottom',0), n.get('paddingLeft',0)
            if any((pt, pr, pbm, pl)):
                rules.append(f"padding: {pt:.1f}px {pr:.1f}px {pbm:.1f}px {pl:.1f}px")
            am = ALIGN_MAIN.get(n.get('primaryAxisAlignItems', 'MIN'))
            if am and am != 'flex-start':
                rules.append(f"justify-content: {am}")
            ac = ALIGN_CROSS.get(n.get('counterAxisAlignItems', 'MIN'))
            if ac and ac != 'flex-start':
                rules.append(f"align-items: {ac}")
        else:
            rules.append('position: relative' if parent is None else rules[-1].split(';')[0].replace('position: absolute','position: absolute'))
            if parent is not None and not parent.get('layoutMode'):
                rules.append('position: absolute')
        rules += bg_for(n)
        rules += stroke_for(n)
        if n.get('cornerRadius'):
            rules.append(f"border-radius: {n['cornerRadius']:.1f}px")
        elif n.get('rectangleCornerRadii') and any(n.get('rectangleCornerRadii')):
            r = n['rectangleCornerRadii']
            rules.append(f"border-radius: {r[0]}px {r[1]}px {r[2]}px {r[3]}px")
        if n.get('opacity') is not None and n.get('opacity') != 1:
            rules.append(f"opacity: {n['opacity']}")
        if n.get('overflowDirection') in ('VERTICAL_SCROLLING','HORIZONTAL_SCROLLING','HORIZONTAL_AND_VERTICAL'):
            rules.append('overflow: hidden')
        for c in n.get('children', []):
            inner += emit(c, n, depth+1)
    elif t == 'GROUP':
        rules.append('position: relative' if parent is None or parent.get('layoutMode') else 'position: absolute')
        if parent and parent.get('layoutMode'):
            rules = [r for r in rules if not r.startswith('position: absolute')]
            rules.append('position: relative')
        rules += bg_for(n)
        if n.get('opacity') is not None and n.get('opacity') != 1:
            rules.append(f"opacity: {n['opacity']}")
        for c in n.get('children', []):
            inner += emit(c, n, depth+1)
    elif t in ('RECTANGLE', 'ELLIPSE', 'LINE', 'REGULAR_POLYGON', 'STAR'):
        rules += bg_for(n)
        rules += stroke_for(n)
        if t == 'ELLIPSE':
            rules.append('border-radius: 50%')
        elif n.get('cornerRadius'):
            rules.append(f"border-radius: {n['cornerRadius']:.1f}px")
        if n.get('opacity') is not None and n.get('opacity') != 1:
            rules.append(f"opacity: {n['opacity']}")
    elif t in ('VECTOR', 'BOOLEAN_OPERATION'):
        svg = svg_for(n)
        if svg:
            inner = svg
            rules.append('line-height: 0')
        else:
            rules += bg_for(n)
    elif t == 'TEXT':
        st = n.get('style', {})
        fam = st.get('fontFamily', 'Manrope')
        post = st.get('fontPostScriptName') or ''
        weight = 400
        for k, v in FONT_MAP.get(fam, (fam, {}))[1].items():
            if k in post or (not post and k == 'Regular'):
                weight = v
        fills = [f for f in n.get('fills', []) or [] if f.get('visible', True)]
        color = rgba(fills[0]) if fills else '#000'
        rules.append(f"font-family: '{fam}', sans-serif")
        rules.append(f"font-weight: {weight}")
        rules.append(f"font-size: {st.get('fontSize',14)}px")
        lh = st.get('lineHeightPx')
        if lh:
            rules.append(f"line-height: {lh:.1f}px")
        ls = st.get('letterSpacing', 0)
        if ls:
            rules.append(f"letter-spacing: {ls:.2f}px")
        rules.append(f"color: {color}")
        align = st.get('textAlignHorizontal', 'LEFT')
        rules.append('text-align: ' + align.lower())
        rules.append(f"width: {w:.1f}px")
        rules.append('white-space: pre-wrap')
        if n.get('opacity') is not None and n.get('opacity') != 1:
            rules.append(f"opacity: {n['opacity']}")
        txt = n.get('characters', '')
        inner = txt.replace('&','&amp;').replace('<','&lt;').replace('>','&gt;')

    css_blocks.append(f".{cls} {{ {'; '.join(r for r in rules if r)} }}")
    return f'<div class="{cls}">{inner}</div>'

body = emit(root, None)

css = "/* generated from Figma — pixel exact */\n"
css += "* { box-sizing: border-box; margin: 0; padding: 0; }\n"
css += "body { background: #e8e8e8; font-family: 'Manrope', sans-serif; }\n"
css += "\n".join(css_blocks) + "\n"

out_dir = os.path.dirname(os.path.abspath(OUT_HTML))
os.makedirs(os.path.join(out_dir, 'assets'), exist_ok=True)
css_path = OUT_HTML[:-5] + '.css'
with open(css_path, 'w') as f:
    f.write(css)
with open(OUT_HTML, 'w') as f:
    f.write(f"""<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Figma design preview</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Manrope:wght@200..800&family=Vazirmatn:wght@100..900&display=swap" rel="stylesheet">
<link rel="stylesheet" href="{os.path.basename(OUT_HTML)[:-5]}.css">
</head>
<body>
{body}
</body>
</html>
""")

# copy needed assets
src_img = os.path.join(BASE, 'figma-import/images')
for ref in sorted(assets):
    src = os.path.join(src_img, ref.replace('/', '_'))
    dst = os.path.join(out_dir, 'assets', ref.replace('/', '_') + '.png')
    if os.path.exists(src) and not os.path.exists(dst):
        import shutil
        shutil.copy(src, dst)
print(f"OK: {OUT_HTML} with {len(css_blocks)} css rules, {len(assets)} assets")
