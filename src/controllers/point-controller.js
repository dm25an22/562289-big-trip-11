import EventPointComponent from "../components/event-point";
import EventEditComponent from "../components/event-edit";
import {render, replace, remove} from "../utils/render";
import PointModel from "../models/point";
import {SHAKE_ANIMATION_TIMEOUT, OFFER_ID_PREFIX} from "../consts";
import {BottonTextOnLoad, Mode, RenderPosition} from "../enum";

const emptyPoint = {
  type: `taxi`,
  destination: [],
  eventPrice: ``,
  offer: [],
  start: new Date(),
  end: new Date(),
  description: ``,
  photos: [],
  isFavorite: false
};
export default class PointController {
  constructor(container, onDataChange, onViewChange, destinationModel, offerModel) {
    this._container = container;
    this._destinationModel = destinationModel;
    this._offerModel = offerModel;
    this._mode = Mode.DEFAULT;

    this._eventPoint = null;
    this._eventPointEdit = null;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;

    this._onEscPress = this._onEscPress.bind(this);
  }

  render(point, mode, isNew) {
    this._mode = mode;
    const oldEventPoint = this._eventPoint;
    const oldEventPointEdit = this._eventPointEdit;

    this._eventPoint = new EventPointComponent(point);
    this._eventPointEdit = new EventEditComponent(point, this._destinationModel, this._offerModel, isNew);

    this._eventPoint.setClickOnRollupBtnHandler(() => {
      this._replacePointToEdit();
    });

    this._eventPointEdit.setClickOnDeleteHandler((evt) => {
      evt.preventDefault();
      this._eventPointEdit.setData({
        DELETE: BottonTextOnLoad.DELETING
      });
      this._onDataChange(this, point, null);
    });

    this._eventPointEdit.setSubmitHandler((evt) => {
      const formData = this._eventPointEdit.getData();
      const data = this._parseData(formData);
      this._eventPointEdit.borderEdit(false);
      this._eventPointEdit.setData({
        SAVE: BottonTextOnLoad.SAVING
      });
      this._eventPointEdit.blockForm();

      evt.preventDefault();
      this._onDataChange(this, point, data);
    });

    this._eventPointEdit.setClickOnRollupBtnHandler(() => {
      this._eventPointEdit.reset();
      this._replaceEditToPoint();
    });

    this._eventPointEdit.setClickOnStarHandler(() => {
      const newPoint = PointModel.clone(point);
      newPoint.isFavorite = !newPoint.isFavorite;
      this._eventPointEdit.borderEdit(false);
      this._onDataChange(this, point, newPoint, true);
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
        window.addEventListener(`keydown`, this._onEscPress);
        render(this._container, this._eventPointEdit, RenderPosition.BEFORE);
        break;

      case Mode.EDIT:
        replace(this._eventPoint, oldEventPoint);
        replace(this._eventPointEdit, oldEventPointEdit);
    }
  }

  shake() {
    this._eventPointEdit.getElement().style.animation = `shake ${SHAKE_ANIMATION_TIMEOUT / 1000}s`;

    setTimeout(() => {
      this._eventPointEdit.getElement().style.animation = ``;

      this._eventPointEdit.setData({
        saveButtonText: `Save`,
        deleteButtonText: `Delete`
      });
      this._eventPointEdit.borderEdit(true);
    }, SHAKE_ANIMATION_TIMEOUT);
  }

  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceEditToPoint();
    }
  }

  destroy() {
    remove(this._eventPoint);
    remove(this._eventPointEdit);
    window.removeEventListener(`keydown`, this._onEscPress);
  }

  _parseData(formData) {
    const eventDestinationName = formData.get(`event-destination`);
    const eventDestination = this._destinationModel.getDestinationData()
      .filter((it) => it.name === eventDestinationName)[0];

    const eventType = formData.get(`event-type`);
    const eventOffers = this._offerModel.getOffersData().filter((it) => it.type === eventType)[0].offers;
    const offers = [];

    eventOffers.forEach((it) => {
      if (formData.get(`${OFFER_ID_PREFIX}${it.title}`) === `on`) {
        offers.push(it);
      }
    });

    const isFavorite = formData.get(`event-favorite`) === `on` ? true : false;

    return new PointModel({
      "base_price": Number(formData.get(`event-price`)),
      "type": eventType,
      "destination": eventDestination,
      "offers": offers,
      "date_from": new Date(formData.get(`event-start-time`)),
      "date_to": new Date(formData.get(`event-end-time`)),
      "is_favorite": isFavorite
    });
  }

  _replacePointToEdit() {
    this._onViewChange();
    replace(this._eventPointEdit, this._eventPoint);
    window.addEventListener(`keydown`, this._onEscPress);
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
        return;
      }

      this._eventPointEdit.reset();
      this._replaceEditToPoint();
      window.removeEventListener(`keydown`, this._onEscPress);
    }
  }

}

export {emptyPoint};
