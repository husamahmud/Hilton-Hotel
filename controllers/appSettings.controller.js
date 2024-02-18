import { SettingsDto } from "../models/dto/appSettings.dto";
import { SettingsDao } from "../models/dao/appSettings.dao";
import { SettingsValidate } from "../middlewares/validations/appSettings.validate";

export class SettingsController {

    static createSettings = async (req, res) => {
        const settingsDto = new SettingsDto(req.body);
        const settingsDao = new SettingsDao();

        try {
            const { error } = await SettingsValidate.createSettings(settingsDto);
            if (error) return res.status(400).json({ error: error.message });

            const settings = await settingsDao.createSettings(settingsDto);
            res.status(200).json({message: 'Settings created successfully', data: settings});
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static getSettings = async (req, res) => {
        const settingsDao = new SettingsDao();

        try {
            const settings = await settingsDao.getSettings();
            res.status(200).json({ message: "Settings fetched successufully", data: settings });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static updateSettings = async (req, res) => {
        const settingsDto = new SettingsDto(req.body);
        const settingsDao = new SettingsDao();

        try {
            const { error } = await SettingsValidate.updateSettings(settingsDto);
            if (error) return res.status(400).json({ error: error.message });

            const settings = await settingsDao.updateSettings(settingsDto);
            res.status(200).json({ message: "Settings updated successfully", data: settings });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}