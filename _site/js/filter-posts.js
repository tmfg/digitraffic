/***Write javascript under this line***/

/* Active filters object */
'use strict';

var activeFilters = {
  year: [],
  traffictype: [],
  tag: []
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
}

function addEventListeners() {
  Array.from(document.body.querySelectorAll('.checkbox input[type="checkbox"]')).forEach(function (element) {
    element.addEventListener("change", toggleFilter, false);
  });
}

function toggleFilter() {
  var filtertype = this.dataset.filtertype;
  var filtervalue = this.dataset.filtervalue;
  if (this.checked) {
    if (!activeFilters[filtertype].includes(filtervalue)) {
      activeFilters[filtertype].push(filtervalue);
    }
  } else {
    if (activeFilters[filtertype].includes(filtervalue)) {
      activeFilters[filtertype].splice(activeFilters[filtertype].indexOf(filtervalue), 1);
    }
  }
  showHidePosts();
}

function showHidePosts() {
  //console.log(activeFilters);
  Array.from(document.body.querySelectorAll('.posts-in-category__post')).forEach(function (element) {
    // Get year, traffictypes and tags for all posts
    var elementYear = element.dataset.year.split(' ');
    var elementTraffictypes = element.dataset.traffictypes.split(' ');
    var elementTags = element.dataset.tags.split(' ');

    var showByYear = hasSharedValue(elementYear, activeFilters.year) || activeFilters.year.length === 0;
    var showByTraffictype = hasSharedValue(elementTraffictypes, activeFilters.traffictype) || activeFilters.traffictype.length === 0;
    var showByTag = hasSharedValue(elementTags, activeFilters.tag) || activeFilters.tag.length === 0;

    // If no filters are set, show all posts
    if (activeFilters.year.length === 0 && activeFilters.traffictype.length === 0 && activeFilters.tag.length === 0) {
      element.classList.remove("posts-in-category--hidden");
    }
    // Else show only posts with shared year, traffictype or tag
    else {
        if (showByYear && showByTraffictype && showByTag) {
          element.classList.remove("posts-in-category--hidden");
        } else {
          element.classList.add("posts-in-category--hidden");
        }
      }
  });
}

function hasSharedValue(arr1, arr2) {
  var isShared = false;
  arr1.forEach(function (arr1val) {
    if (!isShared) {
      isShared = arr2.some(function (arr2val) {
        return arr1val === arr2val;
      });
    }
  });
  return isShared;
}