import SortComponent from "../components/sort";
import NoPointsComponent from "../components/no-points";
import InfoDestinationComponent from "../components/info-destination";
import DayComponent from "../components/day";
import InfoCostComponent from "../components/info-cost";
import DayCounterComponent from "../components/day-counter";
import PointController, {emptyPoint} from "./point-controller";
import {Mode, RenderPosition, SortType} from "../enum";
import {HIDDEN_CLASS} from "../consts";
import {getDurationTravel} from "../date-helpers";
import {getRodLine, getTotalPrice, getSortedPoints} from "../utils/common";
import {render, remove} from "../utils/render";
import moment from "moment";

const buttonAdd = document.querySelector(`.trip-main__event-add-btn`);
const tripEvents = document.querySelector(`.trip-events`);
const tripEventsFirstChild = tripEvents.querySelector(`:first-child`);

const renderPoint = (container, points, onDataChange, onViewChange, destinationModel, offerModel) => {
  return points.map((it) => {
    const pointController = new PointController(container, onDataChange, onViewChange, destinationModel, offerModel);
    pointController.render(it, Mode.DEFAULT);

    return pointController;
  });
};
export default class TripController {
  constructor(api, tripInfoComponent, pointsModel, destinationModel, offerModel) {

    this._api = api;
    this._tripInfoComponent = tripInfoComponent;

    this._pointsModel = pointsModel;
    this._destinationModel = destinationModel;
    this._offerModel = offerModel;

    this._pointControllers = [];
    this._dayComponents = [];

    this._createNewPoint = null;
    this._infoDestinationComponent = null;
    this._infoCostComponent = null;

    this._noPointsComponent = new NoPointsComponent();
    this._dayCounterComponent = new DayCounterComponent();
    this._sortComponent = new SortComponent();

    this._sortComponent.setSortTypeChangeHandler(this._onSortTypeChangeHandler.bind(this));
    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._pointsModel.setFilterHandler(this._onFilterChange.bind(this));
  }

  render() {
    const points = this._pointsModel.getPoints();

    render(tripEvents, this._noPointsComponent, RenderPosition.BEFOREEND);
    render(tripEventsFirstChild, this._sortComponent, RenderPosition.AFTER);
    render(tripEvents, this._dayCounterComponent, RenderPosition.BEFOREEND);

    this._noPointsComponent.hideElement();
    this._sortComponent.hideElement();

    if (!points.length) {
      this._noPointsComponent.showElement();

      if (this._infoDestinationComponent) {
        this._infoDestinationComponent.hideElement();
      }
      return;
    }

    this._sortComponent.showElement();

    this._renderEvents(points, this._onDataChange, this._onViewChange);
  }

  hide() {
    tripEvents.classList.add(HIDDEN_CLASS);
    this._sortComponent.resetSort();
  }

  show() {
    tripEvents.classList.remove(HIDDEN_CLASS);
  }

  renderInfo(totalPrice, roadLine, durationTravel) {
    this._infoCostComponent = new InfoCostComponent(totalPrice);
    this._infoDestinationComponent = new InfoDestinationComponent(roadLine, durationTravel);
    render(this._tripInfoComponent.getElement(), this._infoCostComponent, RenderPosition.BEFOREEND);
    render(this._tripInfoComponent.getElement(), this._infoDestinationComponent, RenderPosition.AFTERBEGIN);
  }

  createNewPoint() {
    if (this._createNewPoint) {
      return;
    }

    this._pointControllers.forEach((it) => it.setDefaultView());
    buttonAdd.disabled = true;

    if (!this._pointsModel.getPointsAll().length) {
      if (this._infoDestinationComponent) {
        this._infoDestinationComponent.hideElement();
      }
    }

    if (!this._noPointsComponent.getElement().classList.contains(HIDDEN_CLASS)) {
      this._noPointsComponent.hideElement();
    }

    this._createNewPoint = new PointController(this._dayCounterComponent.getElement(), this._onDataChange, this._onViewChange, this._destinationModel, this._offerModel);
    this._createNewPoint.render(emptyPoint, Mode.ADDING, true);
  }

  removeCreateNewPoint() {
    if (this._createNewPoint) {
      this._createNewPoint.destroy();
      this._createNewPoint = null;
      buttonAdd.disabled = false;
    }
  }

