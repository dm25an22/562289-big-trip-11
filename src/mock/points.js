import {getRandomNumber, getRandomItem, getRandomBoolean} from "../utils";
import {castTimeFormat} from "../date-helpers";
import {LABEL_IN, LABEL_TO} from "../consts";

const QUANTITY_PINS = 15;

const LabelOfType = {
  'Taxi': LABEL_TO,
  'Bus': LABEL_TO,
  'Train': LABEL_TO,
  'Ship': LABEL_TO,
  'Transport': LABEL_TO,
  'Drive': LABEL_TO,
  'Flight': LABEL_TO,
  'Sightseeing': LABEL_IN,
  'Restaurant': LABEL_IN,
  'Check-in': LABEL_IN
};

const typeEvents = Object.keys(LabelOfType);

const cities = [
  `Bergen`,
  `Oslo`,
  `Gothenburg`,
  `Kopenhagen`
];

const description = `Lorem ipsum dolor sit amet, consectetur adipiscing elit.Cras aliquet varius magna, non porta ligula feugiat eget.
Fusce tristique felis at fermentum pharetra.Aliquam id orci ut lectus varius viverra.Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.
Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.
Sed sed nisi sed augue convallis suscipit in sed felis.Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus.In rutrum ac purus sit amet tempus`;

const services = [
  {
    type: `meal`,
    title: `Add breakfast`,
    price: getRandomNumber(10, 30),
    isChecked: getRandomBoolean()
  },
  {
    type: `luggage`,
    title: `Add luggage`,
    price: getRandomNumber(10, 20),
    isChecked: getRandomBoolean()
  },
  {
    type: `transfer`,
    title: `Book tickets`,
    price: getRandomNumber(5, 15),
    isChecked: getRandomBoolean()
  },
  {
    type: `comfort`,
    title: `Switch to comfort`,
    price: getRandomNumber(10, 30),
    isChecked: getRandomBoolean()
  },
  {
    type: `meal`,
    title: `Lunch in city`,
    price: getRandomNumber(30, 70),
    isChecked: getRandomBoolean()
  },
  {
    type: `transfer`,
    title: `Order Uber`,
    price: getRandomNumber(10, 30),
    isChecked: getRandomBoolean()
  },
  {
    type: `transfer`,
    title: `Rent a car`,
    price: getRandomNumber(50, 150),
    isChecked: getRandomBoolean()
  }
];

const renderServicesData = (countPoint) => {
  const servicesCopy = [...services];
  const result = [];

  for (let i = 0; i < countPoint; i++) {
    const element = servicesCopy.splice(getRandomNumber(0, servicesCopy.length - 1), 1);

    result.push(element[0]);
  }
  return result;
};

const getRandomStr = (str, count) => {
  str = str.split(`.`);
  let result = ``;

  for (let i = 0; i < count; i++) {
    result += str[getRandomNumber(0, str.length - 1)] + `. `;
  }
  return result;
};

const getRandomPhotos = (count) => {
  const result = [];

  while (result.length !== count) {
    result.push(`http://picsum.photos/248/152?r=${Math.random()}`);
  }

  return result;
};

const getStart = (dateStr = `2020-09-07T08:00`) => {
  const date = new Date(dateStr);

  const year = date.getFullYear();
  const month = castTimeFormat(date.getMonth());

  date.setDate(date.getDate() + getRandomNumber(0, 4));
  const day = castTimeFormat(date.getDate());

  date.setHours(date.getHours() + getRandomNumber(0, 12));
  const hours = castTimeFormat(date.getHours());

  date.setMinutes(date.getMinutes() + getRandomNumber(0, 59));
  const minutes = castTimeFormat(date.getMinutes());

  return `${year}-${month}-${day}T${hours}:${minutes}`;
};

const getEnd = (date) => {
  date = new Date(date);

  date.setMinutes(date.getMinutes() + getRandomNumber(0, 59));
  date.setHours(date.getHours() + getRandomNumber(1, 4));

  return date;
};

const generatePoints = () => {
  const startDate = getStart();

  return {
    type: getRandomItem(typeEvents),
    destination: getRandomItem(cities),
    eventPrice: getRandomNumber(30, 140),
    offer: renderServicesData(getRandomNumber(0, 5)),
    start: new Date(startDate),
    end: getEnd(startDate),
    description: getRandomStr(description, getRandomNumber(0, 5)),
    photos: getRandomPhotos(getRandomNumber(0, 7))
  };
};

const makePointsData = (countPoint) => {
  return new Array(countPoint)
    .fill()
    .map(generatePoints)
    .sort((a, b) => a.start - b.start);
};

const mockData = makePointsData(QUANTITY_PINS);

const datesList = [...new Set(mockData.map((elem) => new Date(elem.start).toDateString()))];

export {mockData, datesList, LabelOfType};
