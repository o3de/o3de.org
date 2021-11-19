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

// Lightbox behavior

$(function() {
  $("a.lightbox-trigger").click(function(e) {
    var lightboxId = $(this).data("lightbox");
    if(lightboxId)
    {
      var lightboxObject = $("#" + lightboxId);
      if(lightboxObject.hasClass("lightbox-content"))
      {
        e.preventDefault();
        lightboxObject.fadeIn(500);
      }
    }
  });
  
  $(".lightbox-content").click(function(e) {
    $(this).fadeOut(500);
  });
  
  $(".lightbox-content iframe").click(function(e) {
    e.preventDefault();
  });
});

// nav bar search

$(() => {
  $("#search").submit(function(event){
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
      // Update the search title
      $('#search-title').text('Search Results for ' + '"' + data + '"')
      // Update the list with results
      displayResults(results, window.store)
    }
  })
});

// --- Downloads page
// Handle click to switch between download pages.
$(function() {
  $(".os-selector-button").click(function(event){
    if($(this).hasClass("active"))
    {
      return;
    }

    // Switch enabled button
    $(".os-selector-button.active").removeClass("active");
    $(this).addClass("active");

    // Switch content
    $(".os-content.active").removeClass("active");
    $("#content-" + $(this).data("os")).addClass("active");
  });
});

// Detect anchor in URL on load and select appropriate tab.
// This uses the click to switch function, so it must be defined after it.
$(function() {
  // Retrieve the hash from the url.
  var hash = $(location).attr('hash').replace( /#/, "" );

  // Try to click the appropriate button.
  // If it doesn't exist, this will just do nothing.
  $("#os-" + hash).trigger("click");
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
        $(this).parent('li').addClass("currentAncestorCategory");
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

// Detect anchor links, add correct offset and scroll behavior.
$(function() {
  var scrollOffset = $(".main-navbar").height() + 32;

  $('a[href*=\\#]').click(function(e) {
    var dest = $(this).attr('href');
    if(dest != "" && dest.length > 1 && $(dest).length > 0)
    {
      $('html,body').animate({ scrollTop: $(dest).offset().top - scrollOffset }, 'slow');
    }
  });
});