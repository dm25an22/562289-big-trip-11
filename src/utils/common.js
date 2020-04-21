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
    .filter((element) => element.isChecked)
    .map((item) => item.price);
    if (arr.length) {
      sumPrice += arr.reduce((prev, curr) => prev + curr);
    }
  });

  return sumPrice;
};

const getRodLine = (data) => {
  const destination = new Set(data.map((it) => it.destination));

  return [...destination].join(` &mdash; `);
};

export {
  getRandomNumber,
  getRandomItem,
  getTotalPrice,
  getRodLine,
  getRandomBoolean,
};
