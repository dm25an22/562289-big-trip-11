import {FilterType} from "../enum";

const getFuturePoints = (points) => {
  return points.filter((point) => point.start > new Date());
};

const getPastPoints = (points) => {
  return points.filter((point) => point.end < new Date());
};

export const getPoitsByFilter = (allPoints, filterName) => {
  switch (filterName) {
    case FilterType.Everything:
      return allPoints;

    case FilterType.Future:
      return getFuturePoints(allPoints);


    case FilterType.Past:
      return getPastPoints(allPoints);

  }

  return allPoints;
};
