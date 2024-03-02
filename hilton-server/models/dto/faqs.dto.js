export class FaqsDto {
  constructor(bodyReq) {
    this.id = bodyReq.id;
    this.question = bodyReq.question;
    this.answer = bodyReq.answer;
    this.isDeleted = bodyReq.isDeleted; 
  }
}
