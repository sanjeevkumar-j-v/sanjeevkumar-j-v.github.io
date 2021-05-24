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
