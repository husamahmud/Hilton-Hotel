import express from 'express';
import { RoomReservationController } from '../controllers/roomReservation.controller.js';

const router = express.Router();

router
  .route('/')
  .post(RoomReservationController.createRoomReservation)
  .get(RoomReservationController.getRoomReservations);

router
  .route('/:reservationId')
  .get(RoomReservationController.getRoomReservationById)
  .put(RoomReservationController.updateRoomReservation)
  .delete(RoomReservationController.cancelRoomReservation);

export default router;
