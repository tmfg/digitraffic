(function() {
  function displaySearchResults(results, store) {
    var searchResults = document.getElementById('search-results');

    if (results.length) { // Are there any results?
      document.getElementById('search-results-amount').innerText = results.length;

      var appendString = '';

      for (var i = 0; i < results.length; i++) {  // Iterate over the results
        var item = store[results[i].ref];
        
        let itemlang;
        item.lang === "fi" | "" ? itemlang = "" : itemlang = "/" + item.lang;
        console.log(itemlang);

        appendString += '<div class="posts-in-category__post">';
        
        //Title
        appendString += '<h3 class="h3 posts-in-category__post-heading"><a href="';
        if (item.category === "Kehityssuunnitelma") {
          appendString += window.baseurl + itemlang + '/kehityssuunnitelma?traffictype=' + item.traffictypes[0].toLowerCase() + '&status=' + item.status.toLowerCase();
        }
        else {
          appendString += window.baseurl + item.url;
        }
        appendString += '" class="posts-in-category__post-heading-link">' + item.title +'</a></h3>';
        
        //Metadata
        appendString += '<div class="date-type-tags">';
        if (item.category === "Page") {
          appendString += '<span class="date-type-tags__section';
          if (item.traffictypes && item.traffictypes.length > 0) appendString += ' date-type-tags__section--has-traffictype';
          appendString += '">' + item.section + '</span>';
          if (item.traffictypes && item.traffictypes.length > 0) {
            appendString += '<ul class="date-type-tags__type-list">';
            item.traffictypes.forEach(traffictype => { appendString += '<li class="date-type-tags__type date-type-tags__type--no-preceding-data"><a class="link" href="' + window.baseurl + item.url + '">' + traffictype + '</a></li>'; });
            appendString += '</ul>';
          }

        }
        else {
          //Date
          if (item.category !== "Sovellukset" && item.category !== "Kehityssuunnitelma") {
            appendString += '<span class="date-type-tags__date"><i class="material-icons md-md date-type-tags__date-icon">';
            item.category === 'Tapahtumat' ? appendString += 'event' : appendString += 'create';
            appendString += '</i>' + item.date + '</span>';
          }
          //Issue number
          if (item.issuenumber && item.issuenumber.length > 0) {
            appendString += '<span class="date-type-tags__id">' + item.issuenumber + '</span>';
          }
          //Category
          let category = item.category.replace(/^[a-z][a-z],\s/g, ""); // Strip language from category, eg. "en, News" -> "News"
          appendString += '<span class="date-type-tags__category"><a class="link" href="' + window.baseurl + itemlang + '/' + category.toLowerCase() + '">' + category + '</a></span>';
          //Traffictypes
          appendString += '<ul class="date-type-tags__type-list">';
          item.traffictypes.forEach(traffictype => { appendString += '<li class="date-type-tags__type"><a class="link" href="' + window.baseurl + itemlang + '/' + category.toLowerCase() + '?traffictype=' + traffictype.toLowerCase() + '">' + traffictype + '</a></li>'; });
          appendString += '</ul>';
          //Tags
          if (item.tags && item.tags.length > 0) {
            appendString += '<ul class="date-type-tags__tag-list">';
            item.tags.forEach(tag => { appendString += '<li class="date-type-tags__tag"><a class="link" href="' + window.baseurl + itemlang + '/' + category.toLowerCase() + '?tag=' + tag.toLowerCase() + '">' + tag + '</a></li>'; });
            appendString += '</ul>';
          }
          //Environments
          if (item.environments && item.environments.length > 0) {
            appendString += '<ul class="date-type-tags__tag-list">';
            item.environments.forEach(env => { appendString += '<li class="date-type-tags__tag"><a class="link" href="' + window.baseurl + itemlang + '/' + category.toLowerCase() + '?environment=' + env.toLowerCase() + '">' + env + '</a></li>'; });
            appendString += '</ul>';
          }
          //Status
          if (item.status && item.status.length > 0) {
            appendString += '<span class="date-type-tags__status"><a class="link" href="' + window.baseurl + itemlang + '/' + category.toLowerCase() + '?status=' + item.status.toLowerCase() + '">' + item.status + '</a></span>';
          }
        }
        // /Metadata
        appendString += '</div>';

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
      searchResults.innerHTML = '<div class="posts-in-category__no-posts">Hakua vastaavia sisältöjä ei löytnyt.</div>';
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

    // Initalize lunr with the fields it will be searching on
    var idx = lunr(function () {
      this.field('id');
      this.field('title');
      this.field('category');
      this.field('section');
      this.field('traffictypes');
      this.field('tags');
      this.field('content');
      this.field('issuenumber');
      this.field('environments');
      this.field('status');
    
      for (var key in window.store) { // Add the data to lunr
        this.add({
          'id': key,
          'title': window.store[key].title,
          'category': window.store[key].category,
          'section': window.store[key].section,
          'traffictypes': window.store[key].traffictypes,
          'tags': window.store[key].tags,
          'content': window.store[key].content,
          'issuenumber': window.store[key].issuenumber,
          'environments': window.store[key].environments,
          'status': window.store[key].status
        });
  
      }
    });
    
    var results = idx.search(searchTerm); // Get lunr to perform a search
    displaySearchResults(results, window.store); // We'll write this in the next section
  }
})();