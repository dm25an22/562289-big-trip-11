import {getDurationTimeInMinutes} from "../date-helpers";
import {SortType} from "../enum";

export const getTotalPrice = (data) => {
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

export const getRodLine = (data) => {
  const dataClone = [...data];
  dataClone.sort((a, b) => a.start - b.start);
  const destination = dataClone.map((it) => it.destination.name);

  return destination.length <= 3 ? destination.join(` &mdash; `) : `${destination[0]}  &mdash; ...  &mdash; ${destination[destination.length - 1]}`;
};

export const getSortedPoints = (sortType, points) => {
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

export const firstLetterToUpper = (word) => {
  const firstLetter = word[0].toUpperCase();
  const result = firstLetter + word.slice(1);
  return result;
};

