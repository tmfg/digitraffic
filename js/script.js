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
  //console.log("DOM ready");

  // Add parallax effect to elements with ".parallax" and to footer
  parallax();
  parallaxFooter();

  // Add menu event listeners
  addEventListeners();

  // Add .header--scrolled if landed in the middle of page
  headerScrolled();

  // If Service status section exists, get service status
  document.getElementById("service-status-section") ? getServiceStatus() : '';
}


/* On scroll actions */
window.onscroll = () => {

  // Add parallax effect
  parallax();
  parallaxFooter();
  
  // Add .header--scrolled when scrolling page, remove when scrolled to top
  headerScrolled();
}

/* Add event listeners for menu, search and language */
function addEventListeners() {
  let menuElement = document.body.querySelector(".header-menu__item--menu");
  let searchElement = document.body.querySelector(".header-menu__item--search");
  let languageElement = document.body.querySelector(".header-menu__item--language");
  let outsideMenu = document.body.querySelector(".content");
  
  menuElement.addEventListener("click", toggleMenu);
  searchElement.addEventListener("click", toggleSearch);
  languageElement.addEventListener("click", toggleLanguage);
  outsideMenu.addEventListener("click", closeMenuSearchLanguage);
}

// Add .header--scrolled when scrolling page, remove when scrolled to top
function headerScrolled() {
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
}

