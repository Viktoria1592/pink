window.onload = function() {
  var mySwiper = new Swiper('.swiper-container', {
    slidesPerView: 3,
    // spaceBetween: 40,
    speed: 300,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.reviews-next',
      prevEl: '.reviews-prev',
    },
    breakpoints: {
      // 1280: {
      //   slidesPerView: 3,
      //   spaceBetween: 40,
      // },
      // 1024: {
      //   slidesPerView: 2,
      //   spaceBetween: 60,
      // },
      // 640: {
      //   slidesPerView: 1,
      // },
    },
  });
}
