#!/usr/bin/env python3
"""Génère informations.html et la bannière sitewide à partir de
tools/announcements.json.

Pour publier une nouvelle note aux parents :
  1. Ajouter un objet en tête de la liste "items" dans announcements.json
     (severity: "urgent" | "sante" | "info", banner: true sur la nouvelle
     entrée, false sur la précédente).
  2. Relancer : python3 tools/build-announcements.py
  3. Relancer tools/build-js.sh (minifie le bloc bannière mis à jour dans
     site-shell.js) et tools/build-css.sh si une nouvelle classe de sévérité
     a été ajoutée à assets/css/site.css.

Le contenu des notes reste en français : ce sont des communications
officielles signées de la Direction, jamais traduites dans la pratique.
Seuls les textes d'interface (titres de page, filtres) suivent le système
de traduction du site (data-i18n).
"""
import json, os, html, re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
os.chdir(ROOT)
DATA = json.load(open('tools/announcements.json', encoding='utf-8'))
ITEMS, SEV = DATA['items'], DATA['severities']
V = '20261016'
BANNER_ITEM = next((a for a in ITEMS if a.get('banner')), None)
BANNER_ID = ('aaa-announce-' + BANNER_ITEM['id']) if BANNER_ITEM else None

MOIS = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin',
        'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre']


def fr_date(iso):
    y, m, d = (int(x) for x in iso.split('-'))
    return '%d %s %d' % (d, MOIS[m - 1], y)


def esc(t):
    return html.escape(t, quote=True)


SEV_CLASS = {'urgent': 'urgent', 'sante': 'sante', 'info': 'info'}


def card(a):
    sev = SEV[a['severity']]
    resolved = a.get('resolved', False)
    cls = 'aaa-info-card aaa-info-card-%s' % SEV_CLASS[a['severity']]
    if resolved:
        cls += ' aaa-info-card-resolved'
    resolved_tag = (
        '<span class="aaa-info-resolved-tag"><i class="fas fa-check" aria-hidden="true"></i> '
        '<span data-i18n="info.resolved_tag">Résolu</span></span>'
    ) if resolved else ''
    cta = ''
    if a.get('cta_url'):
        external = a['cta_url'].startswith('http')
        attrs = ' target="_blank" rel="noopener"' if external else ''
        cta = (f'<a href="{esc(a["cta_url"])}"{attrs} class="aaa-info-cta">'
               f'{esc(a["cta_label"])} <i class="fas fa-arrow-right text-xs" aria-hidden="true"></i></a>')
    return f'''        <article id="{a['id']}" class="{cls}" data-sev="{a['severity']}">
          <div class="aaa-info-card-head">
            <span class="aaa-info-badge"><i class="fas {esc(sev['icon'])}" aria-hidden="true"></i> <span data-i18n="info.sev_{a['severity']}">{esc(sev['label'])}</span></span>
            <time datetime="{a['date']}">{fr_date(a['date'])}</time>
            {resolved_tag}
          </div>
          <h3>{esc(a['title'])}</h3>
          <div class="aaa-info-body">
{a['body_html']}
          </div>
          {cta}
        </article>'''


def filters():
    counts = {}
    for a in ITEMS:
        counts[a['severity']] = counts.get(a['severity'], 0) + 1
    out = ['          <button type="button" class="aaa-filter is-active" data-filter="all" aria-pressed="true">'
           '<span data-i18n="info.filter_all">Toutes</span> '
           '<span class="aaa-filter-count">%d</span></button>' % len(ITEMS)]
    for key in ('urgent', 'sante', 'info'):
        n = counts.get(key, 0)
        if not n:
            continue
        out.append(f'          <button type="button" class="aaa-filter" data-filter="{key}" aria-pressed="false">'
                   f'<span data-i18n="info.sev_{key}">{esc(SEV[key]["label"])}</span> <span class="aaa-filter-count">{n}</span></button>')
    return '\n'.join(out)


def jsonld():
    items = [{
        "@type": "ListItem", "position": i + 1,
        "url": "https://alamineacademy.com/informations#%s" % a['id'],
        "name": a['title'],
    } for i, a in enumerate(ITEMS)]
    return json.dumps({
        "@context": "https://schema.org", "@type": "CollectionPage",
        "name": "Informations & Annonces — DAARA Al Amine Academy",
        "description": "Notes officielles et consignes publiées aux parents selon les événements.",
        "url": "https://alamineacademy.com/informations",
        "inLanguage": "fr",
        "mainEntity": {"@type": "ItemList", "numberOfItems": len(ITEMS), "itemListElement": items},
    }, ensure_ascii=False, indent=2)


