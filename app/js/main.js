document.addEventListener('DOMContentLoaded', ready);

function ready() {
  /*==========
  variables
  ==========*/

  var body = document.body;
  var windowHeight = window.innerHeight || document.documentElement.clientHeight;
  var menu = document.getElementsByClassName('menu')[0];
  var navMobile = document.querySelector('.header_mobile .nav');
  var search = document.getElementsByClassName('header-search')[0];
  var searchWrapMobile = document.getElementsByClassName('header-search_mobile-wrap')[0];
  var searchBtn = document.getElementById('btn-search-1');
  var searchBtnMobile1 = document.getElementById('btn-search-mobile-1');
  var searchBtnMobile2 = document.getElementById('btn-search-mobile-2');
  var headerLangTitleMobile = document.getElementById('header-lang-title-mobile');
  var headerLangMobile = document.getElementById('header-lang-mobile');
  var content = document.getElementsByClassName('content')[0];
  var leftSide = document.getElementsByClassName('left-side')[0];
  var filtersItemTitles = document.getElementsByClassName('filters__title-h3');
  var shopsItemTitles = document.getElementsByClassName('shops-item__title');
  var productItemList = document.getElementsByClassName('_product__item');
  var productContList = document.getElementsByClassName('product-body-left');
  var faqItemList = document.getElementsByClassName('faq-item');
  var filtersMobileTitle = document.getElementsByClassName('filters-mobile__title')[0];
  var filtersMobile = document.getElementsByClassName('filters-mobile')[0];
  var filtersCloseBtn = document.getElementsByClassName('filters_close')[0];
  var productionTextMoreBtn = document.getElementsByClassName('about__text_span-more')[0];
  var productionText = document.getElementsByClassName('production-wrap')[0];
  var productMoreBtn = document.getElementsByClassName('_product-more')[0];
  var productText = document.getElementsByClassName('_product-content-wrap')[0];
  var productBodyTitleList = document.getElementsByClassName('_product-body__title');


  /*==========
  events
  ==========*/
  document.addEventListener("click", function(e) {
    closeAllSelect();
    closeSearh();
    closeSearchMobile(e);
  });
  menu.addEventListener('click', displayMenu, false);
  search.addEventListener('click', openSearch, false);
  searchBtnMobile1.addEventListener('click', openSearchMobile, false);
  headerLangTitleMobile.addEventListener('click', displayLangs, false);

  for (var i = 0; i < filtersItemTitles.length; i++)
    filtersItemTitles[i].addEventListener('click', function() {
      displayFilter(this.parentNode);
    }, false);

  for (var i = 0; i < shopsItemTitles.length; i++)
    shopsItemTitles[i].addEventListener('click', function() {
      displayShop(this.parentNode);
    }, false);

  for (var i = 0; i < productItemList.length; i++) {
    productItemList[i].addEventListener('click', displayProductCont, false);
  }

  for (var i = 0; i < faqItemList.length; i++)
    faqItemList[i].addEventListener('click', function() {
      displayFaq(this);
    }, false);

  if (filtersMobileTitle && filtersCloseBtn) {
    filtersMobileTitle.addEventListener('click', displayFiltersMobile, false);
    filtersCloseBtn.addEventListener('click', displayFiltersMobile, false);
  }

  if (productionTextMoreBtn) {
    productionTextMoreBtn.addEventListener('click', displayProductionText, false);
  }

  if (productMoreBtn) {
    productMoreBtn.addEventListener('click', displayProductText, false);
  }

  if (productBodyTitleList) {
    for (var i = 0; i < productBodyTitleList.length; i++) {
      productBodyTitleList[i].addEventListener('click', function() {
        displayProductBodyCont(this, this.nextElementSibling);
      });
    }
  }


  changePageClass();
  initSelect();
  initSwiper();



  /*==========
  functions
  ==========*/
  function displayMenu() {
    menu.classList.toggle('menu_open');
    navMobile.classList.toggle('nav_open');
  }

  function openSearch(e) {
    e.stopPropagation();
    search.classList.add('header-search_open');
  }

  function closeSearh() {
    search.classList.remove('header-search_open');
  }

  function openSearchMobile(e) {
    e.stopPropagation();
    searchWrapMobile.classList.add('header-search_mobile-wrap_open');
  }

  function closeSearchMobile(e) {
    if (!$(e.target).closest(searchWrapMobile).length) {
      searchWrapMobile.classList.remove('header-search_mobile-wrap_open');
    }
  }

  function displayLangs() {
    headerLangTitleMobile.classList.toggle('header-lang-title_open')
    headerLangMobile.classList.toggle('header-lang-wrap_open');
  }

  function changePageClass() {
    var pageName = window.location.pathname;

    switch (pageName) {
      case '/':
        content.classList.add('content-index');
        leftSide.classList.add('left-side-index');
        break;
      case '/catalog.html':
        leftSide.classList.add('left-side-catalog');
        break;
      case '/product-single.html':
        content.classList.add('content-product');
        leftSide.classList.add('left-side-product');
        break;
      case '/about.html':
        leftSide.classList.add('left-side-index');
      default:
        break;
    }
  }

  function displayFilter(filter) {
    filter.classList.toggle('filters-item_open');
  }

  function displayShop(shop) {
    shop.classList.toggle('shops-item_open');
  }

  function displayFaq(item) {
    item.classList.toggle('faq-item_open');

  }

  function initSelect() {
    var selectEl, divA, divB, divC, icon;
    filterSelect = document.getElementsByClassName("select-wrap");
    for (var i = 0; i < filterSelect.length; i++) {
      selectEl = filterSelect[i].getElementsByTagName("select")[0];
      divA = document.createElement("DIV");
      divA.setAttribute("class", "select__title");
      divA.innerHTML = selectEl.options[selectEl.selectedIndex].innerHTML;
      icon = document.createElement("span");
      icon.setAttribute("class", "select__arrow");
      divA.appendChild(icon);
      filterSelect[i].appendChild(divA);
      divB = document.createElement("DIV");
      divB.setAttribute("class", "select select_hide");
      for (var j = 1; j < selectEl.length; j++) {
        divC = document.createElement("DIV");
        divC.setAttribute("class", "select__option");
        divC.innerHTML = selectEl.options[j].innerHTML;
        divC.addEventListener("click", function(e) {
          var y, s, h;
          s = this.parentNode.parentNode.getElementsByTagName("select")[0];
          h = this.parentNode.previousSibling;
          for (var k = 0; k < s.length; k++) {
            if (s.options[k].innerHTML == this.innerHTML) {
              s.selectedIndex = k;
              h.innerHTML = this.innerHTML;
              h.appendChild(icon);
              y = this.parentNode.getElementsByClassName("select__option_selected");
              for (var n = 0; n < y.length; n++) {
                y[n].classList.remove("select__option_selected");
              }
              this.classList.add("select__option_selected");
              break;
            }
          }
          h.click();
        });
        divB.appendChild(divC);
      }
      filterSelect[i].appendChild(divB);
      divA.addEventListener("click", function(e) {
        e.stopPropagation();
        closeAllSelect(this);
        this.nextSibling.classList.toggle("select_hide");
        this.classList.toggle("select__title_active");
      });
    }
  }

  function closeAllSelect(el) {
    var x, y, i, arrNo = [];
    x = document.getElementsByClassName("select");
    y = document.getElementsByClassName("select__title");
    for (i = 0; i < y.length; i++) {
      if (el == y[i]) {
        arrNo.push(i)
      } else {
        y[i].classList.remove("select__title_active");
      }
    }
    for (i = 0; i < x.length; i++) {
      if (arrNo.indexOf(i)) {
        x[i].classList.add("select_hide");
      }
    }
  }



  /*==========
  slider
  ==========*/

  function initSwiper() {
    var productSlider = $('._product-slider')[0];
    var productSliderMobile = $('._product-slider_mobile')[0];
    var aboutSlider = $('._about-slider')[0];
    var aboutVideoSlider = $('._about-video-slider')[0];
    var productBodyListSlider = $('._product-body-list-slider');

    if (productSlider) {
      var galleryTop = new Swiper($(productSlider).find('.gallery-top'), {
        slidesPerView: 'auto'
      });
      var galleryThumbs = new Swiper($(productSlider).find('.gallery-thumbs'), {
        centeredSlides: true,
        slidesPerView: 'auto',
        touchRatio: 0.2,
        slideToClickedSlide: true,
        navigation: {
          nextEl: $(productSlider).find('.swiper-button-next'),
          prevEl: $(productSlider).find('.swiper-button-prev'),
        }
      });

      galleryTop.controller.control = galleryThumbs;
      galleryThumbs.controller.control = galleryTop;
    }

    if (productBodyListSlider) {
      productBodyListSlider.each(function(index, slider) {
        var swiper = new Swiper($(slider).find('.swiper-container'), {
          slidesPerView: 'auto'
        });
      });
    }

    if (aboutSlider) {
      var galleryTop = new Swiper($(aboutSlider).find('.gallery-top'), {
        slidesPerView: 'auto'
      });
      var galleryThumbs = new Swiper($(aboutSlider).find('.gallery-thumbs'), {
        centeredSlides: true,
        slidesPerView: 'auto',
        touchRatio: 0.2,
        slideToClickedSlide: true,
        navigation: {
          nextEl: $(aboutSlider).find('.swiper-button-next'),
          prevEl: $(aboutSlider).find('.swiper-button-prev'),
        }
      });

      galleryTop.controller.control = galleryThumbs;
      galleryThumbs.controller.control = galleryTop;
    }

    if (aboutVideoSlider) {
      var aboutVideoSwiper = new Swiper($(aboutVideoSlider).find('.swiper-container'), {
        slideToClickedSlide: true,
        slidesPerView: 'auto',
        navigation: {
          nextEl: $(aboutVideoSlider).find('.swiper-button-next'),
          prevEl: $(aboutVideoSlider).find('.swiper-button-prev'),
        }
      });
    }

    if (productSliderMobile) {
      var productSliderMobileSwiper = new Swiper($(productSliderMobile).find('.swiper-container'), {
        slideToClickedSlide: true,
        slidesPerView: 'auto',
        navigation: {
          nextEl: $(productSliderMobile).find('.swiper-button-next'),
          prevEl: $(productSliderMobile).find('.swiper-button-prev'),
        }
      });
    }
  }

  function displayProductCont(el) {
    var curEl = el.target;
    var curElId = curEl.dataset.id;
    var productCont = document.querySelectorAll('.product-body-left[data-id="' + curElId + '"]')[0];

    for (var i = 0; i < productContList.length; i++) {
      productContList[i].style.display = 'none';
    }
    for (var i = 0; i < productItemList.length; i++) {
      productItemList[i].classList.remove('product__item_active');
    }

    productCont.style.display = 'block';
    curEl.classList.add('product__item_active');
  }

  function displayFiltersMobile() {
    filtersMobile.classList.toggle('filters-mobile_open');
  }

  function displayProductionText() {
    if (productionText.classList.contains('production-wrap_open')) {
      productionText.classList.remove('production-wrap_open');
      productionTextMoreBtn.innerHTML = "Показать весь текст";
    } else {
      productionText.classList.add('production-wrap_open');
      productionTextMoreBtn.innerHTML = "Свернуть текст";
    }
  }

  function displayProductText() {
    if (productText.classList.contains('product-content-wrap_open')) {
      productText.classList.remove('product-content-wrap_open');
      productMoreBtn.innerHTML = "Показать все характеристики";
    } else {
      productText.classList.add('product-content-wrap_open');
      productMoreBtn.innerHTML = "Свернуть характеристики";
    }
  }

  function displayProductBodyCont(title, cont) {
    title.classList.toggle('product-body__title-1_open');
    cont.classList.toggle('product-body-cont_open');
  }
}