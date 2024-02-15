import { RoomDao } from "../models/dao/room.dao.js";
import { RoomDto } from "../models/dto/room.dto.js";
import { RoomValidate } from "../middlewares/validations/room.validate.js";

export class RoomController {

    static createRoom = async (req, res) => {
        const roomDto = new RoomDto(req.body);
        const roomDao = new RoomDao();

        if (req.files) roomDto.images = req.files.map(img => img.path);

        try {
            const { error } = await RoomValidate.createRoom(roomDto);
            if (error) return res.status(400).json({ message: error.details[0].message });

            const room = await roomDao.createRoom(roomDto);
            return res.status(200).json({
                message: 'Room created successfully',
                data: room,
            });
        } catch (e) {
            console.log(e);
            return res.status(500).json({ error: e.message || 'Internal server error' });
        }
    }

    static getRoomById = async (req, res) => {
        const roomDao = new RoomDao();
        try {
            const room = await roomDao.getRoomById(req.params.roomId);
            return res.status(200).json({
                message: 'Room retrieved successfully with its reservations',
                data: room,
            });
        } catch (e) {
            return res.status(500).json({ error: e.message || 'Internal server error' });
        }
    }

    static getAllRooms = async (req, res) => {
        const roomDao = new RoomDao();
        try {
            const rooms = await roomDao.getAllRooms();
            return res.status(200).json({
                message: 'Rooms retrieved successfully',
                data: rooms,
            });
        } catch (e) {
            return res.status(500).json({ error: e.message || 'Internal server error' });
        }
    }

    static getRoomByRoomNum = async (req, res) => {
        const roomDao = new RoomDao();
        try {
            const room = await roomDao.getRoomByRoomNum(req.body.roomNum);
            return res.status(200).json({
                message: 'Room retrieved successfully',
                data: room,
            });
        } catch (e) {
            return res.status(500).json({ error: e.message || 'Internal server error' });
        }
    }

    static updateRoom = async (req, res) => {
        const roomDto = new RoomDto(req.body);
        const roomDao = new RoomDao();

        roomDto.id = req.params.roomId;

        if (req.files) roomDto.images = req.files.map(img => img.path);

        try {
            const { error } = await RoomValidate.updateRoom(roomDto);
            if (error) return res.status(400).json({ message: error.details[0].message });

            const room = await roomDao.updateRoom(roomDto);
            return res.status(200).json({
                message: 'Room updated successfully',
                data: room,
            });
        } catch (e) {
            return res.status(500).json({ error: e.message || 'Internal server error' });
        }
    }

    static softDeleteRoom = async (req, res) => {
        const roomDao = new RoomDao();
        try {
            const room = await roomDao.softDeleteRoom(req.params.roomId);
            return res.status(200).json({
                message: 'Room deleted successfully',
                data: room,
            });
        } catch (e) {
            return res.status(500).json({ error: e.message || 'Internal server error' });
        }
    }

}