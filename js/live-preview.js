function preview(src, target) {
  document.getElementById(target).style.display = "block";
  document.getElementById(target).src =
    "data:text/html;charset=utf-8," +
    encodeURIComponent(document.getElementById(src).value);
}

function setPreview(slideElem) {
  const value = slideElem.querySelector("textarea").value;
  const splitAt = value.indexOf("<head>") + "<head>".length;
  const part1 = value.substring(0, splitAt);
  const part2 = value.substring(splitAt);
  const injectStyle = `<style>
      html {
        height: 100%;
      }
      body {
        font-size: 300%;
      }
      </style>`;
  slideElem.querySelector("iframe").src =
    "data:text/html;charset=utf-8," +
    encodeURIComponent([part1, injectStyle, part2].join(""));
}

function updatePreview(event) {
  // console.log(
  //   event.target.value,
  //   event.target.parentElement.parentElement
  // );
  const slideElem = event.target.parentElement.parentElement;
  setPreview(slideElem);
}

export function onSlideChangedUpdatePreview(event) {
  const slideElem = event.currentSlide;

  if (slideElem.classList.contains("side-by-side")) {
    setPreview(slideElem);
    slideElem
      .querySelector("textarea")
      .addEventListener("change", updatePreview);
  }
}

// slidetransitionend
// Reveal.on("slidechanged", (event) => {
//   const slideElem = event.currentSlide;

//   if (slideElem.classList.contains("side-by-side")) {
//     setPreview(slideElem);
//     slideElem
//       .querySelector("textarea")
//       .addEventListener("change", updatePreview);
//   }
// });
