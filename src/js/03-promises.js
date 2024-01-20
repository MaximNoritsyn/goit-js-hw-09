import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector(".form")

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({position, delay});
      } else {
        reject({position, delay});
      }
    }, delay);
  });
}

function sendIziToast(text, type) {
  iziToast[type]({
    message: text,
    position: "topRight",
    transitionIn: 'fadeInDown'
  });
}

function sendSuccess({ position, delay }) {
  sendIziToast(`✅ Fulfilled promise ${position} in ${delay}ms`, "success");
}
  
function sendError({ position, delay }) {
  sendIziToast(`❌ Rejected promise ${position} in ${delay}ms`, "error");
}
  

const submitHandler = (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const delay = formData.get("delay");
  const step = formData.get("step");
  const amount = formData.get("amount");
  let currentDelay = Number(delay);
  for (let i = 1; i <= amount; i++) {
    createPromise(i, currentDelay).then(sendSuccess).catch(sendError);
    currentDelay += Number(step);
  }
  event.target.reset();
}

form.addEventListener("submit", submitHandler);
