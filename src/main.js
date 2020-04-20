import DayCounterComponent from "./components/day-counter";
import TripInfoComponent from "./components/trip-info";
import FilterComponent from "./components/filter";
import InfoCostComponent from "./components/info-cost";
import NavigationComponent from "./components/navigation";

import DayBoardController from "./controllers/day-board";

import {mockData} from "./mock/points";
import {getTotalPrice} from "./utils/common";
import {RenderPosition, render} from "./utils/render";

const totalPrice = getTotalPrice(mockData);

const mainTrip = document.querySelector(`.trip-main`);

const tripInfoComponent = new TripInfoComponent();

render(mainTrip, tripInfoComponent, RenderPosition.AFTERBEGIN);
render(tripInfoComponent.getElement(), new InfoCostComponent(totalPrice), RenderPosition.BEFOREEND);

const tripControls = mainTrip.querySelector(`.trip-controls`);
const firstElement = tripControls.querySelector(`:first-child`);
render(firstElement, new NavigationComponent(), RenderPosition.AFTER);
render(tripControls, new FilterComponent(), RenderPosition.BEFOREEND);

const tripEvents = document.querySelector(`.trip-events`);
const dayCounterComponent = new DayCounterComponent();

render(tripEvents, dayCounterComponent, RenderPosition.BEFOREEND);

const dayBoardController = new DayBoardController(tripEvents, tripInfoComponent, dayCounterComponent);
dayBoardController.render(mockData);


