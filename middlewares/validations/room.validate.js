import Joi from 'joi';

export class RoomValidate {
  static createRoom(roomDto) {
    const schema = Joi.object({
      roomNum: Joi.string().required(),
      types: Joi.valid('JUNIOR_SUITE', 'FAMILY_ROOM', 'DOUBLE_ROOM', 'DELAUX_ROOM', 'SUPERIOR_ROOM'),
      price: Joi.string().required(),
      description: Joi.string().required(),
      aminities: Joi.array().required(),
      images: Joi.array().required(),
      view: Joi.string().required(),
      isDeleted: Joi.boolean().default(false),
    });
    return schema.validateAsync(roomDto);
  }

  static updateRoom(roomDto) {
    const schema = Joi.object({
      id: Joi.string().required(),
      roomNum: Joi.string(),
      types: Joi.string(),
      price: Joi.number(),
      description: Joi.string(),
      aminities: Joi.array(),
      images: Joi.array(),
      view: Joi.string(),
      isDeleted: Joi.boolean(),
    });
    return schema.validateAsync(roomDto);
  }
}
