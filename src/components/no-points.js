import AbstractComponent from "./abstract-component";

const createNoTasksTemplate = (load) => {
  return (
    `<p class="trip-events__msg">${load ? `Loading...` : `Click New Event to create your first point`}</p>`
  );
};

export default class NoPoints extends AbstractComponent {
  constructor(load = false) {
    super();

    this._load = load;
  }
  getTemplate() {
    return createNoTasksTemplate(this._load);
  }
}
