export class LoginDto {
  constructor(bodyReq) {
    this.email = bodyReq.email;
    this.username = bodyReq.username;
    this.password = bodyReq.password;
  }
}
