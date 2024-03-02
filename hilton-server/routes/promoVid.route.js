import express from 'express';
import { PromoVidController } from '../controllers/promoVid.controller.js';
import upload from '../middlewares/upload.js';

const router = express.Router();

router
  .route('/')
  .post(upload.single('video'), PromoVidController.createPromoVid) // TODO
  .get(PromoVidController.getAllPromoVids);

router
  .route('/:promoVidId')
  .get(PromoVidController.getPromoVidById)
  .put(upload.single('video'), PromoVidController.updatePromoVid)
  .delete(PromoVidController.deletePromoVid);

export default router;
