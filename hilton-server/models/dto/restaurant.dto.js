export class RestaurantDto {
  constructor(bodyReq) {
    this.id = bodyReq.id;
    this.adminId = bodyReq.adminId;
    this.description = bodyReq.description;
}
}