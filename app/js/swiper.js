var mySwiper = new Swiper ('.swiper-container', {
// slidesPerView: 1,
    speed: 300,
    centeredSlides: true,
    pagination: {
      el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    }
  });