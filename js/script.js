var app = app || {};
var windowSize = $(window).width();
var heightSize = $(window).height();
let scrollTop,
  scrollLeft = 0;
var windowSize = $(window).width();
app.init = function () {
  try {
  
    app.showMenu();
    app.anchorLink();
    app.initData();
    app.mvvideo();
    app.videoControl();
    app.mvvideo2();
    app.showPopup();
    app.bgPartner();
    app.getFulltVideo();
    app.evenScroll();

    if (windowSize > 767) {
      app.scrollSmooth();
      app.paralaxScroll();
      app.scrollFeature();
    }
    app.loadData();
    // $("#ex1").modal({
    //   fadeDuration: 0,
    //   fadeDelay: 0,
    // });

  } catch (error) {
    alert(error);
  }
};
$(window).on("load", function () {});

app.showPopup = function () {
  function stopVideo() {
    const iframe = document.getElementById("popup-video");
    iframe.contentWindow.postMessage(
      '{"event":"command","func":"stopVideo","args":""}',
      "*"
    );
  }
  $(".js-open-popup").on("click", function () {
    $(".popup").fadeIn();
  });

  $(".popup-close, .popup-overlay").on("click", function () {
    stopVideo();
    $(".popup").fadeOut();
  });
};

app.getFulltVideo = function () {
  $(".js-full-video").each(function () {
    let ele = $(this);
    let widthEle = ele.width();
    let heightEle = ele.height();
    let ratioEle = widthEle / heightEle;
    let ratioEle2 = heightEle / widthEle;
    var iframe = $(this).find("iframe")[0];
    var player = new Vimeo.Player(iframe);

    player.on("loaded", function () {
      var videoWidth, videoHeight;

      player
        .getVideoWidth()
        .then(function (width) {
          videoWidth = width;
          return player.getVideoHeight();
        })
        .then(function (height) {
          videoHeight = height;
          var ratio = videoWidth / videoHeight;
          var ratio2 = videoHeight / videoWidth;
          if (ratioEle - ratio < 0) {
            widthEle = widthEle * (ratioEle2 / ratio2) + 2;
          } else {
            heightEle = heightEle * (ratio2 / ratioEle2) + 2;
          }

          $(iframe).width(widthEle);
          $(iframe).height(heightEle);
        })
        .catch(function (error) {
          console.error("Error getting video dimensions:", error);
        });
    });
  });
};

app.loadData = function () {
  const RANDOM = (min, max) =>
    Math.floor(Math.random() * (max - min + 1) + min);
  const PARTICLES = document.querySelectorAll(".particle");
  PARTICLES.forEach((P) => {
    P.setAttribute(
      "style",
      `
		--x: ${RANDOM(20, 80)};
		--y: ${RANDOM(20, 80)};
		--duration: ${RANDOM(6, 20)};
		--delay: ${RANDOM(1, 10)};
		--alpha: ${RANDOM(40, 90) / 100};
		--origin-x: ${Math.random() > 0.5 ? RANDOM(300, 800) * -1 : RANDOM(300, 800)}%;
		--origin-y: ${Math.random() > 0.5 ? RANDOM(300, 800) * -1 : RANDOM(300, 800)}%;
		--size: ${RANDOM(40, 90) / 100};
	`
    );
  });
  var settings = {
    url: "https://devapi.stabilityworld.ai/api/app/common/stats",
    method: "GET",
  };
  var leader = {
    url: "https://devapi.stabilityworld.ai/api/app/common/top-creators",
    method: "GET",
  };
  $.ajax(leader).done(function (response) {
    const data = response.data;

    const creatorList = $(".creator-list");
    data.slice(0, 6).forEach(function (creator) {
      let img = creator.User.avatar_url;
      if (!creator.User.avatar_url) {
        img =
          "https://app.stabilityworld.ai/assets/images/user_default_avatar.png";
      } else {
        img = "https://devapi.stabilityworld.ai" + creator.User.avatar_url;
      }
      const creatorItem = `
			<div class="creator-list__item wow fadeUp">
			<div class="creator-list__box_image">
      <img class="creator-list__image" src=${img} alt="avatar"></div>
				</img>
				<div class="creator-list__body">
					<p class="creator-list__ttl">${creator.User.code}</p>
					<p class="creator-list__number">${Number(creator.point_archieved).toFixed(
            0
          )} point</p>
				</div>
			</div>
		`;
      creatorList.append(creatorItem);
    });
  });
  $.ajax(settings).done(function (response) {
    const data = response.data;
    $("#number_user").attr("data-number", data.testnet_users_joined + "");
    $("#number_image").attr("data-number", data.ai_artwork_created + "");
    $("#number_credit").attr("data-number", data.credits_claimed + "");
    $("#number_loyalty").attr("data-number", data.loyalty_pointed_earned + "");

    $("#text_to_image").text(data.text_to_image + " " + "image generated");
    // $("#architect").text(data.architect + " " + "image generated");
    $("#architect2").text(data.architect + " " + "image generated");
    $("#text_to_video").text(data.text_to_video + " " + "video generated");
    $("#text_to_video2").text(data.text_to_video + " " + "video generated");
    $("#image_face_swap").text(data.faceswap + " " + "image generated");
    $("#image_to_image").text(data.image_to_image + " " + "image generated");

    $("#video_face_swap").text(data.reface_video + " " + "video generated");
    $("#image_to_video").text(data.image_to_video + " " + "video generated");
    $("#video_to_video").text(data.video_to_video + " " + "video generated");
    // $("#reface_video").text(data.reface_video + " " + "video generated");
    $("#reface_video2").text(data.reface_video + " " + "video generated");

    app.featureslider();
    app.countNumber();
  });
};

