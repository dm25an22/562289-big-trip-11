import API from "./api ";
import Destination from "./models/destination-model";
import Offer from "./models/offer-model";

const AUTHORIZATION = `Basic jhkjhio879jkhj=`;
export const api = new API(AUTHORIZATION);
export const destinationModel = new Destination();
export const offerModel = new Offer();

api.getDestination()
  .then((destinations) => {
    destinationModel.setDestination(destinations);
    // destinationModel.getDestinationData();
  });

api.getOffers()
  .then((offers) => {
    offerModel.setOffers(offers);
  });


