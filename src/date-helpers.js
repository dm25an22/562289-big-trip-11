import {MONTHS} from "./consts";

const getDurationTravel = (data) => {
  const startDay = new Date(data[0]).getDate();
  const startMonth = MONTHS[new Date(data[0]).getMonth()];

  const endtDay = new Date(data[data.length - 1]).getDate();
  const endMonth = MONTHS[new Date(data[data.length - 1]).getMonth()];

  return [startDay, startMonth, endtDay, endMonth];
};

const getStartEndEvent = (start, end) => {
  const satrHours = castTimeFormat(start.getHours());
  const starMinute = castTimeFormat(start.getMinutes());

  const endHours = castTimeFormat(end.getHours());
  const endMinute = castTimeFormat(end.getMinutes());

  return [satrHours, starMinute, endHours, endMinute];
};

const getMonth = (date) => {
  const monthIndex = new Date(date).getMonth();

  return MONTHS[monthIndex];
};

const getDay = (date) => {
  const day = new Date(date).getDate();

  return day;
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

const getDurationTimeInMinutes = (start, end) => {
  const diff = end.getTime() - start.getTime();

  let hours;
  let minutes;

  let minutesDiff = diff / 60 / 1000;
  let hoursdDiff = diff / 3600 / 1000;

  hours = Math.floor(hoursdDiff);
  minutes = minutesDiff - 60 * hours;

  return hours * 60 + minutes;
};

const getFormatMonthDate = (date) => {
  const monthIndex = date.getMonth();
  const month = MONTHS[monthIndex];

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

export {
  getDurationTravel,
  getStartEndEvent,
  getMonth,
  castTimeFormatForEdit,
  getDurationTime,
  getFormatMonthDate,
  getDay,
  castTimeFormat,
  getDurationTimeInMinutes
};
