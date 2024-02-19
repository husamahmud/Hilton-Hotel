import express from 'express';
import { FaqsController } from '../controllers/faqs.controller.js';

const router = express.Router();

router
  .route('/')
  .post(FaqsController.createFaqs)
  .get(FaqsController.getAllFaqs);

router
  .route('/:id')
  .get(FaqsController.getFaqsById)
  .put(FaqsController.updateFaqs)
  .delete(FaqsController.deleteFaqs);

export default router;
