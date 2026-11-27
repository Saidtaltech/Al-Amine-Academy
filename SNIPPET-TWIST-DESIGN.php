/**
 * RevelaWorld — Twist design (CSS additif, désactivable d'un clic)
 *
 * Habillage complémentaire aux couleurs du Salon, écrit mobile d'abord :
 *  - accueil (gabarit du snippet 5)
 *  - pages de contenu (gabarit du snippet 12)
 *  - lecture : œuvre, bibliothèque, œuvre du moment (snippets 10, 43, 7, 37, 17, 18)
 *  - compte et parcours : espace membre, mon compte, panier, commander
 *  - wp-login.php, 404, barre de navigation mobile
 *
 * Aucune logique : uniquement du CSS. Les gabarits maison n'appellent pas wp_head(),
 * le CSS est donc inséré par un tampon de sortie ouvert sur `wp` en priorité -1,
 * extérieur à ceux des snippets 41 (wp, 0) et 43 (template_redirect, -1) :
 * notre <style> arrive en dernier, juste avant </head>.
 * Désactiver ce snippet rend le site exactement tel qu'avant.
 */

function rwt_css_blocks() {
	static $b = null;
	if ( null !== $b ) return $b;
	$b = array();

	$b['home'] = <<<'RWTCSSHOME'
/* === RevelaWorld — twist Accueil (snippet rwt) === */
.rwt-home{
  --rwt-ink:#050505;--rwt-nuit:#0d0820;--rwt-nuit-2:#1a0e30;--rwt-vio:#4d2d87;
  --rwt-mag:#c21e5c;--rwt-mag-soft:#e35c8a;--rwt-mag-deep:#8e1543;
  --rwt-line:rgba(255,255,255,.1);--rwt-line-mag:rgba(227,92,138,.35);
  --rwt-serif:'Playfair Display',Georgia,serif;
  --rwt-display:'Bricolage Grotesque','Plus Jakarta Sans',system-ui,sans-serif;
  --rwt-sans:'Plus Jakarta Sans',system-ui,sans-serif;
  --rwt-fs-h2:clamp(2.25rem,1.4rem + 3.6vw,4.25rem);
  --rwt-fs-h3:clamp(1.3rem,1.1rem + .8vw,1.6rem);
  --rwt-fs-lead:clamp(1.05rem,.98rem + .35vw,1.25rem);
  --rwt-space:clamp(4.5rem,3rem + 6vw,8rem);
  --rwt-radius:22px;--rwt-dur:220ms;--rwt-ease:cubic-bezier(.2,.7,.2,1);
  --rwt-shadow:0 10px 28px -10px rgba(194,30,92,.7);
  --rwt-gap-voix:clamp(24px,4vw,48px);
}

/* --- En-tête --- */
.rwt-home header.hero-wrap::after{content:"";position:absolute;left:0;right:0;bottom:-1px;height:1px;pointer-events:none;background:linear-gradient(90deg,transparent,rgba(194,30,92,.45),transparent)}
.rwt-home .rw-nav-desktop{gap:28px}
.rwt-home .rw-nav-desktop a{position:relative;display:inline-flex;align-items:center;min-height:40px;font-family:var(--rwt-sans);font-weight:500;letter-spacing:.01em;color:rgba(255,255,255,.74)}
.rwt-home .rw-nav-desktop a::after{content:"";position:absolute;left:0;right:0;bottom:8px;height:1px;background:var(--rwt-mag-soft);transform:scaleX(0);transform-origin:left;transition:transform var(--rwt-dur) var(--rwt-ease)}
.rwt-home .rw-nav-desktop a:hover,.rwt-home .rw-nav-desktop a:focus-visible{color:#fff}
.rwt-home .rw-nav-desktop a:hover::after,.rwt-home .rw-nav-desktop a:focus-visible::after{transform:scaleX(1)}
.rwt-home .rw-cta-header{min-height:40px;padding:0 20px;box-shadow:var(--rwt-shadow);transition:background-color var(--rwt-dur) ease,transform var(--rwt-dur) var(--rwt-ease)}
.rwt-home .rw-cta-header:focus-visible{outline:2px solid #fff!important;outline-offset:3px!important}
@media (max-width:899px){
  .rwt-home .rw-burger{margin-left:auto;margin-right:10px}
  .rwt-home #rw-burger-btn{width:44px!important;height:44px!important;min-width:44px!important;min-height:44px!important}
  .rwt-home .rw-cta-header{min-height:44px!important;padding:0 18px!important;font-size:.82rem!important}
}

/* --- Menu burger : pas d'animation de padding, cibles 56px --- */
.rwt-home .rw-burger-link{display:flex;align-items:center;justify-content:center;min-height:56px;transition:opacity .4s ease-out,transform .4s ease-out,color var(--rwt-dur) ease}
.rwt-home .rw-burger-link:hover,.rwt-home .rw-burger-link:active{padding-left:8px;color:var(--rwt-mag-soft)}
.rwt-home .rw-burger-link:focus-visible{outline-offset:-2px!important}
.rwt-home .rw-burger-cta{display:inline-flex;align-items:center;justify-content:center;min-height:52px}

/* --- Eyebrows : pastille signature (point magenta) --- */
.rwt-home section.pt-40 div.inline-flex.rounded-full,
.rwt-home section.relative.py-32 div.inline-flex.rounded-full,
.rwt-home section.border-y p.uppercase{display:inline-flex;align-items:center;gap:8px;padding:6px 14px;border-radius:999px;background:rgba(255,255,255,.05);border:1px solid var(--rwt-line);-webkit-backdrop-filter:none;backdrop-filter:none}
.rwt-home section.pt-40 div.inline-flex.rounded-full span:not(.w-2),
.rwt-home section.relative.py-32 div.inline-flex.rounded-full span,
.rwt-home section.border-y p.uppercase{font:500 .68rem/1.2 var(--rwt-display);letter-spacing:.18em;text-transform:uppercase;color:rgba(255,255,255,.78)}
.rwt-home section.pt-40 span.w-2.h-2{width:6px;height:6px;background:var(--rwt-mag)}
.rwt-home section.relative.py-32 div.inline-flex.rounded-full{background:rgba(194,30,92,.14);border-color:var(--rwt-line-mag)}
.rwt-home section.relative.py-32 div.inline-flex.rounded-full span{color:#f6d3df}
.rwt-home section.relative.py-32 div.inline-flex.rounded-full::before,
.rwt-home section.border-y p.uppercase::before{content:"";width:6px;height:6px;border-radius:50%;background:var(--rwt-mag);flex:0 0 auto}
.rwt-home section.border-y p.uppercase{display:flex;width:max-content;max-width:100%;margin:0 auto 2rem}

/* --- Hero : grain + typographie --- */
.rwt-home section.pt-40::after{content:"";position:absolute;inset:0;z-index:0;pointer-events:none;opacity:.07;background-size:160px 160px;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")}
.rwt-home .rw-hero-title{text-wrap:balance}
.rwt-home section.pt-40 p.text-xl{font-size:var(--rwt-fs-lead)!important;line-height:1.65;max-width:38ch;color:rgba(255,255,255,.76)}
.rwt-home section.pt-40 p.text-sm.italic{font-family:var(--rwt-serif);font-size:1rem;color:rgba(255,255,255,.64)}
.rwt-home section.pt-40 .flex-wrap{gap:14px}

/* --- Système de boutons : primaire magenta / ghost --- */
.rwt-home section.pt-40 a.bg-rw-magenta,
.rwt-home section.relative.py-32 a.bg-rw-magenta{display:inline-flex;align-items:center;justify-content:center;gap:10px;min-height:52px;padding:0 28px!important;border-radius:999px;background:var(--rwt-mag);color:#fff;font-family:var(--rwt-sans);font-size:1rem!important;line-height:1.25;letter-spacing:.01em;text-align:center;text-wrap:balance;box-shadow:var(--rwt-shadow);cursor:pointer;transition:background-color var(--rwt-dur) ease,box-shadow var(--rwt-dur) ease,transform var(--rwt-dur) var(--rwt-ease)}
.rwt-home section.relative.py-32 a.bg-rw-magenta{min-height:56px;padding:0 34px!important}
.rwt-home section.pt-40 a.bg-rw-magenta:hover,
.rwt-home section.relative.py-32 a.bg-rw-magenta:hover{background:var(--rwt-mag-deep);transform:translateY(-1px);box-shadow:0 14px 34px -12px rgba(194,30,92,.8)}
.rwt-home section.pt-40 a.bg-rw-magenta:active,
.rwt-home section.relative.py-32 a.bg-rw-magenta:active{transform:none}
.rwt-home section.pt-40 .flex-wrap>a:not(.bg-rw-magenta){min-height:52px;padding:0 24px!important;border-radius:999px;border:1px solid var(--rwt-line-mag);background:rgba(255,255,255,.02);color:#fff;cursor:pointer;transition:border-color var(--rwt-dur) ease,background-color var(--rwt-dur) ease}
.rwt-home section.pt-40 .flex-wrap>a:not(.bg-rw-magenta):hover{border-color:var(--rwt-mag-soft);background:rgba(227,92,138,.08)}
.rwt-home section.pt-40 .flex-wrap>a:not(.bg-rw-magenta) svg{transition:transform var(--rwt-dur) var(--rwt-ease)}
.rwt-home section.pt-40 .flex-wrap>a:not(.bg-rw-magenta):hover svg{transform:translateX(4px)}
.rwt-home section a.rounded-full:focus-visible{outline:2px solid #fff!important;outline-offset:3px!important}

/* --- Rythme des sections + titres éditoriaux --- */
.rwt-home section.py-32{padding-top:var(--rwt-space)!important;padding-bottom:var(--rwt-space)!important}
.rwt-home section.py-32 h2{font-family:var(--rwt-serif);font-style:italic;font-weight:400;font-size:var(--rwt-fs-h2)!important;line-height:1.06;letter-spacing:-.015em;text-wrap:balance}
.rwt-home section.py-32 h2 span{font-weight:700}
.rwt-home section.py-32:not(.relative) .text-center.mb-20{margin-bottom:clamp(3rem,6vw,5rem)}
.rwt-home section.py-32:not(.relative) .text-center.mb-20::after{content:"";display:block;width:56px;height:1px;margin:28px auto 0;background:linear-gradient(90deg,transparent,var(--rwt-mag-soft),transparent)}

/* --- Voix au Salon --- */
.rwt-home section.border-y .flex-wrap{opacity:1;gap:14px var(--rwt-gap-voix)!important}
.rwt-home section.border-y .font-display{position:relative;font-family:var(--rwt-serif);font-style:italic;font-weight:400;font-size:clamp(1.25rem,1rem + 1vw,1.6rem)!important;color:rgba(255,255,255,.62)}
.rwt-home section.border-y .font-display+.font-display::before{content:"";position:absolute;top:50%;left:calc(var(--rwt-gap-voix) / -2 - 2px);width:4px;height:4px;margin-top:-2px;border-radius:50%;background:var(--rwt-mag);opacity:.85}

/* --- Piliers : cartes « invitation » (non cliquables : pas de lift) --- */
.rwt-home section.py-32:not(.relative) .grid>div{position:relative;overflow:hidden;padding:clamp(24px,2.5vw,36px);border-radius:var(--rwt-radius);border:1px solid var(--rwt-line);background:radial-gradient(120% 80% at 100% 0%,rgba(194,30,92,.12),transparent 55%),linear-gradient(155deg,rgba(26,14,48,.92),rgba(13,8,32,.92));box-shadow:inset 0 1px 0 rgba(255,255,255,.04);transition:border-color var(--rwt-dur) ease,box-shadow var(--rwt-dur) ease}
.rwt-home section.py-32:not(.relative) .grid>div::before{content:"";position:absolute;top:0;left:24px;right:24px;height:1px;background:linear-gradient(90deg,transparent,rgba(227,92,138,.7),transparent);opacity:.6}
.rwt-home section.py-32:not(.relative) .grid>div:hover{border-color:rgba(227,92,138,.4);box-shadow:0 24px 60px -32px rgba(194,30,92,.6)}
.rwt-home section.py-32:not(.relative) .grid>div>div.w-12{width:44px;height:44px;margin-bottom:22px;border-radius:50%;background:rgba(5,5,5,.5);border:1px solid var(--rwt-line-mag);font:italic 700 1.05rem/1 var(--rwt-serif);color:var(--rwt-mag-soft)}
.rwt-home section.py-32:not(.relative) .grid>div h3{font:italic 700 var(--rwt-fs-h3)/1.2 var(--rwt-serif);margin-bottom:10px}
.rwt-home section.py-32:not(.relative) .grid>div p{color:rgba(255,255,255,.7);line-height:1.7}

/* --- Les Pionnières --- */
.rwt-home section.relative.py-32 p.text-xl{font-size:var(--rwt-fs-lead)!important;color:rgba(255,255,255,.76)}
.rwt-home section.relative.py-32 .h-2.rounded-full{height:8px;background:rgba(255,255,255,.08);box-shadow:inset 0 0 0 1px rgba(255,255,255,.06)}
.rwt-home section.relative.py-32 .h-full.rounded-full{background:linear-gradient(90deg,var(--rwt-vio),var(--rwt-mag) 70%,var(--rwt-mag-soft))}
.rwt-home section.relative.py-32 p.text-sm.italic{font-family:var(--rwt-serif);font-size:.95rem;color:rgba(255,255,255,.72)}
.rwt-home section.relative.py-32 .grid>div{padding:14px 16px;border-radius:14px;background:rgba(255,255,255,.03);border:1px solid var(--rwt-line)}
.rwt-home section.relative.py-32 .grid>div p{font-size:.9rem;line-height:1.5;color:rgba(255,255,255,.8)}
.rwt-home section.relative.py-32 .grid>div span{color:var(--rwt-mag-soft)}

/* --- Emplacement pub vide : supprime le trou de 128px --- */
.rwt-home .rw-landing-ad-placeholder:has(>.rw-ad-loading:empty){display:none}

/* --- Footer --- */
.rwt-home footer.hero-wrap{position:relative;background:radial-gradient(80% 60% at 50% 0%,rgba(77,45,135,.18),transparent 70%)}
.rwt-home footer.hero-wrap h4{font-family:var(--rwt-display);font-size:.7rem;font-weight:600;letter-spacing:.18em}
.rwt-home footer.hero-wrap p.italic{font-family:var(--rwt-serif);font-size:1rem;line-height:1.5;color:rgba(255,255,255,.64)}
.rwt-home footer.hero-wrap ul a{display:inline-flex;align-items:center;min-height:32px;color:rgba(255,255,255,.66);text-decoration:underline;text-decoration-color:transparent;text-underline-offset:4px;transition:color var(--rwt-dur) ease,text-decoration-color var(--rwt-dur) ease}
.rwt-home footer.hero-wrap ul a:hover,.rwt-home footer.hero-wrap ul a:focus-visible{color:#fff;text-decoration-color:rgba(227,92,138,.7)}
.rwt-home footer.hero-wrap div.border-t{color:rgba(255,255,255,.6)}
.rwt-home #rw-main:focus,.rwt-home #rw-main:focus-visible{outline:none!important}

/* --- Scroll-reveal (progressif, CSS seul, transform/opacity) --- */
@keyframes rwtRise{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:none}}
@media (prefers-reduced-motion:no-preference){
  @supports (animation-timeline:view()){
    .rwt-home section.py-32:not(.relative) .grid>div,
    .rwt-home section.relative.py-32 .max-w-4xl>*{animation:rwtRise linear both;animation-timeline:view();animation-range:entry 0% cover 28%}
    .rwt-home section.py-32:not(.relative) .grid>div:nth-child(2){animation-range:entry 8% cover 32%}
    .rwt-home section.py-32:not(.relative) .grid>div:nth-child(3){animation-range:entry 16% cover 36%}
  }
}

/* --- Mouvement réduit --- */
@media (prefers-reduced-motion:reduce){
  .rwt-home .animate-pulse{animation:none!important}
  .rwt-home *,.rwt-home *::before,.rwt-home *::after{transition-duration:.01ms!important;transition-delay:0s!important}
  .rwt-home section a.bg-rw-magenta:hover,.rwt-home .rw-cta-header:hover{transform:none!important}
}

/* --- Mobile --- */
@media (max-width:600px){
  .rwt-home section.pt-40 .flex-wrap{flex-direction:column;align-items:stretch;max-width:22rem;margin-left:auto;margin-right:auto}
  .rwt-home section.pt-40 a.bg-rw-magenta,
  .rwt-home section.pt-40 .flex-wrap>a:not(.bg-rw-magenta),
  .rwt-home section.relative.py-32 a.bg-rw-magenta{width:100%;max-width:22rem;min-height:50px!important;padding:12px 22px!important;font-size:.95rem!important;justify-content:center}
  .rwt-home section.border-y .font-display+.font-display::before{display:none}
  .rwt-home section.border-y .flex-wrap{gap:10px 20px!important}
  .rwt-home section.py-32:not(.relative) .grid>div{padding:24px;border-radius:18px}
  .rwt-home footer.hero-wrap ul a{min-height:44px}
  .rwt-home footer.hero-wrap ul.space-y-2>li+li{margin-top:0}
}
RWTCSSHOME;

	$b['pages'] = <<<'RWTCSSPAGES'
/* RevelaWorld — Twist pages (snippet 12). Additif. Scope : [data-pid] (body du wrapper) + #rw-main-page (main du wrapper). */
[data-pid]{--rwt-nuit:#0d0820;--rwt-nuit-2:#1a0e30;--rwt-vio:#4d2d87;--rwt-mag:#c21e5c;--rwt-mag-soft:#e35c8a;--rwt-text:rgba(255,255,255,.8);--rwt-line:rgba(255,255,255,.1);--rwt-field:rgba(255,255,255,.38);--rwt-serif:'Playfair Display',Georgia,serif;--rwt-display:'Bricolage Grotesque',system-ui,sans-serif;--rwt-sans:'Plus Jakarta Sans',system-ui,sans-serif;--rwt-measure:38rem;--rwt-wide:min(1040px,calc(100vw - 64px));--rwt-dur:.2s;--rwt-ease:cubic-bezier(.2,.7,.2,1);--rwt-check:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23000' stroke-width='2.4' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M20 6 9 17l-5-5'/%3E%3C/svg%3E")}
[data-pid] .rw-h{border-bottom-color:transparent}
[data-pid] .rw-h::after{content:"";position:absolute;left:0;right:0;bottom:-1px;height:1px;background:linear-gradient(90deg,transparent,rgba(227,92,138,.35) 30%,rgba(77,45,135,.5) 70%,transparent);pointer-events:none}
[data-pid] .rw-nav a{position:relative;padding:12px 0;color:rgba(255,255,255,.74)}
[data-pid] .rw-nav a:hover{color:#fff}
[data-pid] .rw-nav a::after{content:"";position:absolute;left:0;right:0;bottom:6px;height:1px;background:var(--rwt-mag-soft);transform:scaleX(0);transform-origin:left;transition:transform var(--rwt-dur) var(--rwt-ease)}
[data-pid] .rw-nav a:hover::after,[data-pid] .rw-nav a:focus-visible::after,[data-pid="36"] .rw-nav a[href="/notre-salon/"]::after,[data-pid="38"] .rw-nav a[href="/faq/"]::after,[data-pid="39"] .rw-nav a[href="/mur-des-premieres/"]::after,[data-pid="344"] .rw-nav a[href="/rendez-vous/"]::after{transform:scaleX(1)}
[data-pid="36"] :is(.rw-nav,.rw-bo nav,.rw-f-col) a[href="/notre-salon/"],[data-pid="37"] .rw-f-col a[href="/adhesion/"],[data-pid="38"] :is(.rw-nav,.rw-bo nav,.rw-f-col) a[href="/faq/"],[data-pid="39"] :is(.rw-nav,.rw-bo nav,.rw-f-col) a[href="/mur-des-premieres/"],[data-pid="40"] .rw-f-col a[href="/manifeste/"],[data-pid="41"] .rw-f-col a[href="/soumettre-une-oeuvre/"],[data-pid="42"] .rw-f-col a[href="/contact/"],[data-pid="43"] .rw-f-col a[href="/conditions/"],[data-pid="3"] .rw-f-col a[href="/confidentialite/"],[data-pid="47"] :is(.rw-bo nav,.rw-f-col,.rw-bottom-nav) a[href="/le-cercle/"],[data-pid="344"] :is(.rw-nav,.rw-bo nav,.rw-f-col) a[href="/rendez-vous/"]{color:var(--rwt-mag-soft)}
[data-pid] .rw-burger{width:44px;height:44px}
[data-pid] .rw-hero::after{content:"";position:absolute;left:50%;bottom:0;width:min(560px,72%);height:1px;transform:translateX(-50%);background:linear-gradient(90deg,transparent,rgba(227,92,138,.45),transparent);pointer-events:none}
[data-pid] .rw-eyebrow{font-family:var(--rwt-display);font-weight:500;font-size:.68rem;line-height:1.2;letter-spacing:.18em;color:rgba(255,255,255,.78)}
[data-pid] .rw-hero h1{text-wrap:balance}
[data-pid] .rw-hero-sub{color:rgba(255,255,255,.76);text-wrap:pretty}
[data-pid="38"] .rw-hero h1{font-family:var(--rwt-serif)!important;font-style:italic!important;font-weight:700!important;letter-spacing:-.015em!important}
#rw-main-page>:is(p,h2,h3,h4,ul,ol,blockquote,.wp-block-quote,.wp-block-table,details,form,.compteur-premieres-jauge){max-width:var(--rwt-measure);margin-left:auto;margin-right:auto}
#rw-main-page>p{color:var(--rwt-text);line-height:1.75;text-wrap:pretty}
#rw-main-page>p:first-child{font-family:var(--rwt-serif);font-style:italic;font-size:clamp(1.15rem,2.2vw,1.32rem);line-height:1.6;color:rgba(255,255,255,.88);margin-bottom:28px}
#rw-main-page>p:first-child em{display:inline;padding-right:0;color:inherit}
#rw-main-page>h2{font-family:var(--rwt-serif);font-style:italic;font-weight:700;font-size:clamp(1.7rem,4vw,2.3rem);line-height:1.15;letter-spacing:-.01em;margin-top:3rem;margin-bottom:1.1rem;text-wrap:balance}
#rw-main-page>h2::before{content:"";display:block;width:28px;height:2px;margin-bottom:14px;border-radius:2px;background:linear-gradient(90deg,var(--rwt-mag),var(--rwt-vio))}
#rw-main-page>hr+h2{margin-top:0}
#rw-main-page>hr+h2::before{display:none}
#rw-main-page>h3{font-family:var(--rwt-display);font-weight:700;font-size:clamp(1.12rem,2vw,1.3rem);line-height:1.3;letter-spacing:-.01em;margin-top:2rem;margin-bottom:.6rem}
[data-pid="38"] #rw-main-page>h3{position:relative;padding-left:20px}
[data-pid="38"] #rw-main-page>h3::before{content:"";position:absolute;left:0;top:.5em;width:7px;height:7px;border-radius:50%;background:var(--rwt-mag)}
#rw-main-page>:is(ul,ol){padding-left:1.25em;color:var(--rwt-text)}
#rw-main-page>:is(ul,ol)>li{padding-left:.25em}
#rw-main-page>ol>li::marker{font-family:var(--rwt-display);font-weight:600;color:var(--rwt-mag-soft)}
#rw-main-page :target{scroll-margin-top:96px}
#rw-main-page>:is(p,ul,ol,blockquote) a:not([class]):not([style]),#rw-main-page .wp-block-column :is(p,li) a:not([class]):not([style]){color:var(--rwt-mag-soft);border-bottom:0;padding-bottom:0;text-decoration:underline;text-decoration-thickness:1px;text-decoration-color:rgba(227,92,138,.55);text-underline-offset:4px;transition:color var(--rwt-dur),text-decoration-color var(--rwt-dur)}
#rw-main-page>:is(p,ul,ol,blockquote) a:not([class]):not([style]):hover,#rw-main-page .wp-block-column :is(p,li) a:not([class]):not([style]):hover{color:#fff;text-decoration-color:#fff}
#rw-main-page>hr{position:relative;overflow:visible;height:1px;max-width:160px;border:0;background:linear-gradient(90deg,transparent,rgba(227,92,138,.5),transparent);margin:56px auto}
#rw-main-page>hr::after{content:"";position:absolute;left:50%;top:50%;width:6px;height:6px;margin:-3px 0 0 -3px;border-radius:50%;background:var(--rwt-mag);box-shadow:0 0 0 5px #050505}
#rw-main-page>blockquote{margin-top:40px;margin-bottom:40px;padding:22px 24px 22px 28px;border-left:2px solid var(--rwt-mag);border-radius:0 16px 16px 0;background:linear-gradient(90deg,rgba(194,30,92,.1),rgba(77,45,135,.06) 60%,transparent)}
#rw-main-page>blockquote p{margin:0;font-family:var(--rwt-serif);font-style:italic;font-size:clamp(1.2rem,2.4vw,1.4rem);line-height:1.5;color:rgba(255,255,255,.92)}
#rw-main-page>blockquote cite{margin-top:14px;font:500 .72rem/1.4 var(--rwt-display);letter-spacing:.16em;text-transform:uppercase;color:var(--rwt-mag-soft)}
#rw-main-page .wp-block-table{overflow-x:auto;margin-top:28px;margin-bottom:28px;border:1px solid var(--rwt-line);border-radius:14px}
#rw-main-page .wp-block-table th{background:rgba(26,14,48,.7);font-family:var(--rwt-display);letter-spacing:.12em}
#rw-main-page>details{margin-top:12px;margin-bottom:12px;padding:0 18px;border:1px solid var(--rwt-line);border-radius:14px;background:rgba(255,255,255,.025);transition:border-color var(--rwt-dur)}
#rw-main-page>details[open]{border-color:rgba(227,92,138,.35)}
#rw-main-page>details>summary{display:flex;align-items:center;justify-content:space-between;gap:16px;min-height:48px;margin:0 -18px;padding:14px 18px;list-style:none;cursor:pointer;font-family:var(--rwt-display);font-weight:600;color:#fff}
#rw-main-page>details>summary::-webkit-details-marker{display:none}
#rw-main-page>details>summary::after{content:"";flex:none;width:8px;height:8px;margin-top:-4px;border:solid var(--rwt-mag-soft);border-width:0 2px 2px 0;transform:rotate(45deg);transition:transform var(--rwt-dur) var(--rwt-ease)}
#rw-main-page>details[open]>summary::after{transform:rotate(-135deg);margin-top:4px}
#rw-main-page>details[open]{padding-bottom:4px}
#rw-main-page .wp-block-button__link{display:inline-flex;align-items:center;justify-content:center;gap:10px;min-height:48px;padding:12px 26px;line-height:1.25;text-align:center;transition:background-color var(--rwt-dur),border-color var(--rwt-dur),box-shadow var(--rwt-dur),transform var(--rwt-dur)}
#rw-main-page .is-style-outline .wp-block-button__link{background:rgba(255,255,255,.02)!important;border:1px solid rgba(227,92,138,.45)!important}
#rw-main-page .is-style-outline .wp-block-button__link:hover{background:rgba(227,92,138,.1)!important;border-color:var(--rwt-mag-soft)!important}
[data-pid] :is(.rw-cta,.rw-cta-ghost,.rw-bo-cta,.rw-cf-submit,.rw-sf-submit,.rw-mur-empty-cta,#rw-main-page .wp-block-button__link):focus-visible{outline:2px solid #fff!important;outline-offset:3px!important}
#rw-main-page .wp-block-column{border-radius:18px;border-color:var(--rwt-line);background:linear-gradient(150deg,rgba(26,14,48,.55),rgba(13,8,32,.55));transition:border-color var(--rwt-dur),box-shadow var(--rwt-dur)}
#rw-main-page .wp-block-column:hover{border-color:rgba(227,92,138,.35);box-shadow:0 18px 50px -30px rgba(194,30,92,.6)}
#rw-main-page .wp-block-group:hover{transform:none}
@media (min-width:900px){
#rw-main-page>.wp-block-columns{width:var(--rwt-wide);max-width:none;margin-left:calc(50% - var(--rwt-wide)/2);margin-right:0;flex-wrap:nowrap;gap:20px}
#rw-main-page>.wp-block-columns>.wp-block-column{min-width:0}
[data-pid="37"] #rw-main-page>.wp-block-columns{--rwt-wide:min(1100px,calc(100vw - 64px))}
}
[data-pid="37"] #rw-main-page .wp-block-columns{align-items:stretch}
[data-pid="37"] #rw-main-page .wp-block-column{display:flex;flex-direction:column;padding:30px 26px}
[data-pid="37"] #rw-main-page .wp-block-column>h3{margin:0 0 14px;font-family:var(--rwt-serif);font-style:italic;font-weight:700;font-size:1.75rem;letter-spacing:-.01em}
[data-pid="37"] #rw-main-page .wp-block-column>h3+p{margin-bottom:18px;padding-bottom:18px;font-family:var(--rwt-display);font-size:1.04rem;line-height:1.55;color:#fff}
[data-pid="37"] #rw-main-page .wp-block-column>ul{margin:4px 0 22px;padding-left:0;list-style:none}
[data-pid="37"] #rw-main-page .wp-block-column>ul>li{position:relative;margin-bottom:.6em;padding-left:28px;font-size:.97rem;line-height:1.55}
[data-pid="37"] #rw-main-page .wp-block-column>ul>li::before{content:"";position:absolute;left:0;top:.2em;width:18px;height:18px;background:var(--rwt-mag-soft);-webkit-mask:var(--rwt-check) center/contain no-repeat;mask:var(--rwt-check) center/contain no-repeat}
[data-pid="37"] #rw-main-page .wp-block-column>.wp-block-buttons{margin:0 0 14px}
[data-pid="37"] #rw-main-page .wp-block-column>.wp-block-buttons:last-child{margin-top:auto;margin-bottom:0;padding-top:8px}
[data-pid="37"] #rw-main-page .wp-block-column :is(.wp-block-button,.wp-block-button__link){width:100%}
[data-pid="37"] #rw-main-page .wp-block-column>.wp-block-buttons+p{margin:0 0 14px;padding:12px 14px;border:1px solid rgba(227,92,138,.28);border-radius:12px;background:rgba(194,30,92,.1);font-size:.92rem;line-height:1.5}
[data-pid="37"] #rw-main-page .wp-block-column:first-child{position:relative;border-color:rgba(227,92,138,.45);background:radial-gradient(120% 90% at 100% 0%,rgba(194,30,92,.22),transparent 55%),radial-gradient(90% 80% at 0% 100%,rgba(77,45,135,.4),transparent 60%),linear-gradient(160deg,var(--rwt-nuit-2),var(--rwt-nuit) 70%);box-shadow:0 30px 80px -40px rgba(194,30,92,.55)}
[data-pid="37"] #rw-main-page .wp-block-column:first-child::before{content:"";position:absolute;top:-1px;left:24px;right:24px;height:2px;border-radius:2px;background:linear-gradient(90deg,var(--rwt-mag),var(--rwt-mag-soft),var(--rwt-vio))}
#rw-main-page>form label{font-family:var(--rwt-display);font-size:.78rem;font-weight:600;letter-spacing:.08em;text-transform:uppercase;color:rgba(255,255,255,.8)}
#rw-main-page>form :is(input,textarea,select){font-family:var(--rwt-sans);font-weight:400;letter-spacing:normal;text-transform:none}
#rw-main-page>form :is(input:not([type=file],[type=checkbox],[type=radio]),textarea,select){border:1px solid var(--rwt-field);background:rgba(255,255,255,.035);transition:border-color var(--rwt-dur),box-shadow var(--rwt-dur),background-color var(--rwt-dur)}
#rw-main-page>form input:not([type=file],[type=checkbox],[type=radio]){min-height:48px}
#rw-main-page>form :is(input,textarea,select):hover{border-color:rgba(255,255,255,.55)}
#rw-main-page>form :is(input,textarea,select):focus{border-color:var(--rwt-mag-soft);box-shadow:0 0 0 3px rgba(227,92,138,.28);background:rgba(255,255,255,.06)}
#rw-main-page>form :is(input,textarea)::placeholder{color:rgba(255,255,255,.55);opacity:1}
#rw-main-page>form input[type=file]{border-color:var(--rwt-field);min-height:56px}
#rw-main-page>form input[type=file]::file-selector-button{min-height:40px}
#rw-main-page>form .rw-sf-cover-hint{font-family:var(--rwt-sans);font-size:.8rem;font-weight:400;letter-spacing:0;text-transform:none;color:rgba(255,255,255,.66)}
#rw-main-page>form :is(.rw-cf-hint,.rw-sf-hint){color:rgba(255,255,255,.62)}
#rw-main-page>form :is(.rw-cf-submit,.rw-sf-submit){transition:background-color var(--rwt-dur),box-shadow var(--rwt-dur),transform var(--rwt-dur)}
#rw-main-page .compteur-premieres-jauge{position:relative;display:block;margin-top:28px;margin-bottom:8px}
#rw-main-page .compteur-premieres-jauge::before{content:"";display:block;height:8px;border-radius:999px;background:rgba(255,255,255,.1);box-shadow:inset 0 0 0 1px rgba(255,255,255,.06)}
#rw-main-page .compteur-premieres-jauge>span{position:absolute;top:0;left:0;height:8px;max-width:100%;border-radius:999px;background:linear-gradient(90deg,var(--rwt-vio),var(--rwt-mag),var(--rwt-mag-soft));box-shadow:0 0 18px rgba(194,30,92,.45);transition:width .6s var(--rwt-ease)}
#rw-main-page .compteur-premieres-jauge>em{display:block;margin-top:14px;font-size:1.02rem;color:var(--rwt-mag-soft)}
[data-pid] .rw-f-col h4{font-family:var(--rwt-display);font-style:normal;font-weight:600;font-size:.72rem;letter-spacing:.18em}
[data-pid] .rw-f-col a:hover{color:#fff}
[data-pid] .rw-f-base{color:rgba(255,255,255,.62)}
@media (max-width:899px){
[data-pid] :is(.rw-cta,.rw-cta-ghost){display:inline-block;box-sizing:border-box;height:44px;line-height:42px;padding-top:0!important;padding-bottom:0!important}
[data-pid] .rw-cta{line-height:44px}
}
@media (max-width:768px){
[data-pid] .rw-f-col li{margin-bottom:0}
[data-pid] .rw-f-col a{display:inline-flex;align-items:center;min-height:44px}
}
@media (max-width:600px){
#rw-main-page>p{-webkit-hyphens:auto;hyphens:auto}
#rw-main-page>h2{margin-top:2.4rem}
#rw-main-page>hr{margin:44px auto}
#rw-main-page>blockquote{padding:18px 18px 18px 20px}
[data-pid="37"] #rw-main-page .wp-block-column{padding:24px 20px}
#rw-main-page>form :is(.rw-cf-submit,.rw-sf-submit){width:100%}
[data-pid] .rw-hero-blob1{width:560px;height:560px;filter:blur(90px)}
[data-pid] :is(.rw-hero-blob2,.rw-hero-blob3){filter:blur(80px)}
}
@media (prefers-reduced-motion:reduce){
[data-pid] :is(.rw-bo,.rw-bo a,.rw-bo-close,.rw-burger span,.rw-cta,.rw-cta-ghost,.rw-cf-submit,.rw-sf-submit,.rw-mur-empty-cta,.rw-mur-cell,.compteur-premieres-jauge>span,#rw-main-page .wp-block-button__link,#rw-main-page .wp-block-column,#rw-main-page>details),[data-pid] .rw-nav a::after,#rw-main-page>details>summary::after{transition:none!important}
[data-pid] .rw-bo a{transform:none!important}
[data-pid] :is(.rw-cta,.rw-bo-close,.rw-cf-submit,.rw-sf-submit,.rw-mur-empty-cta,.rw-mur-cell,#rw-main-page .wp-block-button__link):hover{transform:none!important}
}
RWTCSSPAGES;

	$b['lecture'] = <<<'RWTCSSLECTURE'
/* RevelaWorld — twist lecture · additif · ne touche ni user-select, ni print, ni le filigrane */
body.rw-is-oeuvre,.rw-biblio-wrap,.rw-oeuvre-card,.rw-reading-list,.rw-next,.rw-next-empty{--rwt-mag:#c21e5c;--rwt-mag-soft:#e35c8a;--rwt-mag-deep:#8e1543;--rwt-vio:#4d2d87;--rwt-ink:rgba(255,255,255,.86);--rwt-ink-strong:#fff;--rwt-mute:rgba(255,255,255,.66);--rwt-line:rgba(255,255,255,.1);--rwt-cap:#e35c8a;--rwt-orn:rgba(227,92,138,.55);--rwt-focus:#e35c8a;--rwt-panel:radial-gradient(120% 50% at 100% 0%,rgba(194,30,92,.16),transparent 60%),linear-gradient(180deg,#1a0e30,#0d0820 42%);--rwt-serif:'Playfair Display',Georgia,serif;--rwt-display:'Bricolage Grotesque','Plus Jakarta Sans',system-ui,sans-serif;--rwt-dur:220ms;--rwt-ease:cubic-bezier(.2,.7,.2,1);--rwt-lock:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23000' stroke-width='2.2' stroke-linecap='round' stroke-linejoin='round'%3E%3Crect x='4' y='11' width='16' height='10' rx='2'/%3E%3Cpath d='M8 11V7a4 4 0 0 1 8 0v4'/%3E%3C/svg%3E")}
body.rw-is-oeuvre.rw-light{--rwt-ink:#2a211c;--rwt-ink-strong:#1f1712;--rwt-mute:rgba(42,33,28,.72);--rwt-line:rgba(60,40,30,.14);--rwt-cap:#a3174d;--rwt-orn:rgba(163,23,77,.45);--rwt-focus:#a3174d;--rwt-panel:#fffcf6}
body.rw-is-oeuvre .rw-protected-content>p{font-size:clamp(1.0625rem,.98rem + .35vw,1.1875rem);line-height:1.75;margin:0 0 1.25em;text-wrap:pretty;-webkit-hyphens:auto;hyphens:auto}
body.rw-is-oeuvre .rw-protected-content em,body.rw-is-oeuvre .rw-pc-text em{display:inline;padding-right:0}
body.rw-is-oeuvre .rw-body p:first-of-type::first-letter{float:none;font:inherit;padding:0;margin:0;color:inherit}
body.rw-is-oeuvre .rw-protected-content>p[data-rw-p]:first-of-type::first-letter,body.rw-is-oeuvre .rw-protected-content>h2+p[data-rw-p]::first-letter{float:left;font-family:var(--rwt-serif);font-style:italic;font-weight:700;font-size:3.9em;line-height:.82;padding:.06em .12em 0 0;margin-top:.02em;color:var(--rwt-cap)}
body.rw-is-oeuvre .rw-protected-content>h2+p[data-rw-p]::first-line{color:var(--rwt-ink-strong);letter-spacing:.01em}
body.rw-is-oeuvre .rw-protected-content>h2{font-size:clamp(1.6rem,1.2rem + 1.6vw,2.15rem);line-height:1.2;letter-spacing:-.01em;max-width:24ch;margin:4.5rem auto 2.25rem;text-wrap:balance}
body.rw-is-oeuvre .rw-protected-content>h2:first-child{margin-top:.75rem}
body.rw-is-oeuvre .rw-protected-content>h2::before{content:"";display:block;width:120px;height:9px;margin:0 auto 1.4rem;background:radial-gradient(circle,var(--rwt-cap) 0 2.5px,transparent 3px) center/9px 9px no-repeat,linear-gradient(90deg,transparent,var(--rwt-orn),transparent) center/100% 1px no-repeat}
body.rw-is-oeuvre .rw-protected-content>h3{font:italic 700 clamp(1.25rem,1.1rem + .6vw,1.5rem)/1.3 var(--rwt-serif);text-align:center;color:var(--rwt-ink-strong);margin:3rem auto 1.5rem;text-wrap:balance}
body.rw-is-oeuvre .rw-protected-content hr{border:0;width:84px;height:9px;max-width:none;margin:3em auto;background:radial-gradient(circle,var(--rwt-cap) 0 2px,transparent 2.6px) 0 50%/28px 9px repeat-x;opacity:.85}
body.rw-is-oeuvre .rw-protected-content blockquote{margin:2.2em 0;padding:.25em 0 .25em 1.4em;border-left:2px solid var(--rwt-orn);font:italic 400 1.15em/1.6 var(--rwt-serif);color:var(--rwt-ink)}
body.rw-is-oeuvre .rw-protected-content blockquote p{font:inherit;color:inherit;margin:0 0 .6em}
body.rw-is-oeuvre .rw-cover::before,.rw-biblio-grid .rw-biblio-cover::before{content:"";position:absolute;inset:0 auto 0 0;width:9%;z-index:2;pointer-events:none;background:linear-gradient(90deg,rgba(0,0,0,.38),rgba(255,255,255,.12) 62%,transparent)}
@supports (animation-timeline:scroll()){
body.rw-is-oeuvre .rw-h::after{content:"";position:absolute;left:0;right:0;bottom:-1px;height:2px;background:linear-gradient(90deg,var(--rwt-vio),var(--rwt-mag) 60%,var(--rwt-mag-soft));transform-origin:0 50%;transform:scaleX(0);animation:rwtRead auto linear both;animation-timeline:scroll(root block)}
@keyframes rwtRead{to{transform:scaleX(1)}}
}
body.rw-is-oeuvre :is(a,button,[tabindex]):focus-visible{outline:2px solid var(--rwt-focus);outline-offset:3px}
body.rw-is-oeuvre .rw-pc-form textarea:focus-visible{outline:2px solid var(--rwt-focus);outline-offset:1px}
body.rw-is-oeuvre .rw-tool{height:44px}
body.rw-is-oeuvre .rw-close{width:44px;height:44px;flex-basis:44px;transition:background-color var(--rwt-dur) var(--rwt-ease)}
body.rw-is-oeuvre .rw-toc,body.rw-is-oeuvre .rw-pc{background:var(--rwt-panel)}
body.rw-is-oeuvre .rw-toc-title{font-size:1.4rem}
body.rw-is-oeuvre .rw-toc-sub{margin-top:6px;font:600 .66rem/1.2 var(--rwt-display);letter-spacing:.18em;text-transform:uppercase}
body.rw-is-oeuvre .rw-toc-sub,body.rw-is-oeuvre .rw-pc-date,body.rw-is-oeuvre .rw-pc-hint,body.rw-is-oeuvre .rw-pc-empty,body.rw-is-oeuvre .rw-toc-item.is-locked>span{color:var(--rwt-mute)}
body.rw-is-oeuvre .rw-toc-item a,body.rw-is-oeuvre .rw-toc-item>span{min-height:44px;transition:background-color var(--rwt-dur) var(--rwt-ease),color var(--rwt-dur) var(--rwt-ease)}
body.rw-is-oeuvre .rw-toc-item:not(.is-sub)>a,body.rw-is-oeuvre .rw-toc-item:not(.is-sub)>span{font-family:var(--rwt-serif);font-style:italic;font-size:1.02rem}
body.rw-is-oeuvre .rw-toc-item.is-current a::after{content:"";flex:0 0 6px;width:6px;height:6px;margin-left:auto;border-radius:50%;background:var(--rwt-mag)}
body.rw-is-oeuvre .rw-toc-lock,body.rw-is-oeuvre .rw-copyright-badge::before{content:"";display:inline-block;font-size:0;width:13px;height:13px;flex:0 0 13px;background:currentColor;-webkit-mask:var(--rwt-lock) center/contain no-repeat;mask:var(--rwt-lock) center/contain no-repeat}
body.rw-is-oeuvre .rw-pc-quote{padding:14px 20px 14px 18px;font-size:.98rem;line-height:1.65}
body.rw-is-oeuvre .rw-pc-list>.rw-pc-item+.rw-pc-item{padding-top:18px;border-top:1px solid var(--rwt-line)}
body.rw-is-oeuvre .rw-pc-text{font-size:.95rem;line-height:1.6}
body.rw-is-oeuvre .rw-pc-send{min-height:40px;transition:background-color var(--rwt-dur) var(--rwt-ease)}
body.rw-is-oeuvre .rw-pc-send:hover:not(:disabled){background:var(--rwt-mag-deep)}
body.rw-is-oeuvre .rw-pc-btn{min-height:30px}
@media (pointer:coarse),(max-width:900px){
body.rw-is-oeuvre .rw-pc-btn{min-height:32px;padding:6px 12px}
body.rw-is-oeuvre .rw-pc-btn::after{content:"";position:absolute;inset:-6px -4px}
}
@media (max-width:900px){body.rw-is-oeuvre .rw-pc-btn{position:relative}}
@media (pointer:coarse){
body.rw-is-oeuvre .rw-pc-reply-btn,body.rw-is-oeuvre .rw-pc-goto{display:inline-flex;align-items:center;min-height:44px}
body.rw-is-oeuvre .rw-pc-to button{min-width:44px;min-height:44px}
body.rw-is-oeuvre .rw-pc-send,body.rw-is-oeuvre .rw-pc-gate a{display:inline-flex;align-items:center;justify-content:center;min-height:44px}
body.rw-is-oeuvre .rw-pc-form textarea{font-size:16px}
.rw-biblio-controls .rw-biblio-filter{min-height:44px}
}
body.rw-is-oeuvre .rw-paywall{--rwt-pw-bg:radial-gradient(120% 90% at 100% 0%,rgba(194,30,92,.24),transparent 55%),radial-gradient(90% 80% at 0% 100%,rgba(77,45,135,.42),transparent 60%),linear-gradient(160deg,#1a0e30,#0d0820 70%);--rwt-pw-ink:rgba(255,255,255,.84);--rwt-pw-title:#fff;--rwt-pw-acc:#e35c8a;--rwt-pw-line:rgba(227,92,138,.28)}
body.rw-is-oeuvre.rw-light .rw-paywall{--rwt-pw-bg:linear-gradient(165deg,#fffcf6,#f6ebe6);--rwt-pw-ink:#3a2e27;--rwt-pw-title:#1f1712;--rwt-pw-acc:#a3174d;--rwt-pw-line:rgba(163,23,77,.25)}
body.rw-is-oeuvre .rw-paywall .rw-paywall-fade{pointer-events:none}
body.rw-is-oeuvre .rw-paywall .rw-paywall-card{position:relative;overflow:hidden;padding:clamp(32px,6vw,52px) clamp(22px,5vw,44px);background:var(--rwt-pw-bg);border:1px solid var(--rwt-pw-line);border-radius:24px;box-shadow:0 30px 80px -40px rgba(194,30,92,.5);backdrop-filter:none}
body.rw-is-oeuvre .rw-paywall .rw-paywall-eyebrow{display:inline-flex;align-items:center;gap:8px;padding:6px 14px;margin:0 0 20px;border-radius:999px;border:1px solid var(--rwt-pw-line);background:rgba(255,255,255,.04);font:500 .68rem/1.2 var(--rwt-display);letter-spacing:.18em;text-transform:uppercase;color:var(--rwt-pw-acc)}
body.rw-is-oeuvre .rw-paywall .rw-paywall-eyebrow::before{content:"";width:6px;height:6px;border-radius:50%;background:var(--rwt-mag)}
body.rw-is-oeuvre .rw-paywall .rw-paywall-card h3{font:italic 700 clamp(1.6rem,1.2rem + 1.6vw,2.2rem)/1.15 var(--rwt-serif);letter-spacing:-.01em;color:var(--rwt-pw-title);max-width:20ch;margin:0 auto 14px;text-wrap:balance}
body.rw-is-oeuvre .rw-paywall .rw-paywall-card p{font-size:1.02rem;line-height:1.65;color:var(--rwt-pw-ink);max-width:34em;margin:0 auto 26px}
body.rw-is-oeuvre .rw-paywall .rw-paywall-card .rw-paywall-note{font-size:.88rem;margin-bottom:0}
body.rw-is-oeuvre .rw-paywall .rw-paywall-card .rw-paywall-note em,body.rw-is-oeuvre .rw-paywall .rw-paywall-card .rw-paywall-note strong{color:var(--rwt-pw-acc)}
body.rw-is-oeuvre .rw-paywall .rw-paywall-cta{display:inline-flex;align-items:center;justify-content:center;min-height:52px;padding:0 34px;transition:background-color var(--rwt-dur) var(--rwt-ease),transform var(--rwt-dur) var(--rwt-ease),box-shadow var(--rwt-dur) var(--rwt-ease)}
.rw-biblio-wrap .rw-biblio-grid{grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:22px}
.rw-biblio-grid a.rw-biblio-card{color:var(--rwt-ink);transition:transform var(--rwt-dur) var(--rwt-ease),border-color var(--rwt-dur),background-color var(--rwt-dur),box-shadow var(--rwt-dur)}
.rw-biblio-grid .rw-biblio-cover{aspect-ratio:2/3}
.rw-biblio-grid .rw-biblio-cover-img{border-radius:0}
.rw-biblio-grid .rw-biblio-card:hover{transform:translateY(-4px)}
.rw-biblio-grid .rw-biblio-card:focus-visible{transform:translateY(-4px);border-color:rgba(227,92,138,.5)}
.rw-biblio-card .rw-biblio-card-body{padding:18px 18px 20px;gap:10px}
.rw-biblio-card .rw-biblio-card-meta{align-self:flex-start;display:inline-flex;align-items:center;gap:7px;padding:5px 11px;border-radius:999px;background:rgba(255,255,255,.05);border:1px solid var(--rwt-line);font:500 .64rem/1.2 var(--rwt-display);letter-spacing:.16em;color:rgba(255,255,255,.8)}
.rw-biblio-card .rw-biblio-card-meta::before{content:"";width:6px;height:6px;border-radius:50%;background:var(--rwt-mag)}
.rw-biblio-card .rw-biblio-card-excerpt{font-size:.95rem;line-height:1.6;padding-bottom:0;border-bottom:0;color:rgba(255,255,255,.72)}
.rw-biblio-card .rw-biblio-card-arrow{display:inline-block;transition:transform var(--rwt-dur) var(--rwt-ease),color var(--rwt-dur)}
.rw-biblio-grid .rw-biblio-card:hover .rw-biblio-card-arrow{letter-spacing:normal;transform:translateX(4px)}
.rw-biblio-controls .rw-biblio-filter{min-height:40px;padding:8px 16px;transition:background-color var(--rwt-dur) var(--rwt-ease),border-color var(--rwt-dur),color var(--rwt-dur)}
.rw-biblio-stats .rw-biblio-stat-label{color:rgba(255,255,255,.72)}
@media (hover:none){.rw-biblio-grid .rw-biblio-card:hover{transform:none}}
.rw-body .rw-oeuvre-card .rw-oeuvre-title{font-family:var(--rwt-serif);font-style:italic;font-size:clamp(1.9rem,1.3rem + 2.4vw,2.8rem);line-height:1.08;letter-spacing:-.01em;text-wrap:balance}
.rw-body .rw-oeuvre-card .rw-oeuvre-eyebrow,.rw-body .rw-next .rw-next-eyebrow{display:inline-flex;align-items:center;gap:8px;padding:6px 14px;border-radius:999px;background:rgba(5,5,5,.45);border:1px solid rgba(255,255,255,.14);font:500 .68rem/1.2 var(--rwt-display);letter-spacing:.18em;color:rgba(255,255,255,.86)}
.rw-body .rw-oeuvre-card .rw-oeuvre-eyebrow::before,.rw-body .rw-next .rw-next-eyebrow::before{content:"";width:6px;height:6px;border-radius:50%;background:var(--rwt-mag)}
.rw-body .rw-oeuvre-card .rw-oeuvre-excerpt{font-size:1.08rem}
.rw-oeuvre-card .rw-oeuvre-bg img{border-radius:0}
.rw-oeuvre-card--illustree .rw-oeuvre-bg::after{background:linear-gradient(to top,rgba(10,5,18,.92) 0%,rgba(10,5,18,.55) 45%,rgba(10,5,18,.12) 100%),linear-gradient(to right,rgba(10,5,18,.6),transparent 70%)}
.rw-body .rw-oeuvre-card .rw-oeuvre-cta{display:inline-flex;align-items:center;min-height:48px;transition:background-color var(--rwt-dur) var(--rwt-ease),transform var(--rwt-dur) var(--rwt-ease),box-shadow var(--rwt-dur)}
.rw-body .rw-next-empty{padding:30px 24px;border-radius:18px;border:1px dashed rgba(227,92,138,.3);background:rgba(13,8,32,.6);color:rgba(255,255,255,.72)}
.rw-body .rw-next-empty p{margin:0;color:inherit}
.rw-reading-list .rw-reading-item{min-height:64px;transition:transform var(--rwt-dur) var(--rwt-ease),border-color var(--rwt-dur),background-color var(--rwt-dur)}
.rw-reading-list .rw-reading-meta{color:rgba(255,255,255,.7)}
.rw-reading-list .rw-reading-bar{height:4px}
@media (hover:none){.rw-reading-list .rw-reading-item:hover{transform:none}}
@media (max-width:700px){body.rw-is-oeuvre .rw-f{padding-bottom:calc(96px + env(safe-area-inset-bottom))}}
@media (max-width:600px){
body.rw-is-oeuvre .rw-protected-content>p{font-size:1.0625rem;line-height:1.72}
body.rw-is-oeuvre .rw-protected-content>p[data-rw-p]:first-of-type::first-letter,body.rw-is-oeuvre .rw-protected-content>h2+p[data-rw-p]::first-letter{font-size:3.4em}
body.rw-is-oeuvre .rw-protected-content>h2{margin:3.25rem auto 1.75rem}
body.rw-is-oeuvre .rw-protected-content blockquote{padding-left:1rem;font-size:1.08em}
body.rw-is-oeuvre .rw-paywall .rw-paywall-cta{width:100%}
.rw-body .rw-oeuvre-card .rw-oeuvre-cta{width:100%;justify-content:center}
}
@media (min-width:360px) and (max-width:600px){
.rw-biblio-wrap .rw-biblio-grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:14px}
.rw-biblio-card .rw-biblio-card-body{padding:12px 12px 14px;gap:6px}
.rw-biblio-grid .rw-biblio-card-title{font-size:1.08rem!important}
.rw-biblio-card .rw-biblio-card-excerpt{-webkit-line-clamp:2;font-size:.9rem}
.rw-biblio-grid .rw-biblio-cover-initial{font-size:3.2rem}
}
@media (max-width:359px){
.rw-biblio-grid .rw-biblio-card{flex-direction:row}
.rw-biblio-grid .rw-biblio-cover{flex:0 0 96px;align-self:flex-start}
.rw-biblio-grid .rw-biblio-cover-initial{font-size:2.4rem}
.rw-biblio-card .rw-biblio-card-body{min-width:0;padding:12px 14px}
}
@media (prefers-reduced-motion:reduce){
body.rw-is-oeuvre .rw-cover-shine{animation:none!important;display:none}
body.rw-is-oeuvre .rw-body,body.rw-is-oeuvre .rw-toc,body.rw-is-oeuvre .rw-pc,body.rw-is-oeuvre .rw-scrim,body.rw-is-oeuvre .rw-tools,body.rw-is-oeuvre p[data-rw-p]{transition-duration:.01ms!important}
.rw-biblio-grid .rw-biblio-card,.rw-biblio-grid .rw-biblio-card:hover,.rw-biblio-grid .rw-biblio-card:focus-visible,.rw-biblio-grid .rw-biblio-cover-shine,.rw-biblio-grid .rw-biblio-cover-initial,.rw-reading-list .rw-reading-item,.rw-reading-list .rw-reading-item:hover,.rw-body .rw-oeuvre-card .rw-oeuvre-cta,body.rw-is-oeuvre .rw-paywall .rw-paywall-cta{transition:none!important;transform:none!important}
}
RWTCSSLECTURE;

	$b['nav'] = <<<'RWTCSSNAV'
.rw-bottom-nav{--rwt-soft:#e35c8a}
.rw-h{padding-top:env(safe-area-inset-top,0px)}
@media (max-width:768px){
/* les champs ciblés au clavier ne passent ni sous l'en-tête fixe ni sous la barre */
html:has(.rw-bottom-nav){scroll-padding-top:84px;scroll-padding-bottom:calc(84px + env(safe-area-inset-bottom,0px))}
body:has(.rw-bottom-nav){padding-bottom:calc(64px + env(safe-area-inset-bottom,0px))}
.rw-bottom-nav{height:calc(64px + env(safe-area-inset-bottom,0px));padding:0 env(safe-area-inset-right,0px) env(safe-area-inset-bottom,0px) env(safe-area-inset-left,0px);background:rgba(5,5,5,.94);border-top:1px solid rgba(227,92,138,.16);box-shadow:0 -14px 32px -16px rgba(0,0,0,.7)}
.rw-bottom-nav a{position:relative;min-width:44px;min-height:44px;gap:4px;font:500 .7rem/1.2 'Bricolage Grotesque','Plus Jakarta Sans',sans-serif;color:rgba(255,255,255,.66);-webkit-tap-highlight-color:transparent;touch-action:manipulation}
.rw-bottom-nav a::before{content:"";position:absolute;top:0;left:50%;width:28px;height:2px;margin-left:-14px;border-radius:0 0 3px 3px;background:var(--rwt-soft);transform:scaleX(var(--rwt-on,0));transition:transform .2s ease}
.rw-bottom-nav a svg{stroke:var(--rwt-ic,currentColor);transition:transform .15s ease}
.rw-bottom-nav a:active svg{transform:scale(.9)}
.rw-bottom-nav a:focus-visible{outline:2px solid var(--rwt-soft)!important;outline-offset:-5px!important;border-radius:12px}
/* page courante : trait + icône magenta + libellé blanc en gras (pas la couleur seule) */
:is(.rw-bottom-nav a[aria-current="page"],body[data-pid="46"] .rw-bottom-nav a[href="/bibliotheque/"],body.rw-is-oeuvre .rw-bottom-nav a[href="/bibliotheque/"],body[data-pid="47"] .rw-bottom-nav a[href="/le-cercle/"],body:is([data-pid="129"],[data-pid="226"]) .rw-bottom-nav a[href="/espace-membre/"]){--rwt-on:1;--rwt-ic:var(--rwt-soft);color:#fff;font-weight:600}
/* commander : la barre ne recouvre jamais le bouton de paiement */
body[data-pid="225"] .rw-bottom-nav{display:none!important}
body[data-pid="225"]:has(.rw-bottom-nav){padding-bottom:env(safe-area-inset-bottom,0px)}
}
@media (max-width:359px){.rw-bottom-nav a{font-size:.66rem;letter-spacing:0}}
/* paysage téléphone (hauteur ≤480) : 64px de barre, c'est trop */
@media (max-width:768px) and (max-height:480px){.rw-bottom-nav{display:none!important}body:has(.rw-bottom-nav){padding-bottom:0}}
@media (hover:hover) and (max-width:768px){.rw-bottom-nav a:hover{color:#fff}}
@media (prefers-reduced-motion:reduce){.rw-bottom-nav a::before,.rw-bottom-nav a svg{transition:none}}
RWTCSSNAV;

	$b['compte'] = <<<'RWTCSSCOMPTE'
/* C1 · base mobile 320+ */
.rw-body{color-scheme:dark;--rwt-mag:#c21e5c;--rwt-soft:#e35c8a;--rwt-deep:#8e1543;--rwt-line:rgba(255,255,255,.12);--rwt-mute:rgba(255,255,255,.66);--rwt-ghost:rgba(227,92,138,.4);--rwt-serif:'Playfair Display',Georgia,serif;--rwt-label:'Bricolage Grotesque','Plus Jakarta Sans',system-ui,sans-serif;--rwt-sans:'Plus Jakarta Sans',system-ui,sans-serif;--rwt-t:200ms cubic-bezier(.2,.7,.2,1);--rwt-card:linear-gradient(160deg,rgba(26,14,48,.88),rgba(13,8,32,.88));--rwt-i-err:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23ff7a8f' stroke-width='2' stroke-linecap='round'%3E%3Ccircle cx='12' cy='12' r='10'/%3E%3Cpath d='M12 7v6m0 4h.01'/%3E%3C/svg%3E");--rwt-i-ok:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%237fd6ae' stroke-width='2.2' stroke-linecap='round'%3E%3Cpath d='M20 6 9 17l-5-5'/%3E%3C/svg%3E");--rwt-i-info:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23a98be6' stroke-width='2' stroke-linecap='round'%3E%3Ccircle cx='12' cy='12' r='10'/%3E%3Cpath d='M12 11v6m0-10h.01'/%3E%3C/svg%3E");--rwt-i-lock:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23fff' stroke-width='2'%3E%3Crect x='4' y='11' width='16' height='10' rx='2'/%3E%3Cpath d='M8 11V7a4 4 0 0 1 8 0v4'/%3E%3C/svg%3E");--rwt-i-book:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23e35c8a' stroke-width='1.6'%3E%3Cpath d='M4 19.5A2.5 2.5 0 0 1 6.5 17H20V3H6.5A2.5 2.5 0 0 0 4 5.5z'/%3E%3C/svg%3E")}
.rw-body .screen-reader-text{position:absolute!important;width:1px;height:1px;margin:-1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}
.rw-h-actions :is(.rw-cta,.rw-cta-ghost){min-height:44px!important;display:inline-flex!important;align-items:center}
/* titres de section : Playfair italique + point magenta */
body[data-pid="129"] .rw-body>h2,.rw-body :is(.woocommerce-billing-fields,.woocommerce-additional-fields)>h3,.rw-body #order_review_heading{display:flex;align-items:center;gap:12px;font-family:var(--rwt-serif)!important;font-style:italic}
body[data-pid="129"] .rw-body>h2::before,.rw-body :is(.woocommerce-billing-fields,.woocommerce-additional-fields)>h3::before,.rw-body #order_review_heading::before{content:"";flex:0 0 7px;height:7px;border-radius:50%;background:var(--rwt-mag);box-shadow:0 0 0 5px rgba(194,30,92,.15)}
/* espace membre : cartes pleine largeur, CTA pleine largeur, état vide aligné sur .rw-lives__vide */
body[data-pid="129"] .rw-body .wp-block-column{position:relative;overflow:hidden;display:flex;flex-direction:column;padding:22px 18px;background:var(--rwt-card);border-color:rgba(227,92,138,.18);border-radius:18px}
body[data-pid="129"] .rw-body .wp-block-column::before{content:"";position:absolute;inset:0 0 auto;height:2px;background:linear-gradient(90deg,var(--rwt-mag),#4d2d87 70%,transparent)}
body[data-pid="129"] .rw-body .wp-block-column:hover{background:var(--rwt-card);border-color:rgba(227,92,138,.18)}
body[data-pid="129"] .rw-body .wp-block-column h3{font-family:var(--rwt-serif);font-style:italic}
body[data-pid="129"] .rw-body .wp-block-column h3+p{padding:0;border:0}
body[data-pid="129"] .rw-body .wp-block-column .wp-block-buttons{margin:auto 0 0;padding-top:12px}
body[data-pid="129"] .rw-body .wp-block-buttons :is(.wp-block-button,.wp-block-button__link){width:100%;text-align:center}
body[data-pid="129"] .rw-body .is-style-outline .wp-block-button__link{border-color:var(--rwt-ghost)!important;color:var(--rwt-soft)!important}
body[data-pid="129"] .rw-reading-empty{padding:68px 18px 26px;border:1px dashed rgba(227,92,138,.3);border-radius:18px;background:rgba(13,8,32,.6) var(--rwt-i-book) no-repeat center 26px/28px;color:var(--rwt-mute)}
body[data-pid="129"] .rw-reading-empty a{color:var(--rwt-soft)}
/* navigations de compte PMS + Woo : pastilles de 44px qui passent à la ligne */
.rw-body :is(.pms-account-navigation,.woocommerce-MyAccount-navigation) ul{display:flex;flex-wrap:wrap;gap:8px;margin:8px 0 24px;padding:0;list-style:none}
.rw-body :is(.pms-account-navigation,.woocommerce-MyAccount-navigation) li{margin:0}
.rw-body :is(.pms-account-navigation a,.woocommerce-MyAccount-navigation a,.pms-account-subscription-action-link){display:inline-flex;align-items:center;min-height:44px;padding:0 16px!important;border:1px solid var(--rwt-line)!important;border-radius:999px;color:var(--rwt-mute)!important;font:500 .85rem/1.2 var(--rwt-label)}
.rw-body .pms-account-subscription-action-link{margin:4px 8px 4px 0;border-color:var(--rwt-ghost)!important;color:var(--rwt-soft)!important}
.rw-body :is(a.pms-account-navigation-link--active,.woocommerce-MyAccount-navigation .is-active a,.pms-account-navigation a[aria-current],.woocommerce-MyAccount-navigation a[aria-current]){color:#fff!important;background:rgba(194,30,92,.16);border-color:rgba(227,92,138,.55)!important}
.rw-body .pms-account-subscription-details-table{width:100%;border-collapse:separate;border-spacing:0;background:var(--rwt-card);border:1px solid var(--rwt-line);border-radius:16px;overflow:hidden}
.rw-body .pms-account-subscription-details-table td:first-child{font:600 .72rem/1.4 var(--rwt-label);letter-spacing:.12em;text-transform:uppercase;color:var(--rwt-mute)}
/* formulaires Woo + PMS : pleine largeur sur mobile */
.rw-body :is(.woocommerce form:is(.login,.register,.lost_reset_password,.woocommerce-EditAccountForm),form.pms-form){box-sizing:border-box;width:100%;margin:0 0 24px;padding:22px 16px;background:var(--rwt-card);border:1px solid rgba(227,92,138,.2);border-radius:18px;box-shadow:0 30px 80px -44px rgba(194,30,92,.55)}
.rw-body .woocommerce>h2{text-align:center;font-family:var(--rwt-serif);font-style:italic}
.rw-body .pms-form-fields-wrapper{padding:0;list-style:none}
.rw-body :is(.form-row,.pms-field){margin:0 0 18px;padding:0}
.rw-body label{display:block;margin:0 0 7px;font:600 .85rem/1.4 var(--rwt-label)!important;letter-spacing:.03em;color:rgba(255,255,255,.84)!important}
.rw-body label:has(>input:is([type=checkbox],[type=radio])),.rw-body .wc_payment_method>label{display:inline-flex;align-items:center;gap:10px;min-height:44px;margin:0;font:500 .95rem/1.4 var(--rwt-sans)!important;letter-spacing:0;color:#fff!important;cursor:pointer}
.rw-body .required{color:var(--rwt-soft);text-decoration:none;border:0}
.rw-body :is(input:not([type=checkbox],[type=radio],[type=submit],[type=hidden],.qty),select,textarea){box-sizing:border-box;width:100%!important;min-height:50px;padding:12px 14px!important;background:rgba(5,5,5,.55)!important;border:1px solid var(--rwt-line)!important;border-radius:12px!important;color:#fff!important;font:400 16px/1.4 var(--rwt-sans)!important;caret-color:var(--rwt-soft);transition:border-color var(--rwt-t),box-shadow var(--rwt-t)}
.rw-body input.qty{font-size:16px!important;min-height:44px}
.rw-body :is(input:not([type=checkbox],[type=radio],[type=submit],[type=hidden],.qty),select,textarea):focus{border-color:var(--rwt-soft)!important;box-shadow:0 0 0 3px rgba(227,92,138,.45)!important;outline:2px solid transparent!important}
.rw-body :is(input:not([type=checkbox],[type=radio]),select,textarea):user-invalid,.rw-body .woocommerce-invalid :is(input,select){border-color:#ff7a8f!important;background:rgba(5,5,5,.55) var(--rwt-i-err) no-repeat right 14px center/18px!important;padding-right:44px!important}
.rw-body input:is([type=checkbox],[type=radio]){width:22px;height:22px;margin:0;flex:0 0 auto;accent-color:var(--rwt-mag)}
.rw-body :is([type=submit],.button.alt,.checkout-button){box-sizing:border-box;width:100%;display:inline-flex;align-items:center;justify-content:center;gap:10px;min-height:52px;padding:0 24px!important;border:0!important;border-radius:999px!important;background:linear-gradient(135deg,var(--rwt-mag),var(--rwt-deep))!important;color:#fff!important;font:600 1rem/1.2 var(--rwt-sans)!important;text-decoration:none!important;cursor:pointer;box-shadow:0 10px 26px -10px rgba(194,30,92,.7)!important;transition:transform var(--rwt-t),filter var(--rwt-t);touch-action:manipulation}
.rw-body :is([type=submit],.button.alt,.checkout-button):active{transform:scale(.98)}
.rw-body :is([type=submit],.button.alt,.checkout-button):focus-visible{outline:2px solid #fff!important;outline-offset:3px!important}
.rw-body :is([name=update_cart],[name=apply_coupon],a.button:not(.alt,.checkout-button)){box-sizing:border-box;width:100%;display:inline-flex;align-items:center;justify-content:center;min-height:48px;padding:0 20px!important;background:none!important;border:1px solid var(--rwt-ghost)!important;border-radius:999px!important;color:var(--rwt-soft)!important;font:600 .95rem/1.2 var(--rwt-sans)!important;box-shadow:none!important;text-decoration:none!important}
.rw-body form.login .form-row:has([type=submit]){display:flex;flex-direction:column;gap:12px}
.rw-body .woocommerce-LostPassword{text-align:center}
.rw-body .woocommerce-LostPassword a{display:inline-flex;align-items:center;min-height:44px}
/* notices : bord + icône + couleur, jamais la couleur seule */
.rw-body :is(.woocommerce-error,.woocommerce-message,.woocommerce-info,.pms_field-errors-wrapper,.pms_success-messages-wrapper,.pms-warning-message-wrapper){margin:0 0 18px!important;padding:14px 14px 14px 44px!important;list-style:none;border:1px solid var(--rwt-line)!important;border-left:4px solid #a98be6!important;border-radius:14px!important;background:rgba(13,8,32,.78) var(--rwt-i-info) no-repeat 14px 16px/18px!important;color:rgba(255,255,255,.92)!important;line-height:1.55;overflow-wrap:anywhere}
.rw-body :is(.woocommerce-error,.pms_field-errors-wrapper){border-left-color:#ff7a8f!important;background-image:var(--rwt-i-err)!important}
.rw-body :is(.woocommerce-message,.pms_success-messages-wrapper){border-left-color:#7fd6ae!important;background-image:var(--rwt-i-ok)!important}
.rw-body :is(.woocommerce-error,.woocommerce-message,.woocommerce-info) :is(li,p){margin:0;color:inherit}
.rw-body .pms-field .pms_field-errors-wrapper{margin:8px 0 0!important;padding:8px 12px 8px 36px!important;background-position:11px 9px!important;font-size:.85rem}
/* panier */
.rw-body .cart-empty{padding:58px 18px 24px!important;text-align:center;border:1px dashed rgba(227,92,138,.3)!important;background-position:center 22px!important;font:italic 1.1rem/1.5 var(--rwt-serif)}
.rw-body .return-to-shop{text-align:center}
.rw-body a.remove{display:inline-flex;align-items:center;justify-content:center;width:44px;height:44px;padding:0!important;border:0!important;border-radius:50%;background:rgba(227,92,138,.1);color:var(--rwt-soft)!important;font-size:1.4rem;line-height:1}
.rw-body .coupon{display:flex;flex-direction:column;gap:8px}
/* commander : sections, total, paiement, confiance */
.rw-body form.checkout{display:grid;gap:18px}
.rw-body :is(#customer_details,#order_review){margin:0!important;padding:20px 16px!important;background:var(--rwt-card)!important;border:1px solid var(--rwt-line)!important;border-radius:18px!important}
.rw-body #order_review_heading{margin:6px 0 -4px!important}
.rw-body .woocommerce-checkout-review-order-table :is(th,td):last-child{text-align:right}
.rw-body .order-total td{font:italic 700 1.4rem/1.2 var(--rwt-serif);color:#fff;white-space:nowrap}
.rw-body ul.wc_payment_methods{background:rgba(5,5,5,.4)!important;border:1px solid var(--rwt-line)!important;border-radius:16px!important}
.rw-body li.wc_payment_method{display:flex;flex-wrap:wrap;align-items:center;gap:6px 10px;padding:10px 14px!important}
.rw-body li.wc_payment_method:has(>input:checked){background:rgba(194,30,92,.1);box-shadow:inset 3px 0 0 var(--rwt-mag)}
.rw-body .payment_box{flex-basis:100%;margin:0 0 6px!important;border-radius:12px!important}
.rw-body li.wc_payment_method:has(>input:checked)>.payment_box{display:block!important}
.rw-body li.wc_payment_method:has(>input[type=radio]:not(:checked))>.payment_box{display:none!important}
.rw-body #place_order{width:100%;min-height:56px;margin-bottom:env(safe-area-inset-bottom,0px)}
.rw-body #place_order::before{content:"";width:18px;height:18px;background:var(--rwt-i-lock) center/contain no-repeat}
.rw-body :is(.woocommerce-privacy-policy-text,.woocommerce-terms-and-conditions-wrapper) :is(p,span){font-size:.85rem;color:rgba(255,255,255,.66)!important}
/* C2 · ≤600 : transformations de mise en page propres au mobile */
@media (max-width:600px){
.rw-body .pms-account-subscription-details-table :is(tbody,tr,td){display:block;width:auto}
.rw-body .pms-account-subscription-details-table tr{padding:12px 16px;border-bottom:1px solid var(--rwt-line)}
.rw-body .pms-account-subscription-details-table tr:last-child{border-bottom:0}
.rw-body .pms-account-subscription-details-table td{padding:0!important;border:0!important;overflow-wrap:anywhere}
.rw-body .pms-account-subscription-details-table td:first-child{margin-bottom:4px}
.rw-body .shop_table_responsive :is(thead,tbody th,.product-thumbnail){display:none!important}
.rw-body .shop_table_responsive :is(tbody,tr){display:block}
.rw-body .shop_table_responsive tr{padding:12px 16px;border-bottom:1px solid var(--rwt-line)}
.rw-body .shop_table_responsive td{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:6px 0!important;border:0!important;text-align:right;overflow-wrap:anywhere}
.rw-body .shop_table_responsive td[data-title]::before{content:attr(data-title);font:600 .7rem/1.4 var(--rwt-label);letter-spacing:.12em;text-transform:uppercase;color:var(--rwt-mute);text-align:left}
.rw-body td.actions{flex-direction:column;align-items:stretch}
}
/* C3 · 320/360 */
@media (max-width:374px){
.rw-body :is(.woocommerce form:is(.login,.register,.lost_reset_password,.woocommerce-EditAccountForm),form.pms-form){padding:18px 14px}
.rw-body :is(#customer_details,#order_review){padding:18px 14px!important}
body[data-pid="129"] .rw-body .wp-block-column{padding:20px 16px}
.rw-body :is(.pms-account-navigation a,.woocommerce-MyAccount-navigation a,.pms-account-subscription-action-link){padding:0 13px!important;font-size:.8rem}
.rw-body :is([type=submit],.button.alt,.checkout-button){padding:0 16px!important;font-size:.95rem!important}
.rw-body .order-total td{font-size:1.25rem}
}
/* C4 · 601+ */
@media (min-width:601px){
.rw-body :is(.woocommerce form:is(.login,.register,.lost_reset_password,.woocommerce-EditAccountForm),form.pms-form){max-width:520px;margin:0 auto 28px;padding:28px 24px;border-radius:22px}
.rw-body :is([type=submit],.button.alt,.checkout-button,[name=update_cart],[name=apply_coupon],a.button:not(.alt,.checkout-button)){width:auto;padding:0 30px!important}
.rw-body form.login .form-row:has([type=submit]) [type=submit],.rw-body #place_order{width:100%}
.rw-body :is([type=submit],.button.alt,.checkout-button):hover{transform:translateY(-1px);filter:brightness(1.08)}
.rw-body :is([name=update_cart],[name=apply_coupon],a.button:not(.alt,.checkout-button)):hover{background:rgba(227,92,138,.08)!important;border-color:var(--rwt-soft)!important;transform:none;filter:none}
.rw-body .coupon{flex-direction:row;align-items:center}
.rw-body :is(#customer_details,#order_review){padding:24px 22px!important;border-radius:20px!important}
.rw-body .woocommerce-billing-fields__field-wrapper{display:grid;grid-template-columns:1fr 1fr;column-gap:16px}
.rw-body .woocommerce-billing-fields__field-wrapper>:not(.form-row-first,.form-row-last){grid-column:1/-1}
.rw-body .pms-account-subscription-details-table td:first-child{width:38%}
body[data-pid="129"] .rw-body .wp-block-column{padding:28px;border-radius:20px}
body[data-pid="129"] .rw-body .wp-block-buttons :is(.wp-block-button,.wp-block-button__link){width:auto}
}
@media (prefers-reduced-motion:reduce){.rw-body *{transition:none!important;animation:none!important}}
RWTCSSCOMPTE;

	$b['e404'] = <<<'RWTCSS404'
/* D1 · base mobile 320+ */
body:has(>.rw-404-inner){min-height:100dvh;padding:max(48px,env(safe-area-inset-top)) max(16px,env(safe-area-inset-right)) max(40px,env(safe-area-inset-bottom)) max(16px,env(safe-area-inset-left))}
.rw-404-inner{width:100%}
.rw-404-inner .rw-404-logo{width:72px;height:72px;margin-bottom:22px}
@supports ((-webkit-background-clip:text) or (background-clip:text)){.rw-404-inner .rw-404-num{background:linear-gradient(120deg,#fff 5%,#e35c8a 50%,#a98be6);-webkit-background-clip:text;background-clip:text;color:transparent;text-shadow:none;filter:drop-shadow(0 8px 30px rgba(194,30,92,.35))}}
.rw-404-inner .rw-404-title::before{content:"";display:block;width:56px;height:1px;margin:0 auto 20px;background:linear-gradient(90deg,transparent,#e35c8a,transparent)}
.rw-404-inner .rw-404-msg{max-width:46ch;margin:0 auto 28px}
.rw-404-inner :is(.rw-404-btn,.rw-404-btn-ghost){display:flex;align-items:center;justify-content:center;width:100%;min-height:48px;margin:0 0 12px}
.rw-404-inner .rw-404-btn-ghost{color:#e35c8a!important;border-color:rgba(227,92,138,.4)}
.rw-404-inner a:focus-visible{outline:2px solid #fff;outline-offset:3px;border-radius:999px}
.rw-404-inner .rw-404-quote{display:flex;align-items:center;justify-content:center;gap:12px;margin-top:32px;color:rgba(255,255,255,.66);font-size:1rem}
.rw-404-inner .rw-404-quote::before,.rw-404-inner .rw-404-quote::after{content:"";flex:0 0 28px;height:1px;background:rgba(227,92,138,.45)}
@keyframes rwtRise{from{opacity:0;transform:translateY(10px)}}
@media (prefers-reduced-motion:no-preference){.rw-404-inner>*{animation:rwtRise .3s cubic-bezier(.2,.7,.2,1) both}.rw-404-inner>:nth-child(2){animation-delay:.06s}.rw-404-inner>:nth-child(3){animation-delay:.12s}.rw-404-inner>:nth-child(n+4){animation-delay:.18s}}
/* D2 · 601+ */
@media (min-width:601px){body:has(>.rw-404-inner){padding:80px 24px}.rw-404-inner .rw-404-logo{width:96px;height:96px;margin-bottom:32px}.rw-404-inner :is(.rw-404-btn,.rw-404-btn-ghost){display:inline-flex;width:auto;margin:0 6px 12px}.rw-404-inner .rw-404-btn-ghost:hover{background:rgba(227,92,138,.08);border-color:#e35c8a}.rw-404-inner .rw-404-quote{margin-top:48px}}
@media (prefers-reduced-motion:reduce){.rw-404-inner *{transition:none!important}}
RWTCSS404;

	$b['login'] = <<<'RWTCSSLOGIN'
/* A1 · base mobile 320+ */
body.login{--rwt-mag:#c21e5c;--rwt-soft:#e35c8a;--rwt-line:rgba(255,255,255,.14);--rwt-label:'Bricolage Grotesque','Plus Jakarta Sans',system-ui,sans-serif;--rwt-t:200ms cubic-bezier(.2,.7,.2,1);--rwt-i-err:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23ff7a8f' stroke-width='2' stroke-linecap='round'%3E%3Ccircle cx='12' cy='12' r='10'/%3E%3Cpath d='M12 7v6m0 4h.01'/%3E%3C/svg%3E");--rwt-i-info:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23a98be6' stroke-width='2' stroke-linecap='round'%3E%3Ccircle cx='12' cy='12' r='10'/%3E%3Cpath d='M12 11v6m0-10h.01'/%3E%3C/svg%3E");padding:env(safe-area-inset-top,0px) 0 env(safe-area-inset-bottom,0px);overflow-x:hidden}
body.login #login{box-sizing:border-box;width:100%;max-width:420px;padding:3vh max(16px,env(safe-area-inset-right,0px)) 24px max(16px,env(safe-area-inset-left,0px))}
body.login #login form{box-sizing:border-box;width:100%;margin-left:0;margin-right:0;padding:26px 18px!important;background:radial-gradient(120% 90% at 100% 0%,rgba(194,30,92,.18),transparent 55%),radial-gradient(90% 80% at 0% 100%,rgba(77,45,135,.32),transparent 60%),linear-gradient(160deg,#1a0e30,#0d0820 70%)!important;border:1px solid rgba(227,92,138,.22)!important;border-radius:18px!important;box-shadow:0 30px 80px -40px rgba(194,30,92,.5)!important}
body.login #login form::before{content:"";display:block;width:44px;height:3px;margin:0 auto 22px;border-radius:3px;background:linear-gradient(90deg,var(--rwt-mag),#4d2d87)}
body.login #login form label{font:600 .9rem/1.4 var(--rwt-label)!important;letter-spacing:.03em;color:rgba(255,255,255,.85)!important}
body.login #login .forgetmenot label{font:400 .9rem/1.4 'Plus Jakarta Sans',system-ui,sans-serif!important;letter-spacing:0}
body.login #login form .input{box-sizing:border-box;width:100%;min-height:50px!important;font-size:16px!important;background:rgba(5,5,5,.55)!important;border:1px solid var(--rwt-line)!important;border-radius:12px!important;caret-color:var(--rwt-soft);transition:border-color var(--rwt-t),box-shadow var(--rwt-t)!important}
body.login #login form .input:focus{border-color:var(--rwt-soft)!important;box-shadow:0 0 0 3px rgba(227,92,138,.5)!important;outline:2px solid transparent!important}
body.login #user_pass,body.login #pass1{padding-right:54px!important}
body.login .wp-pwd .button.wp-hide-pw{top:3px;right:3px;width:44px;height:44px;min-width:44px;min-height:44px;padding:0;display:inline-flex;align-items:center;justify-content:center;color:var(--rwt-soft);background:none;border:0;border-radius:10px;box-shadow:none}
body.login .wp-pwd .button.wp-hide-pw:hover{background:rgba(227,92,138,.12)}
body.login .wp-hide-pw .dashicons{top:0}
body.login .forgetmenot{display:flex;flex-wrap:wrap;align-items:center;min-height:44px}
body.login #rememberme{width:22px;height:22px;margin:0 10px 0 0;background:rgba(5,5,5,.55);border-color:rgba(255,255,255,.4)}
body.login #rememberme:checked{background:var(--rwt-mag);border-color:var(--rwt-mag)}
body.login #rememberme:checked::before{filter:brightness(0) invert(1)}
body.login .wp-tooltip__toggle{min-width:44px;min-height:44px;color:rgba(255,255,255,.66)}
body.login #wp-submit{min-height:52px;font-size:16px!important}
body.login :is(a,button,#wp-submit,#rememberme):focus-visible{outline:2px solid #fff!important;outline-offset:3px!important;box-shadow:none!important}
body.login :is(#login_error,.message,.notice){padding:14px 14px 14px 44px!important;border:1px solid var(--rwt-line)!important;border-left:4px solid #a98be6!important;border-radius:12px!important;background:rgba(13,8,32,.85) var(--rwt-i-info) no-repeat 14px 15px/18px!important;overflow-wrap:anywhere}
body.login :is(#login_error,.notice-error){border-left-color:#ff7a8f!important;background-image:var(--rwt-i-err)!important}
body.login :is(#nav,#backtoblog){margin:12px 0 0!important;padding:0!important}
body.login :is(#nav,#backtoblog) a{display:inline-flex;align-items:center;min-height:44px;padding:0 8px}
body.login .privacy-policy-page-link a{display:inline-flex;align-items:center;min-height:44px;color:rgba(255,255,255,.66)!important}
/* A2 · 320/360 */
@media (max-width:374px){body.login #login form{padding:22px 14px!important}body.login #login h1 a{width:72px!important;height:72px!important;margin-bottom:8px}}
/* A3 · 601+ */
@media (min-width:601px){body.login #login{padding-top:6vh}body.login #login form{padding:34px 28px!important;border-radius:22px!important}}
@media (prefers-reduced-motion:reduce){body.login *{transition:none!important;animation:none!important}}
RWTCSSLOGIN;

	$b['fix'] = <<<'RWTCSSFIX'
/* Correctifs issus de la passe mobile réelle (320 / 375) */
/* En-tête : le bouton fantôme ne chevauche plus le logo */
.rw-h .rw-logo{flex-shrink:0}
@media (max-width:480px){
body:has(.rw-bottom-nav) .rw-h .rw-cta-ghost{display:none!important}
body:not(:has(.rw-bottom-nav)) .rw-h .rw-cta-ghost{max-width:none!important;width:auto!important;padding:0 12px!important;font-size:.74rem!important;white-space:nowrap;overflow:visible!important;text-overflow:clip!important}
}
@media (max-width:374px){
body:not(:has(.rw-bottom-nav)) .rw-h .rw-logo-text{display:none}
}
/* Pied de page des pages : liens à 44px au doigt */
@media (max-width:768px){
[data-pid] .rw-f-col li{margin-bottom:0}
[data-pid] .rw-f-col a{display:inline-flex;align-items:center;min-height:44px}
}
/* Formulaires : l'astérisque reste à côté du libellé, le champ passe dessous */
#rw-main-page form label:has(>:is(input:not([type=checkbox],[type=radio],[type=file]),textarea,select)){display:block}
#rw-main-page form label:has(>:is(input:not([type=checkbox],[type=radio],[type=file]),textarea,select))>span{display:inline;margin-left:3px}
#rw-main-page form label>:is(input:not([type=checkbox],[type=radio],[type=file]),textarea,select){display:block;width:100%;box-sizing:border-box;margin-top:8px}
/* Œuvre : le bouton « commenter ce passage » reste dans l'écran */
@media (max-width:900px){body.rw-is-oeuvre .rw-pc-btn{left:auto;right:auto;top:auto}}
/* Accueil 320 : la pastille du hero tient sur une ligne */
@media (max-width:374px){
.rwt-home section.pt-40 div.inline-flex.rounded-full{padding:6px 12px}
.rwt-home section.pt-40 div.inline-flex.rounded-full span:not(.w-2){font-size:.6rem;letter-spacing:.1em}
}
RWTCSSFIX;

	return $b;
}

/* ---------- wp-login.php (connexion, mot de passe perdu, réinitialisation) ---------- */
add_action( 'login_enqueue_scripts', function () {
	$b = rwt_css_blocks();
	echo '<style id="rwt-login">' . $b['login'] . '</style>';
}, 210 );

/* ---------- Front : un seul <style id="rwt-css"> inséré avant </head> ---------- */
add_action( 'wp', function () {
	if ( is_admin() || wp_doing_ajax() || wp_doing_cron() || is_feed() || is_embed() ) return;
	if ( defined( 'REST_REQUEST' ) && REST_REQUEST ) return;
	if ( isset( $_GET['rwt_off'] ) ) return; // aperçu « avant » pour comparer

	$ctx = array(
		'home'    => is_front_page() || is_page( 35 ),
		'pages'   => is_page( array( 3, 36, 37, 38, 39, 40, 41, 42, 43, 47, 344 ) ) || is_singular( 'rw_live' ),
		'compte'  => is_page( array( 129, 224, 225, 226 ) ),
		'e404'    => is_404(),
		'lecture' => is_singular( array( 'oeuvre', 'post' ) ) || is_page(),
	);

	ob_start( function ( $html ) use ( $ctx ) {
		if ( ! is_string( $html ) || '' === $html ) return $html;
		if ( false !== strpos( $html, 'id="rwt-css"' ) ) return $html;
		$pos = stripos( $html, '</head>' );
		if ( false === $pos ) return $html;

		$b   = rwt_css_blocks();
		$css = '';

		// Barre de navigation mobile + en-tête fixe : partout où elle existe.
		if ( false !== strpos( $html, 'rw-bottom-nav' ) || false !== strpos( $html, 'class="rw-h' ) ) $css .= $b['nav'];

		// Accueil (gabarit du snippet 5, repéré par l'intro du livre 3D).
		if ( $ctx['home'] && false !== strpos( $html, 'id="book-intro"' ) ) {
			$css  .= $b['home'];
			$html  = preg_replace( '#<body class="#', '<body class="rwt-home ', $html, 1 );
			$pos   = stripos( $html, '</head>' );
		}

		// Pages de contenu (gabarit du snippet 12).
		if ( $ctx['pages'] && false !== strpos( $html, 'id="rw-main-page"' ) && false !== strpos( $html, '<body data-pid=' ) ) $css .= $b['pages'];

		// Lecture : œuvre, bibliothèque, œuvre du moment, historique, prochaine œuvre.
		if ( $ctx['lecture'] && preg_match( '/rw-is-oeuvre|rw-biblio-wrap|rw-oeuvre-card|rw-reading-|rw-next/', $html ) ) $css .= $b['lecture'];

		// Compte et parcours.
		if ( $ctx['compte'] ) $css .= $b['compte'];

		// 404.
		if ( $ctx['e404'] ) $css .= $b['e404'];

		if ( '' === $css ) return $html;
		$css .= $b['fix']; // correctifs mobile, toujours en dernier
		return substr_replace( $html, '<style id="rwt-css">' . $css . '</style>', $pos, 0 );
	} );
}, -1 );
