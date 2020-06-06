import {LabelOfType, DefaultData} from "../enum";
import AbstractSmartComponent from "./abstract-smart-component";
import {firstLetterToUpper} from "../utils/common";
import {OFFER_ID_PREFIX} from "../consts";
import flatpickr from "flatpickr";

import "flatpickr/dist/flatpickr.min.css";
import "flatpickr/dist/themes/material_blue.css";

const renderTypeIconMurkup = (type) => {
  return (
    `<div class="event__type-list">
    <fieldset class="event__type-group">
      <legend class="visually-hidden">Transfer</legend>

      <div class="event__type-item">
        <input id="event-type-taxi-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi" ${type === `taxi` ? `checked` : ``}>
        <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-1">Taxi</label>
      </div>

      <div class="event__type-item">
        <input id="event-type-bus-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="bus" ${type === `bus` ? `checked` : ``}>
        <label class="event__type-label  event__type-label--bus" for="event-type-bus-1">Bus</label>
      </div>

      <div class="event__type-item">
        <input id="event-type-train-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="train" ${type === `train` ? `checked` : ``}>
        <label class="event__type-label  event__type-label--train" for="event-type-train-1">Train</label>
      </div>

      <div class="event__type-item">
        <input id="event-type-ship-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="ship" ${type === `ship` ? `checked` : ``}>
        <label class="event__type-label  event__type-label--ship" for="event-type-ship-1">Ship</label>
      </div>

      <div class="event__type-item">
        <input id="event-type-transport-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="transport" ${type === `transport` ? `checked` : ``}>
        <label class="event__type-label  event__type-label--transport" for="event-type-transport-1">Transport</label>
      </div>

      <div class="event__type-item">
        <input id="event-type-drive-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive" ${type === `drive` ? `checked` : ``}>
        <label class="event__type-label  event__type-label--drive" for="event-type-drive-1">Drive</label>
      </div>

      <div class="event__type-item">
        <input id="event-type-flight-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight" ${type === `flight` ? `checked` : ``}>
        <label class="event__type-label  event__type-label--flight" for="event-type-flight-1">Flight</label>
      </div>
    </fieldset>

    <fieldset class="event__type-group">
      <legend class="visually-hidden">Activity</legend>

      <div class="event__type-item">
        <input id="event-type-check-in-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="check-in"  ${type === `check-in` ? `checked` : ``}>
        <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-1">Check-in</label>
      </div>

      <div class="event__type-item">
        <input id="event-type-sightseeing-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="sightseeing"  ${type === `sightseeing` ? `checked` : ``}>
        <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-1">Sightseeing</label>
      </div>

      <div class="event__type-item">
        <input id="event-type-restaurant-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="restaurant"  ${type === `restaurant` ? `checked` : ``}>
        <label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-1">Restaurant</label>
      </div>
    </fieldset>
  </div>`
  );
};

const renderOffersMurkup = (typeOffers, offers) => {
  return typeOffers.map((it) => {
    const {title, price} = it;
    return (
      `<div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="event-offer-${title}" type="checkbox" name="event-offer-${title}" ${offers.some((offer) => offer.title === title) ? `checked` : ``}>
        <label class="event__offer-label" for="event-offer-${title}">
          <span class="event__offer-title">${title}</span>
          &plus;
          &euro;&nbsp;<span class="event__offer-price">${price}</span>
        </label>
      </div>`
    );
  }).join(`\n`);
};

const renderImgMurkup = (photos) => {
  return photos.map((photo) => {
    const {src, description} = photo;
    return (
      `<img class="event__photo" src="${src}" alt="${description}">`
    );
  }).join(`\n`);
};

const rendrDestinationMurkup = (destinationNames) => {
  return destinationNames.map((city) => {
    return `<option value="${city}"></option>`;
  }).join(`\n`);
};

