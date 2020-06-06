import API from "./api ";
import TripInfoComponent from "./components/trip-info";
import NavigationComponent from "./components/navigation";
import TripController from "./controllers/trip-controller";
import FilterController from "./controllers/filter-controller";
import PointsModel from "./models/points";
import Destination from "./models/destination";
import Offer from "./models/offer";
import NoPointsComponent from "./components/no-points";
import {render, remove} from "./utils/render";
import Statistics from "./components/statistic";
import {NavItem, RenderPosition, FilterType} from "./enum";

const AUTHORIZATION = `Basic jhkjhio879khj=`;
const END_POINT = `https://11.ecmascript.pages.academy/big-trip`;
const api = new API(END_POINT, AUTHORIZATION);
const pointsModel = new PointsModel();
const destinationModel = new Destination();
const offerModel = new Offer();

const main = document.querySelector(`.page-body__page-main`);
const mainTrip = document.querySelector(`.trip-main`);
const tripControls = mainTrip.querySelector(`.trip-controls`);
const firstElement = tripControls.querySelector(`:first-child`);
const tripEvents = document.querySelector(`.trip-events`);
const pageBodyContainer = main.querySelector(`.page-body__container`);
const buttonAdd = document.querySelector(`.trip-main__event-add-btn`);

const tripInfoComponent = new TripInfoComponent();
const filterController = new FilterController(tripControls, pointsModel);
const tripController = new TripController(api, tripInfoComponent, pointsModel, destinationModel, offerModel);
const loadingComponent = new NoPointsComponent(true);
const statisticsComponent = new Statistics(pointsModel);
const navigationComponent = new NavigationComponent();

render(tripEvents, loadingComponent, RenderPosition.BEFOREEND);
render(mainTrip, tripInfoComponent, RenderPosition.AFTERBEGIN);
render(firstElement, navigationComponent, RenderPosition.AFTER);
render(pageBodyContainer, statisticsComponent, RenderPosition.BEFOREEND);
statisticsComponent.hideElement();
filterController.render();

Promise.all([
  api.getPoints(),
  api.getDestination(),
  api.getOffers()
])
  .then(([points, destinations, offers]) => {
    pointsModel.setPoints(points);
    destinationModel.setDestination(destinations);
    offerModel.setOffers(offers);
    remove(loadingComponent);
    pointsModel.blockFilterButton();
    tripController.render();
  })
  .catch((err) => {
    loadingComponent.getElement().innerHTML = `${err}`;
  });


buttonAdd.addEventListener(`click`, (evt) => {
  evt.preventDefault();
  if (pointsModel.getActiveFilter() !== FilterType.EVERYTHING) {
    filterController.resetFlter();
  }
  navigationComponent.resetActiveClass();
  statisticsComponent.hideElement();
  tripController.show();
  filterController.show();
  tripController.createNewPoint();
});

navigationComponent.setOnChange((navType) => {
  navigationComponent.setActiveClass(navType);

  switch (navType) {
    case NavItem.TABLE:
      statisticsComponent.hideElement();
      tripController.show();
      filterController.show();
      break;

    case NavItem.STATS:
      statisticsComponent.showElement();
      tripController.hide();
      tripController.removeCreateNewPoint();
      filterController.resetFlter();
      filterController.hide();
      break;
  }
});

