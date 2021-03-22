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
        $(this).closest(".card-body").parent().addClass("show");
       }
  })
  console.log ($('.currentPage').first().offset().top);

  $('.docs-sidebar').animate({
    scrollTop: ($('.currentPage').first().offset().top - 75)
  },500);
});
