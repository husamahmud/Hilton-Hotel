export class RoomDto {
  constructor(bodyReq) {
    this.roomNum = bodyReq.roomNum;
    this.types = bodyReq.types;
    this.price = bodyReq.price;
    this.description = bodyReq.description;
    this.aminities = bodyReq.aminities;
    this.images = bodyReq.images;
    this.view = bodyReq.view;
    this.isDeleted = bodyReq.isDeleted;
  }
}
