import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
require('flatpickr/dist/themes/material_red.css');
import Notiflix from 'notiflix';

const myInput = document.getElementById('datetime-picker');
const theFinalCoundown = document.getElementById('its-the-final-countdown');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

let timerId = null;

theFinalCoundown.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() < new Date().getTime()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      theFinalCoundown.disabled = true;
    } else {
      theFinalCoundown.disabled = false;
    }
  },
};

flatpickr(myInput, options);

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

function addLeadingZero(value) {
  if (value.toString().length === 1) {
    return value.toString().padStart(2, '0');
  } else {
    return value;
  }
}

const countdown = () => {
  timerId = setInterval(() => {
    const selectedDate = myInput.value;
    const selectedDateMs = new Date(selectedDate).getTime();
    const currentDateMs = new Date().getTime();
    const timeLeft = selectedDateMs - currentDateMs;
    const timeLeftConvertMs = convertMs(timeLeft);
    if (timeLeftConvertMs.seconds >= 0) {
      daysEl.textContent = addLeadingZero(timeLeftConvertMs.days);
      hoursEl.textContent = addLeadingZero(timeLeftConvertMs.hours);
      minutesEl.textContent = addLeadingZero(timeLeftConvertMs.minutes);
      secondsEl.textContent = addLeadingZero(timeLeftConvertMs.seconds);
    } else {
      Notiflix.Notify.success('Final Countdown finished');
      clearInterval(timerId);
    }
  });
};

theFinalCoundown.addEventListener('click', countdown);
