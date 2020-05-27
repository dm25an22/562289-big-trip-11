import {FilterType} from "../enum";

const getFuturePoints = (points) => {
  return points.filter((point) => point.start > new Date());
};

const getPastPoints = (points) => {
  return points.filter((point) => point.end < new Date());
};

export const getPointsByFilter = (allPoints, filterName) => {
  switch (filterName) {
    case FilterType.EVERYTHING:
      return allPoints;

    case FilterType.FUTURE:
      return getFuturePoints(allPoints);


    case FilterType.PAST:
      return getPastPoints(allPoints);

  }

  return allPoints;
};
