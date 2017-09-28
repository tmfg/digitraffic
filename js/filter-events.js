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
  getParams();
  showHidePosts();
}

function addEventListeners() {
  Array.from(document.body.querySelectorAll('.checkbox input[type="checkbox"]')).forEach(element => {
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
      let listItems = document.body.querySelector('ul[data-filtersection="' + key.toLowerCase() + '"').querySelectorAll('li');
      Array.from(listItems).forEach(listItem => {
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
  let postsInCategory = Array.from(document.body.querySelectorAll('.posts-in-category__post'));
  postsInCategory.forEach(post => {
    // Get year, traffictypes and tags for all posts
    let postYear = post.dataset.year.split(',');
    let postTraffictypes = post.dataset.traffictypes.split(',');
    let postTags = post.dataset.tags.split(',');

    // Filter conditions
    let showByYear = hasSharedValue(postYear, activeFilters.year) || activeFilters.year.length === 0;
    let showByTraffictype = hasSharedValue(postTraffictypes, activeFilters.traffictype) || activeFilters.traffictype.length === 0;
    let showByTag = hasSharedValue(postTags, activeFilters.tag) || activeFilters.tag.length === 0;
    
    // Show only posts with shared year, traffictype or tag OR if filters are not set
    if (showByYear && showByTraffictype && showByTag) {
      post.classList.remove('posts-in-category__post--hidden');
    } else {
      post.classList.add('posts-in-category__post--hidden');
    }
  });
  
  // Style last post
  // If --last classes exist, remove them
  let lastPosts = Array.from(document.body.querySelectorAll('.posts-in-category__post--last'))
  if (lastPosts.length > 0) {
    lastPosts.forEach(lastPost => {
      lastPost.classList.remove('posts-in-category__post--last');
    });
  }
  // Get visible posts
  let visiblePostsUpcoming = [];
  let visiblePostsPast = [];
  postsInCategory.forEach((post) => {
    if (post.classList.contains('posts-in-category__post') && !post.classList.contains('posts-in-category__post--hidden')) {
      if (post.classList.contains('posts-in-category__upcoming-event')) {
        visiblePostsUpcoming.push(post);
      }
      if (post.classList.contains('posts-in-category__past-event')) {
        visiblePostsPast.push(post);
      }
    }
  });
  // Update amount of posts
  document.getElementById('upcoming-events-amount').innerText = visiblePostsUpcoming.length;
  document.getElementById('past-events-amount').innerText = visiblePostsPast.length;
  // Add --last class to last visible posts
  // Upcoming
  let noPostsClasses = document.body.querySelector('.posts-in-category__no-upcoming-events').classList;
  if (visiblePostsUpcoming.length > 0) {
    if (!noPostsClasses.contains('posts-in-category__no-posts--hidden')) {
      noPostsClasses.add('posts-in-category__no-posts--hidden');
    }
    visiblePostsUpcoming[visiblePostsUpcoming.length - 1].classList.add('posts-in-category__post--last');
  } else {
    if (noPostsClasses.contains('posts-in-category__no-posts--hidden')) {
      noPostsClasses.remove('posts-in-category__no-posts--hidden');
    }
  }
  // Past
  noPostsClasses = document.body.querySelector('.posts-in-category__no-past-events').classList;
  if (visiblePostsPast.length > 0) {
    if (!noPostsClasses.contains('posts-in-category__no-posts--hidden')) {
      noPostsClasses.add('posts-in-category__no-posts--hidden');
    }
    visiblePostsPast[visiblePostsPast.length - 1].classList.add('posts-in-category__post--last');
  } else {
    if (noPostsClasses.contains('posts-in-category__no-posts--hidden')) {
      noPostsClasses.remove('posts-in-category__no-posts--hidden');
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