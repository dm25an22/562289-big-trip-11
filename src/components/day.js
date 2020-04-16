
import {getMonth, getDay} from "../date-helpers";

export const createDayTemplate = (date, index) => {

  const mounth = getMonth(date);
  const day = getDay(date);

  return (
    `<li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">${index}</span>
        <time class="day__date" datetime="2019-03-18">${mounth} ${day}</time>
      </div>

      <ul class="trip-events__list">
      </ul>
    </li>`
  );
};
