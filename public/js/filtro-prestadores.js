// Filtro client-side para /prestadores
// Compatible con ISR cacheado en Vercel (no depende del bundling de Astro)

(function() {
  'use strict';

  var CLASES_CHIP_ACTIVO = 'px-3 py-1.5 rounded-full text-xs font-bold transition bg-emerald-500 text-slate-950';
  var CLASES_CHIP_INACTIVO = 'px-3 py-1.5 rounded-full text-xs font-bold transition bg-slate-900 border border-slate-800 text-slate-400 hover:border-emerald-500/40';

  function aplicarFiltro() {
    var filtro = new URLSearchParams(window.location.search).get('categoria');
    var cards = document.querySelectorAll('[data-card-cat]');
    var chips = document.querySelectorAll('[data-chip]');
    var contador = document.getElementById('contador-prestadores');
    var empty = document.getElementById('empty-filtro');

    var visibles = 0;
    cards.forEach(function(card) {
      var cat = card.getAttribute('data-card-cat');
      var visible = !filtro || cat === filtro;
      card.style.display = visible ? '' : 'none';
      if (visible) visibles++;
    });

    chips.forEach(function(chip) {
      var chipCat = chip.getAttribute('data-chip');
      var activo = (!filtro && !chipCat) || (filtro === chipCat);
      chip.className = activo ? CLASES_CHIP_ACTIVO : CLASES_CHIP_INACTIVO;
    });

    if (contador) {
      if (filtro) {
        contador.textContent = visibles === 1
          ? '1 profesional en esta categoría'
          : visibles + ' profesionales en esta categoría';
      } else {
        var total = cards.length;
        contador.textContent = total === 1
          ? '1 profesional verificado'
          : total + ' profesionales verificados';
      }
    }

    if (empty) {
      empty.style.display = visibles === 0 ? 'block' : 'none';
    }
  }

  // Ejecutar cuando el DOM esté listo
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', aplicarFiltro);
  } else {
    aplicarFiltro();
  }

  // Back/forward del navegador
  window.addEventListener('popstate', aplicarFiltro);

  // Interceptar clicks en chips
  document.querySelectorAll('[data-chip]').forEach(function(chip) {
    chip.addEventListener('click', function(e) {
      e.preventDefault();
      var cat = chip.getAttribute('data-chip');
      var url = cat ? '/prestadores?categoria=' + cat : '/prestadores';
      window.history.pushState({}, '', url);
      aplicarFiltro();
    });
  });
})();
