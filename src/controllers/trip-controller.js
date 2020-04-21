import SortComponent from "../components/sort";
import NoPointsComponent from "../components/no-points";
import InfoDestinationComponent from "../components/info-destination";
import DayComponent from "../components/day";
import EventPointComponent from "../components/event-point";
import EventEditComponent from "../components/event-edit";

import {datesList} from "../mock/points";
import {getDurationTravel} from "../date-helpers";
import {getRodLine} from "../utils/common";
import {RenderPosition, render, replace} from "../utils/render";

const renderPoints = (points, day, date) => {

  points.filter((el) => new Date(el.start).toDateString() === date)
      .forEach((point) => {

        const eventPoint = new EventPointComponent(point);
        const eventPointEdit = new EventEditComponent(point);

        const replacePointToEdit = () => {
          replace(eventPointEdit, eventPoint);
        };

        const replaceEditToPoint = () => {
          replace(eventPoint, eventPointEdit);
        };

        const onEscPress = (evt) => {
          const isEsc = evt.key === `Escape` || evt.key === `Esc`;

          if (isEsc) {
            replaceEditToPoint();
            document.removeEventListener(`keydown`, onEscPress);
          }
        };

        eventPoint.setClickHandler(() => {
          replacePointToEdit();
          document.addEventListener(`keydown`, onEscPress);
        });

        eventPointEdit.setSubmitHandler((evt) => {
          evt.preventDefault();
          replaceEditToPoint();
        });

        render(day, eventPoint, RenderPosition.BEFOREEND);
      });
};

export default class TripController {
  constructor(tripEventsContainer, tripInfoContainer, dayContainer) {

    this._tripEvents = tripEventsContainer;
    this._tripInfoContainer = tripInfoContainer;
    this._dayContainer = dayContainer;

    this._noPointsComponent = new NoPointsComponent();
    this._sortComponent = new SortComponent();
  }

  render(points) {
    if (!points.length) {
      render(this._tripEvents, this._noPointsComponent, RenderPosition.BEFOREEND);
      return;
    }

    const roadLine = getRodLine(points);
    const durationTravel = getDurationTravel(datesList);

    render(this._tripInfoContainer.getElement(), new InfoDestinationComponent(roadLine, durationTravel), RenderPosition.AFTERBEGIN);
    render(this._tripEvents, this._sortComponent, RenderPosition.AFTERBEGIN);

    datesList.forEach((date, i) => {
      const dayComponent = new DayComponent(date, i + 1);
      render(this._dayContainer.getElement(), dayComponent, RenderPosition.BEFOREEND);
      const day = dayComponent.getElement().querySelector(`.trip-events__list`);

      renderPoints(points, day, date);

    });
  }

}

