"use strict";

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
    var getLang = $(".change_lang").val();
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
      $("html").attr("dir") === "ltr" ? $(this).text("less") : $(this).text("اقل");
    } else {
      $("html").attr("dir") === "ltr" ? $(this).text("view more") : $(this).text("المزيــــد");
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
    cssEase: "linear"
  });

  /////////////////////////////////////
  //// Section our projects
  //
  var elementSlider = {
    wrapper: $(".our-projects__wrapper"),
    head: $("#head"),
    par: $("#par")
  };

  // Async function render data slider
  async function renderDataSlider(url) {
    try {
      // 1) Get data from api
      var dataSlider = await $.get(url);

      // 2) For each all
      dataSlider.forEach(function (cur, index) {
        // 1) Render img tag, and include data
        var image = "<img src=" + cur.img + " class=\"obj-image\" alt=" + cur.name + " />";
        // 2) Append image in slider
        elementSlider.wrapper.slick("slickAdd", image);
        // 3) Get index contains class active and get it index
        var indexActiveClass = $(".slick-dots li.slick-active").index();
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

  // Run function SHOWANDHIDDEN
  if ($(document).outerWidth(true) > 768) {
    //
    showAndHidden({
      setTimeOut: 2400,
      setInterval: 2500
    });
  }

  // Footer
  $("#year").text(new Date().getFullYear());
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOlsialF1ZXJ5IiwicmVuZGVyTGFuZ3VhZ2UiLCJnZXRMYW5nIiwibG9jYWxpeml0aW9uIiwiJCIsImdldCIsImF0dHIiLCJkaXIiLCJsYW5nIiwib24iLCJ2YWwiLCJsb2NhbFN0b3JhZ2UiLCJzZXRJdGVtIiwibG9jYXRpb24iLCJyZWxvYWQiLCJjaGFuZ2VTZWxlY3RMYW5nIiwiZWFjaCIsImkiLCJjdXIiLCJzaWJsaW5ncyIsInJlbW92ZUF0dHIiLCJnZXRMYW5ndWFnZSIsImdldEl0ZW0iLCJlIiwicHJldmVudERlZmF1bHQiLCJwYXJlbnQiLCJjaGlsZHJlbiIsInRvZ2dsZUNsYXNzIiwiaGFzQ2xhc3MiLCJ0ZXh0Iiwic2xpY2siLCJsYXp5TG9hZCIsImluZmluaXRlIiwic2xpZGVzVG9TaG93Iiwic2xpZGVzVG9TY3JvbGwiLCJhdXRvcGxheSIsImF1dG9wbGF5U3BlZWQiLCJhcnJvd3MiLCJkb3RzIiwiZmFkZSIsImNzc0Vhc2UiLCJlbGVtZW50U2xpZGVyIiwid3JhcHBlciIsImhlYWQiLCJwYXIiLCJyZW5kZXJEYXRhU2xpZGVyIiwidXJsIiwiZGF0YVNsaWRlciIsImZvckVhY2giLCJpbmRleCIsImltYWdlIiwiaW1nIiwibmFtZSIsImluZGV4QWN0aXZlQ2xhc3MiLCJpbmRleEN1cnJlbnRTbGlkZSIsImVyciIsImFsZXJ0Iiwic2hvd0FuZEhpZGRlbiIsInRpbWVyIiwiY291bnRJbWFnZXMiLCJsZW5ndGgiLCJjb3VudCIsInNldEludGVydmFsIiwiZXEiLCJhZGRDbGFzcyIsInNldFRpbWVvdXQiLCJyZW1vdmVDbGFzcyIsInNldFRpbWVPdXQiLCJkb2N1bWVudCIsIm91dGVyV2lkdGgiLCJEYXRlIiwiZ2V0RnVsbFllYXIiXSwibWFwcGluZ3MiOiI7O0FBQUFBLE9BQU8sWUFBWTtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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biAgLy8vLyBOYXZiYXJcbiAgLy8gICAkKFwiLm5hdi1saW5rXCIpLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuICAvLyAgICAgLy8gMSkgUmVtb3ZlIGNsYXNzIHNob3cgd2hlbiBjbGljayBsaW5rXG4gIC8vICAgICAkKHRoaXMpLnBhcmVudHNVbnRpbChcIm5hdmJhci1jb2xsYXBzZVwiKS5yZW1vdmVDbGFzcyhcInNob3dcIik7XG4gIC8vICAgfSk7XG4gIC8vIFNjcm9sbCBkb2N1bWVudFxuICAvLyAgICQoZG9jdW1lbnQpLm9uKFwic2Nyb2xsXCIsIGZ1bmN0aW9uICgpIHtcbiAgLy8gICAgIC8vXG4gIC8vICAgICAkKGRvY3VtZW50KS5zY3JvbGxUb3AoKSA+PSAxMDAwXG4gIC8vICAgICAgID8gJChcIiNzY3JvbGxVcFwiKS5hZGRDbGFzcyhcImZhZGVJblwiKVxuICAvLyAgICAgICA6ICQoXCIjc2Nyb2xsVXBcIikucmVtb3ZlQ2xhc3MoXCJmYWRlSW5cIik7XG4gIC8vICAgfSk7XG4gIC8vICAgLy8gU2Nyb2xsIHVwIGRvY3VtZW50XG4gIC8vICAgJChcIiNzY3JvbGxVcFwiKS5vbihcImNsaWNrXCIsICgpID0+IHtcbiAgLy8gICAgICQoXCJodG1sLCBib2R5XCIpLmFuaW1hdGUoXG4gIC8vICAgICAgIHtcbiAgLy8gICAgICAgICBzY3JvbGxUb3A6IDAsXG4gIC8vICAgICAgIH0sXG4gIC8vICAgICAgIDEwMDBcbiAgLy8gICAgICk7XG4gIC8vICAgfSk7XG4gIC8vLy8vLy8vLy9cbiAgLy8gQ2hhbmdlIGxhbmdcbiAgLy8gMSkgUmVuZGVyIGxhbmd1YWdlXG4gIGFzeW5jIGZ1bmN0aW9uIHJlbmRlckxhbmd1YWdlKGdldExhbmcpIHtcbiAgICAvLyAyKSBHZXQgZGF0YVxuICAgIGNvbnN0IGxvY2FsaXppdGlvbiA9IGF3YWl0ICQuZ2V0KGAuLi9sb2NhbGl6aXRpb24vJHtnZXRMYW5nfS5qc29uYCk7XG4gICAgLy8gMykgQ2hhbmdlIGxhbmd1YWdlXG4gICAgaWYgKGdldExhbmcgPT09IFwiYXJcIikge1xuICAgICAgJChcImh0bWxcIikuYXR0cih7IGRpcjogXCJydGxcIiwgbGFuZzogXCJhclwiIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICAkKFwiaHRtbFwiKS5hdHRyKHsgZGlyOiBcImx0clwiLCBsYW5nOiBcImVuXCIgfSk7XG4gICAgfVxuXG4gICAgLy8gTmF2YmFyIGxpbmtzXG4gICAgLy8gJChcIi5uYXZiYXItbmF2IGFcIikuZWFjaCgoaSwgY3VyKSA9PlxuICAgIC8vICAgJChjdXIpLnRleHQobG9jYWxpeml0aW9uLm5hdmJhclskKGN1cikuYXR0cihcImtleVwiKV0pXG4gICAgLy8gKTtcbiAgfVxuICAvLyAyKSBXaGVuIGNoYW5nZSBsYW5nXG4gICQoXCIuY2hhbmdlX2xhbmdcIikub24oXCJjaGFuZ2VcIiwgZnVuY3Rpb24gKCkge1xuICAgIC8vIDEpIEdldCBuZXcgdmFsdWUgZnJvbSBzZWxlY3QgZWxlbWVudFxuICAgIGxldCBnZXRMYW5nID0gJCh0aGlzKS52YWwoKTtcbiAgICAvLyAyKSBTZXQgbmV3IHZhbHVlIGluIGl0ZW1cbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcImxhbmd1YWdlXCIsIGdldExhbmcpO1xuICAgIC8vIDMpIFJlbG9hZCBwYWdlXG4gICAgbG9jYXRpb24ucmVsb2FkKCk7XG4gIH0pO1xuICAvLyBDaGFuZ2Ugc2VsZWN0IGxhbmdcbiAgZnVuY3Rpb24gY2hhbmdlU2VsZWN0TGFuZyhsYW5nKSB7XG4gICAgJChcIi5jaGFuZ2VfbGFuZyBvcHRpb25cIikuZWFjaCgoaSwgY3VyKSA9PiB7XG4gICAgICBpZiAoJChjdXIpLmF0dHIoXCJ2YWx1ZVwiKSA9PT0gbGFuZykge1xuICAgICAgICAkKGN1cikuYXR0cihcInNlbGVjdGVkXCIsIHRydWUpLnNpYmxpbmdzKCkucmVtb3ZlQXR0cihcInNlbGVjdGVkXCIpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG4gIC8vXG4gIGNvbnN0IGdldExhbmd1YWdlID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJsYW5ndWFnZVwiKTtcbiAgLy8gSWYgdGhlcmUgbG9jYWwgc3RvcmFnZSBpbiBzaXRlIHdpdGggbmFtZSBsYW5ndWFnZSB3aWxsIGJlIHJlbmRlciBsYW5ndWFnZSBzaXRlIHdpdGggaW4gdGhlIHNhbWUgbGFuZ3VhZ2UgaWYgbm90IHdpbGwgYmUgcmVuZGVyIGxhbmd1YWdlIHNpdGUgd2l0aCBzZWxlY3RlZCBsYW5nIGZyb20gc2VsZWN0IGJveFxuICBpZiAoZ2V0TGFuZ3VhZ2UgIT09IG51bGwpIHtcbiAgICBjaGFuZ2VTZWxlY3RMYW5nKGdldExhbmd1YWdlKTtcbiAgICByZW5kZXJMYW5ndWFnZShnZXRMYW5ndWFnZSk7XG4gIH0gZWxzZSB7XG4gICAgY29uc3QgZ2V0TGFuZyA9ICQoXCIuY2hhbmdlX2xhbmdcIikudmFsKCk7XG4gICAgcmVuZGVyTGFuZ3VhZ2UoZ2V0TGFuZyk7XG4gICAgY2hhbmdlU2VsZWN0TGFuZyhnZXRMYW5nKTtcbiAgfVxuXG4gIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbiAgLy8vLy8gU2VjdGlvbiBhYm91dCB1c1xuICAvLyBNb3JlIFBhcmFncmFwaFxuICAkKFwiLm1vcmVcIikub24oXCJjbGlja1wiLCBmdW5jdGlvbiAoZSkge1xuICAgIC8vIDEpIFByZXZlbnQgZGVmYXVsdCBhbmNob3JcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgLy8gMikgVG9nZ2xlIGNsYXNzIG1vcmUgb24gcGFyYWdyYXBoXG4gICAgJCh0aGlzKS5wYXJlbnQoKS5jaGlsZHJlbihcInBcIikudG9nZ2xlQ2xhc3MoXCJtb3JlXCIpO1xuICAgIC8vIDMpIENoZWNrIGlmIHBhcmdhcnBoIGhhcyBjbGFzcyBtb3JlIG9yIG5vdFxuICAgIGlmICgkKHRoaXMpLnBhcmVudCgpLmNoaWxkcmVuKFwicFwiKS5oYXNDbGFzcyhcIm1vcmVcIikpIHtcbiAgICAgICQoXCJodG1sXCIpLmF0dHIoXCJkaXJcIikgPT09IFwibHRyXCJcbiAgICAgICAgPyAkKHRoaXMpLnRleHQoXCJsZXNzXCIpXG4gICAgICAgIDogJCh0aGlzKS50ZXh0KFwi2KfZgtmEXCIpO1xuICAgIH0gZWxzZSB7XG4gICAgICAkKFwiaHRtbFwiKS5hdHRyKFwiZGlyXCIpID09PSBcImx0clwiXG4gICAgICAgID8gJCh0aGlzKS50ZXh0KFwidmlldyBtb3JlXCIpXG4gICAgICAgIDogJCh0aGlzKS50ZXh0KFwi2KfZhNmF2LLZitmA2YDZgNmA2K9cIik7XG4gICAgfVxuICB9KTtcblxuICAvLyBIZWFkZXIgc2xpZGVyXG4gICQoXCIub3VyLXByb2plY3RzX193cmFwcGVyXCIpLnNsaWNrKHtcbiAgICBsYXp5TG9hZDogXCJwcm9ncmVzc2l2ZVwiLFxuICAgIGluZmluaXRlOiBmYWxzZSxcbiAgICBzbGlkZXNUb1Nob3c6IDEsXG4gICAgc2xpZGVzVG9TY3JvbGw6IDEsXG4gICAgYXV0b3BsYXk6IHRydWUsXG4gICAgYXV0b3BsYXlTcGVlZDogMTAwMDAsXG4gICAgYXJyb3dzOiBmYWxzZSxcbiAgICBkb3RzOiB0cnVlLFxuICAgIGZhZGU6IHRydWUsXG4gICAgY3NzRWFzZTogXCJsaW5lYXJcIixcbiAgfSk7XG5cbiAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuICAvLy8vIFNlY3Rpb24gb3VyIHByb2plY3RzXG4gIC8vXG4gIGNvbnN0IGVsZW1lbnRTbGlkZXIgPSB7XG4gICAgd3JhcHBlcjogJChcIi5vdXItcHJvamVjdHNfX3dyYXBwZXJcIiksXG4gICAgaGVhZDogJChcIiNoZWFkXCIpLFxuICAgIHBhcjogJChcIiNwYXJcIiksXG4gIH07XG5cbiAgLy8gQXN5bmMgZnVuY3Rpb24gcmVuZGVyIGRhdGEgc2xpZGVyXG4gIGFzeW5jIGZ1bmN0aW9uIHJlbmRlckRhdGFTbGlkZXIodXJsKSB7XG4gICAgdHJ5IHtcbiAgICAgIC8vIDEpIEdldCBkYXRhIGZyb20gYXBpXG4gICAgICBjb25zdCBkYXRhU2xpZGVyID0gYXdhaXQgJC5nZXQodXJsKTtcblxuICAgICAgLy8gMikgRm9yIGVhY2ggYWxsXG4gICAgICBkYXRhU2xpZGVyLmZvckVhY2goKGN1ciwgaW5kZXgpID0+IHtcbiAgICAgICAgLy8gMSkgUmVuZGVyIGltZyB0YWcsIGFuZCBpbmNsdWRlIGRhdGFcbiAgICAgICAgY29uc3QgaW1hZ2UgPSBgPGltZyBzcmM9JHtjdXIuaW1nfSBjbGFzcz1cIm9iai1pbWFnZVwiIGFsdD0ke2N1ci5uYW1lfSAvPmA7XG4gICAgICAgIC8vIDIpIEFwcGVuZCBpbWFnZSBpbiBzbGlkZXJcbiAgICAgICAgZWxlbWVudFNsaWRlci53cmFwcGVyLnNsaWNrKFwic2xpY2tBZGRcIiwgaW1hZ2UpO1xuICAgICAgICAvLyAzKSBHZXQgaW5kZXggY29udGFpbnMgY2xhc3MgYWN0aXZlIGFuZCBnZXQgaXQgaW5kZXhcbiAgICAgICAgY29uc3QgaW5kZXhBY3RpdmVDbGFzcyA9ICQoXCIuc2xpY2stZG90cyBsaS5zbGljay1hY3RpdmVcIikuaW5kZXgoKTtcbiAgICAgICAgLy8gNCkgSWYgaW5kZXMgPT09IGluZGV4IGFjdGl2ZSBjbGFzcyAvIHdpbGwgYmUgcmVuZGVyIHBhcmFncmFwaCBmcm9tIHRoaXMgaW5kZXhcbiAgICAgICAgaWYgKGluZGV4ID09PSBpbmRleEFjdGl2ZUNsYXNzKSB7XG4gICAgICAgICAgZWxlbWVudFNsaWRlci5oZWFkLnRleHQoY3VyLm5hbWUpO1xuICAgICAgICAgIGVsZW1lbnRTbGlkZXIucGFyLnRleHQoY3VyLnBhcik7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICAvLyAzKSBHZXQgaWQgYWZ0ZXIgY2hhbmdlZFxuICAgICAgZWxlbWVudFNsaWRlci53cmFwcGVyLm9uKFwiYWZ0ZXJDaGFuZ2VcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgaW5kZXhDdXJyZW50U2xpZGUgPSAkKFwiLnNsaWNrLWN1cnJlbnRcIikuYXR0cihcImRhdGEtc2xpY2staW5kZXhcIik7XG4gICAgICAgIGVsZW1lbnRTbGlkZXIuaGVhZC50ZXh0KGRhdGFTbGlkZXJbaW5kZXhDdXJyZW50U2xpZGVdLm5hbWUpO1xuICAgICAgICBlbGVtZW50U2xpZGVyLnBhci50ZXh0KGRhdGFTbGlkZXJbaW5kZXhDdXJyZW50U2xpZGVdLnBhcik7XG4gICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGFsZXJ0KFwic29tZSBlcnJvciBwbGVhc2UgdHJ5IHJlbG9hZFwiKTtcbiAgICB9XG4gIH1cbiAgLy8gUnVuIGZuIHJlbmRlciBkYXRhIHNsaWRlclxuICByZW5kZXJEYXRhU2xpZGVyKFwiLi4vbG9jYWxpeml0aW9uL2FwaS5qc29uXCIpO1xuXG4gIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbiAgLy8vLyBTZWN0aW9uIG91ciBwYXJ0bmVyc1xuICAvLyAxKSBHZXQgY291bnQgaW1hZ2VzXG4gIGZ1bmN0aW9uIHNob3dBbmRIaWRkZW4odGltZXIpIHtcbiAgICBjb25zdCBjb3VudEltYWdlcyA9ICQoXCIjcGFydG5lcnNfX2ltYWdlXCIpLmNoaWxkcmVuKCkubGVuZ3RoO1xuICAgIGxldCBjb3VudCA9IDA7XG4gICAgLy9cbiAgICBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAvLyAxKSBDaGVjayBpZiBjb3VudCBlcXVhbCBjb3VudCBpbWFnZSBsZW5ndGggd2lsbCBiZSByZXR1cm4gY291bnQgPSAwXG4gICAgICBpZiAoY291bnQgPT09IGNvdW50SW1hZ2VzKSBjb3VudCA9IDA7XG5cbiAgICAgIC8vIDIpIEFkZCBjbGFzcyBhY3RpdmUgb24gcGFydG5lcnMgaW1hZ2VcbiAgICAgICQoXCIjcGFydG5lcnNfX2ltYWdlXCIpXG4gICAgICAgIC5jaGlsZHJlbigpXG4gICAgICAgIC5lcShjb3VudClcbiAgICAgICAgLmFkZENsYXNzKFwicGFydG5lcnNfX2FsbC1wYXJ0bmVyc19faW1hZ2UtLWFjdGl2ZVwiKTtcblxuICAgICAgLy8gMykgVHJpZ2dlciBzZXQgdGltZSBvdXQgYWZ0ZXIgMjkwMCB3aWxsIGJlIHJlbW92ZSBjbGFzcyBhY3RpdmVcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAkKFwiI3BhcnRuZXJzX19pbWFnZVwiKVxuICAgICAgICAgIC5jaGlsZHJlbigpXG4gICAgICAgICAgLmVxKGNvdW50IC0gMSlcbiAgICAgICAgICAucmVtb3ZlQ2xhc3MoXCJwYXJ0bmVyc19fYWxsLXBhcnRuZXJzX19pbWFnZS0tYWN0aXZlXCIpO1xuICAgICAgfSwgdGltZXIuc2V0VGltZU91dCk7XG5cbiAgICAgIC8vIDQpIEZpbmFseSBnZXQgdmFyaWFibGUgY291bnQsIGFuZCBpbmNyZW1lbnQgKz0gMVxuICAgICAgY291bnQrKztcbiAgICB9LCB0aW1lci5zZXRJbnRlcnZhbCk7XG4gIH1cblxuICAvLyBSdW4gZnVuY3Rpb24gU0hPV0FOREhJRERFTlxuICBpZiAoJChkb2N1bWVudCkub3V0ZXJXaWR0aCh0cnVlKSA+IDc2OCkge1xuICAgIC8vXG4gICAgc2hvd0FuZEhpZGRlbih7XG4gICAgICBzZXRUaW1lT3V0OiAyNDAwLFxuICAgICAgc2V0SW50ZXJ2YWw6IDI1MDAsXG4gICAgfSk7XG4gIH1cblxuICAvLyBGb290ZXJcbiAgJChcIiN5ZWFyXCIpLnRleHQobmV3IERhdGUoKS5nZXRGdWxsWWVhcigpKTtcbn0pO1xuIl19
