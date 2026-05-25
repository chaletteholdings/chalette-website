// Mobile nav toggle. Vanilla JS, no deps.
// Used by index.html, security.html, security-detail.html.

(function () {
  'use strict';

  var toggle = document.querySelector('.nav-toggle');
  var menu = document.getElementById('mobile-menu');
  if (!toggle || !menu) return;

  function setOpen(open) {
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    if (open) {
      menu.removeAttribute('hidden');
      document.body.classList.add('nav-open');
    } else {
      menu.setAttribute('hidden', '');
      document.body.classList.remove('nav-open');
    }
  }

  toggle.addEventListener('click', function () {
    var isOpen = toggle.getAttribute('aria-expanded') === 'true';
    setOpen(!isOpen);
  });

  // Close the menu whenever a link inside it is tapped.
  menu.addEventListener('click', function (e) {
    var target = e.target;
    while (target && target !== menu) {
      if (target.tagName === 'A') {
        setOpen(false);
        return;
      }
      target = target.parentNode;
    }
  });

  // Close on Escape.
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      setOpen(false);
      toggle.focus();
    }
  });

  // Reset state if the viewport crosses the desktop breakpoint.
  var mql = window.matchMedia('(min-width: 880px)');
  function onChange(e) {
    if (e.matches) setOpen(false);
  }
  if (mql.addEventListener) mql.addEventListener('change', onChange);
  else if (mql.addListener) mql.addListener(onChange); // older Safari
})();
