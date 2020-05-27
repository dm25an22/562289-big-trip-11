import AbstractComponent from "./abstract-component";

const createTripInfo = () => {
  return (
    `<section class="trip-main__trip-info  trip-info">
    </section>`
  );
};
export default class TripInfo extends AbstractComponent {
  constructor(cost) {
    super();

    this._cost = cost;
  }

  getTemplate() {
    return createTripInfo(this._cost);
  }

}
