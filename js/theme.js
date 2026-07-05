/* Finta 2040 — shared theme bootstrap (light/dark)
   Include as early as possible in <head> to avoid a flash of wrong theme. */
(function () {
  var stored = null;
  try { stored = localStorage.getItem('finta-theme'); } catch (e) {}
  var theme = stored === 'light' || stored === 'dark'
    ? stored
    : (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
  document.documentElement.setAttribute('data-theme', theme);

  window.fintaToggleTheme = function () {
    var next = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', next);
    try { localStorage.setItem('finta-theme', next); } catch (e) {}
  };

  // Follow OS changes only while the user hasn't made an explicit choice
  if (!stored && window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', function (e) {
      var explicit = null;
      try { explicit = localStorage.getItem('finta-theme'); } catch (err) {}
      if (!explicit) document.documentElement.setAttribute('data-theme', e.matches ? 'light' : 'dark');
    });
  }
})();
