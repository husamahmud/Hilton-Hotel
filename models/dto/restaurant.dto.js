export class RestaurantDto {
  constructor(bodyReq) {
    this.id = bodyReq.id;
    this.userId = bodyReq.userId;
    this.description = bodyReq.description;
}
}