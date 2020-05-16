import {LabelOfType, getOffers, cities} from "../mock/points";
import AbstractSmartComponent from "./abstract-smart-component";
import flatpickr from "flatpickr";

import "flatpickr/dist/flatpickr.min.css";
import "flatpickr/dist/themes/material_blue.css";

const OFFER_ID_PREFIX = `event-offer-`;
const ButtonNames = {
  DELETE: `Delete`,
  CANCEL: `Cancel`
};


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

const rendrDestination = () => {
  return Object.keys(cities).map((city) => {
    return `<option value="${city}"></option>`;
  }).join(`\n`);
};

const createNewEventEditTemplate = (dataPoint, options = {}) => {
  const {isFavorite} = dataPoint;
  const {type, offer, destination, description, photos, eventPrice, isNew} = options;

  const imgMurkup = renderImgMurkup(photos);
  const offerMurkup = renderOffersMurkup(offer);
  const typeIcon = renderTypeIcon(type);
  const destinationList = rendrDestination();

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
          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination}" list="destination-list-1" required>
          <datalist id="destination-list-1">
            ${destinationList}
          </datalist>
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">
            From
          </label>
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="">
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">
            To
          </label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="">
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="text" pattern = "[0-9]{0,5}" name="event-price" value="${eventPrice}">
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
       
        <button class="event__reset-btn" type="reset">${isNew ? ButtonNames.CANCEL : ButtonNames.DELETE }</button>

        ${isNew ? `` :
      `<input id="event-favorite-1" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite" ${isFavorite ? `checked` : ``}>
        <label class="event__favorite-btn" for="event-favorite-1">
          <span class="visually-hidden">Add to favorite</span>
          <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
            <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
          </svg>
        </label>

      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>` }
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

const resetFlatpicer = (flatpick) => {
  if (flatpick) {
    flatpick.destroy();
    flatpick = null;
  }
};

const parseData = (formData) => {
  const eventDestination = formData.get(`event-destination`);
  const eventDescription = cities[eventDestination].description;
  const eventPhotos = cities[eventDestination].photo;
  const eventType = formData.get(`event-type`);
  const eventTypeUpper = eventType[0].toUpperCase() + eventType.slice(1);
  const eventOffers = getOffers(eventTypeUpper);

  return {
    eventPrice: Number(formData.get(`event-price`)),
    type: eventTypeUpper,
    destination: eventDestination,
    offer: eventOffers,
    start: new Date(formData.get(`event-start-time`)),
    end: new Date(formData.get(`event-end-time`)),
    description: eventDescription,
    photos: eventPhotos,
  };
};


export default class EventEdit extends AbstractSmartComponent {
  constructor(data, isNew = false) {
    super();

    this._data = data;
    this._isNew = isNew;


    this._type = data.type;
    this._offers = data.offer;
    this._eventPrice = data.eventPrice;
    // this._isFavorite = data.isFavorite;
    // this._offers = JSON.parse(JSON.stringify(data.offer));
    this._destination = data.destination;
    this._photos = data.photos;
    this._description = data.description;
    this._start = data.start;
    this._end = data.end;

    this._flatpickrStart = null;
    this._flatpickrEnd = null;
    this._startDate = null;

    this._setSubmitHandler = null;
    this._setClickHandler = null;
    this._setClickOnStarHandler = null;
    this._setClickOnDeleteHandler = null;
    this._applyFlatpickr();
    this._subscribeOnEvents();
  }

  getTemplate() {
    return createNewEventEditTemplate(this._data, {
      type: this._type,
      offer: this._offers,
      destination: this._destination,
      description: this._description,
      photos: this._photos,
      eventPrice: this._eventPrice,
      isNew: this._isNew,
      // isFavorite: this._isFavorite,
    });
  }

  getData() {
    const element = this.getElement();
    const formData = new FormData(element);
    // for (let pair of formData.entries()) {
    //   console.log(pair[0] + `, ` + pair[1]);
    // }
    return parseData(formData);
  }

  recoveryListeners() {
    this.setSubmitHandler(this._setSubmitHandler);
    this.setClickHandler(this._setClickHandler);
    this.setClickOnStarHandler(this._setClickOnStarHandler);
    this.setClickOnDeleteHandler(this._setClickOnDeleteHandler);
    this._subscribeOnEvents();
  }


