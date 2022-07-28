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
    if($(".search-input-view").is(":hidden"))
    {
      event.preventDefault();
      $(".search-input-view").show();
    }
  });
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

// Docs navigation

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

// Applies to the current page in the docs-nav.

$(function() {
  $("#docs-nav a.currentPage").each(function(e){

    // Show children pages/sections in the docs-nav, if any.
    if ($(this).hasClass('has-children')){
      console.log("yes has children");

      $(this).addClass("open");
      showChildren(this);
    }
    $(this).siblings('.has-children-icon').each(function()
    {
      $(this).addClass("open");      
    });
  })
});

// For sections in the docs-nav, this applies to the drop-down icon's click event.
$(function() {
  $("#docs-nav a.has-children-icon").click(function(e){
    console.log("has-children-icon triggered");
    $(this).toggleClass("open");
    showChildren(this);
  })
});

// A helper function to show the list of children in the docs-nav.
function showChildren(e) {
  $(e).toggleClass("open");

  $(e).siblings('ul').each(function()
  {
    $(this).slideToggle(300);
  });
}


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

  $("a[href^=\\#]").click(function(e) {
    // Don't apply behavior to tabs
    if($(this).data("toggle") == "tab")
    {
      return;
    }

    var dest = $(this).attr('href');
    if(dest != "" && dest.length > 1 && $(dest).length > 0)
    {
      $('html,body').animate({ scrollTop: $(dest).offset().top - scrollOffset }, 'slow');
    }
  });
});

// Homepage Hero Slideshow
$(function()
{
  if($("#hero-slideshow").length > 0)
  {
    var slides = [];
    var i = 0;
    $("#hero-slideshow").find(".hero-slideshow-image").each(function()
    {
      slides[i] = $(this);
      ++i;
    });

    var slidesNum = slides.length;
    
    function setupSlides(index)
    {
      if(index < 0 || index >= slidesNum)
      {
        return;
      }

      var previousActive = $(".hero-slideshow-image.active");
      previousActive.addClass("fadeOut");
      slides[index].addClass("active");
      
      setTimeout(function() {
        previousActive.removeClass("fadeOut").removeClass("active");
      }, 1000);

      var nextIndex = index + 1;
      if (nextIndex == slidesNum)
      {
        nextIndex = 0;
      }

      setTimeout(function() {
        setupSlides(nextIndex);
      }, 7000);
    }

    setupSlides(0);
  }
  
});
