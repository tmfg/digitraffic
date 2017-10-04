---
---
/***Write javascript under this line***/

/* Active filters object */
let activeFilters = {
  year: [],
  traffictype: [],
  tag: []
};

let visibleAmounts = {
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

  // Get URL parameters for filters
  getParams();

  // Show/hide posts based on active filters
  showHidePosts();

  // Update amounts of visible posts for filters
  updateVisibleAmounts();
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
      let listItems = document.body.querySelector('ul[data-filtersection="' + key.toLowerCase() + '"]').querySelectorAll('li');
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
  updateVisibleAmounts();
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
  // If --last class exists, remove it
  let lastPost = document.body.querySelector('.posts-in-category__post--last');
  if (lastPost) {
    lastPost.classList.remove('posts-in-category__post--last');
  }
  // Get visible posts
  let visiblePosts = [];
  postsInCategory.forEach((post) => {
    if (post.classList.contains('posts-in-category__post') && !post.classList.contains('posts-in-category__post--hidden')) {
      visiblePosts.push(post);
    }
  });
  // Update amount of posts
  document.getElementById('posts-in-category-amount').innerText = visiblePosts.length;
  // Add --last class to last visible post
  let noPostsClasses = document.body.querySelector('.posts-in-category__no-posts').classList;
  if (visiblePosts.length > 0) {
    if (!noPostsClasses.contains('posts-in-category__no-posts--hidden')) {
      noPostsClasses.add('posts-in-category__no-posts--hidden');
    }
    visiblePosts[visiblePosts.length - 1].classList.add('posts-in-category__post--last');
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

// Update visible amounts for filters
function updateVisibleAmounts() {
  // Reset visible amounts
  visibleAmounts = {
    year: [],
    traffictype: [],
    tag: []
  };

  // Get updated visible amounts
  Array.from(document.body.querySelectorAll('.posts-in-category__post')).forEach(element => {
    // Check that element is visible
    if (!element.classList.contains('posts-in-category__post--hidden')) {

      // Year
      let year = element.dataset.year;
      let found = false;
      visibleAmounts.year.forEach(visibleFilter => {
        if (visibleFilter[0] === year) {
          visibleFilter[1]++;
          found = true;
        }
      });
      if (!found) {
        visibleAmounts.year.push([year, 1]);
      }
      
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
  
      // Tag
      element.dataset.tags.split(',').forEach(tag => {
        let found = false;
        visibleAmounts.tag.forEach(visibleFilter => {
          if (visibleFilter[0] === tag) {
            visibleFilter[1]++;
            found = true;
          }
        });
        if (!found) {
          visibleAmounts.tag.push([tag, 1]);
        }
      });
    }
  });

  Array.from(document.body.querySelectorAll('.sidebar__filter-amount')).forEach(element => {
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