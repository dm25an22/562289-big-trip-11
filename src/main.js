// import TripInfoComponent from "./components/trip-info";
import NavigationComponent from "./components/navigation";
import TripController from "./controllers/trip-controller";
import FilterController from "./controllers/filter-controller";
import PointsModel from "./models/points-model";
import {mockData} from "./mock/points";
import {RenderPosition, render} from "./utils/render";

const pointsModel = new PointsModel();
pointsModel.setPoints(mockData);

const mainTrip = document.querySelector(`.trip-main`);
// const tripInfoComponent = new TripInfoComponent();
// render(mainTrip, tripInfoComponent, RenderPosition.AFTERBEGIN);

const tripControls = mainTrip.querySelector(`.trip-controls`);
const firstElement = tripControls.querySelector(`:first-child`);
render(firstElement, new NavigationComponent(), RenderPosition.AFTER);

const filterController = new FilterController(tripControls, pointsModel);
filterController.render();

const tripController = new TripController(mainTrip, pointsModel, filterController);
tripController.render();

document.querySelector(`.trip-main__event-add-btn`)
  .addEventListener(`click`, () => {
    tripController.createNewPoint();
  });
