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

  /////////////////////////////////////
  ///// Section about us
  // More Paragraph
  $(".more").on("click", function (e) {
    // 1) Prevent default anchor
    e.preventDefault();
    // 2) Toggle class more on paragraph
    $(this).parent().children("p").toggleClass("more");
    // 3) Check if pargarph has class more or not
    if ($(this).parent().children("p").hasClass("more")) {
      $("html").attr("dir") === "ltr"
        ? $(this).text("less")
        : $(this).text("اقل");
    } else {
      $("html").attr("dir") === "ltr"
        ? $(this).text("view more")
        : $(this).text("المزيــــد");
    }
  });

  // Header slider
  $(".our-projects__wrapper").slick({
    lazyLoad: "progressive",
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 10000,
    arrows: false,
    dots: true,
    fade: true,
    cssEase: "linear",
  });

  /////////////////////////////////////
  //// Section our projects
  //
  const elementSlider = {
    wrapper: $(".our-projects__wrapper"),
    head: $("#head"),
    par: $("#par"),
  };

  // Async function render data slider
  async function renderDataSlider(url) {
    try {
      // 1) Get data from api
      const dataSlider = await $.get(url);

      // 2) For each all
      dataSlider.forEach((cur, index) => {
        // 1) Render img tag, and include data
        const image = `<img src=${cur.img} class="obj-image" alt=${cur.name} />`;
        // 2) Append image in slider
        elementSlider.wrapper.slick("slickAdd", image);
        // 3) Get index contains class active and get it index
        const indexActiveClass = $(".slick-dots li.slick-active").index();
        // 4) If indes === index active class / will be render paragraph from this index
        if (index === indexActiveClass) {
          elementSlider.head.text(cur.name);
          elementSlider.par.text(cur.par);
        }
      });

      // 3) Get id after changed
      elementSlider.wrapper.on("afterChange", function () {
        var indexCurrentSlide = $(".slick-current").attr("data-slick-index");
        elementSlider.head.text(dataSlider[indexCurrentSlide].name);
        elementSlider.par.text(dataSlider[indexCurrentSlide].par);
      });
    } catch (err) {
      alert("some error please try reload");
    }
  }
  // Run fn render data slider
  renderDataSlider("../localizition/api.json");

  /////////////////////////////////////
  //// Section our partners
  // 1) Get count images
  function showAndHidden(timer) {
    const countImages = $("#partners__image").children().length;
    let count = 0;
    //
    setInterval(() => {
      // 1) Check if count equal count image length will be return count = 0
      if (count === countImages) count = 0;

      // 2) Add class active on partners image
      $("#partners__image")
        .children()
        .eq(count)
        .addClass("partners__all-partners__image--active");

      // 3) Trigger set time out after 2900 will be remove class active
      setTimeout(() => {
        $("#partners__image")
          .children()
          .eq(count - 1)
          .removeClass("partners__all-partners__image--active");
      }, timer.setTimeOut);

      // 4) Finaly get variable count, and increment += 1
      count++;
    }, timer.setInterval);
  }

  // Run function SHOWANDHIDDEN
  if ($(document).outerWidth(true) > 768) {
    //
    showAndHidden({
      setTimeOut: 2400,
      setInterval: 2500,
    });
  }

  // Footer
  $("#year").text(new Date().getFullYear());
});
