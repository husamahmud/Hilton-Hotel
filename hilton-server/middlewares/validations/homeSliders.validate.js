import Joi from 'joi';

export class homeSlidersValidate {
    static createSlider (sliderDto) {
        const schema = Joi.object({
            id: Joi.string(),
            adminId: Joi.string().required(),
            photo: Joi.string().required(),
            header: Joi.string().required(),
            paragraph: Joi.string().required(),
            isDeleted : Joi.boolean().default(false),
        });
        return schema.validateAsync(sliderDto);
    }

    static updateSlider (sliderDto) {
        const schema = Joi.object({
            id: Joi.string().required(),
            adminId: Joi.string().required(),
            photo: Joi.string().optional(),
            header: Joi.string().optional(),
            paragraph: Joi.string().optional(),
            isDeleted : Joi.boolean().default(false),
        });
        return schema.validateAsync(sliderDto);
    }
}