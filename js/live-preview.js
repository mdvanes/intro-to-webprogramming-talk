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
      input, button, select {
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

customElements.define(
  "live-preview-section",
  class LivePreviewSection extends HTMLElement {
    constructor() {
      super();

      const shadowRoot = this.attachShadow({ mode: "open" });

      // const style = document.createElement('style');
      // style.textContent = `
      //   div { padding: 10px; border: 1px solid gray; width: 200px; margin: 10px; }
      //   h2 { margin: 0 0 10px; }
      //   ul { margin: 0; }
      //   p { margin: 10px 0; }
      // `;

      // shadowRoot.appendChild(style);
      //   const foo = document.createElement(`<div></div>`)
      //   shadowRoot.insertAdjacentHTML('beforeend', `<h1>foo</h1>`);
      shadowRoot.innerHTML = `<section class="side-by-side auto-injected" data-transition="slide-in none-out">
      <div>
        
        <textarea>
<html>
<head>
<title>YOUR NAME</title>
</head>
<body>
<h1>Hello, World!!!</h1>
<p>Lorem ipsum dolor sit amet.</p>
<input />
<button onclick="alert('Hi!')">
  click me!
</button>
</body>
</html>
        </textarea>
      </div>

      <div></div>
    </section>

    <section
      class="side-by-side update-preview auto-injected"
      data-transition="fade-in slide-out"
    >
      <div>
        <textarea>
<html>
<head>
<title>YOUR NAME</title>
</head>
<body>
<h1>TEST!</h1>
<p>Lorem ipsum dolor sit amet.</p>
<input />
<button onclick="alert('Hi!')">
  click me!
</button>
</body>
</html>
        </textarea>
      </div>

      <div class="chromes-chrome">
        <iframe
          src="data:text/html;charset=utf-8,%3Chtml%3E%3Cbody%3Efoo%3C/body%3E%3C/html%3E"
        ></iframe>
      </div>
    </section>`;
    }
  }
);

export function injectLivePreviewSections() {
  const elems = document.querySelectorAll("live-preview-section");
  console.log(
    elems.length,
    document.querySelectorAll("section").length,
    document.querySelectorAll("section")
  );
  elems.forEach((elem) => {
    console.log(elem.shadowRoot.querySelectorAll("section"));
    elem.shadowRoot.querySelectorAll("section").forEach((section) => {
      // elem.insertAdjacentElement(section);
      elem.parentNode.insertBefore(section, elem);
      //   document.querySelector(".slides").appendChild(section.cloneNode(true));
    });
    // setTimeout(() => {
    //   document.querySelector(".slides").remove(elem);
    // }, 100);
    elem.remove();
  });
  console.log(
    document.querySelectorAll("live-preview-section"),
    document.querySelectorAll("section").length,
    document.querySelectorAll("section")
  );
}
