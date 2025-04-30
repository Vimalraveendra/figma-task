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
const navListEle = document.querySelectorAll(".nav-list-container li");
const sideListEle = document.querySelectorAll(".side-menu-list li");
const sliderButtonEle = document.querySelector(".slider-arrow");
const progressBarEle = document.querySelector(".progress-bar");

const SLIDER_DATA = [
  {
    id: 1000,
    type: "Bestseller",
    image: "images/product_photo_01.png",
    name: "Dark blue alpine climbing jacket",
    price: "€300,00 EUR ",
  },
  {
    id: 1001,
    type: "Limited Edition",
    image: "images/product_photo_02.png",
    name: "Orange helmet for alpine TOUNDRA",
    price: "€300,00 EUR ",
  },
  {
    id: 1002,
    type: "Bestseller",
    image: "images/product_photo_03.png",
    name: "Grey alpine climbing jacket",
    price: "€300,00 EUR ",
  },
  {
    id: 1003,
    type: "Bestseller",
    image: "images/product_photo_01.png",
    name: "Dark blue alpine climbing jacket",
    price: "€300,00 EUR ",
  },
  {
    id: 1004,
    type: "Bestseller",
    image: "images/product_photo_02.png",
    name: "Dark blue alpine climbing jacket",
    price: "€300,00 EUR ",
  },
  {
    id: 1005,
    type: "Limited Edition",
    image: "images/product_photo_01.png",
    name: "Dark blue alpine climbing jacket",
    price: "€300,00 EUR ",
  },
];

// swiper js
const swiper = new Swiper(".swiper", {
  // Navigation arrows
  navigation: {
    nextEl: ".swiper-button-next",
    disabledClass: "swiper-button-disabled",
  },
  pagination: {
    el: ".swiper-pagination",
    type: "progressbar",
  },
  slidesPerView: 4,
  spaceBetween: 24,
  observer: true,
  observeParents: true,
  loop: true,

  breakpoints: {
    // when window width is >= 300px
    200: {
      slidesPerView: 1.2,
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

// product slider
const addSliderProduct = (product) => {
  const swiperSliderEle = document.createElement("div");
  swiperSliderEle.classList.add("swiper-slide");
  swiperSliderEle.innerHTML = `
                            <div class="product-body">
                              <h4 class=${
                                product.type === "Bestseller"
                                  ? "best-seller"
                                  : "limited-edition"
                              }>${product.type}</h4>
                              <img src="images/Default.svg" alt="favourite" class="fav-icon" loading="lazy" >
                              <div class="image-container">
                                  <img src=${product.image} alt=${
    product.name
  } class="slider-image" loading="lazy" >
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

// image lazy loading
const lazyLoadingImage = (entries, observer) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.src = entry.target.dataset.src;

    entry.target.addEventListener("load", () => {
      entry.target.style.opacity = 1;
      entry.target.classList.remove("lazy-loading");
      observer.unobserve(entry.target);
    });
  });
};
const lazyLoadingObserver = new IntersectionObserver(lazyLoadingImage, {
  threshold: 0.9,
});
//product popup window
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

// products list
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

// product dropdown number
numberDropdownIconEle.addEventListener("click", () => {
  if (paginationListContainerEle.className === "pagination-container") {
    paginationListContainerEle.classList.add("display");
  } else {
    paginationListContainerEle.classList.remove("display");
  }
});

//nav list element active
const toggleActiveClass = (list, idx, activeClassName) => {
  return list.addEventListener("click", () => {
    const current = document.querySelector(` .${activeClassName}`);
    current.classList.remove(activeClassName);

    if (idx === 0 ? idx + 1 : idx) {
      navListEle[idx].classList.add(activeClassName);
    } else if (activeClassName === "pagination-list-active") {
      if (dropdownNumberEle.textContent !== list.textContent) {
        getProductsList(list.textContent);
      }
      dropdownNumberEle.textContent = list.textContent;
      paginationListContainerEle.classList.remove("display");
      list.classList.add(activeClassName);
    } else {
      list.classList.add(activeClassName);
    }
  });
};
navListEle.forEach((list) => {
  toggleActiveClass(list, "", "active");
});

sideListEle.forEach((list, idx) => {
  toggleActiveClass(list, idx, "active");
});
paginationListEle.forEach((list) => {
  toggleActiveClass(list, "", "pagination-list-active");
});

// progress bar width change
let counter = 0;
let progress = 0;
const updateProgressBar = () => {
  let imageCount = 4;
  const wrapperEle = document.querySelector(".wrapper").clientWidth;
  if (wrapperEle >= 1660) {
    progress += 25;
  } else if (wrapperEle >= 1100) {
    imageCount = 3;
    progress += 30;
  } else if (wrapperEle >= 600) {
    imageCount = 2;
    progress += 50;
  } else {
    imageCount = 1;
    progress += 100;
  }
  if (counter > imageCount) {
    counter = 0;
    progress = 0;
    progressBarEle.style.width = `0%`;
  }
  progressBarEle.style.width = `${progress}%`;
};
sliderButtonEle.addEventListener("click", () => {
  if (counter <= 4) {
    counter++;
    updateProgressBar(progress);
  } else {
    counter = 0;
    progress = 0;
  }
});

// side bar menu
const closeSideBar = (e) => {
  if (
    sideMenuContainerEle.contains(e.target) ||
    overlayEle.contains(e.target)
  ) {
    sideMenuContainerEle.classList.remove("display");
    bodyEle.style.overflow = "visible";
    setTimeout(() => overlayEle.classList.remove("enabled"), 500);
  }
};
menuIconEle.addEventListener("click", () => {
  sideMenuContainerEle.classList.add("display");
  bodyEle.style.overflow = "hidden";
  setTimeout(() => overlayEle.classList.add("enabled"), 500);
});

closeIconEle.addEventListener("click", closeSideBar);
bodyEle.addEventListener("click", closeSideBar);
