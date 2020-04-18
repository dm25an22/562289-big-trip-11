import {RenderPosition} from "./consts";

const getRandomNumber = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomItem = (arr) => {
  return arr[getRandomNumber(0, arr.length - 1)];
};

const getRandomBoolean = () => {
  return Math.random() > 0.5;
};

const getTotalPrice = (data) => {
  data = data.slice(1);

  let sumPrice = data.map((it) => it.eventPrice).reduce((prev, curr) => prev + curr);

  data.forEach((el) => {
    const arr = el.offer.map((item) => item.price);
    if (arr.length) {
      sumPrice += arr.reduce((prev, curr) => prev + curr);
    }
  });

  return sumPrice;
};

const getRodLine = (data) => {
  data = data.slice(1);
  const destination = new Set(data.map((it) => it.destination));

  return [...destination].join(` &mdash; `);
};

const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

const render = (container, element, place = `beforeend`) => {

  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;

    case RenderPosition.BEFOREEND:
      container.append(element);
      break;

    case RenderPosition.AFTER:
      container.after(element);
      break;
  }
};

export {
  getRandomNumber,
  getRandomItem,
  getTotalPrice,
  getRodLine,
  getRandomBoolean,
  createElement,
  render
};
