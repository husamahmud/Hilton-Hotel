import express from 'express';
import { ExtraServicesController } from '../controllers/extraServices.controller.js';

const router = express.Router();

router
    .route('/')
    .get(ExtraServicesController.getAllExtraServices)
    .post(ExtraServicesController.createExtraServices);

router
    .route('/:serviceId')
    .get(ExtraServicesController.getExtraServicesById)
    .put(ExtraServicesController.updateExtraServices)
    .delete(ExtraServicesController.deleteExtraServices);

router
    .route('/room/:roomId')
    .get(ExtraServicesController.getRoomExtraServices);


export default router;
