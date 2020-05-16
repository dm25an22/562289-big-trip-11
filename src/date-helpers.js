import {MONTHS} from "./consts";
import moment from "moment";

const getDurationTravel = (data) => {
  const dates = data.map((el) => moment(el));
  const minDate = moment.min(dates);
  const maxDate = moment.max(dates);

  const startDay = minDate.get(`date`);
  const startMonth = MONTHS[minDate.get(`month`)];

  const endtDay = maxDate.get(`date`);
  const endMonth = MONTHS[maxDate.get(`month`)];

  return [startDay, startMonth, endtDay, endMonth];
};

const getStartEndEvent = (start, end) => {
  const startTime = moment(start).format(`HH:mm`);
  const endTime = moment(end).format(`HH:mm`);

  return [startTime, endTime];
};

const getMonth = (date) => {
  const monthIndex = moment(date).get(`month`);

  return MONTHS[monthIndex];
};

const getDay = (date) => {
  const day = moment(date).get(`date`);

  return day;
};


const getDurationTime = (start, end) => {
  const a = moment(start);
  const b = moment(end);

  const duration = moment.duration(b.diff(a));

  const day = duration.get(`day`);
  const hours = duration.get(`hour`);
  const minutes = duration.get(`minutes`);

  return `${day > 0 ? `${day}D` : ``} ${hours > 0 ? `${hours}H` : ``} ${minutes}M`;
};

const getDurationTimeInMinutes = (start, end) => {
  const a = moment(start);
  const b = moment(end);

  return moment(b).diff(a, `minutes`);
};

export {
  getDurationTravel,
  getStartEndEvent,
  getMonth,
  getDurationTime,
  getDay,
  getDurationTimeInMinutes
};
