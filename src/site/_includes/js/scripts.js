/*
  Accessibility buttons
  Control buttons for colour theme and font 
  ----------------------------------- */

(function() {
    'use strict';

  // GLOBAL
  var body = document.body;

  
  // FONT
  // If no local storage value exists create one
  if (!fontFamily) {
      body.style.setProperty('font-family', localStorage.getItem('fontFamily'));
  }

  // Get current value
  var fontFamily = getComputedStyle(body).getPropertyValue('font-family');

  // Set buttons
  var dyslexicFont = document.getElementById('dyslexic-font');
  var defaultFont = document.getElementById('default-font');

  // Dyslexic font family
  dyslexicFont.addEventListener('click', function (e) {
    body.style.setProperty('font-family', '"OpenDyslexic", sans-serif');
    localStorage.setItem("fontFamily", '"OpenDyslexic", sans-serif');
  });

  // Default font family
  defaultFont.addEventListener('click', function (e) {
    body.style.setProperty('font-family', 'Verdana, Geneva, sans-serif');
    localStorage.setItem("fontFamily", 'Verdana, Geneva, sans-serif');
  });


  // THEME

  // Set buttons
  var themeDefault = document.getElementById('theme-default');
  var themeContrast = document.getElementById('theme-contrast');
  var themeMonochrome = document.getElementById('theme-monochrome');

  body.className = localStorage.getItem('currentTheme');

  themeDefault.addEventListener('click', function (e) {
    body.className = 'theme-default';
    localStorage.setItem("currentTheme", 'theme-default');
  });

  themeContrast.addEventListener('click', function (e) {
    body.className = 'theme-contrast';
    localStorage.setItem('currentTheme', 'theme-contrast');
  });

  themeMonochrome.addEventListener('click', function (e) {
    body.className = 'theme-monochrome';
    localStorage.setItem('currentTheme', 'theme-monochrome');
  });

})();
/*
 Lazy load images
 

 https://github.com/aFarkas/lazysizes
  ----------------------------------- */

  (function(window, factory) {
    var lazySizes = factory(window, window.document);
    window.lazySizes = lazySizes;
    if(typeof module == 'object' && module.exports){
      module.exports = lazySizes;
    }
  }(window, function l(window, document) {
    'use strict';
    /*jshint eqnull:true */
    if(!document.getElementsByClassName){return;}
  
    var lazysizes, lazySizesConfig;
  
    var docElem = document.documentElement;
  
    var Date = window.Date;
  
    var supportPicture = window.HTMLPictureElement;
  
    var _addEventListener = 'addEventListener';
  
    var _getAttribute = 'getAttribute';
  
    var addEventListener = window[_addEventListener];
  
    var setTimeout = window.setTimeout;
  
    var requestAnimationFrame = window.requestAnimationFrame || setTimeout;
  
    var requestIdleCallback = window.requestIdleCallback;
  
    var regPicture = /^picture$/i;
  
    var loadEvents = ['load', 'error', 'lazyincluded', '_lazyloaded'];
  
    var regClassCache = {};
  
    var forEach = Array.prototype.forEach;
  
    var hasClass = function(ele, cls) {
      if(!regClassCache[cls]){
        regClassCache[cls] = new RegExp('(\\s|^)'+cls+'(\\s|$)');
      }
      return regClassCache[cls].test(ele[_getAttribute]('class') || '') && regClassCache[cls];
    };
  
    var addClass = function(ele, cls) {
      if (!hasClass(ele, cls)){
        ele.setAttribute('class', (ele[_getAttribute]('class') || '').trim() + ' ' + cls);
      }
    };
  
    var removeClass = function(ele, cls) {
      var reg;
      if ((reg = hasClass(ele,cls))) {
        ele.setAttribute('class', (ele[_getAttribute]('class') || '').replace(reg, ' '));
      }
    };
  
    var addRemoveLoadEvents = function(dom, fn, add){
      var action = add ? _addEventListener : 'removeEventListener';
      if(add){
        addRemoveLoadEvents(dom, fn);
      }
      loadEvents.forEach(function(evt){
        dom[action](evt, fn);
      });
    };
  
    var triggerEvent = function(elem, name, detail, noBubbles, noCancelable){
      var event = document.createEvent('CustomEvent');
  
      if(!detail){
        detail = {};
      }
  
      detail.instance = lazysizes;
  
      event.initCustomEvent(name, !noBubbles, !noCancelable, detail);
  
      elem.dispatchEvent(event);
      return event;
    };
  
    var updatePolyfill = function (el, full){
      var polyfill;
      if( !supportPicture && ( polyfill = (window.picturefill || lazySizesConfig.pf) ) ){
        if(full && full.src && !el[_getAttribute]('srcset')){
          el.setAttribute('srcset', full.src);
        }
        polyfill({reevaluate: true, elements: [el]});
      } else if(full && full.src){
        el.src = full.src;
      }
    };
  
    var getCSS = function (elem, style){
      return (getComputedStyle(elem, null) || {})[style];
    };
  
    var getWidth = function(elem, parent, width){
      width = width || elem.offsetWidth;
  
      while(width < lazySizesConfig.minSize && parent && !elem._lazysizesWidth){
        width =  parent.offsetWidth;
        parent = parent.parentNode;
      }
  
      return width;
    };
  
    var rAF = (function(){
      var running, waiting;
      var firstFns = [];
      var secondFns = [];
      var fns = firstFns;
  
      var run = function(){
        var runFns = fns;
  
        fns = firstFns.length ? secondFns : firstFns;
  
        running = true;
        waiting = false;
  
        while(runFns.length){
          runFns.shift()();
        }
  
        running = false;
      };
  
      var rafBatch = function(fn, queue){
        if(running && !queue){
          fn.apply(this, arguments);
        } else {
          fns.push(fn);
  
          if(!waiting){
            waiting = true;
            (document.hidden ? setTimeout : requestAnimationFrame)(run);
          }
        }
      };
  
      rafBatch._lsFlush = run;
  
      return rafBatch;
    })();
  
    var rAFIt = function(fn, simple){
      return simple ?
        function() {
          rAF(fn);
        } :
        function(){
          var that = this;
          var args = arguments;
          rAF(function(){
            fn.apply(that, args);
          });
        }
      ;
    };
  
    var throttle = function(fn){
      var running;
      var lastTime = 0;
      var gDelay = lazySizesConfig.throttleDelay;
      var rICTimeout = lazySizesConfig.ricTimeout;
      var run = function(){
        running = false;
        lastTime = Date.now();
        fn();
      };
      var idleCallback = requestIdleCallback && rICTimeout > 49 ?
        function(){
          requestIdleCallback(run, {timeout: rICTimeout});
  
          if(rICTimeout !== lazySizesConfig.ricTimeout){
            rICTimeout = lazySizesConfig.ricTimeout;
          }
        } :
        rAFIt(function(){
          setTimeout(run);
        }, true)
      ;
  
      return function(isPriority){
        var delay;
  
        if((isPriority = isPriority === true)){
          rICTimeout = 33;
        }
  
        if(running){
          return;
        }
  
        running =  true;
  
        delay = gDelay - (Date.now() - lastTime);
  
        if(delay < 0){
          delay = 0;
        }
  
        if(isPriority || delay < 9){
          idleCallback();
        } else {
          setTimeout(idleCallback, delay);
        }
      };
    };
  
    //based on http://modernjavascript.blogspot.de/2013/08/building-better-debounce.html
    var debounce = function(func) {
      var timeout, timestamp;
      var wait = 99;
      var run = function(){
        timeout = null;
        func();
      };
      var later = function() {
        var last = Date.now() - timestamp;
  
        if (last < wait) {
          setTimeout(later, wait - last);
        } else {
          (requestIdleCallback || run)(run);
        }
      };
  
      return function() {
        timestamp = Date.now();
  
        if (!timeout) {
          timeout = setTimeout(later, wait);
        }
      };
    };
  
    (function(){
      var prop;
  
      var lazySizesDefaults = {
        lazyClass: 'lazyload',
        loadedClass: 'lazyloaded',
        loadingClass: 'lazyloading',
        preloadClass: 'lazypreload',
        errorClass: 'lazyerror',
        //strictClass: 'lazystrict',
        autosizesClass: 'lazyautosizes',
        srcAttr: 'data-src',
        srcsetAttr: 'data-srcset',
        sizesAttr: 'data-sizes',
        //preloadAfterLoad: false,
        minSize: 40,
        customMedia: {},
        init: true,
        expFactor: 1.5,
        hFac: 0.8,
        loadMode: 2,
        loadHidden: true,
        ricTimeout: 0,
        throttleDelay: 125,
      };
  
      lazySizesConfig = window.lazySizesConfig || window.lazysizesConfig || {};
  
      for(prop in lazySizesDefaults){
        if(!(prop in lazySizesConfig)){
          lazySizesConfig[prop] = lazySizesDefaults[prop];
        }
      }
  
      window.lazySizesConfig = lazySizesConfig;
  
      setTimeout(function(){
        if(lazySizesConfig.init){
          init();
        }
      });
    })();
  
    var loader = (function(){
      var preloadElems, isCompleted, resetPreloadingTimer, loadMode, started;
  
      var eLvW, elvH, eLtop, eLleft, eLright, eLbottom;
  
      var defaultExpand, preloadExpand, hFac;
  
      var regImg = /^img$/i;
      var regIframe = /^iframe$/i;
  
      var supportScroll = ('onscroll' in window) && !(/(gle|ing)bot/.test(navigator.userAgent));
  
      var shrinkExpand = 0;
      var currentExpand = 0;
  
      var isLoading = 0;
      var lowRuns = -1;
  
      var resetPreloading = function(e){
        isLoading--;
        if(e && e.target){
          addRemoveLoadEvents(e.target, resetPreloading);
        }
  
        if(!e || isLoading < 0 || !e.target){
          isLoading = 0;
        }
      };
  
      var isNestedVisible = function(elem, elemExpand){
        var outerRect;
        var parent = elem;
        var visible = getCSS(document.body, 'visibility') == 'hidden' || (getCSS(elem.parentNode, 'visibility') != 'hidden' && getCSS(elem, 'visibility') != 'hidden');
  
        eLtop -= elemExpand;
        eLbottom += elemExpand;
        eLleft -= elemExpand;
        eLright += elemExpand;
  
        while(visible && (parent = parent.offsetParent) && parent != document.body && parent != docElem){
          visible = ((getCSS(parent, 'opacity') || 1) > 0);
  
          if(visible && getCSS(parent, 'overflow') != 'visible'){
            outerRect = parent.getBoundingClientRect();
            visible = eLright > outerRect.left &&
              eLleft < outerRect.right &&
              eLbottom > outerRect.top - 1 &&
              eLtop < outerRect.bottom + 1
            ;
          }
        }
  
        return visible;
      };
  
      var checkElements = function() {
        var eLlen, i, rect, autoLoadElem, loadedSomething, elemExpand, elemNegativeExpand, elemExpandVal, beforeExpandVal;
  
        var lazyloadElems = lazysizes.elements;
  
        if((loadMode = lazySizesConfig.loadMode) && isLoading < 8 && (eLlen = lazyloadElems.length)){
  
          i = 0;
  
          lowRuns++;
  
          if(preloadExpand == null){
            if(!('expand' in lazySizesConfig)){
              lazySizesConfig.expand = docElem.clientHeight > 500 && docElem.clientWidth > 500 ? 500 : 370;
            }
  
            defaultExpand = lazySizesConfig.expand;
            preloadExpand = defaultExpand * lazySizesConfig.expFactor;
          }
  
          if(currentExpand < preloadExpand && isLoading < 1 && lowRuns > 2 && loadMode > 2 && !document.hidden){
            currentExpand = preloadExpand;
            lowRuns = 0;
          } else if(loadMode > 1 && lowRuns > 1 && isLoading < 6){
            currentExpand = defaultExpand;
          } else {
            currentExpand = shrinkExpand;
          }
  
          for(; i < eLlen; i++){
  
            if(!lazyloadElems[i] || lazyloadElems[i]._lazyRace){continue;}
  
            if(!supportScroll){unveilElement(lazyloadElems[i]);continue;}
  
            if(!(elemExpandVal = lazyloadElems[i][_getAttribute]('data-expand')) || !(elemExpand = elemExpandVal * 1)){
              elemExpand = currentExpand;
            }
  
            if(beforeExpandVal !== elemExpand){
              eLvW = innerWidth + (elemExpand * hFac);
              elvH = innerHeight + elemExpand;
              elemNegativeExpand = elemExpand * -1;
              beforeExpandVal = elemExpand;
            }
  
            rect = lazyloadElems[i].getBoundingClientRect();
  
            if ((eLbottom = rect.bottom) >= elemNegativeExpand &&
              (eLtop = rect.top) <= elvH &&
              (eLright = rect.right) >= elemNegativeExpand * hFac &&
              (eLleft = rect.left) <= eLvW &&
              (eLbottom || eLright || eLleft || eLtop) &&
              (lazySizesConfig.loadHidden || getCSS(lazyloadElems[i], 'visibility') != 'hidden') &&
              ((isCompleted && isLoading < 3 && !elemExpandVal && (loadMode < 3 || lowRuns < 4)) || isNestedVisible(lazyloadElems[i], elemExpand))){
              unveilElement(lazyloadElems[i]);
              loadedSomething = true;
              if(isLoading > 9){break;}
            } else if(!loadedSomething && isCompleted && !autoLoadElem &&
              isLoading < 4 && lowRuns < 4 && loadMode > 2 &&
              (preloadElems[0] || lazySizesConfig.preloadAfterLoad) &&
              (preloadElems[0] || (!elemExpandVal && ((eLbottom || eLright || eLleft || eLtop) || lazyloadElems[i][_getAttribute](lazySizesConfig.sizesAttr) != 'auto')))){
              autoLoadElem = preloadElems[0] || lazyloadElems[i];
            }
          }
  
          if(autoLoadElem && !loadedSomething){
            unveilElement(autoLoadElem);
          }
        }
      };
  
      var throttledCheckElements = throttle(checkElements);
  
      var switchLoadingClass = function(e){
        addClass(e.target, lazySizesConfig.loadedClass);
        removeClass(e.target, lazySizesConfig.loadingClass);
        addRemoveLoadEvents(e.target, rafSwitchLoadingClass);
        triggerEvent(e.target, 'lazyloaded');
      };
      var rafedSwitchLoadingClass = rAFIt(switchLoadingClass);
      var rafSwitchLoadingClass = function(e){
        rafedSwitchLoadingClass({target: e.target});
      };
  
      var changeIframeSrc = function(elem, src){
        try {
          elem.contentWindow.location.replace(src);
        } catch(e){
          elem.src = src;
        }
      };
  
      var handleSources = function(source){
        var customMedia;
  
        var sourceSrcset = source[_getAttribute](lazySizesConfig.srcsetAttr);
  
        if( (customMedia = lazySizesConfig.customMedia[source[_getAttribute]('data-media') || source[_getAttribute]('media')]) ){
          source.setAttribute('media', customMedia);
        }
  
        if(sourceSrcset){
          source.setAttribute('srcset', sourceSrcset);
        }
      };
  
      var lazyUnveil = rAFIt(function (elem, detail, isAuto, sizes, isImg){
        var src, srcset, parent, isPicture, event, firesLoad;
  
        if(!(event = triggerEvent(elem, 'lazybeforeunveil', detail)).defaultPrevented){
  
          if(sizes){
            if(isAuto){
              addClass(elem, lazySizesConfig.autosizesClass);
            } else {
              elem.setAttribute('sizes', sizes);
            }
          }
  
          srcset = elem[_getAttribute](lazySizesConfig.srcsetAttr);
          src = elem[_getAttribute](lazySizesConfig.srcAttr);
  
          if(isImg) {
            parent = elem.parentNode;
            isPicture = parent && regPicture.test(parent.nodeName || '');
          }
  
          firesLoad = detail.firesLoad || (('src' in elem) && (srcset || src || isPicture));
  
          event = {target: elem};
  
          if(firesLoad){
            addRemoveLoadEvents(elem, resetPreloading, true);
            clearTimeout(resetPreloadingTimer);
            resetPreloadingTimer = setTimeout(resetPreloading, 2500);
  
            addClass(elem, lazySizesConfig.loadingClass);
            addRemoveLoadEvents(elem, rafSwitchLoadingClass, true);
          }
  
          if(isPicture){
            forEach.call(parent.getElementsByTagName('source'), handleSources);
          }
  
          if(srcset){
            elem.setAttribute('srcset', srcset);
          } else if(src && !isPicture){
            if(regIframe.test(elem.nodeName)){
              changeIframeSrc(elem, src);
            } else {
              elem.src = src;
            }
          }
  
          if(isImg && (srcset || isPicture)){
            updatePolyfill(elem, {src: src});
          }
        }
  
        if(elem._lazyRace){
          delete elem._lazyRace;
        }
        removeClass(elem, lazySizesConfig.lazyClass);
  
        rAF(function(){
          if( !firesLoad || (elem.complete && elem.naturalWidth > 1)){
            if(firesLoad){
              resetPreloading(event);
            } else {
              isLoading--;
            }
            switchLoadingClass(event);
          }
        }, true);
      });
  
      var unveilElement = function (elem){
        var detail;
  
        var isImg = regImg.test(elem.nodeName);
  
        //allow using sizes="auto", but don't use. it's invalid. Use data-sizes="auto" or a valid value for sizes instead (i.e.: sizes="80vw")
        var sizes = isImg && (elem[_getAttribute](lazySizesConfig.sizesAttr) || elem[_getAttribute]('sizes'));
        var isAuto = sizes == 'auto';
  
        if( (isAuto || !isCompleted) && isImg && (elem[_getAttribute]('src') || elem.srcset) && !elem.complete && !hasClass(elem, lazySizesConfig.errorClass) && hasClass(elem, lazySizesConfig.lazyClass)){return;}
  
        detail = triggerEvent(elem, 'lazyunveilread').detail;
  
        if(isAuto){
           autoSizer.updateElem(elem, true, elem.offsetWidth);
        }
  
        elem._lazyRace = true;
        isLoading++;
  
        lazyUnveil(elem, detail, isAuto, sizes, isImg);
      };
  
      var onload = function(){
        if(isCompleted){return;}
        if(Date.now() - started < 999){
          setTimeout(onload, 999);
          return;
        }
        var afterScroll = debounce(function(){
          lazySizesConfig.loadMode = 3;
          throttledCheckElements();
        });
  
        isCompleted = true;
  
        lazySizesConfig.loadMode = 3;
  
        throttledCheckElements();
  
        addEventListener('scroll', function(){
          if(lazySizesConfig.loadMode == 3){
            lazySizesConfig.loadMode = 2;
          }
          afterScroll();
        }, true);
      };
  
      return {
        _: function(){
          started = Date.now();
  
          lazysizes.elements = document.getElementsByClassName(lazySizesConfig.lazyClass);
          preloadElems = document.getElementsByClassName(lazySizesConfig.lazyClass + ' ' + lazySizesConfig.preloadClass);
          hFac = lazySizesConfig.hFac;
  
          addEventListener('scroll', throttledCheckElements, true);
  
          addEventListener('resize', throttledCheckElements, true);
  
          if(window.MutationObserver){
            new MutationObserver( throttledCheckElements ).observe( docElem, {childList: true, subtree: true, attributes: true} );
          } else {
            docElem[_addEventListener]('DOMNodeInserted', throttledCheckElements, true);
            docElem[_addEventListener]('DOMAttrModified', throttledCheckElements, true);
            setInterval(throttledCheckElements, 999);
          }
  
          addEventListener('hashchange', throttledCheckElements, true);
  
          //, 'fullscreenchange'
          ['focus', 'mouseover', 'click', 'load', 'transitionend', 'animationend', 'webkitAnimationEnd'].forEach(function(name){
            document[_addEventListener](name, throttledCheckElements, true);
          });
  
          if((/d$|^c/.test(document.readyState))){
            onload();
          } else {
            addEventListener('load', onload);
            document[_addEventListener]('DOMContentLoaded', throttledCheckElements);
            setTimeout(onload, 20000);
          }
  
          if(lazysizes.elements.length){
            checkElements();
            rAF._lsFlush();
          } else {
            throttledCheckElements();
          }
        },
        checkElems: throttledCheckElements,
        unveil: unveilElement
      };
    })();
  
  
    var autoSizer = (function(){
      var autosizesElems;
  
      var sizeElement = rAFIt(function(elem, parent, event, width){
        var sources, i, len;
        elem._lazysizesWidth = width;
        width += 'px';
  
        elem.setAttribute('sizes', width);
  
        if(regPicture.test(parent.nodeName || '')){
          sources = parent.getElementsByTagName('source');
          for(i = 0, len = sources.length; i < len; i++){
            sources[i].setAttribute('sizes', width);
          }
        }
  
        if(!event.detail.dataAttr){
          updatePolyfill(elem, event.detail);
        }
      });
      var getSizeElement = function (elem, dataAttr, width){
        var event;
        var parent = elem.parentNode;
  
        if(parent){
          width = getWidth(elem, parent, width);
          event = triggerEvent(elem, 'lazybeforesizes', {width: width, dataAttr: !!dataAttr});
  
          if(!event.defaultPrevented){
            width = event.detail.width;
  
            if(width && width !== elem._lazysizesWidth){
              sizeElement(elem, parent, event, width);
            }
          }
        }
      };
  
      var updateElementsSizes = function(){
        var i;
        var len = autosizesElems.length;
        if(len){
          i = 0;
  
          for(; i < len; i++){
            getSizeElement(autosizesElems[i]);
          }
        }
      };
  
      var debouncedUpdateElementsSizes = debounce(updateElementsSizes);
  
      return {
        _: function(){
          autosizesElems = document.getElementsByClassName(lazySizesConfig.autosizesClass);
          addEventListener('resize', debouncedUpdateElementsSizes);
        },
        checkElems: debouncedUpdateElementsSizes,
        updateElem: getSizeElement
      };
    })();
  
    var init = function(){
      if(!init.i){
        init.i = true;
        autoSizer._();
        loader._();
      }
    };
  
    lazysizes = {
      cfg: lazySizesConfig,
      autoSizer: autoSizer,
      loader: loader,
      init: init,
      uP: updatePolyfill,
      aC: addClass,
      rC: removeClass,
      hC: hasClass,
      fire: triggerEvent,
      gW: getWidth,
      rAF: rAF,
    };
  
    return lazysizes;
  }
  ));

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
/*
Tabs
----------------------------------- */

