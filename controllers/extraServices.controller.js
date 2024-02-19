import { ExtraServicesDto } from "../models/dto/extraServices.dto.js";
import { ExtraServicesDao } from "../models/dao/extraServices.dao.js";
import { ExtraServicesValidation } from "../middlewares/validations/extraServices.validate.js";
import { validateRoomId } from "../utilities/Id_validations/hotelServices.id.validate.js";

export class ExtraServicesController {

    static createExtraServices = async (req, res) => {
        const extraServicesDto = new ExtraServicesDto(req.body);
        const extraServicesDao = new ExtraServicesDao();

        try {

            await validateRoomId(req.body.roomId);

            const { error } = await ExtraServicesValidation.createExtraServices(extraServicesDto);
            if (error) return res.status(400).json({ message: error.message });

            const extraServices = await extraServicesDao.createExtraServices(extraServicesDto);
            return res.status(201).json({ message: 'Extra services created successufully', data: extraServices });

        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: error.message });
        }
    }

    static getAllExtraServices = async (req, res) => {
        const extraServicesDao = new ExtraServicesDao();

        try {
            const extraServices = await extraServicesDao.getAllExtraServices();
            return res.status(200).json({ message: 'Extra services fetched successfully', data: extraServices });

        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: error.message });
        }
    }

    static getExtraServicesById = async (req, res) => {
        const { serviceId } = req.params;
        const extraServicesDao = new ExtraServicesDao();

        try {
            const extraServices = await extraServicesDao.getExtraServicesById(serviceId);
            return res.status(200).json({ message: 'Extra services fetched successfully', data: extraServices });

        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: error.message });
        }
    }

    static getRoomExtraServices = async (req, res) => {
        const { roomId } = req.params;
        const extraServicesDao = new ExtraServicesDao();

        try {

            await validateRoomId(roomId);

            const extraServices = await extraServicesDao.getRoomExtraServices(roomId);
            return res.status(200).json({ message: 'Extra services fetched successfully', data: extraServices });

        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: error.message });
        }
    }

    static updateExtraServices = async (req, res) => {
        const extraServicesDto = new ExtraServicesDto(req.body);
        extraServicesDto.id = req.params.serviceId;
        const extraServicesDao = new ExtraServicesDao();

        try {

            await validateRoomId(req.body.roomId);

            const { error } = await ExtraServicesValidation.updateExtraServices(extraServicesDto);
            if (error) return res.status(400).json({ message: error.message });

            const extraServices = await extraServicesDao.updateExtraServices(extraServicesDto);
            return res.status(200).json({ message: 'Extra services updated successfully', data: extraServices });

        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: error.message });
        }
    }

    static deleteExtraServices = async (req, res) => {
        const { serviceId } = req.params;
        const extraServicesDao = new ExtraServicesDao();

        try {
            const extraServices = await extraServicesDao.deleteExtraServices(serviceId);
            return res.status(200).json({ message: 'Extra services deleted successfully', data: extraServices });

        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: error.message });
        }
    }
}