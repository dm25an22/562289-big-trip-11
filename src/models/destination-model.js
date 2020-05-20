export default class Destination {
  constructor() {
    this._destination = [];
  }

  setDestination(data) {
    this._destination = data;
  }

  getDestinationData() {
    return this._destination;
  }

  getDestinationNames() {
    return this._destination.map((it) => it.name);
  }

}
