export class SettingsDto {
    constructor(bodyReq) {
        this.id = bodyReq.id;
        this.adminId = bodyReq.adminId;
        this.hotelName = bodyReq.hotelName;
        this.logo = bodyReq.logo;
        this.address = bodyReq.address;
        this.phoneNum = bodyReq.phoneNum;
        this.email = bodyReq.email;
        this.socialMedia = bodyReq.socialMedia;
    }
}
