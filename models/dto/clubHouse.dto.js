export class ClubHouseDto {
  constructor(bodyReq) {
    this.userId = bodyReq.userId;
    this.clubhouseTypes = bodyReq.clubhouseTypes;
    this.startTime = bodyReq.startTime;
    this.endTime = bodyReq.endTime;
    this.description = bodyReq.description;
    this.isDeleted = bodyReq.isDeleted;
  }
}
