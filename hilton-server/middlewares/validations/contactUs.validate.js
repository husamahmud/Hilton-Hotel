import Joi from "joi";

export class ContactUsValidate {
  static createContactUs = (contactUsDto) => {
    const schema = Joi.object({
        id: Joi.string(),
        adminId: Joi.string(),
        fullName: Joi.string().required(),
        email: Joi.string().email().required(),
        phoneNum: Joi.string().required(),
        subject: Joi.string().required(),
        description: Joi.string().required(),
        isDeleted: Joi.boolean().default(false),
        isRead: Joi.boolean().default(false),
    });

    return schema.validateAsync(contactUsDto);

  };
    static updateContactUs = (contactUsDto) => {
        const schema = Joi.object({
            id: Joi.string().required(),
            adminId: Joi.string().required(),
            fullName: Joi.string(),
            email: Joi.string().email(),
            phoneNum: Joi.string(),
            subject: Joi.string(),
            description: Joi.string(),
            isDeleted: Joi.boolean(),
            isRead: Joi.boolean(),
        });

        return schema.validateAsync(contactUsDto);
    };

}