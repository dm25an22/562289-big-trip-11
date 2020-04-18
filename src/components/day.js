
import {getMonth, getDay} from "../date-helpers";
import {createElement} from "../utils";

const createDayTemplate = (date, index) => {

  const mounth = getMonth(date);
  const day = getDay(date);

  return (
    `<li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">${index}</span>
        <time class="day__date" datetime="2019-03-18">${mounth} ${day}</time>
      </div>

      <ul class="trip-events__list">
      </ul>
    </li>`
  );
};

export default class Day {
  constructor(date, index) {
    this._date = date;
    this._index = index;
    this._element = null;
  }

  getTemplate() {
    return createDayTemplate(this._date, this._index);
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
