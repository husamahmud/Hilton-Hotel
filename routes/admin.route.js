import {AdminController} from '../controllers/admin.controller';

const express = require('express')
const router = express.Router();

router.route('/').post(AdminController.createAdmin)

export default router
