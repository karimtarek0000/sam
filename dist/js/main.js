"use strict";jQuery(function(){$(".nav-link").on("click",function(e){var t;"home"!==$(this).attr("key")&&(e.preventDefault(),t=$(this).data("section"),$(this).parentsUntil("navbar-collapse").removeClass("show"),e=$("#"+t),0!==Object.keys(e).length?$("html, body").animate({scrollTop:e.offset().top-20},1e3):(localStorage.setItem("sectionName",t),location.assign("/")))});var e=localStorage.getItem("sectionName");"/"==location.pathname&&null!==e&&$("html, body").animate({scrollTop:$("#"+e).offset().top-20},1e3,function(){localStorage.removeItem("sectionName")});async function t(e){await $.get("../localizition/"+e+".json");"ar"===e?$("html").attr({dir:"rtl",lang:"ar"}):$("html").attr({dir:"ltr",lang:"en"})}function a(a){$(".change_lang option").each(function(e,t){$(t).attr("value")===a&&$(t).attr("selected",!0).siblings().removeAttr("selected")})}$(".change_lang").on("change",function(){var e=$(this).val();localStorage.setItem("language",e),location.reload()});e=localStorage.getItem("language");null!==e?(a(e),t(e)):(t(e=$(".change_lang").val()),a(e)),$(".more").on("click",function(e){e.preventDefault(),$(this).parent().children("p").toggleClass("more"),$(this).parent().children("p").hasClass("more")?"ltr"===$("html").attr("dir")?$(this).text("less"):$(this).text("اقل"):"ltr"===$("html").attr("dir")?$(this).text("view more"):$(this).text("المزيــــد")}),$(".our-projects__wrapper").slick({lazyLoad:"progressive",infinite:!1,slidesToShow:1,slidesToScroll:1,autoplay:!0,autoplaySpeed:1e4,arrows:!1,dots:!0,fade:!0,cssEase:"linear"}),$(".header-projects__wrapper").slick({lazyLoad:"progressive",infinite:!1,slidesToShow:1,slidesToScroll:1,autoplay:!0,autoplaySpeed:5e3,arrows:!0,prevArrow:"<svg class='a-left prev slick-prev'>\n    <use xlink:href=\"../icons/sprite.svg#icon-angle-left\">\n    </svg>",nextArrow:"<svg class='a-right next slick-next'>\n    <use xlink:href=\"../icons/sprite.svg#icon-angle-right\">\n    </svg>",responsive:[{breakpoint:793,settings:{arrows:!1}}]}),$(".other-projects__wrapper").slick({lazyLoad:"progressive",infinite:!1,slidesToShow:3,slidesToScroll:3,prevArrow:"<svg class='a-left prev slick-prev'>\n    <use xlink:href=\"../icons/sprite.svg#icon-angle-left\">\n    </svg>",nextArrow:"<svg class='a-right next slick-next'>\n    <use xlink:href=\"../icons/sprite.svg#icon-angle-right\">\n    </svg>",arrows:!0,responsive:[{breakpoint:793,settings:{slidesToShow:2,slidesToScroll:2,arrows:!1}},{breakpoint:600,settings:{slidesToShow:1,slidesToScroll:1,arrows:!1}}]});var r,s,i,o,n,e="../api/"+e+".json",l={wrapper:$(".our-projects__wrapper"),head:$("#head"),par:$("#par"),btn:$("#viewMoreProject")};!async function(e){try{var a=await $.get(e);a.forEach(function(e,t){var a="<img src="+e.img[0]+' class="obj-image" alt='+e.name+" />";l.wrapper.slick("slickAdd",a),t===$(".slick-dots li.slick-active").index()&&(l.head.text(e.name),l.par.text(e.description))});var r=$(".slick-dots li.slick-active").index();l.wrapper.on("afterChange",function(){var e=$(".slick-current").attr("data-slick-index");r=e,l.head.text(a[e].name),l.par.text(a[e].description)}),l.btn.on("click",function(e){var t=a[r].id;localStorage.setItem("projectId",t)})}catch(e){alert("some error please try reload")}}(e),location.pathname.includes("project")&&(r={name:$("#projectName"),location:$("#projectLocation"),date:$("#projectDate"),description:$("#projectDesc"),wrapper1:$("#projectsWrapper"),wrapper2:$("#otherProjectsWrapper")},null!==(s=+localStorage.getItem("projectId")||1)&&$.get(e).done(function(e){$.each(e,function(e,a){var t;a.id===s?(r.name.text(a.name),r.location.text(a.city),r.date.text(a.date),r.description.text(a.description),$.each(a.img,function(e,t){t="<img src="+t+' class="obj-image" alt='+a.name+" />";r.wrapper1.slick("slickAdd",t)})):(t='\n                <div class="card-projects text-capitalize" key='+a.id+'>\n                    <div class="other-projects__wrapper__image">\n                        <img class="img-fluid obj-image" src='+a.img[0]+" alt="+a.name+' />\n                    </div>\n                    \n                    <h4 class="h-small weight-bold mt-2 mb-3">'+a.name+'</h4>\n                    <p class="m-0 mb-1">'+a.city+'</p>\n                    <p class="m-0">'+a.date+"</p>\n                </div>\n            ",r.wrapper2.slick("slickAdd",t))})})),$(document).on("click",".card-projects",function(){var e=$(this).attr("key");localStorage.setItem("projectId",e),$("html, body").animate({scrollTop:0},500,function(){location.reload()})}),768<$(document).outerWidth(!0)&&(i={setTimeOut:2400,setInterval:2500},o=$("#partners__image").children().length,n=0,setInterval(function(){n===o&&(n=0),$("#partners__image").children().eq(n).addClass("partners__all-partners__image--active"),setTimeout(function(){$("#partners__image").children().eq(n-1).removeClass("partners__all-partners__image--active")},i.setTimeOut),n++},i.setInterval)),$("#year").text((new Date).getFullYear())});