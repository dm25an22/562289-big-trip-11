import {getDurationTimeInMinutes} from "../date-helpers";
import {SortType} from "../components/sort";

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
  let sumPrice = 0;

  if (data.length) {
    sumPrice = data.map((it) => it.eventPrice).reduce((prev, curr) => prev + curr);
  }

  data.forEach((el) => {
    const arr = el.offer
    .map((item) => item.price);
    if (arr.length) {
      sumPrice += arr.reduce((prev, curr) => prev + curr);
    }
  });

  return sumPrice;
};

const getRodLine = (data) => {
  const destination = new Set(data.map((it) => it.destination.name));
  const destinationArr = [...destination];

  return destinationArr.length <= 3 ? destinationArr.join(` &mdash; `) : `${destinationArr[0]}  &mdash; ...  &mdash; ${destinationArr[destinationArr.length - 1]}`;
};

const getSortedPoints = (sortType, points) => {
  const copyPoints = [...points];
  let sortedPoints = [];

  switch (sortType) {

    case SortType.EVENT:
      sortedPoints = points;
      break;

    case SortType.TIME:
      sortedPoints = copyPoints.sort((a, b) => {
        a = getDurationTimeInMinutes(a.start, a.end);
        b = getDurationTimeInMinutes(b.start, b.end);
        return b - a;
      });
      break;

    case SortType.PRICE:
      sortedPoints = copyPoints.sort((a, b) => b.eventPrice - a.eventPrice);
      break;
  }

  return sortedPoints;
};

const firstLetterToUpper = (word) => {
  const firstLetter = word[0].toUpperCase();
  const result = firstLetter + word.slice(1);
  return result;
};

export {
  getRandomNumber,
  getRandomItem,
  getTotalPrice,
  getRodLine,
  getRandomBoolean,
  getSortedPoints,
  firstLetterToUpper
};
