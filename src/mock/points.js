import {getRandomNumber, getRandomItem, getRandomBoolean} from "../utils/common";
import {LABEL_IN, LABEL_TO} from "../consts";
import moment from "moment";

const QUANTITY_PINS = 1;
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

const description = `Lorem ipsum dolor sit amet, consectetur adipiscing elit.Cras aliquet varius magna, non porta ligula feugiat eget.
Fusce tristique felis at fermentum pharetra.Aliquam id orci ut lectus varius viverra.Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.
Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.
Sed sed nisi sed augue convallis suscipit in sed felis.Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus.In rutrum ac purus sit amet tempus`;

const services = [
  {
    type: [`Check-in`],
    title: `Add breakfast`,
    price: getRandomNumber(10, 30),
    isChecked: getRandomBoolean()
  },
  {
    type: [`Bus`, `Flight`, `Ship`, `Train`, `Transport`],
    title: `Add luggage`,
    price: getRandomNumber(10, 20),
    isChecked: getRandomBoolean()
  },
  {
    type: [`Bus`, `Flight`, `Ship`, `Train`, `Transport`, `Sightseeing`],
    title: `Book tickets`,
    price: getRandomNumber(5, 15),
    isChecked: getRandomBoolean()
  },
  {
    type: [`Flight`, `Bus`],
    title: `Switch to comfort`,
    price: getRandomNumber(10, 30),
    isChecked: getRandomBoolean()
  },
  {
    type: [`Sightseeing`, `Taxi`],
    title: `Lunch in city`,
    price: getRandomNumber(30, 70),
    isChecked: getRandomBoolean()
  },
  {
    type: [`Restaurant`, `Drive`, `Check-in`],
    title: `Order Uber`,
    price: getRandomNumber(10, 30),
    isChecked: getRandomBoolean()
  },
  {
    type: [`Restaurant`, `Drive`, `Check-in`],
    title: `Rent a car`,
    price: getRandomNumber(50, 150),
    isChecked: getRandomBoolean()
  },
  {
    type: [`Bus`, `Flight`, `Ship`, `Train`, `Transport`],
    title: `Choose seats`,
    price: getRandomNumber(2, 10),
    isChecked: getRandomBoolean()
  },
  {
    type: [`Sightseeing`, `Flight`],
    title: `Add meal`,
    price: getRandomNumber(10, 20),
    isChecked: getRandomBoolean()
  },

];

export const getOffers = (typ) => {
  return services.filter((it) => {
    return it.type.some((el) => el === typ);
  });
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


const getStart = () => {
  const date = moment(`2020-05-09`);
  date.set(`hour`, 8);

  date.add(getRandomNumber(0, 4), `d`);
  date.add(getRandomNumber(0, 12), `h`);
  date.set(`minute`, getRandomNumber(0, 59));

  return date;
};

export const cities = {
  Bergen: {
    description: `Bergen ` + getRandomStr(description, getRandomNumber(0, 5)),
    photo: getRandomPhotos(getRandomNumber(0, 7))
  },
  Oslo: {
    description: `Oslo ` + getRandomStr(description, getRandomNumber(0, 5)),
    photo: getRandomPhotos(getRandomNumber(0, 7)),
  },
  Gothenburg: {
    description: `Gothenburg ` + getRandomStr(description, getRandomNumber(0, 5)),
    photo: getRandomPhotos(getRandomNumber(0, 7)),
  },
  Kopenhagen: {
    description: `Kopenhagen ` + getRandomStr(description, getRandomNumber(0, 5)),
    photo: getRandomPhotos(getRandomNumber(0, 7)),
  }
};


const getEnd = (date) => {
  const dateEnd = moment(date);

  dateEnd.add(getRandomNumber(1, 4), `h`);
  dateEnd.set(`minute`, getRandomNumber(0, 59));

  return dateEnd;
};

const generatePoints = () => {
  const startDate = getStart();
  const currentDestination = getRandomItem(Object.keys(cities));
  const currentType = getRandomItem(typeEvents);

  return {
    id: String(new Date() + Math.random()),
    type: currentType,
    destination: currentDestination,
    eventPrice: getRandomNumber(30, 140),
    offer: getOffers(currentType),
    start: new Date(startDate),
    end: new Date(getEnd(startDate)),
    description: cities[currentDestination].description,
    photos: cities[currentDestination].photo,
    isFavorite: getRandomBoolean()
  };
};

const makePointsData = (countPoint) => {
  return new Array(countPoint)
    .fill()
    .map(generatePoints)
    .sort((a, b) => a.start - b.start);
};

const mockData = makePointsData(QUANTITY_PINS);

export {mockData, LabelOfType};
