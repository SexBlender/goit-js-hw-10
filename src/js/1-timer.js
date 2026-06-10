import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

flatpickr('#datetime-picker', {
  enableTime: true,
  dateFormat: 'Y-m-d H:i',
});

const refs = {
  input: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('[data-start]'),

  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

let intervalID = null;

refs.startBtn.addEventListener('click', () => {
  const initTime = new Date(refs.input.value);
  if (initTime <= Date.now()) {
    alert('Error illegal operation');
    return;
  }
  clearInterval(intervalID);

  intervalID = setInterval(() => {
    const currentTime = new Date();
    const diff = initTime - currentTime;

    if (diff <= 0) {
      clearInterval(intervalID);
      return;
    }

    const { days, hours, minutes, seconds } = convertMs(diff);

    refs.minutes.textContent = addLeadingZero(minutes);
    refs.seconds.textContent = addLeadingZero(seconds);
    refs.hours.textContent = addLeadingZero(hours);
    refs.days.textContent = addLeadingZero(days);
  }, 1000);
});

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  return {
    days: Math.floor(ms / day),

    hours: Math.floor((ms % day) / hour),

    minutes: Math.floor((ms % hour) / minute),

    seconds: Math.floor((ms % minute) / second),
  };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
