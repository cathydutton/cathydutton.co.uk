/*
  Accessibility buttons
  Control buttons for colour theme and font 
  ----------------------------------- */

(function() {
    'use strict';

  // GLOBAL
  var body = document.body;

 
  // FONT
  // If no session storage value exists create one
  if (!fontFamily) {
    body.style.setProperty('font-family', sessionStorage.getItem('fontFamily')); 
  }

  // if (document.getElementById('dyslexic-font').classList.contains('null')) {
  //   sessionStorage.setItem("defaultFontClass", 'button--ally--active');
  // }


  // Get current value
  var fontFamily = getComputedStyle(body).getPropertyValue('font-family');


  // Set buttons
  var dyslexicFont = document.getElementById('dyslexic-font');
  var defaultFont = document.getElementById('default-font');

  defaultFont.className = sessionStorage.getItem('defaultFontClass');
  dyslexicFont.className = sessionStorage.getItem('dyslexicFontClass');


  // Dyslexic font family
  dyslexicFont.addEventListener('click', function (e) {
    body.style.setProperty('font-family', '"OpenDyslexic", sans-serif');
    defaultFont.classList.remove("button--ally--active");
    dyslexicFont.classList.add("button--ally--active");
    sessionStorage.setItem("dyslexicFontClass", 'button--ally--active');
    sessionStorage.removeItem("defaultFontClass");
    sessionStorage.setItem("fontFamily", '"OpenDyslexic", sans-serif');
  });

  // Default font family
  defaultFont.addEventListener('click', function (e) {
    body.style.setProperty('font-family', 'Verdana, Geneva, sans-serif');
    dyslexicFont.classList.remove("button--ally--active");
    defaultFont.classList.add("button--ally--active");
    sessionStorage.setItem("defaultFontClass", 'button--ally--active');
    sessionStorage.removeItem("dyslexicFontClass");
    sessionStorage.setItem("fontFamily", 'Verdana, Geneva, sans-serif');
  });


  // THEME

  // Set buttons
  var themeDefault = document.getElementById('theme-default');
  var themeMonochrome = document.getElementById('theme-monochrome');

  themeDefault.className = sessionStorage.getItem('themeDefaultClass');
  themeMonochrome.className = sessionStorage.getItem('themeMonochromeClass');

  body.className = sessionStorage.getItem('currentTheme');

  themeDefault.addEventListener('click', function (e) {
    body.className = 'theme-default';
    themeDefault.className = 'button--ally--active';
    themeMonochrome.className = '';
    sessionStorage.setItem("themeDefaultClass", 'button--ally--active');
    sessionStorage.setItem("themeMonochromeClass", '');
    sessionStorage.setItem("currentTheme", 'theme-default');
  });



  themeMonochrome.addEventListener('click', function (e) {
    body.className = 'theme-monochrome';
    themeDefault.className = '';
    themeMonochrome.className = 'button--ally--active';
    sessionStorage.setItem("themeDefaultClass", '');
    sessionStorage.setItem("themeMonochromeClass", 'button--ally--active');
    sessionStorage.setItem('currentTheme', 'theme-monochrome');
  });

})();