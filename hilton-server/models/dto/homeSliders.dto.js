export class HomeSlidersDto {
    constructor(bodyReq) {
        this.id = bodyReq.id;
        this.adminId = bodyReq.adminId;
        this.photo = bodyReq.photo;
        this.header = bodyReq.header;
        this.paragraph = bodyReq.paragraph;
        this.isDeleted = bodyReq.isDeleted;
    }
}