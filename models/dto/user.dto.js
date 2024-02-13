export class UserDto {
  constructor(bodyReq) {
    this.fName = bodyReq.fName;
    this.lName = bodyReq.lName;
    this.username = bodyReq.username;
    this.email = bodyReq.email;
    this.password = bodyReq.password;
    this.profilePic = bodyReq.profilePic;
    this.birthDate = bodyReq.birthDate;
    this.country = bodyReq.country;
    this.nationalID = bodyReq.nationalID;
    this.isBlocked = bodyReq.isBlocked;
    this.isDeleted = bodyReq.isDeleted;
  }
}
