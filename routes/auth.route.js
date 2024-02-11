import express from 'express';
import {EmailController} from '../controllers/email.controller.js';


const router = express.Router();

router.get('/admin/email/:adminId/:token', EmailController.AdminConfirmation)

export default router
