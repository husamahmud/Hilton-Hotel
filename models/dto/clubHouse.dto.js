export class ClubHouseDto {
  constructor(bodyReq) {
    this.id = bodyReq.id;
    this.userId = bodyReq.userId;
    this.clubhouseTypes = bodyReq.clubhouseTypes;
    this.startTime = bodyReq.startTime;
    this.endTime = bodyReq.endTime;
    this.description = bodyReq.description;
    this.isDeleted = bodyReq.isDeleted;
  }
}
