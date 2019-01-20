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
  
  