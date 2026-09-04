/* ========================================================================
   AAA Modern Reveal — animations d'apparition par IntersectionObserver.
   Active les classes .reveal et les attributs [data-aos] une fois l'élément
   visible. Le support de data-aos remplace la bibliothèque AOS chargée depuis
   unpkg par cinq pages : mêmes attributs dans le HTML, deux requêtes tierces
   en moins, et les styles vivent dans site.css.
   ======================================================================== */
(function () {
  'use strict';

  function init() {
    var reduced = window.matchMedia &&
                  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    var els = document.querySelectorAll('.reveal:not(.is-visible), [data-aos]:not(.aos-animate)');
    if (!els.length) return;

    function show(el) {
      el.classList.add(el.hasAttribute('data-aos') ? 'aos-animate' : 'is-visible');
    }

    // Mouvement réduit ou pas d'IntersectionObserver → tout afficher tout de suite
    if (reduced || !('IntersectionObserver' in window)) {
      for (var i = 0; i < els.length; i++) show(els[i]);
      return;
    }

    /* Drapeau : à partir d'ici le CSS a le droit de masquer avant révélation. */
    document.documentElement.classList.add('aaa-reveal-ready');

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          show(entry.target);
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0, rootMargin: '80px 0px 200px 0px' });

    els.forEach(function (el) { io.observe(el); });
  }

  // Initial pass
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Re-scan after shell injection (navbar/footer inject DOM after DOMContentLoaded)
  window.addEventListener('load', init);
  // Expose for manual triggers if needed
  window.AAA_revealScan = init;
})();
