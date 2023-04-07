import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const startBtn = document.querySelector('button[data-start]');
const days = document.querySelector('span[data-days]');
const hours = document.querySelector('span[data-hours]');
const minutes = document.querySelector('span[data-minutes]');
const seconds = document.querySelector('span[data-seconds]');
startBtn.setAttribute('disabled', true);
let lastTimeInterval = null;

const options = {
  enableTime: true,
  enableSeconds: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  //   minDate: new Date(),
  onClose(selectedDates) {
    if (selectedDates[0] < options.defaultDate) {
      Notify.warning('Please choose a date in the future', {
        position: 'center-top',
      });
      selectedDates[0] = options.defaultDate;
      return;
    }
    startBtn.removeAttribute('disabled');
  },
};

const input = flatpickr('#datetime-picker', options);

startBtn.addEventListener('click', () => {
  startBtn.setAttribute('disabled', true);
  lastTimeInterval = setInterval(updateTimer, 1000);
});

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

function updateTimer(params) {
  const dateNow = new Date();

  const lastTime = convertMs(input.selectedDates[0] - dateNow);

  if (
    !(input.selectedDates[0].getTime() > dateNow.getTime()) ||
    input.selectedDates[0].getTime() === dateNow.getTime()
  ) {
    clearInterval(lastTimeInterval);
    return;
  }
  days.textContent = addLeadingZero(lastTime.days);
  hours.textContent = addLeadingZero(lastTime.hours);
  minutes.textContent = addLeadingZero(lastTime.minutes);
  seconds.textContent = addLeadingZero(lastTime.seconds);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
