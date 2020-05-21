import {createElement} from "../utils/render";
import {HIDDEN_CLASS} from "../consts";
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
      this._element.classList.add(HIDDEN_CLASS);
    }
  }

  showElement() {
    if (this._element) {
      this._element.classList.remove(HIDDEN_CLASS);
    }
  }

  removeElement() {
    this._element = null;
  }

}