  _renderEvents(points, onDataChange, onViewChange, isSort = false) {
    const dayContainer = this._dayCounterComponent.getElement();
    let pointControllers = [];

    const datesList = [...new Set(points.map((elem) => moment(elem.start).format(`YYYY-MM-DD`)))];
    datesList.sort((a, b) => new Date(a) - new Date(b));

    const durationTravel = getDurationTravel(datesList);
    const totalPrice = getTotalPrice(points);

    if (isSort) {
      const dayComponent = new DayComponent();
      this._dayComponents.push(dayComponent);
      render(dayContainer, dayComponent, RenderPosition.BEFOREEND);

      const day = dayComponent.getElement().querySelector(`.trip-events__list`);
      const tripSortItemDay = document.querySelector(`.trip-sort__item--day`);


      const dayInfo = dayContainer.querySelector(`.day__info`);
      dayInfo.innerHTML = ``;
      tripSortItemDay.textContent = ``;

      const roadLine = getRodLine(this._pointsModel.getPointsAll());
      this.renderInfo(totalPrice, roadLine, durationTravel);

      const newPoint = renderPoint(day, points, onDataChange, onViewChange, this._destinationModel, this._offerModel);
      pointControllers = pointControllers.concat(newPoint);

    } else {

      const roadLine = getRodLine(points);
      this.renderInfo(totalPrice, roadLine, durationTravel);

      datesList.forEach((date, i) => {
        const dayComponent = new DayComponent(date, i + 1);
        this._dayComponents.push(dayComponent);
        render(dayContainer, dayComponent, RenderPosition.BEFOREEND);
        const day = dayComponent.getElement().querySelector(`.trip-events__list`);

        const pointsFilter = points.filter((el) => moment(el.start).format(`YYYY-MM-DD`) === date);
        pointsFilter.sort((a, b) => a.start - b.start);

        const newPoint = renderPoint(day, pointsFilter, onDataChange, onViewChange, this._destinationModel, this._offerModel);
        pointControllers = pointControllers.concat(newPoint);
      });
    }

    this._pointControllers = pointControllers;
  }

  _onDataChange(pointController, oldData, newData, isFavotite = false) {
    if (oldData === emptyPoint) {
      this._createNewPoint = null;
      if (newData === null) {
        pointController.destroy();
        buttonAdd.disabled = false;
      } else {
        this._api.createPoint(newData)
          .then((pointModel) => {
            this._pointsModel.addPoint(pointModel);
            pointController.destroy();
            this._sortComponent.resetSort();
            this._updateTripEvents();
            this._isExistPoints();
            buttonAdd.disabled = false;
          })
          .catch(() => {
            pointController.shake();
          });
      }
    } else if (newData === null) {
      this._api.deletePoint(oldData.id)
        .then(() => {
          this._pointsModel.removePoint(oldData.id);
          this._updateTripEvents();
          this._isExistPoints();
        })
        .catch(() => {
          pointController.shake();
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
        })
        .catch(() => {
          pointController.shake();
        });
    }
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

  _onViewChange() {
    this.removeCreateNewPoint();
    this._pointControllers.forEach((it) => it.setDefaultView());
  }

  _removeEvents() {
    this._pointControllers.forEach((pointController) => pointController.destroy());
    this._pointControllers = [];

    this._dayComponents.forEach((it) => remove(it));
    this._dayComponents = [];
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
    this._renderWithSortType(this._sortComponent.getCurrentSortType());
    this._pointsModel.blockFilterButton();
  }

  _renderWithSortType(typeSort) {
    this.removeCreateNewPoint();
    const tripSortItemDay = document.querySelector(`.trip-sort__item--day`);
    const sortedPoints = getSortedPoints(typeSort, this._pointsModel.getPoints());

    if (typeSort === SortType.EVENT) {
      tripSortItemDay.textContent = `Day`;
      this._renderEvents(sortedPoints, this._onDataChange, this._onViewChange);
      return;
    }
    this._renderEvents(sortedPoints, this._onDataChange, this._onViewChange, true);
  }

  _onSortTypeChangeHandler(typeSort) {
    this._removeEvents();
    this._clearHeader();
    this._renderWithSortType(typeSort);
  }

  _onFilterChange() {
    this.removeCreateNewPoint();
    this._sortComponent.resetSort();
    this._updateTripEvents();

    if (!this._pointsModel.getPoints().length) {
      this._infoDestinationComponent.hideElement();
    }
  }

}

