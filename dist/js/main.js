"use strict";jQuery(function(){$(".nav-link").on("click",function(e){e.preventDefault();e=$(this).data("section");$(this).parentsUntil("navbar-collapse").removeClass("show"),$("html, body").animate({scrollTop:$("#"+e).offset().top-20},1e3)});async function e(e){await $.get("../localizition/"+e+".json");"ar"===e?$("html").attr({dir:"rtl",lang:"ar"}):$("html").attr({dir:"ltr",lang:"en"})}function t(a){$(".change_lang option").each(function(e,t){$(t).attr("value")===a&&$(t).attr("selected",!0).siblings().removeAttr("selected")})}$(".change_lang").on("change",function(){var e=$(this).val();localStorage.setItem("language",e),location.reload()});var a=localStorage.getItem("language");null!==a?(t(a),e(a)):(e(r=$(".change_lang").val()),t(r)),$(".more").on("click",function(e){e.preventDefault(),$(this).parent().children("p").toggleClass("more"),$(this).parent().children("p").hasClass("more")?"ltr"===$("html").attr("dir")?$(this).text("less"):$(this).text("اقل"):"ltr"===$("html").attr("dir")?$(this).text("view more"):$(this).text("المزيــــد")}),$(".our-projects__wrapper").slick({lazyLoad:"progressive",infinite:!1,slidesToShow:1,slidesToScroll:1,autoplay:!0,autoplaySpeed:1e4,arrows:!1,dots:!0,fade:!0,cssEase:"linear"}),$(".header-projects__wrapper").slick({lazyLoad:"progressive",infinite:!1,slidesToShow:1,slidesToScroll:1,autoplay:!0,autoplaySpeed:5e3,arrows:!0,prevArrow:"<svg class='a-left prev slick-prev'>\n    <use xlink:href=\"../icons/sprite.svg#icon-angle-left\">\n    </svg>",nextArrow:"<svg class='a-right next slick-next'>\n    <use xlink:href=\"../icons/sprite.svg#icon-angle-right\">\n    </svg>",responsive:[{breakpoint:793,settings:{arrows:!1}}]});var r,i,n,s,l={wrapper:$(".our-projects__wrapper"),head:$("#head"),par:$("#par"),btn:$("#viewMoreProject")};!async function(e){try{var a=await $.get(e);a.forEach(function(e,t){var a="<img src="+e.img+' class="obj-image" alt='+e.name+" />";l.wrapper.slick("slickAdd",a),t===$(".slick-dots li.slick-active").index()&&(l.head.text(e.name),l.par.text(e.description))});var r=$(".slick-dots li.slick-active").index();l.wrapper.on("afterChange",function(){var e=$(".slick-current").attr("data-slick-index");r=e,l.head.text(a[e].name),l.par.text(a[e].description)}),l.btn.on("click",function(e){var t=JSON.stringify(a[r]);localStorage.setItem("project",t)})}catch(e){alert("some error please try reload")}}("../localizition/api.json"),location.pathname.includes("project")&&(a={name:$("#projectName"),location:$("#projectLocation"),date:$("#projectDate"),description:$("#projectDesc")},null!==(r=JSON.parse(localStorage.getItem("project")))&&(a.name.text(r.name),a.location.text(r.city),a.date.text(r.date),a.description.text(r.description))),768<$(document).outerWidth(!0)&&(i={setTimeOut:2400,setInterval:2500},n=$("#partners__image").children().length,s=0,setInterval(function(){s===n&&(s=0),$("#partners__image").children().eq(s).addClass("partners__all-partners__image--active"),setTimeout(function(){$("#partners__image").children().eq(s-1).removeClass("partners__all-partners__image--active")},i.setTimeOut),s++},i.setInterval)),$("#year").text((new Date).getFullYear())});