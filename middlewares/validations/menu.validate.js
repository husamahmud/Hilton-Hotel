import Joi from "joi";

export class MenuValidate {
    static createMenu(menuDto) {
        const schema = Joi.object({
            id: Joi.string().allow(null),
            userId: Joi.string().required(),
            restaurantId: Joi.string().required(),
            menuTypes: Joi.valid('STARTERS', 'MAINS', 'SALADS', 'WINE'),
            name: Joi.string().required(),
            ingredients: Joi.string().required(),
            price: Joi.number().required(),
            image: Joi.string().required(),
            isDeleted: Joi.boolean().default(false),
        });
        return schema.validateAsync(menuDto);
    }

    static updateMenu(menuDto) {
        const schema = Joi.object({
            id: Joi.string().required(),
            userId: Joi.string(),
            restaurantId: Joi.string(),
            menuTypes: Joi.valid('STARTERS', 'MAINS', 'SALADS', 'WINE'),
            name: Joi.string(),
            ingredients: Joi.string(),
            price: Joi.number(),
            image: Joi.string(),
            isDeleted: Joi.boolean(),
        });
        return schema.validateAsync(menuDto);
    }
}