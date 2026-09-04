#!/usr/bin/env python3
"""Bascule toutes les pages sur la feuille unique auto-hébergée.

Retire de chaque page :
  - Google Fonts et Font Awesome (deux CDN, deux résolutions DNS + TLS) ;
  - AOS depuis unpkg, remplacé par modern-reveal.js ;
  - les trois feuilles séparées, désormais fusionnées dans app.css ;
  - translations.js (357 Ko), le dictionnaire est chargé à la demande ;
  - l'écran de chargement plein écran, qui retardait le rendu du contenu.

Ajoute le préchargement des deux polices critiques, app.css, et le bloc de
scripts minifiés. Idempotent : relancer le script ne fait rien de plus.
"""
import re, glob

V = '20260904'
BLOCK_MARK = 'assets/css/app.css'

REMOVE = [
    (r'[ \t]*<link[^>]*href="https://fonts\.googleapis\.com[^"]*"[^>]*>[ \t]*\n?', 'google-fonts'),
    (r'[ \t]*<link[^>]*href="https://cdnjs\.cloudflare\.com[^"]*font-awesome[^"]*"[^>]*>[ \t]*\n?', 'font-awesome'),
    (r'[ \t]*<link[^>]*href="https://unpkg\.com/aos[^"]*"[^>]*>[ \t]*\n?', 'aos-css'),
    (r'[ \t]*<script[^>]*src="https://unpkg\.com/aos[^"]*"[^>]*>\s*</script>[ \t]*\n?', 'aos-js'),
    (r'[ \t]*<link[^>]*rel="preconnect"[^>]*href="https://fonts\.(?:googleapis|gstatic)\.com"[^>]*>[ \t]*\n?', 'preconnect'),
    (r'[ \t]*<link[^>]*rel="dns-prefetch"[^>]*href="https://cdnjs\.cloudflare\.com"[^>]*>[ \t]*\n?', 'dns-prefetch'),
    (r'[ \t]*<link[^>]*href="[^"]*assets/css/(?:tailwind|site|modern)\.css[^"]*"[^>]*>[ \t]*\n?', 'css-fusionnee'),
    (r'[ \t]*<script[^>]*src="[^"]*(?:translations\.js|lang(?:\.min)?\.js|assets/js/(?:modern-reveal|site-shell)(?:\.min)?\.js)[^"]*"[^>]*>\s*</script>[ \t]*\n?', 'script'),
    (r'[ \t]*<!--[^>]*?(?:Tailwind CSS|Preconnect to CDN|Google Fonts|Font Awesome|AOS animations?|PAGE LOADER|Language/i18n script|Scripts)[^>]*?-->[ \t]*\n?', 'commentaire'),
    (r'[ \t]*<noscript>\s*</noscript>[ \t]*\n?', 'noscript-vide'),
]


def strip_loader(s):
    """Retire <div id="aaa-loader"> … </div> en équilibrant les balises.

    Une expression régulière ne peut pas compter les </div> imbriqués : la
    première version laissait un </div> orphelin sur les quarante pages.
    """
    i = s.find('<div id="aaa-loader"')
    if i == -1:
        return s, 0
    depth, j = 0, i
    for m in re.finditer(r'<div\b|</div>', s[i:]):
        if m.group(0) == '</div>':
            depth -= 1
            if depth == 0:
                j = i + m.end()
                break
        else:
            depth += 1
    end = j
    while end < len(s) and s[end] in ' \t':
        end += 1
    if end < len(s) and s[end] == '\n':
        end += 1
    start = i
    while start > 0 and s[start - 1] in ' \t':
        start -= 1
    return s[:start] + s[end:], 1


def rewrite(path):
    src = open(path, encoding='utf-8-sig').read()
    if 'http-equiv="refresh"' in src:
        return path, {'ignoré': 'page de redirection'}
    s, counts = src, {}
    for pat, name in REMOVE:
        s, n = re.subn(pat, '', s, flags=re.S)
        if n:
            counts[name] = n
    s, n = strip_loader(s)
    if n:
        counts['loader'] = n

    prefix = '../' if path.startswith('blog/') else ''
    if BLOCK_MARK not in s:
        block = (
            '  <!-- Feuille unique auto-hébergée : Tailwind + polices + icônes + styles du site.\n'
            '       Générée par tools/build-css.sh — ne pas éditer assets/css/app.css à la main. -->\n'
            f'  <link rel="preload" as="font" type="font/woff2" href="{prefix}assets/fonts/montserrat-latin.woff2" crossorigin/>\n'
            f'  <link rel="preload" as="font" type="font/woff2" href="{prefix}assets/fonts/fa-solid-subset.woff2" crossorigin/>\n'
            f'  <link rel="stylesheet" href="{prefix}assets/css/app.css?v={V}"/>\n'
        )
        # app.css doit précéder les <style> propres à la page, qui la surchargent.
        head_end = s.index('</head>')
        m = re.search(r'[ \t]*<style\b', s[:head_end])
        pos = m.start() if m else head_end
        s = s[:pos] + block + s[pos:]
        counts['app.css'] = 1

    if 'site-shell.min.js' not in s:
        scripts = (
            f'  <script src="{prefix}lang.min.js?v={V}"></script>\n'
            f'  <script src="{prefix}assets/js/modern-reveal.min.js?v={V}" defer></script>\n'
            f'  <script src="{prefix}assets/js/site-shell.min.js?v={V}" defer></script>\n'
        )
        s = s.replace('</body>', scripts + '</body>', 1)
        counts['scripts'] = 1

    s = re.sub(r'\n{3,}', '\n\n', s)
    if s != src:
        open(path, 'w', encoding='utf-8').write(s)
    return path, counts


if __name__ == '__main__':
    for f in sorted(glob.glob('*.html') + glob.glob('blog/*.html')):
        if f == 'Information_Sheet_Al_Amine_Academy.html':
            continue          # fiche imprimable autonome : n'utilise pas Tailwind
        p, c = rewrite(f)
        print('%-56s %s' % (p, ', '.join('%s×%s' % kv for kv in sorted(c.items())) or '—'))
