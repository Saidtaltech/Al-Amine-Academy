/* ========================================================================
   AAA Modern Reveal — IntersectionObserver scroll animations
   Active automatiquement les classes .reveal une fois visibles.
   ======================================================================== */
(function () {
  'use strict';

  function init() {
    var reduced = window.matchMedia &&
                  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    var els = document.querySelectorAll('.reveal:not(.is-visible)');
    if (!els.length) return;

    // Reduced motion or no IntersectionObserver support → reveal immediately
    if (reduced || !('IntersectionObserver' in window)) {
      for (var i = 0; i < els.length; i++) els[i].classList.add('is-visible');
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
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
