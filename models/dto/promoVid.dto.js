export class PromoVidDto {
  constructor(bodyReq) {
    this.id = bodyReq.id;
    this.adminId = bodyReq.adminId;
    this.video = bodyReq.video;
    this.description = bodyReq.description;
  }
}
