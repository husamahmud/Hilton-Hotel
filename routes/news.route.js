import express from 'express';
import { NewsController } from '../controllers/news.controller.js';

import upload from '../middlewares/upload.js';

const router = express.Router();

router
  .route('/')
  .post(upload.any(), NewsController.createNews)
  .get(NewsController.getAllNews);

router
  .route('/:newsId')
  .get(NewsController.getNewsById)
  .put(upload.any(), NewsController.updateNews)
  .delete(NewsController.deleteById);

router
  .route('/news/:adminId')
  .get(NewsController.getNewsByAdminId);

export default router;
