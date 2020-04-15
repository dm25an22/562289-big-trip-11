import {createInfoDestinationTemplate} from './components/infoDestination';
import {createInfoCostTemplate} from './components/infoCost';
import {createNavTemplate} from './components/navigation';
import {createFilterTemplate} from './components/filter';
import {createSortTemplate} from './components/sort';
import {createEventEditTemplate} from './components/eventEdit';
import {createDayCounterTemplate} from './components/dayCounter';
import {createDayTemplate} from './components/day';
import {createEventPointTemplate} from './components/eventPoint';
import {mockData, datesList} from "./mock/points";


const data = mockData.slice(1);

const renderElementTemplate = (container, template, place = `beforeend`) => {
  return container.insertAdjacentHTML(place, template);
};

const mainTrip = document.querySelector(`.trip-main`);
renderElementTemplate(mainTrip, createInfoDestinationTemplate(data, datesList), `afterbegin`);

const tripInfo = mainTrip.querySelector(`.trip-info`);
renderElementTemplate(tripInfo, createInfoCostTemplate(data));

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

  data
    .filter((el) => new Date(el.start).toDateString() === date)
    .forEach((it) => renderElementTemplate(days[i], createEventPointTemplate(it)));
});

