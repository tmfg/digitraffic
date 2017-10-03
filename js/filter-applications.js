---
---
/***Write javascript under this line***/

/* Active filters object */
let activeFilters = {
  traffictype: [],
  environment: []
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
  showHideApps();
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
  showHideApps();
}

// Show/hide applications based on active filters
function showHideApps() {
  let applications = Array.from(document.body.querySelectorAll('.applications-list__application'));
  applications.forEach(post => {
    // Get year, traffictypes and tags for all posts
    let appTraffictypes = post.dataset.traffictypes.split(',');
    let appEnvironments = post.dataset.environments.split(',');

    // Filter conditions
    let showByTraffictype = hasSharedValue(appTraffictypes, activeFilters.traffictype) || activeFilters.traffictype.length === 0;
    let showByEnvironment = hasSharedValue(appEnvironments, activeFilters.environment) || activeFilters.environment.length === 0;
    
    // Show only posts with shared year, traffictype or tag OR if filters are not set
    if (showByTraffictype && showByEnvironment) {
      post.classList.remove('applications-list__application--hidden');
    } else {
      post.classList.add('applications-list__application--hidden');
    }
  });
  
  // Style last application
  // If --last class exists, remove it
  let lastApp = document.body.querySelector('.applications-list__application--last');
  if (lastApp) {
    lastApp.classList.remove('applications-list__application--last');
  }
  // Get visible applications
  let visibleApps = [];
  applications.forEach((app) => {
    if (app.classList.contains('applications-list__application') && !app.classList.contains('applications-list__application--hidden')) {
      visibleApps.push(app);
    }
  });
  // Update amount of applications
  document.getElementById('applications-list-amount').innerText = visibleApps.length;
  // Add --last class to last visible post
  let noAppsClasses = document.body.querySelector('.applications-list__no-applications').classList;
  if (visibleApps.length > 0) {
    if (!noAppsClasses.contains('applications-list__no-applications--hidden')) {
      noAppsClasses.add('applications-list__no-applications--hidden');
    }
    visibleApps[visibleApps.length - 1].classList.add('applications-list__application--last');
  } else {
    if (noAppsClasses.contains('applications-list__no-applications--hidden')) {
      noAppsClasses.remove('applications-list__no-applications--hidden');
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