export class ContactUsDto {
  constructor(bodyReq) {
    this.id = bodyReq.id;
    this.adminId = bodyReq.adminId;
    this.fullName = bodyReq.fullName;
    this.email = bodyReq.email;
    this.phoneNum = bodyReq.phoneNum;
    this.subject = bodyReq.subject;
    this.description = bodyReq.description;
    this.isDeleted = bodyReq.isDeleted;
    this.isRead = bodyReq.isRead;
  }
}