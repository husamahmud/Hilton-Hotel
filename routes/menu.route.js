import express from 'express';
import { MenuController } from '../controllers/menu.controller.js';

import upload from '../middlewares/upload.js';

const router = express.Router();


router
    .route('/')
    .post(upload.single('image'), MenuController.createMenu)
    .get(MenuController.getAllMenus);


router
    .route('/:menuId')
    .get(MenuController.getMenuById)
    .put(upload.single('image'), MenuController.updateMenu)
    .delete(MenuController.deleteMenu);


router
    .route('/restaurant/:restaurantId')
    .get(MenuController.getMenusByRestaurantId);

router
    .route('/user/:userId')
    .get(MenuController.getMenuByUserId);

export default router;