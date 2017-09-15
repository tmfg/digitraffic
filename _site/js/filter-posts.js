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
  getParams();
}

function addEventListeners() {
  Array.from(document.body.querySelectorAll('.checkbox input[type="checkbox"]')).forEach(function (element) {
    element.addEventListener("change", toggleFilter, false);
  });
}

function getParams() {
  var query = window.location.search.substring(1);
  getFiltersFromQuery(query);
}

function getFiltersFromQuery(query) {
  console.log(query);
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

// Show/hide posts based on active filters
function showHidePosts() {
  var postsInCategory = Array.from(document.body.querySelectorAll('.posts-in-category__post'));
  postsInCategory.forEach(function (post) {
    // Get year, traffictypes and tags for all posts
    var postYear = post.dataset.year.split(' ');
    var postTraffictypes = post.dataset.traffictypes.split(' ');
    var postTags = post.dataset.tags.split(' ');

    // Filter conditions
    var showByYear = hasSharedValue(postYear, activeFilters.year) || activeFilters.year.length === 0;
    var showByTraffictype = hasSharedValue(postTraffictypes, activeFilters.traffictype) || activeFilters.traffictype.length === 0;
    var showByTag = hasSharedValue(postTags, activeFilters.tag) || activeFilters.tag.length === 0;

    // Show only posts with shared year, traffictype or tag OR if filters are not set
    if (showByYear && showByTraffictype && showByTag) {
      post.classList.remove('posts-in-category__post--hidden');
    } else {
      post.classList.add('posts-in-category__post--hidden');
    }
  });

  // Style last post
  // If --last class exists, remove it
  var lastPost = document.body.querySelector('.posts-in-category__post--last');
  if (lastPost) {
    lastPost.classList.remove('posts-in-category__post--last');
  }
  // Get visible posts
  var visiblePosts = [];
  postsInCategory.forEach(function (post) {
    if (post.classList.contains('posts-in-category__post') && !post.classList.contains('posts-in-category__post--hidden')) {
      visiblePosts.push(post);
    }
  });
  // Add --last class to last visible post
  visiblePosts[visiblePosts.length - 1].classList.add('posts-in-category__post--last');
}

// Check if two arrays share any values
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