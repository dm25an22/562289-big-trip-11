import {MONTHS} from "./consts";
import moment from "moment";

export const getDurationTravel = (data) => {
  const dates = data.map((el) => moment(el));
  const minDate = moment.min(dates);
  const maxDate = moment.max(dates);

  const startDay = minDate.get(`date`);
  const startMonth = MONTHS[minDate.get(`month`)];

  const endtDay = maxDate.get(`date`);
  const endMonth = MONTHS[maxDate.get(`month`)];

  return [startDay, startMonth, endtDay, endMonth];
};

export const getStartEndEvent = (start, end) => {
  const startTime = moment(start).format(`HH:mm`);
  const endTime = moment(end).format(`HH:mm`);

  return [startTime, endTime];
};

export const getMonth = (date) => {
  const monthIndex = moment(date).get(`month`);

  return MONTHS[monthIndex];
};

export const getDay = (date) => {
  const day = moment(date).get(`date`);

  return day;
};


export const getDurationTime = (start, end) => {
  const a = moment(start);
  const b = moment(end);

  const duration = moment.duration(b.diff(a));

  const day = duration.get(`day`);
  const hours = duration.get(`hour`);
  const minutes = duration.get(`minutes`);

  return `${day > 0 ? `${day}D` : ``} ${hours > 0 ? `${hours}H` : ``} ${minutes}M`;
};

export const getDurationTimeInMinutes = (start, end) => {
  const a = moment(start);
  const b = moment(end);

  return moment(b).diff(a, `minutes`);
};

export const getConvertTimeSpent = (minute) => {
  const hour = moment.duration(minute, `minute`).asHours().toFixed(0);

  return hour;
};