// Toggle menu function
function toggleMenu() {
  const headerClasses = document.body.querySelector(".header").classList;
  
  // Toggle menu
  if (headerClasses.contains("header--menu-opened")) {
    closeMenu();
  } else {
    // If search or language is opened, close it
    if (headerClasses.contains("header--search-opened")) {
      closeSearchQuick();
    }
    if (headerClasses.contains("header--language-opened")) {
      closeLanguageQuick();
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
    // If menu or language is opened, close it
    if (headerClasses.contains("header--menu-opened")) {
      closeMenuQuick();
    }
    if (headerClasses.contains("header--language-opened")) {
      closeLanguageQuick();
    }
    openSearch();
  }
}

// Toggle language menu function
function toggleLanguage() {
  const headerClasses = document.body.querySelector(".header").classList;

  // Toggle search
  if (headerClasses.contains("header--language-opened")) {
    closeLanguage();
  } else {
    // If menu or search is opened, close it
    if (headerClasses.contains("header--menu-opened")) {
      closeMenuQuick();
    }
    if (headerClasses.contains("header--search-opened")) {
      closeSearchQuick();
    }
    openLanguage();
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

  if (headerClasses.contains("header--language-opened")) {
    closeLanguage();
  }
}

// Open menu
function openMenu() {
  const headerClasses = document.body.querySelector(".header").classList;
  const headerContentWrapperClasses = document.body.querySelector(".header__content-wrapper").classList;
  const bodyClasses = document.body.classList;

  headerClasses.add("header--menu-opening");
  bodyClasses.add("u--disable-scroll-mobile");
  setTimeout( () => {
    headerClasses.add("header--menu-opened");
    headerClasses.remove("header--menu-opening");
    },
    1
  );
}

// Close menu
function closeMenu() {
  const headerClasses = document.body.querySelector(".header").classList;
  const headerContentWrapperClasses = document.body.querySelector(".header__content-wrapper").classList;
  const bodyClasses = document.body.classList;

  headerClasses.add("header--menu-closing");
  headerContentWrapperClasses.add("header__content-wrapper--menu-closing");
  headerClasses.remove("header--menu-opened");
  bodyClasses.remove("u--disable-scroll-mobile");
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
}

// Quickly close menu
function closeMenuQuick() {
  const headerClasses = document.body.querySelector(".header").classList;
  const headerContentWrapperClasses = document.body.querySelector(".header__content-wrapper").classList;
  const bodyClasses = document.body.classList;

  headerContentWrapperClasses.add("header__content-wrapper--menu-switching");
  headerClasses.remove("header--menu-opened");
  bodyClasses.remove("u--disable-scroll-mobile");
  setTimeout( () => {
    headerContentWrapperClasses.remove("header__content-wrapper--menu-switching");
    },
    150
  );
}

// Open search
function openSearch() {
  const headerClasses = document.body.querySelector(".header").classList;
  const headerContentWrapperClasses = document.body.querySelector(".header__content-wrapper").classList;
  const bodyClasses = document.body.classList;

  headerClasses.add("header--search-opening");
  bodyClasses.add("u--disable-scroll-mobile");
  setTimeout( () => {
    headerClasses.add("header--search-opened");
    headerClasses.remove("header--search-opening");
    },
    1
  );
  document.body.querySelector("input.search-opened__input-field").focus();
}

// Close search
function closeSearch() {
  const headerClasses = document.body.querySelector(".header").classList;
  const headerContentWrapperClasses = document.body.querySelector(".header__content-wrapper").classList;
  const bodyClasses = document.body.classList;

  headerClasses.add("header--search-closing");
  headerContentWrapperClasses.add("header__content-wrapper--search-closing");
  headerClasses.remove("header--search-opened");
  bodyClasses.remove("u--disable-scroll-mobile");
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
}

// Quickly close search
function closeSearchQuick() {
  const headerClasses = document.body.querySelector(".header").classList;
  const headerContentWrapperClasses = document.body.querySelector(".header__content-wrapper").classList;
  const bodyClasses = document.body.classList;

  headerContentWrapperClasses.add("header__content-wrapper--menu-switching");
  headerClasses.remove("header--search-opened");
  bodyClasses.remove("u--disable-scroll-mobile");
  setTimeout( () => {
    headerContentWrapperClasses.remove("header__content-wrapper--menu-switching");
    },
    150
  );
}

// Open language
function openLanguage() {
  const headerClasses = document.body.querySelector(".header").classList;
  const headerContentWrapperClasses = document.body.querySelector(".header__content-wrapper").classList;
  const bodyClasses = document.body.classList;

  headerClasses.add("header--language-opening");
  bodyClasses.add("u--disable-scroll-mobile");
  setTimeout( () => {
    headerClasses.add("header--language-opened");
    headerClasses.remove("header--language-opening");
    },
    1
  );
}

// Close language
function closeLanguage() {
  const headerClasses = document.body.querySelector(".header").classList;
  const headerContentWrapperClasses = document.body.querySelector(".header__content-wrapper").classList;
  const bodyClasses = document.body.classList;

  headerClasses.add("header--language-closing");
  headerContentWrapperClasses.add("header__content-wrapper--language-closing");
  headerClasses.remove("header--language-opened");
  bodyClasses.remove("u--disable-scroll-mobile");
  setTimeout( () => {
    headerClasses.remove("header--language-closing");
    },
    150
  );
  setTimeout( () => {
    headerContentWrapperClasses.remove("header__content-wrapper--language-closing");
    },
    300
  );
}

// Quickly close language
function closeLanguageQuick() {
  const headerClasses = document.body.querySelector(".header").classList;
  const headerContentWrapperClasses = document.body.querySelector(".header__content-wrapper").classList;
  const bodyClasses = document.body.classList;

  headerContentWrapperClasses.add("header__content-wrapper--menu-switching");
  headerClasses.remove("header--language-opened");
  bodyClasses.remove("u--disable-scroll-mobile");
  setTimeout( () => {
    headerContentWrapperClasses.remove("header__content-wrapper--menu-switching");
    },
    150
  );
}

/* Parallax function for elements with css class ".parallax" */
function parallax() {
  [].slice.call(document.body.querySelectorAll('.parallax')).forEach(element => {
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
}

function updateServiceStatusList() {

  var statusList = document.getElementById('service-status-incident-list'); //ul

  // Get a reference to the template li and remove it from dom
  var templateItem = statusList.firstElementChild;

  while (statusList.firstChild) {
    statusList.removeChild(statusList.firstChild);
  }

  // Add list of service status incidents to incident list
  JSON.parse(this.responseText).data.forEach(function (incident) {
    addIncidentToList(incident.created_at, incident.name, incident.message, statusList, templateItem);
  });
}

function getServiceStatus() {

  // Get service status data from api
  var oReq = new XMLHttpRequest();
  oReq.addEventListener("load", updateServiceStatus);
  oReq.open("GET", "https://status.digitraffic.fi/api/v1/components/groups");
  oReq.send();

  // Get service incidents from api
  var oReq2 = new XMLHttpRequest();
  oReq2.addEventListener("load", updateServiceStatusList);
  oReq2.open("GET", "https://status.digitraffic.fi/api/v1/incidents?per_page=3&sort=id&order=desc");
  oReq2.send();

  // Update service status every 60 seconds
  setTimeout(getServiceStatus, 60000);
}

function addOperationStatus(service, status) {
  //console.log(service, ":", status);

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

function addIncidentToList(created_at, name, message, statusList, templateItem) {
  //console.log(name, message);

  var newItem = templateItem.cloneNode(true);
  newItem.innerHTML = "<h4>" + name + "</h4><span class='service-status__incident-list-timestamp'>" + created_at + "</span><span>" + message + "</span>";
  statusList.appendChild(newItem);
}