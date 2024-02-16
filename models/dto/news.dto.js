export class NewsDto {
  constructor(bodyReq) {
    this.adminId = bodyReq.adminId;
    this.title = bodyReq.title;
    this.subTitle = bodyReq.subTitle;
    this.description = bodyReq.description;
    this.images = bodyReq.images;
    this.isDeleted = bodyReq.isDeleted;
  }
}
