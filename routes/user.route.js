import express from 'express';
import { UserController } from '../controllers/user.controller.js';
import upload from '../middlewares/upload.js';

const router = express.Router();

router.route('/')
  .post(upload.single('profilePic'), UserController.createUser);

export default router;
