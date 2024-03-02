import { HomeSliderDao } from "../models/dao/homeSliders.dao.js";
import { HomeSlidersDto } from "../models/dto/homeSliders.dto.js";
import { homeSlidersValidate } from "../middlewares/validations/homeSliders.validate.js";
import { validateAdminId } from "../utilities/Id_validations/users.id.validation.js";
import fs from 'fs';
import path from 'path';

export class HomeSlidersController {

    static createSlider = async (req, res) => {
        const sliderDto = new HomeSlidersDto(req.body);
        if (req.file) sliderDto.photo = req.file.path;

        const sliderDao = new HomeSliderDao();

        try {

            await validateAdminId(sliderDto.adminId);

            const { error } = await homeSlidersValidate.createSlider(sliderDto);
            if (error) return res.status(400).json({ message: error.message });

            const slider = await sliderDao.createSlider(sliderDto);

            return res.status(200).json({ message: 'Slider created successfully', slider });

        } catch (error) {
            console.log(error)
            return res.status(500).json({ error: error.message });
        }
    }

    static getSliderById = async (req, res) => {
        const sliderId = req.params.sliderId;

        const sliderDao = new HomeSliderDao();

        try {
            const slider = await sliderDao.getSliderById(sliderId);

            if (!slider) return res.status(404).json({ message: 'Slider not found' });

            return res.status(200).json({ message:"Slider Fetched successufully", slider });

        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    static getAllSliders = async (req, res) => {
        const sliderDao = new HomeSliderDao();

        try {
            const sliders = await sliderDao.getAllSliders();

            return res.status(200).json({ message:"Sliders Fetched successufully", sliders });

        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    static updateSlider = async (req, res) => {
        const sliderDto = new HomeSlidersDto(req.body);
        if (req.file) sliderDto.photo = req.file.path;

        const sliderDao = new HomeSliderDao();

        try {

            await validateAdminId(sliderDto.adminId);

            const slider = await sliderDao.getSliderById(sliderDto.id);

            if (sliderDto.photo && slider.photo) {
                if (fs.existsSync(path.join(__dirname,`../uploads/${slider.photo}` ))) {
                    fs.unlinkSync(path.join(__dirname,`../uploads/${slider.photo}` ));
                }
            }

            const { error } = await homeSlidersValidate.updateSlider(sliderDto);
            if (error) return res.status(400).json({ message: error.message });

            const updatedSlider = await sliderDao.updateSlider(sliderDto);

            return res.status(200).json({ message: 'Slider updated successfully', updatedSlider });

        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    static deleteSlider = async (req, res) => {
        const sliderId = req.params.sliderId;

        const sliderDao = new HomeSliderDao();

        try {

            const deletedSlider = await sliderDao.deleteSlider(sliderId);

            return res.status(200).json({ message: 'Slider deleted successfully', deletedSlider });

        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

}