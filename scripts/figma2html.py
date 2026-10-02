#!/usr/bin/env python3
"""Figma JSON -> pixel-exact static HTML/CSS converter (v2).

Usage: python3 scripts/figma2html.py <frame_id> <out_html> <geometry_json> <out_root>
Produces: <out_root>/<page>.html, css/<page>.css, css/responsive.css (once),
assets/img/*.webp (converted later), assets/icons/*.svg
"""
import json, sys, os, re, shutil

FRAME_ID = sys.argv[1]
OUT_HTML = sys.argv[2]
GEO = sys.argv[3] if len(sys.argv) > 3 and sys.argv[3] else None
OUT_ROOT = sys.argv[4] if len(sys.argv) > 4 else os.path.dirname(os.path.abspath(OUT_HTML))

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
full = json.load(open(os.path.join(BASE, 'figma-import/full.json')))
geom_doc = json.load(open(GEO))['document'] if GEO else None
doc = full['document']

IMG_DIR = os.path.join(BASE, 'figma-import/images')
ASSETS_IMG = os.path.join(OUT_ROOT, 'assets/img')
ASSETS_ICO = os.path.join(OUT_ROOT, 'assets/icons')
os.makedirs(ASSETS_IMG, exist_ok=True)
os.makedirs(ASSETS_ICO, exist_ok=True)

PAGE_LINKS = {
    'Gadget-grid': 'gadgetgrid.html',
    'Axemoon': 'axemoon.html',
    'Capital-Fruit': 'capital-fruit.html',
    'Aura': 'aura.html',
    'Torob-PLP-Redesign': 'torob-plp.html',
    'Movie-night-generator': 'movie-night.html',
    'Windows-Control-Center-Concept': 'windows-cc.html',
}
NAV_LINKS = {
    'Home': 'index.html#top',
    'Projects': '#projects',
    'About me': '#about',
    'Resume': '#resume',
}
CONTACT_SEMANTIC = ['call', 'phone', 'mail', 'instagram', 'linkedin', 'dribbble']

def find(n, tid):
    if n.get('id') == tid:
        return n
    for c in n.get('children', []):
        r = find(c, tid)
        if r:
            return r
    return None

root = find(doc, FRAME_ID)
if not root:
    sys.exit(f'frame {FRAME_ID} not found')

FONT_WEIGHTS = {'Regular': 400, 'Medium': 500, 'SemiBold': 600, 'Bold': 700, 'ExtraLight': 200, 'Light': 300, 'ExtraBold': 800}

css_blocks = []
img_assets = {}   # filename -> source ref
icon_assets = {}  # filename -> svg string
manifest = {'images': {}, 'icons': {}}

def sanitize(s):
    s = re.sub(r'[^A-Za-z0-9_.-]+', '-', s)
    return s.strip('-') or 'asset'

def rgba(f):
    if f.get('type') == 'SOLID':
        c = f['color']
        return f"rgba({round(c['r']*255)}, {round(c['g']*255)}, {round(c['b']*255)}, {round(c.get('a',1),3)})"
    return None

def is_icon_root(n):
    name = n.get('name', '')
    low = name.lower()
    if 'container' in low or 'row' in low:
        return False
    if 'icon' not in low and not low.startswith('akar-icons'):
        return False
    return True

