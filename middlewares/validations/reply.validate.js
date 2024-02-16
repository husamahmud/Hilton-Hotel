import Joi from 'joi';

export class ReplyValidate {
  static createReply(replyDto) {
    const schema = Joi.object({
      id: Joi.string().required(),
      newsId: Joi.string().required(),
      fullName: Joi.string().required(),
      email: Joi.string().required(),
      comment: Joi.string().required(),
      isDeleted: Joi.boolean().default(false),
    });
    return schema.validateAsync(replyDto);
  }

  static updateReply(replyDto) {
    const schema = Joi.object({
      id: Joi.string(),
      newsId: Joi.string(),
      fullName: Joi.string(),
      email: Joi.string(),
      comment: Joi.string(),
      isDeleted: Joi.boolean(),
    });
    return schema.validateAsync(replyDto);
  }
}
