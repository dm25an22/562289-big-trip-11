import {createInfoDestinationTemplate} from './components/info-destination';
import {createInfoCostTemplate} from './components/info-cost';
import {createNavTemplate} from './components/navigation';
import {createFilterTemplate} from './components/filter';
import {createSortTemplate} from './components/sort';
import {createEventEditTemplate} from './components/eventEdit';
import {createDayCounterTemplate} from './components/day-counter';
import {createDayTemplate} from './components/day';
import {createEventPointTemplate} from './components/event-point';
import {mockData, datesList} from "./mock/points";
import {getTotalPrice, getRodLine} from "./utils";
import {getDurationTravel} from "./date-helpers";

const totalPrice = getTotalPrice(mockData);
const roadLine = getRodLine(mockData);
const durationTravel = getDurationTravel(datesList);

const renderElementTemplate = (container, template, place = `beforeend`) => {
  return container.insertAdjacentHTML(place, template);
};

const mainTrip = document.querySelector(`.trip-main`);
renderElementTemplate(mainTrip, createInfoDestinationTemplate(roadLine, durationTravel), `afterbegin`);

const tripInfo = mainTrip.querySelector(`.trip-info`);
renderElementTemplate(tripInfo, createInfoCostTemplate(totalPrice));

const tripControls = mainTrip.querySelector(`.trip-controls`);
const firstElement = tripControls.querySelector(`:first-child`);
renderElementTemplate(firstElement, createNavTemplate(), `afterend`);
renderElementTemplate(tripControls, createFilterTemplate());

const tripEvents = document.querySelector(`.trip-events`);
renderElementTemplate(tripEvents, createSortTemplate());
renderElementTemplate(tripEvents, createEventEditTemplate(mockData[0]));

renderElementTemplate(tripEvents, createDayCounterTemplate());

const dayContainer = tripEvents.querySelector(`.trip-days`);


datesList.forEach((date, i) => {
  renderElementTemplate(dayContainer, createDayTemplate(date, i + 1));
  const days = tripEvents.querySelectorAll(`.trip-events__list`);

  mockData
  .slice(1)
    .filter((el) => new Date(el.start).toDateString() === date)
    .forEach((it) => renderElementTemplate(days[i], createEventPointTemplate(it)));
});

