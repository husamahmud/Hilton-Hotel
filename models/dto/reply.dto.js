export class ReplyDto {
  constructor(bodyReq) {
    this.id = bodyReq.id;
    this.newsId = bodyReq.newsId;
    this.fullName = bodyReq.fullName;
    this.email = bodyReq.email;
    this.comment = bodyReq.comment;
    this.isDeleted = bodyReq.isDeleted;
  }
}
