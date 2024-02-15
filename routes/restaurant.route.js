import express from 'express';
import { RestaurantController } from '../controllers/restaurant.controller.js';

const router = express.Router();

router
    .route('/')
    .post(RestaurantController.createRestaurant)
    .get(RestaurantController.getRestaurants);

router
    .route('/:restaurantId')
    .get(RestaurantController.getRestaurantById)
    .put(RestaurantController.updateRestaurant)

export default router;