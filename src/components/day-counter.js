import AbstractComponent from "./abstract-component";

const createDayCounterTemplate = () => {
  return (
    `<ul class="trip-days">
    </ul>`
  );
};

export default class DayCounter extends AbstractComponent {
  getTemplate() {
    return createDayCounterTemplate();
  }
}
