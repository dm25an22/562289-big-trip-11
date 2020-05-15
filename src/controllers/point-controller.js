import EventPointComponent from "../components/event-point";
import EventEditComponent from "../components/event-edit";
import {RenderPosition, render, replace, remove} from "../utils/render";
import {getOffers} from "../mock/points";


export const Mode = {
  ADDING: `adding`,
  DEFAULT: `default`,
  EDIT: `edit`
};

export const emptyPoint = {
  // id: String(new Date() + Math.random()),
  type: `Taxi`,
  destination: ``,
  eventPrice: 20,
  offer: getOffers(`Taxi`),
  start: new Date(),
  end: new Date(),
  description: ``,
  photos: [],
  isFavorite: false
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
      // if (mode !== Mode.ADDING) {
      //   this._replaceEditToPoint();
      // }

      const data = this._eventPointEdit.getData();
      evt.preventDefault();
      this._onDataChange(this, point, Object.assign({}, point, {
        id: String(new Date() + Math.random()),
        type: data.type,
        destination: data.destination,
        eventPrice: data.eventPrice,
        offer: data.offer,
        start: data.start,
        end: data.end,
        description: data.description,
        photos: data.photos,
        isFavorite: false
      }));

    });

    this._eventPointEdit.setClickHandler(() => {
      this._eventPointEdit.reset();
      this._replaceEditToPoint();
    });

    this._eventPointEdit.setClickOnStarHandler(() => {
      this._onDataChange(this, point, Object.assign({}, point, {
        isFavorite: !point.isFavorite
      }));
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
