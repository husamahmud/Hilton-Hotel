import Joi from 'joi';

export class UserValidate {
  static createUser(userDto) {
    const schema = Joi.object({
      fName: Joi.string().min(4).max(80).required().trim(),
      lName: Joi.string().min(4).max(80).required().trim(),
      username: Joi.string().min(6).max(80).required().trim(),
      email: Joi.string().email().required().trim(),
      password: Joi.string().min(8).max(255).required(),
      profilePic: Joi.string().min(5).max(255),
      birthDate: Joi.date().required(),
      country: Joi.string().required().trim(), // TODO min?
      nationalID: Joi.string().required().trim(), // TODO min?
      isBlocked: Joi.boolean().default(false),
      isDeleted: Joi.boolean().default(false),
      emailConfirmed: Joi.boolean().default(false),
    });

    return schema.validateAsync(userDto);
  }

  static updateUser(userDto) {
    const schema = Joi.object({
      id: Joi.string(),
      fName: Joi.string().min(6).max(80).trim(),
      lName: Joi.string().min(6).max(80).trim(),
      username: Joi.string().min(6).max(80).trim(),
      email: Joi.string().email().trim(),
      password: Joi.string().min(8).max(255),
      profilePic: Joi.string().min(5).max(255),
      birthDate: Joi.date(),
      country: Joi.string().trim(), // TODO min?
      nationalID: Joi.string().trim(), // TODO min?
      isBlocked: Joi.boolean().default(false),
      isDeleted: Joi.boolean().default(false),
    });

    return schema.validateAsync(userDto);
  }
}
