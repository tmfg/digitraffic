---
---
/***Write javascript under this line***/

/* Check if DOM is ready */
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
window.onscroll = () => {
  const headerClasses = document.body.querySelector(".header").classList;
  
  if (window.scrollY < 40) {
    if (headerClasses.contains("header--scrolled")) {
      headerClasses.remove("header--scrolled");
    }
  } else {
    if (!headerClasses.contains("header--scrolled")) {
      headerClasses.add("header--scrolled");
    }
  }
}

/* Open and close menu */
function addToggleMenu() {
  let menuElement = document.body.querySelector(".header-menu__item--menu");
  let outsideMenu = document.body.querySelector(".content");
  
  menuElement.addEventListener("click", toggleMenu);
  outsideMenu.addEventListener("click", closeMenu);
}

function toggleMenu() {
  const headerClasses = document.body.querySelector(".header").classList;
  const bodyClasses = document.body.classList;
  
  if (headerClasses.contains("header--menu-opened")) {
    headerClasses.remove("header--menu-opened");
    bodyClasses.remove("u--disable-scroll-mobile");
  } else {
    headerClasses.add("header--menu-opened");
    bodyClasses.add("u--disable-scroll-mobile");
  }
}

function closeMenu() {
  const headerClasses = document.body.querySelector(".header").classList;
  const bodyClasses = document.body.classList;

  if (headerClasses.contains("header--menu-opened")) {
    headerClasses.remove("header--menu-opened");
    bodyClasses.remove("u--disable-scroll-mobile");
  }
}