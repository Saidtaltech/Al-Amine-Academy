#!/usr/bin/env python3
"""Génère un Font Awesome réduit aux seules icônes utilisées par le site.

Font Awesome 6.5.1 Free pèse 268 Ko de woff2 (solid + brands) pour ~2000 glyphes ;
le site en utilise ~215. On extrait les points de code depuis la CSS officielle,
on sous-ensemble les fontes avec fontTools, et on écrit une CSS compacte servie
en local (plus de requête vers cdnjs) avec font-display:swap.
"""
import re, json, os, subprocess, sys

MIRROR = sys.argv[1]
OUT_CSS = 'assets/css/fa-subset.css'
OUT_FONT = 'assets/fonts'
usage = json.load(open('/tmp/perf/icon-usage.json'))

css = open(os.path.join(MIRROR, 'fa/css/all.min.css'), encoding='utf-8').read()

# 1. table alias -> point de code, depuis les règles .fa-xxx:before{content:"\fXXX"}
cp = {}
for sel, content in re.findall(r'((?:\.fa-[a-z0-9-]+(?:::?before)?,?)+)\{--fa:"(\\[0-9a-f]+)"', css):
    code = content
    for name in re.findall(r'\.(fa-[a-z0-9-]+)', sel):
        cp.setdefault(name, code)
for sel, content in re.findall(r'((?:\.fa-[a-z0-9-]+::?before,?)+)\{content:"(\\[0-9a-f]+)"\}', css):
    for name in re.findall(r'\.(fa-[a-z0-9-]+)', sel):
        cp.setdefault(name, content)

FAM = {'solid': ('fa-solid-900.woff2', '"Font Awesome 6 Free"', 900),
       'regular': ('fa-regular-400.woff2', '"Font Awesome 6 Free"', 400),
       'brands': ('fa-brands-400.woff2', '"Font Awesome 6 Brands"', 400)}

os.makedirs(OUT_FONT, exist_ok=True)
rules, faces, missing = [], [], []
for fam, icons in usage.items():
    src, family, weight = FAM[fam]
    codes = []
    for ic in sorted(icons):
        c = cp.get(ic)
        if not c:
            missing.append((fam, ic)); continue
        codes.append((ic, int(c[1:], 16)))
    if not codes:
        continue
    unicodes = ','.join('U+%04X' % c for _, c in codes)
    out = os.path.join(OUT_FONT, 'fa-%s-subset.woff2' % fam)
    subprocess.run(['pyftsubset', os.path.join(MIRROR, 'fa/webfonts', src),
                    '--unicodes=' + unicodes, '--flavor=woff2',
                    '--layout-features=', '--no-hinting', '--desubroutinize',
                    '--output-file=' + out], check=True)
    faces.append('@font-face{font-family:%s;font-style:normal;font-weight:%d;'
                 'font-display:swap;src:url(../fonts/fa-%s-subset.woff2) format("woff2")}'
                 % (family, weight, fam))
    for ic, c in codes:
        rules.append('.%s::before{content:"\\%x"}' % (ic, c))
    print('%-8s %3d icônes -> %s (%d o)' % (fam, len(codes), out, os.path.getsize(out)))

base = ('.fa,.fa-brands,.fa-regular,.fa-solid,.fab,.far,.fas{-moz-osx-font-smoothing:grayscale;'
        '-webkit-font-smoothing:antialiased;display:var(--fa-display,inline-block);font-style:normal;'
        'font-variant:normal;line-height:1;text-rendering:auto}'
        '.fa,.fa-solid,.fas{font-family:"Font Awesome 6 Free";font-weight:900}'
        '.fa-regular,.far{font-family:"Font Awesome 6 Free";font-weight:400}'
        '.fa-brands,.fab{font-family:"Font Awesome 6 Brands";font-weight:400}')
# utilitaires de taille/rotation/animation réellement employés
extras = ('.fa-fw{text-align:center;width:1.25em}.fa-xs{font-size:.75em}.fa-sm{font-size:.875em}'
          '.fa-lg{font-size:1.25em;line-height:.05em;vertical-align:-.075em}.fa-xl{font-size:1.5em}'
          '.fa-2x{font-size:2em}.fa-3x{font-size:3em}.fa-4x{font-size:4em}.fa-5x{font-size:5em}'
          '.fa-spin{animation:fa-spin 2s linear infinite}'
          '.fa-pulse{animation:fa-spin 1s steps(8) infinite}'
          '@keyframes fa-spin{0%{transform:rotate(0)}100%{transform:rotate(360deg)}}'
          '@media(prefers-reduced-motion:reduce){.fa-spin,.fa-pulse{animation-delay:-1ms;'
          'animation-duration:1ms;animation-iteration-count:1}}')

header = ('/*! Font Awesome Free 6.5.1 — sous-ensemble local limité aux icônes du site.\n'
          ' * Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT — Fonticons, Inc.\n'
          ' * Régénérer avec tools/build-fa-subset.py après tout ajout d\'icône. */\n')
open(OUT_CSS, 'w', encoding='utf-8').write(header + ''.join(faces) + base + extras + ''.join(sorted(rules)) + '\n')
print('CSS -> %s (%d o)' % (OUT_CSS, os.path.getsize(OUT_CSS)))
if missing:
    print('\nIcônes introuvables dans Font Awesome 6.5.1 (à corriger dans le HTML) :')
    for fam, ic in missing: print('  %s / %s' % (fam, ic))
