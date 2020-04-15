import {months} from "../consts";

export const createDayTemplate = (date, index) => {
  const monthIndex = new Date(date).getMonth();
  const day = new Date(date).getDate();

  return (
    `<li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">${index}</span>
        <time class="day__date" datetime="2019-03-18">${months[monthIndex]} ${day}</time>
      </div>

      <ul class="trip-events__list">
      </ul>
    </li>`
  );
};