def collect_icon(n, R, parts, base=None):
    """base=(bx,by,sx,sy,cx,cy): maps absolute coords of current space into icon space."""
    bb = n.get('absoluteBoundingBox') or {}
    if base:
        bx, by, sx, sy, cx, cy = base
        dx = bx + (bb.get('x', 0) - cx) * sx
        dy = by + (bb.get('y', 0) - cy) * sy
    else:
        dx = bb.get('x', 0) - R['x']
        dy = bb.get('y', 0) - R['y']
        sx = sy = 1
    if n.get('type') == 'INSTANCE' and n.get('componentId') and geom_doc:
        cnode = find(geom_doc, n['componentId'])
        if cnode:
            cbb = cnode.get('absoluteBoundingBox') or {}
            s2x = bb.get('width', 1) / max(cbb.get('width', 1), 0.001)
            s2y = bb.get('height', 1) / max(cbb.get('height', 1), 0.001)
            nb = (dx, dy, sx * s2x, sy * s2y, cbb.get('x', 0), cbb.get('y', 0))
            for c in cnode.get('children', []):
                collect_icon(c, R, parts, base=nb)
            return
    g = find(geom_doc, n['id']) if geom_doc else None
    if g:
        fills = [f for f in n.get('fills', []) or [] if f.get('visible', True)]
        fillc = rgba(fills[0]) if fills else '#000000'
        for geo in g.get('fillGeometry', []) or []:
            parts.append(f'<path transform="translate({dx:.2f} {dy:.2f}) scale({sx:.3f} {sy:.3f})" d="{geo.get("path","")}" fill="{fillc}" fill-rule="evenodd"/>')
        strokes = [s for s in n.get('strokes', []) or [] if s.get('visible', True)]
        if strokes:
            sc = rgba(strokes[0]) or fillc
            for geo in g.get('strokeGeometry', []) or []:
                parts.append(f'<path transform="translate({dx:.2f} {dy:.2f}) scale({sx:.3f} {sy:.3f})" d="{geo.get("path","")}" fill="{sc}"/>')
    for c in n.get('children', []):
        collect_icon(c, R, parts, base=base)

def export_icon(n):
    bb = n.get('absoluteBoundingBox') or {}
    w, h = bb.get('width', 0), bb.get('height', 0)
    if w <= 0 or h <= 0:
        return None
    parts = []
    collect_icon(n, bb, parts)
    if not parts:
        return None
    name = sanitize(n.get('name', 'icon'))
    svg = f'<svg xmlns="http://www.w3.org/2000/svg" width="{w:.2f}" height="{h:.2f}" viewBox="0 0 {w:.2f} {h:.2f}">{"".join(parts)}</svg>'
    path = os.path.join(ASSETS_ICO, name + '.svg')
    if not os.path.exists(path):
        open(path, 'w').write(svg)
    icon_assets[name] = (w, h)
    manifest['icons'][name + '.svg'] = f"{w:.0f}x{h:.0f}"
    return name, w, h

def link_for(n):
    name = n.get('name', '')
    if name in PAGE_LINKS:
        return PAGE_LINKS[name]
    if name in NAV_LINKS:
        return NAV_LINKS[name]
    low = name.lower()
    if low.startswith('contact container') or name == 'Contact Container':
        return '#contact'
    for key in CONTACT_SEMANTIC:
        if key in low:
            if key in ('call', 'phone'):
                return 'tel:+00000000000'
            if key == 'mail':
                return 'mailto:you@example.com'
            return '#'
    return None

def external(n):
    low = n.get('name', '').lower()
    return any(k in low for k in ('instagram', 'linkedin', 'dribbble'))

ALIGN_MAIN = {'MIN': 'flex-start', 'CENTER': 'center', 'MAX': 'flex-end', 'SPACE_BETWEEN': 'space-between'}
ALIGN_CROSS = {'MIN': 'flex-start', 'CENTER': 'center', 'MAX': 'flex-end', 'BASELINE': 'baseline', 'STRETCH': 'stretch'}

def is_two_col_grid(n):
    if n.get('layoutMode') != 'HORIZONTAL':
        return False
    kids = n.get('children', [])
    if len(kids) != 2:
        return False
    ws = [(c.get('absoluteBoundingBox') or {}).get('width', 0) for c in kids]
    return all(500 < w < 700 for w in ws)

