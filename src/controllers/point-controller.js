import EventPointComponent from "../components/event-point";
import EventEditComponent from "../components/event-edit";
import {RenderPosition, render, replace, remove} from "../utils/render";
import {destinationModel, offerModel} from "../data";

const OFFER_ID_PREFIX = `event-offer-`;

export const Mode = {
  ADDING: `adding`,
  DEFAULT: `default`,
  EDIT: `edit`
};

export const emptyPoint = {
  type: `Taxi`,
  destination: [],
  eventPrice: ``,
  offer: [],
  start: new Date(),
  end: new Date(),
  description: ``,
  photos: [],
  isFavorite: false
};

const parseData = (formData) => {
  const eventDestinationName = formData.get(`event-destination`);
  const eventDestination = destinationModel.getDestinationData().filter((it) => it.name === eventDestinationName)[0];

  const eventType = formData.get(`event-type`);
  const eventOffers = offerModel.getOffersData().filter((it) => it.type === eventType)[0].offers;
  const offers = [];

  eventOffers.forEach((it) => {
    if (formData.get(`${OFFER_ID_PREFIX}${it.title}`) === `on`) {
      offers.push(it);
    }
  });

  return {
    eventPrice: Number(formData.get(`event-price`)),
    type: eventType,
    destination: eventDestination,
    offer: offers,
    start: new Date(formData.get(`event-start-time`)),
    end: new Date(formData.get(`event-end-time`)),
  };
};

export default class PointController {
  constructor(container, onDataChange, onViewChange) {
    this._container = container;
    this._eventPoint = null;
    this._eventPointEdit = null;
    this._onDataChange = onDataChange;
    this._mode = Mode.DEFAULT;
    this._onViewChange = onViewChange;

    this._onEscPress = this._onEscPress.bind(this);
  }

  render(point, mode, isNew) {
    this._mode = mode;
    const oldEventPoint = this._eventPoint;
    const oldEventPointEdit = this._eventPointEdit;

    this._eventPoint = new EventPointComponent(point);
    this._eventPointEdit = new EventEditComponent(point, isNew);

    this._eventPoint.setClickHandler(() => {
      this._replacePointToEdit();

    });

    this._eventPointEdit.setClickOnDeleteHandler((evt) => {
      evt.preventDefault();
      this._onDataChange(this, point, null);
    });

    this._eventPointEdit.setSubmitHandler((evt) => {
      const formData = this._eventPointEdit.getData();
      const data = parseData(formData);

      evt.preventDefault();
      this._onDataChange(this, point, Object.assign({}, point, {
        type: data.type,
        destination: data.destination,
        eventPrice: data.eventPrice,
        offer: data.offer,
        start: data.start,
        end: data.end,
        isFavorite: false
      }));
    });

    this._eventPointEdit.setClickHandler(() => {
      this._eventPointEdit.reset();
      this._replaceEditToPoint();
    });

    this._eventPointEdit.setClickOnStarHandler(() => {
      this._onDataChange(this, point, Object.assign({}, point, {
        isFavorite: !point.isFavorite,
      }), true);
    });

    switch (mode) {
      case Mode.DEFAULT:
        if (oldEventPoint && oldEventPointEdit) {
          replace(this._eventPoint, oldEventPoint);
          replace(this._eventPointEdit, oldEventPointEdit);
          this._replaceEditToPoint();
        } else {
          render(this._container, this._eventPoint, RenderPosition.BEFOREEND);
        }
        break;

      case Mode.ADDING:
        document.addEventListener(`keydown`, this._onEscPress);
        render(this._container, this._eventPointEdit, RenderPosition.BEFORE);
        break;

      case Mode.EDIT:
        replace(this._eventPoint, oldEventPoint);
        replace(this._eventPointEdit, oldEventPointEdit);
    }
  }

  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceEditToPoint();
    }
  }

  destroy() {
    remove(this._eventPoint);
    remove(this._eventPointEdit);
    document.removeEventListener(`keydown`, this._onEscPress);
  }

  _replacePointToEdit() {
    this._onViewChange();
    replace(this._eventPointEdit, this._eventPoint);
    document.addEventListener(`keydown`, this._onEscPress);
    this._mode = Mode.EDIT;
  }

  _replaceEditToPoint() {
    replace(this._eventPoint, this._eventPointEdit);
    this._mode = Mode.DEFAULT;
  }

  _onEscPress(evt) {
    const isEsc = evt.key === `Escape` || evt.key === `Esc`;

    if (isEsc) {

      if (this._mode === Mode.ADDING) {
        this._onDataChange(this, emptyPoint, null);
      }

      this._eventPointEdit.reset();
      this._replaceEditToPoint();
      document.removeEventListener(`keydown`, this._onEscPress);
    }
  }


}
