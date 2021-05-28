var progressBar = document.querySelectorAll(".indicator > div");
var skillsContainer = document.getElementById("skills-container");
var animatedElements = document.querySelectorAll(".wow");
// document.addEventListener("scroll", checkScroll);
document
  .querySelector(".outer-wrapper")
  .addEventListener("scroll", checkScroll);
function fillBar(bar) {
  let targetWidth = bar.getAttribute("percent");
  let currentWidth = 0;
  let interval = setInterval(function () {
    if (currentWidth > targetWidth) {
      clearInterval(interval);
      return;
    }
    currentWidth++;
    bar.style.width = currentWidth + "%";
  }, 16);
}
function initialiseBar(bar) {
  bar.style.width = 0 + "%";
}
function checkScroll() {
  for (let bar of progressBar) {
    let coordinate = bar.getBoundingClientRect();
    // console.log("Check Scroll - ", coordinate);

    if (
      bar.getAttribute("animDone") == "false" &&
      coordinate.left <= window.innerWidth
    ) {
      bar.setAttribute("animDone", "true");
      fillBar(bar);
    } else if (coordinate.left > window.innerWidth) {
      bar.setAttribute("animDone", "false");
      initialiseBar(bar);
    }
  }
  for (let elem of animatedElements) {
    let coordinate = elem.getBoundingClientRect();
    // console.log("Anime.. :", elem);
    if (
      elem.getAttribute("animDone") == "false" &&
      coordinate.left <= window.innerWidth
    ) {
      elem.setAttribute("animDone", "true");
      elem.classList.add("wow");
      elem.classList.add("fadeInUp");
    } else if (coordinate.left > window.innerWidth) {
      elem.setAttribute("animDone", "false");
      elem.classList.remove("fadeInUp");
      elem.classList.remove("wow");
    //   elem.classList.remove("animated");
    //   elem.removeAttribute('style')

    }
  }
}

$(".outer-wrapper").on("wheel", function (ev) {
  let y = parseInt(ev.originalEvent.deltaY);
  if (y) this.scrollLeft += y;

  // console.log(y,this.scrollLeft);
});
var scrolled = 0;
$("#scroll-down").click(function () {
  // console.log("Scroll..");
  scrolled += 200;
  $(".scrollable").animate(
    {
      //animate element that has scroll
      scrollTop: scrolled, //for scrolling
    },
    1000
  );
  $("#scroll-up").css("display", "inline");
});
$("#scroll-up").click(function () {
  // console.log("Scroll..");
  if (scrolled > 0)
    scrolled -= 200;
  if (scrolled <= 0)
    $("#scroll-up").css("display", "none");

  $(".scrollable").animate(
    {
      //animate element that has scroll
      scrollTop: scrolled, //for scrolling
    },
    1000
  );
});

//   document.body.onmousemove = function (e) {
//     document.documentElement.style.setProperty(
//       "--x",
//       e.clientX + window.scrollX + "px"
//     );
//     document.documentElement.style.setProperty(
//       "--y",
//       e.clientY + window.scrollY + "px"
//     );
//   };
// var body = document.body;
// var html = document.documentElement;
// var a = 0;

// var indicator = document.getElementById("indicator");
// window.addEventListener("wheel",checkScroll);

// function checkScroll() {
//     let coordinate = screen.availWidth;

//     var scrolled = Math.max(document.body.scrollWidth, document.documentElement.scrollWidth);

//     // indicator.style.width = scrolled/(height-h) * 100 + "%";

//     // console.log(scrolled);
// }

document.addEventListener("DOMContentLoaded", function (event) {
  var cursor = document.querySelector(".custom-cursor");
  var links = document.querySelectorAll(".hoverable");
  var initCursor = false;

  for (var i = 0; i < links.length; i++) {
    var selfLink = links[i];

    selfLink.addEventListener("mouseover", function () {
      cursor.classList.add("custom-cursor--link");
    });
    selfLink.addEventListener("mouseout", function () {
      cursor.classList.remove("custom-cursor--link");
    });
  }

  window.onmousemove = function (e) {
    var mouseX = e.clientX;
    var mouseY = e.clientY;

    if (!initCursor) {
      // cursor.style.opacity = 1;
      TweenLite.to(cursor, 0.3, {
        opacity: 1,
      });
      initCursor = true;
    }

    TweenLite.to(cursor, 0, {
      top: mouseY + "px",
      left: mouseX + "px",
    });
  };

  window.onmouseout = function (e) {
    TweenLite.to(cursor, 0.3, {
      opacity: 0,
    });
    initCursor = false;
  };
});

// var $window = $(window),
//   win_width_padded = $window.width() * 1.1,
//   isTouch = Modernizr.touch;
// if (isTouch) {
//   $(".revealOnScroll").addClass("animated");
// }
// $window.on("scroll", revealOnScroll);
// function revealOnScroll() {
//   var scrolled = $window.scrollLeft(),
//     win_width_padded = $window.width() * 1.1;
//   $(".revealOnScroll:not(.animated)").each(function () {
//     var $this = $(this),
//       offsetLeft = $this.offset().left;
//     if (scrolled + win_width_padded > offsetLeft) {
//       if ($this.data("timeout")) {
//         window.setTimeout(function () {
//           $this.addClass("animated " + $this.data("animation"));
//         }, parseInt($this.data("timeout"), 10));
//       } else {
//         $this.addClass("animated " + $this.data("animation"));
//       }
//     }
//   });
//   $(".revealOnScroll.animated").each(function (index) {
//     var $this = $(this),
//       offsetLeft = $this.offset().left;
//     if (scrolled + win_width_padded < offsetLeft) {
//       $(this).removeClass("animated fadeInUp flipInX lightSpeedIn");
//     }
//   });
// }

// revealOnScroll();
// delay function
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const slideList = document.querySelectorAll('.slide-item');
const dotList = document.querySelectorAll('.dot');

// init slider
let activeKey = 0;
slideList[activeKey].classList.add('active');

// change slide
async function onSlideChange(key) {
  if (key === activeKey) return;
  slideList[activeKey].classList.add('leave');
  await delay(400);
  slideList[activeKey].classList.remove('leave', 'active');
  activeKey = key;
  slideList[key].classList.add('active');
}
dotList.forEach((dot, key) => {
  dot.addEventListener('click', () => onSlideChange(key))
})

