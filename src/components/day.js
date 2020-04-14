

export const createDayTemplate = (dataDay) => {
  const {day, month} = dataDay;
  return (
    `<li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">${day}</span>
        <time class="day__date" datetime="2019-03-18">${month} 18</time>
      </div>

      <ul class="trip-events__list">
      </ul>
    </li>`
  );
};
