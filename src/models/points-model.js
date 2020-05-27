import {getPointsByFilter} from "../utils/filters-utils";
import {FilterType} from "../enum";

export default class Points {
  constructor() {
    this._points = [];
    this._filterChangeHandlers = [];
    this._activeFilter = FilterType.EVERYTHING;
  }

  getPoints() {
    return getPointsByFilter(this._points, this._activeFilter);
  }

  getPointsAll() {
    return this._points;
  }

  setPoints(data) {
    this._points = data;
  }

  removePoint(id) {
    const index = this._points.findIndex((it) => it.id === id);

    if (index === -1) {
      return;
    }

    this._points = [].concat(this._points.slice(0, index), this._points.slice(index + 1));
  }

  addPoint(newData) {
    this._points.push(newData);
  }

  updatePoints(id, newPoint) {
    const index = this._points.findIndex((it) => it.id === id);

    if (index === -1) {
      return false;
    }

    this._points = [].concat(this._points.slice(0, index), newPoint, this._points.slice(index + 1));

    return true;
  }
  getActiveFilter() {
    return this._activeFilter;
  }

  blockFilterButton() {
    const filterPast = document.querySelector(`#filter-past`);
    const filterFuture = document.querySelector(`#filter-future`);

    if (!getPointsByFilter(this._points, FilterType.PAST).length) {
      filterPast.disabled = true;
    } else {
      filterPast.disabled = false;
    }

    if (!getPointsByFilter(this._points, FilterType.FUTURE).length) {
      filterFuture.disabled = true;
    } else {
      filterFuture.disabled = false;
    }
  }

  setFilter(filterName) {
    this._activeFilter = filterName;
    this._callHandlers(this._filterChangeHandlers);
  }

  setFilterHandler(handler) {
    this._filterChangeHandlers.push(handler);
  }

  _callHandlers(handler) {
    handler.forEach((it) => it());
  }

}
