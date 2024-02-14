import Joi from 'joi';

export class RoomReservationValidate {
  static createRoomReservation(roomReservationDto) {
    const schema = Joi.object({
      userId: Joi.string().required(),
      roomId: Joi.string().required(),
      checkIn: Joi.date().required(),
      checkOut: Joi.date().required(),
      adults: Joi.number().required(),
      children: Joi.number().required(),
      isDeleted: Joi.boolean().default(false),
    });
    return schema.validateAsync(roomReservationDto);
  }

  static updateRoomReservation(roomReservationDto) {
    const schema = Joi.object({
      id: Joi.string().required(),
      userId: Joi.string(),
      roomId: Joi.string(),
      checkIn: Joi.date(),
      checkOut: Joi.date(),
      adults: Joi.number(),
      children: Joi.number(),
      isDeleted: Joi.boolean(),
    });
    return schema.validateAsync(roomReservationDto);
  }
}
