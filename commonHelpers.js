import"./assets/modulepreload-polyfill-ec808ebb.js";/* empty css                      */const t={body:document.querySelector("body"),startBtn:document.querySelector("button[data-start]"),stopBtn:document.querySelector("button[data-stop]")};function n(){return`#${Math.floor(Math.random()*16777215).toString(16).padStart(6,0)}`}let e=null;function r(){t.startBtn.disabled=!0,e=setInterval(()=>{t.body.style.backgroundColor=n()},1e3)}function o(){t.startBtn.disabled=!1,clearInterval(e)}t.startBtn.addEventListener("click",r);t.stopBtn.addEventListener("click",o);
//# sourceMappingURL=commonHelpers.js.map