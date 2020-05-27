import AbstractComponent from "./abstract-component";

const createInfoCostTemplate = (cost) => {
  return (
    `<p class="trip-info__cost">
       Total: &euro;&nbsp;<span class="trip-info__cost-value">${cost ? cost : 0}</span>
    </p>`
  );
};
export default class InfoCost extends AbstractComponent {
  constructor(cost) {
    super();

    this._cost = cost;
  }

  getTemplate() {
    return createInfoCostTemplate(this._cost);
  }

}
