const swiperWrapperEle = document.querySelector(".swiper-wrapper");

const SLIDER_DATA = [
  {
    id: 1000,
    type: "Bestseller",
    image: "/images/product_photo_01.png",
    name: "Dark blue alpine climbing jacket",
    price: "€300,00 EUR ",
  },
  {
    id: 1001,
    type: "Limited Edition",
    image: "/images/product_photo_02.png",
    name: "Orange helmet for alpine TOUNDRA",
    price: "€300,00 EUR ",
  },
  {
    id: 1002,
    type: "Bestseller",
    image: "/images/product_photo_03.png",
    name: "Grey alpine climbing jacket",
    price: "€300,00 EUR ",
  },
  {
    id: 1003,
    type: "Bestseller",
    image: "/images/product_photo_01.png",
    name: "Dark blue alpine climbing jacket",
    price: "€300,00 EUR ",
  },
  {
    id: 1004,
    type: "Bestseller",
    image: "/images/product_photo_02.png",
    name: "Dark blue alpine climbing jacket",
    price: "€300,00 EUR ",
  },
  {
    id: 1005,
    type: "Limited Edition",
    image: "/images/product_photo_01.png",
    name: "Dark blue alpine climbing jacket",
    price: "€300,00 EUR ",
  },
];

const swiper = new Swiper(".swiper", {
  // Navigation arrows
  navigation: {
    nextEl: ".swiper-button-next",
    disabledClass: "swiper-button-disabled",
  },
  loop: true,
  slidesPerView: 4,
  spaceBetween: 24,

  breakpoints: {
    // when window width is >= 300px
    200: {
      slidesPerView: 1,
      spaceBetween: 12,
    },
    650: {
      slidesPerView: 2,
      spaceBetween: 16,
    },
    // when window width is >= 1100px

    1100: {
      slidesPerView: 3,
    },
    // when window width is >= 1640px
    1600: {
      slidesPerView: 4,
    },
  },
});

const addSliderProduct = (product) => {
  const swiperSliderEle = document.createElement("Div");
  swiperSliderEle.classList.add("swiper-slide");
  swiperSliderEle.innerHTML = `
                            <div class="product-body">
                              <h4 class="best-seller">${product.type}</h4>
                              <img src="/images/Default.svg" alt="favourite" class="fav-icon" loading="lazy" >
                              <div class="image-container">
                                  <img src=${product.image} alt=${product.name} class="slider-image" loading="lazy" >
                              </div>
                          </div>
                          <div class="product-details">
                              <h3>${product.name}</h3>
                              <p>${product.price}</p>
                          </div>`;
  swiperWrapperEle.appendChild(swiperSliderEle);
};

const renderSliderProducts = () => {
  // clearing the  container before adding
  swiperWrapperEle.innerHTML = "";
  SLIDER_DATA.forEach((data) => {
    addSliderProduct(data);
  });
};

renderSliderProducts();
