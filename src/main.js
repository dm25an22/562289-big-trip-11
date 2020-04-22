import DayCounterComponent from "./components/day-counter";
import TripInfoComponent from "./components/trip-info";
import FilterComponent from "./components/filter";
import NavigationComponent from "./components/navigation";

import TripController from "./controllers/trip-controller";

import {mockData} from "./mock/points";
import {RenderPosition, render} from "./utils/render";


const mainTrip = document.querySelector(`.trip-main`);
const tripInfoComponent = new TripInfoComponent();
render(mainTrip, tripInfoComponent, RenderPosition.AFTERBEGIN);

const tripControls = mainTrip.querySelector(`.trip-controls`);
const firstElement = tripControls.querySelector(`:first-child`);
render(firstElement, new NavigationComponent(), RenderPosition.AFTER);
render(tripControls, new FilterComponent(), RenderPosition.BEFOREEND);

const tripEvents = document.querySelector(`.trip-events`);
const dayCounterComponent = new DayCounterComponent();
render(tripEvents, dayCounterComponent, RenderPosition.BEFOREEND);

const tripController = new TripController(tripEvents, tripInfoComponent, dayCounterComponent);
tripController.render(mockData);


