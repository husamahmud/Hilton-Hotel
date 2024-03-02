import Joi from 'joi';

export class AdminValidation {
  static createAdmin(adminDto) {
    const schema = Joi.object({
      fullName: Joi.string().min(6).max(80).required().trim(),
      email: Joi.string().email().required().trim(),
      username: Joi.string().min(3).max(80).required().trim(),
      password: Joi.string().min(8).max(255).required(),
      profilePic: Joi.string().min(5).max(255),
      birthDate: Joi.date().required(),
      phoneNum: Joi.string().required(),
      isDeleted: Joi.boolean().default(false),
    });

    return schema.validateAsync(adminDto);
  }

  static updateAdmin(adminDto) {
    const schema = Joi.object({
      id: Joi.string(),
      fullName: Joi.string().min(6).max(80).trim(),
      email: Joi.string().email().trim(),
      username: Joi.string().min(3).max(80).trim(),
      password: Joi.string().min(8).max(25),
      profilePic: Joi.string().min(5).max(255),
      birthDate: Joi.date(),
      phoneNum: Joi.string(),
      isDeleted: Joi.boolean().default(false),
    });

    return schema.validateAsync(adminDto);
  }
}
