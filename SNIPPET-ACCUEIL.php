<?php
/**
 * Copie de référence de l'extrait Code Snippets n° 5 « RevelaWorld - Universal dark mode pages »
 * (gabarit de l'accueil et des autres pages). La version qui tourne est celle du site :
 * cette copie sert à suivre les changements. Le code ci-dessous est collé tel quel dans
 * Code Snippets, sans cette en-tête ni la balise <?php.
 */

add_action( 'template_redirect', function() {
  if ( is_admin() ) return;
  ob_start( function( $html ) {
    if ( strpos( $html, '</body>' ) === false ) return $html;
    if ( strpos( $html, 'rw-scroll-fix' ) !== false ) return $html;
    $fix = '<script id="rw-scroll-fix">setTimeout(function(){document.body.classList.remove("intro-active");document.body.style.overflow="";document.documentElement.style.overflow="";var bi=document.getElementById("book-intro");if(bi){bi.style.opacity="0";bi.style.transition="opacity .8s ease";setTimeout(function(){bi.style.display="none";},800);}},4000);</script>';
    return str_replace( '</body>', $fix . '</body>', $html );
  });
}, 1 );

add_action( 'template_redirect', function() {
    if ( is_admin() || is_user_logged_in_admin_area() ) return;
    if ( ! ( is_front_page() || is_page() ) ) return;

    // ===== HOME : Mockup A inliné directement (scroll natif, plus d'iframe) =====
    if ( is_front_page() || is_page( 35 ) ) {
        nocache_headers();
        header( 'Cache-Control: no-store, no-cache, must-revalidate, max-age=0, private' );
        header( 'X-RW-Build: ' . time() );
        if ( function_exists( 'do_action' ) ) {
            do_action( 'litespeed_control_set_nocache', 'rw-home' );
        }
        header( 'Content-Type: text/html; charset=utf-8' );
        echo <<<'EOT_RW_HOME'
<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>RevelaWorld — Les silences ont des mots.</title>
<meta name="description" content="Salon littéraire numérique francophone. Une œuvre par mois, un Cercle de lectrices, une bibliothèque qui te suit.">
<meta name="theme-color" content="#050505">
<meta name="application-name" content="RevelaWorld">
<meta name="apple-mobile-web-app-title" content="RevelaWorld">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<link rel="icon" type="image/png" href="/wp-content/uploads/2026/05/revelaworld-logo.png">
<link rel="apple-touch-icon" href="/wp-content/uploads/2026/05/revelaworld-logo.png">
<link rel="canonical" href="https://darkslategrey-mantis-542142.hostingersite.com/">
<meta property="og:locale" content="fr_FR">
<meta property="og:site_name" content="RevelaWorld">
<meta property="og:type" content="website">
<meta property="og:title" content="RevelaWorld — Les silences ont des mots.">
<meta property="og:description" content="Salon littéraire numérique francophone. Une œuvre par mois, un Cercle de lectrices, une bibliothèque qui te suit.">
<meta property="og:url" content="https://darkslategrey-mantis-542142.hostingersite.com/">
<meta property="og:image" content="https://darkslategrey-mantis-542142.hostingersite.com/wp-content/uploads/2026/05/revelaworld-logo.png">
<meta property="og:image:width" content="1042">
<meta property="og:image:height" content="1042">
<meta property="og:image:alt" content="Logo RevelaWorld">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="RevelaWorld — Les silences ont des mots.">
<meta name="twitter:description" content="Salon littéraire numérique francophone. Une œuvre par mois, un Cercle de lectrices, une bibliothèque qui te suit.">
<meta name="twitter:image" content="https://darkslategrey-mantis-542142.hostingersite.com/wp-content/uploads/2026/05/revelaworld-logo.png">
<script src="https://cdn.tailwindcss.com"></script>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,500;12..96,600;12..96,700;12..96,800&family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Playfair+Display:ital,wght@1,400;1,700&display=swap" rel="stylesheet">
<script>
tailwind.config = {
  theme: {
    extend: {
      fontFamily: {
        display: ['Bricolage Grotesque', 'system-ui', 'sans-serif'],
        sans: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
      },
      colors: {
        'rw-violet': '#4d2d87',
        'rw-violet-deep': '#2e1a52',
        'rw-magenta': '#c21e5c',
        'rw-magenta-soft': '#e35c8a',
      },
    },
  },
};
</script>
<style>
  body { background: #050505; }
  .gradient-text {
    background: linear-gradient(135deg, #c21e5c 0%, #e35c8a 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  .grid-pattern {
    background-image:
      linear-gradient(to right, rgba(77,45,135,0.08) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(77,45,135,0.08) 1px, transparent 1px);
    background-size: 64px 64px;
  }
  .glow {
    box-shadow: 0 0 80px rgba(194, 30, 92, 0.25);
  }


  
  
  /* === HEADER : nav desktop / burger mobile === */
  .rw-nav-desktop {
    display: none;
    align-items: center;
    gap: 24px;
    font-size: 0.85rem;
    color: rgba(255,255,255,0.7);
  }
  .rw-nav-desktop a { color: inherit; transition: color .25s; }
  .rw-nav-desktop a:hover { color: #fff; }
  @media (min-width: 900px) {
    .rw-nav-desktop { display: flex; }
  }

  .rw-cta-header {
    display: inline-flex;
    align-items: center;
    padding: 8px 18px;
    background: #c21e5c;
    color: #fff !important;
    font-size: 0.78rem;
    font-weight: 600;
    border-radius: 999px;
    text-decoration: none;
    box-shadow: 0 4px 14px rgba(194,30,92,0.25);
    transition: .25s;
    white-space: nowrap;
  }
  .rw-cta-header:hover { background: #8e1543; transform: translateY(-1px); }

  .rw-burger {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 5px;
    width: 42px;
    height: 42px;
    padding: 10px 9px;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 10px;
    cursor: pointer;
    transition: .25s;
    z-index: 50;
  }
  .rw-burger span {
    display: block;
    height: 2px;
    background: #fff;
    border-radius: 2px;
    transition: transform .35s cubic-bezier(0.65,0,0.35,1), opacity .25s;
    transform-origin: center;
  }
  .rw-burger:hover { background: rgba(255,255,255,0.08); border-color: rgba(194,30,92,0.4); }
  .rw-burger.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
  .rw-burger.open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
  .rw-burger.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }
  @media (min-width: 900px) {
    .rw-burger { display: none; }
  }

  /* Overlay menu mobile — fullscreen avec animation */
  .rw-burger-overlay {
    position: fixed;
    inset: 0;
    background: linear-gradient(160deg, #0d0820 0%, #050505 60%, #1a0e30 100%);
    z-index: 45;
    opacity: 0;
    visibility: hidden;
    transition: opacity .35s ease-out, visibility .35s;
    display: flex;
    align-items: center;
    justify-content: center;
    backdrop-filter: blur(20px);
  }
  .rw-burger-overlay::before {
    content: "";
    position: absolute;
    inset: 0;
    background:
      radial-gradient(ellipse at 50% 30%, rgba(77,45,135,0.4) 0%, transparent 60%),
      radial-gradient(ellipse at 80% 80%, rgba(194,30,92,0.25) 0%, transparent 50%);
    pointer-events: none;
  }
  .rw-burger-overlay.open {
    opacity: 1;
    visibility: visible;
  }
  .rw-burger-nav {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 0 32px;
    text-align: center;
    width: 100%;
    max-width: 420px;
  }
  .rw-burger-link {
    font-family: 'Playfair Display', serif;
    font-style: italic;
    font-weight: 700;
    font-size: 1.85rem;
    color: #fff;
    text-decoration: none;
    padding: 14px 8px;
    border-bottom: 1px solid rgba(255,255,255,0.06);
    transition: color .25s, transform .25s, padding .25s;
    opacity: 0;
    transform: translateY(20px);
  }
  .rw-burger-link:hover, .rw-burger-link:active {
    color: #e35c8a;
    padding-left: 16px;
  }
  .rw-burger-overlay.open .rw-burger-link {
    opacity: 1;
    transform: translateY(0);
    transition: opacity .4s ease-out, transform .4s ease-out, color .25s, padding .25s;
  }
  .rw-burger-overlay.open .rw-burger-link:nth-child(1) { transition-delay: .12s, .12s; }
  .rw-burger-overlay.open .rw-burger-link:nth-child(2) { transition-delay: .18s, .18s; }
  .rw-burger-overlay.open .rw-burger-link:nth-child(3) { transition-delay: .24s, .24s; }
  .rw-burger-overlay.open .rw-burger-link:nth-child(4) { transition-delay: .30s, .30s; }
  .rw-burger-overlay.open .rw-burger-link:nth-child(5) { transition-delay: .36s, .36s; }
  .rw-burger-overlay.open .rw-burger-link:nth-child(6) { transition-delay: .42s, .42s; }

  .rw-burger-cta {
    margin-top: 24px;
    padding: 16px 32px;
    background: #c21e5c;
    color: #fff !important;
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-style: normal;
    font-weight: 600;
    font-size: 1rem;
    border-radius: 999px;
    text-decoration: none;
    border: 0 !important;
    box-shadow: 0 8px 22px rgba(194,30,92,0.4);
    transition: .25s;
    display: inline-block;
    align-self: center;
    opacity: 0;
    transform: translateY(20px);
  }
  .rw-burger-overlay.open .rw-burger-cta {
    opacity: 1;
    transform: translateY(0);
    transition: opacity .5s ease-out .5s, transform .5s ease-out .5s;
  }
  .rw-burger-cta:hover { background: #8e1543; transform: translateY(-2px); }

  
  .rw-burger-close {
    position: absolute;
    top: 18px;
    right: 18px;
    width: 44px;
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.12);
    border-radius: 50%;
    color: #fff;
    cursor: pointer;
    transition: background .25s, transform .25s, border-color .25s;
    z-index: 50;
    opacity: 0;
    transform: scale(0.8) rotate(-90deg);
  }
  .rw-burger-overlay.open .rw-burger-close {
    opacity: 1;
    transform: scale(1) rotate(0);
    transition: opacity .35s ease-out .15s, transform .35s ease-out .15s, background .25s;
  }
  .rw-burger-close:hover, .rw-burger-close:active {
    background: rgba(194,30,92,0.2);
    border-color: rgba(194,30,92,0.6);
    transform: scale(1.05) rotate(90deg);
  }

  /* === RESPONSIVE GLOBAL : Huawei P30 Pro (~393px) et autres mobiles === */
  @media (max-width: 768px) {
    /* Hero h1 */
    .rw-hero-title {
      font-size: clamp(2.1rem, 9vw, 3.4rem) !important;
      line-height: 1.05 !important;
    }
    /* Reduced padding sections */
    .hero-wrap.pt-32 { padding-top: 7rem !important; }
    section[style*="padding-top:clamp"] { padding-top: 7rem !important; }
    .hero-wrap.pb-32 { padding-bottom: 4rem !important; }
    .hero-wrap.py-32 { padding-top: 4rem !important; padding-bottom: 4rem !important; }
    /* Header padding */
    header .max-w-7xl { padding: 12px 16px !important; }
    /* Mockup-A piliers grid */
    section .grid.md\:grid-cols-3 { gap: 16px !important; }
    /* Bottom of viewport when burger open */
    body.burger-open { overflow: hidden; }
    /* Voix au Salon row : reduce gap */
    .flex.flex-wrap.gap-12 { gap: 18px !important; }
    .flex.flex-wrap.gap-12 .font-display { font-size: 1.2rem !important; }
    /* Pionnières CTA */
    a.glow.inline-block { padding: 12px 22px !important; font-size: 0.9rem !important; }
    /* Footer columns stack */
    footer .grid.md\:grid-cols-4 { grid-template-columns: 1fr !important; gap: 28px !important; }
    /* Hero subtitle */
    .text-xl { font-size: 1rem !important; }
    .md\:text-8xl { font-size: 3rem !important; }
    .md\:text-7xl { font-size: 2.4rem !important; }
    .md\:text-6xl { font-size: 2rem !important; }
    .md\:text-5xl { font-size: 1.75rem !important; }
  }

  /* Logo header home — vraiment grand */
  .rw-logo-img-home {
    width: 110px !important;
    height: 110px !important;
    object-fit: contain;
    display: block;
  }
  @media (max-width: 768px) {
    .rw-logo-img-home { width: 70px !important; height: 70px !important; }
  }
  
  /* Variante footer : plus petit, pour ne pas déborder sur les colonnes */
  .rw-brand-mark-footer {
    font-family: 'Playfair Display', serif;
    font-style: italic;
    font-weight: 700;
    font-size: 1.6rem;
    letter-spacing: 0.005em;
    color: #fff;
    line-height: 1;
  }
  /* Forcer le footer à donner assez de place à chaque colonne */
  footer .grid { gap: 32px !important; }
  footer .grid > div:first-child { min-width: 0; }
  footer .grid > div:first-child img { width: 110px !important; height: 110px !important; }

  /* Logo footer home — encore plus grand */
  .rw-logo-footer-home {
    width: 96px !important;
    height: 96px !important;
    object-fit: contain;
    display: block;
  }
  @media (max-width: 768px) {
    .rw-logo-footer-home { width: 80px !important; height: 80px !important; }
  }
  /* Header avec logo grand : padding augmenté */
  header .max-w-7xl { padding-top: 12px !important; padding-bottom: 12px !important; }

  /* ============================================================
     BRAND MARK : RevelaWorld en serif italic
     ============================================================ */
  .rw-brand-mark {
    font-family: 'Playfair Display', serif;
    font-style: italic;
    font-weight: 700;
    font-size: 1rem;
    letter-spacing: 0.005em;
    color: #fff;
    text-shadow: 0 2px 12px rgba(194,30,92,0.18);
    line-height: 1;
  }

  /* Hero title — serif Playfair italic, brand identity */
  .rw-hero-title {
    font-family: 'Playfair Display', serif;
    font-style: italic;
    font-weight: 700;
    font-size: clamp(3rem, 8vw, 6.5rem);
    line-height: 1.02;
    letter-spacing: -0.015em;
    color: #fff;
    margin: 0 0 32px;
    text-shadow: 0 6px 40px rgba(28,16,58,0.85);
  }
  .rw-hero-title .gradient-text {
    font-style: italic;
  }

  /* ============================================================
     INTRO LIVRE 3D — couverture + 3 pages qui se tournent en cascade
     ============================================================ */

  body.intro-active { overflow: hidden; height: 100vh; }

  .book-intro {
    position: fixed;
    inset: 0;
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;
    background:
      radial-gradient(ellipse at 50% 55%, rgba(180,110,40,0.35) 0%, rgba(60,30,10,0.6) 25%, #0a0604 60%, #000 100%),
      radial-gradient(ellipse at 50% 100%, rgba(120,70,30,0.5) 0%, transparent 60%);
    perspective: 2000px;
    perspective-origin: 50% 80%;  /* caméra en bas — on regarde le livre par-dessous */
    transform-style: preserve-3d;
    animation: introFadeOut 600ms ease-in 2700ms forwards;
    pointer-events: none;
  }

  .book-intro::before {
    content: "";
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse at 50% 35%, rgba(255,180,80,0.22) 0%, rgba(255,140,40,0.1) 30%, transparent 60%);
    pointer-events: none;
  }

  
  /* Particules dorées flottantes — effet magique */
  .magic-particles {
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 9998;
    overflow: hidden;
  }
  .magic-particles::before,
  .magic-particles::after {
    content: "";
    position: absolute;
    inset: 0;
    background-image:
      radial-gradient(circle at 15% 20%, rgba(255, 220, 140, 0.9) 0px, rgba(255, 220, 140, 0) 2px),
      radial-gradient(circle at 35% 75%, rgba(255, 200, 100, 0.7) 0px, rgba(255, 200, 100, 0) 2.5px),
      radial-gradient(circle at 60% 30%, rgba(255, 230, 160, 1) 0px, rgba(255, 230, 160, 0) 1.8px),
      radial-gradient(circle at 80% 60%, rgba(255, 200, 100, 0.85) 0px, rgba(255, 200, 100, 0) 2px),
      radial-gradient(circle at 25% 50%, rgba(255, 240, 180, 0.7) 0px, rgba(255, 240, 180, 0) 1.5px),
      radial-gradient(circle at 70% 85%, rgba(255, 200, 80, 0.8) 0px, rgba(255, 200, 80, 0) 2px),
      radial-gradient(circle at 50% 15%, rgba(255, 220, 130, 0.9) 0px, rgba(255, 220, 130, 0) 2.2px),
      radial-gradient(circle at 90% 40%, rgba(255, 210, 110, 0.75) 0px, rgba(255, 210, 110, 0) 1.7px),
      radial-gradient(circle at 10% 70%, rgba(255, 230, 150, 0.85) 0px, rgba(255, 230, 150, 0) 2px),
      radial-gradient(circle at 45% 95%, rgba(255, 200, 100, 0.7) 0px, rgba(255, 200, 100, 0) 1.8px),
      radial-gradient(circle at 65% 10%, rgba(255, 220, 140, 0.95) 0px, rgba(255, 220, 140, 0) 2.5px),
      radial-gradient(circle at 20% 90%, rgba(255, 200, 100, 0.7) 0px, rgba(255, 200, 100, 0) 2px);
    background-size: 100% 100%;
    animation: particleFloat 4s ease-in-out infinite;
    will-change: transform, opacity;
  }
  .magic-particles::after {
    background-image:
      radial-gradient(circle at 25% 35%, rgba(255, 230, 150, 0.85) 0px, rgba(255, 230, 150, 0) 2.2px),
      radial-gradient(circle at 55% 65%, rgba(255, 210, 110, 0.7) 0px, rgba(255, 210, 110, 0) 1.8px),
      radial-gradient(circle at 75% 25%, rgba(255, 220, 130, 0.9) 0px, rgba(255, 220, 130, 0) 2.5px),
      radial-gradient(circle at 40% 80%, rgba(255, 200, 100, 0.75) 0px, rgba(255, 200, 100, 0) 2px),
      radial-gradient(circle at 85% 55%, rgba(255, 240, 180, 0.85) 0px, rgba(255, 240, 180, 0) 1.5px),
      radial-gradient(circle at 5% 45%, rgba(255, 220, 140, 0.8) 0px, rgba(255, 220, 140, 0) 2px),
      radial-gradient(circle at 95% 75%, rgba(255, 200, 100, 0.7) 0px, rgba(255, 200, 100, 0) 2.2px);
    animation: particleFloat 6s ease-in-out infinite reverse;
    animation-delay: -2s;
  }
  @keyframes particleFloat {
    0%, 100% { transform: translateY(0) translateX(0); opacity: 0.4; }
    25% { transform: translateY(-15px) translateX(8px); opacity: 0.9; }
    50% { transform: translateY(-25px) translateX(-5px); opacity: 0.7; }
    75% { transform: translateY(-10px) translateX(12px); opacity: 1; }
  }

  /* Brume / mist atmosphérique au-dessus du livre */
  .magic-mist {
    position: absolute;
    top: -100px;
    left: 50%;
    transform: translateX(-50%);
    width: 800px;
    height: 400px;
    background:
      radial-gradient(ellipse at 50% 100%, rgba(255, 220, 160, 0.18) 0%, rgba(255, 200, 120, 0.08) 30%, transparent 60%);
    filter: blur(40px);
    z-index: 1;
    pointer-events: none;
    opacity: 0;
    animation: mistRise 2400ms ease-out 400ms forwards;
  }
  @keyframes mistRise {
    0%   { opacity: 0; transform: translateX(-50%) translateY(40px); }
    50%  { opacity: 1; }
    100% { opacity: 0.6; transform: translateX(-50%) translateY(-20px); }
  }

  /* Surface bois sous le livre */
  .magic-wood {
    position: absolute;
    bottom: 5%;
    left: 50%;
    transform: translateX(-50%);
    width: 90%;
    max-width: 900px;
    height: 25%;
    background:
      linear-gradient(180deg, transparent 0%, rgba(50, 25, 10, 0.4) 40%, rgba(30, 15, 5, 0.7) 100%),
      repeating-linear-gradient(90deg,
        rgba(80, 45, 20, 0.15) 0px,
        rgba(60, 30, 12, 0.1) 30px,
        rgba(80, 45, 20, 0.15) 60px,
        rgba(40, 22, 8, 0.18) 90px);
    filter: blur(2px);
    z-index: 0;
    opacity: 0.7;
  }

  /* Le livre — landscape, vu par le bas (camera below), centré */
  .book-3d {
    position: relative;
    width: 560px;       /* landscape */
    height: 380px;
    transform-style: preserve-3d;
    transform: rotateX(38deg);
    animation: bookEntrance 700ms cubic-bezier(0.34, 1.56, 0.64, 1) backwards;
    will-change: transform;
    margin: 0 auto;
  }

  @keyframes bookEntrance {
    from { opacity: 0; transform: rotateX(38deg) translateY(80px) scale(0.7); }
    to   { opacity: 1; transform: rotateX(38deg) translateY(0) scale(1); }
  }

  /* Pages internes du livre (visibles quand on tourne les pages) */
  .book-pages-bg {
    position: absolute;
    inset: 0;
    background:
      radial-gradient(ellipse at 50% 50%, #fdf3d6 0%, #f0d39a 70%, #d4a857 100%);
    border-radius: 4px;
    box-shadow:
      inset 0 0 60px rgba(120, 70, 20, 0.2),
      inset 4px 0 0 rgba(0, 0, 0, 0.12),
      0 0 30px rgba(255, 180, 80, 0.3);
    z-index: 0;
    overflow: hidden;
  }
  .book-pages-bg::before {
    content: "";
    position: absolute;
    left: 50%;
    top: 0; bottom: 0;
    width: 1px;
    background: rgba(77, 45, 135, 0.15);
  }

  /* Texte central révélé à la fin (centre de la double-page) */
  .pages-final-content {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    color: #6b3a14;
    font-family: 'Playfair Display', serif;
    font-style: italic;
    font-size: 0.9rem;
    opacity: 0;
    text-shadow: 0 0 20px rgba(255, 200, 100, 0.5);
    animation: pagesContentFade 400ms ease-out 2200ms forwards;
    z-index: 1;
  }

  @keyframes pagesContentFade {
    from { opacity: 0; transform: translateY(8px); }
    to   { opacity: 0.55; transform: translateY(0); }
  }

  /* ===== Pages animées (3 pages + couverture) ===== */
  .page-flip {
    position: absolute;
    inset: 0;
    border-radius: 4px 8px 8px 4px;
    transform-origin: left center;
    backface-visibility: visible;
    will-change: transform;
    transform-style: preserve-3d;
  }

  /* Conteneur de slices — lisse la sortie de la page (ombre longue + glint principal) */
  .page-flip > .slices {
    position: absolute;
    inset: 0;
    transform-style: preserve-3d;
    border-radius: inherit;
    overflow: hidden;
  }

  /* Slices NESTED — chaque slice contient le suivant, attaché à son bord droit.
     Quand le parent rotate, le child suit en restant attaché.
     Combiné avec une rotation propre, ça crée une vraie courbe articulée. */
  .page-flip .slice {
    position: absolute;
    top: 0;
    height: 100%;
    width: 33.34%;
    transform-style: preserve-3d;
    backface-visibility: visible;
    will-change: transform, filter;
    background: inherit;
    box-shadow: inset -1px 0 0 rgba(0,0,0,0.04);  /* pli léger entre slices */
  }
  .page-flip .slice.s-a { left: 0;    transform-origin: 0% 50%; }
  .page-flip .slice.s-b { left: 100%; transform-origin: 0% 50%; }  /* nesté dans s-a, à son bord droit */
  .page-flip .slice.s-c { left: 100%; transform-origin: 0% 50%; }  /* nesté dans s-b */

  /* Texture commune appliquée aux slices via background hérité du parent */

  /* Reflet de lumière (glint) qui balaie toute la page */
  .page-flip > .glint {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(115deg,
      transparent 22%,
      rgba(255,255,255,0.28) 44%,
      rgba(255,255,255,0.55) 50%,
      rgba(255,255,255,0.28) 56%,
      transparent 78%);
    transform: translateX(-120%);
    opacity: 0;
    pointer-events: none;
    mix-blend-mode: screen;
    will-change: transform, opacity;
    border-radius: inherit;
    z-index: 4;
  }

  /* Ombre de courbure (renforcée) — bords sombres + radial à gauche */
  .page-flip > .curve-shade {
    position: absolute;
    inset: 0;
    background:
      linear-gradient(to right,
        rgba(0,0,0,0.22) 0%,
        rgba(0,0,0,0.08) 8%,
        transparent 16%,
        transparent 80%,
        rgba(0,0,0,0.10) 92%,
        rgba(0,0,0,0.28) 100%),
      radial-gradient(ellipse at 0% 50%,
        rgba(0,0,0,0.18) 0%,
        transparent 45%),
      radial-gradient(ellipse at 100% 50%,
        rgba(255,255,255,0.06) 0%,
        transparent 50%);
    pointer-events: none;
    border-radius: inherit;
    z-index: 3;
  }

  /* Couverture droite — s'ouvre en premier */
  .cover-right {
    background:
      linear-gradient(135deg, #3a1f0a 0%, #6b3a14 35%, #a85e1f 65%, #d4912e 100%),
      radial-gradient(ellipse at 30% 30%, rgba(255,210,140,0.3) 0%, transparent 60%);
    background-blend-mode: overlay;
    box-shadow:
      0 30px 80px rgba(0, 0, 0, 0.7),
      0 0 80px rgba(212, 145, 46, 0.4),
      inset 0 0 40px rgba(80, 40, 10, 0.3);
    z-index: 10;
    animation: openCoverWrap 900ms cubic-bezier(0.65, 0, 0.35, 1) 600ms forwards;
  }
  .cover-right .slice.s-a { animation: sliceA 900ms cubic-bezier(0.65, 0, 0.35, 1) 600ms forwards; }
  .cover-right .slice.s-b { animation: sliceB 900ms cubic-bezier(0.65, 0, 0.35, 1) 660ms forwards; }
  .cover-right .slice.s-c { animation: sliceC 900ms cubic-bezier(0.65, 0, 0.35, 1) 720ms forwards; }

  /* Page 1 : crème, contient un peu de texte */
  .page-1 {
    background: linear-gradient(95deg, #fdf3d6 0%, #f0d39a 50%, #e6c178 100%);
    box-shadow:
      0 20px 60px rgba(0, 0, 0, 0.4),
      inset 4px 0 8px rgba(0, 0, 0, 0.05);
    z-index: 9;
    animation: turnPageWrap 800ms cubic-bezier(0.65, 0, 0.35, 1) 1100ms forwards;
  }
  .page-1 .slice.s-a { animation: sliceA 800ms cubic-bezier(0.65, 0, 0.35, 1) 1100ms forwards; }
  .page-1 .slice.s-b { animation: sliceB 800ms cubic-bezier(0.65, 0, 0.35, 1) 1150ms forwards; }
  .page-1 .slice.s-c { animation: sliceC 800ms cubic-bezier(0.65, 0, 0.35, 1) 1200ms forwards; }

  /* Page 2 : crème plus chaude */
  .page-2 {
    background: linear-gradient(95deg, #fdecc4 0%, #ecc77f 50%, #d4a857 100%);
    box-shadow:
      0 20px 60px rgba(0, 0, 0, 0.35),
      inset 4px 0 8px rgba(0, 0, 0, 0.05);
    z-index: 8;
    animation: turnPageWrap 700ms cubic-bezier(0.65, 0, 0.35, 1) 1450ms forwards;
  }
  .page-2 .slice.s-a { animation: sliceA 700ms cubic-bezier(0.65, 0, 0.35, 1) 1450ms forwards; }
  .page-2 .slice.s-b { animation: sliceB 700ms cubic-bezier(0.65, 0, 0.35, 1) 1495ms forwards; }
  .page-2 .slice.s-c { animation: sliceC 700ms cubic-bezier(0.65, 0, 0.35, 1) 1540ms forwards; }

  /* Page 3 : presque blanche, dernière à se tourner */
  .page-3 {
    background: linear-gradient(95deg, #fef0d8 0%, #f5d8a0 50%, #d8b16f 100%);
    box-shadow:
      0 20px 60px rgba(0, 0, 0, 0.3),
      inset 4px 0 8px rgba(0, 0, 0, 0.04);
    z-index: 7;
    animation: turnPageWrap 650ms cubic-bezier(0.65, 0, 0.35, 1) 1750ms forwards;
  }
  .page-3 .slice.s-a { animation: sliceA 650ms cubic-bezier(0.65, 0, 0.35, 1) 1750ms forwards; }
  .page-3 .slice.s-b { animation: sliceB 650ms cubic-bezier(0.65, 0, 0.35, 1) 1790ms forwards; }
  .page-3 .slice.s-c { animation: sliceC 650ms cubic-bezier(0.65, 0, 0.35, 1) 1830ms forwards; }

  /* Animation conteneur : pas de rotation propre, les slices nestées font tout le travail */
  @keyframes openCoverWrap {
    0%, 100% { opacity: 1; }
  }
  @keyframes turnPageWrap {
    0%, 100% { opacity: 1; }
  }

  /* Animation des slices NESTED — finissent en position ouverte (livre reste ouvert).
     Au pic mid-rotation : chaque slice a un angle légèrement différent → courbe.
     À 100% : toutes les slices arrivent à environ -56°, -7°, -5° cumulés = -68° total = livre ouvert plat. */

  /* sliceA = slice base (la plus "ancrée") — rotation principale, reste à -56° */
  @keyframes sliceA {
    0%   { transform: rotateY(0deg);    filter: blur(0); }
    20%  { transform: rotateY(-30deg);  filter: blur(2px); }
    50%  { transform: rotateY(-100deg); filter: blur(8px) drop-shadow(0 4px 14px rgba(255,200,100,0.2)); }
    80%  { transform: rotateY(-150deg); filter: blur(3px); }
    100% { transform: rotateY(-156deg); filter: blur(0); }
  }
  /* sliceB = nestée dans A, ajoute du bend — finit à -7° supplémentaire */
  @keyframes sliceB {
    0%   { transform: rotateY(0deg);   filter: blur(0); }
    20%  { transform: rotateY(-12deg); filter: blur(4px); }
    50%  { transform: rotateY(-30deg); filter: blur(14px) drop-shadow(0 6px 16px rgba(255,200,100,0.25)); }
    80%  { transform: rotateY(-15deg); filter: blur(5px); }
    100% { transform: rotateY(-7deg);  filter: blur(0); }
  }
  /* sliceC = nestée dans B, ajoute encore — finit à -5° */
  @keyframes sliceC {
    0%   { transform: rotateY(0deg);   filter: blur(0); }
    20%  { transform: rotateY(-8deg);  filter: blur(6px); }
    50%  { transform: rotateY(-22deg); filter: blur(20px) drop-shadow(0 8px 22px rgba(255,220,150,0.3)) drop-shadow(-10px 0 18px rgba(120,60,20,0.4)); }
    80%  { transform: rotateY(-10deg); filter: blur(7px); }
    100% { transform: rotateY(-5deg);  filter: blur(0); }
  }

  /* Reflet de lumière qui balaie la page pendant la rotation */
  @keyframes glintSweep {
    0%   { opacity: 0; transform: translateX(-120%); }
    20%  { opacity: 0.6; }
    50%  { opacity: 1; transform: translateX(20%); }
    75%  { opacity: 0.5; }
    100% { opacity: 0; transform: translateX(140%); }
  }

  
  /* Glint sur le div.glint dédié */
  .cover-right > .glint { animation: glintSweep 900ms ease-in-out 600ms forwards; }
  .page-1 > .glint { animation: glintSweep 800ms ease-in-out 1100ms forwards; }
  .page-2 > .glint { animation: glintSweep 700ms ease-in-out 1450ms forwards; }
  .page-3 > .glint { animation: glintSweep 650ms ease-in-out 1750ms forwards; }

  /* Couverture gauche (statique, dos du livre) */
  .cover-left {
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, #3a1f0a 0%, #6b3a14 35%, #a85e1f 65%, #d4912e 100%);
    border-radius: 4px;
    box-shadow:
      0 30px 80px rgba(0, 0, 0, 0.7),
      inset 4px 0 0 rgba(255, 220, 160, 0.08),
      inset -4px 0 0 rgba(0, 0, 0, 0.3);
    transform-origin: right center;
    z-index: 1;
  }

  /* Contenu de la couverture droite (visible en repos) */
  .cover-content {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 48px 24px;
    text-align: center;
    color: #fff;
    backface-visibility: hidden;
  }

  .cover-frame {
    border: 1px solid rgba(255, 220, 160, 0.35);
    padding: 48px 24px;
    box-shadow: inset 0 0 40px rgba(255, 200, 100, 0.1);
    width: calc(100% - 32px);
    height: calc(100% - 32px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 16px; left: 16px;
  }

  .cover-eyebrow {
    font-family: 'Bricolage Grotesque', sans-serif;
    font-size: 0.55rem;
    letter-spacing: 0.4em;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.7);
    margin-bottom: 24px;
    font-weight: 600;
  }

  .cover-title {
    font-family: 'Playfair Display', serif;
    font-style: italic;
    font-weight: 400;
    font-size: 2.2rem;
    line-height: 1;
    color: #fff;
    margin-bottom: 20px;
  }

  .cover-tag {
    font-family: 'Playfair Display', serif;
    font-style: italic;
    font-size: 0.75rem;
    color: rgba(255, 255, 255, 0.7);
    margin-bottom: 32px;
    line-height: 1.4;
    max-width: 200px;
  }

  .cover-asterisk {
    font-family: 'Playfair Display', serif;
    font-size: 1rem;
    color: #ffd380;
    letter-spacing: 0.8em;
    opacity: 0.85;
    text-shadow: 0 0 12px rgba(255, 200, 100, 0.6);
  }

  /* Pages internes : chaque page peut avoir une légère décoration */
  .page-decor {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    color: rgba(180, 100, 30, 0.4);
    font-family: 'Playfair Display', serif;
    font-style: italic;
    font-size: 1rem;
    backface-visibility: hidden;
  }

  /* Glow autour du livre, pulse pendant l'animation */
  .book-3d::after {
    content: "";
    position: absolute;
    inset: -180px;
    background:
      radial-gradient(ellipse at center, rgba(255, 170, 60, 0.5) 0%, rgba(180, 100, 30, 0.2) 35%, transparent 70%),
      radial-gradient(ellipse at 50% 30%, rgba(255, 220, 130, 0.35) 0%, transparent 50%);
    z-index: -1;
    opacity: 0;
    animation: bookGlow 2700ms ease-in-out forwards;
    filter: blur(8px);
  }

  @keyframes bookGlow {
    0%, 20% { opacity: 0; }
    40%, 70% { opacity: 1; }
    100%   { opacity: 0; }
  }

  @keyframes introFadeOut {
    from {
      opacity: 1;
      transform: scale(1);
      filter: blur(0);
    }
    to {
      opacity: 0;
      transform: scale(1.4);
      filter: blur(20px);
      visibility: hidden;
    }
  }

  /* Hero : apparait derrière l'intro */
  .hero-wrap {
    opacity: 0;
    animation: heroReveal 800ms ease-out 2500ms forwards;
  }

  @keyframes heroReveal {
    from { opacity: 0; transform: scale(1.05); }
    to   { opacity: 1; transform: scale(1); }
  }

  /* ============================================================
     HERO : violet/mauve renforcé en arrière-plan
     ============================================================ */

  .hero-bg-blob1 {
    position: absolute;
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    width: 950px; height: 950px;
    /* Violet TRES sombre — quasi-noir-violet, dominante */
    background: rgba(28, 16, 58, 0.85);
    border-radius: 50%;
    filter: blur(140px);
    z-index: 0;
  }

  .hero-bg-blob2 {
    position: absolute;
    top: -100px; right: -150px;
    width: 600px; height: 600px;
    /* Highlight 8% plus clair seulement — subtil rehaut */
    background: rgba(48, 28, 92, 0.32);
    border-radius: 50%;
    filter: blur(110px);
    z-index: 0;
  }

  .hero-bg-blob3 {
    position: absolute;
    bottom: -150px; left: -100px;
    width: 700px; height: 700px;
    /* Magenta très sourd, presque éteint */
    background: rgba(120, 25, 65, 0.22);
    border-radius: 50%;
    filter: blur(130px);
    z-index: 0;
  }

  .hero-bg-violet-veil {
    position: absolute;
    inset: 0;
    /* Voile dark dominante avec léger éclaircissement central (5-10% lighter) */
    background:
      radial-gradient(ellipse at 50% 40%, rgba(50, 30, 95, 0.35) 0%, rgba(20, 12, 48, 0.55) 50%, transparent 80%);
    z-index: 0;
    pointer-events: none;
  }

  /* Sous le titre : projecteur sombre avec rehaut subtil (8% lighter max) */
  .hero-title-glow {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 760px;
    height: 320px;
    background: radial-gradient(ellipse, rgba(55, 32, 100, 0.45) 0%, rgba(28, 16, 58, 0.55) 35%, transparent 75%);
    filter: blur(70px);
    z-index: 0;
    pointer-events: none;
  }

  /* Reduce motion : skip l'intro */
  @media (prefers-reduced-motion: reduce) {
    .book-intro { display: none; }
    .hero-wrap { opacity: 1; animation: none; }
    body.intro-active { overflow: auto; height: auto; }
  }

  /* Mobile */
  @media (max-width: 768px) {
    .book-3d { width: 380px; height: 260px; transform: rotateX(38deg); }
    .cover-title { font-size: 1.4rem; }
    .cover-tag { font-size: 0.7rem; }
    .cover-frame { padding: 24px 14px; }
    .hero-bg-blob1 { width: 500px; height: 500px; }
    .hero-bg-blob2, .hero-bg-blob3 { width: 350px; height: 350px; }
  }

  /* === MOBILE HOME PATCHES === */
  @media (max-width: 899px) {
    .rw-burger { width: 44px !important; height: 44px !important; }
    .rw-cta-header { min-height: 38px !important; padding: 10px 16px !important; font-size: .82rem !important; }
    a.glow.inline-block, .hero-wrap a.glow {
      padding: 12px 22px !important; font-size: .9rem !important; min-height: 44px !important;
    }
  }
  @media (max-width: 359px) {
    .rw-cta-header { padding: 8px 12px !important; font-size: .72rem !important; }
    .rw-brand-mark { font-size: .85rem !important; }
    .rw-logo-img-home { width: 56px !important; height: 56px !important; }
  }


  /* === SAFE AREA + NO HORIZONTAL SCROLL === */
  html, body { overflow-x: hidden !important; }
  @supports (padding: env(safe-area-inset-bottom)) {
    body { padding-bottom: env(safe-area-inset-bottom); }
    .max-w-7xl { padding-left: max(24px, env(safe-area-inset-left)); padding-right: max(24px, env(safe-area-inset-right)); }
  }
  /* Force smaller media queries */
  @media (max-width: 380px) {
    .rw-cta-header { min-height: 36px; padding: 10px 14px !important; font-size: .78rem !important; }
    .rw-burger { min-width: 44px; min-height: 44px; }
  }


  .rw-skip-link{position:absolute;left:-9999px;top:0;background:#c21e5c;color:#fff;padding:14px 22px;z-index:100000;font-family:"Plus Jakarta Sans",sans-serif;text-decoration:none;border-radius:0 0 8px 0;font-weight:600}
  .rw-skip-link:focus{left:0;outline:3px solid #fff;outline-offset:-3px}
  *:focus-visible{outline:2px solid #e35c8a !important;outline-offset:2px}

</style>
<script type="application/ld+json">
{"@context":"https://schema.org","@graph":[{"@type":"Organization","name":"RevelaWorld","url":"https://darkslategrey-mantis-542142.hostingersite.com/","logo":"https://darkslategrey-mantis-542142.hostingersite.com/wp-content/uploads/2026/05/revelaworld-logo.png","description":"Salon littéraire numérique francophone — Les silences ont des mots.","foundingDate":"2012"},{"@type":"WebSite","name":"RevelaWorld","url":"https://darkslategrey-mantis-542142.hostingersite.com/","inLanguage":"fr-FR","potentialAction":{"@type":"SearchAction","target":{"@type":"EntryPoint","urlTemplate":"https://darkslategrey-mantis-542142.hostingersite.com/?s={search_term_string}"},"query-input":"required name=search_term_string"}}]}
</script>
</head>
<body class="bg-black text-white antialiased font-sans selection:bg-rw-magenta/40 selection:text-white">
<a class="rw-skip-link" href="#rw-main">Aller au contenu</a>

<!-- ===== INTRO LIVRE 3D : 4 ouvertures (couverture + 3 pages) ===== -->
<div class="book-intro" id="book-intro" aria-hidden="true">
  <div class="magic-wood"></div>
  <div class="magic-mist"></div>
  <div class="magic-particles"></div>
  <div class="book-3d">

    <!-- Pages internes statiques (révélées en arrière-plan) -->
    <div class="book-pages-bg">
      <div class="pages-final-content">
        <div>
          <p>✻</p>
          <p style="margin-top: 8px;">Bienvenue<br>au Salon</p>
        </div>
      </div>
    </div>

    <!-- Couverture gauche (dos statique) -->
    <div class="cover-left"></div>

    <!-- Page 3 (sous, dernière à se tourner) -->
    <div class="page-flip page-3">
      <div class="slices">
        <div class="slice s-a"><div class="slice s-b"><div class="slice s-c"></div></div></div>
      </div>
      <div class="curve-shade"></div>
      <div class="glint"></div>
      <div class="page-decor" style="z-index:5;position:relative">✻</div>
    </div>

    <!-- Page 2 -->
    <div class="page-flip page-2">
      <div class="slices">
        <div class="slice s-a"><div class="slice s-b"><div class="slice s-c"></div></div></div>
      </div>
      <div class="curve-shade"></div>
      <div class="glint"></div>
      <div class="page-decor" style="z-index:5;position:relative">✻ ✻</div>
    </div>

    <!-- Page 1 -->
    <div class="page-flip page-1">
      <div class="slices">
        <div class="slice s-a"><div class="slice s-b"><div class="slice s-c"></div></div></div>
      </div>
      <div class="curve-shade"></div>
      <div class="glint"></div>
      <div class="page-decor" style="z-index:5;position:relative">✻ ✻ ✻</div>
    </div>

    <!-- Couverture droite (s'ouvre en premier) -->
    <div class="page-flip cover-right">
      <div class="slices">
        <div class="slice s-a"><div class="slice s-b"><div class="slice s-c"></div></div></div>
      </div>
      <div class="curve-shade"></div>
      <div class="glint"></div>
      <div class="cover-content" style="z-index:5;position:absolute">
        <div class="cover-frame">
          <div class="cover-eyebrow">Salon littéraire</div>
          <div class="cover-title">Les silences ont<br>des mots.</div>
          <div class="cover-tag">Une œuvre par mois.<br>Un cercle qui la lit avec toi.</div>
          <div class="cover-asterisk">✻ ✻ ✻</div>
        </div>
      </div>
    </div>

  </div>
</div>

<!-- ===== MOCKUP A : SITE ===== -->

<header class="hero-wrap fixed top-0 left-0 right-0 z-40 backdrop-blur-xl bg-black/60 border-b border-white/5">
  <div class="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
    <a href="/" class="flex items-center" style="gap:1rem" aria-label="RevelaWorld - Accueil">
      <img src="/wp-content/uploads/2026/05/revelaworld-logo.png" alt="" class="rw-logo-img-home" loading="eager">
      <span class="rw-brand-mark">RevelaWorld</span>
    </a>
    <nav class="rw-nav-desktop" aria-label="Navigation principale">
      <a href="/oeuvre-du-mois/">L'œuvre du moment</a>
      <a href="/mur-des-premieres/">Les Pionnières</a> <a href="/rendez-vous/">Rendez-vous</a>
      <a href="/notre-salon/">Notre Salon</a>
      <a href="/faq/">FAQ</a>
    </nav>
    <button class="rw-burger" id="rw-burger-btn" type="button" aria-label="Ouvrir le menu" aria-expanded="false" aria-controls="rw-burger-overlay">
      <span></span><span></span><span></span>
    </button>
    <a href="/adhesion/" class="rw-cta-header">Entrer</a>
  </div>
</header>

<!-- Burger menu overlay (mobile) -->
<aside class="rw-burger-overlay" id="rw-burger-overlay" aria-label="Menu">
  <button class="rw-burger-close" id="rw-burger-close-btn" aria-label="Fermer le menu" type="button">
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round">
      <path d="M6 6L18 18M18 6L6 18"/>
    </svg>
  </button>
  <nav class="rw-burger-nav" aria-label="Navigation mobile">
    <a href="/oeuvre-du-mois/" class="rw-burger-link">L'œuvre du moment</a>
    <a href="/mur-des-premieres/" class="rw-burger-link">Les Pionnières</a> <a href="/rendez-vous/" class="rw-burger-link">Rendez-vous</a>
    <a href="/notre-salon/" class="rw-burger-link">Notre Salon</a>
    <a href="/le-cercle/" class="rw-burger-link">Le Cercle</a>
    <a href="/bibliotheque/" class="rw-burger-link">La Bibliothèque</a>
    <a href="/faq/" class="rw-burger-link">FAQ</a>
    <a href="/wp-login.php" class="rw-burger-link" style="font-size:1.3rem;color:#e35c8a">Se connecter</a>
    <a href="/adhesion/" class="rw-burger-cta">Entrer au Salon</a>
  </nav>
</aside>

<main id="rw-main" tabindex="-1">
<section class="hero-wrap relative pt-40 pb-32 overflow-hidden" style="padding-top:clamp(110px,18vh,180px)">
  <!-- ARRIÈRE-PLAN VIOLET RENFORCÉ -->
  <div class="absolute inset-0 grid-pattern opacity-50"></div>
  <div class="hero-bg-violet-veil"></div>
  <div class="hero-bg-blob1"></div>
  <div class="hero-bg-blob2"></div>
  <div class="hero-bg-blob3"></div>
  <div class="hero-title-glow"></div>

  <div class="relative max-w-5xl mx-auto px-6 text-center" style="z-index:1">
    <div class="inline-flex items-center gap-2 px-3 py-2.5.5 mb-8 bg-white/5 border border-white/10 rounded-full backdrop-blur">
      <span class="w-2 h-2 bg-rw-magenta rounded-full animate-pulse"></span>
      <span class="text-xs text-white/70 font-mono uppercase tracking-wider">Salon littéraire — depuis 2012</span>
    </div>

    <h1 class="rw-hero-title">
      Les silences ont<br>
      <span class="gradient-text">des mots.</span>
    </h1>

    <p class="text-xl text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed">
      À tout moment, une voix. Une histoire complète. Un cercle de lectrices qui la lit avec toi.
    </p>

    <div class="flex flex-wrap items-center justify-center gap-4 mb-6">
      <a href="/adhesion/" class="px-8 py-4 bg-rw-magenta text-white font-semibold rounded-full hover:bg-rw-magenta/90 transition glow">
        Devenir Pionnière — 100 places
      </a>
      <a href="/contact/?subject=Recevoir+les+extraits" class="px-8 py-4 text-white/80 font-semibold hover:text-white transition flex items-center gap-2">
        Recevoir des extraits
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
      </a>
    </div>

    <p class="text-sm text-white/50 italic">Encore <span class="text-rw-magenta-soft font-semibold not-italic">100</span> places sur 100.</p>
  </div>
</section>

<section class="hero-wrap border-y border-white/5 py-12">
  <div class="max-w-7xl mx-auto px-6">
    <p class="text-center text-xs uppercase tracking-[0.3em] text-white/30 mb-8">Voix au Salon depuis 14 ans</p>
    <div class="flex flex-wrap items-center justify-center gap-12 opacity-40">
      <span class="font-display text-2xl">Sénégal</span>
      <span class="font-display italic text-2xl">Côte d'Ivoire</span>
      <span class="font-display text-2xl">Mali</span>
      <span class="font-display italic text-2xl">Caraïbes</span>
      <span class="font-display text-2xl">Maghreb</span>
      <span class="font-display italic text-2xl">Diasporas</span>
    </div>
  </div>
</section>

<section class="hero-wrap py-32 px-6">
  <div class="max-w-7xl mx-auto">
    <div class="text-center mb-20">
      <h2 class="font-display text-5xl md:text-6xl font-bold tracking-tight mb-4">
        Au Salon, c'est <span class="italic text-rw-magenta-soft">différent.</span>
      </h2>
    </div>

    <div class="grid md:grid-cols-3 gap-6">
      <div class="p-8 bg-white/[0.03] border border-white/10 rounded-2xl hover:bg-white/[0.05] transition">
        <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-rw-violet to-rw-magenta mb-6 flex items-center justify-center text-white font-display font-bold text-xl">01</div>
        <h3 class="font-display text-2xl font-bold mb-3">Une œuvre complète</h3>
        <p class="text-white/60 leading-relaxed">Pas un feuilleton. Pas un teaser. Une histoire entière, écrite par une voix francophone, choisie par notre rédaction.</p>
      </div>

      <div class="p-8 bg-white/[0.03] border border-white/10 rounded-2xl hover:bg-white/[0.05] transition">
        <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-rw-violet to-rw-magenta mb-6 flex items-center justify-center text-white font-display font-bold text-xl">02</div>
        <h3 class="font-display text-2xl font-bold mb-3">Un Cercle qui lit avec toi</h3>
        <p class="text-white/60 leading-relaxed">Tu rejoins une communauté de lectrices. On en parle. Pour les Pionnières, l’auteure vient en direct à chaque sortie.</p>
      </div>

      <div class="p-8 bg-white/[0.03] border border-white/10 rounded-2xl hover:bg-white/[0.05] transition">
        <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-rw-violet to-rw-magenta mb-6 flex items-center justify-center text-white font-display font-bold text-xl">03</div>
        <h3 class="font-display text-2xl font-bold mb-3">La bibliothèque te suit</h3>
        <p class="text-white/60 leading-relaxed">Toutes les œuvres déjà parues restent à toi, pour toujours, tant que tu es membre.</p>
      </div>
    </div>
  </div>
</section>

<section class="hero-wrap relative py-32 px-6 overflow-hidden">
  <div class="absolute inset-0 bg-gradient-to-b from-rw-violet/20 to-rw-magenta/10"></div>
  <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-rw-violet/30 rounded-full blur-3xl"></div>

  <div class="relative max-w-4xl mx-auto text-center">
    <div class="inline-flex items-center gap-2 px-3 py-2.5.5 mb-8 bg-rw-magenta/20 border border-rw-magenta/30 rounded-full">
      <span class="text-xs text-rw-magenta-soft font-mono uppercase tracking-wider">L'offre fondatrice</span>
    </div>

    <h2 class="font-display text-5xl md:text-7xl font-bold tracking-tight mb-6">
      Les <span class="italic gradient-text">Pionnières</span>
    </h2>

    <p class="text-xl text-white/70 leading-relaxed mb-10 max-w-2xl mx-auto">
      100 places. 100 prénoms gravés sur le Mur. Le tarif lancement, <strong class="text-white">bloqué</strong>.
    </p>

    <div class="max-w-md mx-auto mb-10">
      <div class="h-2 bg-white/10 rounded-full overflow-hidden">
        <div class="h-full bg-gradient-to-r from-rw-violet to-rw-magenta rounded-full" style="width: 0%"></div>
      </div>
      <p class="text-sm text-white/60 mt-3 italic">0 sur 100 Pionnières — 100 places restantes</p>
    </div>

    <a href="/adhesion/" class="inline-block px-10 py-5 bg-rw-magenta text-white font-bold rounded-full hover:bg-rw-magenta/90 transition glow">
      Devenir Pionnière — Encore 100 places
    </a>

    <div class="grid md:grid-cols-2 gap-4 mt-16 max-w-2xl mx-auto text-left">
      <div class="flex items-start gap-3"><span class="text-rw-magenta-soft font-display font-bold">✻</span><p class="text-white/70 text-sm">Prénom gravé sur le Mur des Pionnières</p></div>
      <div class="flex items-start gap-3"><span class="text-rw-magenta-soft font-display font-bold">✻</span><p class="text-white/70 text-sm">Lettre signée par la voix du Salon à l'inscription</p></div>
      <div class="flex items-start gap-3"><span class="text-rw-magenta-soft font-display font-bold">✻</span><p class="text-white/70 text-sm">48 h d'avance sur chaque nouvelle œuvre</p></div>
      <div class="flex items-start gap-3"><span class="text-rw-magenta-soft font-display font-bold">✻</span><p class="text-white/70 text-sm">Lives privés : rencontre avec l’auteur·rice + Salon des Pionnières</p></div>
    </div>
  </div>
</section>

<div class="rw-landing-ad-placeholder" style="margin:64px auto;max-width:760px;padding:0 24px">
<!-- Slot publicitaire landing — gérer via wp-admin → Publicités (slot: landing) -->
<div class="rw-ad-loading" data-ad-slot="landing"></div>
</div>
<footer class="hero-wrap border-t border-white/5 py-16 px-6">
  <div class="max-w-7xl mx-auto">
    <div class="grid md:grid-cols-4 gap-8 mb-12">
      <div>
        <div class="flex items-center mb-4" style="gap:1rem">
          <img src="/wp-content/uploads/2026/05/revelaworld-logo.png" alt="" class="rw-logo-footer-home">
          <span class="rw-brand-mark-footer">RevelaWorld</span>
        </div>
        <p class="text-sm text-white/50 italic">Un sanctuaire où toute forme de silence retrouve la parole.</p>
      </div>
      <div>
        <h4 class="font-display text-rw-magenta-soft text-sm font-semibold mb-4 uppercase tracking-wider">Le Salon</h4>
        <ul class="space-y-2 text-sm text-white/60">
          <li><a href="/oeuvre-du-mois/" class="hover:text-white">L'œuvre du moment</a></li>
          <li><a href="/bibliotheque/" class="hover:text-white">La Bibliothèque</a></li>
          <li><a href="/le-cercle/" class="hover:text-white">Le Cercle</a></li>
          <li><a href="/mur-des-premieres/" class="hover:text-white">Le Mur des Pionnières</a></li> <li><a href="/rendez-vous/" class="hover:text-white">Les Rendez-vous</a></li>
        </ul>
      </div>
      <div>
        <h4 class="font-display text-rw-magenta-soft text-sm font-semibold mb-4 uppercase tracking-wider">La Maison</h4>
        <ul class="space-y-2 text-sm text-white/60">
          <li><a href="/notre-salon/" class="hover:text-white">Notre Salon</a></li>
          <li><a href="/manifeste/" class="hover:text-white">Manifeste</a></li>
          <li><a href="/soumettre-une-oeuvre/" class="hover:text-white">Soumettre une œuvre</a></li>
          <li><a href="/contact/" class="hover:text-white">Contact</a></li>
        </ul>
      </div>
      <div>
        <h4 class="font-display text-rw-magenta-soft text-sm font-semibold mb-4 uppercase tracking-wider">Pratique</h4>
        <ul class="space-y-2 text-sm text-white/60">
          <li><a href="/adhesion/" class="hover:text-white">Adhésion</a></li>
          <li><a href="/faq/" class="hover:text-white">FAQ</a></li>
          <li><a href="/conditions/" class="hover:text-white">Conditions</a></li>
          <li><a href="/confidentialite/" class="hover:text-white">Confidentialité</a></li>
        </ul>
      </div>
    </div>
    <div class="pt-8 border-t border-white/5 text-center text-xs text-white/40">
      © RevelaWorld, depuis 2012. <em class="text-rw-magenta-soft">Les silences ont des mots.</em>
      <br><span style="opacity:.55;font-size:.7rem">Identité &amp; site conçus par <a href="#" style="color:#e35c8a;text-decoration:none">Meejo Agency</a></span>
    </div>
  </div>
</footer>
</main>

</body>
</html>
EOT_RW_HOME;
        exit;
    }

    // ===== AUTRES PAGES : wrapper dark mode unifié =====
    if ( ! is_page() ) return;

    $post = get_post();
    if ( ! $post ) return;

    // Espace membre : auth requise
    if ( $post->ID == 129 && ! is_user_logged_in() ) {
        wp_safe_redirect( wp_login_url( get_permalink( $post ) ) );
        exit;
    }

    $title = get_the_title( $post );
    $excerpt = get_the_excerpt( $post );
    $content = apply_filters( 'the_content', $post->post_content );

    $eyebrows = array(
        36 => 'Notre Salon',
        37 => 'Adhésion',
        38 => 'FAQ',
        39 => "L'offre fondatrice",
        40 => 'Manifeste',
        41 => 'Soumissions',
        42 => 'Contact',
        43 => 'Légal',
        3  => 'Légal',
        45 => "L'œuvre du moment",
        46 => 'Bibliothèque',
        47 => 'Le Cercle',
        129 => 'Espace membre',
    );
    $eyebrow = isset( $eyebrows[ $post->ID ] ) ? $eyebrows[ $post->ID ] : 'Le Salon';

    $is_logged = is_user_logged_in();
    $member_link_html = $is_logged
        ? '<a href="/espace-membre/" class="rw-cta-ghost">Espace membre</a>'
        : '<a href="/wp-login.php" class="rw-cta-ghost">Se connecter</a>';

    nocache_headers();
    header( 'Content-Type: text/html; charset=utf-8' );

    ?>
<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title><?php echo esc_html( $title ); ?> — RevelaWorld</title>
<meta name="description" content="<?php echo esc_attr( $excerpt ); ?>">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,500;12..96,600;12..96,700;12..96,800&family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Playfair+Display:ital,wght@1,400;1,700&display=swap" rel="stylesheet">
<style>
:root{
--rw-noir:#050505;--rw-violet:#4d2d87;--rw-violet-deep:#1c1038;--rw-violet-darker:#140a28;
--rw-magenta:#c21e5c;--rw-magenta-soft:#e35c8a;--rw-violet-soft:#7d5fb4;
}
*,*::before,*::after{box-sizing:border-box}
html,body{margin:0;padding:0}
body{background:#050505;color:#fff;font-family:'Plus Jakarta Sans',system-ui,sans-serif;-webkit-font-smoothing:antialiased;line-height:1.6;font-size:17px}
::selection{background:rgba(194,30,92,.4);color:#fff}
a{color:#fff;text-decoration:none;transition:color .25s}
a:hover{color:#e35c8a}
img{max-width:100%;height:auto;border-radius:8px}
h1,h2,h3,h4{font-family:'Bricolage Grotesque',sans-serif;font-weight:700;letter-spacing:-.02em;line-height:1.1;color:#fff;margin:0}
h1{font-size:clamp(2.5rem,6vw,5rem);font-weight:800}
h2{font-size:clamp(1.8rem,3.5vw,2.6rem);margin:2.5rem 0 1.2rem}
h3{font-size:clamp(1.25rem,2.2vw,1.55rem);margin:2rem 0 .9rem}
h4{font-size:1.1rem;margin:1.5rem 0 .6rem}
p{color:rgba(255,255,255,.72);margin:0 0 1.2em;line-height:1.7}
strong{color:#fff;font-weight:600}
em{font-family:'Playfair Display',serif;font-style:italic;font-weight:400;color:#e35c8a}
ul,ol{color:rgba(255,255,255,.72);padding-left:1.4em;line-height:1.75}
li{margin-bottom:.5em}
li::marker{color:#e35c8a}
blockquote,.wp-block-quote{font-family:'Playfair Display',serif;font-style:italic;font-size:1.35rem;line-height:1.5;color:#fff;border-left:3px solid #c21e5c;padding:0 0 0 24px;margin:32px 0;background:transparent}
.wp-block-quote cite{display:block;margin-top:12px;font-size:.85rem;font-style:normal;color:rgba(255,255,255,.55);font-family:'Plus Jakarta Sans',sans-serif;letter-spacing:.05em}
.wp-block-quote cite::before{content:"— "}
hr,.wp-block-separator{border:none;border-top:1px solid rgba(255,255,255,.1);margin:48px auto;max-width:80px}
table{width:100%;border-collapse:collapse;margin:24px 0;font-size:.95rem}
th,td{padding:12px 16px;text-align:left;border-bottom:1px solid rgba(255,255,255,.08)}
th{font-family:'Bricolage Grotesque',sans-serif;text-transform:uppercase;letter-spacing:.05em;font-size:.8rem;color:#e35c8a}

/* Header */
.rw-h{position:fixed;top:0;left:0;right:0;z-index:40;backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);background:rgba(5,5,5,.65);border-bottom:1px solid rgba(255,255,255,.05)}
.rw-h-i{max-width:1280px;margin:0 auto;padding:14px 24px;display:flex;align-items:center;justify-content:space-between;gap:16px}
.rw-logo{display:flex;align-items:center;gap:8px}
.rw-logo-img{width:36px;height:36px;object-fit:contain;display:block}
.rw-logo-text{font-family:'Playfair Display',serif;font-style:italic;font-weight:700;font-size:1.35rem;letter-spacing:.005em;color:#fff;text-shadow:0 2px 12px rgba(194,30,92,.18);line-height:1}
.rw-logo{gap:10px!important}
.rw-nav{display:none;gap:28px;font-size:.9rem;color:rgba(255,255,255,.7)}
@media(min-width:900px){.rw-nav{display:flex}}
.rw-nav a{transition:color .25s}.rw-nav a:hover{color:#fff}
.rw-h-actions{display:flex;align-items:center;gap:10px}
.rw-cta-ghost{padding:8px 14px;font-size:.85rem;color:rgba(255,255,255,.75);border:1px solid rgba(255,255,255,.15);border-radius:999px;transition:.25s;white-space:nowrap}
.rw-cta-ghost:hover{color:#fff;border-color:rgba(255,255,255,.4);background:rgba(255,255,255,.03)}
.rw-cta{padding:9px 18px;background:#c21e5c;color:#fff;font-size:.85rem;font-weight:600;border-radius:999px;box-shadow:0 8px 22px rgba(194,30,92,.25);transition:.25s;white-space:nowrap}
.rw-cta:hover{background:#8e1543;transform:translateY(-1px);color:#fff}

/* Hero — violet sombre dominant + 5-10% rehaut */
.rw-hero{position:relative;padding:140px 24px 80px;overflow:hidden;text-align:center}
.rw-hero::before{content:"";position:absolute;inset:0;background-image:linear-gradient(to right,rgba(77,45,135,.05) 1px,transparent 1px),linear-gradient(to bottom,rgba(77,45,135,.05) 1px,transparent 1px);background-size:64px 64px;opacity:.5}
.rw-hero-blob1{position:absolute;top:-150px;left:50%;transform:translateX(-50%);width:900px;height:900px;background:rgba(28,16,58,.85);border-radius:50%;filter:blur(140px);pointer-events:none}
.rw-hero-blob2{position:absolute;top:-100px;right:-150px;width:520px;height:520px;background:rgba(48,28,92,.32);border-radius:50%;filter:blur(110px);pointer-events:none}
.rw-hero-blob3{position:absolute;bottom:-200px;left:-100px;width:600px;height:600px;background:rgba(120,25,65,.22);border-radius:50%;filter:blur(130px);pointer-events:none}
.rw-hero-veil{position:absolute;inset:0;background:radial-gradient(ellipse at 50% 40%,rgba(50,30,95,.35) 0%,rgba(20,12,48,.55) 50%,transparent 80%);pointer-events:none}
.rw-hero-inner{position:relative;max-width:840px;margin:0 auto;z-index:1}
.rw-eyebrow{display:inline-flex;align-items:center;gap:8px;padding:6px 14px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);border-radius:999px;backdrop-filter:blur(8px);margin-bottom:28px;font-size:.7rem;letter-spacing:.2em;text-transform:uppercase;color:rgba(255,255,255,.7);font-weight:500}
.rw-eyebrow::before{content:"";width:6px;height:6px;background:#c21e5c;border-radius:50%}
.rw-hero h1{margin-bottom:20px;text-shadow:0 6px 40px rgba(28,16,58,.85);font-family:'Playfair Display',serif!important;font-style:italic;font-weight:700;letter-spacing:-.015em}
.rw-hero-sub{font-size:1.2rem;color:rgba(255,255,255,.65);max-width:580px;margin:0 auto;line-height:1.6;font-style:italic;font-family:'Playfair Display',serif}

/* Body content (Gutenberg) */
.rw-body{max-width:780px;margin:0 auto;padding:60px 24px 80px}
.rw-body p{font-size:1.05rem}
.rw-body>p:first-child{font-size:1.15rem;color:rgba(255,255,255,.85);margin-bottom:32px}
.rw-body .wp-block-buttons{display:flex;gap:14px;flex-wrap:wrap;margin:36px 0}
.rw-body .wp-block-button{margin:0}
.rw-body .wp-block-button__link{display:inline-block;padding:14px 28px;background:#c21e5c!important;color:#fff!important;border-radius:999px!important;font-weight:600;font-size:.95rem;letter-spacing:.02em;box-shadow:0 8px 24px rgba(194,30,92,.25);transition:.25s;text-decoration:none}
.rw-body .wp-block-button__link:hover{background:#8e1543!important;transform:translateY(-2px);box-shadow:0 12px 32px rgba(194,30,92,.4)}
.rw-body .wp-block-button.is-style-outline .wp-block-button__link{background:transparent!important;border:1px solid rgba(255,255,255,.2)!important;color:#fff!important;box-shadow:none}
.rw-body .wp-block-button.is-style-outline .wp-block-button__link:hover{background:rgba(255,255,255,.05)!important;border-color:#e35c8a!important}
.rw-body .wp-block-group{background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.08);border-radius:18px;padding:32px;margin:28px 0;transition:.25s;backdrop-filter:blur(4px)}
.rw-body .wp-block-group:hover{background:rgba(255,255,255,.05);border-color:rgba(194,30,92,.25);transform:translateY(-2px)}
.rw-body .wp-block-group h3{margin-top:0}
.rw-body .wp-block-group p:last-child{margin-bottom:0}
.rw-body .wp-block-columns{margin:36px 0;gap:18px}
.rw-body .wp-block-column{padding:28px;background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.08);border-radius:16px;transition:.25s}
.rw-body .wp-block-column:hover{background:rgba(255,255,255,.05);border-color:rgba(194,30,92,.25)}
.rw-body .wp-block-column>*:first-child{margin-top:0}
.rw-body .wp-block-column>*:last-child{margin-bottom:0}
.rw-body a:not(.wp-block-button__link){color:#e35c8a;border-bottom:1px solid rgba(227,92,138,.3);padding-bottom:1px}
.rw-body a:not(.wp-block-button__link):hover{color:#fff;border-color:#fff}

/* FAQ : h3 + p suivant = paire question/réponse */
.rw-body h3+p{padding-bottom:24px;border-bottom:1px solid rgba(255,255,255,.06);color:rgba(255,255,255,.75)}

/* Hauteur logos / images centrées */
.wp-block-image{margin:32px 0}
.wp-block-image img{max-width:100%;border-radius:12px}

/* Listes mieux espacées */
.rw-body ul li,.rw-body ol li{margin-bottom:.65em}

/* Footer narratif */
.rw-f{border-top:1px solid rgba(255,255,255,.05);padding:80px 24px 32px;background:#050505;position:relative;overflow:hidden}
.rw-f::before{content:"";position:absolute;top:0;left:50%;transform:translateX(-50%);width:600px;height:200px;background:radial-gradient(ellipse,rgba(28,16,58,.4) 0%,transparent 70%);pointer-events:none}
.rw-f-i{max-width:1280px;margin:0 auto;position:relative}
.rw-f-sig{text-align:center;padding-bottom:48px;margin-bottom:48px;border-bottom:1px solid rgba(255,255,255,.05)}
.rw-f-sig h3{font-family:'Playfair Display',serif;font-style:italic;font-size:2.2rem;font-weight:700;margin:0 0 16px;color:#fff;letter-spacing:.005em}
.rw-f-sig p{margin:4px 0;color:rgba(255,255,255,.55);font-style:italic;font-family:'Playfair Display',serif;max-width:520px;margin-left:auto;margin-right:auto}
.rw-f-sig em{color:#fff}
.rw-f-cols{display:grid;gap:32px;grid-template-columns:1fr;margin-bottom:48px}
@media(min-width:768px){.rw-f-cols{grid-template-columns:repeat(3,1fr)}}
.rw-f-col h4{font-family:'Bricolage Grotesque',sans-serif;font-style:italic;color:#e35c8a;font-size:.85rem;font-weight:700;text-transform:uppercase;letter-spacing:.1em;margin:0 0 16px}
.rw-f-col ul{list-style:none;padding:0;margin:0}
.rw-f-col li{margin-bottom:8px}
.rw-f-col li::marker{content:""}
.rw-f-col a{color:rgba(255,255,255,.6);font-size:.95rem;transition:color .25s}
.rw-f-col a:hover{color:#fff}
.rw-f-base{text-align:center;padding-top:32px;border-top:1px solid rgba(255,255,255,.05);font-size:.78rem;color:rgba(255,255,255,.4)}
.rw-f-base em{color:#e35c8a;font-style:italic;font-family:'Playfair Display',serif}
</style>
</head>
<body>

<header class="rw-h">
<div class="rw-h-i">
<a href="/" class="rw-logo" aria-label="RevelaWorld"><img src="/wp-content/uploads/2026/05/revelaworld-logo.png" alt="" class="rw-logo-img"><span class="rw-logo-text">RevelaWorld</span></a>
<nav class="rw-nav" aria-label="Navigation">
<a href="/oeuvre-du-mois/">L'œuvre du moment</a>
<a href="/mur-des-premieres/">Les Pionnières</a> <a href="/rendez-vous/">Rendez-vous</a>
<a href="/notre-salon/">Notre Salon</a>
<a href="/faq/">FAQ</a>
</nav>
<div class="rw-h-actions">
<?php echo $member_link_html; ?>
<a href="/adhesion/" class="rw-cta">Entrer au Salon</a>
</div>
</div>
</header>

<section class="rw-hero">
<div class="rw-hero-blob1"></div>
<div class="rw-hero-blob2"></div>
<div class="rw-hero-blob3"></div>
<div class="rw-hero-veil"></div>
<div class="rw-hero-inner">
<div class="rw-eyebrow"><?php echo esc_html( $eyebrow ); ?></div>
<h1><?php echo esc_html( $title ); ?></h1>
<?php if ( $excerpt ) : ?>
<p class="rw-hero-sub"><?php echo esc_html( $excerpt ); ?></p>
<?php endif; ?>
</div>
</section>

<main class="rw-body">
<?php echo $content; ?>
</main>

<footer class="rw-f">
<div class="rw-f-i">
<div class="rw-f-sig">
<img src="/wp-content/uploads/2026/05/revelaworld-logo.png" alt="" class="rw-f-logo" style="width:80px;height:80px;display:block;margin:0 auto 16px;object-fit:contain">
<h3>RevelaWorld</h3>
<p>Un sanctuaire où toute forme de silence retrouve la parole.</p>
<p>Un monde où la parole et les mots libèrent.</p>
</div>
<div class="rw-f-cols">
<div class="rw-f-col">
<h4>Le Salon</h4>
<ul>
<li><a href="/oeuvre-du-mois/">L'œuvre du moment</a></li>
<li><a href="/bibliotheque/">La Bibliothèque</a></li>
<li><a href="/le-cercle/">Le Cercle</a></li>
<li><a href="/mur-des-premieres/">Le Mur des Pionnières</a></li> <li><a href="/rendez-vous/">Les Rendez-vous</a></li>
</ul>
</div>
<div class="rw-f-col">
<h4>La Maison</h4>
<ul>
<li><a href="/notre-salon/">Notre Salon</a></li>
<li><a href="/manifeste/">Manifeste</a></li>
<li><a href="/soumettre-une-oeuvre/">Soumettre une œuvre</a></li>
<li><a href="/contact/">Contact</a></li>
</ul>
</div>
<div class="rw-f-col">
<h4>Pratique</h4>
<ul>
<li><a href="/adhesion/">Adhésion</a></li>
<li><a href="/faq/">FAQ</a></li>
<li><a href="/conditions/">Conditions</a></li>
<li><a href="/confidentialite/">Confidentialité</a></li>
</ul>
</div>
</div>
<div class="rw-f-base">© RevelaWorld, depuis 2012. <em>Les silences ont des mots.</em><br><span style="opacity:.55;font-size:.72rem;display:inline-block;margin-top:6px">Identité &amp; site conçus par <a href="#" style="color:#e35c8a;text-decoration:none">Meejo Agency</a></span></div>
</div>
</footer>

<?php if ( $is_oeuvre_single ) : ?>
<aside class="rw-pcomment-drawer" id="rw-pcomment-drawer" aria-hidden="true">
<div class="rw-pcomment-drawer-head"><h3 class="rw-pcomment-drawer-title">Commentaires <em id="rw-pcomment-num"></em></h3><button class="rw-pcomment-drawer-close" id="rw-pcomment-close" type="button" aria-label="Fermer"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M6 6L18 18M18 6L6 18"/></svg></button></div>
<div class="rw-pcomment-quote" id="rw-pcomment-quote"></div>
<div class="rw-pcomment-list" id="rw-pcomment-list"></div>
<div id="rw-pcomment-form-wrap"></div>
</aside>
<div class="rw-pcomment-overlay" id="rw-pcomment-ovl"></div>
<script>
window.rwOeuvreData={oid:<?php echo (int) get_the_ID(); ?>,isLogged:<?php echo is_user_logged_in()?'true':'false'; ?>,isMember:<?php $m=current_user_can('manage_options')||(function_exists('pms_is_member')&&pms_is_member()); echo $m?'true':'false'; ?>,nonce:'<?php echo esc_js(wp_create_nonce('wp_rest')); ?>'};
(function(){var d=window.rwOeuvreData;var ps=document.querySelectorAll('.rw-body p[data-rw-p]');if(!ps.length)return;var dr=document.getElementById('rw-pcomment-drawer'),ov=document.getElementById('rw-pcomment-ovl'),cl=document.getElementById('rw-pcomment-close'),lst=document.getElementById('rw-pcomment-list'),qt=document.getElementById('rw-pcomment-quote'),nm=document.getElementById('rw-pcomment-num'),fw=document.getElementById('rw-pcomment-form-wrap');
if(d.isLogged&&d.isMember){fw.innerHTML='<form class="rw-pcomment-form" id="rw-pcomment-form"><textarea required maxlength="2000" placeholder="Partage ta pensée sur ce passage…"></textarea><div class="rw-pcomment-form-actions"><span class="rw-pcomment-hint">Lecture privée du Salon</span><button type="submit" class="rw-pcomment-submit">Publier</button></div></form>'}
else if(d.isLogged){fw.innerHTML='<div class="rw-pcomment-login"><p>Réservé aux membres du Salon — rejoins-nous pour commenter.</p><a href="/adhesion/">Devenir membre</a></div>'}
else{fw.innerHTML='<div class="rw-pcomment-login"><p>Connecte-toi pour partager ta pensée sur ce passage.</p><a href="/wp-login.php?redirect_to='+encodeURIComponent(location.href)+'">Se connecter</a></div>'}
var cur=null,data={paragraphs:{}};
function fmt(c){return '<div class="rw-pcomment-item"><img class="rw-pcomment-avatar" src="'+c.avatar+'" alt=""><div class="rw-pcomment-body"><span class="rw-pcomment-author">'+c.author+'</span><span class="rw-pcomment-date">'+c.date+'</span><div class="rw-pcomment-content">'+c.content+'</div></div></div>'}
function open(i,t){cur=i;nm.textContent='— passage n°'+i;qt.textContent='« '+t+' »';var its=data.paragraphs[i]||[];lst.innerHTML=its.length?its.map(fmt).join(''):'<p class="rw-pcomment-empty">Sois la pionnière à partager ta pensée.</p>';dr.classList.add('open');ov.classList.add('open');document.body.style.overflow='hidden'}
function close(){dr.classList.remove('open');ov.classList.remove('open');document.body.style.overflow='';cur=null}
ov.addEventListener('click',close);cl.addEventListener('click',close);window.addEventListener('keydown',function(e){if(e.key==='Escape')close()});
if(d.isLogged&&d.isMember){var fm=document.getElementById('rw-pcomment-form');fm.addEventListener('submit',function(e){e.preventDefault();if(cur===null)return;var ta=fm.querySelector('textarea'),btn=fm.querySelector('button'),ct=ta.value.trim();if(!ct)return;btn.disabled=true;btn.textContent='Envoi…';fetch('/wp-json/rw/v1/oeuvre/'+d.oid+'/paragraph/'+cur+'/comments',{method:'POST',credentials:'include',headers:{'Content-Type':'application/json','X-WP-Nonce':d.nonce},body:JSON.stringify({content:ct})}).then(function(r){return r.json()}).then(function(j){if(j&&j.comment){if(!data.paragraphs[cur])data.paragraphs[cur]=[];data.paragraphs[cur].push(j.comment);if(lst.querySelector('.rw-pcomment-empty'))lst.innerHTML='';lst.insertAdjacentHTML('beforeend',fmt(j.comment));ta.value='';refreshCount(cur)}else{alert('Erreur : '+(j.message||'commentaire non publié.'))}}).catch(function(){alert('Erreur réseau.')}).finally(function(){btn.disabled=false;btn.textContent='Publier'})})}
function refreshCount(i){var p=document.querySelector('p[data-rw-p="'+i+'"]');if(!p)return;var b=p.querySelector('.rw-pcomment-btn');var c=(data.paragraphs[i]||[]).length;if(b){b.querySelector('.rw-pcomment-count').textContent=c;b.classList.toggle('has-comments',c>0)}}
function btnHTML(c){return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg><span class="rw-pcomment-count">'+c+'</span>'}
ps.forEach(function(p){var i=parseInt(p.getAttribute('data-rw-p'),10);var b=document.createElement('button');b.type='button';b.className='rw-pcomment-btn';b.setAttribute('aria-label','Commenter ce passage');b.innerHTML=btnHTML(0);p.appendChild(b);b.addEventListener('click',function(e){e.preventDefault();var c=p.cloneNode(true);var x=c.querySelector('.rw-pcomment-btn');if(x)x.remove();open(i,c.textContent.trim().substring(0,200))})});
fetch('/wp-json/rw/v1/oeuvre/'+d.oid+'/comments').then(function(r){return r.json()}).then(function(j){data=j;Object.keys(data.paragraphs||{}).forEach(function(k){refreshCount(parseInt(k,10))})}).catch(function(){})})();
</script>
<?php endif; ?>
<script id="rw-intro-scroll-fix">setTimeout(function(){document.body.classList.remove("intro-active");document.body.style.overflow="";document.documentElement.style.overflow="";var bi=document.getElementById("book-intro");if(bi){bi.style.opacity="0";setTimeout(function(){bi.style.display="none";},800);}},4000);</script>
</body>
</html>
    <?php
    exit;
}, 1 );

// Helper : check si dans admin
if ( ! function_exists( 'is_user_logged_in_admin_area' ) ) {
    function is_user_logged_in_admin_area() {
        return is_admin();
    }
}