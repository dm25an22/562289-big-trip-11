export default class Offer {
  constructor() {
    this._offers = [];
  }

  setOffers(data) {
    this._offers = data;
  }

  getOffersData() {
    return this._offers;
  }

}
