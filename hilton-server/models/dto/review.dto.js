export class ReviewDto {
    constructor(bodyReq) {
        this.id = bodyReq.id;
        this.userId = bodyReq.userId;
        this.rating = bodyReq.rating;
        this.comment = bodyReq.comment;
        this.isDeleted = bodyReq.isDeleted;
    }
}