app.scrollSmooth = function () {
  const lenis = new Lenis({
    smooth: true,
    easing: (t) => t,
  });
  lenis.on("scroll", (e) => {});
  function raf(time) {
    lenis.raf(time * 0.5);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);
};
app.paralaxScroll = function () {
  $(window).on("scroll", function () {
    app.scrol01();
    // app.scroll02();
    app.scrol03();
    app.scrolTtl();
    app.scrolttlFeature();
    app.scrolTtlFade();
  });
  app.scrolttlFeature = function () {
    const scrollTop = $(window).scrollTop();
    const windowHeight = $(window).height();
    const eleTop = $(".feature-ttl").offset().top;
    const eleWidth = $(".feature-ttl span").outerWidth();
    const eleHeight = $(".feature-ttl span").outerHeight();
    const overlayDistanceFromBottom =
      scrollTop + windowHeight - eleTop - eleHeight;
    const offsetX = Math.min(
      eleWidth,
      Math.max(0, (overlayDistanceFromBottom / (windowHeight / 1.5)) * eleWidth)
    );
    gsap.to(".feature-ttl .item", {
      css: { "background-position-x": `-${offsetX}px` },
      duration: 0,
    });
  };
  app.scrolTtl = function () {
    const scrollTop = $(window).scrollTop();
    const windowHeight = $(window).height();
    const eleTop = $(".js-bg").offset().top;
    const eleWidth = $(".js-bg .highlight").outerWidth();
    const overlayDistanceFromBottom = scrollTop + windowHeight - eleTop;
    const offsetX = Math.min(
      eleWidth,
      Math.max(0, (overlayDistanceFromBottom / (windowHeight / 1.5)) * eleWidth)
    );
    gsap.to(".js-bg .sec-ttl__bg", { width: offsetX, duration: 0 });
  };
  app.scrolTtlFade = function () {
    const applyScrollEffect = function (selector) {
      $(selector).each(function () {
        const $this = $(this);
        const scrollTop = $(window).scrollTop();
        const windowHeight = $(window).height();
        const eleTop = $this.offset().top;
        const eleHeight = $this.outerHeight();
        const maxScrollDistance = windowHeight / 3;
        const overlayOpacity = Math.max(
          0,
          Math.min(1, (scrollTop + windowHeight - eleTop) / maxScrollDistance)
        );
        const overlayDistanceFromBottom =
          scrollTop + windowHeight + eleHeight - eleTop;
        const scrollProgress = Math.min(
          1,
          overlayDistanceFromBottom / maxScrollDistance
        );
        const offsetY = Math.min(
          0,
          Math.max(-100, -100 + 100 * scrollProgress)
        );
        gsap.to($this, {
          y: offsetY,
          opacity: overlayOpacity,
          duration: 0.1,
        });
      });
    };
    applyScrollEffect(".js-ttl");
    applyScrollEffect(".js-ttl2");
    applyScrollEffect(".js-ttl3");
  };
  app.scrol01 = function () {
    if ($(".section-zoomIn ").length) {
      const scrollTop = $(window).scrollTop();
      const windowHeight = $(window).height();
      const zoomTop = $(".section-zoomIn").offset().top;
      const zoomHeight = $(".section-zoomIn").outerHeight();
      const overlayDistanceFromBottom =
        scrollTop - zoomTop - zoomHeight + windowHeight;
      const offsetY = Math.max(
        0,
        Math.min(200, 200 * (overlayDistanceFromBottom / windowHeight))
      );
      const scale = Math.max(
        0.9,
        Math.min(1, 1 - (overlayDistanceFromBottom / zoomHeight) * 0.2)
      );
      let overlayOpacity = Math.max(0, Math.min(1, scrollTop / windowHeight));
      gsap.to(".section-zoomIn .section-zoomIn__item", {
        scale: scale,
        duration: 0.1,
      });
      gsap.to(".section-zoomIn", { y: offsetY, duration: 0.1 });
      gsap.to(".section-zoomIn .p-overlay", {
        opacity: overlayOpacity,
        duration: 0.5,
      });
    }
  };
  app.scroll02 = function () {
    const scrollTop = $(window).scrollTop();
    const windowHeight = $(window).height();
    const eleTop = $(".js-scroll-left").offset().top;
    const eleHeight = $(".js-scroll-left").outerHeight();
    const overlayDistanceFromBottom =
      scrollTop + windowHeight - eleTop - eleHeight * 2;
    const offsetX = Math.min(
      0,
      Math.min(0, 500 * (overlayDistanceFromBottom / windowHeight))
    );

    gsap.to(".js-scroll-left", { x: offsetX, duration: 0.1 });
    gsap.to(".js-scroll-right", { x: -offsetX, duration: 0.1 });
  };
  app.scrol03 = function () {
    if ($(".section-zoom .section-zoom__item").length) {
      const scrollTop = $(window).scrollTop();
      const windowHeight = $(window).height();
      const zoomTop = $(".section-zoom .section-zoom__item").offset().top;
      const zoomHeight = $(".section-zoom .section-zoom__item").outerHeight();
      const overlayDistanceFromBottom =
        scrollTop - zoomTop + windowHeight - zoomHeight / 3;
      const initialScale = 0.3;
      const finalScale = 1;
      let scale;
      let radius;
      if (overlayDistanceFromBottom <= 0) {
        scale = initialScale;
        radius = 350;
      } else {
        const maxScrollDistance = windowHeight / 2;
        const scrollProgress = Math.min(
          1,
          overlayDistanceFromBottom / maxScrollDistance
        );
        scale = initialScale + (finalScale - initialScale) * scrollProgress;
        radius = 350 - 349 * scrollProgress;
      }
      scale = Math.max(initialScale, Math.min(finalScale, scale));
      radius = Math.max(1, Math.min(350, radius));
      gsap.to(".section-zoom .section-zoom__item", {
        scale: scale,
        borderRadius: `${radius}px`,
        duration: 0.1,
      });
    }
  };
};
app.scrollFeature = function () {
  const featureItems = gsap.utils.toArray(".feature-slider__wrap");
  const windowHeight = $(window).height();
  const heightWrap = $(".feature-slider__wrap").height();
  const triggerSelector = ".feature";
  const offsetScroll = heightWrap + 160 > windowHeight ? 200 : 50;

  const scrollTween = gsap.to(featureItems, {
    xPercent: -100 * (featureItems.length - 1),
    ease: "none",
    scrollTrigger: {
      trigger: triggerSelector,
      pin: true,
      scrub: 0.1,
      // markers: true,
      start: `top -=${offsetScroll} top`,
      end: "bottom",
      id: "horizontalScroll",
    },
  });

  featureItems.forEach((section, i) => {
    ScrollTrigger.create({
      trigger: section,
      start: "left 50%",
      end: "right 50%",
      containerAnimation: scrollTween,
      // markers: true,
    });
  });
};

