import express from 'express';
import { ClubHouseController } from '../controllers/clubHouse.controller.js';

const router = express.Router();

router
  .route('/')
  .post(ClubHouseController.createClubHouse)
  .get(ClubHouseController.getAllClubHouse);

router
  .route('/:clubHouseId')
  .get(ClubHouseController.getClubHouseById)
  .put(ClubHouseController.updateClubHouse)
  .delete(ClubHouseController.deleteClubHouse);

export default router;
