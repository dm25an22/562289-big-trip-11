export const createInfoCostTemplate = (cost) => {
  return (
    `<p class="trip-info__cost">
       Total: &euro;&nbsp;<span class="trip-info__cost-value">${cost > 0 ? cost : 0}</span>
    </p>`
  );
};
