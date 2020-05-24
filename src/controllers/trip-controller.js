import SortComponent, {SortType} from "../components/sort";
import NoPointsComponent from "../components/no-points";
import InfoDestinationComponent from "../components/info-destination";
import DayComponent from "../components/day";
import InfoCostComponent from "../components/info-cost";
import DayCounterComponent from "../components/day-counter";
import PointController, {Mode, emptyPoint} from "./point-controller";
import {HIDDEN_CLASS} from "../consts";


import {getDurationTravel} from "../date-helpers";
import {getRodLine, getTotalPrice, getSortedPoints} from "../utils/common";
import {RenderPosition, render, remove} from "../utils/render";
import moment from "moment";

const renderPoint = (container, points, onDataChange, onViewChange, destinationModel, offerModel) => {
  return points.map((it) => {
    const pointController = new PointController(container, onDataChange, onViewChange, destinationModel, offerModel);
    pointController.render(it, Mode.DEFAULT);

    return pointController;
  });
};

export default class TripController {
  constructor(api, tripInfoComponent, pointsModel, destinationModel, offerModel, filterController) {

    this._api = api;
    this._tripInfoComponent = tripInfoComponent;
    this._pointsModel = pointsModel;
    this._destinationModel = destinationModel;
    this._offerModel = offerModel;
    this._filterController = filterController;
    this._pointControllers = [];
    this._createNewPoint = null;

    this._tripEvents = document.querySelector(`.trip-events`);
    this._tripEventsFirstChild = this._tripEvents.querySelector(`:first-child`);
    this._noPointsComponent = new NoPointsComponent();
    this._infoDestinationComponent = null;
    this._infoCostComponent = null;
    this._dayCounterComponent = new DayCounterComponent();
    this._dayControllers = [];
    this._sortComponent = new SortComponent();
    this._sortComponent.setSortTypeChangeHandler(this._onSortTypeChangeHandler.bind(this));
    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._pointsModel.setFilterHandler(this._onFilterChange.bind(this));
  }

  render() {
    const points = this._pointsModel.getPoints();

    render(this._tripEvents, this._noPointsComponent, RenderPosition.BEFOREEND);
    this._noPointsComponent.hideElement();

    render(this._tripEventsFirstChild, this._sortComponent, RenderPosition.AFTER);
    this._sortComponent.hideElement();


    render(this._tripEvents, this._dayCounterComponent, RenderPosition.BEFOREEND);

    if (!points.length) {
      this._noPointsComponent.showElement();

      if (this._infoDestinationComponent) {
        this._infoDestinationComponent.hideElement();
      }
      return;
    }

    this._sortComponent.showElement();

    this._renderPoints(points);
  }


  _renderPoints(points, isSort = false) {
    const tripInfoContainer = this._tripInfoComponent.getElement();
    const dayContainer = this._dayCounterComponent.getElement();

    this._pointControllers = this._renderEvents(tripInfoContainer, dayContainer, points, this._onDataChange, this._onViewChange, isSort);
  }

  _renderEvents(tripInfoContainer, dayContainer, points, onDataChange, onViewChange, isSort) {
    let pointControllers = [];

    if (isSort) {
      const dayComponent = new DayComponent();
      this._dayControllers.push(dayComponent);
      render(dayContainer, dayComponent, RenderPosition.BEFOREEND);

      const day = dayComponent.getElement().querySelector(`.trip-events__list`);
      const tripSortItemDay = document.querySelector(`.trip-sort__item--day`);


      const dayInfo = dayContainer.querySelector(`.day__info`);
      dayInfo.innerHTML = ``;
      tripSortItemDay.textContent = ``;

      const newPoint = renderPoint(day, points, onDataChange, onViewChange, this._destinationModel, this._offerModel);
      pointControllers = pointControllers.concat(newPoint);

    } else {

      const datesList = [...new Set(points.map((elem) => moment(elem.start).format(`YYYY-MM-DD`)))];
      datesList.sort((a, b) => new Date(a) - new Date(b));

      const roadLine = getRodLine(points);
      const durationTravel = getDurationTravel(datesList);
      const totalPrice = getTotalPrice(points);

      this._infoCostComponent = new InfoCostComponent(totalPrice);
      render(tripInfoContainer, this._infoCostComponent, RenderPosition.BEFOREEND);
      this._infoDestinationComponent = new InfoDestinationComponent(roadLine, durationTravel);
      render(tripInfoContainer, this._infoDestinationComponent, RenderPosition.AFTERBEGIN);

      datesList.forEach((date, i) => {
        const dayComponent = new DayComponent(date, i + 1);
        this._dayControllers.push(dayComponent);
        render(dayContainer, dayComponent, RenderPosition.BEFOREEND);
        const day = dayComponent.getElement().querySelector(`.trip-events__list`);

        const pointsFilter = points.filter((el) => moment(el.start).format(`YYYY-MM-DD`) === date);

        const newPoint = renderPoint(day, pointsFilter, onDataChange, onViewChange, this._destinationModel, this._offerModel);
        pointControllers = pointControllers.concat(newPoint);
      });
    }

    return pointControllers;
  }

