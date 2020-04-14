export const createInfoDestinationTemplate = (dataMock) => {

  const getRodLine = (data) => {
    let result = [];

    data.slice(1).forEach((it) => {
      const {destination} = it;
      if (result.indexOf(destination) === -1) {
        result.push(destination);
      }
    });

    return result.join(` &mdash; `);
  };

  const roadLine = getRodLine(dataMock);

  return (
    `<section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">${roadLine}</h1>

        <p class="trip-info__dates">Mar 18&nbsp;&mdash;&nbsp;20</p>
      </div>
    </section>`
  );
};
