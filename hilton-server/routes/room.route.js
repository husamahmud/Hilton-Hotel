import express from "express";
import { RoomController } from "../controllers/room.controller.js";
import upload from '../middlewares/upload.js';

const router = express.Router();

// TODO admin middleware verification
router
    .route("/")
    .post(upload.any() ,RoomController.createRoom)
    .get(RoomController.getAllRooms); // not admin

router
    .route("/:roomId")
    .get(RoomController.getRoomById) // not admin
    .put(upload.any()  ,RoomController.updateRoom)
    .delete(RoomController.softDeleteRoom);

router
    .route("/room/:roomNum")
    .get(RoomController.getRoomByRoomNum); // not admin


export default router;