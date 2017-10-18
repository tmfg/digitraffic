(function() {
  function displaySearchResults(results, store) {
    var searchResults = document.getElementById('search-results');

    if (results.length) { // Are there any results?
      var appendString = '';

      for (var i = 0; i < results.length; i++) {  // Iterate over the results
        var item = store[results[i].ref];

        appendString += '<div class="posts-in-category__post">';
        appendString += '<h3 class="h3 posts-in-category__post-heading"><a href="' + item.url + '" class="posts-in-category__post-heading-link">' + item.title +'</a></h3>';
        appendString += '<div class="posts-in-category__excerpt">' + item.content.substring(0, 300);
        if (item.content.length >= 300) {
          if (item.content[299] === '.') appendString += '..';
          else appendString += '...';
        }
        appendString += '</div>';
        appendString += '</div>';
      }

      searchResults.innerHTML = appendString;
    } else {
      searchResults.innerHTML = '<li>No results found</li>';
    }
  }

  function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split('&');

    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split('=');

      if (pair[0] === variable) {
        return decodeURIComponent(pair[1].replace(/\+/g, '%20'));
      }
    }
  }

  var searchTerm = getQueryVariable('query');

  if (searchTerm) {
    document.getElementById('search-box').setAttribute("value", searchTerm);

    // Initalize lunr with the fields it will be searching on. I've given title
    var idx = lunr(function () {
      this.field('id');
      this.field('title');
      this.field('category');
      this.field('content');
    
      for (var key in window.store) { // Add the data to lunr
        this.add({
          'id': key,
          'title': window.store[key].title,
          'category': window.store[key].category,
          'content': window.store[key].content
        });
  
      }
    });
    
    var results = idx.search(searchTerm); // Get lunr to perform a search
    displaySearchResults(results, window.store); // We'll write this in the next section
  }
})();