// Examples-page tab toggle. Two panes: scheduled vs on-demand.
// Activates based on URL hash so deep links to widget anchors
// inside either pane still open to the right tab.

(function () {
  var tabs = document.querySelectorAll('.examples-tab');
  var panes = document.querySelectorAll('[data-tab-pane]');
  if (!tabs.length || !panes.length) return;

  function paneIdForHash(hash) {
    if (!hash) return null;
    var id = hash.replace(/^#/, '');
    if (!id) return null;
    for (var i = 0; i < panes.length; i++) {
      if (panes[i].id === id) return panes[i].id;
      if (panes[i].querySelector('#' + CSS.escape(id))) return panes[i].id;
    }
    return null;
  }

  function activate(targetId, opts) {
    opts = opts || {};
    tabs.forEach(function (t) {
      var active = t.dataset.tabTarget === targetId;
      t.classList.toggle('is-active', active);
      t.setAttribute('aria-selected', active ? 'true' : 'false');
    });
    panes.forEach(function (p) {
      p.hidden = p.id !== targetId;
    });
    if (opts.scroll) {
      var pane = document.getElementById(targetId);
      if (pane) pane.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      var targetId = tab.dataset.tabTarget;
      if (!targetId) return;
      activate(targetId, { scroll: false });
      // Update hash without scrolling.
      if (history.replaceState) {
        history.replaceState(null, '', '#' + targetId);
      }
    });
  });

  // On load: activate whichever pane contains the hash target,
  // or default to the first tab.
  var initial = paneIdForHash(window.location.hash) || tabs[0].dataset.tabTarget;
  activate(initial, { scroll: false });

  // If the hash changes (e.g. user clicks a day-timeline chip into
  // a widget that's in the other pane), switch panes accordingly.
  window.addEventListener('hashchange', function () {
    var id = paneIdForHash(window.location.hash);
    if (id) activate(id, { scroll: true });
  });
})();
