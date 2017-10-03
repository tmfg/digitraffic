---
---
/***Write javascript under this line***/

/* Active filters object */
let activeFilters = {
  traffictype: [],
  status: []
};

/* Check if DOM is ready */
if (document.readyState !== 'loading') {
  init();
} else {
  document.addEventListener('DOMContentLoaded', init, false);
}

function init() {
  // Add filter check box event listeners
  addEventListeners();
  showHideDevs();
}

function addEventListeners() {
  Array.from(document.body.querySelectorAll('.checkbox input[type="checkbox"]')).forEach(element => {
    element.addEventListener("change", toggleFilter, false);
  });
}

function toggleFilter() {
  let filtertype = this.dataset.filtertype;
  let filtervalue = this.dataset.filtervalue;
  if (this.checked) {
    if (!activeFilters[filtertype].includes(filtervalue)) {
      activeFilters[filtertype].push(filtervalue);
    }
  } else {
    if (activeFilters[filtertype].includes(filtervalue)) {
      activeFilters[filtertype].splice(activeFilters[filtertype].indexOf(filtervalue), 1);
    }
  }
  showHideDevs();
}

// Show/hide developments based on active filters
function showHideDevs() {
  let developments = Array.from(document.body.querySelectorAll('.developments__development'));
  developments.forEach(post => {
    // Get traffictypes and status for all developments
    let appTraffictypes = post.dataset.traffictypes.split(',');
    let appStatus = post.dataset.status.split(',');

    // Filter conditions
    let showByTraffictype = hasSharedValue(appTraffictypes, activeFilters.traffictype) || activeFilters.traffictype.length === 0;
    let showByStatus = hasSharedValue(appStatus, activeFilters.status) || activeFilters.status.length === 0;
    
    // Show only developments with shared traffictype or status OR if filters are not set
    if (showByTraffictype && showByStatus) {
      post.classList.remove('developments__development--hidden');
    } else {
      post.classList.add('developments__development--hidden');
    }
  });
  
  // Style last development
  // If --last class exists, remove it
  let lastDevelopment = document.body.querySelector('.developments__development--last');
  if (lastDevelopment) {
    lastDevelopment.classList.remove('developments__development--last');
  }
  // Get visible developments
  let visibleDevelopments = [];
  developments.forEach((app) => {
    if (app.classList.contains('developments__development') && !app.classList.contains('developments__development--hidden')) {
      visibleDevelopments.push(app);
    }
  });
  // Update amount of developments
  document.getElementById('developments-amount').innerText = visibleDevelopments.length;
  // Add --last class to last visible development
  let noAppsClasses = document.body.querySelector('.developments__no-developments').classList;
  if (visibleDevelopments.length > 0) {
    if (!noAppsClasses.contains('developments__no-developments--hidden')) {
      noAppsClasses.add('developments__no-developments--hidden');
    }
    visibleDevelopments[visibleDevelopments.length - 1].classList.add('developments__development--last');
  } else {
    if (noAppsClasses.contains('developments__no-developments--hidden')) {
      noAppsClasses.remove('developments__no-developments--hidden');
    }
  }
}

// Check if two arrays share any values
function hasSharedValue(arr1, arr2) {
  let isShared = false;
  arr1.forEach(arr1val => {
    if (!isShared) {
      isShared = arr2.some(arr2val => arr1val === arr2val);
    } 
  });
  return isShared;
}