/** This tab solution is based on Scott Vinkle's Simple Tabs with some modications to  remove the jQuery dependency, as well as modifying the UI look and feel.
*** https://codepen.io/svinkle/pen/edmDF
***/

(function() {
  'use strict';


  // Tabs
 
  var tabWidget = [].slice.call(document.querySelectorAll('.js-tabs')) || [];
  
  // Make URLs descriptive
  var tabLinkText = ["html", "css", "JavaScript"];
 
  var tabClickEvent = function(tabLink, tabLinks, tabPanels, linkIndex, e) {
 
    // Reset all the tablinks
    tabLinks.forEach(function(link) {
      link.setAttribute('tabindex', '-1');
      link.setAttribute('aria-selected', 'false');
      link.parentNode.removeAttribute('data-tab-active');
      link.removeAttribute('data-tab-active');
    });
 
    // set the active link attributes
    tabLink.setAttribute('tabindex', '0');
    tabLink.setAttribute('aria-selected', 'true');
    tabLink.parentNode.setAttribute('data-tab-active', '');
    tabLink.setAttribute('data-tab-active', '');
 
    // Change tab panel visibility
    tabPanels.forEach(function(panel, index) {
      if (index != linkIndex) {
        panel.setAttribute('aria-hidden', 'true');
        panel.removeAttribute('data-tab-active');
      } else {
        panel.setAttribute('aria-hidden', 'false');
        panel.setAttribute('data-tab-active', '');
      }
    });
  };
 
  var keyboardEvent = function(tabLink, tabLinks, tabPanels, tabItems, index, e) {
    var keyCode = e.key || e.which, // which property is deprecated, e.key is not fully supported
        currentTab = tabLinks[index],
        previousTab = tabLinks[index - 1],
        nextTab = tabLinks[index + 1],
        firstTab = tabLinks[0],
        lastTab = tabLinks[tabLinks.length - 1];
 
    // ArrowRight and ArrowLeft are the values when event.key is supported
    switch (keyCode) {
      case 'ArrowLeft':
      case 37:
        e.preventDefault();
 
        if (!previousTab) {
          lastTab.focus();
        } else {
          previousTab.focus();
        }
      break;
 
      case 'ArrowRight':
      case 39:
        e.preventDefault();
 
        if (!nextTab) {
            firstTab.focus();
          } else {
            nextTab.focus();
          }
        break;
    }
  };
 
  // set up tab widgets
  tabWidget.forEach(function(tabWidgetInstance, i) {
    var tabList = tabWidgetInstance.getElementsByTagName('ul')[0],
        tabItems = [].slice.call(tabList.getElementsByTagName('li')),
        tabLinks = [],
        tabPanels = [].slice.call(tabWidgetInstance.getElementsByTagName('div'));
 
    // Add accessibility roles and labels
    tabList.setAttribute('role','tablist');
    tabItems.forEach(function(item, index) {
      var link = item.getElementsByTagName('a')[0];
 
      tabLinks.push(link);
      item.setAttribute('role', 'presentation');
 
      if (index == 0) {
        item.setAttribute('data-tab-active', '');
      }
    });
 
    tabLinks.forEach(function(link, i) {
      var anchor = link.getAttribute('href').split('#')[1];
      var attributes = {
        //'id': 'tab-link-' + i,
        'id': 'tab-link-' + tabLinkText[i],
        'role': 'tab',
        'tabIndex': '-1',
        'aria-selected': 'false',
        'aria-controls': anchor
      };
 
      // if it's the first element update the attributes
      if (i == 0) {
        attributes['aria-selected'] = 'true';
        attributes.tabIndex = '0';
        link.setAttribute('data-tab-active', '');
      };
 
      // Add the various accessibility roles and labels to the links
      for (var key in attributes) {
        link.setAttribute(key, attributes[key]);
       }
       
      // Add next section link
         
      // Click Event Listener
       link.addEventListener('click', function(e) {
        e.preventDefault();
       });
       
       // Click Event Listener
       link.addEventListener('focus', function(e) {
        tabClickEvent(this, tabLinks, tabPanels, i, e);
       });
 
       // Keyboard event listener
       link.addEventListener('keydown', function(e) {
        keyboardEvent(link, tabLinks, tabPanels, tabItems, i, e);
       });
    });
 
    // set up tab panels
    tabPanels.forEach(function(panel, i) {
      var nextTabLink = document.createElement('a'),
          nextTabLinkIndex = (i < tabPanels.length - 1) ? i+1 : 0;
       
      var attributes = {
        'role': 'tabpanel',
        'aria-hidden': 'true',
        'aria-labelledby': 'tab-link-' + i
      };
       
      // set up next tab link
      //nextTabLink.setAttribute('href', '#tab-link-' + nextTabLinkIndex);
      nextTabLink.setAttribute('href', '#tab-link-' + tabLinkText[nextTabLinkIndex]);
      nextTabLink.setAttribute('class', 'anchor');
      nextTabLink.textContent = 'Next Tab';
      panel.appendChild(nextTabLink);
 
      if (i == 0) {
        attributes['aria-hidden'] = 'false';
        panel.setAttribute('data-tab-active', '');
      }
 
      for (var key in attributes) {
        panel.setAttribute(key, attributes[key]);
      }
    });
  });

 
})();
  
  
/*
 Touch target
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