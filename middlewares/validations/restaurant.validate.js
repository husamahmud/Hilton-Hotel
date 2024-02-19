import Joi from 'joi';

export class RestaurantValidate {
    static createRestaurant(restaurantDto) {
        const schema = Joi.object({
        id: Joi.string().allow(null),
        adminId: Joi.string().required(),
        description: Joi.string().min(20).required(),
        });
        return schema.validateAsync(restaurantDto);
    }

    static updateRestaurant(restaurantDto) {
        const schema = Joi.object({
        id: Joi.string().required(),
        adminId: Joi.string().required(),
        description: Joi.string().min(20),
        });
        return schema.validateAsync(restaurantDto);
    }
}