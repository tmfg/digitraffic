/***Write javascript under this line***/

/* Check if DOM is ready */
'use strict';

if (document.readyState !== 'loading') {
  init();
} else {
  document.addEventListener('DOMContentLoaded', init, false);
}

function init() {
  console.log("DOM ready");
  addToggleMenu();
}

/* Add .header--scrolled when scrolling page */
window.onscroll = function () {
  var headerClasses = document.body.querySelector(".header").classList;

  if (window.scrollY < 40) {
    if (headerClasses.contains("header--scrolled")) {
      headerClasses.remove("header--scrolled");
    }
  } else {
    if (!headerClasses.contains("header--scrolled")) {
      headerClasses.add("header--scrolled");
    }
  }
};

/* Open and close menu */
function addToggleMenu() {
  var menuElement = document.body.querySelector(".header-menu__item--menu");

  if (menuElement) {
    menuElement.addEventListener("click", function () {
      var headerClasses = document.body.querySelector(".header").classList;

      if (headerClasses.contains("header--menu-opened")) {
        headerClasses.remove("header--menu-opened");
      } else {
        headerClasses.add("header--menu-opened");
      }
    });
  }
}