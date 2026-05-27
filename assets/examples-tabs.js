// Examples-page tab toggle. Two panes: scheduled vs on-demand.
// Activates based on URL hash so deep links to widget anchors
// inside either pane still open to the right tab — and we scroll
// to the deep-linked target after activation so it actually lands.

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
      t.setAttribute('tabindex', active ? '0' : '-1');
    });
    panes.forEach(function (p) {
      var active = p.id === targetId;
      // Use a class instead of [hidden]. [hidden] sets display:none, which
      // means the browser can't resolve the URL hash to a position at load
      // time — so deep-linking into a widget anchor inside the inactive
      // pane silently fails to scroll. The class hides via visibility +
      // sizing so the layout is still resolvable for scrollIntoView.
      p.classList.toggle('is-active-pane', active);
      p.classList.toggle('is-hidden-pane', !active);
      p.setAttribute('aria-hidden', active ? 'false' : 'true');
    });
    if (opts.scrollTarget) {
      var target = document.getElementById(opts.scrollTarget);
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  function focusTabByOffset(currentTab, offset) {
    var list = Array.prototype.slice.call(tabs);
    var i = list.indexOf(currentTab);
    if (i < 0) return;
    var next = list[(i + offset + list.length) % list.length];
    next.focus();
    next.click();
  }

  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      var targetId = tab.dataset.tabTarget;
      if (!targetId) return;
      activate(targetId);
      if (history.replaceState) {
        history.replaceState(null, '', '#' + targetId);
      }
    });
    tab.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        focusTabByOffset(tab, 1);
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        focusTabByOffset(tab, -1);
      } else if (e.key === 'Home') {
        e.preventDefault();
        tabs[0].focus();
        tabs[0].click();
      } else if (e.key === 'End') {
        e.preventDefault();
        tabs[tabs.length - 1].focus();
        tabs[tabs.length - 1].click();
      }
    });
  });

  // On load: open whichever pane contains the hash target, then —
  // if the hash points to something *inside* the pane (a widget
  // anchor like #w-pulse), scroll to that element specifically.
  var hashId = (window.location.hash || '').replace(/^#/, '');
  var initial = paneIdForHash(window.location.hash) || tabs[0].dataset.tabTarget;
  activate(initial);
  if (hashId && hashId !== initial) {
    // Defer one frame so the pane's is-active-pane styles are applied
    // before we ask the browser for the element's resolved position.
    requestAnimationFrame(function () {
      var deep = document.getElementById(hashId);
      if (deep) deep.scrollIntoView({ behavior: 'auto', block: 'start' });
    });
  }

  // If the hash changes (user clicks a day-timeline chip into a
  // widget that's in the other pane), switch panes and scroll to it.
  window.addEventListener('hashchange', function () {
    var newHashId = (window.location.hash || '').replace(/^#/, '');
    var id = paneIdForHash(window.location.hash);
    if (!id) return;
    activate(id, { scrollTarget: newHashId !== id ? newHashId : id });
  });
})();
