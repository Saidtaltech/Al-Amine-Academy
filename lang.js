/* Système de traduction — Al Amine Academy
 *
 * Les pages sont rédigées en français dans le HTML ; le dictionnaire ne sert
 * qu'à les basculer vers en/ar/es. On ne charge donc RIEN pour un visiteur
 * francophone, et un seul fichier (plus le français en repli) pour les autres.
 *
 * Auparavant chaque page téléchargeait translations.js (357 Ko, les quatre
 * langues) puis, en plus, les quatre translations-*.json — soit ~700 Ko bruts
 * pour afficher un texte déjà présent dans la page.
 *
 * switchLanguage(lang) reste exposé globalement et gère l'attente du fichier.
 * Met à jour <html lang> et dir (RTL pour l'arabe) ainsi que #currentLang.
 * Contient aussi une couche de résilience Font Awesome / AOS. */

const LANGS = ['fr', 'en', 'ar', 'es'];

/* translations.js n'est plus chargé par les pages, mais s'il l'était (page
 * ancienne, ouverture en file://) on réutilise ses données. */
const TRANSLATIONS = (window.AAA_TRANSLATIONS && typeof window.AAA_TRANSLATIONS === 'object')
    ? window.AAA_TRANSLATIONS
    : { fr: {}, en: {}, ar: {}, es: {} };

let currentLanguage = (function () {
    try {
        var stored = localStorage.getItem('language');
        if (stored && LANGS.indexOf(stored) !== -1) return stored;
    } catch (e) { /* ignore */ }
    return 'fr';
})();

if (!window.AAA_LANG_PATH_PREFIX) {
    var path = (typeof window !== 'undefined' && window.location && window.location.pathname) || '';
    window.AAA_LANG_PATH_PREFIX = (path.indexOf('/blog/') !== -1) ? '../' : '';
}

/* Chargement à la demande : une langue = un fichier, récupéré une seule fois. */
const loaded = {};
function loadLanguage(lang) {
    if (LANGS.indexOf(lang) === -1) return Promise.resolve(false);
    if (loaded[lang]) return loaded[lang];
    if (TRANSLATIONS[lang] && Object.keys(TRANSLATIONS[lang]).length) {
        loaded[lang] = Promise.resolve(true);
        return loaded[lang];
    }
    if (typeof fetch === 'undefined') return Promise.resolve(false);
    var url = (window.AAA_LANG_PATH_PREFIX || '') + 'translations-' + lang + '.json';
    loaded[lang] = fetch(url)
        .then(function (r) { return r.ok ? r.json() : null; })
        .then(function (data) {
            if (data && typeof data === 'object') { TRANSLATIONS[lang] = data; return true; }
            return false;
        })
        .catch(function () { return false; }); /* hors ligne / file:// — on garde le français de la page */
    return loaded[lang];
}

/* Le français est déjà dans le HTML : rien à charger. Pour les autres langues
 * on prend la langue voulue et le français, qui sert de repli clé par clé. */
function ensureLanguage(lang) {
    if (lang === 'fr') return Promise.resolve();
    return Promise.all([loadLanguage(lang), loadLanguage('fr')]);
}

function getTranslation(key) {
    if (!key) return null;
    var keys = key.split('.');
    var value = TRANSLATIONS[currentLanguage];
    for (var i = 0; i < keys.length; i++) {
        if (value && typeof value === 'object') value = value[keys[i]];
        else { value = undefined; break; }
    }
    if (value !== undefined && value !== null) return value;
    if (currentLanguage !== 'fr') {
        var fr = TRANSLATIONS.fr;
        for (var j = 0; j < keys.length; j++) {
            if (fr && typeof fr === 'object') fr = fr[keys[j]];
            else { fr = undefined; break; }
        }
        if (fr !== undefined && fr !== null) return fr;
    }
    return null;
}

function applyTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(function (element) {
        var key = element.getAttribute('data-i18n');
        var text = getTranslation(key);
        if (text !== null && text !== undefined) element.textContent = text;
    });
    document.querySelectorAll('[data-i18n-html]').forEach(function (element) {
        var key = element.getAttribute('data-i18n-html');
        var text = getTranslation(key);
        if (text !== null && text !== undefined) element.innerHTML = text;
    });
    document.querySelectorAll('[data-i18n-attr]').forEach(function (element) {
        var spec = element.getAttribute('data-i18n-attr') || '';
        spec.split(',').forEach(function (pair) {
            var parts = pair.split(':');
            if (parts.length !== 2) return;
            var attr = parts[0].trim();
            var key = parts[1].trim();
            var value = getTranslation(key);
            if (value) element.setAttribute(attr, value);
        });
    });

    document.documentElement.lang = currentLanguage;
    if (currentLanguage === 'ar') {
        document.documentElement.dir = 'rtl';
        document.documentElement.classList.add('rtl');
    } else {
        document.documentElement.dir = 'ltr';
        document.documentElement.classList.remove('rtl');
    }

    var langDisplay = document.getElementById('currentLang');
    if (langDisplay) {
        var langMap = { fr: 'FR', en: 'EN', ar: 'AR', es: 'ES' };
        langDisplay.textContent = langMap[currentLanguage] || currentLanguage.toUpperCase();
    }
    document.querySelectorAll('[data-lang-switch]').forEach(function (el) {
        var isActive = el.getAttribute('data-lang-switch') === currentLanguage;
        el.classList.toggle('lang-active', isActive);
        if (isActive) el.setAttribute('aria-current', 'true');
        else el.removeAttribute('aria-current');
    });
}

