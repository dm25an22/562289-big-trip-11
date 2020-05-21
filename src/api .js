import Point from "./models/point-model";

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    throw new Error(`${response.status} : ${response.statusText}`);
  }
};

export default class API {
  constructor(authorization) {
    this.authorization = authorization;
  }

  getPoints() {
    const headers = new Headers();
    headers.append(`Authorization`, this.authorization);

    return fetch(`https://11.ecmascript.pages.academy/big-trip/points`, {headers})
      .then(checkStatus)
      .then((response) => response.json())
      .then(Point.parsePoints);
  }

  getDestination() {
    const headers = new Headers();
    headers.append(`Authorization`, this.authorization);

    return fetch(`https://11.ecmascript.pages.academy/big-trip/destinations`, {headers})
      .then(checkStatus)
      .then((response) => response.json());
  }

  getOffers() {
    const headers = new Headers();
    headers.append(`Authorization`, this.authorization);

    return fetch(`https://11.ecmascript.pages.academy/big-trip/offers`, {headers})
      .then(checkStatus)
      .then((response) => response.json());
  }

  updataPoints(oldDataId, newData) {
    const headers = new Headers();
    headers.append(`Authorization`, this.authorization);
    headers.append(`Content-Type`, `application/json`);

    return fetch(`https://11.ecmascript.pages.academy/big-trip/points/${oldDataId}`, {
      headers,
      method: `PUT`,
      body: JSON.stringify(newData.toRAW())
    })
      .then(checkStatus)
      .then((response) => response.json())
      .then(Point.parsePoint);
  }

}
