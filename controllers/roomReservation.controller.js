import { RoomReservationValidate } from "../middlewares/validations/roomReservation.validate.js";
import { RoomReservationDto } from "../models/dto/roomReservation.dto.js";
import { RoomReservationDao } from "../models/dao/roomReservation.dao.js";

export class RoomReservationController {

    static createRoomReservation = async (req, res) => {
        const roomReservationDto = new RoomReservationDto(req.body); // => roomId, userId
        const roomReservationDao = new RoomReservationDao();

        if (!roomReservationDto.children) roomReservationDto.children = 0;

        roomReservationDto.checkIn = new Date(roomReservationDto.checkIn)
        roomReservationDto.checkOut = new Date(roomReservationDto.checkOut)

        try {
            const { error } = await RoomReservationValidate.createRoomReservation(roomReservationDto);
            if (error) return res.status(400).json({ message: error.details[0].message });

            const room = await roomReservationDao.createRoomReservation(roomReservationDto);
            return res.status(200).json({
                message: 'Room reserved successfully',
                data: room,
            });
        } catch (e) {
            return res.status(500).json({ error: e.message || 'Internal server error' });
        }
    }

    static getRoomReservations = async (req, res) => {
        const roomReservationDao = new RoomReservationDao();
        try {
            const roomReservations = await roomReservationDao.getRoomReservations(req.params.roomId);
            return res.status(200).json({
                message: 'Room reservations retrieved successfully',
                data: roomReservations,
            });
        } catch (e) {
            return res.status(500).json({ error: e.message || 'Internal server error' });
        }
    }

    static getRoomReservationById = async (req, res) => {
        const roomReservationDao = new RoomReservationDao();
        try {
            const roomReservation = await roomReservationDao.getRoomReservationById(req.params.reservationId);
            return res.status(200).json({
                message: 'Room reservation retrieved successfully',
                data: roomReservation,
            });
        } catch (e) {
            return res.status(500).json({ error: e.message || 'Internal server error' });
        }
    }

    static updateRoomReservation = async (req, res) => {
        const roomReservationDto = new RoomReservationDto(req.body);
        const roomReservationDao = new RoomReservationDao();

        roomReservationDto.id = req.params.reservationId;

        if (req.files) roomReservationDto.images = req.files.map(img => img.path);
        if (roomReservationDto.checkIn) roomReservationDto.checkIn = new Date(roomReservationDto.checkIn)
        if (roomReservationDto.checkOut) roomReservationDto.checkOut = new Date(roomReservationDto.checkOut)

        try {
            const { error } = await RoomReservationValidate.updateRoomReservation(roomReservationDto);
            if (error) return res.status(400).json({ message: error.details[0].message });

            const room = await roomReservationDao.updateRoomReservation(roomReservationDto);
            console.log("room", room);
            return res.status(200).json({
                message: 'Room reservation updated successfully',
                data: room,
            });
        } catch (e) {
            console.log(e);
            return res.status(500).json({ error: e.message || 'Internal server error' });
        }
    }

    static cancelRoomReservation = async (req, res) => {
        const roomReservationDao = new RoomReservationDao();
        try {
            const room = await roomReservationDao.cancelRoomReservation(req.params.reservationId);
            return res.status(200).json({
                message: 'Room reservation cancelled successfully',
                data: room,
            });
        } catch (e) {
            return res.status(500).json({ error: e.message || 'Internal server error' });
        }
    }
}