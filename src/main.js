import API from "./api ";
import TripInfoComponent from "./components/trip-info";
import NavigationComponent from "./components/navigation";
import TripController from "./controllers/trip-controller";
import FilterController from "./controllers/filter-controller";
import PointsModel from "./models/points-model";
import Destination from "./models/destination-model";
import Offer from "./models/offer-model";
import NoPointsComponent from "./components/no-points";
import {RenderPosition, render, remove} from "./utils/render";

const AUTHORIZATION = `Basic jhkjhio879jkhj=`;

const api = new API(AUTHORIZATION);
const pointsModel = new PointsModel();
const destinationModel = new Destination();
const offerModel = new Offer();

const mainTrip = document.querySelector(`.trip-main`);
const tripControls = mainTrip.querySelector(`.trip-controls`);
const firstElement = tripControls.querySelector(`:first-child`);
const tripEvents = document.querySelector(`.trip-events`);
const tripInfoComponent = new TripInfoComponent();
const filterController = new FilterController(tripControls, pointsModel);
const tripController = new TripController(api, tripInfoComponent, pointsModel, destinationModel, offerModel, filterController);
const loadingComponent = new NoPointsComponent(true);

render(tripEvents, loadingComponent, RenderPosition.BEFOREEND);
render(mainTrip, tripInfoComponent, RenderPosition.AFTERBEGIN);
render(firstElement, new NavigationComponent(), RenderPosition.AFTER);

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
    tripController.render();
  })
  .catch(() => {
    loadingComponent.getElement().innerHTML = `An error occurred.Try reloading the page`;
  });

document.querySelector(`.trip-main__event-add-btn`)
  .addEventListener(`click`, () => {
    tripController.createNewPoint();
  });

