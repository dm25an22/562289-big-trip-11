export default class Points {
  constructor() {
    this._points = [];
  }

  getPoints() {
    return this._points;
  }

  setPoints(data) {
    this._points = data;
  }

  updatePoints(id, newPoint) {
    const index = this._points.findIndex((it) => it.id === id);

    if (index === -1) {
      return false;
    }

    this._points = [].concat(this._points.slice(0, index), newPoint, this._points.slice(index + 1));

    return true;
  }

}
