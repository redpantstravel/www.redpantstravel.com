$(document).ready(function() {
  'use strict';

  var menuOpenIcon = $(".nav__icon-menu"),
    menuCloseIcon = $(".nav__icon-close"),
    menuList = $(".menu-overlay"),
    searchOpenIcon = $(".nav__icon-search"),
    searchCloseIcon = $(".search__close"),
    searchInput = $(".search__text"),
    searchBox = $(".search");


  /* =======================
  // Menu and Search
  ======================= */
  menuOpenIcon.click(function () {
    menuOpen();
  })

  menuCloseIcon.click(function () {
    menuClose();
  })

  searchOpenIcon.click(function () {
    searchOpen();
  });

  searchCloseIcon.click(function () {
    searchClose();
  });

  function menuOpen() {
    menuList.addClass("is-open");
  }

  function menuClose() {
    menuList.removeClass("is-open");
  }

  function searchOpen() {
    searchBox.addClass("is-visible");
    setTimeout(function () {
      searchInput.focus();
    }, 300);
  }

  function searchClose() {
    searchBox.removeClass("is-visible");
  }

  $('.search, .search__box').on('click keyup', function (event) {
    if (event.target == this || event.keyCode == 27) {
      $('.search').removeClass('is-visible');
    }
  });


  /* =======================
  // Animation Load Page
  ======================= */
  setTimeout(function(){
    $('body').addClass('is-in');
  },150)


  // =====================
  // Slick Slider
  // =====================
  $('.main-slider').slick({
    infinite: true,
    autoplay: true,
    autoplaySpeed: 8000,
    arrows: true,
    prevArrow: $('.prev'),
    nextArrow: $('.next'),
    slidesToShow: 3,
    slidesToScroll: 1,
    dots: false,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1
        }
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  });

  // Tag slider
  $('.featured-slider__box, .tag-slider__box').slick({
    infinite: true,
    autoplay: true,
    autoplaySpeed: 10000,
    arrows: false,
    draggable: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: false,
    fade: true,
    cssEase: 'linear'
  });


  // =====================
  // Ajax Load More
  // =====================
  var $load_posts_button = $('.load-more-posts');

  if (pagination_next_page_number === '') {
    $('.load-more-section').addClass('hide');
  }

  $load_posts_button.click(function(e) {
    e.preventDefault();
    var loadMore = $('.load-more-section');
    console.log(pagination_next_url);
    var request_next_link = pagination_next_url.split('/pagina')[0] + '/pagina/' + pagination_next_page_number + '/';
    console.log(request_next_link);

    $.ajax({
      url: request_next_link,
      beforeSend: function() {
        $load_posts_button.text('Cargando...');
      }
    }).done(function(data) {
      var posts = $('.grid__post', data);
      $('.grid').append(posts);

      setTimeout(function () {
        $('.fadein').addClass('inview');
      }, 50);

      $load_posts_button.text('Ver más');
      pagination_next_page_number++;

      if (pagination_next_page_number > pagination_available_pages_number) {
        loadMore.addClass('hide');
      }
    });
  });


  /* =======================
  // Responsive Videos
  ======================= */
  $(".post__content, .page__content").fitVids({
    customSelector: ['iframe[src*="ted.com"]', 'iframe[src*="player.twitch.tv"]', 'iframe[src*="facebook.com"]']
  });


  /* =======================
  // Zoom Image
  ======================= */
  $(".page img, .post img").attr("data-action", "zoom");
  $(".page a img, .post a img").removeAttr("data-action", "zoom");

  /* =================================
  // Fade In
  ================================= */
  $('.fadein').viewportChecker({
    classToAdd: 'inview',
    offset: 50
  });


  /* =======================
  // Scroll Top Button
  ======================= */
  $(".top").click(function() {
    $("html, body")
      .stop()
      .animate({ scrollTop: 0 }, "slow", "swing");
  });
  $(window).scroll(function() {
    if ($(this).scrollTop() > $(window).height()) {
      $(".top").addClass("is-active");
    } else {
      $(".top").removeClass("is-active");
    }
  });


  // remove style attr from search after page loads
  $('.search').removeAttr('style');
});
