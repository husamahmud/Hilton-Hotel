import express from "express";
import { RoomController } from "../controllers/room.controller.js";

const router = express.Router();

// TODO admin middleware verification
router
    .route("/")
    .post(RoomController.createRoom)
    .get(RoomController.getAllRooms); // not admin

router
    .route("/:roomId")
    .get(RoomController.getRoomById) // not admin
    .put(RoomController.updateRoom)
    .delete(RoomController.softDeleteRoom);

router
    .route("/room/:roomNum")
    .get(RoomController.getRoomByRoomNum); // not admin


export default router;