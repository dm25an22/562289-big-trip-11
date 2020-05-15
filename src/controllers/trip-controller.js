import SortComponent, {SortType} from "../components/sort";
import NoPointsComponent from "../components/no-points";
import InfoDestinationComponent from "../components/info-destination";
import DayComponent from "../components/day";
import InfoCostComponent from "../components/info-cost";
import DayCounterComponent from "../components/day-counter";
import PointController, {Mode, emptyPoint} from "./point-controller";

import {getDurationTravel} from "../date-helpers";
import {getRodLine, getTotalPrice, getSortedPoints} from "../utils/common";
import {RenderPosition, render, remove} from "../utils/render";
import moment from "moment";

const renderPoint = (container, points, onDataChange, onViewChange) => {
  return points.map((it) => {
    const pointController = new PointController(container, onDataChange, onViewChange);
    pointController.render(it, Mode.DEFAULT);

    return pointController;
  });
};

const renderEvents = (tripInfoContainer, dayContainer, points, onDataChange, onViewChange, isSort) => {

  let pointControllers = [];

  if (isSort) {
    const dayComponent = new DayComponent();
    render(dayContainer, dayComponent, RenderPosition.BEFOREEND);

    const day = dayComponent.getElement().querySelector(`.trip-events__list`);
    const tripSortItemDay = document.querySelector(`.trip-sort__item--day`);


    const dayInfo = dayContainer.querySelector(`.day__info`);
    dayInfo.innerHTML = ``;
    tripSortItemDay.textContent = ``;

    const newPoint = renderPoint(day, points, onDataChange, onViewChange);
    pointControllers = pointControllers.concat(newPoint);

  } else {

    const datesList = [...new Set(points.map((elem) => moment(elem.start).format(`YYYY-MM-DD`)))];

    const roadLine = getRodLine(points);
    const durationTravel = getDurationTravel(datesList);
    const totalPrice = getTotalPrice(points);

    render(tripInfoContainer, new InfoCostComponent(totalPrice), RenderPosition.BEFOREEND);
    render(tripInfoContainer, new InfoDestinationComponent(roadLine, durationTravel), RenderPosition.AFTERBEGIN);

    datesList.forEach((date, i) => {
      const dayComponent = new DayComponent(date, i + 1);
      render(dayContainer, dayComponent, RenderPosition.BEFOREEND);
      const day = dayComponent.getElement().querySelector(`.trip-events__list`);

      const pointsFilter = points.filter((el) => moment(el.start).format(`YYYY-MM-DD`) === date);

      const newPoint = renderPoint(day, pointsFilter, onDataChange, onViewChange);
      pointControllers = pointControllers.concat(newPoint);
    });
  }

  return pointControllers;
};

export default class TripController {
  constructor(tripInfoContainer, pointsModel, filterController) {

    this._tripInfoContainer = tripInfoContainer;
    this._pointsModel = pointsModel;
    this._filterController = filterController;
    this._pointControllers = [];
    this._createNewPoint = null;

    this._tripEvents = document.querySelector(`.trip-events`);
    this._tripEventsFirstChild = this._tripEvents.querySelector(`:first-child`);
    this._noPointsComponent = null;
    this._dayCounterComponent = new DayCounterComponent();
    this._sortComponent = new SortComponent();
    this._sortComponent.setSortTypeChangeHandler(this._onSortTypeChangeHandler.bind(this));
    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._pointsModel.setFilterHandler(this._onFilterChange.bind(this));
  }

  render() {
    const points = this._pointsModel.getPoints();

    if (!points.length) {
      this._noPointsComponent = new NoPointsComponent();
      render(this._tripEvents, this._noPointsComponent, RenderPosition.BEFOREEND);
      render(this._tripInfoContainer.getElement(), new InfoCostComponent(), RenderPosition.BEFOREEND);
      return;
    }

    render(this._tripEventsFirstChild, this._sortComponent, RenderPosition.AFTER);
    render(this._tripEvents, this._dayCounterComponent, RenderPosition.BEFOREEND);

    this._renderPoints(points);
  }

  _renderPoints(points, isSort = false) {
    const tripInfoContainer = this._tripInfoContainer.getElement();
    const dayContainer = this._dayCounterComponent.getElement();

    this._pointControllers = renderEvents(tripInfoContainer, dayContainer, points, this._onDataChange, this._onViewChange, isSort);
  }

  _onDataChange(pointController, oldData, newData) {
    if (oldData === emptyPoint) {
      this._creatingTask = null;
      if (newData === null) {
        pointController.destroy();
        this._updateTripEvents();
      } else {
        this._pointsModel.addPoint(newData);
        pointController.destroy();
        this._updateTripEvents();

        render(this._tripEventsFirstChild, this._sortComponent, RenderPosition.AFTER);
        this._sortComponent.setSortTypeChangeHandler(this._onSortTypeChangeHandler.bind(this));
      }
    } else if (newData === null) {
      this._pointsModel.removePoint(oldData.id);
      this._updateTripEvents();
    } else {
      const isSuccess = this._pointsModel.updatePoints(oldData.id, newData);
      if (isSuccess) {
        this._updateTripEvents();
      }
    }

    this._isExistPoints();
  }

  _isExistPoints() {
    if (!this._pointsModel.getPointsAll().length) {
      this._createNoPoints();
    } else {
      if (this._noPointsComponent) {
        remove(this._noPointsComponent);
        this._noPointsComponent = null;
      }
    }
  }

  createNewPoint() {
    this._sortComponent.resetSort();
    this._filterController.resetFlter();
    this._updateTripEvents();

    if (!this._pointsModel.getPointsAll().length) {
      this._clearInfoDestination();
    }

    this._createNewPoint = new PointController(this._dayCounterComponent.getElement(), this._onDataChange, this._onViewChange);
    this._createNewPoint.render(emptyPoint, Mode.ADDING, true);
  }

  _onViewChange() {
    this._pointControllers.forEach((it) => it.setDefaultView());
  }

  _createNoPoints() {
    this._clearInfoDestination();
    this._noPointsComponent = new NoPointsComponent();
    render(this._tripEvents, this._noPointsComponent, RenderPosition.BEFOREEND);
    remove(this._sortComponent);
  }

  _clearInfoDestination() {
    document.querySelector(`.trip-info__main`).innerHTML = ``;
  }

  _clearTripInfoContainer() {
    this._tripInfoContainer.getElement().innerHTML = ``;
  }

  _clearDayContainer() {
    this._dayCounterComponent.getElement().innerHTML = ``;
  }

  _removeEvents() {
    this._pointControllers.forEach((pointController) => pointController.destroy());
    this._clearTripInfoContainer();
    this._clearDayContainer();
    this._pointControllers = [];
  }

  _updateTripEvents() {
    this._removeEvents();
    this._renderPoints(this._pointsModel.getPoints());
  }

  _onSortTypeChangeHandler(typeSort) {
    const tripSortItemDay = document.querySelector(`.trip-sort__item--day`);
    const sortedPoints = getSortedPoints(typeSort, this._pointsModel.getPoints());

    this._clearDayContainer();

    if (typeSort === SortType.EVENT) {
      tripSortItemDay.textContent = `Day`;
      this._clearTripInfoContainer();
      this._renderPoints(sortedPoints);
      return;
    }
    this._renderPoints(sortedPoints, true);
  }

  _onFilterChange() {
    this._sortComponent.resetSort();
    this._updateTripEvents();

    if (!this._pointsModel.getPoints().length) {
      this._clearInfoDestination();
    }
  }

}

