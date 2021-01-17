"use strict";jQuery(function(){$(".nav-link").on("click",function(e){var t;"home"!==$(this).attr("key")&&(e.preventDefault(),t=$(this).data("section"),$(this).parentsUntil("navbar-collapse").removeClass("show"),e=$("#"+t),0!==Object.keys(e).length?$("html, body").animate({scrollTop:e.offset().top-20},1e3):(localStorage.setItem("sectionName",t),location.assign("/")))});var e=localStorage.getItem("sectionName");"/"==location.pathname&&null!==e&&setTimeout(function(){$("html, body").animate({scrollTop:$("#"+e).offset().top-20},1e3,function(){localStorage.removeItem("sectionName")})},1e3);async function t(e){var a=await $.get("../localizition/"+e+".json");"ar"===e?$("html").attr({dir:"rtl",lang:"ar"}):$("html").attr({dir:"ltr",lang:"en"});e="/"==location.pathname?"home":location.pathname.replace(/([/]|.html)/g,"");document.title=a.title[e],$(".navbar-nav a").each(function(e,t){return $(t).text(a.navbar[$(t).attr("key")])}),$(".heading, .button, .par").each(function(e,t){$(t).text(a.pages[$(t).attr("key")][$(t).data("lang")])})}function a(a){$(".change_lang option").each(function(e,t){$(t).attr("value")===a&&$(t).attr("selected",!0).siblings().removeAttr("selected")})}$(".change_lang").on("change",function(){var e=$(this).val();localStorage.setItem("language",e),location.reload()});var s=localStorage.getItem("language");null!==s?(a(s),t(s)):(t(s=$(".change_lang").val()),a(s)),$(".more").on("click",function(e){e.preventDefault(),$(this).parent().children("p").toggleClass("more"),$(this).parent().children("p").hasClass("more")?"ltr"===$("html").attr("dir")?$(this).text("less"):$(this).text("شاهد اقل"):"ltr"===$("html").attr("dir")?$(this).text("view more"):$(this).text("شاهد المزيــــد")}),$(".our-projects__wrapper").slick({lazyLoad:"progressive",infinite:!1,slidesToShow:1,slidesToScroll:1,autoplay:!0,autoplaySpeed:1e4,arrows:!1,dots:!0,fade:!0,cssEase:"linear"}),$(".header-projects__wrapper").slick({lazyLoad:"progressive",infinite:!1,slidesToShow:1,slidesToScroll:1,autoplay:!0,autoplaySpeed:5e3,arrows:!0,prevArrow:"<svg class='a-left prev slick-prev'>\n    <use xlink:href=\"../icons/sprite.svg#icon-angle-left\">\n    </svg>",nextArrow:"<svg class='a-right next slick-next'>\n    <use xlink:href=\"../icons/sprite.svg#icon-angle-right\">\n    </svg>",responsive:[{breakpoint:793,settings:{arrows:!1}}]}),$(".other-projects__wrapper").slick({lazyLoad:"progressive",infinite:!1,slidesToShow:3,slidesToScroll:3,prevArrow:"<svg class='a-left prev slick-prev'>\n    <use xlink:href=\"../icons/sprite.svg#icon-angle-left\">\n    </svg>",nextArrow:"<svg class='a-right next slick-next'>\n    <use xlink:href=\"../icons/sprite.svg#icon-angle-right\">\n    </svg>",arrows:!0,responsive:[{breakpoint:793,settings:{slidesToShow:2,slidesToScroll:2,arrows:!1}},{breakpoint:600,settings:{slidesToShow:1,slidesToScroll:1,arrows:!1}}]});var r="https://sam-construction.com/sam/api/projects",o="https://sam-construction.com/sam/api/projects/",n="https://sam-construction.com/sam/api/pages/1",i="https://sam-construction.com/sam/api/partners",c="https://sam-construction.com/sam/api/settings",l="project_id",p="project_name",g="project_description",m="year",h="city",d="page_title",u="page_body";$.ajaxSetup({headers:{Accept:"application/json","Accept-Language":s}});var v,_,f,w,k,j,x,b={wrapper:$(".our-projects__wrapper"),name:$("#head"),description:$("#par"),btn:$("#viewMoreProject")};location.pathname.includes("project")&&(v={name:$("#projectName"),location:$("#projectLocation"),date:$("#projectDate"),description:$("#projectDesc"),wrapper1:$("#projectsWrapper"),wrapper2:$("#otherProjectsWrapper")},s=+localStorage.getItem("projectId")||1,$.get(""+o+s).done(function(e){var a=e.Data;v.name.text(a[p]),v.location.text(a[h]),v.date.text(a[m]),v.description.text(a[g]),$.each(a.project_slider,function(e,t){t="<img src="+t+' class="obj-image" alt='+a[p]+" />";v.wrapper1.slick("slickAdd",t)}),$.each(a.other_projects,function(e,t){t='\n            <div class="card-projects text-capitalize" key='+t[l]+'>\n                <div class="other-projects__wrapper__image">\n                    <img class="img-fluid obj-image" src='+t.image+" alt="+t[p]+' />\n                </div>\n                <h4 class="h-small weight-bold mt-2 mb-3">'+t[p]+'</h4>\n                <p class="m-0 mb-1">'+t[h]+'</p>\n                <p class="m-0">'+t[m]+"</p>\n            </div>\n        ";v.wrapper2.slick("slickAdd",t)})})),$(document).on("click",".card-projects",function(){var e=$(this).attr("key");localStorage.setItem("projectId",e),$("html, body").animate({scrollTop:0},500,function(){location.reload()})}),_=r,$.get(_).then(function(e){var a=e.Data;a.forEach(function(e,t){var a="<img src="+e.image+' class="obj-image" alt='+e[p]+" />";b.wrapper.slick("slickAdd",a),t==$(".slick-current").attr("data-slick-index")&&(b.name.text(e[p]),b.description.text(e[g]))});var s=$(".slick-dots li.slick-active").index();b.wrapper.on("afterChange",function(){var e=$(".slick-current").attr("data-slick-index");s=e,b.name.text(a[e][p]),b.description.text(a[e][g])}),b.btn.on("click",function(e){var t=a[s][l];localStorage.setItem("projectId",t)})}).catch(function(e){alert("some errors please try reload this page")}),f=n,w={title:$("#titleAboutUs"),description:$("#descAboutUs")},$.get(f).then(function(e){e=e.Data;w.title.text(e[d]),w.description.text(e[u])}),k=i,$.get(k).done(function(e){e=e.Data;$.each(e,function(e,t){t='\n          <div class="col-6 col-md-2 partners__all-partners__image py-3 overflow-hidden">\n              <img src='+t.image+" alt="+t.name+" />\n          </div>\n        ";$("#partners__image").append(t)})}),768<$(document).outerWidth(!0)&&(j={setTimeOut:2400,setInterval:2500},x=0,setInterval(function(){var e=$("#partners__image").children().length;x===e&&(x=0),$("#partners__image").children().eq(x).addClass("partners__all-partners__image--active"),setTimeout(function(){$("#partners__image").children().eq(x-1).removeClass("partners__all-partners__image--active")},j.setTimeOut),x++},j.setInterval)),$("#year").text((new Date).getFullYear()),$.get(c).done(function(e){e=e.Data;$("#whatsapp-number").attr("href","https://wa.me/"+e.telephone_number)}),$("#whatsapp").on("click",function(){$(".whatsapp__icon__whatsapp").toggleClass("hideIcon"),$(".whatsapp__icon__close").toggleClass("visibleIcon"),$(".whatsapp__title").toggleClass("moveDown"),$(".whatsapp__popup, .whatsapp__popup__chat__open").toggleClass("moveUp")})});