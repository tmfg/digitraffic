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
  parallax();
  addToggleMenu();
}


/* On scroll actions */
window.onscroll = () => {

  /* Add parallax effect */
  parallax();
  
  // Add .header--scrolled when scrolling page, remove when scrolled to top
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
  const headerContentWrapperClasses = document.body.querySelector(".header__content-wrapper").classList;
  const bodyClasses = document.body.classList;
  
  if (headerClasses.contains("header--menu-opened")) {
    headerClasses.add("header--menu-closing");
    headerContentWrapperClasses.add("header__content-wrapper--menu-closing");
    headerClasses.remove("header--menu-opened");
    setTimeout( () => {
      headerClasses.remove("header--menu-closing");
      },
      150
    );
    setTimeout( () => {
      headerContentWrapperClasses.remove("header__content-wrapper--menu-closing");
      },
      300
    );
    bodyClasses.remove("u--disable-scroll-mobile");
  } else {
    headerClasses.add("header--menu-opening");
    setTimeout( () => {
      headerClasses.add("header--menu-opened");
      headerClasses.remove("header--menu-opening");
      },
      1
    );
    bodyClasses.add("u--disable-scroll-mobile");
  }
}

function closeMenu() {
  const headerClasses = document.body.querySelector(".header").classList;
  const headerContentWrapperClasses = document.body.querySelector(".header__content-wrapper").classList;
  const bodyClasses = document.body.classList;
  
  if (headerClasses.contains("header--menu-opened")) {
    headerClasses.add("header--menu-closing");
    headerContentWrapperClasses.add("header__content-wrapper--menu-closing");
    headerClasses.remove("header--menu-opened");
    setTimeout( () => {
      headerClasses.remove("header--menu-closing");
      },
      150
    );
    setTimeout( () => {
      headerContentWrapperClasses.remove("header__content-wrapper--menu-closing");
      },
      300
    );
    bodyClasses.remove("u--disable-scroll-mobile");
  }
}

/* Parallax function for elements with css class ".parallax" */
function parallax() {
  Array.from(document.body.querySelectorAll('.parallax')).forEach(element => {
    let elementCenter = (element.getBoundingClientRect().bottom - element.getBoundingClientRect().top) / 2 + element.getBoundingClientRect().top;
    let windowCenter = window.innerHeight / 2;
    let diffFromCenter = elementCenter - windowCenter;
    let translateY = diffFromCenter / 15;
    element.style.transform = "translate(0, " + translateY + "px)";
  });
}