PAGE = f'''<!DOCTYPE html>
<html class="scroll-smooth" lang="fr">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Informations &amp; Annonces — DAARA Al Amine Academy</title>
  <meta name="description" content="Notes officielles et consignes publiées par la Direction selon les événements : santé, sécurité, organisation de l'internat."/>
  <link rel="canonical" href="https://alamineacademy.com/informations"/>
  <link rel="icon" type="image/png" sizes="32x32" href="assets/img/favicon-32.png"/>
  <link rel="apple-touch-icon" href="assets/img/apple-touch-icon.png"/>
  <link rel="alternate" hreflang="fr" href="https://alamineacademy.com/informations"/>
  <link rel="alternate" hreflang="x-default" href="https://alamineacademy.com/informations"/>
  <meta property="og:title" content="Informations &amp; Annonces — DAARA Al Amine Academy"/>
  <meta property="og:description" content="Notes officielles et consignes publiées par la Direction selon les événements."/>
  <meta property="og:type" content="website"/>
  <meta property="og:url" content="https://alamineacademy.com/informations"/>
  <meta property="og:image" content="https://alamineacademy.com/assets/img/LogoAAA.png"/>
  <meta property="og:locale" content="fr_SN"/>
  <meta name="twitter:card" content="summary_large_image"/>
  <meta name="robots" content="noindex, follow"/>
  <script type="application/ld+json">
{jsonld()}
  </script>
  <!-- Feuille unique auto-hébergée : Tailwind + polices + icônes + styles du site.
       Générée par tools/build-css.sh — ne pas éditer assets/css/app.css à la main. -->
  <link rel="preload" as="font" type="font/woff2" href="assets/fonts/montserrat-latin.woff2" crossorigin/>
  <link rel="preload" as="font" type="font/woff2" href="assets/fonts/fa-solid-subset.woff2" crossorigin/>
  <link rel="stylesheet" href="assets/css/app.css?v={V}"/>
  <script>
  try{{if({'localStorage.getItem("' + BANNER_ID + '-dismissed")' if BANNER_ID else 'false'})document.documentElement.classList.add("aaa-announce-off");}}catch(e){{}}</script>
  <style>
    .aaa-filters {{ display: none; }}
    html.aaa-info-filters .aaa-filters {{ display: flex; }}
    .aaa-filter {{
      display: inline-flex; align-items: center; gap: .4rem;
      min-height: 44px; padding: .5rem 1rem;
      border-radius: 9999px; border: 1px solid #cbd5e1;
      background: #fff; color: #334155;
      font-size: .875rem; font-weight: 600; cursor: pointer;
      transition: background-color .15s ease, border-color .15s ease, color .15s ease;
    }}
    .aaa-filter:hover {{ border-color: #94a3b8; background: #f8fafc; }}
    .aaa-filter.is-active {{ background: #165b73; border-color: #165b73; color: #fff; }}
    .aaa-filter-count {{
      font-size: .75rem; font-weight: 700; color: #475569;
      background: rgba(15,23,42,.07); border-radius: 9999px; padding: 0 .4rem;
    }}
    .aaa-filter.is-active .aaa-filter-count {{ color: #fff; background: rgba(15,23,42,.22); }}

    .aaa-info-card {{
      position: relative; background: #fff; border-radius: 1.25rem;
      padding: 1.75rem; box-shadow: 0 1px 3px rgba(15,23,42,.08);
      border-inline-start: 5px solid #94a3b8; scroll-margin-top: 110px;
    }}
    .aaa-info-card-urgent {{ border-inline-start-color: #be123c; }}
    .aaa-info-card-sante  {{ border-inline-start-color: #d97706; }}
    .aaa-info-card-info   {{ border-inline-start-color: #1e7a9a; }}
    .aaa-info-card-resolved {{ opacity: .82; }}
    .aaa-info-card-head {{ display: flex; flex-wrap: wrap; align-items: center; gap: .6rem; margin-bottom: .75rem; }}
    .aaa-info-badge {{
      display: inline-flex; align-items: center; gap: .4rem;
      font-size: .75rem; font-weight: 800; text-transform: uppercase; letter-spacing: .04em;
      padding: .3rem .7rem; border-radius: 9999px;
    }}
    .aaa-info-card-urgent .aaa-info-badge {{ background: #fff1f2; color: #9f1239; }}
    .aaa-info-card-sante  .aaa-info-badge {{ background: #fff7ed; color: #b45309; }}
    .aaa-info-card-info   .aaa-info-badge {{ background: #e8f4f8; color: #165b73; }}
    .aaa-info-card-head time {{ font-size: .8rem; font-weight: 600; color: #64748b; }}
    .aaa-info-resolved-tag {{
      margin-inline-start: auto; display: inline-flex; align-items: center; gap: .3rem;
      font-size: .75rem; font-weight: 700; color: #15803d; background: #f0fdf4;
      padding: .25rem .6rem; border-radius: 9999px;
    }}
    .aaa-info-card h3 {{ font-size: 1.25rem; font-weight: 800; color: #0f172a; margin: 0 0 .9rem; }}
    .aaa-info-body p {{ font-size: .95rem; line-height: 1.7; color: #334155; margin: 0 0 .85rem; }}
    .aaa-info-body p:last-child {{ margin-bottom: 0; }}
    .aaa-info-callout {{
      border-inline-start: 3px solid #1e7a9a; background: #e8f4f8;
      border-radius: 0 .75rem .75rem 0; padding: .9rem 1.1rem; margin: .9rem 0;
    }}
    .aaa-info-callout-sante {{ border-inline-start-color: #d97706; background: #fff7ed; }}
    .aaa-info-callout-gold  {{ border-inline-start-color: #d97706; background: #fefce8; }}
    .aaa-info-callout-title {{ font-weight: 800; color: #0f172a; margin-bottom: .3rem !important; }}
    .aaa-info-sign {{ font-weight: 700; color: #475569; font-style: italic; }}
    .aaa-info-cta {{
      display: inline-flex; align-items: center; gap: .5rem; margin-top: 1.1rem;
      font-size: .9rem; font-weight: 800; color: #165b73;
    }}
    .aaa-info-cta:hover {{ text-decoration: underline; }}
  </style>
</head>
<body class="antialiased bg-slate-50">

  <div id="aaa-wa"></div>
  <div id="aaa-navbar">
    <noscript><nav class="fixed top-0 left-0 right-0 z-50 bg-white p-4 border-b border-slate-200">
      <a href="index" class="font-bold text-primary">DAARA Al Amine Academy</a> ·
      <a href="a-propos">À propos</a> · <a href="fiche-renseignements">Renseignements</a> ·
      <a href="contact">Contact</a>
    </nav></noscript>
  </div>
  <div class="h-20"></div>

  <header class="page-header">
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
      <p class="eyebrow text-secondary mb-4" data-i18n="info.header_eyebrow">DAARA Al Amine Academy</p>
      <h1 class="text-4xl md:text-6xl text-white mb-5 max-w-3xl mx-auto" data-i18n-html="info.header_title">Informations &amp; <span class="text-secondary">Annonces</span></h1>
      <p class="text-white/85 text-lg max-w-2xl mx-auto" data-i18n="info.header_desc">Les notes officielles de la Direction, publiées ici dès qu'un événement concerne vos enfants — santé, sécurité ou organisation de l'internat.</p>
    </div>
  </header>

  <main>
    <section class="py-12 sm:py-16">
      <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

        <div class="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <p class="text-slate-600 max-w-xl" data-i18n="info.section_desc">Classées de la plus récente à la plus ancienne. Une note archivée reste consultable pour la transparence de nos communications.</p>
          <p class="shrink-0 text-sm font-semibold text-slate-500">
            <span id="aaa-info-count">{len(ITEMS)}</span> <span data-i18n="info.count_label">notes</span>
          </p>
        </div>

        <div class="aaa-filters mb-8 flex-wrap gap-2" role="group" aria-label="Filtrer les notes par catégorie">
{filters()}
        </div>

        <div id="aaa-info-list" class="flex flex-col gap-6">
{chr(10).join(card(a) for a in ITEMS)}
        </div>

        <p id="aaa-info-empty" class="hidden py-12 text-center text-slate-500" data-i18n="info.empty">Aucune note dans cette catégorie.</p>
      </div>
    </section>

    <section class="border-t border-primary/10 bg-gradient-to-br from-primary/5 to-primary/10 py-14">
      <div class="mx-auto max-w-3xl px-4 text-center sm:px-6">
        <h2 class="text-2xl font-extrabold text-slate-900 sm:text-3xl" data-i18n="info.cta_title">Une question sur l'une de ces notes ?</h2>
        <p class="mx-auto mt-3 max-w-xl text-slate-600" data-i18n="info.cta_desc">La Direction reste à votre disposition tous les jours, par WhatsApp ou par téléphone.</p>
        <div class="mt-6 flex flex-wrap justify-center gap-3">
          <a href="https://wa.me/221777743700" target="_blank" rel="noopener" class="btn-blue">
            <i class="fab fa-whatsapp" aria-hidden="true"></i>
            <span data-i18n="info.cta_btn1">Écrire sur WhatsApp</span>
          </a>
          <a href="contact" class="btn-outline-blue">
            <i class="fas fa-phone" aria-hidden="true"></i>
            <span data-i18n="info.cta_btn2">Voir nos coordonnées</span>
          </a>
        </div>
      </div>
    </section>
  </main>

  <div id="aaa-footer"></div>

  <script>
  (function () {{
    var list = document.getElementById('aaa-info-list');
    var bar = document.querySelector('.aaa-filters');
    if (!list || !bar) return;
    var cards = Array.prototype.slice.call(list.querySelectorAll('[data-sev]'));
    var count = document.getElementById('aaa-info-count');
    var empty = document.getElementById('aaa-info-empty');

    document.documentElement.classList.add('aaa-info-filters');

    bar.addEventListener('click', function (e) {{
      var btn = e.target.closest('.aaa-filter');
      if (!btn) return;
      var sev = btn.getAttribute('data-filter');
      bar.querySelectorAll('.aaa-filter').forEach(function (b) {{
        var on = b === btn;
        b.classList.toggle('is-active', on);
        b.setAttribute('aria-pressed', on ? 'true' : 'false');
      }});
      var shown = 0;
      cards.forEach(function (c) {{
        var ok = sev === 'all' || c.getAttribute('data-sev') === sev;
        c.hidden = !ok;
        if (ok) shown++;
      }});
      if (count) count.textContent = shown;
      if (empty) empty.classList.toggle('hidden', shown > 0);
    }});

    /* Si l'URL cible une note précise (#id, lien depuis la bannière), on
       s'assure qu'elle est visible même si un filtre était actif, puis on
       défile jusqu'à elle. */
    if (window.location.hash) {{
      var target = document.querySelector(window.location.hash);
      if (target) setTimeout(function () {{ target.scrollIntoView({{ behavior: 'smooth', block: 'start' }}); }}, 60);
    }}
  }})();
  </script>

  <script src="lang.min.js?v={V}"></script>
  <script src="assets/js/modern-reveal.min.js?v={V}" defer></script>
  <script src="assets/js/site-shell.min.js?v={V}" defer></script>
</body>
</html>
'''