  _applyFlatpickr() {
    resetFlatpicer(this._flatpickrStart);
    resetFlatpicer(this._flatpickrEnd);

    const evtStartTime = this.getElement().querySelector(`#event-start-time-1`);
    const evtEndTime = this.getElement().querySelector(`#event-end-time-1`);

    const time = `time_24hr`;
    const option = {
      allowInput: true,
      altInput: true,
      enableTime: true,
      altFormat: `d/m/y H:i`,
      [time]: true,
    };

    const startDate = this._start;

    this._flatpickrStart = flatpickr(evtStartTime, Object.assign({}, option, {
      minDate: startDate,
      defaultDate: this._start,
    }));

    this._flatpickrEnd = flatpickr(evtEndTime, Object.assign({}, option, {
      defaultDate: this._end,
      minDate: this._start,
    }));
  }


  rerender(focus = false) {
    // console.log(this._isFavorite);
    super.rerender();
    this._applyFlatpickr();

    if (focus) {
      const eventPriceInput = this.getElement().querySelector(`#event-price-1`);
      eventPriceInput.focus();
      eventPriceInput.selectionStart = eventPriceInput.value.length;
    }
  }

  _subscribeOnEvents() {
    const element = this.getElement();

    // const availableOffers = element.querySelector(`.event__available-offers`);
    // if (availableOffers) {
    //   availableOffers.addEventListener(`change`, (evt) => {
    //     this._offers.map((it) => {
    //       if (evt.target.name === OFFER_ID_PREFIX + it.title) {
    //         it.isChecked = !it.isChecked;
    //       }
    //     });
    //     this.rerender();
    //   });
    // }

    const eventPriceInput = element.querySelector(`#event-price-1`);
    if (eventPriceInput) {

      eventPriceInput.addEventListener(`input`, (evt) => {
        this._eventPrice = evt.target.value;
        this.rerender(true);
      });
    }

    element.querySelector(`#event-start-time-1`)
      .addEventListener(`input`, (evt) => {
        this._start = new Date(evt.target.value);
        this._flatpickrEnd.set(`minDate`, this._start);
      });

    element.querySelector(`#event-end-time-1`)
      .addEventListener(`input`, (evt) => {
        this._end = new Date(evt.target.value);
      });

    element.querySelector(`.event__type-list`)
      .addEventListener(`change`, (evt) => {
        if (this._type.toLowerCase() === evt.target.value) {
          return;
        }
        this._type = evt.target.value;

        const firstLetter = this._type[0].toUpperCase();
        this._type = firstLetter.concat(this._type.slice(1));

        this._offers = getOffers(this._type);

        this.rerender();
      });

    const eventDestinationIput = element.querySelector(`#event-destination-1`);

    eventDestinationIput.addEventListener(`change`, (evt) => {
      if (!Object.keys(cities).some((it) => it === evt.target.value)) {
        evt.target.value = ``;
        this._destination = ``;
        this._description = ``;
        this._photos = [];
        this.rerender();
      }
    });

    eventDestinationIput.addEventListener(`input`, (evt) => {
      if (Object.keys(cities).some((it) => it === evt.target.value)) {
        this._destination = evt.target.value;
        this._description = cities[this._destination].description;
        this._photos = cities[this._destination].photo;

        this.rerender();
      }

    });

  }

  reset() {

    const data = this._data;
    this._eventPrice = data.eventPrice;
    this._type = data.type;
    this._offers = data.offer;
    this._destination = data.destination;
    this._photos = data.photos;
    this._description = data.description;
    this._start = data.start;
    this._end = data.end;

    this.rerender();
  }

  setClickOnDeleteHandler(handler) {
    this.getElement().querySelector(`.event__reset-btn`).addEventListener(`click`, handler);
    this._setClickOnDeleteHandler = handler;
  }

  setSubmitHandler(handler) {
    this.getElement().addEventListener(`submit`, handler);
    this._setSubmitHandler = handler;
  }

  setClickHandler(handler) {
    const btnRollup = this.getElement().querySelector(`.event__rollup-btn`);
    if (btnRollup) {
      btnRollup.addEventListener(`click`, handler);
      this._setClickHandler = handler;
    }
  }

  setClickOnStarHandler(handler) {
    const favoriteIcon = this.getElement().querySelector(`.event__favorite-icon`);
    if (favoriteIcon) {
      favoriteIcon.addEventListener(`click`, handler);
      this._setClickOnStarHandler = handler;
    }
  }

}
