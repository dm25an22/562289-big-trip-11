export const createInfoCostTemplate = (dataMock) => {

  const getTotalPrice = (data) => {
    let sumPrice = 0;

    data.slice(1).forEach((it) => {
      const {eventPrice, offer} = it;

      offer.forEach((el) => {
        const {price} = el;
        sumPrice += price;
      });

      sumPrice += eventPrice;
    });

    return sumPrice;
  };

  const totalPrice = getTotalPrice(dataMock);

  return (
    `<p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${totalPrice}</span>
    </p>`
  );
};
