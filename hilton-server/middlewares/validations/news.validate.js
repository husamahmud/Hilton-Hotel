import Joi from 'joi';

export class NewsValidate {
  static createNews(newsDto) {
    const schema = Joi.object({
      adminId: Joi.string().required(),
      title: Joi.string().required(),
      subTitle: Joi.string().required(),
      description: Joi.string().required(),
      images: Joi.array(),
      isDeleted: Joi.boolean().default(false),
    });
    return schema.validateAsync(newsDto);
  }

  static updateNews(newsDto) {
    const schema = Joi.object({
      id: Joi.string(),
      adminId: Joi.string(),
      title: Joi.string(),
      subTitle: Joi.string(),
      description: Joi.string(),
      images: Joi.array(),
      isDeleted: Joi.boolean(),
    });
    return schema.validateAsync(newsDto);
  }
}
