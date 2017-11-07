window.onload = function () {
  var mySwiper = new Swiper('.swiper-container', {
    slidesPerView: 1
    , speed: 800
    , pagination: {
      el: '.swiper-pagination'
      , clickable: true
    , }
    , navigation: {
      nextEl: '.reviews__next'
      , prevEl: '.reviews__prew'
    , }
  , });
}
