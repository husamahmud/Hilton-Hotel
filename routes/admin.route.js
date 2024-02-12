import express from 'express';
import { AdminController } from '../controllers/admin.controller.js';
import upload from '../middlewares/upload.js';


const router = express.Router();

router
  .route('/')
  .get(AdminController.getAllAdmins);

router
  .route('/:adminId')
  .get(AdminController.getAdminById)
  .put(upload.single('profilePic'), AdminController.updateAdmin);

router
  .route('/delete/:adminId')
  .put(AdminController.softDeleteAdmin)
  .delete(AdminController.hardDeleteAdmin);


export default router;
