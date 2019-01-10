/*
 Skip link 
  ----------------------------------- */

(function () {
  'use strict';

  document.getElementById('js-skip-link').addEventListener('click', function (e) {
    e.preventDefault();
    var target = document.getElementById('js-skip-link-target');
    target.setAttribute('tabindex', '-1');
    target.focus();
  });

})();