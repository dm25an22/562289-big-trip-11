import {api} from "./data";
import TripInfoComponent from "./components/trip-info";
import NavigationComponent from "./components/navigation";
import TripController from "./controllers/trip-controller";
import FilterController from "./controllers/filter-controller";
import PointsModel from "./models/points-model";
// import Destination from "./models/destination-model";
import {RenderPosition, render} from "./utils/render";

const pointsModel = new PointsModel();
// const destinationModel = new Destination();

const mainTrip = document.querySelector(`.trip-main`);
const tripControls = mainTrip.querySelector(`.trip-controls`);
const firstElement = tripControls.querySelector(`:first-child`);
const tripInfoComponent = new TripInfoComponent();
const filterController = new FilterController(tripControls, pointsModel);
const tripController = new TripController(tripInfoComponent, pointsModel, filterController);

render(mainTrip, tripInfoComponent, RenderPosition.AFTERBEGIN);
render(firstElement, new NavigationComponent(), RenderPosition.AFTER);

filterController.render();

api.getPoints()
  .then((points) => {
    pointsModel.setPoints(points);
    tripController.render();
    console.log(points);
  });

document.querySelector(`.trip-main__event-add-btn`)
  .addEventListener(`click`, () => {
    tripController.createNewPoint();
  });
// Promise.all([api.getPoints(), api.getDestination()])
// .then(([points, destinations]) => {
//   destinationModel.setDestination(destinations);
//   pointsModel.setPoints(points);
//   tripController.render();
// });


