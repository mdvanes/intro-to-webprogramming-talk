function preview(src, target) {
  document.getElementById(target).style.display = "block";
  document.getElementById(target).src =
    "data:text/html;charset=utf-8," +
    encodeURIComponent(document.getElementById(src).value);
}

function replaceSrc(value) {
  const srcIndex = value.indexOf(' src="');
  if (srcIndex > -1) {
    return value.replaceAll(' src="', ` src="${top.location.origin}/assets/`);
  }
  return value;
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
      input, button {
        font-size: 100%;
      }
      </style>`;
  const withStyles = [part1, injectStyle, part2].join("");
  const withSrcPaths = replaceSrc(withStyles);
  slideElem.querySelector("iframe").src =
    "data:text/html;charset=utf-8," + encodeURIComponent(withSrcPaths);
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

  if (slideElem.classList.contains("update-preview")) {
    setPreview(slideElem);
    slideElem
      .querySelector("textarea")
      .addEventListener("change", updatePreview);
  }
}
