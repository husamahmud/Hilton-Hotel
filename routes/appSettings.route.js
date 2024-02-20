import express from 'express';
import { SettingsController } from '../controllers/appSettings.controller.js';
import upload from '../middlewares/upload.js';

const router = express.Router();

router
    .route('/')
    .post(upload.single('logo') ,SettingsController.createSettings)
    .get(SettingsController.getSettings)
    .put(upload.single('logo') ,SettingsController.updateSettings);

export default router;
