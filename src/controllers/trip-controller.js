import SortComponent, {SortType} from "../components/sort";
import NoPointsComponent from "../components/no-points";
import InfoDestinationComponent from "../components/info-destination";
import DayComponent from "../components/day";
import InfoCostComponent from "../components/info-cost";
import PointController from "./point-controller";

import {getDurationTravel} from "../date-helpers";
import {getRodLine, getTotalPrice, getSortedPoints} from "../utils/common";
import {RenderPosition, render} from "../utils/render";


const renderPoint = (container, points, onDataChange) => {

  points.forEach((point) => {
    const pointController = new PointController(container, onDataChange);
    pointController.render(point);
  });
};

const renderEvents = (tripInfoContainer, dayContainer, points, onDataChange, isSort = false) => {

  if (isSort) {
    const dayComponent = new DayComponent();
    render(dayContainer, dayComponent, RenderPosition.BEFOREEND);

    const day = dayComponent.getElement().querySelector(`.trip-events__list`);
    const tripSortItemDay = document.querySelector(`.trip-sort__item--day`);


    const dayInfo = dayContainer.querySelector(`.day__info`);
    dayInfo.innerHTML = ``;
    tripSortItemDay.textContent = ``;

    renderPoint(day, points, onDataChange);
    return;
  }

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

    renderPoint(day, pointsFilter, onDataChange);

  });

};

export default class TripController {
  constructor(tripEventsContainer, tripInfoContainer, dayContainer) {

    this._tripEvents = tripEventsContainer;
    this._tripInfoContainer = tripInfoContainer;
    this._dayContainer = dayContainer;
    this._points = [];

    this._noPointsComponent = new NoPointsComponent();
    this._sortComponent = new SortComponent();
    this._onDataChange = this._onDataChange.bind(this);
  }

  render(points) {
    this._tripInfoContainer = this._tripInfoContainer.getElement();
    this._dayContainer = this._dayContainer.getElement();
    this._points = points;

    if (!points.length) {
      render(this._tripEvents, this._noPointsComponent, RenderPosition.BEFOREEND);
      render(this._tripInfoContainer, new InfoCostComponent(), RenderPosition.BEFOREEND);
      return;
    }

    const tripEventsFirstChild = this._tripEvents.querySelector(`:first-child`);
    render(tripEventsFirstChild, this._sortComponent, RenderPosition.AFTER);


    renderEvents(this._tripInfoContainer, this._dayContainer, points, this._onDataChange);
    this._onSortTypeChangeHandler();

  }

  _onDataChange(pintController, oldElement, newElement) {
    const index = this._points.findIndex((it) => it === oldElement);

    if (index === -1) {
      return;
    }
    this._points = [].concat(this._points.slice(0, index), newElement, this._points.slice(index + 1));

    pintController.render(this._points[index]);
  }

  _onSortTypeChangeHandler() {
    this._sortComponent.setSortTypeChangeHandler((typeSort) => {

      const tripSortItemDay = this._tripEvents.querySelector(`.trip-sort__item--day`);
      const sortedPoints = getSortedPoints(typeSort, this._points);

      this._dayContainer.innerHTML = ``;

      if (typeSort === SortType.EVENT) {
        tripSortItemDay.textContent = `Day`;
        this._tripInfoContainer.innerHTML = ``;
        renderEvents(this._tripInfoContainer, this._dayContainer, sortedPoints, this._onDataChange);
        return;
      }
      renderEvents(this._tripInfoContainer, this._dayContainer, sortedPoints, this._onDataChange, true);

    });
  }

}

