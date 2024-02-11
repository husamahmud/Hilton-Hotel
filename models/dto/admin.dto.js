export class AdminDto {
	constructor(bodyReq) {
		this.fullName = bodyReq.fullName;
		this.email = bodyReq.email;
		this.userName = bodyReq.userName;
		this.password = bodyReq.password;
		this.profilePic = bodyReq.profilePic;
		this.birthDate = bodyReq.birthDate;
		this.phoneNum = bodyReq.phoneNum;
		this.isDeleted = bodyReq.isDeleted;
	}
}
