import AbstractComponent from "./abstract-component";
import {NavItem} from "../enum";

const activeClass = `trip-tabs__btn--active`;

const createNavTemplate = () => {
  return (
    `<nav class="trip-controls__trip-tabs  trip-tabs">
      <a id="${NavItem.TABLE}" class="trip-tabs__btn  trip-tabs__btn--active" href="#">Table</a>
      <a id="${NavItem.STATS}" class="trip-tabs__btn" href="#">Stats</a>
    </nav>`
  );
};

export default class Navigation extends AbstractComponent {
  constructor() {
    super();

    this.setActiveClass = this.setActiveClass.bind(this);
  }
  getTemplate() {
    return createNavTemplate();

  }

  resetActiveClass() {
    this.getElement().querySelector(`.${activeClass}`).classList.remove(activeClass);
    const defaultElement = this.getElement().querySelector(`#${NavItem.TABLE}`);
    defaultElement.classList.add(activeClass);
    defaultElement.checked = true;
  }

  setActiveClass(id) {
    this.getElement().querySelector(`.${activeClass}`).classList.remove(activeClass);
    this.getElement().querySelector(`#${id}`).classList.add(activeClass);
  }

  setOnChange(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      if (evt.target.tagName !== `A`) {
        return;
      }

      const navType = evt.target.id;
      handler(navType);
    });
  }
}
