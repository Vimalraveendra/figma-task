const bodyEle = document.querySelector("body");
const swiperWrapperEle = document.querySelector(".swiper-wrapper");
const paginationListContainerEle = document.querySelector(
  ".pagination-container"
);
const paginationListEle = document.querySelectorAll(".pagination-container li");
const dropdownNumberEle = document.querySelector(".number");
const numberDropdownIconEle = document.querySelector(".dropdown-icon");
const productsListEle = document.querySelector(".products-list");

const sideMenuContainerEle = document.querySelector(".side-menu-container");
const menuIconEle = document.querySelector(".menu-icon");
const closeIconEle = document.querySelector(".side-menu-container .close-icon");
const overlayEle = document.querySelector(".overlay");
const popupContainerEl = document.querySelector(".popup-container");

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

// onload getting data
const getProductsList = async (pageSize = 14) => {
  try {
    let response = await fetch(
      `https://brandstestowy.smallhost.pl/api/random?pageNumber=1&pageSize=${pageSize}`
    );
    let data = await response.json();
    renderProductsList(data.data);
  } catch (err) {
    console.log(err);
  }
};
getProductsList();

const lazyLoadingImage = (entries, observer) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    setTimeout(() => {
      entry.target.src = entry.target.dataset.src;
    }, 1000);

    entry.target.addEventListener("load", () => {
      entry.target.classList.remove("lazy-loading");
      observer.unobserve(entry.target);
    });
  });
};
const lazyLoadingObserver = new IntersectionObserver(lazyLoadingImage, {
  threshold: 0.9,
});
const closeProductWindow = () => {
  popupContainerEl.classList.remove("show");
};

const renderProductWindow = (product) => {
  // clearing the  container before adding
  popupContainerEl.innerHTML = "";

  const popupDiv = document.createElement("div");
  popupDiv.classList.add("popup");
  popupDiv.innerHTML = `
    <span>ID:${product.id < 10 ? `0` + product.id : product.id}</span>
     <img src=${product.image} alt=${product.text} >
       <button id="close" onclick=closeProductWindow()> &#10006;</button>
       `;
  popupContainerEl.classList.add("show");
  popupContainerEl.appendChild(popupDiv);
};

const addProduct = (product) => {
  const productCardDiv = document.createElement("div");
  const productBannerDiv = document.createElement("div");
  productCardDiv.classList.add("list-product");
  productBannerDiv.classList.add("banner");
  if (product.id === 6) {
    productBannerDiv.innerHTML = `
       <img data-src="images/BANNER.png" alt="banner" class="lazy-loading">
        `;
    productsListEle.appendChild(productBannerDiv);
  }

  productCardDiv.innerHTML = `
      <span>ID:${product.id < 10 ? `0` + product.id : product.id}</span>
     <img data-src=${product.image} alt=${product.text} class="lazy-loading">
      `;

  productCardDiv.addEventListener("click", () => {
    renderProductWindow(product);
  });
  productsListEle.appendChild(productCardDiv);
};

const renderProductsList = (productsList) => {
  // clearing the  container before adding
  productsListEle.innerHTML = "";
  productsList.map((product, idx) => {
    addProduct(product);
  });
  const imgElements = document.querySelectorAll("img[data-src]");
  imgElements.forEach((img) => lazyLoadingObserver.observe(img));
};

numberDropdownIconEle.addEventListener("click", () => {
  if (paginationListContainerEle.className === "pagination-container") {
    paginationListContainerEle.classList.add("display");
  } else {
    paginationListContainerEle.classList.remove("display");
  }
});

paginationListEle.forEach((list) => {
  list.addEventListener("click", () => {
    dropdownNumberEle.textContent = list.textContent;
    const current = document.querySelector(".pagination-list-active");
    current.classList.remove("pagination-list-active");
    paginationListContainerEle.classList.remove("display");
    getProductsList(list.textContent);
    list.classList.add("pagination-list-active");
  });
});

const closeSideBar = (e) => {
  if (
    sideMenuContainerEle.contains(e.target) ||
    overlayEle.contains(e.target)
  ) {
    sideMenuContainerEle.classList.remove("display");
    setTimeout(() => overlayEle.classList.remove("enabled"), 500);
  }
};
menuIconEle.addEventListener("click", () => {
  sideMenuContainerEle.classList.add("display");
  setTimeout(() => overlayEle.classList.add("enabled"), 500);
});

closeIconEle.addEventListener("click", closeSideBar);
bodyEle.addEventListener("click", closeSideBar);