open('informations.html', 'w', encoding='utf-8').write(PAGE)
print('informations.html : %d notes, %d o' % (len(ITEMS), os.path.getsize('informations.html')))

# ---------------------------------------------------------------------------
# Régénère le bloc bannière dans assets/js/site-shell.js à partir de
# l'entrée "banner": true (la plus récente qualifie si plusieurs le sont).
# ---------------------------------------------------------------------------
SHELL_PATH = 'assets/js/site-shell.js'
shell = open(SHELL_PATH, encoding='utf-8').read()

START = 'AAA_ANNOUNCE_START */'
END = '/* AAA_ANNOUNCE_END */'
start_i = shell.find(START)
end_i = shell.find(END)
if start_i == -1 or end_i == -1:
    raise SystemExit('Marqueurs AAA_ANNOUNCE_START/END introuvables dans ' + SHELL_PATH)
start_i += len(START)

if BANNER_ITEM is None:
    block = ('\n'
             '  var ANNOUNCE_ID = null;\n'
             '  var ANNOUNCE_HTML = \'\';\n  ')
else:
    sev_class = 'aaa-announce-' + SEV_CLASS[BANNER_ITEM['severity']] if BANNER_ITEM['severity'] != 'info' else 'aaa-announce'
    icon = SEV[BANNER_ITEM['severity']]['icon']

    def js_str(t):
        return t.replace('\\', '\\\\').replace("'", "\\'")

    block = (
        '\n'
        f"  var ANNOUNCE_ID = 'aaa-announce-{BANNER_ITEM['id']}';\n"
        "  var ANNOUNCE_HTML = ''\n"
        f"    + '<div id=\"' + ANNOUNCE_ID + '\" class=\"aaa-announce {sev_class}\">'\n"
        f"    +   '<i class=\"fas {icon}\" aria-hidden=\"true\"></i>'\n"
        f"    +   '<span class=\"aaa-announce-short\">{js_str(esc(BANNER_ITEM['banner_short']))}</span>'\n"
        f"    +   '<span class=\"aaa-announce-long\">{js_str(esc(BANNER_ITEM['banner_text']))}</span>'\n"
        "    +   '<a href=\"' + ASSET_PREFIX + 'informations#" + BANNER_ITEM['id'] + "\">'\n"
        "    +     '<span class=\"aaa-announce-short\" data-i18n=\"announce.cta_short\">Détails</span>'\n"
        "    +     '<span class=\"aaa-announce-long\" data-i18n=\"announce.cta\">En savoir plus</span>'\n"
        "    +   '</a>'\n"
        "    +   '<button id=\"aaa-announce-close\" type=\"button\" aria-label=\"Fermer l\\'annonce\" data-i18n-attr=\"aria-label:announce.close\">'\n"
        "    +     '<i class=\"fas fa-times\" aria-hidden=\"true\"></i>'\n"
        "    +   '</button>'\n"
        "    + '</div>';\n  "
    )

shell = shell[:start_i] + block + shell[end_i:]
open(SHELL_PATH, 'w', encoding='utf-8').write(shell)
print('site-shell.js : bannière régénérée pour %s' % (BANNER_ITEM['id'] if BANNER_ITEM else '(aucune bannière active)'))