/* Lightweight toast feedback so the user always sees something happen. */
function showLangToast() {
    var msg = getTranslation('lang_switch_toast') || 'Langue modifiée';
    var existing = document.getElementById('aaa-lang-toast');
    if (existing && existing.parentNode) existing.parentNode.removeChild(existing);
    var toast = document.createElement('div');
    toast.id = 'aaa-lang-toast';
    toast.textContent = msg;
    toast.style.cssText = [
        'position:fixed', 'bottom:88px',
        (currentLanguage === 'ar' ? 'right:24px' : 'left:24px'),
        'z-index:9999', 'background:#1e7a9a', 'color:#fff',
        'padding:12px 18px', 'border-radius:12px',
        'box-shadow:0 10px 25px rgba(0,0,0,0.18)',
        'font-family:inherit', 'font-size:14px', 'font-weight:500',
        'opacity:0', 'transform:translateY(8px)',
        'transition:opacity .2s ease, transform .2s ease',
        'pointer-events:none'
    ].join(';');
    document.body.appendChild(toast);
    requestAnimationFrame(function () {
        toast.style.opacity = '1';
        toast.style.transform = 'translateY(0)';
    });
    setTimeout(function () {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(8px)';
        setTimeout(function () {
            if (toast.parentNode) toast.parentNode.removeChild(toast);
        }, 250);
    }, 1700);
}

/* Auto-close any open dropdown menu the user just clicked through. */
function closeOpenDropdowns() {
    document.querySelectorAll('.lang-dropdown-open').forEach(function (el) {
        el.classList.remove('lang-dropdown-open');
    });
}

function switchLanguage(lang) {
    if (LANGS.indexOf(lang) === -1) return false;
    currentLanguage = lang;
    try { localStorage.setItem('language', lang); } catch (e) { /* ignore */ }
    closeOpenDropdowns();
    /* Bascule de sens et indicateur tout de suite, texte dès le fichier reçu :
       l'utilisateur voit une réaction immédiate même sur une connexion lente. */
    applyTranslations();
    showLangToast();
    ensureLanguage(lang).then(applyTranslations);
    return true;
}

window.switchLanguage = switchLanguage;
window.applyTranslations = applyTranslations;
window.AAA_getTranslation = getTranslation;

function decorateLangSwitchers() {
    document.querySelectorAll('a[onclick*="switchLanguage"], button[onclick*="switchLanguage"]').forEach(function (el) {
        if (!el.hasAttribute('data-lang-switch')) {
            var match = (el.getAttribute('onclick') || '').match(/switchLanguage\(['"]([a-z]{2})['"]\)/);
            if (match) el.setAttribute('data-lang-switch', match[1]);
        }
    });
}

document.addEventListener('DOMContentLoaded', function () {
    decorateLangSwitchers();
    applyTranslations();          /* sens du texte, indicateur de langue, états actifs */
    if (currentLanguage !== 'fr') ensureLanguage(currentLanguage).then(applyTranslations);
});

/* ========================================================================== *
 * RESILIENCE LAYER — keep content & icons visible when CDNs fail to load. */
(function () {
    var fallbackCss = document.createElement('style');
    fallbackCss.setAttribute('data-fallback', 'aaa');
    fallbackCss.textContent = [
        '.lang-active { background: rgba(244,198,64,0.18); border-radius: 8px; font-weight: 600; }',
        '[data-lang-switch] { transition: background-color .15s ease; cursor: pointer; min-height: 44px; display: flex; align-items: center; }',
        '[data-aos].aos-animate { opacity: 1 !important; transform: none !important; }',
        '#aaa-lang-toast { font-family: Montserrat, system-ui, sans-serif; }'
    ].join('\n');
    (document.head || document.documentElement).appendChild(fallbackCss);

    function showAosFallback() {
        document.querySelectorAll('[data-aos]').forEach(function (el) {
            el.style.opacity = '1';
            el.style.transform = 'none';
            el.style.transition = 'none';
            el.classList.add('aos-animate');
        });
    }
    function checkAos() {
        if (typeof window.AOS === 'undefined') showAosFallback();
        else { try { window.AOS.refresh(); } catch (e) { /* ignore */ } }
    }
    function isFontAwesomeLoaded() {
        var probe = document.createElement('i');
        probe.className = 'fas fa-check';
        probe.style.cssText = 'position:absolute;left:-9999px;top:-9999px;font-size:16px';
        probe.setAttribute('aria-hidden', 'true');
        document.body.appendChild(probe);
        var beforeStyle = window.getComputedStyle(probe, ':before');
        var fontFamily = (beforeStyle && beforeStyle.getPropertyValue('font-family')) || '';
        var content = (beforeStyle && beforeStyle.getPropertyValue('content')) || '';
        document.body.removeChild(probe);
        return /Font Awesome|FontAwesome/i.test(fontFamily) && content !== 'none' && content !== '' && content !== '""';
    }
    function checkFontAwesome() {
        if (!isFontAwesomeLoaded()) document.documentElement.classList.add('no-fa');
    }
    window.addEventListener('load', function () {
        setTimeout(function () {
            checkAos();
            try { checkFontAwesome(); } catch (e) { /* ignore */ }
        }, 600);
    });
    setTimeout(checkAos, 3000);
})();
