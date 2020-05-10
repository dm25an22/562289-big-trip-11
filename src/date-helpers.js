import {MONTHS} from "./consts";
import moment from "moment";

const getDurationTravel = (data) => {
  const startDay = moment(data[0]).get(`date`);
  const startMonth = MONTHS[moment(data[0]).get(`month`)];

  const endtDay = moment(data[data.length - 1]).get(`date`);
  const endMonth = MONTHS[moment(data[data.length - 1]).get(`month`)];

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

  const hours = duration.get(`hour`);
  const minutes = duration.get(`minutes`);

  return `${hours > 0 ? `${hours}H` : ``} ${minutes}M`;
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
