import express from 'express';
import { AdminController } from '../controllers/admin.controller.js';


const router = express.Router();

router.route('/').post(AdminController.createAdmin)

export default router
