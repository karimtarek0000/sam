jQuery(function () {
  //// Navbar
  //   $(".nav-link").on("click", function () {
  //     // 1) Remove class show when click link
  //     $(this).parentsUntil("navbar-collapse").removeClass("show");
  //   });
  // Scroll document
  //   $(document).on("scroll", function () {
  //     //
  //     $(document).scrollTop() >= 1000
  //       ? $("#scrollUp").addClass("fadeIn")
  //       : $("#scrollUp").removeClass("fadeIn");
  //   });
  //   // Scroll up document
  //   $("#scrollUp").on("click", () => {
  //     $("html, body").animate(
  //       {
  //         scrollTop: 0,
  //       },
  //       1000
  //     );
  //   });
  //////////
  // Change lang
  // 1) Render language
  async function renderLanguage(getLang) {
    // 2) Get data
    const localizition = await $.get(`../localizition/${getLang}.json`);
    // 3) Change language
    if (getLang === "ar") {
      $("html").attr({ dir: "rtl", lang: "ar" });
    } else {
      $("html").attr({ dir: "ltr", lang: "en" });
    }
    // Form
    // $("form")
    //   .find(`[key]`)
    //   .each(function (i, cur) {
    //     //
    //     if ($(cur).is("input, textarea")) {
    //       $(cur).attr(
    //         "placeholder",
    //         localizition.pages[$(this).attr("key")]["form"][
    //           $(this).data("lang")
    //         ]
    //       );
    //     }
    //     //
    //     if ($(cur).is("label, button")) {
    //       $(cur).text(
    //         localizition.pages[$(this).attr("key")]["form"][
    //           $(this).data("lang")
    //         ]
    //       );
    //     }
    //   });
    // Navbar links
    // $(".navbar-nav a").each((i, cur) =>
    //   $(cur).text(localizition.navbar[$(cur).attr("key")])
    // );
  }
  // 2) When change lang
  $(".change_lang").on("change", function () {
    // 1) Get new value from select element
    let getLang = $(this).val();
    // 2) Set new value in item
    localStorage.setItem("language", getLang);
    // 3) Reload page
    location.reload();
  });
  // Change select lang
  function changeSelectLang(lang) {
    $(".change_lang option").each((i, cur) => {
      if ($(cur).attr("value") === lang) {
        $(cur).attr("selected", true).siblings().removeAttr("selected");
      }
    });
  }
  //
  const getLanguage = localStorage.getItem("language");
  // If there local storage in site with name language will be render language site with in the same language if not will be render language site with selected lang from select box
  if (getLanguage !== null) {
    changeSelectLang(getLanguage);
    renderLanguage(getLanguage);
  } else {
    const getLang = $(".change_lang").val();
    renderLanguage(getLang);
    changeSelectLang(getLang);
  }
  // Change dir slider
  //   $(".slick-slider").addClass("direction-ltr");
  //
  //   $("footer #date").text(new Date().getFullYear());
  // Lazy loading image
  // All images
  //   const allImages = $("[data-src]");
  // Preload image
  //   function preloadImages(img) {
  //     const src = $(img).data("src");
  //     if (!src) return;
  //     img.src = src;
  //     $(img).removeAttr("data-src");
  //   }
  //   //
  //   const ImageObServer = new IntersectionObserver(
  //     (entries, ImageObServer) => {
  //       $(entries).each((i, cur) => {
  //         if (!cur.isIntersecting) {
  //           cur.target.classList.add("fadeOut");
  //           return;
  //         } else {
  //           //
  //           preloadImages(cur.target);
  //           cur.target.classList.remove("fadeOut");
  //           cur.target.classList.add("fadeIn");
  //           ImageObServer.unobserve(cur.target);
  //         }
  //       });
  //     },
  //     {
  //       threshold: 0,
  //     }
  //   );
  //   //
  //   allImages.each((i, cur) => ImageObServer.observe(cur));
});

// Header slider
// $(".header__slider, .testimonial").slick({
//   infinite: false,
//   slidesToShow: 1,
//   slidesToScroll: 1,
//   autoplay: true,
//   autoplaySpeed: 5000,
//   arrows: true,
//   prevArrow: `<svg class='a-left control-c prev slick-prev'>
//     <use xlink:href="../icons/sprite.svg#icon-Angle-Left">
//     </svg>`,
//   nextArrow: `<svg class='a-right control-c next slick-next'>
//     <use xlink:href="../icons/sprite.svg#icon-Angle-Right">
//     </svg>`,
//   responsive: [
//     {
//       breakpoint: 600,
//       settings: {
//         slidesToShow: 1,
//         slidesToScroll: 1,
//         dots: false,
//         arrows: false,
//       },
//     },
//   ],
// });
