import AbstractComponent from "./abstract-component";

const createInfoDestinationTemplate = (roadLine, durationTravel) => {
  const [startDay, startMonth, endtDay, endMonth] = durationTravel;

  return (
    `<div class="trip-info__main">
      <h1 class="trip-info__title">${roadLine}</h1>
      <p class="trip-info__dates">${startMonth} ${startDay}&nbsp;&mdash;&nbsp;${startMonth !== endMonth ? endMonth : ``} ${endtDay}</p>
    </div>`
  );
};
export default class InfoDestination extends AbstractComponent {
  constructor(roadLine, durationTravel) {
    super();

    this._roadLine = roadLine;
    this._durationTravel = durationTravel;
  }

  getTemplate() {
    return createInfoDestinationTemplate(this._roadLine, this._durationTravel);
  }

}
