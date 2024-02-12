import express from 'express';
import { UserController } from '../controllers/user.controller.js';
import upload from '../middlewares/upload.js';

const router = express.Router();

router
  .route('/')
  .get(UserController.getAllUsers)
  .post(upload.single('profilePic'), UserController.createUser);

router
  .route('/:userId')
  .get(UserController.getUserById)
  .put(upload.single('profilePic'), UserController.updateUser);

router
  .route('/delete/:userId')
  .put(UserController.softDeleteUser)
  .delete(UserController.hardDeleteUser);

export default router;