def emit(n, parent, depth=0):
    cls = ['n' + n['id'].replace(':', '-')]
    bb = n.get('absoluteBoundingBox') or {}
    w, h = bb.get('width', 0), bb.get('height', 0)
    rules = []
    inner = ''
    t = n.get('type')
    name = n.get('name', '')
    extra_attrs = ''

    if parent is None:
        cls.append('page')
        rules.append(f"position: relative; width: {w:.1f}px; height: {h:.1f}px; margin: 0 auto")
    elif parent.get('layoutMode'):
        if n.get('layoutGrow') == 1:
            rules.append('flex-grow: 1')
        la = n.get('layoutAlign')
        if la == 'FILL' and parent['layoutMode'] == 'VERTICAL':
            rules.append('align-self: stretch')
        elif la == 'STRETCH' and parent['layoutMode'] == 'HORIZONTAL':
            rules.append('align-self: stretch')
    else:
        pb = parent.get('absoluteBoundingBox') or {}
        cls.append('sec' if parent.get('name') == root.get('name') and parent is root else '')
        rules.append(f"position: absolute; left: {bb.get('x',0)-pb.get('x',0):.1f}px; top: {bb.get('y',0)-pb.get('y',0):.1f}px")

    if parent is root:
        cls.append('sec')
        sec_id = {'161:14112': 'projects', '161:14121': 'cases', '161:14129': 'about', '161:14269': 'resume', '161:14334': 'contact', '161:14365': 'navtop'}.get(n['id'])
        if sec_id:
            extra_attrs += f' id="{sec_id}"'

    if t != 'TEXT':
        rules.append(f"width: {w:.1f}px")
        rules.append(f"height: {h:.1f}px")
        if w > 0 and h > 0:
            rules.append(f"--ar: {w:.0f}/{h:.0f}")
        if w >= 1200:
            cls.append('W1')
        elif w >= 900:
            cls.append('W2')
        elif w >= 500:
            cls.append('W3')

    # icon export & <img> replacement
    icon = None
    if is_icon_root(n):
        icon = export_icon(n)

    if t in ('FRAME', 'COMPONENT', 'INSTANCE', 'COMPONENT_SET'):
        if is_two_col_grid(n):
            cls.append('grid2')
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
            if am != 'flex-start':
                rules.append(f"justify-content: {am}")
            ac = ALIGN_CROSS.get(n.get('counterAxisAlignItems', 'MIN'))
            if ac != 'flex-start':
                rules.append(f"align-items: {ac}")
        for f in [f for f in n.get('fills', []) or [] if f.get('visible', True)]:
            if f.get('type') == 'IMAGE' and f.get('imageRef'):
                fname = sanitize(name)
                src = os.path.join(IMG_DIR, f['imageRef'].replace('/', '_'))
                if fname not in img_assets and os.path.exists(src):
                    shutil.copy(src, os.path.join(ASSETS_IMG, fname + '.png'))
                    img_assets[fname] = f['imageRef']
                    manifest['images'][fname + '.webp'] = f"{w:.0f}x{h:.0f}"
                mode = f.get('scaleMode', 'FILL')
                size = {'FILL': 'cover', 'FIT': 'contain', 'STRETCH': '100% 100%'}.get(mode, 'cover')
                rules.append(f"background-image: url('assets/img/{fname}.webp'); background-size: {size}; background-position: center; background-repeat: no-repeat")
                cls.append('imgbox')
            elif f.get('type') == 'SOLID':
                rules.append(f"background-color: {rgba(f)}")
        strokes = [s for s in n.get('strokes', []) or [] if s.get('visible', True)]
        if strokes and n.get('strokeWeight'):
            colr = rgba(strokes[0])
            if colr:
                rules.append(f"border: {n['strokeWeight']}px solid {colr}")
        if n.get('cornerRadius'):
            rules.append(f"border-radius: {n['cornerRadius']:.1f}px")
        elif n.get('rectangleCornerRadii') and any(n.get('rectangleCornerRadii')):
            r = n['rectangleCornerRadii']
            rules.append(f"border-radius: {r[0]}px {r[1]}px {r[2]}px {r[3]}px")
        if n.get('opacity') not in (None, 1.0):
            rules.append(f"opacity: {n['opacity']}")
        if name == 'Navbar':
            cls.append('nav')
            inner += '<label class="burger" for="burger" aria-label="menu"><span></span><span></span><span></span></label>'
        if name == 'Menu':
            cls.append('menu')
        if name == 'Grid Container' or name == 'Projects Container':
            pass
        if icon:
            iname, iw, ih = icon
            html = f'<img class="icn" src="assets/icons/{iname}.svg" width="{iw:.0f}" height="{ih:.0f}" alt="{name}">'
            css_blocks.append(f".{cls[0]} {{ {'; '.join(rules)} }}")
            return wrap_link(n, f'<span class="{ " ".join(c for c in cls if c)}">{html}</span>')
        for c in n.get('children', []):
            inner += emit(c, n, depth+1)
    elif t == 'GROUP':
        for c in n.get('children', []):
            inner += emit(c, n, depth+1)
    elif t in ('RECTANGLE', 'ELLIPSE', 'LINE', 'REGULAR_POLYGON', 'STAR'):
        for f in [f for f in n.get('fills', []) or [] if f.get('visible', True)]:
            if f.get('type') == 'IMAGE' and f.get('imageRef'):
                fname = sanitize(name)
                src = os.path.join(IMG_DIR, f['imageRef'].replace('/', '_'))
                if fname not in img_assets and os.path.exists(src):
                    shutil.copy(src, os.path.join(ASSETS_IMG, fname + '.png'))
                    img_assets[fname] = f['imageRef']
                    manifest['images'][fname + '.webp'] = f"{w:.0f}x{h:.0f}"
                mode = f.get('scaleMode', 'FILL')
                size = {'FILL': 'cover', 'FIT': 'contain', 'STRETCH': '100% 100%'}.get(mode, 'cover')
                rules.append(f"background-image: url('assets/img/{fname}.webp'); background-size: {size}; background-position: center; background-repeat: no-repeat")
                cls.append('imgbox')
            elif f.get('type') == 'SOLID':
                rules.append(f"background-color: {rgba(f)}")
        if t == 'ELLIPSE':
            rules.append('border-radius: 50%')
            if name == 'profile-image':
                cls.append('imgbox')
        elif n.get('cornerRadius'):
            rules.append(f"border-radius: {n['cornerRadius']:.1f}px")
        if name in PAGE_LINKS:
            cls.append('card')
    elif t in ('VECTOR', 'BOOLEAN_OPERATION'):
        g = find(geom_doc, n['id']) if geom_doc else None
        parts = []
        if g:
            fills = [f for f in n.get('fills', []) or [] if f.get('visible', True)]
            fillc = rgba(fills[0]) if fills else '#000000'
            pad = max(n.get('strokeWeight') or 0, 2)
            for geo in g.get('fillGeometry', []) or []:
                parts.append(f'<path d="{geo.get("path","")}" fill="{fillc}" fill-rule="evenodd"/>')
            strokes = [s for s in n.get('strokes', []) or [] if s.get('visible', True)]
            if strokes:
                sc = rgba(strokes[0]) or fillc
                for geo in g.get('strokeGeometry', []) or []:
                    parts.append(f'<path d="{geo.get("path","")}" fill="{sc}"/>')
            if parts:
                W = w + 2*pad; H = h + 2*pad
                inner = f'<svg style="margin: {-pad:.1f}px; display:block" width="{W:.2f}" height="{H:.2f}" viewBox="{-pad:.2f} {-pad:.2f} {W:.2f} {H:.2f}" xmlns="http://www.w3.org/2000/svg">{"".join(parts)}</svg>'
                rules.append('line-height: 0')
    elif t == 'TEXT':
        st = n.get('style', {})
        fam = st.get('fontFamily', 'Manrope')
        post = st.get('fontPostScriptName') or ''
        weight = 400
        for k, v in FONT_WEIGHTS.items():
            if k in post:
                weight = v
        fills = [f for f in n.get('fills', []) or [] if f.get('visible', True)]
        color = rgba(fills[0]) if fills else '#000000'
        fs = st.get('fontSize', 14)
        cls += ['txt', f'fs-{int(fs)}']
        rules.append(f"font-family: '{fam}', sans-serif")
        rules.append(f"font-weight: {weight}")
        rules.append(f"font-size: {fs}px")
        lh = st.get('lineHeightPx')
        if lh:
            rules.append(f"line-height: {lh:.1f}px")
        ls = st.get('letterSpacing', 0)
        if ls:
            rules.append(f"letter-spacing: {ls:.2f}px")
        rules.append(f"color: {color}")
        rules.append('text-align: ' + st.get('textAlignHorizontal', 'LEFT').lower())
        rules.append(f"width: {w:.1f}px")
        rules.append('white-space: pre-wrap')
        txt = n.get('characters', '')
        inner = txt.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;')

    css_blocks.append(f".{' .'.join([]) if False else ''}{'.'.join(c for c in cls if c)} {{ {'; '.join(r for r in rules if r)} }}")
    html = f'<div class="{" ".join(c for c in cls if c)}"{extra_attrs}>{inner}</div>'
    return wrap_link(n, html)

