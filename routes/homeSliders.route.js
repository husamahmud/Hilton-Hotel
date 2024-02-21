import express from 'express';
import { HomeSlidersController } from '../controllers/homeSliders.controllers.js';
import upload from '../middlewares/upload.js';

const router = express.Router();

router
    .route('/')
    .post(upload.single('photo'), HomeSlidersController.createSlider)
    .get(HomeSlidersController.getAllSliders);

router
    .route('/:sliderId')
    .get(HomeSlidersController.getSliderById)
    .put(upload.single('photo'), HomeSlidersController.updateSlider)
    .delete(HomeSlidersController.deleteSlider);

export default router;