import express from "express";
import { RoomReservationController } from "../controllers/roomReservation.controller.js";

const router = express.Router();

// adminnnnnnnnn

router
    .route("/")
    .post(RoomReservationController.createRoomReservation) // not admin
    .get(RoomReservationController.getRoomReservations);

router
    .route("/:reservationId")
    .get(RoomReservationController.getRoomReservationById)
    .put(RoomReservationController.updateRoomReservation)
    .delete(RoomReservationController.cancelRoomReservation); // not admin

export default router;