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
    scrollTop: ($('.currentPage').first().offset().top - 75)
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


