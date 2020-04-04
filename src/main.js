
const DAY_NUMBER = 1;
const QUANTITY_PINS = 3;

import {createInfoDestinationTemplate} from './components/infoDestination';
import {createInfoCostTemplate} from './components/infoCost';
import {createNavTemplate} from './components/navigation';
import {createFilterTemplate} from './components/filter';
import {createSortTemplate} from './components/sort';
import {createEventEditTemplate} from './components/eventEdit';
import {createDayCounterTemplate} from './components/dayCounter';
import {createDayTemplate} from './components/day';
import {createEventPointTemplate} from './components/eventPoint';

const renderElementTemplate = (container, template, place = `beforeend`) => {
  return container.insertAdjacentHTML(place, template);
};

const mainTrip = document.querySelector(`.trip-main`);
renderElementTemplate(mainTrip, createInfoDestinationTemplate(), `afterbegin`);

const tripInfo = mainTrip.querySelector(`.trip-info`);
renderElementTemplate(tripInfo, createInfoCostTemplate());

const tripControls = mainTrip.querySelector(`.trip-controls`);
const firstElement = tripControls.querySelector(`:first-child`);
renderElementTemplate(firstElement, createNavTemplate(), `afterend`);
renderElementTemplate(tripControls, createFilterTemplate());

const tripEvents = document.querySelector(`.trip-events`);
renderElementTemplate(tripEvents, createSortTemplate());
renderElementTemplate(tripEvents, createEventEditTemplate());

renderElementTemplate(tripEvents, createDayCounterTemplate());

const dayContainer = tripEvents.querySelector(`.trip-days`);

for (let i = 0; i < DAY_NUMBER; i++) {
  renderElementTemplate(dayContainer, createDayTemplate());
  const tripEventsContainers = tripEvents.querySelectorAll(`.trip-events__list`);

  for (let k = 0; k < QUANTITY_PINS; k++) {
    renderElementTemplate(tripEventsContainers[i], createEventPointTemplate());
  }
}

