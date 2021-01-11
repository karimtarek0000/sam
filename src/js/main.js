jQuery(function () {
  /////////////////////////////////////
  //// Navbar
  //
  $(".nav-link").on("click", function (e) {
    // Check if this key not equal home will be run all action
    if ($(this).attr("key") !== "home") {
      // 1) Prevent default
      e.preventDefault();

      // 2) Get the attr section
      const attrSection = $(this).data("section");

      // 3) Remove class show when click link
      $(this).parentsUntil("navbar-collapse").removeClass("show");

      // 4) Set the section in variable
      const section = $(`#${attrSection}`);

      // 5) Check if this link exsist will be run all action
      if (Object.keys(section).length !== 0) {
        // 1) Animate to the section
        $("html, body").animate(
          {
            scrollTop: section.offset().top - 20,
          },
          1000
        );
      } else {
        // 1) Set item in localStorage
        localStorage.setItem("sectionName", attrSection);
        // 2) Replace page to home
        location.assign("/");
      }
    }
  });

  /////////////////////////////////////
  //// Get section name, and scroll to the section in the same name from the localStorage
  //
  // 1) Get sction name from localStorage
  const getSectionName = localStorage.getItem("sectionName");

  // 2) Check if pathname home, and localStorage not equal null will be run all action
  if (location.pathname == "/" && getSectionName !== null) {
    $("html, body").animate(
      {
        scrollTop: $(`#${getSectionName}`).offset().top - 20,
      },
      1000,
      () => {
        // Finaly remove sectionName from localStorage
        localStorage.removeItem("sectionName");
      }
    );
  }

  /////////////////////////////////////
  //// Change lang
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
  let getLanguage = localStorage.getItem("language");
  // If there local storage in site with name language will be render language site with in the same language if not will be render language site with selected lang from select box
  if (getLanguage !== null) {
    changeSelectLang(getLanguage);
    renderLanguage(getLanguage);
  } else {
    getLanguage = $(".change_lang").val();
    renderLanguage(getLanguage);
    changeSelectLang(getLanguage);
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

  // Section our projects
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

  // Header projects slider
  $(".header-projects__wrapper").slick({
    lazyLoad: "progressive",
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: true,
    prevArrow: `<svg class='a-left prev slick-prev'>
    <use xlink:href="../icons/sprite.svg#icon-angle-left">
    </svg>`,
    nextArrow: `<svg class='a-right next slick-next'>
    <use xlink:href="../icons/sprite.svg#icon-angle-right">
    </svg>`,
    responsive: [
      {
        breakpoint: 793,
        settings: {
          arrows: false,
        },
      },
    ],
  });

  // Other projects slider
  $(".other-projects__wrapper").slick({
    lazyLoad: "progressive",
    infinite: false,
    slidesToShow: 3,
    slidesToScroll: 3,
    prevArrow: `<svg class='a-left prev slick-prev'>
    <use xlink:href="../icons/sprite.svg#icon-angle-left">
    </svg>`,
    nextArrow: `<svg class='a-right next slick-next'>
    <use xlink:href="../icons/sprite.svg#icon-angle-right">
    </svg>`,
    arrows: true,
    responsive: [
      {
        breakpoint: 793,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          arrows: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
        },
      },
    ],
  });

  /////////////////////////////////////
  const urlApi = `../api/${getLanguage}.json`;
  //// Section our projects
  //
  const elementSlider = {
    wrapper: $(".our-projects__wrapper"),
    head: $("#head"),
    par: $("#par"),
    btn: $("#viewMoreProject"),
  };

  // Async function render data slider
  async function renderDataSlider(url) {
    try {
      // 1) Get data from api
      const dataSlider = await $.get(url);

      // 2) For each all
      dataSlider.forEach((cur, index) => {
        // 1) Render img tag, and include data
        const image = `<img src=${cur.img[0]} class="obj-image" alt=${cur.name} />`;
        // 2) Append image in slider
        elementSlider.wrapper.slick("slickAdd", image);
        // 3) Get index contains class active and get it index
        const indexActiveClass = $(".slick-dots li.slick-active").index();
        // 4) If indes === index active class / will be render paragraph from this index
        if (index === indexActiveClass) {
          elementSlider.head.text(cur.name);
          elementSlider.par.text(cur.description);
        }
      });

      // 3) Get id after changed
      let indexDataArray = $(".slick-dots li.slick-active").index();

      //
      elementSlider.wrapper.on("afterChange", function () {
        // 1) Get current index after change slider
        var indexCurrentSlide = $(".slick-current").attr("data-slick-index");
        // 2) Update var => indexDataArray equal indexCurrentSlide
        indexDataArray = indexCurrentSlide;
        // 3) Change head, and par with index data from API
        elementSlider.head.text(dataSlider[indexCurrentSlide].name);
        elementSlider.par.text(dataSlider[indexCurrentSlide].description);
      });

      // 4) When clicked in btn will be get data the current
      elementSlider.btn.on("click", (e) => {
        // 1) Get data with index the current slide, and convert to json
        const data = dataSlider[indexDataArray]["id"];
        // 2) Finaly store data in localstorge
        localStorage.setItem("projectId", data);
      });
    } catch (err) {
      alert("some error please try reload");
    }
  }
  // Run fn render data slider
  renderDataSlider(urlApi);

  /////////////////////////////////////
  // Page Projects
  if (location.pathname.includes("project")) {
    //
    const elementProjects = {
      name: $("#projectName"),
      location: $("#projectLocation"),
      date: $("#projectDate"),
      description: $("#projectDesc"),
      wrapper1: $("#projectsWrapper"),
      wrapper2: $("#otherProjectsWrapper"),
    };
    //
    const getDataLocalStorage = +localStorage.getItem("projectId") || 1;
    //
    if (getDataLocalStorage !== null) {
      // 1) Get date from api
      $.get(urlApi).done((data) => {
        // 2) For each all data
        $.each(data, (i, cur) => {
          // 3) If cur.id equal getDateLocalStorage
          if (cur.id === getDataLocalStorage) {
            // 4) Add all date into each field
            elementProjects.name.text(cur.name);
            elementProjects.location.text(cur.city);
            elementProjects.date.text(cur.date);
            elementProjects.description.text(cur.description);

            // 5) Render img tag, and include data
            $.each(cur.img, (i, img) => {
              const image = `<img src=${img} class="obj-image" alt=${cur.name} />`;
              // 2) Append image in slider
              elementProjects.wrapper1.slick("slickAdd", image);
            });
          } else {
            // 1) Create card
            const card = `
                <div class="card-projects text-capitalize" key=${cur.id}>
                    <div class="other-projects__wrapper__image">
                        <img class="img-fluid obj-image" src=${cur.img[0]} alt=${cur.name} />
                    </div>
                    
                    <h4 class="h-small weight-bold mt-2 mb-3">${cur.name}</h4>
                    <p class="m-0 mb-1">${cur.city}</p>
                    <p class="m-0">${cur.date}</p>
                </div>
            `;
            // 2) Append image in slider
            elementProjects.wrapper2.slick("slickAdd", card);
          }
        });
      });
    }
  }

  // Add event click on card products
  $(document).on("click", ".card-projects", function () {
    // 1) Get id from attributes => key
    const getId = $(this).attr("key");

    // 2) Update local storage => projectId
    localStorage.setItem("projectId", getId);

    // 3) Finaly animate scroll top 0, and callback function location reload
    $("html, body").animate(
      {
        scrollTop: 0,
      },
      500,
      function () {
        location.reload();
      }
    );
  });
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

  /////////////////////////////////////
  // Run function SHOWANDHIDDEN
  if ($(document).outerWidth(true) > 768) {
    //
    showAndHidden({
      setTimeOut: 2400,
      setInterval: 2500,
    });
  }

  /////////////////////////////////////
  //// Footer
  $("#year").text(new Date().getFullYear());

  //
});
