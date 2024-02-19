import express from 'express';
import { SettingsController } from '../controllers/appSettings.controller';

const router = express.Router();

router
    .route('/')
    .post(SettingsController.createSettings)
    .get(SettingsController.getSettings)
    .put(SettingsController.updateSettings);

export default router;