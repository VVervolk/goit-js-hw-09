import { Notify } from 'notiflix/build/notiflix-notify-aio';

const inputDelay = document.querySelector('input[name="delay"]');
const inputStep = document.querySelector('input[name="step"]');
const inputAmount = document.querySelector('input[name="amount"]');
const buttonForCreate = document.querySelector('button');

const createPromise = (position, delay) => {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
};

buttonForCreate.addEventListener('click', ev => {
  ev.preventDefault();

  let delayValue = Number(inputDelay.value);
  let stepValue = Number(inputStep.value);
  let amountValue = Number(inputAmount.value);

  let counter = 0;
  let finalDelay = delayValue;

  let promiseLoop = setInterval(() => {
    counter += 1;

    if (counter > amountValue) {
      clearInterval(promiseLoop);
      return;
    }

    createPromise(counter, finalDelay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    finalDelay += stepValue;
  }, finalDelay);
});
