export class AdminDto {
  constructor(bodyReq) {
    this.fullName = bodyReq.fullName;
    this.email = bodyReq.email;
    this.username = bodyReq.username;
    this.password = bodyReq.password;
    this.profilePic = bodyReq.profilePic;
    this.birthDate = bodyReq.birthDate;
    this.phoneNum = bodyReq.phoneNum;
    this.isDeleted = bodyReq.isDeleted;
  }
}
