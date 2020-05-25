import AbstractComponent from "./abstract-component";

export const navItem = {
  TABLE: `table`,
  Stats: `stats`
};

const activeClass = `trip-tabs__btn--active`;

const createNavTemplate = () => {
  return (
    `<nav class="trip-controls__trip-tabs  trip-tabs">
      <a id="${navItem.TABLE}" class="trip-tabs__btn  trip-tabs__btn--active" href="#">Table</a>
      <a id="${navItem.Stats}" class="trip-tabs__btn" href="#">Stats</a>
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