app.bgPartner = function () {
  let container = $(".partner-bg");
  for (let i = 1; i <= 100; i++) {
    let circleContainer = $("<div></div>").addClass("circle-container");
    let circle = $("<div></div>").addClass("circle");
    circleContainer.append(circle);
    container.append(circleContainer);
  }
};
app.countNumber = function () {
  $(window).on("scroll", function () {
    let scrollTop = $(this).scrollTop();

    $(".js-number-list .number").each(function () {
      let numberElement = $(this);
      let targetValue = parseFloat(
        numberElement.attr("data-number").replace(",", "")
      );
      if ((targetValue < 1000) & (targetValue > 99)) {
        targetValue = parseFloat(
          numberElement.attr("data-number").replace(",", ".")
        );
      }
      if (
        scrollTop >= numberElement.offset().top - $(window).height() &&
        !numberElement.data("counting") &&
        !numberElement.data("counted")
      ) {
        numberElement.data("counting", true);
        let duration = 3000;
        let startTime = null;
        if (targetValue <= 1000) {
          duration = 3000;
        }
        function animateNumber(timestamp) {
          if (!startTime) startTime = timestamp;
          let progress = timestamp - startTime;

          let increment = (targetValue / duration) * progress;
          if (increment >= targetValue) increment = targetValue;

          let formattedNumber;
          if (Number.isInteger(targetValue)) {
            formattedNumber = Math.floor(increment).toLocaleString("de-DE");
          } else {
            formattedNumber = increment.toLocaleString("de-DE", {
              minimumFractionDigits: 1,
              maximumFractionDigits: 1,
            });
          }

          numberElement.text(formattedNumber.replace(".", ","));
          if (progress < duration) {
            requestAnimationFrame(animateNumber);
          } else {
            numberElement.data("counted", true);
            numberElement.data("counting", false);
          }
        }
        setTimeout(function () {
          requestAnimationFrame(animateNumber);
        }, 1600);
      }
    });
  });
};
app.evenScroll = function () {
  let scrollText = $(".running-txt");
  let lastScrollTop = scrollText.offset().top - $(window).height();
  $(window).on("scroll", function () {
    let scrollTop = $(this).scrollTop();
    if (
      scrollTop >= lastScrollTop - 100 &&
      scrollTop <= lastScrollTop + $(window).height() + 100
    ) {
      scrollText.css(
        "transform",
        "translateX(" +
          (scrollTop - lastScrollTop - $(window).width()) * 0.5 +
          "px)"
      );
    } else {
      scrollText.css("transform", "translateX(0)");
    }
  });
};
app.videoControl = function () {
  var video = $("#video")[0];
  var playPauseButton = $("#video-button");
  playPauseButton.click(function () {
    if (video.paused) {
      $(this).addClass("is-active");
      $(".video").addClass("is-active");
      video.play();
    } else {
      $(this).removeClass("is-active");
      playPauseButton.removeClass("is-play");
      // $('.video').removeClass("is-active");
      video.pause();
    }
  });
  video.addEventListener("ended", function () {
    playPauseButton.removeClass("is-active");
    $(".video").removeClass("is-active");
  });
  video.addEventListener("play", function () {
    playPauseButton.addClass("is-active is-play");
  });
};

