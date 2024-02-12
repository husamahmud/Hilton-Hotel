import express from 'express';
import { EmailController } from '../controllers/email.controller.js';
import { AuthController } from '../controllers/auth.controller.js';
import { UserController } from '../controllers/user.controller.js';
import { AdminController } from '../controllers/admin.controller.js';
import upload from '../middlewares/upload.js';

const router = express.Router();

/** Register */
router
  .route('/register')
  .post(upload.single('profilePic'), UserController.createUser);

router
  .route('/register/admin')
  .post(upload.single('profilePic'), AdminController.createAdmin);

router
  .route('/login')
  .post(AuthController.login);

/** passwords */
router
  .route('/password/forget')
  .post(AuthController.forgetPassword);

router
  .route('/password/reset/:userId/:token')
  .post(AuthController.resetPassword);

/** Email */
router
  .route('/admin/email/:adminId/:token')
  .get(EmailController.AdminConfirmation);

router
  .route('/user/email/:userId/:token')
  .get(EmailController.UserConfirmation);

export default router;
