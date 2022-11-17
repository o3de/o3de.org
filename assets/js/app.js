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

      // Apply attributes to the parent pages/sections for styling.
      $(this).parentsUntil("#docs-nav", "ul").each(function(){
        $(this).addClass("currentAncestor");
        $(this).siblings('a').each(function()
        {
          $(this).addClass("currentAncestor").addClass("open");          
        });                  
        $(this).parent('li').addClass("currentAncestorCategory");    
      })
      $(this).parent('li').addClass("currentAncestorCategory");    
      
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
      $(this).addClass("currentPage");
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
  $(e).siblings('ul').each(function()
  {
    $(this).slideToggle(300);
  });
}

// A helper function to build the dropdown for the version switcher.
function buildSelectElement(currentOrigin) {
    // TODO: Load this from config.toml? (Also, use a simple key-value pair since 'name' is not being used.)
    const branches = [];
    branches[0] = { name:"main", url:"https://www.o3de.org", displayName:"22.10 (latest)" };
    branches[1] = { name:"development", url:"https://development--o3deorg.netlify.app", displayName:"development" };
    branches[2] = { name:"2205", url:"https://2205--o3deorg.netlify.app", displayName:"22.05" };

    var urlMatched = false;
    var html = ['Version: <select>'];
    
    // Build the <select> element.
    branches.forEach(function(value) {
        html.push('<option value="' + value.url + '"');
        if (value.url == currentOrigin) {
            urlMatched = true;
            html.push(' selected="selected"');
        }
        html.push('>' + value.displayName + '</option>');
    });

    // Add the current host if it's not one of the standard published branches.
    if (!urlMatched) {
        html.push('<option value="' + currentOrigin + '" selected="selected">');
        if (currentOrigin.includes("localhost")) {
            html.push('local</option>');
        }
        else if (currentOrigin.includes("deploy-preview")) {
            html.push('preview</option>');
        }
        else {
            html.push(currentOrigin + '</option>');
        }
    }

    html.push('</select>');
    
    return html.join("");
}

// For docs navbar, switch to a different published docset.
$(function() {
    // Build the dropdown for the version switcher, based on the origin part of the URL.
    $("#version-switcher").html(buildSelectElement(window.location.origin));

    // Set up the onChange event handler for the version switcher to load the current page from the selected location.
    $("#version-switcher").on("change", function(event) {
        // Get new host from selected version.
        const newHost = event.target.value;
        
        // Build a new URL using new host and old path.
        const newURL = new URL(newHost + window.location.pathname);
        var newHref = newURL.href;

        // Load the new location.
        if (newHref != window.location.href) {
            window.location.href = newHref;
        }
    });

    // If an info or warning banner is present, adjust the top of the left nav so that it doesn't scroll when scrolling the contents of the page.
    if ($("#preview-info").length > 0 || $("#version-warning").length > 0) {
        $(".docs-sidebar").css("top", $(".sticky-top").height());
    }
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
