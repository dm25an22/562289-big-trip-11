import {createElement} from "../utils";

const createInfoDestinationTemplate = (roadLine, durationTravel) => {
  const [startDay, startMonth, endtDay, endMonth] = durationTravel;

  return (
    `<section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">${roadLine}</h1>

        <p class="trip-info__dates">${startMonth} ${startDay}&nbsp;&mdash;&nbsp;${startMonth !== endMonth ? endMonth : ``} ${endtDay}</p>
      </div>
    </section>`
  );
};


export default class InfoDestination {
  constructor(roadLine, durationTravel) {
    this._roadLine = roadLine;
    this._durationTravel = durationTravel;
    this._element = null;
  }

  getTemplate() {
    return createInfoDestinationTemplate(this._roadLine, this._durationTravel);
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
