import joi from 'joi';

export class AuthValidate {
  static login(loginDto) {
    const schema = joi.object({
      email: joi.string().email(),
      username: joi.string(),
      password: joi.string(),
    });
    return schema.validateAsync(loginDto);
  }
}
