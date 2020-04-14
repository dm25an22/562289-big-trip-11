import {getFormatMonthDate} from "../utils";

export const renderDaysData = (countPoint) => {
  let dayCounter = 1;
  const dateNow = new Date(2020, 8, 11);

  return new Array(countPoint)
    .fill()
    .map(() => {
      return {
        day: dayCounter++,
        // startDate: 
        month: getFormatMonthDate(dateNow)
      };
    });
};


