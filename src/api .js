import Point from "./models/point";

const Method = {
  GET: `GET`,
  PUT: `PUT`,
  POST: `POST`,
  DELETE: `DELETE`
};

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  throw new Error(`${response.status} : ${response.statusText}`);
};

export default class API {
  constructor(endPoint, authorization) {
    this._endPoint = endPoint;
    this.authorization = authorization;
  }

  getPoints() {
    return this._load({url: `points`})
      .then(checkStatus)
      .then((response) => response.json())
      .then(Point.parsePoints);
  }

  getDestination() {
    return this._load({url: `destinations`})
      .then(checkStatus)
      .then((response) => response.json());
  }

  getOffers() {
    return this._load({url: `offers`})
      .then(checkStatus)
      .then((response) => response.json());
  }

  createPoint(newData) {
    return this._load({
      url: `points`,
      method: Method.POST,
      body: JSON.stringify(newData.toRAW()),
      headers: new Headers({"Content-Type": `application/json`})
    })
      .then((response) => response.json())
      .then(Point.parsePoint);
  }

  deletePoint(id) {
    return this._load({
      url: `points/${id}`,
      method: Method.DELETE
    });
  }

  updataPoints(id, newData) {

    return this._load({
      url: `points/${id}`,
      method: Method.PUT,
      body: JSON.stringify(newData.toRAW()),
      headers: new Headers({"Content-Type": `application/json`})
    })
      .then((response) => response.json())
      .then(Point.parsePoint);
  }

  _load({url, method = Method.GET, body = null, headers = new Headers()}) {
    headers.append(`Authorization`, this.authorization);

    return fetch(`${this._endPoint}/${url}`, {method, body, headers})
    .then(checkStatus)
    .catch((err) => {
      throw err;
    });
  }

}
