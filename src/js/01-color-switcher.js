
const elements = {
    body: document.querySelector('body'),
    startBtn: document.querySelector('button[data-start]'),
    stopBtn: document.querySelector('button[data-stop]'),
};

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

let intervalId = null;

function startClickHandler() {
    elements.startBtn.disabled = true;
    intervalId = setInterval(() => {
        elements.body.style.backgroundColor = getRandomHexColor();
    }, 1000);
}

function stopClickHandler() {
    elements.startBtn.disabled = false;
    clearInterval(intervalId);
}

elements.startBtn.addEventListener('click', startClickHandler);

elements.stopBtn.addEventListener('click', stopClickHandler);