import Joi from 'joi';

export class FaqsValidate {
  static createFaqs(faqsDto) {
    const schema = Joi.object({
      id: Joi.string(),
      question: Joi.string().required(),
      answer: Joi.string().required(),
      isDeleted: Joi.boolean().default(false),
    });
    return schema.validateAsync(faqsDto);
  }

  static updateFaqs(faqsDto) {
    const schema = Joi.object({
      id: Joi.string().required(),
      question: Joi.string(),
      answer: Joi.string(),
      isDeleted: Joi.boolean(),
    });
    return schema.validateAsync(faqsDto);
  }
}
