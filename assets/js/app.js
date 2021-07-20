const navbarBurger = () => {
  const burger = $(".navbar-burger"),
    menu = $(".navbar-menu");

  burger.click(() => {


    [burger, menu].forEach((el) => el.toggleClass('is-active'));
  });
}

$(() => {
  navbarBurger();
});


// active nav bar link

$(() => {
  const url = window.location.pathname;
  $("ul.mr-auto.navbar-nav li a").each(function(){
    if( $(this).attr("href")+"/" == url ) {
      $("ul.navbar-nav li a").removeClass("active");
      $("ul.navbar-nav li").removeClass("active");
      $(this).addClass("active");
      $(this).parents().addClass("active");
    }
  })
});


// nav bar search

$(() => {
  $("#search").click(function(event){
    event.preventDefault();
    $(".search-input-view").show();

    let data =  $('#search-input').val()
    if (data.length > 0) {
      const idx = lunr(function () {
        this.ref('id')
        this.field('title', {
          boost: 15
        })
        this.field('tags')
        this.field('content', {
          boost: 10
        })
    
        for (const key in window.store) {
          this.add({
            id: key,
            title: window.store[key].title,
            tags: window.store[key].category,
            content: window.store[key].content
          })
        }
      })
    
      // Perform the search
      const results = idx.search(data)
      // Update the list with results
      displayResults(results, window.store)
    }
  })
});

// parse user agent on downloads page

$(function() {
  const ua = $.ua.os.name;
  $("#download-page-buttons a").each(function(){
    if($(this).data('os') == ua) {
      $(this).addClass("active-os-cta");
      $(this).removeClass("btn-secondary");
    }
  })
});


// Search 

function displayResults (results, store) {
  const resultsContainer = document.getElementById('search-results')
  const mainContainer = document.getElementById('primary')
  const searchResults = document.getElementById('results')
  if (results.length) {
    let resultList = ''
    // Iterate and build result list elements
    for (const n in results) {
      const item = store[results[n].ref]
      resultList += '<li><p><a href="' + item.url + '">' + item.title + '</a></p>'
      resultList += '<p>' + item.content.substring(0, 400) + '...</p></li>'
    }
    searchResults.innerHTML = resultList
  } else {
    searchResults.innerHTML = 'No results found.'
  }

  resultsContainer.style.display = "block"
  mainContainer.style.display = "none"
}

// Docs navigation

$(function() {
  $("#docs-nav a.has-children").click(function(e){
    e.preventDefault();
    $(this).toggleClass("open");
    $(this).siblings('ul').each(function()
    {
      $(this).slideToggle(300);
    });
  })
});

$(function() {
  const url = window.location.pathname;
  $("#docs-nav a").each(function(){
    if($(this).attr("href") == url) {
      $(this).addClass("currentPage");
      $(this).parentsUntil("#docs-nav", "ul").each(function(){
        $(this).addClass("currentAncestor");
        $(this).siblings('a').each(function()
        {
          $(this).addClass("currentAncestor").addClass("open");
        });
      })
    }
  })
});

$(function() {
  $("body").append("<div id=\"docs-mobile-menu-overlay\" class=\"docs-mobile-menu-overlay\"></div>");

  $("#docs-mobile-menu-overlay").click(function(){
    $("body").removeClass("docs-mobile-menu-open");
    $(this).removeClass("show");
    setTimeout(function(){ $(this).hide(); }, 300);
  });

  $("#mobile-docs-toggler").click(function(){
    var overlay = $("#docs-mobile-menu-overlay");
    if(overlay.hasClass("show"))
    {
      $("body").removeClass("docs-mobile-menu-open");
      overlay.removeClass("show");
      setTimeout(function(){ overlay.hide(); }, 300);
    }
    else
    {
      $("body").addClass("docs-mobile-menu-open");
      overlay.show();
      setTimeout(function(){ overlay.addClass("show"); }, 10);
    }
  });
});