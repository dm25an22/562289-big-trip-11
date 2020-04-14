import {createInfoDestinationTemplate} from './components/infoDestination';
import {createInfoCostTemplate} from './components/infoCost';
import {createNavTemplate} from './components/navigation';
import {createFilterTemplate} from './components/filter';
import {createSortTemplate} from './components/sort';
import {createEventEditTemplate} from './components/eventEdit';
import {createDayCounterTemplate} from './components/dayCounter';
import {createDayTemplate} from './components/day';
import {createEventPointTemplate} from './components/eventPoint';
import {mockData} from "./mock/points";
import {renderDaysData} from "./mock/days";


const DAY_NUMBER = 4;

const data = mockData.slice(1);
const daysData = renderDaysData(DAY_NUMBER);

const renderElementTemplate = (container, template, place = `beforeend`) => {
  return container.insertAdjacentHTML(place, template);
};

const mainTrip = document.querySelector(`.trip-main`);
renderElementTemplate(mainTrip, createInfoDestinationTemplate(mockData), `afterbegin`);

const tripInfo = mainTrip.querySelector(`.trip-info`);
renderElementTemplate(tripInfo, createInfoCostTemplate(mockData));

const tripControls = mainTrip.querySelector(`.trip-controls`);
const firstElement = tripControls.querySelector(`:first-child`);
renderElementTemplate(firstElement, createNavTemplate(), `afterend`);
renderElementTemplate(tripControls, createFilterTemplate());

const tripEvents = document.querySelector(`.trip-events`);
renderElementTemplate(tripEvents, createSortTemplate());
renderElementTemplate(tripEvents, createEventEditTemplate(mockData[0]));

renderElementTemplate(tripEvents, createDayCounterTemplate());

const dayContainer = tripEvents.querySelector(`.trip-days`);

for (let i = 0; i < DAY_NUMBER; i++) {
  renderElementTemplate(dayContainer, createDayTemplate(daysData[i]));
}

const tripEventsContainers = tripEvents.querySelectorAll(`.trip-events__list`);

let startCount = 0;
let eventPerDay = data.length / DAY_NUMBER;

for (let t = 0; t < tripEventsContainers.length; t++) {
  const prevCount = startCount;
  startCount = startCount + Math.ceil(eventPerDay);

  data.slice(prevCount, startCount)
    .forEach((it) => renderElementTemplate(tripEventsContainers[t], createEventPointTemplate(it)));
}
