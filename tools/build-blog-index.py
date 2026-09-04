#!/usr/bin/env python3
"""Génère blog/index.html à partir de tools/blog-articles.json.

Le site avait deux pages d'index concurrentes : blog.html à la racine et
blog/index.html. Le serveur donnant la priorité au répertoire, les visiteurs
voyaient blog/index.html — la plus ancienne, non traduite — pendant que les
corrections étaient appliquées à l'autre. Résultat : 11 des 22 articles
n'étaient liés depuis aucune des deux.

Une seule page est désormais générée à partir d'une source unique. Pour
ajouter un article : compléter blog-articles.json, puis relancer ce script.
Les vignettes 640x360 sont produites par le même passage.
"""
import json, os, html
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
os.chdir(ROOT)
DATA = json.load(open('tools/blog-articles.json', encoding='utf-8'))
ARTS, CATS = DATA['articles'], DATA['categories']
V = '20260904'


def crop_to(im, tw, th):
    """Recadrage centré au bon rapport, puis redimensionnement."""
    w, h = im.size
    if w / h > tw / th:
        nw = int(h * tw / th); im = im.crop(((w - nw) // 2, 0, (w + nw) // 2, h))
    else:
        nh = int(w * th / tw); im = im.crop((0, (h - nh) // 2, w, (h + nh) // 2))
    return im.resize((tw, th), Image.LANCZOS)


def build_images():
    """Vignette 640x360 de la carte et image de partage 1200x630.

    Sept articles déclaraient un og:image sur /images/og-*.jpg qui renvoyait
    404 : aucune vignette n'apparaissait au partage WhatsApp ou Facebook. Six
    autres pointaient sur des photos Unsplash. Chaque article a désormais une
    image tirée des photos de l'école.
    """
    os.makedirs('assets/img/blog', exist_ok=True)
    for a in ARTS:
        src = next(('assets/img/' + a['image'] + e) for e in ('.webp', '.jpg', '.png')
                   if os.path.exists('assets/img/' + a['image'] + e))
        im = Image.open(src).convert('RGB')
        crop_to(im, 640, 360).save('assets/img/blog/%s.webp' % a['slug'],
                                   'WEBP', quality=76, method=6)
        crop_to(im, 1200, 630).save('assets/img/blog/og-%s.jpg' % a['slug'],
                                    'JPEG', quality=82, optimize=True, progressive=True)
    print('%d vignettes et %d images de partage régénérées' % (len(ARTS), len(ARTS)))


MOIS = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin',
        'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre']


def fr_date(iso):
    y, m, d = (int(x) for x in iso.split('-'))
    return '%d %s %d' % (d, MOIS[m - 1], y)


def esc(t):
    return html.escape(t, quote=True)


def card(a, i):
    """Une carte d'article.

    L'image réserve sa place (aspect-video) pour qu'aucun décalage ne se
    produise au chargement ; les trois premières sont chargées normalement,
    les suivantes en différé puisqu'elles sont sous la ligne de flottaison.
    """
    lazy = '' if i < 3 else ' loading="lazy" decoding="async"'
    prio = ' fetchpriority="high"' if i == 0 else ''
    return f'''        <article class="reveal group flex flex-col overflow-hidden rounded-2xl bg-white shadow-md ring-1 ring-slate-900/5 transition hover:shadow-xl focus-within:shadow-xl" data-cat="{a['cat']}">
          <a href="{a['slug']}" class="block overflow-hidden aspect-video bg-slate-100" tabindex="-1" aria-hidden="true">
            <img src="../assets/img/blog/{a['slug']}.webp" alt="" width="640" height="360"{lazy}{prio}
                 class="h-full w-full object-cover transition duration-500 group-hover:scale-105"/>
          </a>
          <div class="flex flex-1 flex-col gap-3 p-5">
            <div class="flex items-center gap-2 text-xs font-semibold">
              <span class="rounded-full bg-primary/10 px-2.5 py-1 text-primary-dark">{esc(CATS[a['cat']])}</span>
              <time datetime="{a['date']}" class="text-slate-500">{fr_date(a['date'])}</time>
            </div>
            <h3 class="text-lg font-extrabold leading-snug text-slate-900">
              <a href="{a['slug']}" class="after:absolute after:inset-0 hover:text-primary-dark focus-visible:text-primary-dark">{esc(a['title'])}</a>
            </h3>
            <p class="text-sm leading-relaxed text-slate-600">{esc(a['desc'])}</p>
            <span class="mt-auto inline-flex items-center gap-1.5 pt-1 text-sm font-bold text-primary-dark">
              <span data-i18n="blog.read_more">Lire l'article</span>
              <i class="fas fa-arrow-right text-xs transition group-hover:translate-x-1" aria-hidden="true"></i>
            </span>
          </div>
        </article>'''


def filters():
    out = ['          <button type="button" class="aaa-filter is-active" data-filter="all" aria-pressed="true">'
           '<span data-i18n="blog.filter_all">Tous</span> '
           '<span class="aaa-filter-count">%d</span></button>' % len(ARTS)]
    for key, label in CATS.items():
        n = sum(1 for a in ARTS if a['cat'] == key)
        if not n:
            continue
        out.append(f'          <button type="button" class="aaa-filter" data-filter="{key}" aria-pressed="false">'
                   f'{esc(label)} <span class="aaa-filter-count">{n}</span></button>')
    return '\n'.join(out)


def jsonld():
    items = [{
        "@type": "ListItem", "position": i + 1,
        "url": "https://alamineacademy.com/blog/%s" % a['slug'],
        "name": a['title'],
    } for i, a in enumerate(ARTS)]
    return json.dumps({
        "@context": "https://schema.org", "@type": "CollectionPage",
        "name": "Blog — DAARA Al Amine Academy",
        "description": "Guides et conseils sur l'éducation coranique moderne à Dakar.",
        "url": "https://alamineacademy.com/blog/",
        "inLanguage": "fr",
        "mainEntity": {"@type": "ItemList", "numberOfItems": len(ARTS), "itemListElement": items},
    }, ensure_ascii=False, indent=2)


PAGE = f'''<!DOCTYPE html>
<html class="scroll-smooth" lang="fr">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Blog &amp; ressources — DAARA Al Amine Academy</title>
  <meta name="description" content="Guides et conseils sur l'éducation coranique moderne à Dakar : choisir un daara, tarifs, internat, mémorisation du Coran, camps de vacances. {len(ARTS)} articles."/>
  <link rel="canonical" href="https://alamineacademy.com/blog/"/>
  <link rel="icon" type="image/png" sizes="32x32" href="../assets/img/favicon-32.png"/>
  <link rel="apple-touch-icon" href="../assets/img/apple-touch-icon.png"/>
  <link rel="alternate" hreflang="fr" href="https://alamineacademy.com/blog/"/>
  <link rel="alternate" hreflang="x-default" href="https://alamineacademy.com/blog/"/>
  <meta property="og:title" content="Blog &amp; ressources — DAARA Al Amine Academy"/>
  <meta property="og:description" content="Guides et conseils sur l'éducation coranique moderne à Dakar."/>
  <meta property="og:type" content="website"/>
  <meta property="og:url" content="https://alamineacademy.com/blog/"/>
  <meta property="og:image" content="https://alamineacademy.com/assets/img/LogoAAA.png"/>
  <meta property="og:locale" content="fr_SN"/>
  <meta name="twitter:card" content="summary_large_image"/>
  <script type="application/ld+json">
{jsonld()}
  </script>
  <!-- Feuille unique auto-hébergée : Tailwind + polices + icônes + styles du site.
       Générée par tools/build-css.sh — ne pas éditer assets/css/app.css à la main. -->
  <link rel="preload" as="font" type="font/woff2" href="../assets/fonts/montserrat-latin.woff2" crossorigin/>
  <link rel="preload" as="font" type="font/woff2" href="../assets/fonts/fa-solid-subset.woff2" crossorigin/>
  <link rel="stylesheet" href="../assets/css/app.css?v={V}"/>
  <script>/* Réserve (ou non) la hauteur de la bannière avant le premier rendu,
     pour éviter que le contenu ne se décale quand le shell est injecté. */
  try{{if(localStorage.getItem("aaa-announce-socabeg-2026-dismissed"))document.documentElement.classList.add("aaa-announce-off");}}catch(e){{}}</script>
  <style>
    /* Filtres par thème — la page reste utilisable sans JavaScript :
       les boutons ne sont affichés qu'une fois le script en place. */
    .aaa-filters {{ display: none; }}
    html.aaa-blog-filters .aaa-filters {{ display: flex; }}
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
    /* Pas d'opacité sur le compteur : à 0,75 il tombait à 3,48:1 sur le bleu
       du filtre actif, sous le seuil de 4,5:1 (WCAG 2.1 AA). */
    .aaa-filter-count {{
      font-size: .75rem; font-weight: 700; color: #475569;
      background: rgba(15,23,42,.07); border-radius: 9999px; padding: 0 .4rem;
    }}
    .aaa-filter.is-active .aaa-filter-count {{
      color: #fff; background: rgba(15,23,42,.22);   /* 9,4:1 sur le bleu actif */
    }}
    /* La carte entière est cliquable via le lien du titre (after:inset-0). */
    article[data-cat] {{ position: relative; }}
  </style>
</head>
<body class="antialiased bg-slate-50">

  <div id="aaa-wa"></div>
  <div id="aaa-navbar">
    <noscript><nav class="fixed top-0 left-0 right-0 z-50 bg-white p-4 border-b border-slate-200">
      <a href="../index" class="font-bold text-primary">DAARA Al Amine Academy</a> ·
      <a href="../a-propos">À propos</a> · <a href="../fiche-renseignements">Renseignements</a> ·
      <a href="../contact">Contact</a>
    </nav></noscript>
  </div>
  <div class="h-20"></div>

  <header class="page-header">
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
      <p class="eyebrow text-secondary mb-4" data-i18n="blog.header_eyebrow">Blog DAARA Al Amine</p>
      <h1 class="text-4xl md:text-6xl text-white mb-5 max-w-3xl mx-auto" data-i18n-html="blog.header_title">Articles &amp; <span class="text-secondary">ressources</span></h1>
      <p class="text-white/85 text-lg max-w-2xl mx-auto" data-i18n="blog.header_desc">Tout ce qu'il faut savoir sur l'éducation coranique moderne au Sénégal.</p>
    </div>
  </header>

  <main>
    <section class="py-12 sm:py-16">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        <div class="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900" data-i18n="blog.section_title">Conseils et guides pour les familles</h2>
            <p class="mt-2 text-slate-600" data-i18n="blog.section_desc">Tout ce qu'il faut savoir sur l'éducation coranique moderne, le choix d'un daara et la vie d'élève à Al Amine Academy.</p>
          </div>
          <p class="shrink-0 text-sm font-semibold text-slate-500">
            <span id="aaa-blog-count">{len(ARTS)}</span> <span data-i18n="blog.count_label">articles</span>
          </p>
        </div>

        <div class="aaa-filters mb-8 flex-wrap gap-2" role="group" aria-label="Filtrer les articles par thème">
{filters()}
        </div>

        <div id="aaa-blog-grid" class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
{chr(10).join(card(a, i) for i, a in enumerate(ARTS))}
        </div>

        <p id="aaa-blog-empty" class="hidden py-12 text-center text-slate-500" data-i18n="blog.empty">Aucun article dans ce thème.</p>
      </div>
    </section>

    <section class="border-t border-primary/10 bg-gradient-to-br from-primary/5 to-primary/10 py-14">
      <div class="mx-auto max-w-3xl px-4 text-center sm:px-6">
        <h2 class="text-2xl font-extrabold text-slate-900 sm:text-3xl" data-i18n="blog.cta_title">Une question sur l'inscription de votre enfant ?</h2>
        <p class="mx-auto mt-3 max-w-xl text-slate-600" data-i18n="blog.cta_desc">Nous répondons aux familles tous les jours, par WhatsApp ou par téléphone.</p>
        <div class="mt-6 flex flex-wrap justify-center gap-3">
          <a href="../fiche-renseignements" class="btn-blue">
            <i class="fas fa-pen-fancy" aria-hidden="true"></i>
            <span data-i18n="blog.cta_btn1">Demander des renseignements</span>
          </a>
          <a href="https://wa.me/221777743700" target="_blank" rel="noopener" class="btn-outline-blue">
            <i class="fab fa-whatsapp" aria-hidden="true"></i>
            <span data-i18n="blog.cta_btn2">Écrire sur WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  </main>

  <div id="aaa-footer"></div>

  <script>
  (function () {{
    var grid = document.getElementById('aaa-blog-grid');
    var bar = document.querySelector('.aaa-filters');
    if (!grid || !bar) return;
    var cards = Array.prototype.slice.call(grid.querySelectorAll('[data-cat]'));
    var count = document.getElementById('aaa-blog-count');
    var empty = document.getElementById('aaa-blog-empty');

    /* Les filtres n'apparaissent qu'ici : sans JavaScript, les 22 articles
       restent tous visibles plutôt que d'offrir des boutons inertes. */
    document.documentElement.classList.add('aaa-blog-filters');

    bar.addEventListener('click', function (e) {{
      var btn = e.target.closest('.aaa-filter');
      if (!btn) return;
      var cat = btn.getAttribute('data-filter');
      bar.querySelectorAll('.aaa-filter').forEach(function (b) {{
        var on = b === btn;
        b.classList.toggle('is-active', on);
        b.setAttribute('aria-pressed', on ? 'true' : 'false');
      }});
      var shown = 0;
      cards.forEach(function (c) {{
        var ok = cat === 'all' || c.getAttribute('data-cat') === cat;
        c.hidden = !ok;
        if (ok) shown++;
      }});
      if (count) count.textContent = shown;
      if (empty) empty.classList.toggle('hidden', shown > 0);
    }});
  }})();
  </script>

  <script src="../lang.min.js?v={V}"></script>
  <script src="../assets/js/modern-reveal.min.js?v={V}" defer></script>
  <script src="../assets/js/site-shell.min.js?v={V}" defer></script>
</body>
</html>
'''

build_images()
open('blog/index.html', 'w', encoding='utf-8').write(PAGE)
print('blog/index.html : %d articles, %d o' % (len(ARTS), os.path.getsize('blog/index.html')))
