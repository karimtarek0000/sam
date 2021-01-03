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
  //   async function renderLanguage(getLang) {
  //     // 2) Get data
  //     const localizition = await $.get(`../localizition/${getLang}.json`);
  //     // 3) Change language
  //     if (getLang === "ar") {
  //       $("html").attr({ dir: "rtl", lang: "ar" });
  //     } else {
  //       $("html").attr({ dir: "ltr", lang: "en" });
  //     }
  //     // Form
  //     $("form")
  //       .find(`[key]`)
  //       .each(function (i, cur) {
  //         //
  //         if ($(cur).is("input, textarea")) {
  //           $(cur).attr(
  //             "placeholder",
  //             localizition.pages[$(this).attr("key")]["form"][
  //               $(this).data("lang")
  //             ]
  //           );
  //         }
  //         //
  //         if ($(cur).is("label, button")) {
  //           $(cur).text(
  //             localizition.pages[$(this).attr("key")]["form"][
  //               $(this).data("lang")
  //             ]
  //           );
  //         }
  //       });
  //     // Navbar links
  //     $(".navbar-nav a").each((i, cur) =>
  //       $(cur).text(localizition.navbar[$(cur).attr("key")])
  //     );
  //   }
  //   // 2) When change lang
  //   $(".change_lang").on("change", function () {
  //     // 1) Get new value from select element
  //     let getLang = $(this).val();
  //     // 2) Set new value in item
  //     localStorage.setItem("language", getLang);
  //     // 3) Reload page
  //     location.reload();
  //   });
  //   // Change select lang
  //   function changeSelectLang(lang) {
  //     $(".change_lang option").each((i, cur) => {
  //       if ($(cur).attr("value") === lang) {
  //         $(cur).attr("selected", true).siblings().removeAttr("selected");
  //       }
  //     });
  //   }
  //
  //   const getLanguage = localStorage.getItem("language");
  //   // If there local storage in site with name language will be render language site with in the same language if not will be render language site with selected lang from select box
  //   if (getLanguage !== null) {
  //     changeSelectLang(getLanguage);
  //     renderLanguage(getLanguage);
  //   } else {
  //     const getLang = $(".change_lang").val();
  //     renderLanguage(getLang);
  //     changeSelectLang(getLang);
  //   }
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOlsialF1ZXJ5Il0sIm1hcHBpbmdzIjoiOztBQUFBQSxPQUFPLFlBQVk7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDRCxDQTdIRDs7QUErSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsialF1ZXJ5KGZ1bmN0aW9uICgpIHtcbiAgLy8vLyBOYXZiYXJcbiAgLy8gICAkKFwiLm5hdi1saW5rXCIpLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuICAvLyAgICAgLy8gMSkgUmVtb3ZlIGNsYXNzIHNob3cgd2hlbiBjbGljayBsaW5rXG4gIC8vICAgICAkKHRoaXMpLnBhcmVudHNVbnRpbChcIm5hdmJhci1jb2xsYXBzZVwiKS5yZW1vdmVDbGFzcyhcInNob3dcIik7XG4gIC8vICAgfSk7XG4gIC8vIFNjcm9sbCBkb2N1bWVudFxuICAvLyAgICQoZG9jdW1lbnQpLm9uKFwic2Nyb2xsXCIsIGZ1bmN0aW9uICgpIHtcbiAgLy8gICAgIC8vXG4gIC8vICAgICAkKGRvY3VtZW50KS5zY3JvbGxUb3AoKSA+PSAxMDAwXG4gIC8vICAgICAgID8gJChcIiNzY3JvbGxVcFwiKS5hZGRDbGFzcyhcImZhZGVJblwiKVxuICAvLyAgICAgICA6ICQoXCIjc2Nyb2xsVXBcIikucmVtb3ZlQ2xhc3MoXCJmYWRlSW5cIik7XG4gIC8vICAgfSk7XG4gIC8vICAgLy8gU2Nyb2xsIHVwIGRvY3VtZW50XG4gIC8vICAgJChcIiNzY3JvbGxVcFwiKS5vbihcImNsaWNrXCIsICgpID0+IHtcbiAgLy8gICAgICQoXCJodG1sLCBib2R5XCIpLmFuaW1hdGUoXG4gIC8vICAgICAgIHtcbiAgLy8gICAgICAgICBzY3JvbGxUb3A6IDAsXG4gIC8vICAgICAgIH0sXG4gIC8vICAgICAgIDEwMDBcbiAgLy8gICAgICk7XG4gIC8vICAgfSk7XG4gIC8vLy8vLy8vLy9cbiAgLy8gQ2hhbmdlIGxhbmdcbiAgLy8gMSkgUmVuZGVyIGxhbmd1YWdlXG4gIC8vICAgYXN5bmMgZnVuY3Rpb24gcmVuZGVyTGFuZ3VhZ2UoZ2V0TGFuZykge1xuICAvLyAgICAgLy8gMikgR2V0IGRhdGFcbiAgLy8gICAgIGNvbnN0IGxvY2FsaXppdGlvbiA9IGF3YWl0ICQuZ2V0KGAuLi9sb2NhbGl6aXRpb24vJHtnZXRMYW5nfS5qc29uYCk7XG4gIC8vICAgICAvLyAzKSBDaGFuZ2UgbGFuZ3VhZ2VcbiAgLy8gICAgIGlmIChnZXRMYW5nID09PSBcImFyXCIpIHtcbiAgLy8gICAgICAgJChcImh0bWxcIikuYXR0cih7IGRpcjogXCJydGxcIiwgbGFuZzogXCJhclwiIH0pO1xuICAvLyAgICAgfSBlbHNlIHtcbiAgLy8gICAgICAgJChcImh0bWxcIikuYXR0cih7IGRpcjogXCJsdHJcIiwgbGFuZzogXCJlblwiIH0pO1xuICAvLyAgICAgfVxuICAvLyAgICAgLy8gRm9ybVxuICAvLyAgICAgJChcImZvcm1cIilcbiAgLy8gICAgICAgLmZpbmQoYFtrZXldYClcbiAgLy8gICAgICAgLmVhY2goZnVuY3Rpb24gKGksIGN1cikge1xuICAvLyAgICAgICAgIC8vXG4gIC8vICAgICAgICAgaWYgKCQoY3VyKS5pcyhcImlucHV0LCB0ZXh0YXJlYVwiKSkge1xuICAvLyAgICAgICAgICAgJChjdXIpLmF0dHIoXG4gIC8vICAgICAgICAgICAgIFwicGxhY2Vob2xkZXJcIixcbiAgLy8gICAgICAgICAgICAgbG9jYWxpeml0aW9uLnBhZ2VzWyQodGhpcykuYXR0cihcImtleVwiKV1bXCJmb3JtXCJdW1xuICAvLyAgICAgICAgICAgICAgICQodGhpcykuZGF0YShcImxhbmdcIilcbiAgLy8gICAgICAgICAgICAgXVxuICAvLyAgICAgICAgICAgKTtcbiAgLy8gICAgICAgICB9XG4gIC8vICAgICAgICAgLy9cbiAgLy8gICAgICAgICBpZiAoJChjdXIpLmlzKFwibGFiZWwsIGJ1dHRvblwiKSkge1xuICAvLyAgICAgICAgICAgJChjdXIpLnRleHQoXG4gIC8vICAgICAgICAgICAgIGxvY2FsaXppdGlvbi5wYWdlc1skKHRoaXMpLmF0dHIoXCJrZXlcIildW1wiZm9ybVwiXVtcbiAgLy8gICAgICAgICAgICAgICAkKHRoaXMpLmRhdGEoXCJsYW5nXCIpXG4gIC8vICAgICAgICAgICAgIF1cbiAgLy8gICAgICAgICAgICk7XG4gIC8vICAgICAgICAgfVxuICAvLyAgICAgICB9KTtcbiAgLy8gICAgIC8vIE5hdmJhciBsaW5rc1xuICAvLyAgICAgJChcIi5uYXZiYXItbmF2IGFcIikuZWFjaCgoaSwgY3VyKSA9PlxuICAvLyAgICAgICAkKGN1cikudGV4dChsb2NhbGl6aXRpb24ubmF2YmFyWyQoY3VyKS5hdHRyKFwia2V5XCIpXSlcbiAgLy8gICAgICk7XG4gIC8vICAgfVxuICAvLyAgIC8vIDIpIFdoZW4gY2hhbmdlIGxhbmdcbiAgLy8gICAkKFwiLmNoYW5nZV9sYW5nXCIpLm9uKFwiY2hhbmdlXCIsIGZ1bmN0aW9uICgpIHtcbiAgLy8gICAgIC8vIDEpIEdldCBuZXcgdmFsdWUgZnJvbSBzZWxlY3QgZWxlbWVudFxuICAvLyAgICAgbGV0IGdldExhbmcgPSAkKHRoaXMpLnZhbCgpO1xuICAvLyAgICAgLy8gMikgU2V0IG5ldyB2YWx1ZSBpbiBpdGVtXG4gIC8vICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcImxhbmd1YWdlXCIsIGdldExhbmcpO1xuICAvLyAgICAgLy8gMykgUmVsb2FkIHBhZ2VcbiAgLy8gICAgIGxvY2F0aW9uLnJlbG9hZCgpO1xuICAvLyAgIH0pO1xuICAvLyAgIC8vIENoYW5nZSBzZWxlY3QgbGFuZ1xuICAvLyAgIGZ1bmN0aW9uIGNoYW5nZVNlbGVjdExhbmcobGFuZykge1xuICAvLyAgICAgJChcIi5jaGFuZ2VfbGFuZyBvcHRpb25cIikuZWFjaCgoaSwgY3VyKSA9PiB7XG4gIC8vICAgICAgIGlmICgkKGN1cikuYXR0cihcInZhbHVlXCIpID09PSBsYW5nKSB7XG4gIC8vICAgICAgICAgJChjdXIpLmF0dHIoXCJzZWxlY3RlZFwiLCB0cnVlKS5zaWJsaW5ncygpLnJlbW92ZUF0dHIoXCJzZWxlY3RlZFwiKTtcbiAgLy8gICAgICAgfVxuICAvLyAgICAgfSk7XG4gIC8vICAgfVxuICAvL1xuICAvLyAgIGNvbnN0IGdldExhbmd1YWdlID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJsYW5ndWFnZVwiKTtcbiAgLy8gICAvLyBJZiB0aGVyZSBsb2NhbCBzdG9yYWdlIGluIHNpdGUgd2l0aCBuYW1lIGxhbmd1YWdlIHdpbGwgYmUgcmVuZGVyIGxhbmd1YWdlIHNpdGUgd2l0aCBpbiB0aGUgc2FtZSBsYW5ndWFnZSBpZiBub3Qgd2lsbCBiZSByZW5kZXIgbGFuZ3VhZ2Ugc2l0ZSB3aXRoIHNlbGVjdGVkIGxhbmcgZnJvbSBzZWxlY3QgYm94XG4gIC8vICAgaWYgKGdldExhbmd1YWdlICE9PSBudWxsKSB7XG4gIC8vICAgICBjaGFuZ2VTZWxlY3RMYW5nKGdldExhbmd1YWdlKTtcbiAgLy8gICAgIHJlbmRlckxhbmd1YWdlKGdldExhbmd1YWdlKTtcbiAgLy8gICB9IGVsc2Uge1xuICAvLyAgICAgY29uc3QgZ2V0TGFuZyA9ICQoXCIuY2hhbmdlX2xhbmdcIikudmFsKCk7XG4gIC8vICAgICByZW5kZXJMYW5ndWFnZShnZXRMYW5nKTtcbiAgLy8gICAgIGNoYW5nZVNlbGVjdExhbmcoZ2V0TGFuZyk7XG4gIC8vICAgfVxuICAvLyBDaGFuZ2UgZGlyIHNsaWRlclxuICAvLyAgICQoXCIuc2xpY2stc2xpZGVyXCIpLmFkZENsYXNzKFwiZGlyZWN0aW9uLWx0clwiKTtcbiAgLy9cbiAgLy8gICAkKFwiZm9vdGVyICNkYXRlXCIpLnRleHQobmV3IERhdGUoKS5nZXRGdWxsWWVhcigpKTtcbiAgLy8gTGF6eSBsb2FkaW5nIGltYWdlXG4gIC8vIEFsbCBpbWFnZXNcbiAgLy8gICBjb25zdCBhbGxJbWFnZXMgPSAkKFwiW2RhdGEtc3JjXVwiKTtcbiAgLy8gUHJlbG9hZCBpbWFnZVxuICAvLyAgIGZ1bmN0aW9uIHByZWxvYWRJbWFnZXMoaW1nKSB7XG4gIC8vICAgICBjb25zdCBzcmMgPSAkKGltZykuZGF0YShcInNyY1wiKTtcbiAgLy8gICAgIGlmICghc3JjKSByZXR1cm47XG4gIC8vICAgICBpbWcuc3JjID0gc3JjO1xuICAvLyAgICAgJChpbWcpLnJlbW92ZUF0dHIoXCJkYXRhLXNyY1wiKTtcbiAgLy8gICB9XG4gIC8vICAgLy9cbiAgLy8gICBjb25zdCBJbWFnZU9iU2VydmVyID0gbmV3IEludGVyc2VjdGlvbk9ic2VydmVyKFxuICAvLyAgICAgKGVudHJpZXMsIEltYWdlT2JTZXJ2ZXIpID0+IHtcbiAgLy8gICAgICAgJChlbnRyaWVzKS5lYWNoKChpLCBjdXIpID0+IHtcbiAgLy8gICAgICAgICBpZiAoIWN1ci5pc0ludGVyc2VjdGluZykge1xuICAvLyAgICAgICAgICAgY3VyLnRhcmdldC5jbGFzc0xpc3QuYWRkKFwiZmFkZU91dFwiKTtcbiAgLy8gICAgICAgICAgIHJldHVybjtcbiAgLy8gICAgICAgICB9IGVsc2Uge1xuICAvLyAgICAgICAgICAgLy9cbiAgLy8gICAgICAgICAgIHByZWxvYWRJbWFnZXMoY3VyLnRhcmdldCk7XG4gIC8vICAgICAgICAgICBjdXIudGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoXCJmYWRlT3V0XCIpO1xuICAvLyAgICAgICAgICAgY3VyLnRhcmdldC5jbGFzc0xpc3QuYWRkKFwiZmFkZUluXCIpO1xuICAvLyAgICAgICAgICAgSW1hZ2VPYlNlcnZlci51bm9ic2VydmUoY3VyLnRhcmdldCk7XG4gIC8vICAgICAgICAgfVxuICAvLyAgICAgICB9KTtcbiAgLy8gICAgIH0sXG4gIC8vICAgICB7XG4gIC8vICAgICAgIHRocmVzaG9sZDogMCxcbiAgLy8gICAgIH1cbiAgLy8gICApO1xuICAvLyAgIC8vXG4gIC8vICAgYWxsSW1hZ2VzLmVhY2goKGksIGN1cikgPT4gSW1hZ2VPYlNlcnZlci5vYnNlcnZlKGN1cikpO1xufSk7XG5cbi8vIEhlYWRlciBzbGlkZXJcbi8vICQoXCIuaGVhZGVyX19zbGlkZXIsIC50ZXN0aW1vbmlhbFwiKS5zbGljayh7XG4vLyAgIGluZmluaXRlOiBmYWxzZSxcbi8vICAgc2xpZGVzVG9TaG93OiAxLFxuLy8gICBzbGlkZXNUb1Njcm9sbDogMSxcbi8vICAgYXV0b3BsYXk6IHRydWUsXG4vLyAgIGF1dG9wbGF5U3BlZWQ6IDUwMDAsXG4vLyAgIGFycm93czogdHJ1ZSxcbi8vICAgcHJldkFycm93OiBgPHN2ZyBjbGFzcz0nYS1sZWZ0IGNvbnRyb2wtYyBwcmV2IHNsaWNrLXByZXYnPlxuLy8gICAgIDx1c2UgeGxpbms6aHJlZj1cIi4uL2ljb25zL3Nwcml0ZS5zdmcjaWNvbi1BbmdsZS1MZWZ0XCI+XG4vLyAgICAgPC9zdmc+YCxcbi8vICAgbmV4dEFycm93OiBgPHN2ZyBjbGFzcz0nYS1yaWdodCBjb250cm9sLWMgbmV4dCBzbGljay1uZXh0Jz5cbi8vICAgICA8dXNlIHhsaW5rOmhyZWY9XCIuLi9pY29ucy9zcHJpdGUuc3ZnI2ljb24tQW5nbGUtUmlnaHRcIj5cbi8vICAgICA8L3N2Zz5gLFxuLy8gICByZXNwb25zaXZlOiBbXG4vLyAgICAge1xuLy8gICAgICAgYnJlYWtwb2ludDogNjAwLFxuLy8gICAgICAgc2V0dGluZ3M6IHtcbi8vICAgICAgICAgc2xpZGVzVG9TaG93OiAxLFxuLy8gICAgICAgICBzbGlkZXNUb1Njcm9sbDogMSxcbi8vICAgICAgICAgZG90czogZmFsc2UsXG4vLyAgICAgICAgIGFycm93czogZmFsc2UsXG4vLyAgICAgICB9LFxuLy8gICAgIH0sXG4vLyAgIF0sXG4vLyB9KTtcbiJdfQ==
