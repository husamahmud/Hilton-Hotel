export class ExtraServicesDto {
  constructor(bodyReq) {
    this.id = bodyReq.id;
    this.roomId = bodyReq.roomId;
    this.name = bodyReq.name;
    this.price = bodyReq.price;
    this.facilities = bodyReq.facilities;
    this.isDeleted = bodyReq.isDeleted;
  }
}