import {getRandomNumber, getRandomItem, castTimeFormat} from "../utils";

const QUANTITY_PINS = 16;

const routePoints = {
  transfer: [
    `Taxi`,
    `Bus`,
    `Train`,
    `Ship`,
    `Transport`,
    `Drive`,
    `Flight`
  ],
  activity: [
    `Check-in`,
    `Sightseeing`,
    `Restaurant`
  ]
};

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
    price: getRandomNumber(10, 30)
  },
  {
    type: `luggage`,
    title: `Add luggage`,
    price: getRandomNumber(10, 20)
  },
  {
    type: `transfer`,
    title: `Book tickets`,
    price: getRandomNumber(5, 15)
  },
  {
    type: `comfort`,
    title: `Switch to comfort`,
    price: getRandomNumber(10, 30)
  },
  {
    type: `meal`,
    title: `Lunch in city`,
    price: getRandomNumber(30, 70)
  },
  {
    type: `transfer`,
    title: `Order Uber`,
    price: getRandomNumber(10, 30)
  },
  {
    type: `transfer`,
    title: `Rent a car`,
    price: getRandomNumber(50, 150)
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

const routePointsValues = Object.keys(routePoints);

const generatePoints = () => {
  const randomType = getRandomItem(routePointsValues);
  const point = getRandomItem(routePoints[randomType]);
  const startDate = getStart();

  return {
    typeRoutePoints: randomType,
    routePoint: point,
    destination: getRandomItem(cities),
    icon: point.toLowerCase(),
    eventPrice: getRandomNumber(30, 140),
    offer: renderServicesData(getRandomNumber(0, 5)),
    start: new Date(startDate),
    end: getEnd(startDate),
    description: getRandomStr(description, getRandomNumber(0, 5)),
    photos: getRandomPhotos(getRandomNumber(0, 7))
  };
};

const renderPointsData = (countPoint) => {
  return new Array(countPoint)
    .fill()
    .map(generatePoints)
    .sort((a, b) => a.start - b.start);
};

const mockData = renderPointsData(QUANTITY_PINS);

let datesList = Array.from(new Set(mockData.map((elem) => new Date(elem.start).toDateString())));

export {mockData, datesList};
