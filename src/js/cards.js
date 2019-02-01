/*
 Cards - Touch target
 Wrap an image, or article link, and text as one large touch target, 
 while using progressively enhanced, valid HTML and keeping 
 things fully accessible.

 https://codepen.io/svinkle/pen/yDAiG
  ----------------------------------- */

(function (document, window, undefined) {
  'use strict';

  // Vars
  var contentGroup = document.querySelectorAll('.js-content-group');

  // For each
  [].forEach.call(contentGroup, function (group, index) {
    // Vars
    var link = group.querySelector('a'),
      title = group.querySelector(['h2', 'h3']),
      text = group.querySelector('p');

    // Set attributes
    link.setAttribute('tabindex', '-1');
    title.setAttribute('id', 'group-title-' + index);
    text.setAttribute('id', 'group-text-' + index);
    text.setAttribute('aria-hidden', 'true');

    // Group "button" attibutes
    group.classList.add('clickable');
    group.setAttribute('tabindex', '0');
    group.setAttribute('role', 'link');
    group.setAttribute('aria-labelledby', 'group-title-' + index);
    group.setAttribute('aria-describedby', 'group-text-' + index);

    // Click event
    group.addEventListener('click', function () {
      window.location.href = this.getAttribute('data-url');
    }, false);

    // Keydown event
    group.addEventListener('keydown', function (event) {
      if (event.which === 13) {
        event.preventDefault();
        window.location.href = this.getAttribute('data-url');
      }
    }, false);
  });

})(document, window);