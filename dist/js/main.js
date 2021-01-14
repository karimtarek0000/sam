"use strict";

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
      var attrSection = $(this).data("section");

      // 3) Remove class show when click link
      $(this).parentsUntil("navbar-collapse").removeClass("show");

      // 4) Set the section in variable
      var section = $("#" + attrSection);

      // 5) Check if this link exsist will be run all action
      if (Object.keys(section).length !== 0) {
        // 1) Animate to the section
        $("html, body").animate({
          scrollTop: section.offset().top - 20
        }, 1000);
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
  var getSectionName = localStorage.getItem("sectionName");

  // 2) Check if pathname home, and localStorage not equal null will be run all action
  if (location.pathname == "/" && getSectionName !== null) {
    setTimeout(function () {
      $("html, body").animate({
        scrollTop: $("#" + getSectionName).offset().top - 20
      }, 1000, function () {
        // Finaly remove sectionName from localStorage
        localStorage.removeItem("sectionName");
      });
    }, 1000);
  }

  /////////////////////////////////////
  //// 2) Change lang
  // 1) Render language
  async function renderLanguage(getLang) {
    // 2) Get data
    var localizition = await $.get("../localizition/" + getLang + ".json");
    // 3) Change language
    if (getLang === "ar") {
      $("html").attr({ dir: "rtl", lang: "ar" });
    } else {
      $("html").attr({ dir: "ltr", lang: "en" });
    }

    // Navbar links
    $(".navbar-nav a").each(function (i, cur) {
      return $(cur).text(localizition.navbar[$(cur).attr("key")]);
    });

    // heading, button
    $(".heading, .button").each(function (i, cur) {
      $(cur).text(localizition.pages[$(cur).attr("key")][$(cur).data("lang")]);
    });
  }

  // 2) When change lang
  $(".change_lang").on("change", function () {
    // 1) Get new value from select element
    var getLang = $(this).val();
    // 2) Set new value in item
    localStorage.setItem("language", getLang);
    // 3) Reload page
    location.reload();
  });
  // Change select lang
  function changeSelectLang(lang) {
    $(".change_lang option").each(function (i, cur) {
      if ($(cur).attr("value") === lang) {
        $(cur).attr("selected", true).siblings().removeAttr("selected");
      }
    });
  }

  //
  var getLanguage = localStorage.getItem("language");
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
      $("html").attr("dir") === "ltr" ? $(this).text("less") : $(this).text("اقل");
    } else {
      $("html").attr("dir") === "ltr" ? $(this).text("view more") : $(this).text("شاهد المزيــــد");
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
    cssEase: "linear"
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
    prevArrow: "<svg class='a-left prev slick-prev'>\n    <use xlink:href=\"../icons/sprite.svg#icon-angle-left\">\n    </svg>",
    nextArrow: "<svg class='a-right next slick-next'>\n    <use xlink:href=\"../icons/sprite.svg#icon-angle-right\">\n    </svg>",
    responsive: [{
      breakpoint: 793,
      settings: {
        arrows: false
      }
    }]
  });

  // Other projects slider
  $(".other-projects__wrapper").slick({
    lazyLoad: "progressive",
    infinite: false,
    slidesToShow: 3,
    slidesToScroll: 3,
    prevArrow: "<svg class='a-left prev slick-prev'>\n    <use xlink:href=\"../icons/sprite.svg#icon-angle-left\">\n    </svg>",
    nextArrow: "<svg class='a-right next slick-next'>\n    <use xlink:href=\"../icons/sprite.svg#icon-angle-right\">\n    </svg>",
    arrows: true,
    responsive: [{
      breakpoint: 793,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        arrows: false
      }
    }, {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false
      }
    }]
  });

  /////////////////////////////////////
  // All API
  var API = {
    apiAllProjects: "https://sam-construction.com/sam/api/projects",
    apiProject: "https://sam-construction.com/sam/api/projects/",
    apiAboutUs: "https://sam-construction.com/sam/api/pages/1",
    apiPartners: "https://sam-construction.com/sam/api/partners"
  };

  // All names into api
  var namesFromApi = {
    id: "project_id",
    name: "project_name",
    description: "project_description",
    date: "year",
    city: "city",
    titleAboutUs: "page_title",
    descAboutUs: "page_body"
  };

  // Global ajax setup
  $.ajaxSetup({
    headers: {
      Accept: "application/json",
      "Accept-Language": getLanguage
    }
  });

  // Section about us
  function renderDataAboutUs(url) {
    // 1) All element
    var element = {
      title: $("#titleAboutUs"),
      description: $("#descAboutUs")
    };

    // 2) Get data from api
    $.get(url).then(function (_ref) {
      var Data = _ref.Data;

      element.title.text(Data[namesFromApi.titleAboutUs]);
      element.description.text(Data[namesFromApi.descAboutUs]);
    });
  }

  // Section our projects
  var elementSlider = {
    wrapper: $(".our-projects__wrapper"),
    name: $("#head"),
    description: $("#par"),
    btn: $("#viewMoreProject")
  };

  // Section our projects => Function render data slider
  function renderDataSlider(url) {
    // 1) Get data from api
    $.get(url).then(function (_ref2) {
      var Data = _ref2.Data;

      // 1) For each all
      Data.forEach(function (cur, index) {
        // 1) Render img tag, and include data
        var image = "<img src=" + cur.image + " class=\"obj-image\" alt=" + cur[namesFromApi.name] + " />";
        // 2) Append image in slider
        elementSlider.wrapper.slick("slickAdd", image);

        // 3) Get index contains class active and get it index
        var indexActiveClass = $(".slick-current").attr("data-slick-index");

        // 4) If indes === index active class / will be render paragraph from this index
        if (index == indexActiveClass) {
          elementSlider.name.text(cur[namesFromApi.name]);
          elementSlider.description.text(cur[namesFromApi.description]);
        }
      });

      // 2) Get id after changed
      var indexDataArray = $(".slick-dots li.slick-active").index();

      // 3) After change slider
      elementSlider.wrapper.on("afterChange", function () {
        // 1) Get current index after change slider
        var indexCurrentSlide = $(".slick-current").attr("data-slick-index");

        // 2) Update var => indexDataArray equal indexCurrentSlide
        indexDataArray = indexCurrentSlide;

        // 3) Change head, and par with index data from API
        elementSlider.name.text(Data[indexCurrentSlide][namesFromApi.name]);
        elementSlider.description.text(Data[indexCurrentSlide][namesFromApi.description]);
      });

      // 4) When clicked in btn will be get data the current
      elementSlider.btn.on("click", function (e) {
        // 1) Get data with index the current slide, and convert to json
        var data = Data[indexDataArray][namesFromApi.id];
        // 2) Finaly store data in localstorge
        localStorage.setItem("projectId", data);
      });
    }).catch(function (err) {
      alert("some errors please try reload this page");
    });
  }

  // Section partners => Function render data part
  function renderDataPartners(url) {
    //
    $.get(url).done(function (_ref3) {
      var Data = _ref3.Data;

      $.each(Data, function (i, cur) {
        console.log(cur.image);
        var createImage = "\n          <div class=\"col-6 col-md-2 partners__all-partners__image py-3 overflow-hidden\">\n              <img src=" + cur.image + " alt=" + cur.name + " />\n          </div>\n        ";
        $("#partners__image").append(createImage);
      });
    });
  }

  /////////////////////////////////////
  // Page Projects
  if (location.pathname.includes("project")) {
    //
    var elementProjects = {
      name: $("#projectName"),
      location: $("#projectLocation"),
      date: $("#projectDate"),
      description: $("#projectDesc"),
      wrapper1: $("#projectsWrapper"),
      wrapper2: $("#otherProjectsWrapper")
    };

    // 1) Get localstorage => project id || 1
    var getDataLocalStorage = +localStorage.getItem("projectId") || 1;

    //////////////////////////////
    // 2) Get date from api
    $.get("" + API.apiProject + getDataLocalStorage).done(function (_ref4) {
      var Data = _ref4.Data;

      // 1) Add all date into each field
      elementProjects.name.text(Data[namesFromApi.name]);
      elementProjects.location.text(Data[namesFromApi.city]);
      elementProjects.date.text(Data[namesFromApi.date]);
      elementProjects.description.text(Data[namesFromApi.description]);

      // 2) Render img tag, and include data
      $.each(Data["project_slider"], function (i, img) {
        // 1) Create image tag
        var image = "<img src=" + img + " class=\"obj-image\" alt=" + Data[namesFromApi.name] + " />";
        // 2) Append image in slider
        elementProjects.wrapper1.slick("slickAdd", image);
      });

      // 3) Add other projects
      $.each(Data["other_projects"], function (i, project) {
        // 1) Create card element
        var card = "\n            <div class=\"card-projects text-capitalize\" key=" + project[namesFromApi.id] + ">\n                <div class=\"other-projects__wrapper__image\">\n                    <img class=\"img-fluid obj-image\" src=" + project.image + " alt=" + project[namesFromApi.name] + " />\n                </div>\n                <h4 class=\"h-small weight-bold mt-2 mb-3\">" + project[namesFromApi.name] + "</h4>\n                <p class=\"m-0 mb-1\">" + project[namesFromApi.city] + "</p>\n                <p class=\"m-0\">" + project[namesFromApi.date] + "</p>\n            </div>\n        ";
        // 2) Append image in slider
        elementProjects.wrapper2.slick("slickAdd", card);
      });
    });
  }

  // Add event click on card products when clicked on it will be run all actions
  $(document).on("click", ".card-projects", function () {
    // 1) Get id from attributes => key
    var getId = $(this).attr("key");

    // 2) Update local storage => projectId
    localStorage.setItem("projectId", getId);

    // 3) Finaly animate scroll top 0, and callback function location reload
    $("html, body").animate({
      scrollTop: 0
    }, 500, function () {
      location.reload();
    });
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
    var countImages = $("#partners__image").children().length;
    var count = 0;
    //
    setInterval(function () {
      // 1) Check if count equal count image length will be return count = 0
      if (count === countImages) count = 0;

      // 2) Add class active on partners image
      $("#partners__image").children().eq(count).addClass("partners__all-partners__image--active");

      // 3) Trigger set time out after 2900 will be remove class active
      setTimeout(function () {
        $("#partners__image").children().eq(count - 1).removeClass("partners__all-partners__image--active");
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
      setInterval: 2500
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOlsialF1ZXJ5IiwiJCIsIm9uIiwiZSIsImF0dHIiLCJwcmV2ZW50RGVmYXVsdCIsImF0dHJTZWN0aW9uIiwiZGF0YSIsInBhcmVudHNVbnRpbCIsInJlbW92ZUNsYXNzIiwic2VjdGlvbiIsIk9iamVjdCIsImtleXMiLCJsZW5ndGgiLCJhbmltYXRlIiwic2Nyb2xsVG9wIiwib2Zmc2V0IiwidG9wIiwibG9jYWxTdG9yYWdlIiwic2V0SXRlbSIsImxvY2F0aW9uIiwiYXNzaWduIiwiZ2V0U2VjdGlvbk5hbWUiLCJnZXRJdGVtIiwicGF0aG5hbWUiLCJzZXRUaW1lb3V0IiwicmVtb3ZlSXRlbSIsInJlbmRlckxhbmd1YWdlIiwiZ2V0TGFuZyIsImxvY2FsaXppdGlvbiIsImdldCIsImRpciIsImxhbmciLCJlYWNoIiwiaSIsImN1ciIsInRleHQiLCJuYXZiYXIiLCJwYWdlcyIsInZhbCIsInJlbG9hZCIsImNoYW5nZVNlbGVjdExhbmciLCJzaWJsaW5ncyIsInJlbW92ZUF0dHIiLCJnZXRMYW5ndWFnZSIsInBhcmVudCIsImNoaWxkcmVuIiwidG9nZ2xlQ2xhc3MiLCJoYXNDbGFzcyIsInNsaWNrIiwibGF6eUxvYWQiLCJpbmZpbml0ZSIsInNsaWRlc1RvU2hvdyIsInNsaWRlc1RvU2Nyb2xsIiwiYXV0b3BsYXkiLCJhdXRvcGxheVNwZWVkIiwiYXJyb3dzIiwiZG90cyIsImZhZGUiLCJjc3NFYXNlIiwicHJldkFycm93IiwibmV4dEFycm93IiwicmVzcG9uc2l2ZSIsImJyZWFrcG9pbnQiLCJzZXR0aW5ncyIsIkFQSSIsImFwaUFsbFByb2plY3RzIiwiYXBpUHJvamVjdCIsImFwaUFib3V0VXMiLCJhcGlQYXJ0bmVycyIsIm5hbWVzRnJvbUFwaSIsImlkIiwibmFtZSIsImRlc2NyaXB0aW9uIiwiZGF0ZSIsImNpdHkiLCJ0aXRsZUFib3V0VXMiLCJkZXNjQWJvdXRVcyIsImFqYXhTZXR1cCIsImhlYWRlcnMiLCJBY2NlcHQiLCJyZW5kZXJEYXRhQWJvdXRVcyIsInVybCIsImVsZW1lbnQiLCJ0aXRsZSIsInRoZW4iLCJEYXRhIiwiZWxlbWVudFNsaWRlciIsIndyYXBwZXIiLCJidG4iLCJyZW5kZXJEYXRhU2xpZGVyIiwiZm9yRWFjaCIsImluZGV4IiwiaW1hZ2UiLCJpbmRleEFjdGl2ZUNsYXNzIiwiaW5kZXhEYXRhQXJyYXkiLCJpbmRleEN1cnJlbnRTbGlkZSIsImNhdGNoIiwiZXJyIiwiYWxlcnQiLCJyZW5kZXJEYXRhUGFydG5lcnMiLCJkb25lIiwiY29uc29sZSIsImxvZyIsImNyZWF0ZUltYWdlIiwiYXBwZW5kIiwiaW5jbHVkZXMiLCJlbGVtZW50UHJvamVjdHMiLCJ3cmFwcGVyMSIsIndyYXBwZXIyIiwiZ2V0RGF0YUxvY2FsU3RvcmFnZSIsImltZyIsInByb2plY3QiLCJjYXJkIiwiZG9jdW1lbnQiLCJnZXRJZCIsInNob3dBbmRIaWRkZW4iLCJ0aW1lciIsImNvdW50SW1hZ2VzIiwiY291bnQiLCJzZXRJbnRlcnZhbCIsImVxIiwiYWRkQ2xhc3MiLCJzZXRUaW1lT3V0Iiwib3V0ZXJXaWR0aCIsIkRhdGUiLCJnZXRGdWxsWWVhciJdLCJtYXBwaW5ncyI6Ijs7QUFBQUEsT0FBTyxZQUFZO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBQyxJQUFFLFdBQUYsRUFBZUMsRUFBZixDQUFrQixPQUFsQixFQUEyQixVQUFVQyxDQUFWLEVBQWE7QUFDdEM7QUFDQSxRQUFJRixFQUFFLElBQUYsRUFBUUcsSUFBUixDQUFhLEtBQWIsTUFBd0IsTUFBNUIsRUFBb0M7QUFDbEM7QUFDQUQsUUFBRUUsY0FBRjs7QUFFQTtBQUNBLFVBQU1DLGNBQWNMLEVBQUUsSUFBRixFQUFRTSxJQUFSLENBQWEsU0FBYixDQUFwQjs7QUFFQTtBQUNBTixRQUFFLElBQUYsRUFBUU8sWUFBUixDQUFxQixpQkFBckIsRUFBd0NDLFdBQXhDLENBQW9ELE1BQXBEOztBQUVBO0FBQ0EsVUFBTUMsVUFBVVQsUUFBTUssV0FBTixDQUFoQjs7QUFFQTtBQUNBLFVB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QUFNO0FBQ2Z4QixVQUFFLGtCQUFGLEVBQ0c2QyxRQURILEdBRUcyRSxFQUZILENBRU1GLFFBQVEsQ0FGZCxFQUdHOUcsV0FISCxDQUdlLHVDQUhmO0FBSUQsT0FMRCxFQUtHNEcsTUFBTU0sVUFMVDs7QUFPQTtBQUNBSjtBQUNELEtBcEJELEVBb0JHRixNQUFNRyxXQXBCVDtBQXFCRDs7QUFFRDtBQUNBO0FBQ0EsTUFBSXZILEVBQUVpSCxRQUFGLEVBQVlVLFVBQVosQ0FBdUIsSUFBdkIsSUFBK0IsR0FBbkMsRUFBd0M7QUFDdEM7QUFDQVIsa0JBQWM7QUFDWk8sa0JBQVksSUFEQTtBQUVaSCxtQkFBYTtBQUZELEtBQWQ7QUFJRDs7QUFFRDtBQUNBO0FBQ0F2SCxJQUFFLE9BQUYsRUFBV21DLElBQVgsQ0FBZ0IsSUFBSXlGLElBQUosR0FBV0MsV0FBWCxFQUFoQjs7QUFFQTtBQUNBO0FBQ0E3SCxJQUFFLFdBQUYsRUFBZUMsRUFBZixDQUFrQixPQUFsQixFQUEyQixZQUFZO0FBQ3JDRCxNQUFFLDJCQUFGLEVBQStCOEMsV0FBL0IsQ0FBMkMsVUFBM0M7QUFDQTlDLE1BQUUsd0JBQUYsRUFBNEI4QyxXQUE1QixDQUF3QyxhQUF4QztBQUNBOUMsTUFBRSxrQkFBRixFQUFzQjhDLFdBQXRCLENBQWtDLFVBQWxDO0FBQ0E5QyxNQUFFLGdEQUFGLEVBQW9EOEMsV0FBcEQsQ0FBZ0UsUUFBaEU7QUFDRCxHQUxEO0FBTUQsQ0FwZEQiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImpRdWVyeShmdW5jdGlvbiAoKSB7XG4gIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbiAgLy8vLyAxKSBOYXZiYXJcbiAgLy9cbiAgJChcIi5uYXYtbGlua1wiKS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uIChlKSB7XG4gICAgLy8gQ2hlY2sgaWYgdGhpcyBrZXkgbm90IGVxdWFsIGhvbWUgd2lsbCBiZSBydW4gYWxsIGFjdGlvblxuICAgIGlmICgkKHRoaXMpLmF0dHIoXCJrZXlcIikgIT09IFwiaG9tZVwiKSB7XG4gICAgICAvLyAxKSBQcmV2ZW50IGRlZmF1bHRcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgLy8gMikgR2V0IHRoZSBhdHRyIHNlY3Rpb25cbiAgICAgIGNvbnN0IGF0dHJTZWN0aW9uID0gJCh0aGlzKS5kYXRhKFwic2VjdGlvblwiKTtcblxuICAgICAgLy8gMykgUmVtb3ZlIGNsYXNzIHNob3cgd2hlbiBjbGljayBsaW5rXG4gICAgICAkKHRoaXMpLnBhcmVudHNVbnRpbChcIm5hdmJhci1jb2xsYXBzZVwiKS5yZW1vdmVDbGFzcyhcInNob3dcIik7XG5cbiAgICAgIC8vIDQpIFNldCB0aGUgc2VjdGlvbiBpbiB2YXJpYWJsZVxuICAgICAgY29uc3Qgc2VjdGlvbiA9ICQoYCMke2F0dHJTZWN0aW9ufWApO1xuXG4gICAgICAvLyA1KSBDaGVjayBpZiB0aGlzIGxpbmsgZXhzaXN0IHdpbGwgYmUgcnVuIGFsbCBhY3Rpb25cbiAgICAgIGlmIChPYmplY3Qua2V5cyhzZWN0aW9uKS5sZW5ndGggIT09IDApIHtcbiAgICAgICAgLy8gMSkgQW5pbWF0ZSB0byB0aGUgc2VjdGlvblxuICAgICAgICAkKFwiaHRtbCwgYm9keVwiKS5hbmltYXRlKFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHNjcm9sbFRvcDogc2VjdGlvbi5vZmZzZXQoKS50b3AgLSAyMCxcbiAgICAgICAgICB9LFxuICAgICAgICAgIDEwMDBcbiAgICAgICAgKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIDEpIFNldCBpdGVtIGluIGxvY2FsU3RvcmFnZVxuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcInNlY3Rpb25OYW1lXCIsIGF0dHJTZWN0aW9uKTtcbiAgICAgICAgLy8gMikgUmVwbGFjZSBwYWdlIHRvIGhvbWVcbiAgICAgICAgbG9jYXRpb24uYXNzaWduKFwiL1wiKTtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuXG4gIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbiAgLy8vLyBHZXQgc2VjdGlvbiBuYW1lLCBhbmQgc2Nyb2xsIHRvIHRoZSBzZWN0aW9uIGluIHRoZSBzYW1lIG5hbWUgZnJvbSB0aGUgbG9jYWxTdG9yYWdlXG4gIC8vXG4gIC8vIDEpIEdldCBzY3Rpb24gbmFtZSBmcm9tIGxvY2FsU3RvcmFnZVxuICBjb25zdCBnZXRTZWN0aW9uTmFtZSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwic2VjdGlvbk5hbWVcIik7XG5cbiAgLy8gMikgQ2hlY2sgaWYgcGF0aG5hbWUgaG9tZSwgYW5kIGxvY2FsU3RvcmFnZSBub3QgZXF1YWwgbnVsbCB3aWxsIGJlIHJ1biBhbGwgYWN0aW9uXG4gIGlmIChsb2NhdGlvbi5wYXRobmFtZSA9PSBcIi9cIiAmJiBnZXRTZWN0aW9uTmFtZSAhPT0gbnVsbCkge1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgJChcImh0bWwsIGJvZHlcIikuYW5pbWF0ZShcbiAgICAgICAge1xuICAgICAgICAgIHNjcm9sbFRvcDogJChgIyR7Z2V0U2VjdGlvbk5hbWV9YCkub2Zmc2V0KCkudG9wIC0gMjAsXG4gICAgICAgIH0sXG4gICAgICAgIDEwMDAsXG4gICAgICAgICgpID0+IHtcbiAgICAgICAgICAvLyBGaW5hbHkgcmVtb3ZlIHNlY3Rpb25OYW1lIGZyb20gbG9jYWxTdG9yYWdlXG4gICAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oXCJzZWN0aW9uTmFtZVwiKTtcbiAgICAgICAgfVxuICAgICAgKTtcbiAgICB9LCAxMDAwKTtcbiAgfVxuXG4gIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbiAgLy8vLyAyKSBDaGFuZ2UgbGFuZ1xuICAvLyAxKSBSZW5kZXIgbGFuZ3VhZ2VcbiAgYXN5bmMgZnVuY3Rpb24gcmVuZGVyTGFuZ3VhZ2UoZ2V0TGFuZykge1xuICAgIC8vIDIpIEdldCBkYXRhXG4gICAgY29uc3QgbG9jYWxpeml0aW9uID0gYXdhaXQgJC5nZXQoYC4uL2xvY2FsaXppdGlvbi8ke2dldExhbmd9Lmpzb25gKTtcbiAgICAvLyAzKSBDaGFuZ2UgbGFuZ3VhZ2VcbiAgICBpZiAoZ2V0TGFuZyA9PT0gXCJhclwiKSB7XG4gICAgICAkKFwiaHRtbFwiKS5hdHRyKHsgZGlyOiBcInJ0bFwiLCBsYW5nOiBcImFyXCIgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICQoXCJodG1sXCIpLmF0dHIoeyBkaXI6IFwibHRyXCIsIGxhbmc6IFwiZW5cIiB9KTtcbiAgICB9XG5cbiAgICAvLyBOYXZiYXIgbGlua3NcbiAgICAkKFwiLm5hdmJhci1uYXYgYVwiKS5lYWNoKChpLCBjdXIpID0+XG4gICAgICAkKGN1cikudGV4dChsb2NhbGl6aXRpb24ubmF2YmFyWyQoY3VyKS5hdHRyKFwia2V5XCIpXSlcbiAgICApO1xuXG4gICAgLy8gaGVhZGluZywgYnV0dG9uXG4gICAgJChcIi5oZWFkaW5nLCAuYnV0dG9uXCIpLmVhY2goKGksIGN1cikgPT4ge1xuICAgICAgJChjdXIpLnRleHQobG9jYWxpeml0aW9uLnBhZ2VzWyQoY3VyKS5hdHRyKFwia2V5XCIpXVskKGN1cikuZGF0YShcImxhbmdcIildKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8vIDIpIFdoZW4gY2hhbmdlIGxhbmdcbiAgJChcIi5jaGFuZ2VfbGFuZ1wiKS5vbihcImNoYW5nZVwiLCBmdW5jdGlvbiAoKSB7XG4gICAgLy8gMSkgR2V0IG5ldyB2YWx1ZSBmcm9tIHNlbGVjdCBlbGVtZW50XG4gICAgbGV0IGdldExhbmcgPSAkKHRoaXMpLnZhbCgpO1xuICAgIC8vIDIpIFNldCBuZXcgdmFsdWUgaW4gaXRlbVxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwibGFuZ3VhZ2VcIiwgZ2V0TGFuZyk7XG4gICAgLy8gMykgUmVsb2FkIHBhZ2VcbiAgICBsb2NhdGlvbi5yZWxvYWQoKTtcbiAgfSk7XG4gIC8vIENoYW5nZSBzZWxlY3QgbGFuZ1xuICBmdW5jdGlvbiBjaGFuZ2VTZWxlY3RMYW5nKGxhbmcpIHtcbiAgICAkKFwiLmNoYW5nZV9sYW5nIG9wdGlvblwiKS5lYWNoKChpLCBjdXIpID0+IHtcbiAgICAgIGlmICgkKGN1cikuYXR0cihcInZhbHVlXCIpID09PSBsYW5nKSB7XG4gICAgICAgICQoY3VyKS5hdHRyKFwic2VsZWN0ZWRcIiwgdHJ1ZSkuc2libGluZ3MoKS5yZW1vdmVBdHRyKFwic2VsZWN0ZWRcIik7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvL1xuICBsZXQgZ2V0TGFuZ3VhZ2UgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcImxhbmd1YWdlXCIpO1xuICAvLyBJZiB0aGVyZSBsb2NhbCBzdG9yYWdlIGluIHNpdGUgd2l0aCBuYW1lIGxhbmd1YWdlIHdpbGwgYmUgcmVuZGVyIGxhbmd1YWdlIHNpdGUgd2l0aCBpbiB0aGUgc2FtZSBsYW5ndWFnZSBpZiBub3Qgd2lsbCBiZSByZW5kZXIgbGFuZ3VhZ2Ugc2l0ZSB3aXRoIHNlbGVjdGVkIGxhbmcgZnJvbSBzZWxlY3QgYm94XG4gIGlmIChnZXRMYW5ndWFnZSAhPT0gbnVsbCkge1xuICAgIGNoYW5nZVNlbGVjdExhbmcoZ2V0TGFuZ3VhZ2UpO1xuICAgIHJlbmRlckxhbmd1YWdlKGdldExhbmd1YWdlKTtcbiAgfSBlbHNlIHtcbiAgICBnZXRMYW5ndWFnZSA9ICQoXCIuY2hhbmdlX2xhbmdcIikudmFsKCk7XG4gICAgcmVuZGVyTGFuZ3VhZ2UoZ2V0TGFuZ3VhZ2UpO1xuICAgIGNoYW5nZVNlbGVjdExhbmcoZ2V0TGFuZ3VhZ2UpO1xuICB9XG5cbiAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuICAvLy8vLyAzKSBTZWN0aW9uIGFib3V0IHVzXG4gIC8vIE1vcmUgUGFyYWdyYXBoXG4gICQoXCIubW9yZVwiKS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uIChlKSB7XG4gICAgLy8gMSkgUHJldmVudCBkZWZhdWx0IGFuY2hvclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAvLyAyKSBUb2dnbGUgY2xhc3MgbW9yZSBvbiBwYXJhZ3JhcGhcbiAgICAkKHRoaXMpLnBhcmVudCgpLmNoaWxkcmVuKFwicFwiKS50b2dnbGVDbGFzcyhcIm1vcmVcIik7XG4gICAgLy8gMykgQ2hlY2sgaWYgcGFyZ2FycGggaGFzIGNsYXNzIG1vcmUgb3Igbm90XG4gICAgaWYgKCQodGhpcykucGFyZW50KCkuY2hpbGRyZW4oXCJwXCIpLmhhc0NsYXNzKFwibW9yZVwiKSkge1xuICAgICAgJChcImh0bWxcIikuYXR0cihcImRpclwiKSA9PT0gXCJsdHJcIlxuICAgICAgICA/ICQodGhpcykudGV4dChcImxlc3NcIilcbiAgICAgICAgOiAkKHRoaXMpLnRleHQoXCLYp9mC2YRcIik7XG4gICAgfSBlbHNlIHtcbiAgICAgICQoXCJodG1sXCIpLmF0dHIoXCJkaXJcIikgPT09IFwibHRyXCJcbiAgICAgICAgPyAkKHRoaXMpLnRleHQoXCJ2aWV3IG1vcmVcIilcbiAgICAgICAgOiAkKHRoaXMpLnRleHQoXCLYtNin2YfYryDYp9mE2YXYstmK2YDZgNmA2YDYr1wiKTtcbiAgICB9XG4gIH0pO1xuXG4gIC8vIFNlY3Rpb24gb3VyIHByb2plY3RzXG4gICQoXCIub3VyLXByb2plY3RzX193cmFwcGVyXCIpLnNsaWNrKHtcbiAgICBsYXp5TG9hZDogXCJwcm9ncmVzc2l2ZVwiLFxuICAgIGluZmluaXRlOiBmYWxzZSxcbiAgICBzbGlkZXNUb1Nob3c6IDEsXG4gICAgc2xpZGVzVG9TY3JvbGw6IDEsXG4gICAgYXV0b3BsYXk6IHRydWUsXG4gICAgYXV0b3BsYXlTcGVlZDogMTAwMDAsXG4gICAgYXJyb3dzOiBmYWxzZSxcbiAgICBkb3RzOiB0cnVlLFxuICAgIGZhZGU6IHRydWUsXG4gICAgY3NzRWFzZTogXCJsaW5lYXJcIixcbiAgfSk7XG5cbiAgLy8gSGVhZGVyIHByb2plY3RzIHNsaWRlclxuICAkKFwiLmhlYWRlci1wcm9qZWN0c19fd3JhcHBlclwiKS5zbGljayh7XG4gICAgbGF6eUxvYWQ6IFwicHJvZ3Jlc3NpdmVcIixcbiAgICBpbmZpbml0ZTogZmFsc2UsXG4gICAgc2xpZGVzVG9TaG93OiAxLFxuICAgIHNsaWRlc1RvU2Nyb2xsOiAxLFxuICAgIGF1dG9wbGF5OiB0cnVlLFxuICAgIGF1dG9wbGF5U3BlZWQ6IDUwMDAsXG4gICAgYXJyb3dzOiB0cnVlLFxuICAgIHByZXZBcnJvdzogYDxzdmcgY2xhc3M9J2EtbGVmdCBwcmV2IHNsaWNrLXByZXYnPlxuICAgIDx1c2UgeGxpbms6aHJlZj1cIi4uL2ljb25zL3Nwcml0ZS5zdmcjaWNvbi1hbmdsZS1sZWZ0XCI+XG4gICAgPC9zdmc+YCxcbiAgICBuZXh0QXJyb3c6IGA8c3ZnIGNsYXNzPSdhLXJpZ2h0IG5leHQgc2xpY2stbmV4dCc+XG4gICAgPHVzZSB4bGluazpocmVmPVwiLi4vaWNvbnMvc3ByaXRlLnN2ZyNpY29uLWFuZ2xlLXJpZ2h0XCI+XG4gICAgPC9zdmc+YCxcbiAgICByZXNwb25zaXZlOiBbXG4gICAgICB7XG4gICAgICAgIGJyZWFrcG9pbnQ6IDc5MyxcbiAgICAgICAgc2V0dGluZ3M6IHtcbiAgICAgICAgICBhcnJvd3M6IGZhbHNlLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICBdLFxuICB9KTtcblxuICAvLyBPdGhlciBwcm9qZWN0cyBzbGlkZXJcbiAgJChcIi5vdGhlci1wcm9qZWN0c19fd3JhcHBlclwiKS5zbGljayh7XG4gICAgbGF6eUxvYWQ6IFwicHJvZ3Jlc3NpdmVcIixcbiAgICBpbmZpbml0ZTogZmFsc2UsXG4gICAgc2xpZGVzVG9TaG93OiAzLFxuICAgIHNsaWRlc1RvU2Nyb2xsOiAzLFxuICAgIHByZXZBcnJvdzogYDxzdmcgY2xhc3M9J2EtbGVmdCBwcmV2IHNsaWNrLXByZXYnPlxuICAgIDx1c2UgeGxpbms6aHJlZj1cIi4uL2ljb25zL3Nwcml0ZS5zdmcjaWNvbi1hbmdsZS1sZWZ0XCI+XG4gICAgPC9zdmc+YCxcbiAgICBuZXh0QXJyb3c6IGA8c3ZnIGNsYXNzPSdhLXJpZ2h0IG5leHQgc2xpY2stbmV4dCc+XG4gICAgPHVzZSB4bGluazpocmVmPVwiLi4vaWNvbnMvc3ByaXRlLnN2ZyNpY29uLWFuZ2xlLXJpZ2h0XCI+XG4gICAgPC9zdmc+YCxcbiAgICBhcnJvd3M6IHRydWUsXG4gICAgcmVzcG9uc2l2ZTogW1xuICAgICAge1xuICAgICAgICBicmVha3BvaW50OiA3OTMsXG4gICAgICAgIHNldHRpbmdzOiB7XG4gICAgICAgICAgc2xpZGVzVG9TaG93OiAyLFxuICAgICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAyLFxuICAgICAgICAgIGFycm93czogZmFsc2UsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBicmVha3BvaW50OiA2MDAsXG4gICAgICAgIHNldHRpbmdzOiB7XG4gICAgICAgICAgc2xpZGVzVG9TaG93OiAxLFxuICAgICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAxLFxuICAgICAgICAgIGFycm93czogZmFsc2UsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIF0sXG4gIH0pO1xuXG4gIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbiAgLy8gQWxsIEFQSVxuICBjb25zdCBBUEkgPSB7XG4gICAgYXBpQWxsUHJvamVjdHM6IFwiaHR0cHM6Ly9zYW0tY29uc3RydWN0aW9uLmNvbS9zYW0vYXBpL3Byb2plY3RzXCIsXG4gICAgYXBpUHJvamVjdDogXCJodHRwczovL3NhbS1jb25zdHJ1Y3Rpb24uY29tL3NhbS9hcGkvcHJvamVjdHMvXCIsXG4gICAgYXBpQWJvdXRVczogXCJodHRwczovL3NhbS1jb25zdHJ1Y3Rpb24uY29tL3NhbS9hcGkvcGFnZXMvMVwiLFxuICAgIGFwaVBhcnRuZXJzOiBcImh0dHBzOi8vc2FtLWNvbnN0cnVjdGlvbi5jb20vc2FtL2FwaS9wYXJ0bmVyc1wiLFxuICB9O1xuXG4gIC8vIEFsbCBuYW1lcyBpbnRvIGFwaVxuICBjb25zdCBuYW1lc0Zyb21BcGkgPSB7XG4gICAgaWQ6IFwicHJvamVjdF9pZFwiLFxuICAgIG5hbWU6IFwicHJvamVjdF9uYW1lXCIsXG4gICAgZGVzY3JpcHRpb246IFwicHJvamVjdF9kZXNjcmlwdGlvblwiLFxuICAgIGRhdGU6IFwieWVhclwiLFxuICAgIGNpdHk6IFwiY2l0eVwiLFxuICAgIHRpdGxlQWJvdXRVczogXCJwYWdlX3RpdGxlXCIsXG4gICAgZGVzY0Fib3V0VXM6IFwicGFnZV9ib2R5XCIsXG4gIH07XG5cbiAgLy8gR2xvYmFsIGFqYXggc2V0dXBcbiAgJC5hamF4U2V0dXAoe1xuICAgIGhlYWRlcnM6IHtcbiAgICAgIEFjY2VwdDogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgICBcIkFjY2VwdC1MYW5ndWFnZVwiOiBnZXRMYW5ndWFnZSxcbiAgICB9LFxuICB9KTtcblxuICAvLyBTZWN0aW9uIGFib3V0IHVzXG4gIGZ1bmN0aW9uIHJlbmRlckRhdGFBYm91dFVzKHVybCkge1xuICAgIC8vIDEpIEFsbCBlbGVtZW50XG4gICAgY29uc3QgZWxlbWVudCA9IHtcbiAgICAgIHRpdGxlOiAkKFwiI3RpdGxlQWJvdXRVc1wiKSxcbiAgICAgIGRlc2NyaXB0aW9uOiAkKFwiI2Rlc2NBYm91dFVzXCIpLFxuICAgIH07XG5cbiAgICAvLyAyKSBHZXQgZGF0YSBmcm9tIGFwaVxuICAgICQuZ2V0KHVybCkudGhlbigoeyBEYXRhIH0pID0+IHtcbiAgICAgIGVsZW1lbnQudGl0bGUudGV4dChEYXRhW25hbWVzRnJvbUFwaS50aXRsZUFib3V0VXNdKTtcbiAgICAgIGVsZW1lbnQuZGVzY3JpcHRpb24udGV4dChEYXRhW25hbWVzRnJvbUFwaS5kZXNjQWJvdXRVc10pO1xuICAgIH0pO1xuICB9XG5cbiAgLy8gU2VjdGlvbiBvdXIgcHJvamVjdHNcbiAgY29uc3QgZWxlbWVudFNsaWRlciA9IHtcbiAgICB3cmFwcGVyOiAkKFwiLm91ci1wcm9qZWN0c19fd3JhcHBlclwiKSxcbiAgICBuYW1lOiAkKFwiI2hlYWRcIiksXG4gICAgZGVzY3JpcHRpb246ICQoXCIjcGFyXCIpLFxuICAgIGJ0bjogJChcIiN2aWV3TW9yZVByb2plY3RcIiksXG4gIH07XG5cbiAgLy8gU2VjdGlvbiBvdXIgcHJvamVjdHMgPT4gRnVuY3Rpb24gcmVuZGVyIGRhdGEgc2xpZGVyXG4gIGZ1bmN0aW9uIHJlbmRlckRhdGFTbGlkZXIodXJsKSB7XG4gICAgLy8gMSkgR2V0IGRhdGEgZnJvbSBhcGlcbiAgICAkLmdldCh1cmwpXG4gICAgICAudGhlbigoeyBEYXRhIH0pID0+IHtcbiAgICAgICAgLy8gMSkgRm9yIGVhY2ggYWxsXG4gICAgICAgIERhdGEuZm9yRWFjaCgoY3VyLCBpbmRleCkgPT4ge1xuICAgICAgICAgIC8vIDEpIFJlbmRlciBpbWcgdGFnLCBhbmQgaW5jbHVkZSBkYXRhXG4gICAgICAgICAgY29uc3QgaW1hZ2UgPSBgPGltZyBzcmM9JHtjdXIuaW1hZ2V9IGNsYXNzPVwib2JqLWltYWdlXCIgYWx0PSR7XG4gICAgICAgICAgICBjdXJbbmFtZXNGcm9tQXBpLm5hbWVdXG4gICAgICAgICAgfSAvPmA7XG4gICAgICAgICAgLy8gMikgQXBwZW5kIGltYWdlIGluIHNsaWRlclxuICAgICAgICAgIGVsZW1lbnRTbGlkZXIud3JhcHBlci5zbGljayhcInNsaWNrQWRkXCIsIGltYWdlKTtcblxuICAgICAgICAgIC8vIDMpIEdldCBpbmRleCBjb250YWlucyBjbGFzcyBhY3RpdmUgYW5kIGdldCBpdCBpbmRleFxuICAgICAgICAgIGNvbnN0IGluZGV4QWN0aXZlQ2xhc3MgPSAkKFwiLnNsaWNrLWN1cnJlbnRcIikuYXR0cihcImRhdGEtc2xpY2staW5kZXhcIik7XG5cbiAgICAgICAgICAvLyA0KSBJZiBpbmRlcyA9PT0gaW5kZXggYWN0aXZlIGNsYXNzIC8gd2lsbCBiZSByZW5kZXIgcGFyYWdyYXBoIGZyb20gdGhpcyBpbmRleFxuICAgICAgICAgIGlmIChpbmRleCA9PSBpbmRleEFjdGl2ZUNsYXNzKSB7XG4gICAgICAgICAgICBlbGVtZW50U2xpZGVyLm5hbWUudGV4dChjdXJbbmFtZXNGcm9tQXBpLm5hbWVdKTtcbiAgICAgICAgICAgIGVsZW1lbnRTbGlkZXIuZGVzY3JpcHRpb24udGV4dChjdXJbbmFtZXNGcm9tQXBpLmRlc2NyaXB0aW9uXSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAvLyAyKSBHZXQgaWQgYWZ0ZXIgY2hhbmdlZFxuICAgICAgICBsZXQgaW5kZXhEYXRhQXJyYXkgPSAkKFwiLnNsaWNrLWRvdHMgbGkuc2xpY2stYWN0aXZlXCIpLmluZGV4KCk7XG5cbiAgICAgICAgLy8gMykgQWZ0ZXIgY2hhbmdlIHNsaWRlclxuICAgICAgICBlbGVtZW50U2xpZGVyLndyYXBwZXIub24oXCJhZnRlckNoYW5nZVwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgLy8gMSkgR2V0IGN1cnJlbnQgaW5kZXggYWZ0ZXIgY2hhbmdlIHNsaWRlclxuICAgICAgICAgIGNvbnN0IGluZGV4Q3VycmVudFNsaWRlID0gJChcIi5zbGljay1jdXJyZW50XCIpLmF0dHIoXG4gICAgICAgICAgICBcImRhdGEtc2xpY2staW5kZXhcIlxuICAgICAgICAgICk7XG5cbiAgICAgICAgICAvLyAyKSBVcGRhdGUgdmFyID0+IGluZGV4RGF0YUFycmF5IGVxdWFsIGluZGV4Q3VycmVudFNsaWRlXG4gICAgICAgICAgaW5kZXhEYXRhQXJyYXkgPSBpbmRleEN1cnJlbnRTbGlkZTtcblxuICAgICAgICAgIC8vIDMpIENoYW5nZSBoZWFkLCBhbmQgcGFyIHdpdGggaW5kZXggZGF0YSBmcm9tIEFQSVxuICAgICAgICAgIGVsZW1lbnRTbGlkZXIubmFtZS50ZXh0KERhdGFbaW5kZXhDdXJyZW50U2xpZGVdW25hbWVzRnJvbUFwaS5uYW1lXSk7XG4gICAgICAgICAgZWxlbWVudFNsaWRlci5kZXNjcmlwdGlvbi50ZXh0KFxuICAgICAgICAgICAgRGF0YVtpbmRleEN1cnJlbnRTbGlkZV1bbmFtZXNGcm9tQXBpLmRlc2NyaXB0aW9uXVxuICAgICAgICAgICk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIDQpIFdoZW4gY2xpY2tlZCBpbiBidG4gd2lsbCBiZSBnZXQgZGF0YSB0aGUgY3VycmVudFxuICAgICAgICBlbGVtZW50U2xpZGVyLmJ0bi5vbihcImNsaWNrXCIsIChlKSA9PiB7XG4gICAgICAgICAgLy8gMSkgR2V0IGRhdGEgd2l0aCBpbmRleCB0aGUgY3VycmVudCBzbGlkZSwgYW5kIGNvbnZlcnQgdG8ganNvblxuICAgICAgICAgIGNvbnN0IGRhdGEgPSBEYXRhW2luZGV4RGF0YUFycmF5XVtuYW1lc0Zyb21BcGkuaWRdO1xuICAgICAgICAgIC8vIDIpIEZpbmFseSBzdG9yZSBkYXRhIGluIGxvY2Fsc3RvcmdlXG4gICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJwcm9qZWN0SWRcIiwgZGF0YSk7XG4gICAgICAgIH0pO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgIGFsZXJ0KFwic29tZSBlcnJvcnMgcGxlYXNlIHRyeSByZWxvYWQgdGhpcyBwYWdlXCIpO1xuICAgICAgfSk7XG4gIH1cblxuICAvLyBTZWN0aW9uIHBhcnRuZXJzID0+IEZ1bmN0aW9uIHJlbmRlciBkYXRhIHBhcnRcbiAgZnVuY3Rpb24gcmVuZGVyRGF0YVBhcnRuZXJzKHVybCkge1xuICAgIC8vXG4gICAgJC5nZXQodXJsKS5kb25lKCh7IERhdGEgfSkgPT4ge1xuICAgICAgJC5lYWNoKERhdGEsIChpLCBjdXIpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coY3VyLmltYWdlKTtcbiAgICAgICAgY29uc3QgY3JlYXRlSW1hZ2UgPSBgXG4gICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC02IGNvbC1tZC0yIHBhcnRuZXJzX19hbGwtcGFydG5lcnNfX2ltYWdlIHB5LTMgb3ZlcmZsb3ctaGlkZGVuXCI+XG4gICAgICAgICAgICAgIDxpbWcgc3JjPSR7Y3VyLmltYWdlfSBhbHQ9JHtjdXIubmFtZX0gLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgYDtcbiAgICAgICAgJChcIiNwYXJ0bmVyc19faW1hZ2VcIikuYXBwZW5kKGNyZWF0ZUltYWdlKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuICAvLyBQYWdlIFByb2plY3RzXG4gIGlmIChsb2NhdGlvbi5wYXRobmFtZS5pbmNsdWRlcyhcInByb2plY3RcIikpIHtcbiAgICAvL1xuICAgIGNvbnN0IGVsZW1lbnRQcm9qZWN0cyA9IHtcbiAgICAgIG5hbWU6ICQoXCIjcHJvamVjdE5hbWVcIiksXG4gICAgICBsb2NhdGlvbjogJChcIiNwcm9qZWN0TG9jYXRpb25cIiksXG4gICAgICBkYXRlOiAkKFwiI3Byb2plY3REYXRlXCIpLFxuICAgICAgZGVzY3JpcHRpb246ICQoXCIjcHJvamVjdERlc2NcIiksXG4gICAgICB3cmFwcGVyMTogJChcIiNwcm9qZWN0c1dyYXBwZXJcIiksXG4gICAgICB3cmFwcGVyMjogJChcIiNvdGhlclByb2plY3RzV3JhcHBlclwiKSxcbiAgICB9O1xuXG4gICAgLy8gMSkgR2V0IGxvY2Fsc3RvcmFnZSA9PiBwcm9qZWN0IGlkIHx8IDFcbiAgICBjb25zdCBnZXREYXRhTG9jYWxTdG9yYWdlID0gK2xvY2FsU3RvcmFnZS5nZXRJdGVtKFwicHJvamVjdElkXCIpIHx8IDE7XG5cbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbiAgICAvLyAyKSBHZXQgZGF0ZSBmcm9tIGFwaVxuICAgICQuZ2V0KGAke0FQSS5hcGlQcm9qZWN0fSR7Z2V0RGF0YUxvY2FsU3RvcmFnZX1gKS5kb25lKCh7IERhdGEgfSkgPT4ge1xuICAgICAgLy8gMSkgQWRkIGFsbCBkYXRlIGludG8gZWFjaCBmaWVsZFxuICAgICAgZWxlbWVudFByb2plY3RzLm5hbWUudGV4dChEYXRhW25hbWVzRnJvbUFwaS5uYW1lXSk7XG4gICAgICBlbGVtZW50UHJvamVjdHMubG9jYXRpb24udGV4dChEYXRhW25hbWVzRnJvbUFwaS5jaXR5XSk7XG4gICAgICBlbGVtZW50UHJvamVjdHMuZGF0ZS50ZXh0KERhdGFbbmFtZXNGcm9tQXBpLmRhdGVdKTtcbiAgICAgIGVsZW1lbnRQcm9qZWN0cy5kZXNjcmlwdGlvbi50ZXh0KERhdGFbbmFtZXNGcm9tQXBpLmRlc2NyaXB0aW9uXSk7XG5cbiAgICAgIC8vIDIpIFJlbmRlciBpbWcgdGFnLCBhbmQgaW5jbHVkZSBkYXRhXG4gICAgICAkLmVhY2goRGF0YVtcInByb2plY3Rfc2xpZGVyXCJdLCAoaSwgaW1nKSA9PiB7XG4gICAgICAgIC8vIDEpIENyZWF0ZSBpbWFnZSB0YWdcbiAgICAgICAgY29uc3QgaW1hZ2UgPSBgPGltZyBzcmM9JHtpbWd9IGNsYXNzPVwib2JqLWltYWdlXCIgYWx0PSR7XG4gICAgICAgICAgRGF0YVtuYW1lc0Zyb21BcGkubmFtZV1cbiAgICAgICAgfSAvPmA7XG4gICAgICAgIC8vIDIpIEFwcGVuZCBpbWFnZSBpbiBzbGlkZXJcbiAgICAgICAgZWxlbWVudFByb2plY3RzLndyYXBwZXIxLnNsaWNrKFwic2xpY2tBZGRcIiwgaW1hZ2UpO1xuICAgICAgfSk7XG5cbiAgICAgIC8vIDMpIEFkZCBvdGhlciBwcm9qZWN0c1xuICAgICAgJC5lYWNoKERhdGFbXCJvdGhlcl9wcm9qZWN0c1wiXSwgKGksIHByb2plY3QpID0+IHtcbiAgICAgICAgLy8gMSkgQ3JlYXRlIGNhcmQgZWxlbWVudFxuICAgICAgICBjb25zdCBjYXJkID0gYFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNhcmQtcHJvamVjdHMgdGV4dC1jYXBpdGFsaXplXCIga2V5PSR7XG4gICAgICAgICAgICAgIHByb2plY3RbbmFtZXNGcm9tQXBpLmlkXVxuICAgICAgICAgICAgfT5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwib3RoZXItcHJvamVjdHNfX3dyYXBwZXJfX2ltYWdlXCI+XG4gICAgICAgICAgICAgICAgICAgIDxpbWcgY2xhc3M9XCJpbWctZmx1aWQgb2JqLWltYWdlXCIgc3JjPSR7cHJvamVjdC5pbWFnZX0gYWx0PSR7XG4gICAgICAgICAgcHJvamVjdFtuYW1lc0Zyb21BcGkubmFtZV1cbiAgICAgICAgfSAvPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxoNCBjbGFzcz1cImgtc21hbGwgd2VpZ2h0LWJvbGQgbXQtMiBtYi0zXCI+JHtcbiAgICAgICAgICAgICAgICAgIHByb2plY3RbbmFtZXNGcm9tQXBpLm5hbWVdXG4gICAgICAgICAgICAgICAgfTwvaDQ+XG4gICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJtLTAgbWItMVwiPiR7cHJvamVjdFtuYW1lc0Zyb21BcGkuY2l0eV19PC9wPlxuICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwibS0wXCI+JHtwcm9qZWN0W25hbWVzRnJvbUFwaS5kYXRlXX08L3A+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgYDtcbiAgICAgICAgLy8gMikgQXBwZW5kIGltYWdlIGluIHNsaWRlclxuICAgICAgICBlbGVtZW50UHJvamVjdHMud3JhcHBlcjIuc2xpY2soXCJzbGlja0FkZFwiLCBjYXJkKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgLy8gQWRkIGV2ZW50IGNsaWNrIG9uIGNhcmQgcHJvZHVjdHMgd2hlbiBjbGlja2VkIG9uIGl0IHdpbGwgYmUgcnVuIGFsbCBhY3Rpb25zXG4gICQoZG9jdW1lbnQpLm9uKFwiY2xpY2tcIiwgXCIuY2FyZC1wcm9qZWN0c1wiLCBmdW5jdGlvbiAoKSB7XG4gICAgLy8gMSkgR2V0IGlkIGZyb20gYXR0cmlidXRlcyA9PiBrZXlcbiAgICBjb25zdCBnZXRJZCA9ICQodGhpcykuYXR0cihcImtleVwiKTtcblxuICAgIC8vIDIpIFVwZGF0ZSBsb2NhbCBzdG9yYWdlID0+IHByb2plY3RJZFxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwicHJvamVjdElkXCIsIGdldElkKTtcblxuICAgIC8vIDMpIEZpbmFseSBhbmltYXRlIHNjcm9sbCB0b3AgMCwgYW5kIGNhbGxiYWNrIGZ1bmN0aW9uIGxvY2F0aW9uIHJlbG9hZFxuICAgICQoXCJodG1sLCBib2R5XCIpLmFuaW1hdGUoXG4gICAgICB7XG4gICAgICAgIHNjcm9sbFRvcDogMCxcbiAgICAgIH0sXG4gICAgICA1MDAsXG4gICAgICBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGxvY2F0aW9uLnJlbG9hZCgpO1xuICAgICAgfVxuICAgICk7XG4gIH0pO1xuXG4gIC8vIFJ1biBmbiByZW5kZXIgZGF0YSBzbGlkZXJcbiAgcmVuZGVyRGF0YVNsaWRlcihBUEkuYXBpQWxsUHJvamVjdHMpO1xuICAvLyBSdW4gZm4gcmVuZGVyIGRhdGEgYWJvdXQgdXNcbiAgcmVuZGVyRGF0YUFib3V0VXMoQVBJLmFwaUFib3V0VXMpO1xuICAvLyBSdW4gZm4gcmVuZGVyIGRhdGEgcGFydG5lcnNcbiAgcmVuZGVyRGF0YVBhcnRuZXJzKEFQSS5hcGlQYXJ0bmVycyk7XG5cbiAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuICAvLy8vIDQpIFNlY3Rpb24gb3VyIHBhcnRuZXJzXG4gIC8vIDEpIEdldCBjb3VudCBpbWFnZXNcbiAgZnVuY3Rpb24gc2hvd0FuZEhpZGRlbih0aW1lcikge1xuICAgIGNvbnN0IGNvdW50SW1hZ2VzID0gJChcIiNwYXJ0bmVyc19faW1hZ2VcIikuY2hpbGRyZW4oKS5sZW5ndGg7XG4gICAgbGV0IGNvdW50ID0gMDtcbiAgICAvL1xuICAgIHNldEludGVydmFsKCgpID0+IHtcbiAgICAgIC8vIDEpIENoZWNrIGlmIGNvdW50IGVxdWFsIGNvdW50IGltYWdlIGxlbmd0aCB3aWxsIGJlIHJldHVybiBjb3VudCA9IDBcbiAgICAgIGlmIChjb3VudCA9PT0gY291bnRJbWFnZXMpIGNvdW50ID0gMDtcblxuICAgICAgLy8gMikgQWRkIGNsYXNzIGFjdGl2ZSBvbiBwYXJ0bmVycyBpbWFnZVxuICAgICAgJChcIiNwYXJ0bmVyc19faW1hZ2VcIilcbiAgICAgICAgLmNoaWxkcmVuKClcbiAgICAgICAgLmVxKGNvdW50KVxuICAgICAgICAuYWRkQ2xhc3MoXCJwYXJ0bmVyc19fYWxsLXBhcnRuZXJzX19pbWFnZS0tYWN0aXZlXCIpO1xuXG4gICAgICAvLyAzKSBUcmlnZ2VyIHNldCB0aW1lIG91dCBhZnRlciAyOTAwIHdpbGwgYmUgcmVtb3ZlIGNsYXNzIGFjdGl2ZVxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICQoXCIjcGFydG5lcnNfX2ltYWdlXCIpXG4gICAgICAgICAgLmNoaWxkcmVuKClcbiAgICAgICAgICAuZXEoY291bnQgLSAxKVxuICAgICAgICAgIC5yZW1vdmVDbGFzcyhcInBhcnRuZXJzX19hbGwtcGFydG5lcnNfX2ltYWdlLS1hY3RpdmVcIik7XG4gICAgICB9LCB0aW1lci5zZXRUaW1lT3V0KTtcblxuICAgICAgLy8gNCkgRmluYWx5IGdldCB2YXJpYWJsZSBjb3VudCwgYW5kIGluY3JlbWVudCArPSAxXG4gICAgICBjb3VudCsrO1xuICAgIH0sIHRpbWVyLnNldEludGVydmFsKTtcbiAgfVxuXG4gIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbiAgLy8gUnVuIGZ1bmN0aW9uIFNIT1dBTkRISURERU5cbiAgaWYgKCQoZG9jdW1lbnQpLm91dGVyV2lkdGgodHJ1ZSkgPiA3NjgpIHtcbiAgICAvL1xuICAgIHNob3dBbmRIaWRkZW4oe1xuICAgICAgc2V0VGltZU91dDogMjQwMCxcbiAgICAgIHNldEludGVydmFsOiAyNTAwLFxuICAgIH0pO1xuICB9XG5cbiAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuICAvLy8vIDUpIEZvb3RlclxuICAkKFwiI3llYXJcIikudGV4dChuZXcgRGF0ZSgpLmdldEZ1bGxZZWFyKCkpO1xuXG4gIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbiAgLy8vLy8gNikgV2hhdHNhcHAgcG9wdXBcbiAgJChcIiN3aGF0c2FwcFwiKS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAkKFwiLndoYXRzYXBwX19pY29uX193aGF0c2FwcFwiKS50b2dnbGVDbGFzcyhcImhpZGVJY29uXCIpO1xuICAgICQoXCIud2hhdHNhcHBfX2ljb25fX2Nsb3NlXCIpLnRvZ2dsZUNsYXNzKFwidmlzaWJsZUljb25cIik7XG4gICAgJChcIi53aGF0c2FwcF9fdGl0bGVcIikudG9nZ2xlQ2xhc3MoXCJtb3ZlRG93blwiKTtcbiAgICAkKFwiLndoYXRzYXBwX19wb3B1cCwgLndoYXRzYXBwX19wb3B1cF9fY2hhdF9fb3BlblwiKS50b2dnbGVDbGFzcyhcIm1vdmVVcFwiKTtcbiAgfSk7XG59KTtcbiJdfQ==
