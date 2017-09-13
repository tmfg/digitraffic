---
---
/***Write javascript under this line***/

/* Active filters object */
let activeFilters = {
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
  showHidePosts();
}

function showHidePosts() {
  //console.log(activeFilters);
  Array.from(document.body.querySelectorAll('.posts-in-category__post')).forEach(element => {
    // Get year, traffictypes and tags for all posts
    let elementYear = element.dataset.year.split(' ');
    let elementTraffictypes = element.dataset.traffictypes.split(' ');
    let elementTags = element.dataset.tags.split(' ');

    let showByYear = hasSharedValue(elementYear, activeFilters.year) || activeFilters.year.length === 0;
    let showByTraffictype = hasSharedValue(elementTraffictypes, activeFilters.traffictype) || activeFilters.traffictype.length === 0;
    let showByTag = hasSharedValue(elementTags, activeFilters.tag) || activeFilters.tag.length === 0;
    
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
  let isShared = false;
  arr1.forEach(arr1val => {
    if (!isShared) {
      isShared = arr2.some(arr2val => arr1val === arr2val);
    } 
  });
  return isShared;
}