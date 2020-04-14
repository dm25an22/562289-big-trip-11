import {months} from "./consts";

const castTimeFormat = (value) => {
  return value < 10 ? `0${value}` : String(value);
};

const getFormatTime = (date) => {
  const hour = castTimeFormat(date.getHours());
  const minute = castTimeFormat(date.getMinutes());

  return `${hour}:${minute}`;
};

const getRandomNumber = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomItem = (arr) => {
  return arr[getRandomNumber(0, arr.length - 1)];
};

const getRandomStartDate = () => {
  const targetDate = new Date();
};

const getRandomEndDate = () => {

};

// const getRandomDate = () => {
//   const targetDate = new Date();
//   const sign = Math.random() > 0.5 ? 1 : -1;
//   const diffValue = sign * getRandomNumber(0, 7);

//   targetDate.setDate(targetDate.getDate() + diffValue);
//   targetDate.setHours(getRandomNumber(0, 23), getRandomNumber(0, 59));

//   return targetDate;
// };

// const getStartDate = (currentDate) => {
//   currentDate.setDate(currentDate.getDate() + 1);

//   return currentDate;
// };

const getFormatMonthDate = (date) => {
  const monthIndex = date.getMonth();
  const month = months[monthIndex];

  return month;
};

export {getFormatTime, getRandomNumber, getRandomItem, getFormatMonthDate};
