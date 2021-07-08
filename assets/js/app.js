const navbarBurger = () => {
  const burger = $(".navbar-burger"),
    menu = $(".navbar-menu");

  burger.click(() => {


    [burger, menu].forEach((el) => el.toggleClass('is-active'));
  });
}

$(() => {
  // console.log("Welcome to the CNCF's Hugo + Netlify starter");

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
    console.log("SEARCH ICON CLICKED");
    $(".search-input-view").show();

    let data =  $('#search-input').val()
    console.log("DATA FROM SEARCH INPUT: ", data, "    data length: ", data.length, "    data length check: ", data.length>0);
    if (data.length > 0) {
      console.log("IN IF CASE");
    
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


//active links on docs 

$(function() {
  const url = window.location.href;
  $("#accordionExample .card a").each(function(){
       if($(this).attr("href") == url || $(this).attr("href") == '' ) {
        $(this).addClass("currentPage");
        $(this).parents().addClass("currentLi");
        $(this).closest(".card-body").parent().addClass("show");
       }
  })
  $('.currentLi').children().addClass("show");
  $('.currentLi').children('i').removeClass("fa-chevron-right");
  $('.currentLi').children('i').addClass("fa-chevron-down");

  $('.docs-sidebar').animate({
    //scrollTop: ($('.currentPage').first().offset().top - 75)
  },500);
});


// parse user agent on downloads page

$(function() {
  console.log($.ua.os.name); 
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

// Get the query parameter(s)
// const params = new URLSearchParams(window.location.search)
// const query = params.get('query')

// Perform a search if there is a query
// if (query) {
//   // Retain the search input in the form when displaying results
//   document.getElementById('search-input').setAttribute('value', query)

//   const idx = lunr(function () {
//     this.ref('id')
//     this.field('title', {
//       boost: 15
//     })
//     this.field('tags')
//     this.field('content', {
//       boost: 10
//     })

//     for (const key in window.store) {
//       this.add({
//         id: key,
//         title: window.store[key].title,
//         tags: window.store[key].category,
//         content: window.store[key].content
//       })
//     }
//   })

//   // Perform the search
//   const results = idx.search(query)
//   // Update the list with results
//   displayResults(results, window.store)
// }