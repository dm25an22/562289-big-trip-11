import {createElement} from "../utils";

const createDayCounterTemplate = () => {
  return (
    `<ul class="trip-days">
    </ul>`
  );
};

export default class DayCounter {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createDayCounterTemplate();
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
