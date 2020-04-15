export const createInfoCostTemplate = (dataMock) => {

  const getTotalPrice = (data) => {
    let sumPrice = 0;

    data.forEach((it) => {
      const {eventPrice, offer} = it;

      offer.forEach((el) => {
        sumPrice += el.price;
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