  _onDataChange(pointController, oldData, newData, isFavotite = false) {
    if (oldData === emptyPoint) {
      this._createNewPoint = null;
      if (newData === null) {
        pointController.destroy();
        this._updateTripEvents();
      } else {
        this._api.createPoint(newData)
          .then((pointModel) => {
            this._pointsModel.addPoint(pointModel);
            pointController.destroy();
            this._updateTripEvents();
          });
      }
    } else if (newData === null) {
      this._api.deletePoint(oldData.id)
        .then(() => {
          this._pointsModel.removePoint(oldData.id);
          this._updateTripEvents();
        });
    } else {
      this._api.updataPoints(oldData.id, newData)
        .then((pointData) => {
          const isSuccess = this._pointsModel.updatePoints(oldData.id, pointData);

          if (isSuccess) {
            if (isFavotite) {
              pointController.render(pointData, Mode.EDIT);
            } else {
              this._updateTripEvents();
            }
          }
        });

    }

    this._isExistPoints();
  }

  _isExistPoints() {
    if (!this._pointsModel.getPointsAll().length) {
      this._noPointsComponent.showElement();
      this._sortComponent.hideElement();
      this._infoDestinationComponent.hideElement();
    } else {
      this._sortComponent.showElement();
      this._noPointsComponent.hideElement();
    }
  }

  createNewPoint() {
    if (this._createNewPoint) {
      return;
    }

    if (!this._pointsModel.getPointsAll().length) {
      if (this._infoDestinationComponent) {
        this._infoDestinationComponent.hideElement();
      }
    } else {
      this._sortComponent.resetSort();
      this._filterController.resetFlter();
    }

    if (!this._noPointsComponent.getElement().classList.contains(HIDDEN_CLASS)) {
      this._noPointsComponent.hideElement();
    }

    this._createNewPoint = new PointController(this._dayCounterComponent.getElement(), this._onDataChange, this._onViewChange, this._destinationModel, this._offerModel);
    this._createNewPoint.render(emptyPoint, Mode.ADDING, true);
  }

  _onViewChange() {
    this._pointControllers.forEach((it) => it.setDefaultView());
  }

  _removeEvents() {
    this._pointControllers.forEach((pointController) => pointController.destroy());
    this._pointControllers = [];

    this._dayControllers.forEach((it) => remove(it));
    this._dayControllers = [];
  }

  _clearHeader() {
    if (this._infoDestinationComponent) {
      remove(this._infoDestinationComponent);
      this._infoDestinationComponent = null;
    }

    if (this._infoCostComponent) {
      remove(this._infoCostComponent);
      this._infoCostComponent = null;
    }
  }

  _updateTripEvents() {
    this._removeEvents();
    this._clearHeader();

    this._renderPoints(this._pointsModel.getPoints());
  }

  _onSortTypeChangeHandler(typeSort) {
    const tripSortItemDay = document.querySelector(`.trip-sort__item--day`);
    const sortedPoints = getSortedPoints(typeSort, this._pointsModel.getPoints());

    this._removeEvents();

    if (typeSort === SortType.EVENT) {
      tripSortItemDay.textContent = `Day`;
      this._clearHeader();
      this._renderPoints(sortedPoints);
      return;
    }
    this._renderPoints(sortedPoints, true);
  }

  _onFilterChange() {
    this._sortComponent.resetSort();
    this._updateTripEvents();

    if (!this._pointsModel.getPoints().length) {
      this._infoDestinationComponent.hideElement();
    }
  }

}

