jQuery(function () {
  /////////////////////////////////////
  //// 1) Navbar
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
    setTimeout(() => {
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
    }, 1000);
  }

  /////////////////////////////////////
  //// 2) Change lang
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
    $(".navbar-nav a").each((i, cur) =>
      $(cur).text(localizition.navbar[$(cur).attr("key")])
    );

    // heading, button
    $(".heading, .button").each((i, cur) => {
      $(cur).text(localizition.pages[$(cur).attr("key")][$(cur).data("lang")]);
    });
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
  ///// 3) Section about us
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
        : $(this).text("شاهد المزيــــد");
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
  // All API
  const API = {
    apiAllProjects: "https://sam-construction.com/sam/api/projects",
    apiProject: "https://sam-construction.com/sam/api/projects/",
    apiAboutUs: "https://sam-construction.com/sam/api/pages/1",
    apiPartners: "https://sam-construction.com/sam/api/partners",
  };

  // All names into api
  const namesFromApi = {
    id: "project_id",
    name: "project_name",
    description: "project_description",
    date: "year",
    city: "city",
    titleAboutUs: "page_title",
    descAboutUs: "page_body",
  };

  // Global ajax setup
  $.ajaxSetup({
    headers: {
      Accept: "application/json",
      "Accept-Language": getLanguage,
    },
  });

  // Section about us
  function renderDataAboutUs(url) {
    // 1) All element
    const element = {
      title: $("#titleAboutUs"),
      description: $("#descAboutUs"),
    };

    // 2) Get data from api
    $.get(url).then(({ Data }) => {
      element.title.text(Data[namesFromApi.titleAboutUs]);
      element.description.text(Data[namesFromApi.descAboutUs]);
    });
  }

  // Section our projects
  const elementSlider = {
    wrapper: $(".our-projects__wrapper"),
    name: $("#head"),
    description: $("#par"),
    btn: $("#viewMoreProject"),
  };

  // Section our projects => Function render data slider
  function renderDataSlider(url) {
    // 1) Get data from api
    $.get(url)
      .then(({ Data }) => {
        // 1) For each all
        Data.forEach((cur, index) => {
          // 1) Render img tag, and include data
          const image = `<img src=${cur.image} class="obj-image" alt=${
            cur[namesFromApi.name]
          } />`;
          // 2) Append image in slider
          elementSlider.wrapper.slick("slickAdd", image);

          // 3) Get index contains class active and get it index
          const indexActiveClass = $(".slick-current").attr("data-slick-index");

          // 4) If indes === index active class / will be render paragraph from this index
          if (index == indexActiveClass) {
            elementSlider.name.text(cur[namesFromApi.name]);
            elementSlider.description.text(cur[namesFromApi.description]);
          }
        });

        // 2) Get id after changed
        let indexDataArray = $(".slick-dots li.slick-active").index();

        // 3) After change slider
        elementSlider.wrapper.on("afterChange", function () {
          // 1) Get current index after change slider
          const indexCurrentSlide = $(".slick-current").attr(
            "data-slick-index"
          );

          // 2) Update var => indexDataArray equal indexCurrentSlide
          indexDataArray = indexCurrentSlide;

          // 3) Change head, and par with index data from API
          elementSlider.name.text(Data[indexCurrentSlide][namesFromApi.name]);
          elementSlider.description.text(
            Data[indexCurrentSlide][namesFromApi.description]
          );
        });

        // 4) When clicked in btn will be get data the current
        elementSlider.btn.on("click", (e) => {
          // 1) Get data with index the current slide, and convert to json
          const data = Data[indexDataArray][namesFromApi.id];
          // 2) Finaly store data in localstorge
          localStorage.setItem("projectId", data);
        });
      })
      .catch((err) => {
        alert("some errors please try reload this page");
      });
  }

  // Section partners => Function render data part
  function renderDataPartners(url) {
    //
    $.get(url).done(({ Data }) => {
      $.each(Data, (i, cur) => {
        const createImage = `
          <div class="col-6 col-md-2 partners__all-partners__image py-3 overflow-hidden">
              <img src=${cur.image} alt=${cur.name} />
          </div>
        `;
        $("#partners__image").append(createImage);
      });
    });
  }

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

    // 1) Get localstorage => project id || 1
    const getDataLocalStorage = +localStorage.getItem("projectId") || 1;

    //////////////////////////////
    // 2) Get date from api
    $.get(`${API.apiProject}${getDataLocalStorage}`).done(({ Data }) => {
      // 1) Add all date into each field
      elementProjects.name.text(Data[namesFromApi.name]);
      elementProjects.location.text(Data[namesFromApi.city]);
      elementProjects.date.text(Data[namesFromApi.date]);
      elementProjects.description.text(Data[namesFromApi.description]);

      // 2) Render img tag, and include data
      $.each(Data["project_slider"], (i, img) => {
        // 1) Create image tag
        const image = `<img src=${img} class="obj-image" alt=${
          Data[namesFromApi.name]
        } />`;
        // 2) Append image in slider
        elementProjects.wrapper1.slick("slickAdd", image);
      });

      // 3) Add other projects
      $.each(Data["other_projects"], (i, project) => {
        // 1) Create card element
        const card = `
            <div class="card-projects text-capitalize" key=${
              project[namesFromApi.id]
            }>
                <div class="other-projects__wrapper__image">
                    <img class="img-fluid obj-image" src=${project.image} alt=${
          project[namesFromApi.name]
        } />
                </div>
                <h4 class="h-small weight-bold mt-2 mb-3">${
                  project[namesFromApi.name]
                }</h4>
                <p class="m-0 mb-1">${project[namesFromApi.city]}</p>
                <p class="m-0">${project[namesFromApi.date]}</p>
            </div>
        `;
        // 2) Append image in slider
        elementProjects.wrapper2.slick("slickAdd", card);
      });
    });
  }

  // Add event click on card products when clicked on it will be run all actions
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

  // Run fn render data slider
  renderDataSlider(API.apiAllProjects);
  // Run fn render data about us
  renderDataAboutUs(API.apiAboutUs);
  // Run fn render data partners
  renderDataPartners(API.apiPartners);

  /////////////////////////////////////
  //// 4) Section our partners
  // 1) Get count images
  function showAndHidden(timer) {
    let count = 0;
    // Setinterval
    setInterval(() => {
      const countImages = $("#partners__image").children().length;

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
  //// 5) Footer
  $("#year").text(new Date().getFullYear());

  /////////////////////////////////////
  ///// 6) Whatsapp popup
  $("#whatsapp").on("click", function () {
    $(".whatsapp__icon__whatsapp").toggleClass("hideIcon");
    $(".whatsapp__icon__close").toggleClass("visibleIcon");
    $(".whatsapp__title").toggleClass("moveDown");
    $(".whatsapp__popup, .whatsapp__popup__chat__open").toggleClass("moveUp");
  });
});
