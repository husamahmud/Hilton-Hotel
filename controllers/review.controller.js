import { ReviewDto } from "../models/dto/review.dto.js";
import { ReviewDao } from "../models/dao/review.dao.js";
import { ReviewValidate } from "../middlewares/validations/review.validate.js";

export class ReviewController {

    static createReview = async (req, res) => {
        const reviewDto = new ReviewDto(req.body);

        const reviewDao = new ReviewDao();

        try {
            const { error } = await ReviewValidate.createReview(reviewDto);
            if (error) return res.status(400).json({ message: error.details[0].message });

            const review = await reviewDao.createReview(reviewDto);
            res.status(201).json({ message: 'Review created successfully', data: review });
        } catch (error) {
           console.log(error);
           return res.status(500).json({ error: error.message });
        }
    }

    static getReviewById = async (req, res) => {
        const reviewId = req.params.reviewId;

        const reviewDao = new ReviewDao();

        try {
            const review = await reviewDao.getReviewById(reviewId);
            res.status(200).json({ data: review });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: error.message });
        }
    }

    static getReviewsByUserId = async (req, res) => {
        const userId = req.params.userId;

        const reviewDao = new ReviewDao();

        try {
            const reviews = await reviewDao.getReviewsByUserId(userId);
            res.status(200).json({ data: reviews });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: error.message });
        }
    }

    static getAllReviews = async (req, res) => {
        const reviewDao = new ReviewDao();

        try {
            const reviews = await reviewDao.getAllReviews();
            res.status(200).json({ data: reviews });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: error.message });
        }
    }

    static getAverageRating = async (req, res) => {
        const reviewDao = new ReviewDao();

        try {
            const averageRating = await reviewDao.getAverageRating();
            res.status(200).json({ data: averageRating });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: error.message });
        }
    }

    static updateReview = async (req, res) => {
        const reviewDto = new ReviewDto(req.body);

        const reviewDao = new ReviewDao();

        try {
            const { error } = await ReviewValidate.updateReview(reviewDto);
            if (error) return res.status(400).json({ message: error.details[0].message });

            const review = await reviewDao.updateReview(reviewDto);
            res.status(200).json({ message: 'Review updated successfully', data: review });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: error.message });
        }
    }

    static deleteReview = async (req, res) => {
        const reviewId = req.params.reviewId;

        const reviewDao = new ReviewDao();

        try {
            const review = await reviewDao.deleteReview(reviewId);
            res.status(200).json({ message: 'Review deleted successfully', data: review });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: error.message });
        }
    }
}