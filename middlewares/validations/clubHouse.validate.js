import Joi from 'joi';

export class ClubHouseValidate {
  static createClubHouse(clubHouseDto) {
    const schema = Joi.object({
      userId: Joi.string().required(),
      clubhouseTypes: Joi.valid('SPA', 'GYM', 'HEALTHCLUB').required(),
      description: Joi.string().required(),
      startTime: Joi.date().required(),
      endTime: Joi.date().required(),
      isDeleted: Joi.boolean().default(false),
    });
    return schema.validateAsync(clubHouseDto);
  }

  static updateClubHouse(clubHouseDto) {
    const schema = Joi.object({
      id: Joi.string(),
      userId: Joi.string(),
      clubhouseTypes: Joi.valid('SPA', 'GYM', 'HEALTHCLUB'),
      description: Joi.string(),
      startTime: Joi.date(),
      endTime: Joi.date(),
      isDeleted: Joi.boolean(),
    });
    return schema.validateAsync(clubHouseDto);
  }
}
