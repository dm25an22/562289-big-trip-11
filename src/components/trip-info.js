import {createElement} from "../utils";

const createTripInfo = () => {
  return (
    `<section class="trip-main__trip-info  trip-info">
    </section>`
  );
};

export default class TripInfo {
  constructor(cost) {
    this._cost = cost;
    this._element = null;
  }

  getTemplate() {
    return createTripInfo(this._cost);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
