import {render} from "../utils/render";
import FilterComponent from "../components/filter";
import {FilterType, RenderPosition} from "../enum";

export default class FilterController {
  constructor(container, pointsModel) {
    this._container = container;
    this._pointsModel = pointsModel;

    this._filterComponent = new FilterComponent();
    this._filterComponent.setFilterChangeHandler(this._onFilterChangeHandler.bind(this));
  }

  render() {
    render(this._container, this._filterComponent, RenderPosition.BEFOREEND);
  }

  resetFlter() {
    this._onFilterChangeHandler(FilterType.Everything);
    document.querySelector(`#filter-everything`).checked = true;
  }

  hide() {
    this._filterComponent.hideElement();
  }

  show() {
    this._filterComponent.showElement();
  }

  blockFilters(boolean) {
    const filters = document.querySelectorAll(`.trip-filters__filter-input`);
    Array.from(filters).forEach((it) => {
      it.disabled = boolean;
    });
  }

  _onFilterChangeHandler(filterName) {
    this._pointsModel.setFilter(filterName);
  }
}
