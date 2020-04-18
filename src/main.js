import DayCounterComponent from "./components/day-counter";
import DayComponent from "./components/day";
import EventPointComponent from "./components/event-point";
import EventEditComponent from "./components/eventEdit";
import FilterComponent from "./components/filter";
import InfoCostComponent from "./components/info-cost";
import InfoDestinationComponent from "./components/info-destination";
import NavigationComponent from "./components/navigation";
import SortComponent from "./components/sort";

import {mockData, datesList} from "./mock/points";
import {getTotalPrice, getRodLine, render} from "./utils";
import {getDurationTravel} from "./date-helpers";
import {RenderPosition} from "./consts";

const totalPrice = getTotalPrice(mockData);
const roadLine = getRodLine(mockData);
const durationTravel = getDurationTravel(datesList);

const mainTrip = document.querySelector(`.trip-main`);
render(mainTrip, new InfoDestinationComponent(roadLine, durationTravel).getElement(), RenderPosition.AFTERBEGIN);

const tripInfo = mainTrip.querySelector(`.trip-info`);
render(tripInfo, new InfoCostComponent(totalPrice).getElement(), RenderPosition.BEFOREEND);

const tripControls = mainTrip.querySelector(`.trip-controls`);
const firstElement = tripControls.querySelector(`:first-child`);
render(firstElement, new NavigationComponent().getElement(), RenderPosition.AFTER);
render(tripControls, new FilterComponent().getElement(), RenderPosition.BEFOREEND);

const tripEvents = document.querySelector(`.trip-events`);
render(tripEvents, new SortComponent().getElement(), RenderPosition.BEFOREEND);
render(tripEvents, new DayCounterComponent().getElement(), RenderPosition.BEFOREEND);

const dayContainer = tripEvents.querySelector(`.trip-days`);

const renderPoint = (dayNumber, point) => {
  const eventPoint = new EventPointComponent(point);
  const eventPointEdit = new EventEditComponent(point);

  const eventRollupBtn = eventPoint.getElement().querySelector(`.event__rollup-btn`);

  const onEventRollupBtnClick = () => {
    dayNumber.replaceChild(eventPointEdit.getElement(), eventPoint.getElement());
  };

  const onEventPointSubmit = () => {
    dayNumber.replaceChild(eventPoint.getElement(), eventPointEdit.getElement());
  };

  eventRollupBtn.addEventListener((`click`), onEventRollupBtnClick);
  eventPointEdit.getElement().addEventListener((`submit`), onEventPointSubmit);

  render(dayNumber, eventPoint.getElement(), RenderPosition.BEFOREEND);
};

const renderDay = () => {

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

