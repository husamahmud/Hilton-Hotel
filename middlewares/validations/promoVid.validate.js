import Joi from 'joi';

export class promoVidValidate {
  static createVid(vidDto) {
    const schema = Joi.object({
      id: Joi.string(),
      adminId: Joi.string(),
      video: Joi.string().required(),
      description: Joi.string().required(),
    });
    return schema.validateAsync(vidDto);
  }

  static updateVid(vidDto) {
    const schema = Joi.object({
      id: Joi.string().required(),
      adminId: Joi.string().required(),
      video: Joi.string(),
      description: Joi.string(),
    });
    return schema.validateAsync(vidDto);
  }
}
