import Joi from 'joi';

export class SettingsValidate {
    static createSettings = (settingsDto) => {
        const schema = Joi.object({
            id: Joi.string(),
            adminId: Joi.string().required(),
            hotelName: Joi.string().required(),
            logo: Joi.string().required(),
            address: Joi.string().required(),
            phoneNum: Joi.string().required(),
            email: Joi.string().required(),
            socialMedia: Joi.object({
                facebook: Joi.string(),
                instagram: Joi.string(),
                twitter: Joi.string(),
                youtube: Joi.string(),
                tiktok: Joi.string(),
            }).required(),
        });
        return schema.validateAsync(settingsDto);
    }

    static updateSettings = (settingsDto) => {
        const schema = Joi.object({
            id: Joi.string().required(),
            adminId: Joi.string().required(),
            hotelName: Joi.string(),
            logo: Joi.string(),
            address: Joi.string(),
            phoneNum: Joi.string(),
            email: Joi.string(),
            socialMedia: Joi.object({
                facebook: Joi.string(),
                instagram: Joi.string(),
                twitter: Joi.string(),
                youtube: Joi.string(),
                tiktok: Joi.string(),
            }),
        });
        return schema.validateAsync(settingsDto);
    }
}