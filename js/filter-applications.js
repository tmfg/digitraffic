---
---
/***Write javascript under this line***/

/* Active filters object */
let activeFilters = {
  traffictype: [],
  environment: []
};

let visibleAmounts = {
  traffictype: [],
  environment: []
}

/* Check if DOM is ready */
if (document.readyState !== 'loading') {
  init();
} else {
  document.addEventListener('DOMContentLoaded', init, false);
}

function init() {
  // Add filter check box event listeners
  addEventListeners();

  // Get URL parameters for filters
  getParams();

  // Show/hide applications based on active filters
  showHideApps();

  // Update amounts of visible applications for filters
  updateVisibleAmounts();
}

function addEventListeners() {
  [].slice.call(document.body.querySelectorAll('.checkbox input[type="checkbox"]')).forEach(element => {
    element.addEventListener("change", toggleFilter, false);
  });
}

function getParams() {
  let query = window.location.search.substring(1);
  getFiltersFromQuery(query);
}

function getFiltersFromQuery(query) {
  if (query.length > 0) {
    query.split('&').forEach(filter => {
      let key = filter.split('=')[0];
      let values = filter.split('=')[1].split(',');
      values = values.map(value => {
        return decodeURIComponent(value);
      });
      let listItems = document.body.querySelector('ul[data-filtersection="' + key.toLowerCase() + '"]').querySelectorAll('li');
      [].slice.call(listItems).forEach(listItem => {
        let checkbox = listItem.querySelector('input');
        for (let i = 0; i < values.length; i++) {
          if (values[i] === checkbox.dataset.filtervalue) {
            checkbox.checked = true;
            activeFilters[key].push(values[i]);
            break;
          }
        }
      });
    });
  }
}

function toggleFilter() {
  let filtertype = this.dataset.filtertype;
  let filtervalue = this.dataset.filtervalue;
  if (this.checked) {
    if (activeFilters[filtertype].indexOf(filtervalue) < 0) {
      activeFilters[filtertype].push(filtervalue);
    }
  } else {
    if (activeFilters[filtertype].indexOf(filtervalue) >= 0) {
      activeFilters[filtertype].splice(activeFilters[filtertype].indexOf(filtervalue), 1);
    }
  }
  showHideApps();
  updateVisibleAmounts();
}

// Show/hide applications based on active filters
function showHideApps() {
  let applications = [].slice.call(document.body.querySelectorAll('.applications-list__application'));
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

// Update visible amounts for filters
function updateVisibleAmounts() {
  // Reset visible amounts
  visibleAmounts = {
    traffictype: [],
    environment: []
  };

  // Get updated visible amounts
  [].slice.call(document.body.querySelectorAll('.applications-list__application')).forEach(element => {
    // Check that element is visible
    if (!element.classList.contains('applications-list__application--hidden')) {
      
      // Traffictypes
      element.dataset.traffictypes.split(',').forEach(traffictype => {
        let found = false;
        visibleAmounts.traffictype.forEach(visibleFilter => {
          if (visibleFilter[0] === traffictype) {
            visibleFilter[1]++;
            found = true;
          }
        });
        if (!found) {
          visibleAmounts.traffictype.push([traffictype, 1]);
        }
      });
  
      // Environment
      element.dataset.environments.split(',').forEach(environment => {
        let found = false;
        visibleAmounts.environment.forEach(visibleFilter => {
          if (visibleFilter[0] === environment) {
            visibleFilter[1]++;
            found = true;
          }
        });
        if (!found) {
          visibleAmounts.environment.push([environment, 1]);
        }
      });
    }
  });

  [].slice.call(document.body.querySelectorAll('.sidebar__filter-amount')).forEach(element => {
    let filtertype = element.dataset.filtertype;
    let found = false;
    visibleAmounts[filtertype].forEach(visibleFilter => {
      if (element.dataset.filtervalue === visibleFilter[0]) {
        element.innerText = visibleFilter[1];
        found = true;
      }
      if (!found) {
        element.innerText = 0;
      }
    });
    if (visibleAmounts[filtertype].length === 0) {
      element.innerText = 0;
    }
  });
}