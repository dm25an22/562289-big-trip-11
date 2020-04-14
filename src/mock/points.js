import {getRandomNumber, getRandomItem} from "../utils";

const QUANTITY_PINS = 15;

const routePoints = {
  movement: [
    `Taxi`,
    `Bus`,
    `Train`,
    `Ship`,
    `Transport`,
    `Drive`,
    `Flight`
  ],
  register: [
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

const offersTitels = [
  `Add breakfast`,
  `Add luggage`,
  `Rent a car`,
  `Order Uber`,
  `Book tickets`,
  `Lunch in city`,
  `Switch to comfort`
];

const renderOffersData = (countPoint) => {
  const offersCopy = offersTitels.slice();

  return new Array(countPoint)
    .fill(``)
    .map(() => {
      const element = offersCopy.splice(getRandomNumber(0, offersCopy.length - 1), 1);

      return {
        title: String(element),
        price: String(element) ? getRandomNumber(20, 150) : ``,
      };
    });
};

const description = `Lorem ipsum dolor sit amet, consectetur adipiscing elit.Cras aliquet varius magna, non porta ligula feugiat eget.Fusce tristique felis at fermentum pharetra.Aliquam id orci ut lectus varius viverra.Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.Sed sed nisi sed augue convallis suscipit in sed felis.Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus.In rutrum ac purus sit amet tempus`;

const getRandomStr = (str, count) => {
  str = str.split(`.`);
  let result = ``;

  for (let i = 0; i < count; i++) {
    result += str[getRandomNumber(0, str.length - 1)] + `.`;
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

const routePointsValues = Object.keys(routePoints);


const generatePoints = () => {
  const randomType = getRandomItem(routePointsValues);
  const point = getRandomItem(routePoints[randomType]);

  return {
    typeRoutePoints: randomType,
    routePoint: point,
    destination: getRandomItem(cities),
    icon: point.toLowerCase(),
    dueDate: new Date(),
    eventPrice: getRandomNumber(30, 140),
    offer: renderOffersData(getRandomNumber(0, 5)),
    description: getRandomStr(description, getRandomNumber(0, 5)),
    photos: getRandomPhotos(getRandomNumber(0, 7))
  };
};

const renderPointsData = (countPoint) => {
  return new Array(countPoint)
    .fill()
    .map(generatePoints);
};

const mockData = renderPointsData(QUANTITY_PINS);

export {mockData};
