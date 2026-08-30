/* Al Amine Academy — Shell partagé (navbar, footer, WhatsApp, dark mode, scroll)
 *
 * Chaque page n'a besoin que des slots :
 *   <div id="aaa-navbar"></div>
 *   <div id="aaa-footer"></div>
 *   <div id="aaa-wa"></div>
 *
 * Ce script remplit les slots, marque le lien actif, gère le scroll-effect,
 * le menu mobile, le toggle dark mode, et déclenche applyTranslations() si lang.js est chargé.
 */

(function () {
  var ASSET_PREFIX = (typeof window !== 'undefined' && window.AAA_ASSET_PREFIX) || '';
  if (!ASSET_PREFIX && typeof window !== 'undefined' && window.location && window.location.pathname.indexOf('/blog/') !== -1) {
    ASSET_PREFIX = '../';
  }

  /* ====================  NAVBAR HTML  ==================== */
  var NAV_HTML = ''
    + '<nav id="aaa-nav" class="navbar fixed top-0 left-0 right-0 z-50 bg-white/85 backdrop-blur-md">'
    +   '<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">'
    +     '<div class="flex items-center justify-between h-20">'
    +       '<a href="' + ASSET_PREFIX + 'index" class="flex items-center gap-3 group">'
    +         '<img src="' + ASSET_PREFIX + 'assets/img/LogoAAA.png" alt="Logo DAARA Al Amine Academy" class="w-11 h-11 object-contain"/>'
    +         '<span class="hidden sm:flex flex-col leading-tight">'
    +           '<span class="text-base font-extrabold text-slate-900 tracking-tight">DAARA Al Amine</span>'
    +           '<span class="text-[10px] uppercase tracking-[0.18em] text-primary font-semibold">Academy · Dakar</span>'
    +         '</span>'
    +       '</a>'

    +       '<div class="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-700">'
    +         '<a href="' + ASSET_PREFIX + 'index"          data-route="index"        class="nav-link hover:text-primary" data-i18n="menu.home">Accueil</a>'
    +         '<div class="relative group">'
    +           '<button type="button" data-route="programs" class="nav-link hover:text-primary inline-flex items-center gap-1" data-i18n="menu.programs">Programmes <i class="fas fa-chevron-down text-[10px] transition-transform group-hover:rotate-180"></i></button>'
    +           '<div class="absolute left-1/2 -translate-x-1/2 mt-3 w-[640px] max-w-[92vw] bg-white rounded-3xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all transform translate-y-1 group-hover:translate-y-0 border border-slate-100 overflow-hidden" style="display:grid;grid-template-columns:1fr 1fr;">'

    /* Colonne gauche — Programmes enfants */
    +             '<div style="padding:18px 10px 18px 18px;">'
    +               '<p style="font-size:10px;text-transform:uppercase;letter-spacing:.12em;color:#94a3b8;font-weight:800;margin:0 0 8px 10px;">Programmes enfants</p>'
    +               '<a href="' + ASSET_PREFIX + 'programme-internat"          class="flex items-center gap-3 px-2.5 py-2.5 rounded-xl hover:bg-primary/5 transition-colors"><div class="w-9 h-9 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0"><i class="fas fa-book-open text-primary text-sm"></i></div><div><p class="font-semibold text-slate-800 text-sm">Tahfiz Internat</p><p class="text-xs text-slate-500">Mémorisation complète du Coran</p></div></a>'
    +               '<a href="' + ASSET_PREFIX + 'programme-mixte"             class="flex items-center gap-3 px-2.5 py-2.5 rounded-xl hover:bg-primary/5 transition-colors"><div class="w-9 h-9 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0"><i class="fas fa-balance-scale text-primary text-sm"></i></div><div><p class="font-semibold text-slate-800 text-sm" data-i18n="programs.mixed">Programme Mixte</p><p class="text-xs text-slate-500">Internat · Coran + Académique</p></div></a>'
    +               '<a href="' + ASSET_PREFIX + 'programme-cours-en-ligne"    class="flex items-center gap-3 px-2.5 py-2.5 rounded-xl hover:bg-primary/5 transition-colors"><div class="w-9 h-9 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0"><i class="fas fa-laptop text-primary text-sm"></i></div><div><p class="font-semibold text-slate-800 text-sm" data-i18n="programs.online">Cours en Ligne</p><p class="text-xs text-slate-500">Apprenez de chez vous</p></div></a>'
    +               '<a href="' + ASSET_PREFIX + 'programme-cours-gratuits"    class="flex items-center gap-3 px-2.5 py-2.5 rounded-xl hover:bg-secondary/5 transition-colors"><div class="w-9 h-9 bg-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0"><i class="fas fa-gift text-secondary text-sm"></i></div><div><p class="font-semibold text-slate-800 text-sm" data-i18n="programs.free">Cours Gratuits</p><p class="text-xs text-slate-500">Accès libre pour tous</p></div></a>'
    +               '<a href="' + ASSET_PREFIX + 'camp-vacances"               class="flex items-center gap-3 px-2.5 py-2.5 rounded-xl transition-colors" style="background:linear-gradient(135deg,#fff7ed,#fefce8);border:1px solid #fed7aa;margin-top:4px;"><div class="w-9 h-9 bg-secondary/20 rounded-lg flex items-center justify-center flex-shrink-0"><i class="fas fa-umbrella-beach text-secondary-dark text-sm"></i></div><div><p class="font-semibold text-slate-800 text-sm">Camp de Vacances</p><p class="text-xs text-amber-700 font-semibold">Été 2026 · Dakar &amp; Petite Côte</p></div></a>'
    +             '</div>'

    /* Colonne droite — Femmes / formations / social + local */
    +             '<div style="padding:18px 18px 18px 10px;border-left:1px solid #f1f5f9;">'
    +               '<p style="font-size:10px;text-transform:uppercase;letter-spacing:.12em;color:#94a3b8;font-weight:800;margin:0 0 8px 10px;">Autres programmes</p>'
    +               '<a href="' + ASSET_PREFIX + 'programme-al-mouslihoon"     class="flex items-center gap-3 px-2.5 py-2.5 rounded-xl hover:bg-pink-50 transition-colors"><div class="w-9 h-9 bg-pink-100 rounded-lg flex items-center justify-center flex-shrink-0"><i class="fas fa-venus text-pink-600 text-sm"></i></div><div><p class="font-semibold text-slate-800 text-sm flex items-center gap-2">Programme pour Femme <span style="font-size:9px;text-transform:uppercase;letter-spacing:.06em;background:#fef3c7;color:#b45309;font-weight:800;padding:2px 7px;border-radius:9999px;">Bientôt</span></p><p class="text-xs text-slate-500">Programme féminin · Internat &amp; Externat</p></div></a>'
    +               '<a href="' + ASSET_PREFIX + 'fiche-renseignements"        class="flex items-center gap-3 px-2.5 py-2.5 rounded-xl hover:bg-purple-50 transition-colors"><div class="w-9 h-9 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0"><i class="fas fa-file-alt text-purple-600 text-sm"></i></div><div><p class="font-semibold text-slate-800 text-sm" data-i18n="menu.fiche">Fiche de Renseignements</p><p class="text-xs text-slate-500">Tarifs, dossier &amp; programmes</p></div></a>'
    +               '<a href="' + ASSET_PREFIX + 'conferences"                 class="flex items-center gap-3 px-2.5 py-2.5 rounded-xl hover:bg-primary/5 transition-colors"><div class="w-9 h-9 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0"><i class="fas fa-chalkboard-teacher text-primary text-sm"></i></div><div><p class="font-semibold text-slate-800 text-sm" data-i18n="programs.conferences">Formations &amp; Conférences</p><p class="text-xs text-slate-500" data-i18n="programs.conferences_subtitle">Ateliers, séminaires &amp; formations</p></div></a>'
    +               '<a href="' + ASSET_PREFIX + 'aides-sociales"             class="flex items-center gap-3 px-2.5 py-2.5 rounded-xl hover:bg-teal-50 transition-colors"><div class="w-9 h-9 bg-teal-100 rounded-lg flex items-center justify-center flex-shrink-0"><i class="fas fa-hand-holding-heart text-primary text-sm"></i></div><div><p class="font-semibold text-slate-800 text-sm">Projet Al Mouslihoon <span style="font-family:Amiri,serif;font-size:0.85em;color:#0f766e;">المُصلحون</span></p><p class="text-xs text-slate-500">Aides sociales &amp; humanitaires</p></div></a>'
    +               '<div style="margin-top:10px;padding:12px 14px;border-radius:14px;background:linear-gradient(135deg,#0f4457,#165b73);">'
    +                 '<p style="font-size:10px;text-transform:uppercase;letter-spacing:.1em;color:#fbbf24;font-weight:800;margin:0 0 3px;"><i class="fas fa-map-marker-alt"></i> Rentrée 2026</p>'
    +                 '<p style="font-size:12px;color:#fff;font-weight:600;line-height:1.4;margin:0;">Internat garçons à la Cité SOCABEG, internat filles à la Cité des Magistrats</p>'
    +               '</div>'
    +             '</div>'
    +           '</div>'
    +         '</div>'
    +         '<a href="' + ASSET_PREFIX + 'a-propos"       data-route="about"        class="nav-link hover:text-primary whitespace-nowrap" data-i18n="menu.about">À Propos</a>'
    +         '<a href="' + ASSET_PREFIX + 'galerie"        data-route="gallery"      class="nav-link hover:text-primary" data-i18n="menu.gallery">Galerie</a>'
    +         '<a href="' + ASSET_PREFIX + 'temoignages"    data-route="testimonials" class="nav-link hover:text-primary" data-i18n="menu.testimonials">Témoignages</a>'
    +         '<a href="' + ASSET_PREFIX + 'blog"           data-route="blog"         class="nav-link hover:text-primary" data-i18n="menu.blog">Blog</a>'
    +         '<a href="' + ASSET_PREFIX + 'contact"        data-route="contact"      class="nav-link hover:text-primary" data-i18n="menu.contact">Contact</a>'
    +       '</div>'

    +       '<div class="flex items-center gap-2 lg:gap-3">'
    +         '<div class="flex items-center gap-0.5 text-[10px] sm:text-xs font-semibold text-slate-600 border border-slate-200 rounded-lg p-0.5">'
    +           '<a href="#" data-lang-switch="fr" onclick="switchLanguage(\'fr\');return false;" class="px-1.5 sm:px-2 py-1 rounded-md hover:bg-slate-100" title="Français">FR</a>'
    +           '<a href="#" data-lang-switch="en" onclick="switchLanguage(\'en\');return false;" class="px-1.5 sm:px-2 py-1 rounded-md hover:bg-slate-100" title="English">EN</a>'
    +           '<a href="#" data-lang-switch="ar" onclick="switchLanguage(\'ar\');return false;" class="px-1.5 sm:px-2 py-1 rounded-md hover:bg-slate-100 arabic-text text-sm sm:text-base" title="العربية">ع</a>'
    +           '<a href="#" data-lang-switch="es" onclick="switchLanguage(\'es\');return false;" class="px-1.5 sm:px-2 py-1 rounded-md hover:bg-slate-100" title="Español">ES</a>'
    +         '</div>'
    +         '<a href="tel:+221777743700" class="hidden lg:inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-secondary hover:bg-secondary-dark text-white text-sm font-semibold transition-colors">'
    +           '<i class="fas fa-phone"></i><span>+221 77 774 37 00</span>'
    +         '</a>'
    +         '<button id="aaa-mobile-btn" aria-label="Menu" class="lg:hidden w-10 h-10 rounded-xl flex items-center justify-center text-slate-700 hover:bg-slate-100 transition-colors">'
    +           '<i id="aaa-mobile-icon" class="fas fa-bars text-lg"></i>'
    +         '</button>'
    +       '</div>'
    +     '</div>'
    +   '</div>'
    + '</nav>'

    /* ── Mobile Drawer Overlay ── */
    + '<div id="aaa-drawer-overlay" style="display:none;position:fixed;inset:0;background:rgba(15,23,42,0.55);z-index:49;backdrop-filter:blur(2px);-webkit-backdrop-filter:blur(2px);transition:opacity .25s;" aria-hidden="true"></div>'

    + '<div id="aaa-mobile-menu" style="position:fixed;top:0;right:0;height:100%;width:88%;max-width:340px;background:#fff;z-index:50;transform:translateX(100%);transition:transform .3s cubic-bezier(.4,0,.2,1);overflow-y:auto;display:flex;flex-direction:column;" role="dialog" aria-modal="true" aria-label="Menu principal">'

    /* Drawer header */
    +   '<div style="display:flex;align-items:center;justify-content:space-between;padding:18px 20px 14px;border-bottom:1px solid #e2e8f0;">'
    +     '<div style="display:flex;align-items:center;gap:10px;">'
    +       '<img src="' + ASSET_PREFIX + 'assets/img/LogoAAA.png" alt="Logo" style="width:36px;height:36px;object-fit:contain;"/>'
    +       '<div style="line-height:1.2;">'
    +         '<p style="font-size:13px;font-weight:800;color:#0f172a;margin:0;">DAARA Al Amine</p>'
    +         '<p style="font-size:9px;text-transform:uppercase;letter-spacing:.14em;color:#1e7a9a;font-weight:700;margin:0;">Academy · Dakar</p>'
    +       '</div>'
    +     '</div>'
    +     '<button id="aaa-mobile-close" aria-label="Fermer le menu" style="width:36px;height:36px;border-radius:10px;border:none;background:#f1f5f9;display:flex;align-items:center;justify-content:center;cursor:pointer;color:#475569;font-size:15px;">'
    +       '<i class="fas fa-times"></i>'
    +     '</button>'
    +   '</div>'

    /* Drawer body */
    +   '<div style="flex:1;padding:16px 16px 0;">'

    /* ── helper: lien drawer uniforme ── */
    /* structure : icône-badge | titre | sous-titre */
    +     '<nav style="display:flex;flex-direction:column;gap:2px;margin-bottom:8px;">'

    /* Accueil */
    +       '<a href="' + ASSET_PREFIX + 'index" data-route="index" class="aaa-dlink" style="display:flex;align-items:center;gap:12px;padding:12px 14px;border-radius:12px;color:#1e293b;text-decoration:none;min-height:44px;">'
    +         '<span class="aaa-icon" style="width:34px;height:34px;border-radius:10px;background:#e8f4f8;display:flex;align-items:center;justify-content:center;flex-shrink:0;"><i class="fas fa-home" style="color:#1e7a9a;font-size:14px;"></i></span>'
    +         '<span style="line-height:1.25;"><span class="aaa-dlink-title" style="display:block;font-size:14px;font-weight:600;">Accueil</span><span style="font-size:11px;color:#94a3b8;">Page principale</span></span>'
    +       '</a>'
    /* À Propos */
    +       '<a href="' + ASSET_PREFIX + 'a-propos" data-route="about" class="aaa-dlink" style="display:flex;align-items:center;gap:12px;padding:12px 14px;border-radius:12px;color:#1e293b;text-decoration:none;min-height:44px;">'
    +         '<span class="aaa-icon" style="width:34px;height:34px;border-radius:10px;background:#e8f4f8;display:flex;align-items:center;justify-content:center;flex-shrink:0;"><i class="fas fa-mosque" style="color:#1e7a9a;font-size:14px;"></i></span>'
    +         '<span style="line-height:1.25;"><span class="aaa-dlink-title" style="display:block;font-size:14px;font-weight:600;">À Propos</span><span style="font-size:11px;color:#94a3b8;">Notre histoire &amp; valeurs</span></span>'
    +       '</a>'
    /* Galerie */
    +       '<a href="' + ASSET_PREFIX + 'galerie" data-route="gallery" class="aaa-dlink" style="display:flex;align-items:center;gap:12px;padding:12px 14px;border-radius:12px;color:#1e293b;text-decoration:none;min-height:44px;">'
    +         '<span class="aaa-icon" style="width:34px;height:34px;border-radius:10px;background:#e8f4f8;display:flex;align-items:center;justify-content:center;flex-shrink:0;"><i class="fas fa-images" style="color:#1e7a9a;font-size:14px;"></i></span>'
    +         '<span style="line-height:1.25;"><span class="aaa-dlink-title" style="display:block;font-size:14px;font-weight:600;">Galerie</span><span style="font-size:11px;color:#94a3b8;">Photos du daara</span></span>'
    +       '</a>'
    /* Témoignages */
    +       '<a href="' + ASSET_PREFIX + 'temoignages" data-route="testimonials" class="aaa-dlink" style="display:flex;align-items:center;gap:12px;padding:12px 14px;border-radius:12px;color:#1e293b;text-decoration:none;min-height:44px;">'
    +         '<span class="aaa-icon" style="width:34px;height:34px;border-radius:10px;background:#e8f4f8;display:flex;align-items:center;justify-content:center;flex-shrink:0;"><i class="fas fa-star" style="color:#1e7a9a;font-size:14px;"></i></span>'
    +         '<span style="line-height:1.25;"><span class="aaa-dlink-title" style="display:block;font-size:14px;font-weight:600;">Témoignages</span><span style="font-size:11px;color:#94a3b8;">Avis des familles</span></span>'
    +       '</a>'
    /* Blog */
    +       '<a href="' + ASSET_PREFIX + 'blog" data-route="blog" class="aaa-dlink" style="display:flex;align-items:center;gap:12px;padding:12px 14px;border-radius:12px;color:#1e293b;text-decoration:none;min-height:44px;">'
    +         '<span class="aaa-icon" style="width:34px;height:34px;border-radius:10px;background:#e8f4f8;display:flex;align-items:center;justify-content:center;flex-shrink:0;"><i class="fas fa-pen-nib" style="color:#1e7a9a;font-size:14px;"></i></span>'
    +         '<span style="line-height:1.25;"><span class="aaa-dlink-title" style="display:block;font-size:14px;font-weight:600;">Blog</span><span style="font-size:11px;color:#94a3b8;">Guides &amp; articles</span></span>'
    +       '</a>'
    /* Contact */
    +       '<a href="' + ASSET_PREFIX + 'contact" data-route="contact" class="aaa-dlink" style="display:flex;align-items:center;gap:12px;padding:12px 14px;border-radius:12px;color:#1e293b;text-decoration:none;min-height:44px;">'
    +         '<span class="aaa-icon" style="width:34px;height:34px;border-radius:10px;background:#e8f4f8;display:flex;align-items:center;justify-content:center;flex-shrink:0;"><i class="fas fa-envelope" style="color:#1e7a9a;font-size:14px;"></i></span>'
    +         '<span style="line-height:1.25;"><span class="aaa-dlink-title" style="display:block;font-size:14px;font-weight:600;">Contact</span><span style="font-size:11px;color:#94a3b8;">Nous écrire ou appeler</span></span>'
    +       '</a>'
    +     '</nav>'

    /* Séparateur Programmes enfants */
    +     '<div style="height:1px;background:#f1f5f9;margin:8px 0 12px;"></div>'
    +     '<p style="font-size:10px;text-transform:uppercase;letter-spacing:.12em;color:#94a3b8;font-weight:700;margin:0 0 8px 4px;">Programmes enfants</p>'
    +     '<nav style="display:flex;flex-direction:column;gap:2px;margin-bottom:16px;">'
    /* Tahfiz */
    +       '<a href="' + ASSET_PREFIX + 'programme-internat" data-route="programs" class="aaa-dlink" style="display:flex;align-items:center;gap:12px;padding:12px 14px;border-radius:12px;color:#1e293b;text-decoration:none;min-height:44px;">'
    +         '<span class="aaa-icon" style="width:34px;height:34px;border-radius:10px;background:#e8f4f8;display:flex;align-items:center;justify-content:center;flex-shrink:0;"><i class="fas fa-book-open" style="color:#1e7a9a;font-size:14px;"></i></span>'
    +         '<span style="line-height:1.25;"><span class="aaa-dlink-title" style="display:block;font-size:14px;font-weight:600;">Tahfiz Internat</span><span style="font-size:11px;color:#94a3b8;">Mémorisation complète du Coran</span></span>'
    +       '</a>'
    /* Mixte */
    +       '<a href="' + ASSET_PREFIX + 'programme-mixte" data-route="programs" class="aaa-dlink" style="display:flex;align-items:center;gap:12px;padding:12px 14px;border-radius:12px;color:#1e293b;text-decoration:none;min-height:44px;">'
    +         '<span class="aaa-icon" style="width:34px;height:34px;border-radius:10px;background:#e8f4f8;display:flex;align-items:center;justify-content:center;flex-shrink:0;"><i class="fas fa-balance-scale" style="color:#1e7a9a;font-size:14px;"></i></span>'
    +         '<span style="line-height:1.25;"><span class="aaa-dlink-title" style="display:block;font-size:14px;font-weight:600;">Programme Mixte</span><span style="font-size:11px;color:#94a3b8;">Internat &amp; Externat · Coran + Académique</span></span>'
    +       '</a>'
    /* En ligne */
    +       '<a href="' + ASSET_PREFIX + 'programme-cours-en-ligne" data-route="programs" class="aaa-dlink" style="display:flex;align-items:center;gap:12px;padding:12px 14px;border-radius:12px;color:#1e293b;text-decoration:none;min-height:44px;">'
    +         '<span class="aaa-icon" style="width:34px;height:34px;border-radius:10px;background:#e8f4f8;display:flex;align-items:center;justify-content:center;flex-shrink:0;"><i class="fas fa-laptop" style="color:#1e7a9a;font-size:14px;"></i></span>'
    +         '<span style="line-height:1.25;"><span class="aaa-dlink-title" style="display:block;font-size:14px;font-weight:600;">Cours en Ligne</span><span style="font-size:11px;color:#94a3b8;">Apprenez de chez vous</span></span>'
    +       '</a>'
    /* Gratuits */
    +       '<a href="' + ASSET_PREFIX + 'programme-cours-gratuits" data-route="programs" class="aaa-dlink" style="display:flex;align-items:center;gap:12px;padding:12px 14px;border-radius:12px;color:#1e293b;text-decoration:none;min-height:44px;">'
    +         '<span class="aaa-icon" style="width:34px;height:34px;border-radius:10px;background:#fef3c7;display:flex;align-items:center;justify-content:center;flex-shrink:0;"><i class="fas fa-gift" style="color:#d97706;font-size:14px;"></i></span>'
    +         '<span style="line-height:1.25;"><span class="aaa-dlink-title" style="display:block;font-size:14px;font-weight:600;">Cours Gratuits</span><span style="font-size:11px;color:#94a3b8;">Accès libre pour tous</span></span>'
    +       '</a>'
    /* Camp — mis en avant */
    +       '<a href="' + ASSET_PREFIX + 'camp-vacances" data-route="programs" class="aaa-dlink camp-highlight" style="display:flex;align-items:center;gap:12px;padding:12px 14px;border-radius:12px;color:#1e293b;text-decoration:none;min-height:44px;background:linear-gradient(135deg,#fff7ed,#fefce8);border:1px solid #fed7aa;">'
    +         '<span class="aaa-icon" style="width:34px;height:34px;border-radius:10px;background:#fde68a;display:flex;align-items:center;justify-content:center;flex-shrink:0;"><i class="fas fa-umbrella-beach" style="color:#b45309;font-size:14px;"></i></span>'
    +         '<span style="line-height:1.25;"><span class="aaa-dlink-title" style="display:block;font-size:14px;font-weight:600;">Camp de Vacances</span><span style="font-size:11px;color:#b45309;font-weight:600;">Été 2026 · Dakar &amp; Petite Côte</span></span>'
    +       '</a>'
    +     '</nav>'

    /* Séparateur Autres programmes */
    +     '<p style="font-size:10px;text-transform:uppercase;letter-spacing:.12em;color:#94a3b8;font-weight:700;margin:0 0 8px 4px;">Autres programmes</p>'
    +     '<nav style="display:flex;flex-direction:column;gap:2px;margin-bottom:16px;">'
    /* Al-Mouslihoon — bientôt */
    +       '<a href="' + ASSET_PREFIX + 'programme-al-mouslihoon" data-route="programs" class="aaa-dlink" style="display:flex;align-items:center;gap:12px;padding:12px 14px;border-radius:12px;color:#1e293b;text-decoration:none;min-height:44px;">'
    +         '<span class="aaa-icon" style="width:34px;height:34px;border-radius:10px;background:#fce7f3;display:flex;align-items:center;justify-content:center;flex-shrink:0;"><i class="fas fa-venus" style="color:#db2777;font-size:14px;"></i></span>'
    +         '<span style="line-height:1.25;"><span class="aaa-dlink-title" style="display:flex;align-items:center;gap:6px;font-size:14px;font-weight:600;">Programme pour Femme <span style="font-size:9px;text-transform:uppercase;letter-spacing:.06em;background:#fef3c7;color:#b45309;font-weight:800;padding:2px 7px;border-radius:9999px;">Bientôt</span></span><span style="font-size:11px;color:#94a3b8;">Al-Mouslihoon · Internat &amp; Externat</span></span>'
    +       '</a>'
    /* Conférences */
    +       '<a href="' + ASSET_PREFIX + 'conferences" data-route="programs" class="aaa-dlink" style="display:flex;align-items:center;gap:12px;padding:12px 14px;border-radius:12px;color:#1e293b;text-decoration:none;min-height:44px;">'
    +         '<span class="aaa-icon" style="width:34px;height:34px;border-radius:10px;background:#e8f4f8;display:flex;align-items:center;justify-content:center;flex-shrink:0;"><i class="fas fa-chalkboard-teacher" style="color:#1e7a9a;font-size:14px;"></i></span>'
    +         '<span style="line-height:1.25;"><span class="aaa-dlink-title" style="display:block;font-size:14px;font-weight:600;">Formations &amp; Conférences</span><span style="font-size:11px;color:#94a3b8;">Ateliers &amp; séminaires</span></span>'
    +       '</a>'
    /* Al Mouslihoon — aides sociales */
    +       '<a href="' + ASSET_PREFIX + 'aides-sociales" data-route="programs" class="aaa-dlink social-link" style="display:flex;align-items:center;gap:12px;padding:12px 14px;border-radius:12px;color:#1e293b;text-decoration:none;min-height:44px;">'
    +         '<span class="aaa-icon" style="width:34px;height:34px;border-radius:10px;background:#ccfbf1;display:flex;align-items:center;justify-content:center;flex-shrink:0;"><i class="fas fa-hand-holding-heart" style="color:#0f766e;font-size:14px;"></i></span>'
    +         '<span style="line-height:1.25;"><span class="aaa-dlink-title" style="display:block;font-size:14px;font-weight:600;">Projet Al Mouslihoon</span><span style="font-size:11px;color:#94a3b8;">Aides sociales &amp; humanitaires</span></span>'
    +       '</a>'
    +     '</nav>'

    /* Séparateur Ressources */
    +     '<p style="font-size:10px;text-transform:uppercase;letter-spacing:.12em;color:#94a3b8;font-weight:700;margin:0 0 8px 4px;">Ressources</p>'
    +     '<nav style="display:flex;flex-direction:column;gap:2px;margin-bottom:20px;">'
    /* Fiche de Renseignements */
    +       '<a href="' + ASSET_PREFIX + 'fiche-renseignements" data-route="fiche" class="aaa-dlink" style="display:flex;align-items:center;gap:12px;padding:12px 14px;border-radius:12px;color:#1e293b;text-decoration:none;min-height:44px;">'
    +         '<span class="aaa-icon" style="width:34px;height:34px;border-radius:10px;background:#f3e8ff;display:flex;align-items:center;justify-content:center;flex-shrink:0;"><i class="fas fa-file-alt" style="color:#7c3aed;font-size:14px;"></i></span>'
    +         '<span style="line-height:1.25;"><span class="aaa-dlink-title" style="display:block;font-size:14px;font-weight:600;">Fiche de Renseignements</span><span style="font-size:11px;color:#94a3b8;">Tarifs, dossier &amp; programmes</span></span>'
    +       '</a>'
    +     '</nav>'

    /* (sélecteur de langue déplacé dans la navbar) */

    +   '</div>'

    /* Drawer footer CTA */
    +   '<div style="padding:16px;border-top:1px solid #f1f5f9;background:#fafafa;">'
    +     '<a href="tel:+221777743700" class="aaa-cta-tel" style="display:flex;align-items:center;justify-content:center;gap:10px;width:100%;padding:14px;background:linear-gradient(135deg,#f59e0b,#d97706);color:#fff;border-radius:14px;font-weight:800;font-size:15px;text-decoration:none;letter-spacing:.01em;">'
    +       '<i class="fas fa-phone" style="font-size:14px;"></i> +221 77 774 37 00'
    +     '</a>'
    +     '<a href="https://wa.me/221777743700" target="_blank" rel="noopener" class="aaa-cta-tel" style="display:flex;align-items:center;justify-content:center;gap:10px;width:100%;padding:12px;margin-top:8px;background:#25d366;color:#fff;border-radius:14px;font-weight:700;font-size:14px;text-decoration:none;">'
    +       '<i class="fab fa-whatsapp" style="font-size:16px;"></i> WhatsApp'
    +     '</a>'
    +   '</div>'
    + '</div>'

    + '<style>'
    /* Drawer core */
    + '#aaa-mobile-menu { display:flex!important; }'
    + '#aaa-mobile-menu.drawer-open { transform:translateX(0)!important; }'
    + '#aaa-drawer-overlay { opacity:0; }'
    + '#aaa-drawer-overlay.overlay-visible { opacity:1!important; }'

    /* Link hover — CSS, no inline JS */
    + '.aaa-dlink { cursor:pointer; transition:background 200ms ease, transform 150ms ease; }'
    + '.aaa-dlink:hover { background:#f0f9fc; }'
    + '.aaa-dlink:active { transform:scale(0.98); background:#e8f4f8; }'
    + '.aaa-dlink.camp-highlight:hover { background:linear-gradient(135deg,#ffedd5,#fef9c3)!important; }'
    + '.aaa-dlink.camp-highlight:active { background:linear-gradient(135deg,#fed7aa,#fef08a)!important; }'
    + '.aaa-dlink.social-link:hover { background:#f0fdfa!important; }'

    /* Icon badge micro-anim */
    + '.aaa-dlink .aaa-icon { transition:transform 200ms ease; }'
    + '.aaa-dlink:hover .aaa-icon { transform:scale(1.12); }'

    /* Stagger entry animation */
    + '@keyframes drawerItemIn { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }'
    + '.aaa-dlink { opacity:0; }'
    + '#aaa-mobile-menu.drawer-open .aaa-dlink { animation: drawerItemIn 220ms ease forwards; }'
    + '#aaa-mobile-menu.drawer-open .aaa-dlink:nth-child(1)  { animation-delay: 40ms; }'
    + '#aaa-mobile-menu.drawer-open .aaa-dlink:nth-child(2)  { animation-delay: 70ms; }'
    + '#aaa-mobile-menu.drawer-open .aaa-dlink:nth-child(3)  { animation-delay: 100ms; }'
    + '#aaa-mobile-menu.drawer-open .aaa-dlink:nth-child(4)  { animation-delay: 130ms; }'
    + '#aaa-mobile-menu.drawer-open .aaa-dlink:nth-child(5)  { animation-delay: 160ms; }'
    + '#aaa-mobile-menu.drawer-open .aaa-dlink:nth-child(6)  { animation-delay: 190ms; }'
    + '#aaa-mobile-menu.drawer-open .aaa-dlink:nth-child(7)  { animation-delay: 220ms; }'
    + '#aaa-mobile-menu.drawer-open .aaa-dlink:nth-child(8)  { animation-delay: 250ms; }'
    + '#aaa-mobile-menu.drawer-open .aaa-dlink:nth-child(9)  { animation-delay: 280ms; }'
    + '#aaa-mobile-menu.drawer-open .aaa-dlink:nth-child(10) { animation-delay: 310ms; }'
    + '#aaa-mobile-menu.drawer-open .aaa-dlink:nth-child(11) { animation-delay: 340ms; }'
    + '#aaa-mobile-menu.drawer-open .aaa-dlink:nth-child(12) { animation-delay: 370ms; }'
    + '#aaa-mobile-menu.drawer-open .aaa-dlink:nth-child(13) { animation-delay: 400ms; }'
    + '#aaa-mobile-menu.drawer-open .aaa-dlink:nth-child(14) { animation-delay: 430ms; }'
    + '#aaa-mobile-menu.drawer-open .aaa-dlink:nth-child(15) { animation-delay: 460ms; }'
    + '#aaa-mobile-menu.drawer-open .aaa-dlink:nth-child(n+16) { animation-delay: 490ms; }'

    /* Active route highlight */
    + '.aaa-dlink.active { background:#e8f4f8!important; }'
    + '.aaa-dlink.active .aaa-dlink-title { color:#1e7a9a!important; }'

    /* Lang pills */
    + '.aaa-lang-pill { cursor:pointer; transition:background 180ms, border-color 180ms, color 180ms; }'
    + '.aaa-lang-pill:hover { background:#e8f4f8!important; border-color:#1e7a9a!important; color:#1e7a9a!important; }'
    + '.aaa-lang-pill.active-lang { background:#1e7a9a!important; border-color:#1e7a9a!important; color:#fff!important; }'

    /* CTA btns */
    + '.aaa-cta-tel { cursor:pointer; transition:opacity 180ms, transform 150ms; }'
    + '.aaa-cta-tel:hover { opacity:.92; }'
    + '.aaa-cta-tel:active { transform:scale(0.98); }'

    /* Reduced motion */
    + '@media (prefers-reduced-motion:reduce) {'
    + '  .aaa-dlink, .aaa-dlink .aaa-icon, .aaa-cta-tel { animation:none!important; transition:none!important; }'
    + '  .aaa-dlink { opacity:1!important; }'
    + '}'
    + '</style>';

  /* ====================  FOOTER HTML  ==================== */
  var FOOTER_HTML = ''
    + '<footer class="site-footer pt-16 pb-8">'
    +   '<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">'
    +     '<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">'
    +       '<div>'
    +         '<a href="' + ASSET_PREFIX + 'index" class="flex items-center gap-3 mb-4">'
    +           '<img src="' + ASSET_PREFIX + 'assets/img/LogoAAA.png" alt="Logo DAARA Al Amine Academy" class="w-12 h-12 object-contain bg-white rounded-xl p-1"/>'
    +           '<div>'
    +             '<p class="text-white font-extrabold leading-tight">DAARA Al Amine</p>'
    +             '<p class="text-[10px] uppercase tracking-[0.18em] text-secondary font-semibold">Academy · Dakar</p>'
    +           '</div>'
    +         '</a>'
    +         '<p class="text-sm leading-relaxed mb-4" data-i18n="footer.tagline">École coranique moderne à Dakar — Coran, sports et épanouissement personnel.</p>'
    +         '<div class="flex gap-3">'
    +           '<a href="https://www.facebook.com/DaaraAlAmineAcademy" target="_blank" rel="noopener" aria-label="Facebook" class="w-9 h-9 rounded-lg bg-slate-800 hover:bg-secondary inline-flex items-center justify-center transition-colors"><i class="fab fa-facebook-f"></i></a>'
    +           '<a href="https://wa.me/221777743700" target="_blank" rel="noopener" aria-label="WhatsApp" class="w-9 h-9 rounded-lg bg-slate-800 hover:bg-secondary inline-flex items-center justify-center transition-colors"><i class="fab fa-whatsapp"></i></a>'
    +           '<a href="https://www.instagram.com/alamineacademy" target="_blank" rel="noopener" aria-label="Instagram" class="w-9 h-9 rounded-lg bg-slate-800 hover:bg-secondary inline-flex items-center justify-center transition-colors"><i class="fab fa-instagram"></i></a>'
    +           '<a href="https://www.tiktok.com/@alamineacademy" target="_blank" rel="noopener" aria-label="TikTok" class="w-9 h-9 rounded-lg bg-slate-800 hover:bg-secondary inline-flex items-center justify-center transition-colors"><i class="fab fa-tiktok"></i></a>'
    +         '</div>'
    +       '</div>'

    +       '<div>'
    +         '<h4 class="text-white font-bold mb-4 text-sm uppercase tracking-wider" data-i18n="footer.navigation">Navigation</h4>'
    +         '<ul class="space-y-2 text-sm">'
    +           '<li><a href="' + ASSET_PREFIX + 'index"        data-i18n="menu.home">Accueil</a></li>'
    +           '<li><a href="' + ASSET_PREFIX + 'a-propos"     data-i18n="menu.about">À propos</a></li>'
    +           '<li><a href="' + ASSET_PREFIX + 'galerie"      data-i18n="menu.gallery">Galerie</a></li>'
    +           '<li><a href="' + ASSET_PREFIX + 'temoignages"  data-i18n="menu.testimonials">Témoignages</a></li>'
    +           '<li><a href="' + ASSET_PREFIX + 'blog"         data-i18n="menu.blog">Blog</a></li>'
    +           '<li><a href="' + ASSET_PREFIX + 'contact"      data-i18n="menu.contact">Contact</a></li>'
    +         '</ul>'
    +       '</div>'

    +       '<div>'
    +         '<h4 class="text-white font-bold mb-4 text-sm uppercase tracking-wider" data-i18n="footer.programs">Nos programmes</h4>'
    +         '<ul class="space-y-2 text-sm">'
    +           '<li><a href="' + ASSET_PREFIX + 'programme-internat">Tahfiz Internat</a></li>'
    +           '<li><a href="' + ASSET_PREFIX + 'programme-mixte"             data-i18n="programs.mixed">Programme Mixte</a></li>'
    +           '<li><a href="' + ASSET_PREFIX + 'programme-cours-en-ligne"    data-i18n="programs.online">Cours en Ligne</a></li>'
    +           '<li><a href="' + ASSET_PREFIX + 'programme-cours-gratuits"    data-i18n="programs.free">Cours Gratuits</a></li>'
    +           '<li><a href="' + ASSET_PREFIX + 'programme-al-mouslihoon">Programme pour Femme <span style="font-size:9px;text-transform:uppercase;background:#fef3c7;color:#b45309;font-weight:800;padding:1px 6px;border-radius:9999px;margin-left:4px;">Bientôt</span></a></li>'
    +           '<li><a href="' + ASSET_PREFIX + 'camp-vacances"><i class="fas fa-umbrella-beach mr-1 text-xs"></i> Camp de Vacances</a></li>'
    +           '<li><a href="' + ASSET_PREFIX + 'fiche-renseignements" data-i18n="menu.fiche"><i class="fas fa-file-alt mr-1 text-xs"></i> Fiche de Renseignements</a></li>'
    +           '<li><a href="' + ASSET_PREFIX + 'conferences">Conférences &amp; Formations</a></li>'
    +           '<li><a href="' + ASSET_PREFIX + 'aides-sociales"><i class="fas fa-hand-holding-heart mr-1 text-xs"></i> Aides Sociales</a></li>'
    +         '</ul>'
    +       '</div>'

    +       '<div>'
    +         '<h4 class="text-white font-bold mb-4 text-sm uppercase tracking-wider" data-i18n="footer.contact">Contact</h4>'
    +         '<ul class="space-y-3 text-sm">'
    +           '<li class="flex items-start gap-3"><i class="fas fa-location-dot text-secondary mt-0.5"></i><span data-i18n="contact.address">Cité des Magistrats, Derrière Kër Yoff, Dakar</span></li>'
    +           '<li class="flex items-start gap-3"><i class="fas fa-location-dot text-secondary mt-0.5"></i><span>Cité SOCABEG, Dakar <span style="font-size:9px;text-transform:uppercase;background:#fef3c7;color:#b45309;font-weight:800;padding:1px 6px;border-radius:9999px;margin-left:4px;">Nouveau</span></span></li>'
    +           '<li class="flex items-center gap-3"><i class="fas fa-phone text-secondary"></i><a href="tel:+221777743700" class="tabular">+221 77 774 37 00</a></li>'
    +           '<li class="flex items-center gap-3"><i class="fas fa-envelope text-secondary"></i><a href="mailto:contact@alamineacademy.com">contact@alamineacademy.com</a></li>'
    +         '</ul>'
    +       '</div>'
    +     '</div>'

    +     '<div class="border-t border-slate-800 pt-6 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-slate-400">'
    +       '<p data-i18n="footer.copyright">© 2023–2026 DAARA Al Amine Academy. Tous droits réservés.</p>'
    +       '<div class="flex gap-6">'
    +         '<a href="mailto:contact@alamineacademy.com?subject=Politique%20de%20confidentialit%C3%A9" data-i18n="footer.privacy">Politique de confidentialité</a>'
    +         '<a href="mailto:contact@alamineacademy.com?subject=Conditions%20d%27utilisation" data-i18n="footer.terms">Conditions d\'utilisation</a>'
    +       '</div>'
    +     '</div>'
    +   '</div>'
    + '</footer>';

  /* ====================  WHATSAPP FAB  ==================== */
  var WA_HTML = ''
    + '<a class="wa-float" href="https://wa.me/221777743700" target="_blank" rel="noopener" aria-label="WhatsApp">'
    +   '<i class="fab fa-whatsapp"></i>'
    + '</a>';

  /* ====================  ANNONCE RENTRÉE — NOUVEAU LOCAL  ==================== */
  var ANNOUNCE_ID = 'aaa-announce-socabeg-2026';
  var ANNOUNCE_HTML = ''
    + '<div id="' + ANNOUNCE_ID + '" style="position:relative;z-index:60;background:linear-gradient(90deg,#1e7a9a,#165b73);color:#fff;font-size:13px;font-weight:600;text-align:center;padding:10px 44px 10px 14px;">'
    +   '<i class="fas fa-bullhorn" style="margin-right:8px;color:#fbbf24;"></i>'
    +   '<span>Rentrée 2026 : internat garçons désormais à la Cité SOCABEG, internat filles à la Cité des Magistrats. </span>'
    +   '<a href="' + ASSET_PREFIX + 'programme-internat" style="color:#fbbf24;text-decoration:underline;font-weight:800;white-space:nowrap;">Voir le nouveau local</a>'
    +   '<button id="aaa-announce-close" aria-label="Fermer" style="position:absolute;right:8px;top:50%;transform:translateY(-50%);background:none;border:none;color:#fff;opacity:.8;font-size:15px;cursor:pointer;padding:6px;">'
    +     '<i class="fas fa-times"></i>'
    +   '</button>'
    + '</div>';

  /* ====================  ROUTING  ==================== */
  function getActiveRoute() {
    var path = (window.location.pathname || '').toLowerCase();
    if (path.indexOf('/blog/') !== -1) return 'blog';
    if (/admission(\.html)?$/.test(path)) return 'fiche';
    if (/fiche-renseignements(\.html)?$/.test(path)) return 'fiche';
    if (/a-propos(\.html)?$/.test(path)) return 'about';
    if (/galerie(\.html)?$/.test(path)) return 'gallery';
    if (/temoignages(\.html)?$/.test(path)) return 'testimonials';
    if (/blog(\.html)?$/.test(path)) return 'blog';
    if (/contact(\.html)?$/.test(path)) return 'contact';
    if (/programme-/.test(path) || /conferences(\.html)?$/.test(path) || /aides-sociales(\.html)?$/.test(path)) return 'programs';
    return 'index';
  }

  /* --- Auto-inject modern CSS + JS once, before anything else --- */
  function injectModernAssets() {
    if (!document.querySelector('link[data-aaa-modern]')) {
      var link = document.createElement('link');
      link.rel  = 'stylesheet';
      link.href = ASSET_PREFIX + 'assets/css/modern.css';
      link.setAttribute('data-aaa-modern', '1');
      document.head.appendChild(link);
    }
    if (!document.querySelector('script[data-aaa-modern-js]')) {
      var s = document.createElement('script');
      s.src   = ASSET_PREFIX + 'assets/js/modern-reveal.js';
      s.defer = true;
      s.setAttribute('data-aaa-modern-js', '1');
      document.head.appendChild(s);
    }
  }
  injectModernAssets();

  function pushNavBelowBanner(bar) {
    /* La navbar est fixed top:0 — pousse-la (elle + le spacer h-20) sous la bannière */
    function apply() {
      var h = bar && bar.parentNode ? bar.offsetHeight : 0;
      var navEl = document.getElementById('aaa-nav');
      var spacer = document.getElementById('aaa-navbar') && document.getElementById('aaa-navbar').nextElementSibling;
      if (navEl) navEl.style.top = h + 'px';
      if (spacer) spacer.style.marginTop = h + 'px';
    }
    apply();
    window.addEventListener('resize', apply);
  }

  function inject() {
    var nav = document.getElementById('aaa-navbar');
    if (nav) {
      nav.innerHTML = NAV_HTML;
      var active = getActiveRoute();
      nav.querySelectorAll('[data-route="' + active + '"]').forEach(function (a) { a.classList.add('active'); });
    }

    /* --- Bannière d'annonce (rentrée / nouveau local) --- */
    try {
      if (!document.getElementById(ANNOUNCE_ID) && !localStorage.getItem(ANNOUNCE_ID + '-dismissed')) {
        var wrap = document.createElement('div');
        wrap.innerHTML = ANNOUNCE_HTML;
        var bar = wrap.firstChild;
        bar.style.position = 'fixed';
        bar.style.top = '0';
        bar.style.left = '0';
        bar.style.right = '0';
        document.body.insertBefore(bar, document.body.firstChild);
        pushNavBelowBanner(bar);
        var closeBtn = document.getElementById('aaa-announce-close');
        if (closeBtn) closeBtn.addEventListener('click', function () {
          bar.remove();
          pushNavBelowBanner(null);
          try { localStorage.setItem(ANNOUNCE_ID + '-dismissed', '1'); } catch (e) {}
        });
      }
    } catch (e) {}
    var foot = document.getElementById('aaa-footer');
    if (foot) foot.innerHTML = FOOTER_HTML;
    var wa = document.getElementById('aaa-wa');
    if (wa) wa.innerHTML = WA_HTML;

    /* --- Scroll progress bar --- */
    if (!document.getElementById('aaa-progress')) {
      var prog = document.createElement('div');
      prog.id = 'aaa-progress';
      prog.setAttribute('aria-hidden', 'true');
      document.body.insertBefore(prog, document.body.firstChild);
    }

    /* --- Back-to-top button --- */
    if (!document.getElementById('aaa-top')) {
      var topBtn = document.createElement('button');
      topBtn.id = 'aaa-top';
      topBtn.setAttribute('aria-label', 'Retour en haut de page');
      topBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
      document.body.appendChild(topBtn);
    }
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
    var btn     = document.getElementById('aaa-mobile-btn');
    var closeBtn= document.getElementById('aaa-mobile-close');
    var menu    = document.getElementById('aaa-mobile-menu');
    var overlay = document.getElementById('aaa-drawer-overlay');
    if (!btn || !menu) return;

    function openDrawer() {
      /* Reset stagger animation so it replays on re-open */
      menu.querySelectorAll('.aaa-dlink').forEach(function(el) {
        el.style.animation = 'none';
        el.offsetHeight; /* reflow */
        el.style.animation = '';
      });
      menu.classList.add('drawer-open');
      if (overlay) { overlay.style.display = 'block'; setTimeout(function(){ overlay.classList.add('overlay-visible'); }, 10); }
      document.body.style.overflow = 'hidden';
      var icon = document.getElementById('aaa-mobile-icon');
      if (icon) { icon.classList.remove('fa-bars'); icon.classList.add('fa-times'); }
      /* Mark active lang pill */
      var curLang = document.documentElement.lang || 'fr';
      menu.querySelectorAll('.aaa-lang-pill').forEach(function(p) {
        p.classList.toggle('active-lang', p.getAttribute('data-lang-switch') === curLang);
      });
    }

    function closeDrawer() {
      menu.classList.remove('drawer-open');
      if (overlay) { overlay.classList.remove('overlay-visible'); setTimeout(function(){ overlay.style.display = 'none'; }, 260); }
      document.body.style.overflow = '';
      var icon = document.getElementById('aaa-mobile-icon');
      if (icon) { icon.classList.remove('fa-times'); icon.classList.add('fa-bars'); }
    }

    btn.addEventListener('click', function () {
      menu.classList.contains('drawer-open') ? closeDrawer() : openDrawer();
    });
    if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
    if (overlay)  overlay.addEventListener('click', closeDrawer);
    menu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeDrawer);
    });
    /* Close on Escape */
    document.addEventListener('keydown', function(e){ if (e.key === 'Escape') closeDrawer(); });
  }

  /* ==================== SCROLL PROGRESS + BACK-TO-TOP ==================== */
  function bindScrollProgress() {
    var bar    = document.getElementById('aaa-progress');
    var topBtn = document.getElementById('aaa-top');
    function onScroll() {
      var doc   = document.documentElement;
      var total = doc.scrollHeight - doc.clientHeight;
      if (bar) bar.style.width = (total > 0 ? (window.scrollY / total * 100) : 0) + '%';
      if (topBtn) {
        if (window.scrollY > 420) topBtn.classList.add('visible');
        else                      topBtn.classList.remove('visible');
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  function bindBackToTop() {
    var topBtn = document.getElementById('aaa-top');
    if (!topBtn) return;
    topBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ==================== COUNTER ANIMATION ==================== */
  /* Usage: <span data-counter="200" data-counter-suffix="+">200+</span>        */
  /* Elements already visible at page load (entry.time < 500ms) show their      */
  /* final value immediately — no count-up from zero for above-the-fold stats.  */
  function bindCounters() {
    var els = document.querySelectorAll('[data-counter]');
    if (!els.length || !window.IntersectionObserver) return;

    function setFinal(el) {
      var t = parseFloat(el.getAttribute('data-counter'));
      var s = el.getAttribute('data-counter-suffix') || '';
      var p = el.getAttribute('data-counter-prefix') || '';
      var d = el.getAttribute('data-counter-decimal') === 'true';
      el.textContent = p + (d ? t.toFixed(1) : t) + s;
    }

    function animate(el) {
      var target  = parseFloat(el.getAttribute('data-counter'));
      var suffix  = el.getAttribute('data-counter-suffix') || '';
      var prefix  = el.getAttribute('data-counter-prefix') || '';
      var decimal = el.getAttribute('data-counter-decimal') === 'true';
      var dur = 1500, t0 = performance.now();
      function step(now) {
        var p  = Math.min((now - t0) / dur, 1);
        var ep = 1 - Math.pow(1 - p, 3);             /* ease-out cubic */
        var v  = decimal ? (ep * target).toFixed(1) : Math.floor(ep * target);
        el.textContent = prefix + v + suffix;
        if (p < 1) requestAnimationFrame(step);
        else el.textContent = prefix + (decimal ? target.toFixed(1) : target) + suffix;
      }
      requestAnimationFrame(step);
    }

    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        /* entry.time is ms since page navigation — < 500 means already in viewport */
        if (entry.time < 500) setFinal(entry.target);
        else                   animate(entry.target);
        obs.unobserve(entry.target);
      });
    }, { threshold: 0.55 });
    els.forEach(function (el) { obs.observe(el); });
  }

  /* ==================== IMG ZOOM — auto-wrap card images ==================== */
  function bindImageZoom() {
    /* Wrap <img> inside .program-card, .card, .testimonial-card that aren't already wrapped */
    document.querySelectorAll('.program-card img, .card img').forEach(function (img) {
      if (img.parentElement.classList.contains('img-zoom')) return;
      var wrap = document.createElement('div');
      wrap.className = 'img-zoom';
      img.parentNode.insertBefore(wrap, img);
      wrap.appendChild(img);
    });
  }

  /* ==================== IMAGE LOADING — shimmer skeleton + fade-in ========= */
  /* Applies to every content <img> (gallery, blog covers, program photos).    *
   * Nav/footer/WA logos and the page loader itself are excluded.             */
  function bindImageLoading() {
    document.querySelectorAll('img').forEach(function (img) {
      if (img.classList.contains('aaa-img-tracked')) return;
      if (img.closest('#aaa-navbar, #aaa-footer, #aaa-wa, #aaa-loader')) return;
      img.classList.add('aaa-img-tracked', 'aaa-img-fade');
      function reveal() { img.classList.add('aaa-img-loaded'); }
      if (img.complete && img.naturalWidth > 0) reveal();
      else {
        img.addEventListener('load', reveal, { once: true });
        img.addEventListener('error', reveal, { once: true });
      }
    });
  }

  /* ==================== PAGE LOADER — hide once content is ready =========== */
  function bindPageLoader() {
    var el = document.getElementById('aaa-loader');
    if (!el) return;
    function hide() {
      el.classList.add('aaa-loader-hidden');
      setTimeout(function () { if (el.parentNode) el.parentNode.removeChild(el); }, 500);
    }
    var minDelay = new Promise(function (res) { setTimeout(res, 350); });
    var contentReady = (window.AAA_translationsReadyPromise && typeof window.AAA_translationsReadyPromise.then === 'function')
      ? window.AAA_translationsReadyPromise
      : Promise.resolve();
    var hardTimeout = new Promise(function (res) { setTimeout(res, 2500); });
    Promise.race([
      Promise.all([contentReady, minDelay]).catch(function () {}),
      hardTimeout
    ]).then(hide);
  }

  /* ==================== TOP NAV LOADING BAR — internal link clicks ========= */
  function bindNavLoadingBar() {
    var bar = document.getElementById('aaa-progress');
    if (!bar) return;
    document.addEventListener('click', function (e) {
      var a = e.target.closest('a');
      if (!a) return;
      var href = a.getAttribute('href') || '';
      if (!href || href.charAt(0) === '#' || href.indexOf('mailto:') === 0 || href.indexOf('tel:') === 0) return;
      if (a.target === '_blank' || a.hasAttribute('download')) return;
      var url;
      try { url = new URL(a.href, location.href); } catch (err) { return; }
      if (url.origin !== location.origin) return;
      if (url.pathname === location.pathname && url.hash) return; /* same-page anchor */
      bar.classList.add('aaa-progress-loading');
      bar.style.width = '78%';
    });
  }

  /* ==================== CTA LOADING FEEDBACK — inscription/WhatsApp ======== */
  function bindCtaLoadingFeedback() {
    document.addEventListener('click', function (e) {
      var a = e.target.closest('a');
      if (!a || a.target !== '_blank') return;
      var href = a.getAttribute('href') || '';
      if (href.indexOf('hassan.alamineacademy.com') === -1 && href.indexOf('wa.me') === -1) return;
      if (a.classList.contains('is-loading')) return;
      var original = a.innerHTML;
      a.classList.add('is-loading');
      a.innerHTML = '<i class="fas fa-spinner fa-spin"></i>&nbsp; ' + (a.getAttribute('data-loading-label') || 'Redirection…');
      setTimeout(function () {
        a.innerHTML = original;
        a.classList.remove('is-loading');
      }, 1100);
    });
  }

  function ready(fn) {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn);
    else fn();
  }

  ready(function () {
    inject();
    bindScroll();
    bindMobileMenu();
    bindScrollProgress();
    bindBackToTop();
    bindCounters();
    bindImageZoom();
    bindImageLoading();
    bindNavLoadingBar();
    bindCtaLoadingFeedback();
    bindPageLoader();
    if (typeof window.applyTranslations === 'function') {
      try { window.applyTranslations(); } catch (e) { /* ignore */ }
    }
  });
})();
