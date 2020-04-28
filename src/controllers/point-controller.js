import EventPointComponent from "../components/event-point";
import EventEditComponent from "../components/event-edit";
import {RenderPosition, render, replace} from "../utils/render";

export default class PointController {
  constructor(container, onDataChange) {
    this._container = container;
    this._eventPoint = null;
    this._eventPointEdit = null;
    this._onDataChange = onDataChange;

    this._onEscPress = this._onEscPress.bind(this);
  }

  render(point) {
    const oldEventPoint = this._eventPoint;
    const oldEventPointEdit = this._eventPointEdit;

    this._eventPoint = new EventPointComponent(point);
    this._eventPointEdit = new EventEditComponent(point);

    this._eventPoint.setClickHandler(() => {
      this._replacePointToEdit();
    });

    this._eventPointEdit.setSubmitHandler((evt) => {
      evt.preventDefault();
      this._replaceEditToPoint();
    });

    this._eventPointEdit.setClickHandler(() => {
      this._replaceEditToPoint();
    });

    this._eventPointEdit.setClickOnStarHandler(() => {
      this._onDataChange(this, point, Object.assign({}, point, {
        isFavorite: !point.isFavorite
      }));
    });

    if (oldEventPoint && oldEventPointEdit) {
      replace(this._eventPoint, oldEventPoint);
      replace(this._eventPointEdit, oldEventPointEdit);
    } else {
      render(this._container, this._eventPoint, RenderPosition.BEFOREEND);
    }
  }

  _replacePointToEdit() {
    replace(this._eventPointEdit, this._eventPoint);
    document.addEventListener(`keydown`, this._onEscPress);
  }

  _replaceEditToPoint() {
    replace(this._eventPoint, this._eventPointEdit);
  }

  _onEscPress(evt) {
    const isEsc = evt.key === `Escape` || evt.key === `Esc`;

    if (isEsc) {
      this._replaceEditToPoint();
      document.removeEventListener(`keydown`, this._onEscPress);
    }
  }


}
