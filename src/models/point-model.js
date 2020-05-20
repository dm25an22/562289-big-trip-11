export default class Point {
  constructor(point) {
    this.id = point[`id`];
    this.start = new Date(point[`date_from`]);
    this.end = new Date(point[`date_to`]);
    this.type = point[`type`];
    this.eventPrice = point[`base_price`];
    this.offer = point[`offers`];
    this.destination = point[`destination`];
    this.isFavorite = point[`is_favorite`];
  }

  static parsePoint(point) {
    return new Point(point);
  }

  static parsePoints(points) {
    return points.map(Point.parsePoint);
  }
}
