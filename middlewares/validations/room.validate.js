import Joi from 'joi';

export class RoomValidate {
  static createRoom(roomDto) {
    const schema = Joi.object({
      roomNum: Joi.string().required(),
      types: Joi.valid('JUNIOR_SUITE', 'FAMILY_ROOM', 'DOUBLE_ROOM', 'DELAUX_ROOM', 'SUPERIOR_ROOM'),
      price: Joi.number().required(),
      description: Joi.string().required(),
      aminities: Joi.string().required(),
      images: Joi.string().required(),
      view: Joi.string().required(),
      isReserved: Joi.boolean().default(false),
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
      aminities: Joi.string(),
      images: Joi.string(),
      view: Joi.string(),
      isReserved: Joi.boolean(),
      isDeleted: Joi.boolean(),
    });
    return schema.validateAsync(roomDto);
  }
}
