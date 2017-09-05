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

  // Add parallax effect to elements with ".parallax" and to footer
  parallax();
  parallaxFooter();

  // Add menu event listeners
  addEventListeners();

  // If Service status section exists, get service status
  document.getElementById("service-status-section") ? getServiceStatus() : '';
}


/* On scroll actions */
window.onscroll = () => {

  // Add parallax effect
  parallax();
  parallaxFooter();
  
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

/* Add event listeners for menu, search and language */
function addEventListeners() {
  let menuElement = document.body.querySelector(".header-menu__item--menu");
  let searchElement = document.body.querySelector(".header-menu__item--search");
  let outsideMenu = document.body.querySelector(".content");
  
  menuElement.addEventListener("click", toggleMenu);
  searchElement.addEventListener("click", toggleSearch);
  outsideMenu.addEventListener("click", closeMenuSearchLanguage);
}

// Toggle menu function
function toggleMenu() {
  const headerClasses = document.body.querySelector(".header").classList;
  
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
  const headerClasses = document.body.querySelector(".header").classList;

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
  const headerClasses = document.body.querySelector(".header").classList;
  
  if (headerClasses.contains("header--menu-opened")) {
    closeMenu();
  }

  if (headerClasses.contains("header--search-opened")) {
    closeSearch();
  }
}

// Open menu
function openMenu() {
  const headerClasses = document.body.querySelector(".header").classList;
  const headerContentWrapperClasses = document.body.querySelector(".header__content-wrapper").classList;
  const bodyClasses = document.body.classList;

  headerClasses.add("header--menu-opening");
  setTimeout( () => {
    headerClasses.add("header--menu-opened");
    headerClasses.remove("header--menu-opening");
    },
    1
  );
  bodyClasses.add("u--disable-scroll-mobile");
}

// Close menu
function closeMenu() {
  const headerClasses = document.body.querySelector(".header").classList;
  const headerContentWrapperClasses = document.body.querySelector(".header__content-wrapper").classList;
  const bodyClasses = document.body.classList;

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

// Quickly close menu
function closeMenuQuick() {
  const headerClasses = document.body.querySelector(".header").classList;
  const bodyClasses = document.body.classList;

  headerClasses.remove("header--menu-opened");
  bodyClasses.remove("u--disable-scroll-mobile");
}

// Open search
function openSearch() {
  const headerClasses = document.body.querySelector(".header").classList;
  const headerContentWrapperClasses = document.body.querySelector(".header__content-wrapper").classList;
  const bodyClasses = document.body.classList;

  headerClasses.add("header--search-opening");
  setTimeout( () => {
    headerClasses.add("header--search-opened");
    headerClasses.remove("header--search-opening");
    },
    1
  );
  bodyClasses.add("u--disable-scroll-mobile");
}

// Close search
function closeSearch() {
  const headerClasses = document.body.querySelector(".header").classList;
  const headerContentWrapperClasses = document.body.querySelector(".header__content-wrapper").classList;
  const bodyClasses = document.body.classList;

  headerClasses.add("header--search-closing");
  headerContentWrapperClasses.add("header__content-wrapper--search-closing");
  headerClasses.remove("header--search-opened");
  setTimeout( () => {
    headerClasses.remove("header--search-closing");
    },
    150
  );
  setTimeout( () => {
    headerContentWrapperClasses.remove("header__content-wrapper--search-closing");
    },
    300
  );
  bodyClasses.remove("u--disable-scroll-mobile");
}

// Quickly close search
function closeSearchQuick() {
  const headerClasses = document.body.querySelector(".header").classList;
  const bodyClasses = document.body.classList;

  headerClasses.remove("header--search-opened");
  bodyClasses.remove("u--disable-scroll-mobile");
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

function parallaxFooter() {
  let element = document.body.querySelector('footer');
  let elementBottom = element.getBoundingClientRect().bottom;
  let diffFromBottom = elementBottom - window.innerHeight;
  let translateY = diffFromBottom / 15;
  element.style.transform = "translate(0, " + translateY + "px)";
}

function updateServiceStatus() {
  // Add updated service status info to each service
  JSON.parse(this.responseText).data.forEach(service => {
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
  const classes = document.getElementById(`service-status-circle-${service}`).classList;
  let statusText = document.getElementById(`service-status-text-${service}`);

  // Clean previous status
  classes.remove(
    "service-status__icon-circle-bottom--operational",
    "service-status__icon-circle-bottom--partial-outage",
    "service-status__icon-circle-bottom--major-outage"
  );

  // Update status
  if (status === "operational") {
    classes.add("service-status__icon-circle-bottom--operational");
    statusText.textContent = "Toiminnassa";
    statusText.classList.remove("service-status__service-text--loading");
  } else if (status === "partial outage") {
    classes.add("service-status__icon-circle-bottom--partial-outage");
    statusText.textContent = "Osittainen katkos";
    statusText.classList.remove("service-status__service-text--loading");
  }
  else if (status === "major outage") {
    classes.add("service-status__icon-circle-bottom--major-outage");
    statusText.textContent = "Merkittävä katkos";
    statusText.classList.remove("service-status__service-text--loading");
  }
  else {
    statusText.textContent = "Virhe ladattaessa tietoja";
    statusText.classList.add("service-status__service-text--loading");
  }
}