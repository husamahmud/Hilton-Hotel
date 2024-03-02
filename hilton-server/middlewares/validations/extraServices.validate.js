import Joi from 'joi';

export class ExtraServicesValidation {

    static createExtraServices (extraServicesDto) {

        const schema = Joi.object({
            id: Joi.string(),
            roomId: Joi.string().required(),
            name: Joi.string().min(3).max(80).required().trim(),
            price: Joi.string().required(),
            facilities: Joi.array().items(Joi.string()).required(),
            isDeleted: Joi.boolean().default(false)
        })

        return schema.validateAsync(extraServicesDto)
    }

    static updateExtraServices (extraServicesDto) {

        const schema = Joi.object({
            id: Joi.string(),
            roomId: Joi.string(),
            name: Joi.string().min(3).max(80).trim(),
            price: Joi.string(),
            facilities: Joi.array().items(Joi.string()),
            isDeleted: Joi.boolean()
        })

        return schema.validateAsync(extraServicesDto)
    }
}