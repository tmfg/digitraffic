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

  // Add parallax effect to elements with ".parallax" and to footer
  parallax();
  parallaxFooter();

  // Add menu event listeners
  addEventListeners();

  // If Service status section exists, get service status
  document.getElementById("service-status-section") ? getServiceStatus() : '';
}

/* On scroll actions */
window.onscroll = function () {

  // Add parallax effect
  parallax();
  parallaxFooter();

  // Add .header--scrolled when scrolling page, remove when scrolled to top
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

/* Add event listeners for menu, search and language */
function addEventListeners() {
  var menuElement = document.body.querySelector(".header-menu__item--menu");
  var searchElement = document.body.querySelector(".header-menu__item--search");
  var outsideMenu = document.body.querySelector(".content");

  menuElement.addEventListener("click", toggleMenu);
  searchElement.addEventListener("click", toggleSearch);
  outsideMenu.addEventListener("click", closeMenuSearchLanguage);
}

// Toggle menu function
function toggleMenu() {
  var headerClasses = document.body.querySelector(".header").classList;

  // Toggle menu
  if (headerClasses.contains("header--menu-opened")) {
    closeMenu();
  } else {
    // If search is opened, close it
    if (headerClasses.contains("header--search-opened")) {
      closeSearchQuick();
    }
    openMenu();
  }
}

// Toggle search function
function toggleSearch() {
  var headerClasses = document.body.querySelector(".header").classList;

  // Toggle search
  if (headerClasses.contains("header--search-opened")) {
    closeSearch();
  } else {
    // If menu is opened, close it
    if (headerClasses.contains("header--menu-opened")) {
      closeMenuQuick();
    }
    openSearch();
  }
}

// Close menu, search and language
function closeMenuSearchLanguage() {
  var headerClasses = document.body.querySelector(".header").classList;

  if (headerClasses.contains("header--menu-opened")) {
    closeMenu();
  }

  if (headerClasses.contains("header--search-opened")) {
    closeSearch();
  }
}

// Open menu
function openMenu() {
  var headerClasses = document.body.querySelector(".header").classList;
  var headerContentWrapperClasses = document.body.querySelector(".header__content-wrapper").classList;
  var bodyClasses = document.body.classList;

  headerClasses.add("header--menu-opening");
  bodyClasses.add("u--disable-scroll-mobile");
  setTimeout(function () {
    headerClasses.add("header--menu-opened");
    headerClasses.remove("header--menu-opening");
  }, 1);
}

// Close menu
function closeMenu() {
  var headerClasses = document.body.querySelector(".header").classList;
  var headerContentWrapperClasses = document.body.querySelector(".header__content-wrapper").classList;
  var bodyClasses = document.body.classList;

  headerClasses.add("header--menu-closing");
  headerContentWrapperClasses.add("header__content-wrapper--menu-closing");
  headerClasses.remove("header--menu-opened");
  bodyClasses.remove("u--disable-scroll-mobile");
  setTimeout(function () {
    headerClasses.remove("header--menu-closing");
  }, 150);
  setTimeout(function () {
    headerContentWrapperClasses.remove("header__content-wrapper--menu-closing");
  }, 300);
}

// Quickly close menu
function closeMenuQuick() {
  var headerClasses = document.body.querySelector(".header").classList;
  var headerContentWrapperClasses = document.body.querySelector(".header__content-wrapper").classList;
  var bodyClasses = document.body.classList;

  headerContentWrapperClasses.add("header__content-wrapper--menu-switching");
  headerClasses.remove("header--menu-opened");
  bodyClasses.remove("u--disable-scroll-mobile");
  setTimeout(function () {
    headerContentWrapperClasses.remove("header__content-wrapper--menu-switching");
  }, 150);
}

// Open search
function openSearch() {
  var headerClasses = document.body.querySelector(".header").classList;
  var headerContentWrapperClasses = document.body.querySelector(".header__content-wrapper").classList;
  var bodyClasses = document.body.classList;

  headerClasses.add("header--search-opening");
  bodyClasses.add("u--disable-scroll-mobile");
  setTimeout(function () {
    headerClasses.add("header--search-opened");
    headerClasses.remove("header--search-opening");
  }, 1);
}

// Close search
function closeSearch() {
  var headerClasses = document.body.querySelector(".header").classList;
  var headerContentWrapperClasses = document.body.querySelector(".header__content-wrapper").classList;
  var bodyClasses = document.body.classList;

  headerClasses.add("header--search-closing");
  headerContentWrapperClasses.add("header__content-wrapper--search-closing");
  headerClasses.remove("header--search-opened");
  bodyClasses.remove("u--disable-scroll-mobile");
  setTimeout(function () {
    headerClasses.remove("header--search-closing");
  }, 150);
  setTimeout(function () {
    headerContentWrapperClasses.remove("header__content-wrapper--search-closing");
  }, 300);
}

// Quickly close search
function closeSearchQuick() {
  var headerClasses = document.body.querySelector(".header").classList;
  var headerContentWrapperClasses = document.body.querySelector(".header__content-wrapper").classList;
  var bodyClasses = document.body.classList;

  headerContentWrapperClasses.add("header__content-wrapper--menu-switching");
  headerClasses.remove("header--search-opened");
  bodyClasses.remove("u--disable-scroll-mobile");
  setTimeout(function () {
    headerContentWrapperClasses.remove("header__content-wrapper--menu-switching");
  }, 150);
}

/* Parallax function for elements with css class ".parallax" */
function parallax() {
  Array.from(document.body.querySelectorAll('.parallax')).forEach(function (element) {
    var elementCenter = (element.getBoundingClientRect().bottom - element.getBoundingClientRect().top) / 2 + element.getBoundingClientRect().top;
    var windowCenter = window.innerHeight / 2;
    var diffFromCenter = elementCenter - windowCenter;
    var translateY = diffFromCenter / 15;
    element.style.transform = "translate(0, " + translateY + "px)";
  });
}

function parallaxFooter() {
  var element = document.body.querySelector('footer');
  var elementBottom = element.getBoundingClientRect().bottom;
  var diffFromBottom = elementBottom - window.innerHeight;
  var translateY = diffFromBottom / 15;
  element.style.transform = "translate(0, " + translateY + "px)";
}

function updateServiceStatus() {
  // Add updated service status info to each service
  JSON.parse(this.responseText).data.forEach(function (service) {
    addOperationStatus(service.name.toLowerCase(), service.lowest_human_status.toLowerCase());
  });
  console.log("Service status updated.");
}

function getServiceStatus() {
  console.log("Updating service status...");

  // Get service status data from api
  var oReq = new XMLHttpRequest();
  oReq.addEventListener("load", updateServiceStatus);
  oReq.open("GET", "https://status.digitraffic.fi/api/v1/components/groups");
  oReq.send();

  // Update service status every 60 seconds
  setTimeout(getServiceStatus, 60000);
}

function addOperationStatus(service, status) {
  // Elements
  var classes = document.getElementById('service-status-circle-' + service).classList;
  var statusText = document.getElementById('service-status-text-' + service);

  // Clean previous status
  classes.remove("service-status__icon-circle-bottom--operational", "service-status__icon-circle-bottom--partial-outage", "service-status__icon-circle-bottom--major-outage");

  // Update status
  if (status === "operational") {
    classes.add("service-status__icon-circle-bottom--operational");
    statusText.textContent = "Toiminnassa";
    statusText.classList.remove("service-status__service-text--loading");
  } else if (status === "partial outage") {
    classes.add("service-status__icon-circle-bottom--partial-outage");
    statusText.textContent = "Osittainen katkos";
    statusText.classList.remove("service-status__service-text--loading");
  } else if (status === "major outage") {
    classes.add("service-status__icon-circle-bottom--major-outage");
    statusText.textContent = "Merkittävä katkos";
    statusText.classList.remove("service-status__service-text--loading");
  } else {
    statusText.textContent = "Virhe ladattaessa tietoja";
    statusText.classList.add("service-status__service-text--loading");
  }
}