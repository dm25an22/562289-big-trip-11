import {castTimeFormat, getDurationTime} from "../utils";

export const renderOffers = (offers) => {
  return offers.slice(0, 3).map((it) => {
    return `<li class="event__offer">
      <span class="event__offer-title">${it.title}</span>
      ${it.title ? `&plus;&euro;&nbsp;` : ``}
      <span class="event__offer-price">${it.price}</span>
    </li>`;
  }).join(`\n`);
};

export const createEventPointTemplate = (dataPoint) => {
  const {routePoint, destination, eventPrice, offer, typeRoutePoints, icon, start, end} = dataPoint;

  const renderOfferMurkup = renderOffers(offer);

  const satrHours = castTimeFormat(start.getHours());
  const starMinute = castTimeFormat(start.getMinutes());

  const endHours = castTimeFormat(end.getHours());
  const endMinute = castTimeFormat(end.getMinutes());

  const duration = getDurationTime(start, end);

  const routePointWithType = typeRoutePoints === `transfer` ? `${routePoint} to` : `${routePoint} in`;

  return (
    `<li class="trip-events__item">
      <div class="event">
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${icon}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${routePointWithType} ${destination}</h3>

        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="2019-03-19T11:20">${satrHours}:${starMinute}</time>
            &mdash;
            <time class="event__end-time" datetime="2019-03-19T13:00">${endHours}:${endMinute}</time>
          </p>
          <p class="event__duration">${duration}</p>
        </div>

        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${eventPrice}</span>
        </p>

        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
          ${renderOfferMurkup}
        </ul>

        <button class="event__rollup-btn" type="button"><span class="visually-hidden">Open event</span></button>
        
    </div>
  </li>`
  );
};
