import SortComponent, {SortType} from "../components/sort";
import NoPointsComponent from "../components/no-points";
import InfoDestinationComponent from "../components/info-destination";
import DayComponent from "../components/day";
import EventPointComponent from "../components/event-point";
import EventEditComponent from "../components/event-edit";
import InfoCostComponent from "../components/info-cost";
import SortListComponent from "../components/list-sort";

import {getDurationTravel} from "../date-helpers";
import {getRodLine, getTotalPrice, getSortedPoints} from "../utils/common";
import {RenderPosition, render, replace} from "../utils/render";


const renderPoint = (container, points) => {

  points.forEach((point) => {

    const eventPoint = new EventPointComponent(point);
    const eventPointEdit = new EventEditComponent(point);

    const replacePointToEdit = () => {
      replace(eventPointEdit, eventPoint);
    };

    const replaceEditToPoint = () => {
      replace(eventPoint, eventPointEdit);
    };

    const onEscPress = (evt) => {
      const isEsc = evt.key === `Escape` || evt.key === `Esc`;

      if (isEsc) {
        replaceEditToPoint();
        document.removeEventListener(`keydown`, onEscPress);
      }
    };

    eventPoint.setClickHandler(() => {
      replacePointToEdit();
      document.addEventListener(`keydown`, onEscPress);
    });

    eventPointEdit.setSubmitHandler((evt) => {
      evt.preventDefault();
      replaceEditToPoint();
    });

    eventPointEdit.setClickHandler(() => {
      replaceEditToPoint();
    });

    render(container, eventPoint, RenderPosition.BEFOREEND);
  });
};

const renderPointsWithDay = (points, dayContainer, tripInfoContainer) => {

  const datesList = [...new Set(points.map((elem) => new Date(elem.start).toDateString()))];

  const roadLine = getRodLine(points);
  const durationTravel = getDurationTravel(datesList);
  const totalPrice = getTotalPrice(points);

  render(tripInfoContainer, new InfoCostComponent(totalPrice), RenderPosition.BEFOREEND);
  render(tripInfoContainer, new InfoDestinationComponent(roadLine, durationTravel), RenderPosition.AFTERBEGIN);

  datesList.forEach((date, i) => {
    const dayComponent = new DayComponent(date, i + 1);
    render(dayContainer, dayComponent, RenderPosition.BEFOREEND);
    const day = dayComponent.getElement().querySelector(`.trip-events__list`);

    const pointsFilter = points.filter((el) => new Date(el.start).toDateString() === date);

    renderPoint(day, pointsFilter);

  });
};

export default class TripController {
  constructor(tripEventsContainer, tripInfoContainer, dayContainer) {

    this._tripEvents = tripEventsContainer;
    this._tripInfoContainer = tripInfoContainer;
    this._dayContainer = dayContainer;

    this._noPointsComponent = new NoPointsComponent();
    this._sortComponent = new SortComponent();
  }

  render(points) {
    const tripInfoContainer = this._tripInfoContainer.getElement();
    const dayContainer = this._dayContainer.getElement();
    const tripEvents = this._tripEvents;

    if (!points.length) {
      render(tripEvents, this._noPointsComponent, RenderPosition.BEFOREEND);
      render(tripInfoContainer, new InfoCostComponent(), RenderPosition.BEFOREEND);
      return;
    }

    const tripEventsFirstChild = tripEvents.querySelector(`:first-child`);
    render(tripEventsFirstChild, this._sortComponent, RenderPosition.AFTER);

    this._sortComponent.setSortTypeChangeHandler((typeSort) => {

      const tripSortItemDay = tripEvents.querySelector(`.trip-sort__item--day`);
      const sortedPoints = getSortedPoints(typeSort, points);

      dayContainer.innerHTML = ``;

      if (typeSort === SortType.EVENT) {
        tripInfoContainer.innerHTML = ``;
        tripSortItemDay.textContent = `Day`;

        renderPointsWithDay(points, dayContainer, tripInfoContainer);
        return;
      }

      tripSortItemDay.textContent = ``;

      const sortListComponent = new SortListComponent();
      render(dayContainer, sortListComponent, RenderPosition.BEFOREEND);

      const tripEventsList = dayContainer.querySelector(`.trip-events__list`);
      renderPoint(tripEventsList, sortedPoints);

    });

    renderPointsWithDay(points, dayContainer, tripInfoContainer);

  }

}

