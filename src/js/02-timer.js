import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";


// constants and variables
const elements = {
    input: document.querySelector('input[type="text"]'),
    startBtn: document.querySelector('button[data-start]'),
    days: document.querySelector('span[data-days]'),
    hours: document.querySelector('span[data-hours]'),
    mins: document.querySelector('span[data-minutes]'),
    secs: document.querySelector('span[data-seconds]'),
};

const variables = {
    selectedDate: null,
    intervalId: null,
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
        let selectedDate = selectedDates[0];
        let currentDate = new Date();
        stopTimer();
        if (selectedDate < currentDate) {
            showError()
            return;
        }
        elements.startBtn.disabled = false;
        variables.selectedDate = selectedDate;
  },
};

const fp = flatpickr(elements.input, options);


// functions
function showError() {
    iziToast.error({
        message: 'Please choose a date in the future',
        position: 'topCenter',
        transitionIn: 'fadeInDown'
    });
    elements.startBtn.disabled = true;
    variables.selectedDate = null;
}

function addLeadingZero(value) {
    return String(value).padStart(2, "0");
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function startTimer() {
    variables.intervalId = setInterval(() => {
        const currentDate = new Date();
        if (variables.selectedDate < currentDate) {
            stopTimer();
            return;
        }
        const ms = variables.selectedDate - currentDate;
    
        const { days, hours, minutes, seconds } = convertMs(ms);
    
        elements.days.textContent = addLeadingZero(days);
        elements.hours.textContent = addLeadingZero(hours);
        elements.mins.textContent = addLeadingZero(minutes);
        elements.secs.textContent = addLeadingZero(seconds);
    }, 1000);
}

function stopTimer() {
    if (variables.intervalId) {
        clearInterval(variables.intervalId);
    }
}


function handleStartBtnClick() {
    if (variables.selectedDate) {
        startTimer();
        elements.startBtn.disabled = true;
    }
}

elements.startBtn.addEventListener("click", handleStartBtnClick);