import {months} from "../consts";

export const createInfoDestinationTemplate = (dataMock, dayMock) => {

  const getRodLine = (data) => {
    let result = [];

    data.forEach((it) => {
      const {destination} = it;
      if (result.indexOf(destination) === -1) {
        result.push(destination);
      }
    });

    return result.join(` &mdash; `);
  };

  const roadLine = getRodLine(dataMock);

  const startDay = new Date(dayMock[0]).getDate();
  const startMonth = months[new Date(dayMock[0]).getMonth()];

  const endtDay = new Date(dayMock[dayMock.length - 1]).getDate();
  const endMonth = months[new Date(dayMock[dayMock.length - 1]).getMonth()];

  return (
    `<section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">${roadLine}</h1>

        <p class="trip-info__dates">${startMonth} ${startDay}&nbsp;&mdash;&nbsp;${startMonth !== endMonth ? endMonth : ``} ${endtDay}</p>
      </div>
    </section>`
  );
};
