import {castTimeFormatForEdit} from "../date-helpers";
import {LabelOfType, getOffers, cities} from "../mock/points";
import AbstractSmartComponent from "./abstract-smart-component";

export const renderTypeIcon = (type) => {
  return (
    `<div class="event__type-list">
    <fieldset class="event__type-group">
      <legend class="visually-hidden">Transfer</legend>

      <div class="event__type-item">
        <input id="event-type-taxi-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi" ${type === `Taxi` ? `checked` : ``}>
        <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-1">Taxi</label>
      </div>

      <div class="event__type-item">
        <input id="event-type-bus-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="bus" ${type === `Bus` ? `checked` : ``}>
        <label class="event__type-label  event__type-label--bus" for="event-type-bus-1">Bus</label>
      </div>

      <div class="event__type-item">
        <input id="event-type-train-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="train" ${type === `Train` ? `checked` : ``}>
        <label class="event__type-label  event__type-label--train" for="event-type-train-1">Train</label>
      </div>

      <div class="event__type-item">
        <input id="event-type-ship-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="ship" ${type === `Ship` ? `checked` : ``}>
        <label class="event__type-label  event__type-label--ship" for="event-type-ship-1">Ship</label>
      </div>

      <div class="event__type-item">
        <input id="event-type-transport-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="transport" ${type === `Transport` ? `checked` : ``}>
        <label class="event__type-label  event__type-label--transport" for="event-type-transport-1">Transport</label>
      </div>

      <div class="event__type-item">
        <input id="event-type-drive-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive" ${type === `Drive` ? `checked` : ``}>
        <label class="event__type-label  event__type-label--drive" for="event-type-drive-1">Drive</label>
      </div>

      <div class="event__type-item">
        <input id="event-type-flight-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight" ${type === `Flight` ? `checked` : ``}>
        <label class="event__type-label  event__type-label--flight" for="event-type-flight-1">Flight</label>
      </div>
    </fieldset>

    <fieldset class="event__type-group">
      <legend class="visually-hidden">Activity</legend>

      <div class="event__type-item">
        <input id="event-type-check-in-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="check-in"  ${type === `Check-in` ? `checked` : ``}>
        <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-1">Check-in</label>
      </div>

      <div class="event__type-item">
        <input id="event-type-sightseeing-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="sightseeing"  ${type === `Sightseeing` ? `checked` : ``}>
        <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-1">Sightseeing</label>
      </div>

      <div class="event__type-item">
        <input id="event-type-restaurant-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="restaurant"  ${type === `Restaurant` ? `checked` : ``}>
        <label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-1">Restaurant</label>
      </div>
    </fieldset>
  </div>`
  );
};

export const renderOffersMurkup = (offers) => {
  return offers.map((it) => {
    const {title, price} = it;
    return (
      `<div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="event-offer-${title}" type="checkbox" name="event-offer-${title}" ${it.isChecked ? `checked` : ``}>
        <label class="event__offer-label" for="event-offer-${title}">
          <span class="event__offer-title">${title}</span>
          &plus;
          &euro;&nbsp;<span class="event__offer-price">${price}</span>
        </label>
      </div>`
    );
  }).join(`\n`);
};

export const renderImgMurkup = (photos) => {
  return photos.map((photo) => {
    return (
      `<img class="event__photo" src="${photo}" alt="Event photo">`
    );
  }).join(`\n`);
};

const createNewEventEditTemplate = (dataPoint, options = {}) => {
  const {eventPrice, start, end, isFavorite} = dataPoint;
  const {type, offer, destination, description, photos} = options;


  const imgMurkup = renderImgMurkup(photos);
  const offerMurkup = renderOffersMurkup(offer);
  const typeIcon = renderTypeIcon(type);

  const startData = castTimeFormatForEdit(start);
  const endData = castTimeFormatForEdit(end);

  return (
    `<form class="trip-events__item  event  event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${type.toLowerCase()}.png" alt="Event type icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">
            ${typeIcon}
        </div>

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-1">
            ${type} ${LabelOfType[type]}
          </label>
          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination}" list="destination-list-1">
          <datalist id="destination-list-1">
            <option value="Bergen"></option>
            <option value="Oslo"></option>
            <option value="Gothenburg"></option>
            <option value="Kopenhagen"></option>
          </datalist>
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">
            From
          </label>
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${startData}">
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">
            To
          </label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${endData}">
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${eventPrice}">
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
       

        <button class="event__reset-btn" type="reset">Delete</button>

      <input id="event-favorite-1" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite" ${isFavorite ? `checked` : ``}>
      <label class="event__favorite-btn" for="event-favorite-1">
        <span class="visually-hidden">Add to favorite</span>
        <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
          <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
        </svg>
      </label>

      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
      </header>

      ${offer.length ? `<section class="event__details">
        <section class="event__section  event__section--offers">
          <h3 class="event__section-title  event__section-title--offers">Offers</h3>

          <div class="event__available-offers">
            ${offerMurkup}  
          </div>
        </section>` : ``}

        ${description || photos.length ? `<section class="event__section  event__section--destination">

          <h3 class="event__section-title  event__section-title--destination">Destination</h3>
          <p class="event__destination-description">${description}</p>

          ${photos.length ? `<div class="event__photos-container">
            <div class="event__photos-tape">
              ${imgMurkup}
            </div>
          </div>` : ``}

        </section>` : ``}

      </section>
    </form>`
  );
};


export default class EventEdit extends AbstractSmartComponent {
  constructor(data) {
    super();

    this._data = data;

    this._type = data.type;
    this._offers = data.offer;
    this._destination = data.destination;
    this._photos = data.photos;
    this._description = data.description;

    this._subscribeOnEvents();

    this._setSubmitHandler = null;
    this._setClickHandler = null;
    this._setClickOnStarHandler = null;
  }

  getTemplate() {
    return createNewEventEditTemplate(this._data, {
      type: this._type,
      offer: this._offers,
      destination: this._destination,
      description: this._description,
      photos: this._photos
    });
  }

  recoveryListeners() {
    this.setSubmitHandler(this._setSubmitHandler);
    this.setClickHandler(this._setClickHandler);
    this.setClickOnStarHandler(this._setClickOnStarHandler);
    this._subscribeOnEvents();
  }

  _subscribeOnEvents() {
    const element = this.getElement();

    element.querySelector(`.event__type-list`)
      .addEventListener(`change`, (evt) => {
        this._type = evt.target.value;

        const firstLetter = this._type[0].toUpperCase();
        this._type = firstLetter.concat(this._type.slice(1));

        this._offers = getOffers(this._type);

        this.rerender();
      });

    element.querySelector(`#event-destination-1`)
      .addEventListener(`change`, (evt) => {
        this._destination = evt.target.value;
        this._description = cities[this._destination].description;
        this._photos = cities[this._destination].photo;

        this.rerender();
      });

  }

  reset() {
    const data = this._data;

    this._type = data.type;
    this._offers = data.offer;
    this._destination = data.destination;
    this._photos = data.photos;
    this._description = data.description;

    this.rerender();
  }

  setSubmitHandler(handler) {
    this.getElement().addEventListener(`submit`, handler);
    this._setSubmitHandler = handler;
  }

  setClickHandler(handler) {
    this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, handler);
    this._setClickHandler = handler;
  }

  setClickOnStarHandler(handler) {
    this.getElement().querySelector(`.event__favorite-icon`).addEventListener(`click`, handler);
    this._setClickOnStarHandler = handler;
  }

}