app.mvvideo = function () {
  var iframe = document.querySelector("#mv-video");
  var player = new Vimeo.Player(iframe);
  player.on("play", function () {
    var poster = $("#poster__bg");
    poster.hide();
  });
};
app.mvvideo2 = function () {
  var iframe = document.querySelector("#mv-video2");
  var player = new Vimeo.Player(iframe);
  player.on("play", function () {
    $("#poster__bg").hide();
  });

  player.on("pause", function () {
    $("#poster__bg").show();
  });

  $("#video-button2").click(function () {
    player.getPaused().then(function (paused) {
      if (paused) {
        player.play();
        $("#video-button2").addClass("is-active");
      } else {
        player.pause();
        $("#video-button2").removeClass("is-active");
      }
    });
  });
};

app.featureslider = function () {
  let slider = $(".js-feature-slider");
  let settings = {
    mobileFirst: true,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
    speed: 1000,
    swipeToSlide: true,
    // slidesToShow: 2,
    responsive: [
      {
        breakpoint: 767,
        settings: "unslick",
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 0,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  slider.on("init", function (event, slick) {
    // app.evenScroll();
  });
  slider.slick(settings);
  $(window).on("resize", function () {
    if ($(window).width() > 767) {
      return;
    }
    if (!slider.hasClass("slick-initialized")) {
      slider.slick(settings);
    }
  });
};
app.showMenu = function () {
  let menuBtn = $(".js-show-menu"),
    header = $(".header-box");

  menuBtn.on("click", function () {
    const m = $(this);
    if (m.hasClass("is-active")) {
      $("html").removeClass("noscroll");
      m.removeClass("is-active");
      header.removeClass("is-active");
    } else {
      $("html").addClass("noscroll");
      m.addClass("is-active");
      header.addClass("is-active");
    }
  });
  $(".header-menu__item a").click(function () {
    $("html").removeClass("noscroll");
    $(".js-show-menu").removeClass("is-active");
    header.removeClass("is-active");
  });
  $(document).on("click", function (e) {
    if (!$(e.target).closest(".header-box, .js-show-menu").length) {
      $("html").removeClass("noscroll");
      $(".js-show-menu").removeClass("is-active");
      header.removeClass("is-active");
    }
  });
  $(window).on("scroll", function () {
    let scrollTop = $(this).scrollTop();
    if (scrollTop > 100) {
      $(".header").addClass("is-active");
    } else {
      $(".header").removeClass("is-active");
    }
  });
};
app.anchorLink = function () {
  const sections = ["#feature", "#gallery", "#work"];
  const menuItems = $(".header-menu__item a");

  function removeActiveClass() {
    menuItems.removeClass("is-active");
  }

  function addActiveClass(index) {
    menuItems.eq(index).addClass("is-active");
  }

  $(window).on("scroll", function () {
    let scrollPosition = $(document).scrollTop();

    sections.forEach((section, index) => {
      let sectionOffset = $(section).offset().top;
      let sectionHeight = $(section).outerHeight();
      if (
        scrollPosition >= sectionOffset - 50 &&
        scrollPosition < sectionOffset + sectionHeight - 50
      ) {
        removeActiveClass();
        addActiveClass(index);
      } else if (scrollPosition < sectionOffset - 50) {
        menuItems.eq(index).removeClass("is-active");
      }
    });
  });

  $(".anchor-link").click(function () {
    if (
      location.pathname.replace(/^\//, "") ==
        this.pathname.replace(/^\//, "") &&
      location.hostname == this.hostname
    ) {
      var target = $(this.hash);
      target = target.length ? target : $("[name=" + this.hash.slice(1) + "]");
      if (target.length) {
        $("html,body").animate(
          {
            scrollTop: target.offset().top,
          },
          1000
        );
        return false;
      }
    }
  });
};

app.stopScroll = function () {
  scrollTop = $(window).scrollTop();
  scrollLeft = $(window).scrollLeft();
  $("html")
    .addClass("noscroll")
    .css("top", -scrollTop + "px");
};

app.resumeScroll = function () {
  $("html").removeClass("noscroll");
  $(window).scrollTop(scrollTop);
  $(window).scrollLeft(scrollLeft);
};

$(window).on("load", function () {
  $("html, body").animate({ scrollTop: 0 }, "0");

  app.init();

  new WOW({
    animateClass: "animate_animated",
    offset: 150,
  }).init();

  if (windowSize > 767) {
    var wow = new WOW({
      boxClass: "wowpc",
      animateClass: "animate_animated",
      offset: 150,
    });
    wow.init();
  }
  VanillaTilt.init(document.querySelectorAll(".feature-slider__img img"), {
    max: 10,
    perspective: 1000,
    speed: 1000,
  });
  $(".page-top a").click(function () {
    $("html, body").animate({ scrollTop: 0 });
    return false;
  });
});

async function copyText(text, id) {
  const onSuccess = () => {
    $(`[data-copy-id=${id}]`).addClass("copied");

    setTimeout(() => {
      $(`[data-copy-id=${id}]`).removeClass("copied");
    }, 2000);
  };
  if (!navigator?.clipboard) {
    console.warn("Clipboard not supported");
    document.execCommand("copy", true, text);

    return true;
  }

  try {
    await navigator.clipboard.writeText(text);
    onSuccess();
    return true;
  } catch (error) {
    console.warn("Copy failed", error);
    // toast.error("Trình duyệt không hỗ trợ");
    document.execCommand("copy", true, text);
    // toast.success("Copied");
    return true;
  }
}
app.initData = function () {
  let html = "";
  for (let i = 1; i < 12; i++) {
    html += `
    <div class="gallery-list__item">
    <p class="gallery-list__image">
        <img src="./assets/images/gallery_img_${
          i < 10 ? `0${i}` : i
        }.jpg" alt="" />
    </p>
    <div class="gallery-list__body">
        <p class="gallery-list__txt">
            Where innovation meets creativity in the realm of artificial
            intelligence!
        </p>
        <div class="gallery-list__button"><p class="arrow"></p><p data-copy-id="${i}" class="copy gallery-list__button-copy" onclick="copyText('Where innovation meets creativity in the realm of artificial intelligence!', ${i})"></p> </div>
    </div>
  </div>
    `;
  }
  $(".gallery-list__wrap-1-1").html(html);
  $(".gallery-list__wrap-1-2").html(html);
  let html2 = "";
  for (let i = 12; i <= 22; i++) {
    html2 += `
    <div class="gallery-list__item">
    <p class="gallery-list__image">
        <img src="./assets/images/gallery_img_${
          i < 10 ? `0${i}` : i
        }.jpg" alt="" />
    </p>
    <div class="gallery-list__body">
    <p class="gallery-list__txt">
        Where innovation meets creativity in the realm of artificial
        intelligence!
    </p>
    <div class="gallery-list__button"><p class="arrow"></p><p data-copy-id="${i}" class="copy gallery-list__button-copy" onclick="copyText('Where innovation meets creativity in the realm of artificial intelligence!', ${i})"></p> </div>
    </div>
  </div>
    `;
  }
  $(".gallery-list__wrap-2-1").html(html2);
  $(".gallery-list__wrap-2-2").html(html2);
};