const createNewEventEditTemplate = (dataPoint, options = {}) => {
  const {isFavorite} = dataPoint;
  const {type, offers, availableOffers, destinationName, destinationNames, description, eventPrice, isNew, photos, externalData} = options;

  const imgMurkup = renderImgMurkup(photos);
  const offerMurkup = renderOffersMurkup(availableOffers, offers);
  const typeIcon = renderTypeIconMurkup(type);
  const destinationList = rendrDestinationMurkup(destinationNames);

  const saveButtonText = externalData.SAVE;
  const deleteButtonText = externalData.DELETE;

  return (
    `<form class="trip-events__item  event  event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">
            ${typeIcon}
        </div>

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-1">
            ${firstLetterToUpper(type)} ${LabelOfType[type]}
          </label>
          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destinationName}" list="destination-list-1" required>
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

        <button class="event__save-btn  btn  btn--blue" type="submit">${saveButtonText}</button>
       
        <button class="event__reset-btn" type="reset">${isNew ? DefaultData.CANCEL : deleteButtonText }</button>

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

      ${availableOffers.length ? `<section class="event__details">
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


export default class EventEdit extends AbstractSmartComponent {
  constructor(data, destinationModel, offerModel, isNew = false) {
    super();
    this._destinationModel = destinationModel;
    this._offerModel = offerModel;
    this._data = data;
    this._isNew = isNew;


    this._type = data.type;
    this._offers = data.offer;
    this._eventPrice = data.eventPrice;
    this._destinationName = data.destination.name || ``;
    this._photos = data.destination.pictures ? data.destination.pictures.map((it) => it) : [];
    this._description = data.destination.description;
    this._start = data.start;
    this._end = data.end;

    this._externalData = DefaultData;
    this._flatpickrStart = null;
    this._flatpickrEnd = null;
    this._startDate = null;

    this._setSubmitHandler = null;
    this._setClickOnRollupBtnHandler = null;
    this._setClickOnStarHandler = null;
    this._setClickOnDeleteHandler = null;
    this._applyFlatpickr();
    this._subscribeOnEvents();
  }

  rerender() {
    super.rerender();
    this._applyFlatpickr();
  }

  getTemplate() {
    return createNewEventEditTemplate(this._data, {
      type: this._type,
      offers: this._offers,
      destinationNames: this._destinationModel.getDestinationNames(),
      availableOffers: this._getAvailableOffers(),
      destinationName: this._destinationName,
      description: this._description,
      photos: this._photos,
      eventPrice: this._eventPrice,
      isNew: this._isNew,
      externalData: this._externalData
    });
  }

  setData(data) {
    this._externalData = Object.assign({}, DefaultData, data);
    this.rerender();
  }

  getData() {
    const element = this.getElement();
    return new FormData(element);
  }

  blockForm() {
    const element = this.getElement();
    Array.from(element.elements).forEach((it) => {
      it.disabled = true;
    });
  }

  borderEdit(boolean) {
    this.getElement().style.border = `${boolean ? `1px solid red` : ``}`;
  }

  reset() {
    const data = this._data;
    this._eventPrice = data.eventPrice;
    this._type = data.type;
    this._offers = data.offer;
    this._destinationName = data.destination.name;
    this._photos = data.destination.pictures.map((it) => it);
    this._description = data.destination.description;
    this._start = data.start;
    this._end = data.end;

    this.rerender();
  }

  recoveryListeners() {
    this.setSubmitHandler(this._setSubmitHandler);
    this.setClickOnRollupBtnHandler(this._setClickOnRollupBtnHandler);
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

    this._flatpickrStart = flatpickr(evtStartTime, Object.assign({}, option, {
      defaultDate: this._start,
    }));

    this._flatpickrEnd = flatpickr(evtEndTime, Object.assign({}, option, {
      defaultDate: this._end,
      minDate: this._start,
    }));
  }

  _getAvailableOffers() {
    return this._offerModel.getOffersData().find((it) => it.type === this._type).offers;
  }

  _subscribeOnEvents() {
    const element = this.getElement();

    const offersContainer = element.querySelector(`.event__available-offers`);
    if (offersContainer) {
      offersContainer.addEventListener(`change`, (evt) => {
        const isChecked = evt.target.checked;
        const titleFromInput = evt.target.name.slice(OFFER_ID_PREFIX.length);
        const avaibleOffers = this._getAvailableOffers();

        if (isChecked) {
          const addOffer = avaibleOffers.find((it) => it.title === titleFromInput);
          this._offers.push(addOffer);
        } else {
          this._offers = this._offers.filter((it) => it.title !== titleFromInput);
        }

      });
    }

    const eventPriceInput = element.querySelector(`#event-price-1`);
    if (eventPriceInput) {
      eventPriceInput.addEventListener(`change`, (evt) => {
        this._eventPrice = evt.target.value;
        this.rerender();
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
        if (this._type === evt.target.value) {
          return;
        }
        this._type = evt.target.value;
        this._offers = [];
        this.rerender();
      });

    const eventDestinationIput = element.querySelector(`#event-destination-1`);

    eventDestinationIput.addEventListener(`change`, (evt) => {
      if (!this._destinationModel.getDestinationNames().some((it) => it === evt.target.value)) {
        evt.target.value = ``;
        this._destinationName = ``;
        this._description = ``;
        this._photos = [];

        this.rerender();
      }
    });

    eventDestinationIput.addEventListener(`input`, (evt) => {
      if (this._destinationModel.getDestinationNames().some((it) => it === evt.target.value)) {
        this._destinationName = evt.target.value;
        const destinationsAll = this._destinationModel.getDestinationData();

        const destination = destinationsAll.find((it) => it.name === this._destinationName);
        this._description = destination.description;
        this._photos = destination.pictures.map((it) => it);

        this.rerender();
      }
    });

  }

  setClickOnDeleteHandler(handler) {
    this.getElement().querySelector(`.event__reset-btn`).addEventListener(`click`, handler);
    this._setClickOnDeleteHandler = handler;
  }

  setSubmitHandler(handler) {
    this.getElement().addEventListener(`submit`, handler);
    this._setSubmitHandler = handler;
  }

  setClickOnRollupBtnHandler(handler) {
    const btnRollup = this.getElement().querySelector(`.event__rollup-btn`);
    if (btnRollup) {
      btnRollup.addEventListener(`click`, handler);
      this._setClickOnRollupBtnHandler = handler;
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
