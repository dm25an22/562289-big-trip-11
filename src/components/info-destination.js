export const createInfoDestinationTemplate = (roadLine, durationTravel) => {
  const [startDay, startMonth, endtDay, endMonth] = durationTravel;

  return (
    `<section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">${roadLine}</h1>

        <p class="trip-info__dates">${startMonth} ${startDay}&nbsp;&mdash;&nbsp;${startMonth !== endMonth ? endMonth : ``} ${endtDay}</p>
      </div>
    </section>`
  );
};