def wrap_link(n, html):
    href = link_for(n)
    if not href:
        return html
    cls = 'linkwrap'
    attrs = f' href="{href}"'
    if external(n):
        attrs += ' target="_blank" rel="noopener noreferrer"'
        cls += ' ext'
    if href.startswith('#') or href.endswith('.html') or href.startswith('index'):
        pass
    if href in ('tel:+00000000000',):
        attrs += ' data-link="phone"'
    if href == 'mailto:you@example.com':
        attrs += ' data-link="email"'
    if href == '#':
        attrs += f' data-link="{sanitize(n.get("name","")).lower()}"'
    return f'<a class="{cls}"{attrs}>{html}</a>'

body = emit(root, None)

css = "/* generated from Figma — pixel exact */\n* { box-sizing: border-box; margin: 0; padding: 0; }\n"
css += "body { background: #ffffff; font-family: 'Manrope', sans-serif; }\n"
css += "a.linkwrap { text-decoration: none; color: inherit; display: block; }\n"
css += "a.linkwrap.ext { display: inline-block; }\n"
css += ".icn { display: block; }\n"
css += "\n".join(css_blocks) + "\n"

css_dir = os.path.join(OUT_ROOT, 'css')
os.makedirs(css_dir, exist_ok=True)
page_name = os.path.basename(OUT_HTML)[:-5]
with open(os.path.join(css_dir, page_name + '.css'), 'w') as f:
    f.write(css)

with open(OUT_HTML, 'w') as f:
    f.write(f"""<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Hamid Reza Mohammadi — Product Designer</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Manrope:wght@200..800&family=Vazirmatn:wght@100..900&display=swap" rel="stylesheet">
<link rel="stylesheet" href="css/{page_name}.css">
<link rel="stylesheet" href="css/responsive.css">
</head>
<body id="top">
<input type="checkbox" id="burger" class="burger-check">
{body}
</body>
</html>
""")

mpath = os.path.join(OUT_ROOT, 'assets/manifest.json')
merged = json.load(open(mpath)) if os.path.exists(mpath) else {'images': {}, 'icons': {}}
merged['images'].update(manifest['images'])
merged['icons'].update(manifest['icons'])
json.dump(merged, open(mpath, 'w'), indent=1, ensure_ascii=False)
print(f"OK: {OUT_HTML} ({len(css_blocks)} rules) images={len(img_assets)} icons={len(icon_assets)}")
