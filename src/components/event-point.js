import {getDurationTime, getStartEndEvent} from "../date-helpers";
import {LabelOfType} from "../mock/points";
import AbstractComponent from "./abstract-component";

export const renderOffers = (offers) => {
  return offers.slice(0, 3).filter((el) => el.isChecked).map((it) => {
    return `<li class="event__offer">
      <span class="event__offer-title">${it.title}</span>
      ${it.title ? `&plus;&euro;&nbsp;` : ``}
      <span class="event__offer-price">${it.price}</span>
    </li>`;
  }).join(`\n`);
};

const createEventPointTemplate = (dataPoint) => {
  const {type, destination, eventPrice, offer, start, end} = dataPoint;

  const renderOfferMurkup = renderOffers(offer);
  const [satrHours, starMinute, endHours, endMinute] = getStartEndEvent(start, end);
  const duration = getDurationTime(start, end);


  return (
    `<li class="trip-events__item">
      <div class="event">
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${type.toLowerCase()}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${type} ${LabelOfType[type]} ${destination}</h3>

        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="2019-03-19T11:20">${satrHours}:${starMinute}</time>
            &mdash;
            <time class="event__end-time" datetime="2019-03-19T13:00">${endHours}:${endMinute}</time>
          </p>
          <p class="event__duration">${duration}</p>
        </div>

        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${eventPrice}</span>
        </p>

        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
          ${renderOfferMurkup}
        </ul>

        <button class="event__rollup-btn" type="button"><span class="visually-hidden">Open event</span></button>
        
    </div>
  </li>`
  );
};

export default class EventPoint extends AbstractComponent {
  constructor(data) {
    super();

    this._data = data;
  }

  getTemplate() {
    return createEventPointTemplate(this._data);
  }

  setClickHandler(handler) {
    this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, handler);
  }

}
