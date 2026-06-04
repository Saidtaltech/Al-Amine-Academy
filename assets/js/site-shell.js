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
    +       '<a href="' + ASSET_PREFIX + 'index.html" class="flex items-center gap-3 group">'
    +         '<img src="' + ASSET_PREFIX + 'assets/img/LogoAAA.png" alt="Logo DAARA Al Amine Academy" class="w-11 h-11 object-contain"/>'
    +         '<span class="hidden sm:flex flex-col leading-tight">'
    +           '<span class="text-base font-extrabold text-slate-900 tracking-tight">DAARA Al Amine</span>'
    +           '<span class="text-[10px] uppercase tracking-[0.18em] text-primary font-semibold">Academy · Dakar</span>'
    +         '</span>'
    +       '</a>'

    +       '<div class="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-700">'
    +         '<a href="' + ASSET_PREFIX + 'index.html"          data-route="index"        class="nav-link hover:text-primary" data-i18n="menu.home">Accueil</a>'
    +         '<div class="relative group">'
    +           '<button type="button" data-route="programs" class="nav-link hover:text-primary inline-flex items-center gap-1" data-i18n="menu.programs">Programmes <i class="fas fa-chevron-down text-[10px] transition-transform group-hover:rotate-180"></i></button>'
    +           '<div class="absolute left-1/2 -translate-x-1/2 mt-3 w-72 bg-white rounded-2xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all transform translate-y-1 group-hover:translate-y-0 border border-slate-100 overflow-hidden">'
    +             '<a href="' + ASSET_PREFIX + 'programme-internat.html"          class="flex items-center gap-3 px-4 py-3 hover:bg-primary/5"><div class="w-9 h-9 bg-primary/10 rounded-lg flex items-center justify-center"><i class="fas fa-book-open text-primary text-sm"></i></div><div><p class="font-semibold text-slate-800 text-sm">Tahfiz Internat</p><p class="text-xs text-slate-500">Mémorisation complète du Coran</p></div></a>'
    +             '<a href="' + ASSET_PREFIX + 'programme-mixte.html"             class="flex items-center gap-3 px-4 py-3 hover:bg-primary/5"><div class="w-9 h-9 bg-primary/10 rounded-lg flex items-center justify-center"><i class="fas fa-balance-scale text-primary text-sm"></i></div><div><p class="font-semibold text-slate-800 text-sm" data-i18n="programs.mixed">Programme Mixte</p><p class="text-xs text-slate-500">Externat journalier</p></div></a>'
    +             '<a href="' + ASSET_PREFIX + 'programme-cours-en-ligne.html"    class="flex items-center gap-3 px-4 py-3 hover:bg-primary/5"><div class="w-9 h-9 bg-primary/10 rounded-lg flex items-center justify-center"><i class="fas fa-laptop text-primary text-sm"></i></div><div><p class="font-semibold text-slate-800 text-sm" data-i18n="programs.online">Cours en Ligne</p><p class="text-xs text-slate-500">Apprenez de chez vous</p></div></a>'
    +             '<a href="' + ASSET_PREFIX + 'programme-cours-gratuits.html"    class="flex items-center gap-3 px-4 py-3 hover:bg-secondary/5"><div class="w-9 h-9 bg-secondary/10 rounded-lg flex items-center justify-center"><i class="fas fa-gift text-secondary text-sm"></i></div><div><p class="font-semibold text-slate-800 text-sm" data-i18n="programs.free">Cours Gratuits</p><p class="text-xs text-slate-500">Accès libre pour tous</p></div></a>'
    +             '<a href="' + ASSET_PREFIX + 'camp-vacances.html"               class="flex items-center gap-3 px-4 py-3 hover:bg-secondary/5"><div class="w-9 h-9 bg-secondary/10 rounded-lg flex items-center justify-center"><i class="fas fa-umbrella-beach text-secondary text-sm"></i></div><div><p class="font-semibold text-slate-800 text-sm">Camp de Vacances</p><p class="text-xs text-slate-500">Été 2026 · Dakar &amp; Petite Côte</p></div></a>'
    +             '<a href="' + ASSET_PREFIX + 'fiche-renseignements.html"        class="flex items-center gap-3 px-4 py-3 hover:bg-purple-50"><div class="w-9 h-9 bg-purple-100 rounded-lg flex items-center justify-center"><i class="fas fa-file-alt text-purple-600 text-sm"></i></div><div><p class="font-semibold text-slate-800 text-sm" data-i18n="menu.fiche">Fiche de Renseignements</p><p class="text-xs text-slate-500">FR · EN · AR · ES</p></div></a>'
    +             '<a href="' + ASSET_PREFIX + 'conferences.html"                 class="flex items-center gap-3 px-4 py-3 hover:bg-primary/5"><div class="w-9 h-9 bg-primary/10 rounded-lg flex items-center justify-center"><i class="fas fa-chalkboard-teacher text-primary text-sm"></i></div><div><p class="font-semibold text-slate-800 text-sm" data-i18n="programs.conferences">Formations &amp; Conférences</p><p class="text-xs text-slate-500" data-i18n="programs.conferences_subtitle">Ateliers, séminaires &amp; formations</p></div></a>'
    +             '<div class="border-t border-slate-100 mx-4 my-1"></div>'
    +             '<p class="px-4 pt-2 pb-1 text-[10px] uppercase tracking-wider font-bold text-slate-400">Aides Sociales</p>'
    +             '<a href="' + ASSET_PREFIX + 'aides-sociales.html"             class="flex items-center gap-3 px-4 py-3 hover:bg-primary/5"><div class="w-9 h-9 bg-teal-100 rounded-lg flex items-center justify-center"><i class="fas fa-hand-holding-heart text-primary text-sm"></i></div><div><p class="font-semibold text-slate-800 text-sm">Projet Al Mouslihoon <span style="font-family:Amiri,serif;font-size:0.85em;color:#0f766e;">المُصلحون</span></p><p class="text-xs text-slate-500">Aides sociales & humanitaires</p></div></a>'
    +           '</div>'
    +         '</div>'
    +         '<a href="' + ASSET_PREFIX + 'fiche-renseignements.html" data-route="fiche"       class="nav-link hover:text-primary" data-i18n="menu.admission">Renseignements</a>'
    +         '<a href="' + ASSET_PREFIX + 'a-propos.html"       data-route="about"        class="nav-link hover:text-primary whitespace-nowrap" data-i18n="menu.about">À Propos</a>'
    +         '<a href="' + ASSET_PREFIX + 'galerie.html"        data-route="gallery"      class="nav-link hover:text-primary" data-i18n="menu.gallery">Galerie</a>'
    +         '<a href="' + ASSET_PREFIX + 'temoignages.html"    data-route="testimonials" class="nav-link hover:text-primary" data-i18n="menu.testimonials">Témoignages</a>'
    +         '<a href="' + ASSET_PREFIX + 'blog.html"           data-route="blog"         class="nav-link hover:text-primary" data-i18n="menu.blog">Blog</a>'
    +         '<a href="' + ASSET_PREFIX + 'contact.html"        data-route="contact"      class="nav-link hover:text-primary" data-i18n="menu.contact">Contact</a>'
    +       '</div>'

    +       '<div class="flex items-center gap-2 lg:gap-3">'
    +         '<div class="hidden md:flex items-center gap-0.5 text-xs font-semibold text-slate-600 border border-slate-200 rounded-lg p-0.5">'
    +           '<a href="#" data-lang-switch="fr" onclick="switchLanguage(\'fr\');return false;" class="px-2 py-1 rounded-md hover:bg-slate-100" title="Français">FR</a>'
    +           '<a href="#" data-lang-switch="en" onclick="switchLanguage(\'en\');return false;" class="px-2 py-1 rounded-md hover:bg-slate-100" title="English">EN</a>'
    +           '<a href="#" data-lang-switch="ar" onclick="switchLanguage(\'ar\');return false;" class="px-2 py-1 rounded-md hover:bg-slate-100 arabic-text" title="العربية">ع</a>'
    +           '<a href="#" data-lang-switch="es" onclick="switchLanguage(\'es\');return false;" class="px-2 py-1 rounded-md hover:bg-slate-100" title="Español">ES</a>'
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

    /* Nav principal */
    +     '<p style="font-size:10px;text-transform:uppercase;letter-spacing:.12em;color:#94a3b8;font-weight:700;margin:0 0 8px 4px;">Navigation</p>'
    +     '<nav style="display:flex;flex-direction:column;gap:2px;margin-bottom:20px;">'
    +       '<a href="' + ASSET_PREFIX + 'index.html"       data-route="index"       style="display:flex;align-items:center;gap:12px;padding:11px 14px;border-radius:12px;color:#1e293b;text-decoration:none;font-size:14px;font-weight:600;transition:background .15s;" onmouseover="this.style.background=\'#f0f9fc\'" onmouseout="this.style.background=\'transparent\'">'
    +         '<span style="width:32px;height:32px;border-radius:9px;background:#e8f4f8;display:flex;align-items:center;justify-content:center;flex-shrink:0;"><i class="fas fa-home" style="color:#1e7a9a;font-size:13px;"></i></span>'
    +         'Accueil'
    +       '</a>'
    +       '<a href="' + ASSET_PREFIX + 'a-propos.html"    data-route="about"       style="display:flex;align-items:center;gap:12px;padding:11px 14px;border-radius:12px;color:#1e293b;text-decoration:none;font-size:14px;font-weight:600;transition:background .15s;" onmouseover="this.style.background=\'#f0f9fc\'" onmouseout="this.style.background=\'transparent\'">'
    +         '<span style="width:32px;height:32px;border-radius:9px;background:#e8f4f8;display:flex;align-items:center;justify-content:center;flex-shrink:0;"><i class="fas fa-mosque" style="color:#1e7a9a;font-size:13px;"></i></span>'
    +         'À Propos'
    +       '</a>'
    +       '<a href="' + ASSET_PREFIX + 'galerie.html"     data-route="gallery"     style="display:flex;align-items:center;gap:12px;padding:11px 14px;border-radius:12px;color:#1e293b;text-decoration:none;font-size:14px;font-weight:600;transition:background .15s;" onmouseover="this.style.background=\'#f0f9fc\'" onmouseout="this.style.background=\'transparent\'">'
    +         '<span style="width:32px;height:32px;border-radius:9px;background:#e8f4f8;display:flex;align-items:center;justify-content:center;flex-shrink:0;"><i class="fas fa-images" style="color:#1e7a9a;font-size:13px;"></i></span>'
    +         'Galerie'
    +       '</a>'
    +       '<a href="' + ASSET_PREFIX + 'temoignages.html" data-route="testimonials" style="display:flex;align-items:center;gap:12px;padding:11px 14px;border-radius:12px;color:#1e293b;text-decoration:none;font-size:14px;font-weight:600;transition:background .15s;" onmouseover="this.style.background=\'#f0f9fc\'" onmouseout="this.style.background=\'transparent\'">'
    +         '<span style="width:32px;height:32px;border-radius:9px;background:#e8f4f8;display:flex;align-items:center;justify-content:center;flex-shrink:0;"><i class="fas fa-star" style="color:#1e7a9a;font-size:13px;"></i></span>'
    +         'Témoignages'
    +       '</a>'
    +       '<a href="' + ASSET_PREFIX + 'blog.html"        data-route="blog"        style="display:flex;align-items:center;gap:12px;padding:11px 14px;border-radius:12px;color:#1e293b;text-decoration:none;font-size:14px;font-weight:600;transition:background .15s;" onmouseover="this.style.background=\'#f0f9fc\'" onmouseout="this.style.background=\'transparent\'">'
    +         '<span style="width:32px;height:32px;border-radius:9px;background:#e8f4f8;display:flex;align-items:center;justify-content:center;flex-shrink:0;"><i class="fas fa-pen-nib" style="color:#1e7a9a;font-size:13px;"></i></span>'
    +         'Blog'
    +       '</a>'
    +       '<a href="' + ASSET_PREFIX + 'contact.html"     data-route="contact"     style="display:flex;align-items:center;gap:12px;padding:11px 14px;border-radius:12px;color:#1e293b;text-decoration:none;font-size:14px;font-weight:600;transition:background .15s;" onmouseover="this.style.background=\'#f0f9fc\'" onmouseout="this.style.background=\'transparent\'">'
    +         '<span style="width:32px;height:32px;border-radius:9px;background:#e8f4f8;display:flex;align-items:center;justify-content:center;flex-shrink:0;"><i class="fas fa-envelope" style="color:#1e7a9a;font-size:13px;"></i></span>'
    +         'Contact'
    +       '</a>'
    +     '</nav>'

    /* Programmes section */
    +     '<p style="font-size:10px;text-transform:uppercase;letter-spacing:.12em;color:#94a3b8;font-weight:700;margin:0 0 8px 4px;">Programmes</p>'
    +     '<nav style="display:flex;flex-direction:column;gap:2px;margin-bottom:20px;">'
    +       '<a href="' + ASSET_PREFIX + 'programme-internat.html"       data-route="programs" style="display:flex;align-items:center;gap:12px;padding:11px 14px;border-radius:12px;color:#1e293b;text-decoration:none;font-size:14px;font-weight:600;transition:background .15s;" onmouseover="this.style.background=\'#f0f9fc\'" onmouseout="this.style.background=\'transparent\'">'
    +         '<span style="width:32px;height:32px;border-radius:9px;background:#e8f4f8;display:flex;align-items:center;justify-content:center;flex-shrink:0;"><i class="fas fa-book-open" style="color:#1e7a9a;font-size:13px;"></i></span>'
    +         '<span><span style="display:block;font-size:14px;">Tahfiz Internat</span><span style="font-size:11px;color:#64748b;font-weight:400;">Mémorisation complète du Coran</span></span>'
    +       '</a>'
    +       '<a href="' + ASSET_PREFIX + 'programme-mixte.html"           data-route="programs" style="display:flex;align-items:center;gap:12px;padding:11px 14px;border-radius:12px;color:#1e293b;text-decoration:none;font-size:14px;font-weight:600;transition:background .15s;" onmouseover="this.style.background=\'#f0f9fc\'" onmouseout="this.style.background=\'transparent\'">'
    +         '<span style="width:32px;height:32px;border-radius:9px;background:#e8f4f8;display:flex;align-items:center;justify-content:center;flex-shrink:0;"><i class="fas fa-balance-scale" style="color:#1e7a9a;font-size:13px;"></i></span>'
    +         '<span><span style="display:block;font-size:14px;">Programme Mixte</span><span style="font-size:11px;color:#64748b;font-weight:400;">Externat journalier</span></span>'
    +       '</a>'
    +       '<a href="' + ASSET_PREFIX + 'programme-cours-en-ligne.html"  data-route="programs" style="display:flex;align-items:center;gap:12px;padding:11px 14px;border-radius:12px;color:#1e293b;text-decoration:none;font-size:14px;font-weight:600;transition:background .15s;" onmouseover="this.style.background=\'#f0f9fc\'" onmouseout="this.style.background=\'transparent\'">'
    +         '<span style="width:32px;height:32px;border-radius:9px;background:#e8f4f8;display:flex;align-items:center;justify-content:center;flex-shrink:0;"><i class="fas fa-laptop" style="color:#1e7a9a;font-size:13px;"></i></span>'
    +         '<span><span style="display:block;font-size:14px;">Cours en Ligne</span><span style="font-size:11px;color:#64748b;font-weight:400;">Apprenez de chez vous</span></span>'
    +       '</a>'
    +       '<a href="' + ASSET_PREFIX + 'programme-cours-gratuits.html"  data-route="programs" style="display:flex;align-items:center;gap:12px;padding:11px 14px;border-radius:12px;color:#1e293b;text-decoration:none;font-size:14px;font-weight:600;transition:background .15s;" onmouseover="this.style.background=\'#fefce8\'" onmouseout="this.style.background=\'transparent\'">'
    +         '<span style="width:32px;height:32px;border-radius:9px;background:#fef3c7;display:flex;align-items:center;justify-content:center;flex-shrink:0;"><i class="fas fa-gift" style="color:#d97706;font-size:13px;"></i></span>'
    +         '<span><span style="display:block;font-size:14px;">Cours Gratuits</span><span style="font-size:11px;color:#64748b;font-weight:400;">Accès libre pour tous</span></span>'
    +       '</a>'
    +       '<a href="' + ASSET_PREFIX + 'camp-vacances.html"             data-route="programs" style="display:flex;align-items:center;gap:12px;padding:11px 14px;border-radius:12px;color:#1e293b;text-decoration:none;font-size:14px;font-weight:600;background:linear-gradient(135deg,#fff7ed,#fefce8);border:1px solid #fed7aa;" onmouseover="this.style.background=\'linear-gradient(135deg,#ffedd5,#fef9c3)\'" onmouseout="this.style.background=\'linear-gradient(135deg,#fff7ed,#fefce8)\'">'
    +         '<span style="width:32px;height:32px;border-radius:9px;background:#fde68a;display:flex;align-items:center;justify-content:center;flex-shrink:0;"><i class="fas fa-umbrella-beach" style="color:#b45309;font-size:13px;"></i></span>'
    +         '<span><span style="display:block;font-size:14px;">Camp de Vacances</span><span style="font-size:11px;color:#92400e;font-weight:600;">Été 2026 · Dakar &amp; Petite Côte</span></span>'
    +       '</a>'
    +       '<a href="' + ASSET_PREFIX + 'conferences.html"               data-route="programs" style="display:flex;align-items:center;gap:12px;padding:11px 14px;border-radius:12px;color:#1e293b;text-decoration:none;font-size:14px;font-weight:600;transition:background .15s;" onmouseover="this.style.background=\'#f0f9fc\'" onmouseout="this.style.background=\'transparent\'">'
    +         '<span style="width:32px;height:32px;border-radius:9px;background:#e8f4f8;display:flex;align-items:center;justify-content:center;flex-shrink:0;"><i class="fas fa-chalkboard-teacher" style="color:#1e7a9a;font-size:13px;"></i></span>'
    +         '<span><span style="display:block;font-size:14px;">Formations &amp; Conférences</span><span style="font-size:11px;color:#64748b;font-weight:400;">Ateliers &amp; séminaires</span></span>'
    +       '</a>'
    +       '<a href="' + ASSET_PREFIX + 'aides-sociales.html"            data-route="programs" style="display:flex;align-items:center;gap:12px;padding:11px 14px;border-radius:12px;color:#1e293b;text-decoration:none;font-size:14px;font-weight:600;transition:background .15s;" onmouseover="this.style.background=\'#f0fdfa\'" onmouseout="this.style.background=\'transparent\'">'
    +         '<span style="width:32px;height:32px;border-radius:9px;background:#ccfbf1;display:flex;align-items:center;justify-content:center;flex-shrink:0;"><i class="fas fa-hand-holding-heart" style="color:#0f766e;font-size:13px;"></i></span>'
    +         '<span><span style="display:block;font-size:14px;">Projet Al Mouslihoon</span><span style="font-size:11px;color:#64748b;font-weight:400;">Aides sociales &amp; humanitaires</span></span>'
    +       '</a>'
    +     '</nav>'

    /* Langue */
    +     '<p style="font-size:10px;text-transform:uppercase;letter-spacing:.12em;color:#94a3b8;font-weight:700;margin:0 0 8px 4px;">Langue</p>'
    +     '<div style="display:flex;gap:6px;margin-bottom:20px;">'
    +       '<a href="#" data-lang-switch="fr" onclick="switchLanguage(\'fr\');return false;" style="flex:1;text-align:center;padding:9px 4px;border-radius:10px;border:1.5px solid #e2e8f0;font-size:12px;font-weight:700;color:#1e293b;text-decoration:none;background:#f8fafc;">FR</a>'
    +       '<a href="#" data-lang-switch="en" onclick="switchLanguage(\'en\');return false;" style="flex:1;text-align:center;padding:9px 4px;border-radius:10px;border:1.5px solid #e2e8f0;font-size:12px;font-weight:700;color:#1e293b;text-decoration:none;background:#f8fafc;">EN</a>'
    +       '<a href="#" data-lang-switch="ar" onclick="switchLanguage(\'ar\');return false;" style="flex:1;text-align:center;padding:9px 4px;border-radius:10px;border:1.5px solid #e2e8f0;font-size:13px;font-weight:700;color:#1e293b;text-decoration:none;background:#f8fafc;font-family:Amiri,serif;">ع</a>'
    +       '<a href="#" data-lang-switch="es" onclick="switchLanguage(\'es\');return false;" style="flex:1;text-align:center;padding:9px 4px;border-radius:10px;border:1.5px solid #e2e8f0;font-size:12px;font-weight:700;color:#1e293b;text-decoration:none;background:#f8fafc;">ES</a>'
    +     '</div>'

    +   '</div>'

    /* Drawer footer CTA */
    +   '<div style="padding:16px;border-top:1px solid #f1f5f9;background:#fafafa;">'
    +     '<a href="tel:+221777743700" style="display:flex;align-items:center;justify-content:center;gap:10px;width:100%;padding:14px;background:linear-gradient(135deg,#f59e0b,#d97706);color:#fff;border-radius:14px;font-weight:800;font-size:15px;text-decoration:none;letter-spacing:.01em;">'
    +       '<i class="fas fa-phone" style="font-size:14px;"></i> +221 77 774 37 00'
    +     '</a>'
    +     '<a href="https://wa.me/221777743700" target="_blank" rel="noopener" style="display:flex;align-items:center;justify-content:center;gap:10px;width:100%;padding:12px;margin-top:8px;background:#25d366;color:#fff;border-radius:14px;font-weight:700;font-size:14px;text-decoration:none;">'
    +       '<i class="fab fa-whatsapp" style="font-size:16px;"></i> WhatsApp'
    +     '</a>'
    +   '</div>'
    + '</div>'

    + '<style>'
    + '#aaa-mobile-menu { display:flex!important; }'
    + '#aaa-mobile-menu.drawer-open { transform:translateX(0)!important; }'
    + '#aaa-drawer-overlay.overlay-visible { opacity:1!important; }'
    + '#aaa-drawer-overlay { opacity:0; }'
    + '</style>';

  /* ====================  FOOTER HTML  ==================== */
  var FOOTER_HTML = ''
    + '<footer class="site-footer pt-16 pb-8">'
    +   '<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">'
    +     '<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">'
    +       '<div>'
    +         '<a href="' + ASSET_PREFIX + 'index.html" class="flex items-center gap-3 mb-4">'
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
    +           '<li><a href="' + ASSET_PREFIX + 'index.html"        data-i18n="menu.home">Accueil</a></li>'
    +           '<li><a href="' + ASSET_PREFIX + 'a-propos.html"     data-i18n="menu.about">À propos</a></li>'
    +           '<li><a href="' + ASSET_PREFIX + 'fiche-renseignements.html" data-i18n="menu.admission">Renseignements</a></li>'
    +           '<li><a href="' + ASSET_PREFIX + 'galerie.html"      data-i18n="menu.gallery">Galerie</a></li>'
    +           '<li><a href="' + ASSET_PREFIX + 'temoignages.html"  data-i18n="menu.testimonials">Témoignages</a></li>'
    +           '<li><a href="' + ASSET_PREFIX + 'blog.html"         data-i18n="menu.blog">Blog</a></li>'
    +           '<li><a href="' + ASSET_PREFIX + 'contact.html"      data-i18n="menu.contact">Contact</a></li>'
    +         '</ul>'
    +       '</div>'

    +       '<div>'
    +         '<h4 class="text-white font-bold mb-4 text-sm uppercase tracking-wider" data-i18n="footer.programs">Nos programmes</h4>'
    +         '<ul class="space-y-2 text-sm">'
    +           '<li><a href="' + ASSET_PREFIX + 'programme-internat.html">Tahfiz Internat</a></li>'
    +           '<li><a href="' + ASSET_PREFIX + 'programme-mixte.html"             data-i18n="programs.mixed">Programme Mixte</a></li>'
    +           '<li><a href="' + ASSET_PREFIX + 'programme-cours-en-ligne.html"    data-i18n="programs.online">Cours en Ligne</a></li>'
    +           '<li><a href="' + ASSET_PREFIX + 'programme-cours-gratuits.html"    data-i18n="programs.free">Cours Gratuits</a></li>'
    +           '<li><a href="' + ASSET_PREFIX + 'camp-vacances.html"><i class="fas fa-umbrella-beach mr-1 text-xs"></i> Camp de Vacances</a></li>'
    +           '<li><a href="' + ASSET_PREFIX + 'fiche-renseignements.html" data-i18n="menu.fiche"><i class="fas fa-file-alt mr-1 text-xs"></i> Fiche de Renseignements</a></li>'
    +           '<li><a href="' + ASSET_PREFIX + 'conferences.html">Conférences &amp; Hajj</a></li>'
    +           '<li><a href="' + ASSET_PREFIX + 'aides-sociales.html"><i class="fas fa-hand-holding-heart mr-1 text-xs"></i> Aides Sociales</a></li>'
    +         '</ul>'
    +       '</div>'

    +       '<div>'
    +         '<h4 class="text-white font-bold mb-4 text-sm uppercase tracking-wider" data-i18n="footer.contact">Contact</h4>'
    +         '<ul class="space-y-3 text-sm">'
    +           '<li class="flex items-start gap-3"><i class="fas fa-location-dot text-secondary mt-0.5"></i><span data-i18n="contact.address">Cité des Magistrats, Derrière Kër Yoff, Dakar</span></li>'
    +           '<li class="flex items-center gap-3"><i class="fas fa-phone text-secondary"></i><a href="tel:+221777743700" class="tabular">+221 77 774 37 00</a></li>'
    +           '<li class="flex items-center gap-3"><i class="fas fa-envelope text-secondary"></i><a href="mailto:daara@alamineacademy.com">daara@alamineacademy.com</a></li>'
    +         '</ul>'
    +       '</div>'
    +     '</div>'

    +     '<div class="border-t border-slate-800 pt-6 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-slate-400">'
    +       '<p data-i18n="footer.copyright">© 2023–2026 DAARA Al Amine Academy. Tous droits réservés.</p>'
    +       '<div class="flex gap-6">'
    +         '<a href="mailto:daara@alamineacademy.com?subject=Politique%20de%20confidentialit%C3%A9" data-i18n="footer.privacy">Politique de confidentialité</a>'
    +         '<a href="mailto:daara@alamineacademy.com?subject=Conditions%20d%27utilisation" data-i18n="footer.terms">Conditions d\'utilisation</a>'
    +       '</div>'
    +     '</div>'
    +   '</div>'
    + '</footer>';

  /* ====================  WHATSAPP FAB  ==================== */
  var WA_HTML = ''
    + '<a class="wa-float" href="https://wa.me/221777743700" target="_blank" rel="noopener" aria-label="WhatsApp">'
    +   '<i class="fab fa-whatsapp"></i>'
    + '</a>';

  /* ====================  ROUTING  ==================== */
  function getActiveRoute() {
    var path = (window.location.pathname || '').toLowerCase();
    if (path.indexOf('/blog/') !== -1) return 'blog';
    if (/admission\.html$/.test(path)) return 'fiche';
    if (/fiche-renseignements\.html$/.test(path)) return 'fiche';
    if (/a-propos\.html$/.test(path)) return 'about';
    if (/galerie\.html$/.test(path)) return 'gallery';
    if (/temoignages\.html$/.test(path)) return 'testimonials';
    if (/blog\.html$/.test(path)) return 'blog';
    if (/contact\.html$/.test(path)) return 'contact';
    if (/programme-/.test(path) || /conferences\.html$/.test(path) || /aides-sociales\.html$/.test(path)) return 'programs';
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

  function inject() {
    var nav = document.getElementById('aaa-navbar');
    if (nav) {
      nav.innerHTML = NAV_HTML;
      var active = getActiveRoute();
      nav.querySelectorAll('[data-route="' + active + '"]').forEach(function (a) { a.classList.add('active'); });
    }
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
      menu.classList.add('drawer-open');
      if (overlay) { overlay.style.display = 'block'; setTimeout(function(){ overlay.classList.add('overlay-visible'); }, 10); }
      document.body.style.overflow = 'hidden';
      var icon = document.getElementById('aaa-mobile-icon');
      if (icon) { icon.classList.remove('fa-bars'); icon.classList.add('fa-times'); }
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
    if (typeof window.applyTranslations === 'function') {
      try { window.applyTranslations(); } catch (e) { /* ignore */ }
    }
  });
})();
