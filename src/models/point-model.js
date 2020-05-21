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

  toRAW() {
    return {
      "id": this.id,
      "date_from": this.start.toISOString(),
      "date_to": this.end.toISOString(),
      "type": this.type,
      "base_price": this.eventPrice,
      "offers": this.offer,
      "destination": this.destination,
      "is_favorite": this.isFavorite
    };
  }

  static parsePoint(point) {
    return new Point(point);
  }

  static parsePoints(points) {
    return points.map(Point.parsePoint);
  }

  static clone(point) {
    return new Point(point.toRAW());
  }
}
