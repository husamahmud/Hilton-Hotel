export class RoomReservationDto {
  constructor(bodyReq) {
    this.userId = bodyReq.userId;
    this.roomId = bodyReq.roomId;
    this.checkIn = bodyReq.checkIn;
    this.checkOut = bodyReq.checkOut;
    this.adults = bodyReq.adults;
    this.children = bodyReq.children;
    this.isDeleted = bodyReq.isDeleted;
  }
}
