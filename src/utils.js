import {months} from "./consts";

const getRandomNumber = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomItem = (arr) => {
  return arr[getRandomNumber(0, arr.length - 1)];
};

const getFormatMonthDate = (date) => {
  const monthIndex = date.getMonth();
  const month = months[monthIndex];

  return month;
};

const castTimeFormat = (value) => {
  value = String(value);

  let result;

  if (value.length === 4) {
    result = `${value.slice(2)}`;
  } else if (value < 10) {
    result = `0${value}`;
  } else {
    result = String(value);
  }

  return result;
};

const castTimeFormatForEdit = (date) => {
  const year = castTimeFormat(date.getFullYear());
  const month = castTimeFormat(date.getMonth() + 1);
  const day = castTimeFormat(date.getDate());
  const hour = castTimeFormat(date.getHours());
  const minutes = castTimeFormat(date.getMinutes());

  return `${year}/${month}/${day} ${hour}:${minutes}`;
};

const getDurationTime = (start, end) => {
  const diff = end.getTime() - start.getTime();

  let hours;
  let minutes;

  let minutesDiff = diff / 60 / 1000;
  let hoursdDiff = diff / 3600 / 1000;

  hours = Math.floor(hoursdDiff);
  minutes = minutesDiff - 60 * hours;

  return `${hours > 0 ? `${hours}H` : ``} ${minutes}M`;
};


export {getRandomNumber, getRandomItem, getFormatMonthDate, castTimeFormat, castTimeFormatForEdit, getDurationTime};
