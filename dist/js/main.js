"use strict";

jQuery(function () {
  /////////////////////////////////////
  //// Navbar
  $(".nav-link").on("click", function (e) {
    // 1) Prevent default
    if ($(this).attr("key") !== "home") {
      e.preventDefault();
      // 2) Get the attr section
      var attrSection = $(this).data("section");
      // 3) Remove class show when click link
      $(this).parentsUntil("navbar-collapse").removeClass("show");
      // 4) Animate to the section
      $("html, body").animate({
        scrollTop: $("#" + attrSection).offset().top - 20
      }, 1000);
    }
  });

  /////////////////////////////////////
  //// Change lang
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
    // $(".navbar-nav a").each((i, cur) =>
    //   $(cur).text(localizition.navbar[$(cur).attr("key")])
    // );
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
  ///// Section about us
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
      $("html").attr("dir") === "ltr" ? $(this).text("view more") : $(this).text("المزيــــد");
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
  var urlApi = "../api/" + getLanguage + ".json";
  //// Section our projects
  //
  var elementSlider = {
    wrapper: $(".our-projects__wrapper"),
    head: $("#head"),
    par: $("#par"),
    btn: $("#viewMoreProject")
  };

  // Async function render data slider
  async function renderDataSlider(url) {
    try {
      // 1) Get data from api
      var dataSlider = await $.get(url);

      // 2) For each all
      dataSlider.forEach(function (cur, index) {
        // 1) Render img tag, and include data
        var image = "<img src=" + cur.img[0] + " class=\"obj-image\" alt=" + cur.name + " />";
        // 2) Append image in slider
        elementSlider.wrapper.slick("slickAdd", image);
        // 3) Get index contains class active and get it index
        var indexActiveClass = $(".slick-dots li.slick-active").index();
        // 4) If indes === index active class / will be render paragraph from this index
        if (index === indexActiveClass) {
          elementSlider.head.text(cur.name);
          elementSlider.par.text(cur.description);
        }
      });

      // 3) Get id after changed
      var indexDataArray = $(".slick-dots li.slick-active").index();

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
      elementSlider.btn.on("click", function (e) {
        // 1) Get data with index the current slide, and convert to json
        var data = dataSlider[indexDataArray]["id"];
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
    var elementProjects = {
      name: $("#projectName"),
      location: $("#projectLocation"),
      date: $("#projectDate"),
      description: $("#projectDesc"),
      wrapper1: $("#projectsWrapper"),
      wrapper2: $("#otherProjectsWrapper")
    };
    //
    var getDataLocalStorage = +localStorage.getItem("projectId") || 1;
    //
    if (getDataLocalStorage !== null) {
      // 1) Get date from api
      $.get(urlApi).done(function (data) {
        // 2) For each all data
        $.each(data, function (i, cur) {
          // 3) If cur.id equal getDateLocalStorage
          if (cur.id === getDataLocalStorage) {
            // 4) Add all date into each field
            elementProjects.name.text(cur.name);
            elementProjects.location.text(cur.city);
            elementProjects.date.text(cur.date);
            elementProjects.description.text(cur.description);

            // 5) Render img tag, and include data
            $.each(cur.img, function (i, img) {
              var image = "<img src=" + img + " class=\"obj-image\" alt=" + cur.name + " />";
              // 2) Append image in slider
              elementProjects.wrapper1.slick("slickAdd", image);
            });
          } else {
            // 1) Create card
            var card = "\n                <div class=\"card-projects text-capitalize\" key=" + cur.id + ">\n                    <div class=\"other-projects__wrapper__image\">\n                        <img class=\"img-fluid obj-image\" src=" + cur.img[0] + " alt=" + cur.name + " />\n                    </div>\n                    \n                    <h4 class=\"h-small weight-bold mt-2 mb-3\">" + cur.name + "</h4>\n                    <p class=\"m-0 mb-1\">" + cur.city + "</p>\n                    <p class=\"m-0\">" + cur.date + "</p>\n                </div>\n            ";
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
  /////////////////////////////////////
  //// Section our partners
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
  //// Footer
  $("#year").text(new Date().getFullYear());
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOlsialF1ZXJ5IiwiJCIsIm9uIiwiZSIsImF0dHIiLCJwcmV2ZW50RGVmYXVsdCIsImF0dHJTZWN0aW9uIiwiZGF0YSIsInBhcmVudHNVbnRpbCIsInJlbW92ZUNsYXNzIiwiYW5pbWF0ZSIsInNjcm9sbFRvcCIsIm9mZnNldCIsInRvcCIsInJlbmRlckxhbmd1YWdlIiwiZ2V0TGFuZyIsImxvY2FsaXppdGlvbiIsImdldCIsImRpciIsImxhbmciLCJ2YWwiLCJsb2NhbFN0b3JhZ2UiLCJzZXRJdGVtIiwibG9jYXRpb24iLCJyZWxvYWQiLCJjaGFuZ2VTZWxlY3RMYW5nIiwiZWFjaCIsImkiLCJjdXIiLCJzaWJsaW5ncyIsInJlbW92ZUF0dHIiLCJnZXRMYW5ndWFnZSIsImdldEl0ZW0iLCJwYXJlbnQiLCJjaGlsZHJlbiIsInRvZ2dsZUNsYXNzIiwiaGFzQ2xhc3MiLCJ0ZXh0Iiwic2xpY2siLCJsYXp5TG9hZCIsImluZmluaXRlIiwic2xpZGVzVG9TaG93Iiwic2xpZGVzVG9TY3JvbGwiLCJhdXRvcGxheSIsImF1dG9wbGF5U3BlZWQiLCJhcnJvd3MiLCJkb3RzIiwiZmFkZSIsImNzc0Vhc2UiLCJwcmV2QXJyb3ciLCJuZXh0QXJyb3ciLCJyZXNwb25zaXZlIiwiYnJlYWtwb2ludCIsInNldHRpbmdzIiwidXJsQXBpIiwiZWxlbWVudFNsaWRlciIsIndyYXBwZXIiLCJoZWFkIiwicGFyIiwiYnRuIiwicmVuZGVyRGF0YVNsaWRlciIsInVybCIsImRhdGFTbGlkZXIiLCJmb3JFYWNoIiwiaW5kZXgiLCJpbWFnZSIsImltZyIsIm5hbWUiLCJpbmRleEFjdGl2ZUNsYXNzIiwiZGVzY3JpcHRpb24iLCJpbmRleERhdGFBcnJheSIsImluZGV4Q3VycmVudFNsaWRlIiwiZXJyIiwiYWxlcnQiLCJwYXRobmFtZSIsImluY2x1ZGVzIiwiZWxlbWVudFByb2plY3RzIiwiZGF0ZSIsIndyYXBwZXIxIiwid3JhcHBlcjIiLCJnZXREYXRhTG9jYWxTdG9yYWdlIiwiZG9uZSIsImlkIiwiY2l0eSIsImNhcmQiLCJkb2N1bWVudCIsImdldElkIiwic2hvd0FuZEhpZGRlbiIsInRpbWVyIiwiY291bnRJbWFnZXMiLCJsZW5ndGgiLCJjb3VudCIsInNldEludGVydmFsIiwiZXEiLCJhZGRDbGFzcyIsInNldFRpbWVvdXQiLCJzZXRUaW1lT3V0Iiwib3V0ZXJXaWR0aCIsIkRhdGUiLCJnZXRGdWxsWWVhciJdLCJtYXBwaW5ncyI6Ijs7QUFBQUEsT0FBTyxZQUFZO0FBQ2pCO0FBQ0E7QUFDQUMsSUFBRSxXQUFGLEVBQWVDLEVBQWYsQ0FBa0IsT0FBbEIsRUFBMkIsVUFBVUMsQ0FBVixFQUFhO0FBQ3RDO0FBQ0EsUUFBSUYsRUFBRSxJQUFGLEVBQVFHLElBQVIsQ0FBYSxLQUFiLE1BQXdCLE1BQTVCLEVBQW9DO0FBQ2xDRCxRQUFFRSxjQUFGO0FBQ0E7QUFDQSxVQUFNQyxjQUFjTCxFQUFFLElBQUYsRUFBUU0sSUFBUixDQUFhLFNBQWIsQ0FBcEI7QUFDQTtBQUNBTixRQUFFLElBQUYsRUFBUU8sWUFBUixDQUFxQixpQkFBckIsRUFBd0NDLFdBQXhDLENBQW9ELE1BQXBEO0FBQ0E7QUFDQVIsUUFBRSxZQUFGLEVBQWdCUyxPQUFoQixDQUNFO0FBQ0VDLG1CQUFXVixRQUFNSyxXQUFOLEVBQXFCTSxNQUFyQixHQUE4QkMsR0FBOUIsR0FBb0M7QUFEakQsT0FERixFQUlFLElBSkY7QUFNRDtBQUNGLEdBaEJEOztBQWtCQTtBQUNBO0FBQ0E7QUFDQSxpQkFBZUMsY0FBZixDQUE4QkMsT0FBOUIsRUFBdUM7QUFDckM7QUFDQSxRQUFNQyxlQUFlLE1BQU1mLEVBQUVnQixHQUFGLHNCQUF5QkYsT0FBekIsV0FBM0I7QUFDQTtBQUNBLFFBQUlBLFlBQVksSUFBaEIsRUFBc0I7QUFDcEJkLFFBQUUsTUFBRixFQUFVRyxJQUFWLENBQWUsRUFBRWMsS0FBSyxLQUFQLEVBQWNDLE1BQU0sSUFBcEIsRUFBZjtBQUNELEtBRkQsTUFFTztBQUNMbEIsUUFBRSxNQUFGLEVBQVVHLElBQVYsQ0FBZSxFQUFFYyxLQUFLLEtBQVAsRUFBY0MsTUFBTSxJQUFwQixFQUFmO0FBQ0Q7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDRDtBQUNEO0FBQ0FsQixJQUFFLGNBQUYsRUFBa0JDLEVBQWxCLENBQXFCLFFBQXJCLEVBQStCLFlBQVk7QUFDekM7QUFDQSxRQUFJYSxVQUFVZCxFQUFFLElBQUYsRUFBUW1CLEdBQVIsRUFBZDtBQUNBO0FBQ0FDLGlCQUFhQyxPQUFiLENBQXFCLFVBQXJCLEVBQWlDUCxPQUFqQztBQUNBO0FBQ0FRLGFBQVNDLE1BQVQ7QUFDRCxHQVBEO0FBUUE7QUFDQSxXQUFTQyxnQkFBVCxDQUEwQk4sSUFBMUIsRUFBZ0M7QUFDOUJsQixNQUFFLHFCQUFGLEVBQXlCeUIsSUFBekIsQ0FBOEIsVUFBQ0MsQ0FBRCxFQUFJQyxHQUFKLEVBQVk7QUFDeEMsVUFBSTNCLEVBQUUyQixHQUFGLEVBQU94QixJQUFQLENBQVksT0FBWixNQUF5QmUsSUFBN0IsRUFBbUM7QUFDakNsQixVQUFFMkIsR0FBRixFQUFPeEIsSUFBUCxDQUFZLFVBQVosRUFBd0IsSUFBeEIsRUFBOEJ5QixRQUE5QixHQUF5Q0MsVUFBekMsQ0FBb0QsVUFBcEQ7QUFDRDtBQUNGLEtBSkQ7QUFLRDtBQUNEO0FBQ0EsTUFBSUMsY0FBY1YsYUFBYVcsT0FBYixDQUFxQixVQUFyQixDQUFsQjtBQUNBO0FBQ0EsTUFBSUQsZ0JBQWdCLElBQXBCLEVBQTBCO0FBQ3hCTixxQkFBaUJNLFdBQWpCO0FBQ0FqQixtQkFBZWlCLFdBQWY7QUFDRCxHQUhELE1BR087QUFDTEEsa0JBQWM5QixFQUFFLGNBQUYsRUFBa0JtQixHQUFsQixFQUFkO0FBQ0FOLG1CQUFlaUIsV0FBZjtBQUNBTixxQkFBaUJNLFdBQWpCO0FBQ0Q7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E5QixJQUFFLE9BQUYsRUFBV0MsRUFBWCxDQUFjLE9BQWQsRUFBdUIsVUFBVUMsQ0FBVixFQUFhO0FBQ2xDO0FBQ0FBLE1BQUVFLGNBQUY7QUFDQTtBQUNBSixNQUFFLElBQUYsRUFBUWdDLE1BQVIsR0FBaUJDLFFBQWpCLENBQTBCLEdBQTFCLEVBQStCQyxXQUEvQixDQUEyQyxNQUEzQztBQUNBO0FBQ0EsUUFBSWxDLEVBQUUsSUFBRixFQUFRZ0MsTUFBUixHQUFpQkMsUUFBakIsQ0FBMEIsR0FBMUIsRUFBK0JFLFFBQS9CLENBQXdDLE1BQXhDLENBQUosRUFBcUQ7QUFDbkRuQyxRQUFFLE1BQUYsRUFBVUcsSUFBVixDQUFlLEtBQWYsTUFBMEIsS0FBMUIsR0FDSUgsRUFBRSxJQUFGLEVBQVFvQyxJQUFSLENBQWEsTUFBYixDQURKLEdBRUlwQyxFQUFFLElBQUYsRUFBUW9DLElBQVIsQ0FBYSxLQUFiLENBRko7QUFHRCxLQUpELE1BSU87QUFDTHBDLFFBQUUsTUFBRixFQUFVRyxJQUFWLENBQWUsS0FBZixNQUEwQixLQUExQixHQUNJSCxFQUFFLElBQUYsRUFBUW9DLElBQVIsQ0FBYSxXQUFiLENBREosR0FFSXBDLEVBQUUsSUFBRixFQUFRb0MsSUFBUixDQUFhLFlBQWIsQ0FGSjtBQUdEO0FBQ0YsR0FmRDs7QUFpQkE7QUFDQXBDLElBQUUsd0JBQUYsRUFBNEJxQyxLQUE1QixDQUFrQztBQUNoQ0MsY0FBVSxhQURzQjtBQUVoQ0MsY0FBVSxLQUZzQjtBQUdoQ0Msa0JBQWMsQ0FIa0I7QUFJaENDLG9CQUFnQixDQUpnQjtBQUtoQ0MsY0FBVSxJQUxzQjtBQU1oQ0MsbUJBQWUsS0FOaUI7QUFPaENDLFlBQVEsS0FQd0I7QUFRaENDLFVBQU0sSUFSMEI7QUFTaENDLFVBQU0sSUFUMEI7QUFVaENDLGFBQVM7QUFWdUIsR0FBbEM7O0FBYUE7QUFDQS9DLElBQUUsMkJBQUYsRUFBK0JxQyxLQUEvQixDQUFxQztBQUNuQ0MsY0FBVSxhQUR5QjtBQUVuQ0MsY0FBVSxLQUZ5QjtBQUduQ0Msa0JBQWMsQ0FIcUI7QUFJbkNDLG9CQUFnQixDQUptQjtBQUtuQ0MsY0FBVSxJQUx5QjtBQU1uQ0MsbUJBQWUsSUFOb0I7QUFPbkNDLFlBQVEsSUFQMkI7QUFRbkNJLCtIQVJtQztBQVduQ0MsaUlBWG1DO0FBY25DQyxnQkFBWSxDQUNWO0FBQ0VDLGtCQUFZLEdBRGQ7QUFFRUMsZ0JBQVU7QUFDUlIsZ0JBQVE7QUFEQTtBQUZaLEtBRFU7QUFkdUIsR0FBckM7O0FBd0JBO0FBQ0E1QyxJQUFFLDBCQUFGLEVBQThCcUMsS0FBOUIsQ0FBb0M7QUFDbENDLGNBQVUsYUFEd0I7QUFFbENDLGNBQVUsS0FGd0I7QUFHbENDLGtCQUFjLENBSG9CO0FBSWxDQyxvQkFBZ0IsQ0FKa0I7QUFLbENPLCtIQUxrQztBQVFsQ0MsaUlBUmtDO0FBV2xDTCxZQUFRLElBWDBCO0FBWWxDTSxnQkFBWSxDQUNWO0FBQ0VDLGtCQUFZLEdBRGQ7QUFFRUMsZ0JBQVU7QUFDUlosc0JBQWMsQ0FETjtBQUVSQyx3QkFBZ0IsQ0FGUjtBQUdSRyxnQkFBUTtBQUhBO0FBRlosS0FEVSxFQVNWO0FBQ0VPLGtCQUFZLEdBRGQ7QUFFRUMsZ0JBQVU7QUFDUlosc0JBQWMsQ0FETjtBQUVSQyx3QkFBZ0IsQ0FGUjtBQUdSRyxnQkFBUTtBQUhBO0FBRlosS0FUVTtBQVpzQixHQUFwQzs7QUFnQ0E7QUFDQSxNQUFNUyxxQkFBbUJ2QixXQUFuQixVQUFOO0FBQ0E7QUFDQTtBQUNBLE1BQU13QixnQkFBZ0I7QUFDcEJDLGFBQVN2RCxFQUFFLHdCQUFGLENBRFc7QUFFcEJ3RCxVQUFNeEQsRUFBRSxPQUFGLENBRmM7QUFHcEJ5RCxTQUFLekQsRUFBRSxNQUFGLENBSGU7QUFJcEIwRCxTQUFLMUQsRUFBRSxrQkFBRjtBQUplLEdBQXRCOztBQU9BO0FBQ0EsaUJBQWUyRCxnQkFBZixDQUFnQ0MsR0FBaEMsRUFBcUM7QUFDbkMsUUFBSTtBQUNGO0FBQ0EsVUFBTUMsYUFBYSxNQUFNN0QsRUFBRWdCLEdBQUYsQ0FBTTRDLEdBQU4sQ0FBekI7O0FBRUE7QUFDQUMsaUJBQVdDLE9BQVgsQ0FBbUIsVUFBQ25DLEdBQUQsRUFBTW9DLEtBQU4sRUFBZ0I7QUFDakM7QUFDQSxZQUFNQyxzQkFBb0JyQyxJQUFJc0MsR0FBSixDQUFRLENBQVIsQ0FBcEIsaUNBQXdEdEMsSUFBSXVDLElBQTVELFFBQU47QUFDQTtBQUNBWixzQkFBY0MsT0FBZCxDQUFzQmxCLEtBQXRCLENBQTRCLFVBQTVCLEVBQXdDMkIsS0FBeEM7QUFDQTtBQUNBLFlBQU1HLG1CQUFtQm5FLEVBQUUsNkJBQUYsRUFBaUMrRCxLQUFqQyxFQUF6QjtBQUNBO0FBQ0EsWUFBSUEsVUFBVUksZ0JBQWQsRUFBZ0M7QUFDOUJiLHdCQUFjRSxJQUFkLENBQW1CcEIsSUFBbkIsQ0FBd0JULElBQUl1QyxJQUE1QjtBQUNBWix3QkFBY0csR0FBZCxDQUFrQnJCLElBQWxCLENBQXVCVCxJQUFJeUMsV0FBM0I7QUFDRDtBQUNGLE9BWkQ7O0FBY0E7QUFDQSxVQUFJQyxpQkFBaUJyRSxFQUFFLDZCQUFGLEVBQWlDK0QsS0FBakMsRUFBckI7O0FBRUE7QUFDQVQsb0JBQWNDLE9BQWQsQ0FBc0J0RCxFQUF0QixDQUF5QixhQUF6QixFQUF3QyxZQUFZO0FBQ2xEO0FBQ0EsWUFBSXFFLG9CQUFvQnRFLEVBQUUsZ0JBQUYsRUFBb0JHLElBQXBCLENBQXlCLGtCQUF6QixDQUF4QjtBQUNBO0FBQ0FrRSx5QkFBaUJDLGlCQUFqQjtBQUNBO0FBQ0FoQixzQkFBY0UsSUFBZCxDQUFtQnBCLElBQW5CLENBQXdCeUIsV0FBV1MsaUJBQVgsRUFBOEJKLElBQXREO0FBQ0FaLHNCQUFjRyxHQUFkLENBQWtCckIsSUFBbEIsQ0FBdUJ5QixXQUFXUyxpQkFBWCxFQUE4QkYsV0FBckQ7QUFDRCxPQVJEOztBQVVBO0FBQ0FkLG9CQUFjSSxHQUFkLENBQWtCekQsRUFBbEIsQ0FBcUIsT0FBckIsRUFBOEIsVUFBQ0MsQ0FBRCxFQUFPO0FBQ25DO0FBQ0EsWUFBTUksT0FBT3VELFdBQVdRLGNBQVgsRUFBMkIsSUFBM0IsQ0FBYjtBQUNBO0FBQ0FqRCxxQkFBYUMsT0FBYixDQUFxQixXQUFyQixFQUFrQ2YsSUFBbEM7QUFDRCxPQUxEO0FBTUQsS0F4Q0QsQ0F3Q0UsT0FBT2lFLEdBQVAsRUFBWTtBQUNaQyxZQUFNLDhCQUFOO0FBQ0Q7QUFDRjtBQUNEO0FBQ0FiLG1CQUFpQk4sTUFBakI7O0FBRUE7QUFDQTtBQUNBLE1BQUkvQixTQUFTbUQsUUFBVCxDQUFrQkMsUUFBbEIsQ0FBMkIsU0FBM0IsQ0FBSixFQUEyQztBQUN6QztBQUNBLFFBQU1DLGtCQUFrQjtBQUN0QlQsWUFBTWxFLEVBQUUsY0FBRixDQURnQjtBQUV0QnNCLGdCQUFVdEIsRUFBRSxrQkFBRixDQUZZO0FBR3RCNEUsWUFBTTVFLEVBQUUsY0FBRixDQUhnQjtBQUl0Qm9FLG1CQUFhcEUsRUFBRSxjQUFGLENBSlM7QUFLdEI2RSxnQkFBVTdFLEVBQUUsa0JBQUYsQ0FMWTtBQU10QjhFLGdCQUFVOUUsRUFBRSx1QkFBRjtBQU5ZLEtBQXhCO0FBUUE7QUFDQSxRQUFNK0Usc0JBQXNCLENBQUMzRCxhQUFhVyxPQUFiLENBQXFCLFdBQXJCLENBQUQsSUFBc0MsQ0FBbEU7QUFDQTtBQUNBLFFBQUlnRCx3QkFBd0IsSUFBNUIsRUFBa0M7QUFDaEM7QUFDQS9FLFFBQUVnQixHQUFGLENBQU1xQyxNQUFOLEVBQWMyQixJQUFkLENBQW1CLFVBQUMxRSxJQUFELEVBQVU7QUFDM0I7QUFDQU4sVUFBRXlCLElBQUYsQ0FBT25CLElBQVAsRUFBYSxVQUFDb0IsQ0FBRCxFQUFJQyxHQUFKLEVBQVk7QUFDdkI7QUFDQSxjQUFJQSxJQUFJc0QsRUFBSixLQUFXRixtQkFBZixFQUFvQztBQUNsQztBQUNBSiw0QkFBZ0JULElBQWhCLENBQXFCOUIsSUFBckIsQ0FBMEJULElBQUl1QyxJQUE5QjtBQUNBUyw0QkFBZ0JyRCxRQUFoQixDQUF5QmMsSUFBekIsQ0FBOEJULElBQUl1RCxJQUFsQztBQUNBUCw0QkFBZ0JDLElBQWhCLENBQXFCeEMsSUFBckIsQ0FBMEJULElBQUlpRCxJQUE5QjtBQUNBRCw0QkFBZ0JQLFdBQWhCLENBQTRCaEMsSUFBNUIsQ0FBaUNULElBQUl5QyxXQUFyQzs7QUFFQTtBQUNBcEUsY0FBRXlCLElBQUYsQ0FBT0UsSUFBSXNDLEdBQVgsRUFBZ0IsVUFBQ3ZDLENBQUQsRUFBSXVDLEdBQUosRUFBWTtBQUMxQixrQkFBTUQsc0JBQW9CQyxHQUFwQixpQ0FBaUR0QyxJQUFJdUMsSUFBckQsUUFBTjtBQUNBO0FBQ0FTLDhCQUFnQkUsUUFBaEIsQ0FBeUJ4QyxLQUF6QixDQUErQixVQUEvQixFQUEyQzJCLEtBQTNDO0FBQ0QsYUFKRDtBQUtELFdBYkQsTUFhTztBQUNMO0FBQ0EsZ0JBQU1tQiwrRUFDK0N4RCxJQUFJc0QsRUFEbkQsOElBRzZDdEQsSUFBSXNDLEdBQUosQ0FBUSxDQUFSLENBSDdDLGFBRytEdEMsSUFBSXVDLElBSG5FLCtIQU04Q3ZDLElBQUl1QyxJQU5sRCx5REFPd0J2QyxJQUFJdUQsSUFQNUIsbURBUW1CdkQsSUFBSWlELElBUnZCLCtDQUFOO0FBV0E7QUFDQUQsNEJBQWdCRyxRQUFoQixDQUF5QnpDLEtBQXpCLENBQStCLFVBQS9CLEVBQTJDOEMsSUFBM0M7QUFDRDtBQUNGLFNBL0JEO0FBZ0NELE9BbENEO0FBbUNEO0FBQ0Y7O0FBRUQ7QUFDQW5GLElBQUVvRixRQUFGLEVBQVluRixFQUFaLENBQWUsT0FBZixFQUF3QixnQkFBeEIsRUFBMEMsWUFBWTtBQUNwRDtBQUNBLFFBQU1vRixRQUFRckYsRUFBRSxJQUFGLEVBQVFHLElBQVIsQ0FBYSxLQUFiLENBQWQ7O0FBRUE7QUFDQWlCLGlCQUFhQyxPQUFiLENBQXFCLFdBQXJCLEVBQWtDZ0UsS0FBbEM7O0FBRUE7QUFDQXJGLE1BQUUsWUFBRixFQUFnQlMsT0FBaEIsQ0FDRTtBQUNFQyxpQkFBVztBQURiLEtBREYsRUFJRSxHQUpGLEVBS0UsWUFBWTtBQUNWWSxlQUFTQyxNQUFUO0FBQ0QsS0FQSDtBQVNELEdBakJEO0FBa0JBO0FBQ0E7QUFDQTtBQUNBLFdBQVMrRCxhQUFULENBQXVCQyxLQUF2QixFQUE4QjtBQUM1QixRQUFNQyxjQUFjeEYsRUFBRSxrQkFBRixFQUFzQmlDLFFBQXRCLEdBQWlDd0QsTUFBckQ7QUFDQSxRQUFJQyxRQUFRLENBQVo7QUFDQTtBQUNBQyxnQkFBWSxZQUFNO0FBQ2hCO0FBQ0EsVUFBSUQsVUFBVUYsV0FBZCxFQUEyQkUsUUFBUSxDQUFSOztBQUUzQjtBQUNBMUYsUUFBRSxrQkFBRixFQUNHaUMsUUFESCxHQUVHMkQsRUFGSCxDQUVNRixLQUZOLEVBR0dHLFFBSEgsQ0FHWSx1Q0FIWjs7QUFLQTtBQUNBQyxpQkFBVyxZQUFNO0FBQ2Y5RixVQUFFLGtCQUFGLEVBQ0dpQyxRQURILEdBRUcyRCxFQUZILENBRU1GLFFBQVEsQ0FGZCxFQUdHbEYsV0FISCxDQUdlLHVDQUhmO0FBSUQsT0FMRCxFQUtHK0UsTUFBTVEsVUFMVDs7QUFPQTtBQUNBTDtBQUNELEtBcEJELEVBb0JHSCxNQUFNSSxXQXBCVDtBQXFCRDs7QUFFRDtBQUNBO0FBQ0EsTUFBSTNGLEVBQUVvRixRQUFGLEVBQVlZLFVBQVosQ0FBdUIsSUFBdkIsSUFBK0IsR0FBbkMsRUFBd0M7QUFDdEM7QUFDQVYsa0JBQWM7QUFDWlMsa0JBQVksSUFEQTtBQUVaSixtQkFBYTtBQUZELEtBQWQ7QUFJRDs7QUFFRDtBQUNBO0FBQ0EzRixJQUFFLE9BQUYsRUFBV29DLElBQVgsQ0FBZ0IsSUFBSTZELElBQUosR0FBV0MsV0FBWCxFQUFoQjtBQUNELENBalZEIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyJqUXVlcnkoZnVuY3Rpb24gKCkge1xuICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4gIC8vLy8gTmF2YmFyXG4gICQoXCIubmF2LWxpbmtcIikub24oXCJjbGlja1wiLCBmdW5jdGlvbiAoZSkge1xuICAgIC8vIDEpIFByZXZlbnQgZGVmYXVsdFxuICAgIGlmICgkKHRoaXMpLmF0dHIoXCJrZXlcIikgIT09IFwiaG9tZVwiKSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAvLyAyKSBHZXQgdGhlIGF0dHIgc2VjdGlvblxuICAgICAgY29uc3QgYXR0clNlY3Rpb24gPSAkKHRoaXMpLmRhdGEoXCJzZWN0aW9uXCIpO1xuICAgICAgLy8gMykgUmVtb3ZlIGNsYXNzIHNob3cgd2hlbiBjbGljayBsaW5rXG4gICAgICAkKHRoaXMpLnBhcmVudHNVbnRpbChcIm5hdmJhci1jb2xsYXBzZVwiKS5yZW1vdmVDbGFzcyhcInNob3dcIik7XG4gICAgICAvLyA0KSBBbmltYXRlIHRvIHRoZSBzZWN0aW9uXG4gICAgICAkKFwiaHRtbCwgYm9keVwiKS5hbmltYXRlKFxuICAgICAgICB7XG4gICAgICAgICAgc2Nyb2xsVG9wOiAkKGAjJHthdHRyU2VjdGlvbn1gKS5vZmZzZXQoKS50b3AgLSAyMCxcbiAgICAgICAgfSxcbiAgICAgICAgMTAwMFxuICAgICAgKTtcbiAgICB9XG4gIH0pO1xuXG4gIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbiAgLy8vLyBDaGFuZ2UgbGFuZ1xuICAvLyAxKSBSZW5kZXIgbGFuZ3VhZ2VcbiAgYXN5bmMgZnVuY3Rpb24gcmVuZGVyTGFuZ3VhZ2UoZ2V0TGFuZykge1xuICAgIC8vIDIpIEdldCBkYXRhXG4gICAgY29uc3QgbG9jYWxpeml0aW9uID0gYXdhaXQgJC5nZXQoYC4uL2xvY2FsaXppdGlvbi8ke2dldExhbmd9Lmpzb25gKTtcbiAgICAvLyAzKSBDaGFuZ2UgbGFuZ3VhZ2VcbiAgICBpZiAoZ2V0TGFuZyA9PT0gXCJhclwiKSB7XG4gICAgICAkKFwiaHRtbFwiKS5hdHRyKHsgZGlyOiBcInJ0bFwiLCBsYW5nOiBcImFyXCIgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICQoXCJodG1sXCIpLmF0dHIoeyBkaXI6IFwibHRyXCIsIGxhbmc6IFwiZW5cIiB9KTtcbiAgICB9XG5cbiAgICAvLyBOYXZiYXIgbGlua3NcbiAgICAvLyAkKFwiLm5hdmJhci1uYXYgYVwiKS5lYWNoKChpLCBjdXIpID0+XG4gICAgLy8gICAkKGN1cikudGV4dChsb2NhbGl6aXRpb24ubmF2YmFyWyQoY3VyKS5hdHRyKFwia2V5XCIpXSlcbiAgICAvLyApO1xuICB9XG4gIC8vIDIpIFdoZW4gY2hhbmdlIGxhbmdcbiAgJChcIi5jaGFuZ2VfbGFuZ1wiKS5vbihcImNoYW5nZVwiLCBmdW5jdGlvbiAoKSB7XG4gICAgLy8gMSkgR2V0IG5ldyB2YWx1ZSBmcm9tIHNlbGVjdCBlbGVtZW50XG4gICAgbGV0IGdldExhbmcgPSAkKHRoaXMpLnZhbCgpO1xuICAgIC8vIDIpIFNldCBuZXcgdmFsdWUgaW4gaXRlbVxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwibGFuZ3VhZ2VcIiwgZ2V0TGFuZyk7XG4gICAgLy8gMykgUmVsb2FkIHBhZ2VcbiAgICBsb2NhdGlvbi5yZWxvYWQoKTtcbiAgfSk7XG4gIC8vIENoYW5nZSBzZWxlY3QgbGFuZ1xuICBmdW5jdGlvbiBjaGFuZ2VTZWxlY3RMYW5nKGxhbmcpIHtcbiAgICAkKFwiLmNoYW5nZV9sYW5nIG9wdGlvblwiKS5lYWNoKChpLCBjdXIpID0+IHtcbiAgICAgIGlmICgkKGN1cikuYXR0cihcInZhbHVlXCIpID09PSBsYW5nKSB7XG4gICAgICAgICQoY3VyKS5hdHRyKFwic2VsZWN0ZWRcIiwgdHJ1ZSkuc2libGluZ3MoKS5yZW1vdmVBdHRyKFwic2VsZWN0ZWRcIik7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbiAgLy9cbiAgbGV0IGdldExhbmd1YWdlID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJsYW5ndWFnZVwiKTtcbiAgLy8gSWYgdGhlcmUgbG9jYWwgc3RvcmFnZSBpbiBzaXRlIHdpdGggbmFtZSBsYW5ndWFnZSB3aWxsIGJlIHJlbmRlciBsYW5ndWFnZSBzaXRlIHdpdGggaW4gdGhlIHNhbWUgbGFuZ3VhZ2UgaWYgbm90IHdpbGwgYmUgcmVuZGVyIGxhbmd1YWdlIHNpdGUgd2l0aCBzZWxlY3RlZCBsYW5nIGZyb20gc2VsZWN0IGJveFxuICBpZiAoZ2V0TGFuZ3VhZ2UgIT09IG51bGwpIHtcbiAgICBjaGFuZ2VTZWxlY3RMYW5nKGdldExhbmd1YWdlKTtcbiAgICByZW5kZXJMYW5ndWFnZShnZXRMYW5ndWFnZSk7XG4gIH0gZWxzZSB7XG4gICAgZ2V0TGFuZ3VhZ2UgPSAkKFwiLmNoYW5nZV9sYW5nXCIpLnZhbCgpO1xuICAgIHJlbmRlckxhbmd1YWdlKGdldExhbmd1YWdlKTtcbiAgICBjaGFuZ2VTZWxlY3RMYW5nKGdldExhbmd1YWdlKTtcbiAgfVxuXG4gIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbiAgLy8vLy8gU2VjdGlvbiBhYm91dCB1c1xuICAvLyBNb3JlIFBhcmFncmFwaFxuICAkKFwiLm1vcmVcIikub24oXCJjbGlja1wiLCBmdW5jdGlvbiAoZSkge1xuICAgIC8vIDEpIFByZXZlbnQgZGVmYXVsdCBhbmNob3JcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgLy8gMikgVG9nZ2xlIGNsYXNzIG1vcmUgb24gcGFyYWdyYXBoXG4gICAgJCh0aGlzKS5wYXJlbnQoKS5jaGlsZHJlbihcInBcIikudG9nZ2xlQ2xhc3MoXCJtb3JlXCIpO1xuICAgIC8vIDMpIENoZWNrIGlmIHBhcmdhcnBoIGhhcyBjbGFzcyBtb3JlIG9yIG5vdFxuICAgIGlmICgkKHRoaXMpLnBhcmVudCgpLmNoaWxkcmVuKFwicFwiKS5oYXNDbGFzcyhcIm1vcmVcIikpIHtcbiAgICAgICQoXCJodG1sXCIpLmF0dHIoXCJkaXJcIikgPT09IFwibHRyXCJcbiAgICAgICAgPyAkKHRoaXMpLnRleHQoXCJsZXNzXCIpXG4gICAgICAgIDogJCh0aGlzKS50ZXh0KFwi2KfZgtmEXCIpO1xuICAgIH0gZWxzZSB7XG4gICAgICAkKFwiaHRtbFwiKS5hdHRyKFwiZGlyXCIpID09PSBcImx0clwiXG4gICAgICAgID8gJCh0aGlzKS50ZXh0KFwidmlldyBtb3JlXCIpXG4gICAgICAgIDogJCh0aGlzKS50ZXh0KFwi2KfZhNmF2LLZitmA2YDZgNmA2K9cIik7XG4gICAgfVxuICB9KTtcblxuICAvLyBTZWN0aW9uIG91ciBwcm9qZWN0c1xuICAkKFwiLm91ci1wcm9qZWN0c19fd3JhcHBlclwiKS5zbGljayh7XG4gICAgbGF6eUxvYWQ6IFwicHJvZ3Jlc3NpdmVcIixcbiAgICBpbmZpbml0ZTogZmFsc2UsXG4gICAgc2xpZGVzVG9TaG93OiAxLFxuICAgIHNsaWRlc1RvU2Nyb2xsOiAxLFxuICAgIGF1dG9wbGF5OiB0cnVlLFxuICAgIGF1dG9wbGF5U3BlZWQ6IDEwMDAwLFxuICAgIGFycm93czogZmFsc2UsXG4gICAgZG90czogdHJ1ZSxcbiAgICBmYWRlOiB0cnVlLFxuICAgIGNzc0Vhc2U6IFwibGluZWFyXCIsXG4gIH0pO1xuXG4gIC8vIEhlYWRlciBwcm9qZWN0cyBzbGlkZXJcbiAgJChcIi5oZWFkZXItcHJvamVjdHNfX3dyYXBwZXJcIikuc2xpY2soe1xuICAgIGxhenlMb2FkOiBcInByb2dyZXNzaXZlXCIsXG4gICAgaW5maW5pdGU6IGZhbHNlLFxuICAgIHNsaWRlc1RvU2hvdzogMSxcbiAgICBzbGlkZXNUb1Njcm9sbDogMSxcbiAgICBhdXRvcGxheTogdHJ1ZSxcbiAgICBhdXRvcGxheVNwZWVkOiA1MDAwLFxuICAgIGFycm93czogdHJ1ZSxcbiAgICBwcmV2QXJyb3c6IGA8c3ZnIGNsYXNzPSdhLWxlZnQgcHJldiBzbGljay1wcmV2Jz5cbiAgICA8dXNlIHhsaW5rOmhyZWY9XCIuLi9pY29ucy9zcHJpdGUuc3ZnI2ljb24tYW5nbGUtbGVmdFwiPlxuICAgIDwvc3ZnPmAsXG4gICAgbmV4dEFycm93OiBgPHN2ZyBjbGFzcz0nYS1yaWdodCBuZXh0IHNsaWNrLW5leHQnPlxuICAgIDx1c2UgeGxpbms6aHJlZj1cIi4uL2ljb25zL3Nwcml0ZS5zdmcjaWNvbi1hbmdsZS1yaWdodFwiPlxuICAgIDwvc3ZnPmAsXG4gICAgcmVzcG9uc2l2ZTogW1xuICAgICAge1xuICAgICAgICBicmVha3BvaW50OiA3OTMsXG4gICAgICAgIHNldHRpbmdzOiB7XG4gICAgICAgICAgYXJyb3dzOiBmYWxzZSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgXSxcbiAgfSk7XG5cbiAgLy8gT3RoZXIgcHJvamVjdHMgc2xpZGVyXG4gICQoXCIub3RoZXItcHJvamVjdHNfX3dyYXBwZXJcIikuc2xpY2soe1xuICAgIGxhenlMb2FkOiBcInByb2dyZXNzaXZlXCIsXG4gICAgaW5maW5pdGU6IGZhbHNlLFxuICAgIHNsaWRlc1RvU2hvdzogMyxcbiAgICBzbGlkZXNUb1Njcm9sbDogMyxcbiAgICBwcmV2QXJyb3c6IGA8c3ZnIGNsYXNzPSdhLWxlZnQgcHJldiBzbGljay1wcmV2Jz5cbiAgICA8dXNlIHhsaW5rOmhyZWY9XCIuLi9pY29ucy9zcHJpdGUuc3ZnI2ljb24tYW5nbGUtbGVmdFwiPlxuICAgIDwvc3ZnPmAsXG4gICAgbmV4dEFycm93OiBgPHN2ZyBjbGFzcz0nYS1yaWdodCBuZXh0IHNsaWNrLW5leHQnPlxuICAgIDx1c2UgeGxpbms6aHJlZj1cIi4uL2ljb25zL3Nwcml0ZS5zdmcjaWNvbi1hbmdsZS1yaWdodFwiPlxuICAgIDwvc3ZnPmAsXG4gICAgYXJyb3dzOiB0cnVlLFxuICAgIHJlc3BvbnNpdmU6IFtcbiAgICAgIHtcbiAgICAgICAgYnJlYWtwb2ludDogNzkzLFxuICAgICAgICBzZXR0aW5nczoge1xuICAgICAgICAgIHNsaWRlc1RvU2hvdzogMixcbiAgICAgICAgICBzbGlkZXNUb1Njcm9sbDogMixcbiAgICAgICAgICBhcnJvd3M6IGZhbHNlLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgYnJlYWtwb2ludDogNjAwLFxuICAgICAgICBzZXR0aW5nczoge1xuICAgICAgICAgIHNsaWRlc1RvU2hvdzogMSxcbiAgICAgICAgICBzbGlkZXNUb1Njcm9sbDogMSxcbiAgICAgICAgICBhcnJvd3M6IGZhbHNlLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICBdLFxuICB9KTtcblxuICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4gIGNvbnN0IHVybEFwaSA9IGAuLi9hcGkvJHtnZXRMYW5ndWFnZX0uanNvbmA7XG4gIC8vLy8gU2VjdGlvbiBvdXIgcHJvamVjdHNcbiAgLy9cbiAgY29uc3QgZWxlbWVudFNsaWRlciA9IHtcbiAgICB3cmFwcGVyOiAkKFwiLm91ci1wcm9qZWN0c19fd3JhcHBlclwiKSxcbiAgICBoZWFkOiAkKFwiI2hlYWRcIiksXG4gICAgcGFyOiAkKFwiI3BhclwiKSxcbiAgICBidG46ICQoXCIjdmlld01vcmVQcm9qZWN0XCIpLFxuICB9O1xuXG4gIC8vIEFzeW5jIGZ1bmN0aW9uIHJlbmRlciBkYXRhIHNsaWRlclxuICBhc3luYyBmdW5jdGlvbiByZW5kZXJEYXRhU2xpZGVyKHVybCkge1xuICAgIHRyeSB7XG4gICAgICAvLyAxKSBHZXQgZGF0YSBmcm9tIGFwaVxuICAgICAgY29uc3QgZGF0YVNsaWRlciA9IGF3YWl0ICQuZ2V0KHVybCk7XG5cbiAgICAgIC8vIDIpIEZvciBlYWNoIGFsbFxuICAgICAgZGF0YVNsaWRlci5mb3JFYWNoKChjdXIsIGluZGV4KSA9PiB7XG4gICAgICAgIC8vIDEpIFJlbmRlciBpbWcgdGFnLCBhbmQgaW5jbHVkZSBkYXRhXG4gICAgICAgIGNvbnN0IGltYWdlID0gYDxpbWcgc3JjPSR7Y3VyLmltZ1swXX0gY2xhc3M9XCJvYmotaW1hZ2VcIiBhbHQ9JHtjdXIubmFtZX0gLz5gO1xuICAgICAgICAvLyAyKSBBcHBlbmQgaW1hZ2UgaW4gc2xpZGVyXG4gICAgICAgIGVsZW1lbnRTbGlkZXIud3JhcHBlci5zbGljayhcInNsaWNrQWRkXCIsIGltYWdlKTtcbiAgICAgICAgLy8gMykgR2V0IGluZGV4IGNvbnRhaW5zIGNsYXNzIGFjdGl2ZSBhbmQgZ2V0IGl0IGluZGV4XG4gICAgICAgIGNvbnN0IGluZGV4QWN0aXZlQ2xhc3MgPSAkKFwiLnNsaWNrLWRvdHMgbGkuc2xpY2stYWN0aXZlXCIpLmluZGV4KCk7XG4gICAgICAgIC8vIDQpIElmIGluZGVzID09PSBpbmRleCBhY3RpdmUgY2xhc3MgLyB3aWxsIGJlIHJlbmRlciBwYXJhZ3JhcGggZnJvbSB0aGlzIGluZGV4XG4gICAgICAgIGlmIChpbmRleCA9PT0gaW5kZXhBY3RpdmVDbGFzcykge1xuICAgICAgICAgIGVsZW1lbnRTbGlkZXIuaGVhZC50ZXh0KGN1ci5uYW1lKTtcbiAgICAgICAgICBlbGVtZW50U2xpZGVyLnBhci50ZXh0KGN1ci5kZXNjcmlwdGlvbik7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICAvLyAzKSBHZXQgaWQgYWZ0ZXIgY2hhbmdlZFxuICAgICAgbGV0IGluZGV4RGF0YUFycmF5ID0gJChcIi5zbGljay1kb3RzIGxpLnNsaWNrLWFjdGl2ZVwiKS5pbmRleCgpO1xuXG4gICAgICAvL1xuICAgICAgZWxlbWVudFNsaWRlci53cmFwcGVyLm9uKFwiYWZ0ZXJDaGFuZ2VcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAvLyAxKSBHZXQgY3VycmVudCBpbmRleCBhZnRlciBjaGFuZ2Ugc2xpZGVyXG4gICAgICAgIHZhciBpbmRleEN1cnJlbnRTbGlkZSA9ICQoXCIuc2xpY2stY3VycmVudFwiKS5hdHRyKFwiZGF0YS1zbGljay1pbmRleFwiKTtcbiAgICAgICAgLy8gMikgVXBkYXRlIHZhciA9PiBpbmRleERhdGFBcnJheSBlcXVhbCBpbmRleEN1cnJlbnRTbGlkZVxuICAgICAgICBpbmRleERhdGFBcnJheSA9IGluZGV4Q3VycmVudFNsaWRlO1xuICAgICAgICAvLyAzKSBDaGFuZ2UgaGVhZCwgYW5kIHBhciB3aXRoIGluZGV4IGRhdGEgZnJvbSBBUElcbiAgICAgICAgZWxlbWVudFNsaWRlci5oZWFkLnRleHQoZGF0YVNsaWRlcltpbmRleEN1cnJlbnRTbGlkZV0ubmFtZSk7XG4gICAgICAgIGVsZW1lbnRTbGlkZXIucGFyLnRleHQoZGF0YVNsaWRlcltpbmRleEN1cnJlbnRTbGlkZV0uZGVzY3JpcHRpb24pO1xuICAgICAgfSk7XG5cbiAgICAgIC8vIDQpIFdoZW4gY2xpY2tlZCBpbiBidG4gd2lsbCBiZSBnZXQgZGF0YSB0aGUgY3VycmVudFxuICAgICAgZWxlbWVudFNsaWRlci5idG4ub24oXCJjbGlja1wiLCAoZSkgPT4ge1xuICAgICAgICAvLyAxKSBHZXQgZGF0YSB3aXRoIGluZGV4IHRoZSBjdXJyZW50IHNsaWRlLCBhbmQgY29udmVydCB0byBqc29uXG4gICAgICAgIGNvbnN0IGRhdGEgPSBkYXRhU2xpZGVyW2luZGV4RGF0YUFycmF5XVtcImlkXCJdO1xuICAgICAgICAvLyAyKSBGaW5hbHkgc3RvcmUgZGF0YSBpbiBsb2NhbHN0b3JnZVxuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcInByb2plY3RJZFwiLCBkYXRhKTtcbiAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgYWxlcnQoXCJzb21lIGVycm9yIHBsZWFzZSB0cnkgcmVsb2FkXCIpO1xuICAgIH1cbiAgfVxuICAvLyBSdW4gZm4gcmVuZGVyIGRhdGEgc2xpZGVyXG4gIHJlbmRlckRhdGFTbGlkZXIodXJsQXBpKTtcblxuICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4gIC8vIFBhZ2UgUHJvamVjdHNcbiAgaWYgKGxvY2F0aW9uLnBhdGhuYW1lLmluY2x1ZGVzKFwicHJvamVjdFwiKSkge1xuICAgIC8vXG4gICAgY29uc3QgZWxlbWVudFByb2plY3RzID0ge1xuICAgICAgbmFtZTogJChcIiNwcm9qZWN0TmFtZVwiKSxcbiAgICAgIGxvY2F0aW9uOiAkKFwiI3Byb2plY3RMb2NhdGlvblwiKSxcbiAgICAgIGRhdGU6ICQoXCIjcHJvamVjdERhdGVcIiksXG4gICAgICBkZXNjcmlwdGlvbjogJChcIiNwcm9qZWN0RGVzY1wiKSxcbiAgICAgIHdyYXBwZXIxOiAkKFwiI3Byb2plY3RzV3JhcHBlclwiKSxcbiAgICAgIHdyYXBwZXIyOiAkKFwiI290aGVyUHJvamVjdHNXcmFwcGVyXCIpLFxuICAgIH07XG4gICAgLy9cbiAgICBjb25zdCBnZXREYXRhTG9jYWxTdG9yYWdlID0gK2xvY2FsU3RvcmFnZS5nZXRJdGVtKFwicHJvamVjdElkXCIpIHx8IDE7XG4gICAgLy9cbiAgICBpZiAoZ2V0RGF0YUxvY2FsU3RvcmFnZSAhPT0gbnVsbCkge1xuICAgICAgLy8gMSkgR2V0IGRhdGUgZnJvbSBhcGlcbiAgICAgICQuZ2V0KHVybEFwaSkuZG9uZSgoZGF0YSkgPT4ge1xuICAgICAgICAvLyAyKSBGb3IgZWFjaCBhbGwgZGF0YVxuICAgICAgICAkLmVhY2goZGF0YSwgKGksIGN1cikgPT4ge1xuICAgICAgICAgIC8vIDMpIElmIGN1ci5pZCBlcXVhbCBnZXREYXRlTG9jYWxTdG9yYWdlXG4gICAgICAgICAgaWYgKGN1ci5pZCA9PT0gZ2V0RGF0YUxvY2FsU3RvcmFnZSkge1xuICAgICAgICAgICAgLy8gNCkgQWRkIGFsbCBkYXRlIGludG8gZWFjaCBmaWVsZFxuICAgICAgICAgICAgZWxlbWVudFByb2plY3RzLm5hbWUudGV4dChjdXIubmFtZSk7XG4gICAgICAgICAgICBlbGVtZW50UHJvamVjdHMubG9jYXRpb24udGV4dChjdXIuY2l0eSk7XG4gICAgICAgICAgICBlbGVtZW50UHJvamVjdHMuZGF0ZS50ZXh0KGN1ci5kYXRlKTtcbiAgICAgICAgICAgIGVsZW1lbnRQcm9qZWN0cy5kZXNjcmlwdGlvbi50ZXh0KGN1ci5kZXNjcmlwdGlvbik7XG5cbiAgICAgICAgICAgIC8vIDUpIFJlbmRlciBpbWcgdGFnLCBhbmQgaW5jbHVkZSBkYXRhXG4gICAgICAgICAgICAkLmVhY2goY3VyLmltZywgKGksIGltZykgPT4ge1xuICAgICAgICAgICAgICBjb25zdCBpbWFnZSA9IGA8aW1nIHNyYz0ke2ltZ30gY2xhc3M9XCJvYmotaW1hZ2VcIiBhbHQ9JHtjdXIubmFtZX0gLz5gO1xuICAgICAgICAgICAgICAvLyAyKSBBcHBlbmQgaW1hZ2UgaW4gc2xpZGVyXG4gICAgICAgICAgICAgIGVsZW1lbnRQcm9qZWN0cy53cmFwcGVyMS5zbGljayhcInNsaWNrQWRkXCIsIGltYWdlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyAxKSBDcmVhdGUgY2FyZFxuICAgICAgICAgICAgY29uc3QgY2FyZCA9IGBcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2FyZC1wcm9qZWN0cyB0ZXh0LWNhcGl0YWxpemVcIiBrZXk9JHtjdXIuaWR9PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwib3RoZXItcHJvamVjdHNfX3dyYXBwZXJfX2ltYWdlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aW1nIGNsYXNzPVwiaW1nLWZsdWlkIG9iai1pbWFnZVwiIHNyYz0ke2N1ci5pbWdbMF19IGFsdD0ke2N1ci5uYW1lfSAvPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIDxoNCBjbGFzcz1cImgtc21hbGwgd2VpZ2h0LWJvbGQgbXQtMiBtYi0zXCI+JHtjdXIubmFtZX08L2g0PlxuICAgICAgICAgICAgICAgICAgICA8cCBjbGFzcz1cIm0tMCBtYi0xXCI+JHtjdXIuY2l0eX08L3A+XG4gICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwibS0wXCI+JHtjdXIuZGF0ZX08L3A+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICBgO1xuICAgICAgICAgICAgLy8gMikgQXBwZW5kIGltYWdlIGluIHNsaWRlclxuICAgICAgICAgICAgZWxlbWVudFByb2plY3RzLndyYXBwZXIyLnNsaWNrKFwic2xpY2tBZGRcIiwgY2FyZCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8vIEFkZCBldmVudCBjbGljayBvbiBjYXJkIHByb2R1Y3RzXG4gICQoZG9jdW1lbnQpLm9uKFwiY2xpY2tcIiwgXCIuY2FyZC1wcm9qZWN0c1wiLCBmdW5jdGlvbiAoKSB7XG4gICAgLy8gMSkgR2V0IGlkIGZyb20gYXR0cmlidXRlcyA9PiBrZXlcbiAgICBjb25zdCBnZXRJZCA9ICQodGhpcykuYXR0cihcImtleVwiKTtcblxuICAgIC8vIDIpIFVwZGF0ZSBsb2NhbCBzdG9yYWdlID0+IHByb2plY3RJZFxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwicHJvamVjdElkXCIsIGdldElkKTtcblxuICAgIC8vIDMpIEZpbmFseSBhbmltYXRlIHNjcm9sbCB0b3AgMCwgYW5kIGNhbGxiYWNrIGZ1bmN0aW9uIGxvY2F0aW9uIHJlbG9hZFxuICAgICQoXCJodG1sLCBib2R5XCIpLmFuaW1hdGUoXG4gICAgICB7XG4gICAgICAgIHNjcm9sbFRvcDogMCxcbiAgICAgIH0sXG4gICAgICA1MDAsXG4gICAgICBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGxvY2F0aW9uLnJlbG9hZCgpO1xuICAgICAgfVxuICAgICk7XG4gIH0pO1xuICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4gIC8vLy8gU2VjdGlvbiBvdXIgcGFydG5lcnNcbiAgLy8gMSkgR2V0IGNvdW50IGltYWdlc1xuICBmdW5jdGlvbiBzaG93QW5kSGlkZGVuKHRpbWVyKSB7XG4gICAgY29uc3QgY291bnRJbWFnZXMgPSAkKFwiI3BhcnRuZXJzX19pbWFnZVwiKS5jaGlsZHJlbigpLmxlbmd0aDtcbiAgICBsZXQgY291bnQgPSAwO1xuICAgIC8vXG4gICAgc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgLy8gMSkgQ2hlY2sgaWYgY291bnQgZXF1YWwgY291bnQgaW1hZ2UgbGVuZ3RoIHdpbGwgYmUgcmV0dXJuIGNvdW50ID0gMFxuICAgICAgaWYgKGNvdW50ID09PSBjb3VudEltYWdlcykgY291bnQgPSAwO1xuXG4gICAgICAvLyAyKSBBZGQgY2xhc3MgYWN0aXZlIG9uIHBhcnRuZXJzIGltYWdlXG4gICAgICAkKFwiI3BhcnRuZXJzX19pbWFnZVwiKVxuICAgICAgICAuY2hpbGRyZW4oKVxuICAgICAgICAuZXEoY291bnQpXG4gICAgICAgIC5hZGRDbGFzcyhcInBhcnRuZXJzX19hbGwtcGFydG5lcnNfX2ltYWdlLS1hY3RpdmVcIik7XG5cbiAgICAgIC8vIDMpIFRyaWdnZXIgc2V0IHRpbWUgb3V0IGFmdGVyIDI5MDAgd2lsbCBiZSByZW1vdmUgY2xhc3MgYWN0aXZlXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgJChcIiNwYXJ0bmVyc19faW1hZ2VcIilcbiAgICAgICAgICAuY2hpbGRyZW4oKVxuICAgICAgICAgIC5lcShjb3VudCAtIDEpXG4gICAgICAgICAgLnJlbW92ZUNsYXNzKFwicGFydG5lcnNfX2FsbC1wYXJ0bmVyc19faW1hZ2UtLWFjdGl2ZVwiKTtcbiAgICAgIH0sIHRpbWVyLnNldFRpbWVPdXQpO1xuXG4gICAgICAvLyA0KSBGaW5hbHkgZ2V0IHZhcmlhYmxlIGNvdW50LCBhbmQgaW5jcmVtZW50ICs9IDFcbiAgICAgIGNvdW50Kys7XG4gICAgfSwgdGltZXIuc2V0SW50ZXJ2YWwpO1xuICB9XG5cbiAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuICAvLyBSdW4gZnVuY3Rpb24gU0hPV0FOREhJRERFTlxuICBpZiAoJChkb2N1bWVudCkub3V0ZXJXaWR0aCh0cnVlKSA+IDc2OCkge1xuICAgIC8vXG4gICAgc2hvd0FuZEhpZGRlbih7XG4gICAgICBzZXRUaW1lT3V0OiAyNDAwLFxuICAgICAgc2V0SW50ZXJ2YWw6IDI1MDAsXG4gICAgfSk7XG4gIH1cblxuICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4gIC8vLy8gRm9vdGVyXG4gICQoXCIjeWVhclwiKS50ZXh0KG5ldyBEYXRlKCkuZ2V0RnVsbFllYXIoKSk7XG59KTtcbiJdfQ==
