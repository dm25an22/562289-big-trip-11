import {createElement} from "../utils/render";

export default class AbstractComponent {
  constructor() {
    this._element = null;
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  hideElement() {
    if (this._element) {
      this._element.classList.add(`visually-hidden`);
    }
  }

  showElement() {
    if (this._element) {
      this._element.classList.remove(`visually-hidden`);
    }
  }

  removeElement() {
    this._element = null;
  }

}
