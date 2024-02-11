import express from 'express';
import {AdminController} from '../controllers/admin.controller.js';


const router = express.Router();

router.route('/')
	.post(AdminController.createAdmin)
	.get(AdminController.getAllAdmins)

router.route('/:adminId')
	.get(AdminController.getAdminById)
	.put(AdminController.updateAdmin)

router.route('/delete/:adminId')
	.put(AdminController.softDeleteAdmin)
	.delete(AdminController.hardDeleteAdmin)


export default router
