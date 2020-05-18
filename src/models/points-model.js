import {getPoitsByFilter} from "../utils/filters-utils";
import {FilterType} from "../consts";

export default class Points {
  constructor() {
    this._points = [];
    this._filterChangeHandlers = [];
    this._activeFilter = FilterType.Everything;
  }

  getPoints() {
    return getPoitsByFilter(this._points, this._activeFilter);
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
