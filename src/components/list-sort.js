import AbstractComponent from "./abstract-component";

const craeteListSortTemplate = () => {
  return (

    `<li class="trip-days__item  day">
      <div class="day__info"></div>

      <ul class="trip-events__list">

        
      </ul>
    </li>
    `
  );
};

export default class SortList extends AbstractComponent {
  getTemplate() {
    return craeteListSortTemplate();
  }
}
