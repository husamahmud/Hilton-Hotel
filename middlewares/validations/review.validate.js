import Joi from "joi";

export class ReviewValidate {
    static createReview(reviewDto) {
        const schema = Joi.object({
            id: Joi.string(),
            userId: Joi.string().required(),
            rating: Joi.number().required().min(0).max(5),
            comment: Joi.string().required(),
            isDeleted: Joi.boolean().default(false)
        });
        return schema.validateAsync(reviewDto);
    }

    static updateReview(reviewDto) {
        const schema = Joi.object({
            id: Joi.string().required(),
            userId: Joi.string().required(),
            rating: Joi.number(),
            comment: Joi.string(),
            isDeleted: Joi.boolean()
        });
        return schema.validateAsync(reviewDto);
    }
}