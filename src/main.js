import DayCounterComponent from "./components/day-counter";
import DayComponent from "./components/day";
import EventPointComponent from "./components/event-point";
import EventEditComponent from "./components/event-edit";
import TripInfoComponent from "./components/trip-info";
import FilterComponent from "./components/filter";
import InfoCostComponent from "./components/info-cost";
import InfoDestinationComponent from "./components/info-destination";
import NavigationComponent from "./components/navigation";
import SortComponent from "./components/sort";
import NoPointsComponent from "./components/no-points";

import {mockData, datesList} from "./mock/points";
import {getTotalPrice, getRodLine, render} from "./utils";
import {getDurationTravel} from "./date-helpers";
import {RenderPosition} from "./consts";

const totalPrice = getTotalPrice(mockData);

const mainTrip = document.querySelector(`.trip-main`);

render(mainTrip, new TripInfoComponent().getElement(), RenderPosition.AFTERBEGIN);
const tripInfoContainer = mainTrip.querySelector(`.trip-main__trip-info `);

render(tripInfoContainer, new InfoCostComponent(totalPrice).getElement(), RenderPosition.BEFOREEND);

const tripControls = mainTrip.querySelector(`.trip-controls`);
const firstElement = tripControls.querySelector(`:first-child`);
render(firstElement, new NavigationComponent().getElement(), RenderPosition.AFTER);
render(tripControls, new FilterComponent().getElement(), RenderPosition.BEFOREEND);

const tripEvents = document.querySelector(`.trip-events`);

render(tripEvents, new DayCounterComponent().getElement(), RenderPosition.BEFOREEND);

const dayContainer = tripEvents.querySelector(`.trip-days`);

const renderPoint = (dayNumber, point) => {
  const eventPoint = new EventPointComponent(point);
  const eventPointEdit = new EventEditComponent(point);

  const eventRollupBtn = eventPoint.getElement().querySelector(`.event__rollup-btn`);

  const replacePointToEdit = () => {
    dayNumber.replaceChild(eventPointEdit.getElement(), eventPoint.getElement());
  };

  const replaceEditToPoint = () => {
    dayNumber.replaceChild(eventPoint.getElement(), eventPointEdit.getElement());
  };

  const onEscPress = (evt) => {
    const isEsc = evt.key === `Escape` || evt.key === `Esc`;

    if (isEsc) {
      replaceEditToPoint();
      document.removeEventListener(`keydown`, onEscPress);
    }
  };

  eventRollupBtn.addEventListener((`click`), () => {
    replacePointToEdit();
    document.addEventListener(`keydown`, onEscPress);
  });

  eventPointEdit.getElement().addEventListener(`submit`, (evt) => {
    evt.preventDefault();
    replaceEditToPoint();
  });

  render(dayNumber, eventPoint.getElement(), RenderPosition.BEFOREEND);
};

const renderDay = () => {

  if (!mockData.length) {
    render(tripEvents, new NoPointsComponent().getElement(), RenderPosition.BEFOREEND);
    return;
  }

  const roadLine = getRodLine(mockData);
  const durationTravel = getDurationTravel(datesList);

  render(tripInfoContainer, new InfoDestinationComponent(roadLine, durationTravel).getElement(), RenderPosition.AFTERBEGIN);
  render(tripEvents, new SortComponent().getElement(), RenderPosition.AFTERBEGIN);

  datesList.forEach((date, i) => {
    render(dayContainer, new DayComponent(date, i + 1).getElement(), RenderPosition.BEFOREEND);
    const days = tripEvents.querySelectorAll(`.trip-events__list`);

    mockData
    .filter((el) => new Date(el.start).toDateString() === date)
    .forEach((it) => {
      renderPoint(days[i], it);

    });
  });

};

renderDay();

