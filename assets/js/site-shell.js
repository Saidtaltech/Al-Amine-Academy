/* Al Amine Academy — Shell partagé (navbar, mobile menu, scroll, dark mode)
 * - Injecte le navbar dans <div id="aaa-navbar"></div>
 * - Branche le toggle dark mode, le menu mobile et l'effet scroll
 * - Marque automatiquement le lien actif selon le pathname
 * - Le HTML inline reste indexable (le placeholder contient un fallback noscript) */

(function () {
  var ASSET_PREFIX = (typeof window !== 'undefined' && window.AAA_ASSET_PREFIX) || '';
  // pages dans /blog/ utilisent un préfixe ../ pour remonter d'un cran
  if (!ASSET_PREFIX && typeof window !== 'undefined' && window.location && window.location.pathname.indexOf('/blog/') !== -1) {
    ASSET_PREFIX = '../';
  }

  var NAV_HTML = ''
    + '<nav id="aaa-nav" class="navbar fixed top-0 left-0 right-0 z-50 bg-white/85 dark:bg-slate-950/85 backdrop-blur-md">'
    +   '<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">'
    +     '<div class="flex items-center justify-between h-20">'

    +       '<a href="' + ASSET_PREFIX + 'index.html" class="flex items-center gap-3 group">'
    +         '<img src="' + ASSET_PREFIX + 'assets/img/LogoAAA.png" alt="Logo DAARA Al Amine Academy" class="w-11 h-11 object-contain"/>'
    +         '<span class="hidden sm:flex flex-col leading-tight">'
    +           '<span class="text-base font-extrabold text-slate-900 dark:text-white tracking-tight">DAARA Al Amine</span>'
    +           '<span class="text-[10px] uppercase tracking-[0.18em] text-primary font-semibold">Academy · Dakar</span>'
    +         '</span>'
    +       '</a>'

    +       '<div class="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-700 dark:text-slate-200">'
    +         '<a href="' + ASSET_PREFIX + 'index.html"          data-route="index"       class="nav-link hover:text-primary" data-i18n="menu.home">Accueil</a>'
    +         '<a href="' + ASSET_PREFIX + 'index.html#programmes" data-route="programs" class="nav-link hover:text-primary" data-i18n="menu.programs">Programmes</a>'
    +         '<a href="' + ASSET_PREFIX + 'admission.html"      data-route="admission"   class="nav-link hover:text-primary" data-i18n="menu.admission">Admission</a>'
    +         '<a href="' + ASSET_PREFIX + 'a-propos.html"       data-route="about"       class="nav-link hover:text-primary" data-i18n="menu.about">À Propos</a>'
    +         '<a href="' + ASSET_PREFIX + 'galerie.html"        data-route="gallery"     class="nav-link hover:text-primary" data-i18n="menu.gallery">Galerie</a>'
    +         '<a href="' + ASSET_PREFIX + 'temoignages.html"    data-route="testimonials" class="nav-link hover:text-primary" data-i18n="menu.testimonials">Témoignages</a>'
    +         '<a href="' + ASSET_PREFIX + 'blog.html"           data-route="blog"        class="nav-link hover:text-primary" data-i18n="menu.blog">Blog</a>'
    +         '<a href="' + ASSET_PREFIX + 'contact.html"        data-route="contact"     class="nav-link hover:text-primary" data-i18n="menu.contact">Contact</a>'
    +       '</div>'

    +       '<div class="flex items-center gap-2 lg:gap-3">'
    +         '<div class="hidden md:flex items-center gap-0.5 text-xs font-semibold text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 rounded-lg p-0.5">'
    +           '<a href="#" data-lang-switch="fr" onclick="switchLanguage(\'fr\');return false;" class="px-2 py-1 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800" title="Français">FR</a>'
    +           '<a href="#" data-lang-switch="en" onclick="switchLanguage(\'en\');return false;" class="px-2 py-1 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800" title="English">EN</a>'
    +           '<a href="#" data-lang-switch="ar" onclick="switchLanguage(\'ar\');return false;" class="px-2 py-1 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 arabic-text" title="العربية">ع</a>'
    +           '<a href="#" data-lang-switch="es" onclick="switchLanguage(\'es\');return false;" class="px-2 py-1 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800" title="Español">ES</a>'
    +         '</div>'

    +         '<button id="aaa-dark-toggle" aria-label="Mode sombre" class="hidden md:inline-flex p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">'
    +           '<i class="fas fa-moon dark:hidden"></i>'
    +           '<i class="fas fa-sun hidden dark:inline text-yellow-400"></i>'
    +         '</button>'

    +         '<a href="tel:+221777743700" class="hidden lg:inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-secondary hover:bg-secondary-dark text-white text-sm font-semibold transition-colors">'
    +           '<i class="fas fa-phone"></i><span>+221 77 774 37 00</span>'
    +         '</a>'

    +         '<button id="aaa-mobile-btn" aria-label="Menu" class="lg:hidden p-2 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800">'
    +           '<i class="fas fa-bars text-lg"></i>'
    +         '</button>'
    +       '</div>'
    +     '</div>'

    +     '<div id="aaa-mobile-menu" class="hidden lg:hidden pb-4 pt-2 border-t border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200">'
    +       '<a href="' + ASSET_PREFIX + 'index.html"          data-route="index"        class="block py-2 hover:text-primary" data-i18n="menu.home">Accueil</a>'
    +       '<a href="' + ASSET_PREFIX + 'index.html#programmes" data-route="programs"  class="block py-2 hover:text-primary" data-i18n="menu.programs">Programmes</a>'
    +       '<a href="' + ASSET_PREFIX + 'admission.html"      data-route="admission"    class="block py-2 hover:text-primary" data-i18n="menu.admission">Admission</a>'
    +       '<a href="' + ASSET_PREFIX + 'a-propos.html"       data-route="about"        class="block py-2 hover:text-primary" data-i18n="menu.about">À Propos</a>'
    +       '<a href="' + ASSET_PREFIX + 'galerie.html"        data-route="gallery"      class="block py-2 hover:text-primary" data-i18n="menu.gallery">Galerie</a>'
    +       '<a href="' + ASSET_PREFIX + 'temoignages.html"    data-route="testimonials" class="block py-2 hover:text-primary" data-i18n="menu.testimonials">Témoignages</a>'
    +       '<a href="' + ASSET_PREFIX + 'blog.html"           data-route="blog"         class="block py-2 hover:text-primary" data-i18n="menu.blog">Blog</a>'
    +       '<a href="' + ASSET_PREFIX + 'contact.html"        data-route="contact"      class="block py-2 hover:text-primary" data-i18n="menu.contact">Contact</a>'
    +       '<div class="flex items-center gap-2 py-3 mt-2 border-t border-slate-200 dark:border-slate-700 text-sm">'
    +         '<span class="text-xs text-slate-500" data-i18n="menu.lang_label">Langue :</span>'
    +         '<a href="#" data-lang-switch="fr" onclick="switchLanguage(\'fr\');return false;" class="px-2 py-1 rounded">FR</a>'
    +         '<a href="#" data-lang-switch="en" onclick="switchLanguage(\'en\');return false;" class="px-2 py-1 rounded">EN</a>'
    +         '<a href="#" data-lang-switch="ar" onclick="switchLanguage(\'ar\');return false;" class="px-2 py-1 rounded arabic-text">ع</a>'
    +         '<a href="#" data-lang-switch="es" onclick="switchLanguage(\'es\');return false;" class="px-2 py-1 rounded">ES</a>'
    +       '</div>'
    +       '<a href="tel:+221777743700" class="block py-3 mt-2 text-center bg-secondary text-white rounded-lg font-semibold">'
    +         '<i class="fas fa-phone mr-2"></i>+221 77 774 37 00'
    +       '</a>'
    +     '</div>'
    +   '</div>'
    + '</nav>';

  function getActiveRoute() {
    var path = (window.location.pathname || '').toLowerCase();
    var hash = (window.location.hash || '').toLowerCase();
    if (path.indexOf('/blog') !== -1 && (path === '/blog/' || /\/blog\/index\.html$/.test(path))) return 'blog';
    if (path.indexOf('/blog/') !== -1) return 'blog';
    if (/admission\.html$/.test(path)) return 'admission';
    if (/a-propos\.html$/.test(path)) return 'about';
    if (/galerie\.html$/.test(path)) return 'gallery';
    if (/temoignages\.html$/.test(path)) return 'testimonials';
    if (/blog\.html$/.test(path)) return 'blog';
    if (/contact\.html$/.test(path)) return 'contact';
    if (/programme-/.test(path)) return 'programs';
    if (hash === '#programmes') return 'programs';
    return 'index';
  }

  function injectNavbar() {
    var slot = document.getElementById('aaa-navbar');
    if (!slot) return;
    slot.innerHTML = NAV_HTML;
    var active = getActiveRoute();
    slot.querySelectorAll('[data-route="' + active + '"]').forEach(function (a) { a.classList.add('active'); });
  }

  function bindScroll() {
    var navEl = document.getElementById('aaa-nav');
    if (!navEl) return;
    function onScroll() {
      if (window.scrollY > 40) navEl.classList.add('nav-scrolled');
      else navEl.classList.remove('nav-scrolled');
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  function bindMobileMenu() {
    var btn = document.getElementById('aaa-mobile-btn');
    var menu = document.getElementById('aaa-mobile-menu');
    if (!btn || !menu) return;
    btn.addEventListener('click', function () { menu.classList.toggle('hidden'); });
    menu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () { menu.classList.add('hidden'); });
    });
  }

  function bindDarkToggle() {
    var btn = document.getElementById('aaa-dark-toggle');
    var html = document.documentElement;
    try {
      if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        html.classList.add('dark');
      }
    } catch (e) { /* ignore */ }
    if (!btn) return;
    btn.addEventListener('click', function () {
      var dark = html.classList.toggle('dark');
      try { localStorage.theme = dark ? 'dark' : 'light'; } catch (e) { /* ignore */ }
    });
  }

  function ready(fn) {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn);
    else fn();
  }

  ready(function () {
    injectNavbar();
    bindScroll();
    bindMobileMenu();
    bindDarkToggle();
    if (typeof window.applyTranslations === 'function') {
      try { window.applyTranslations(); } catch (e) { /* ignore */ }
    }
  });
})();
