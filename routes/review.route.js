import express from 'express';
import { ReviewController } from '../controllers/review.controller.js';

const router = express.Router();

router
    .route('/')
    .post(ReviewController.createReview)
    .get(ReviewController.getAllReviews)
    .put(ReviewController.updateReview);

router
    .route('/:reviewId')
    .get(ReviewController.getReviewById)
    .delete(ReviewController.deleteReview);


router
    .route('/user/:userId')
    .get(ReviewController.getReviewsByUserId);

router
    .route('/average/rating/get')
    .get(ReviewController.getAverageRating);

export default router;