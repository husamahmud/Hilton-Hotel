import prisma from "../prisma/prisma-client.js";

export class ReviewDao {

    createReview = async (reviewDto) => {
        const review = await prisma.review.create({
            data: reviewDto
        });
        return review;
    }

    getReviewById = async (reviewId) => {
        const review = await prisma.review.findUnique({
            where: {
                id: reviewId,
                isDeleted: false
            }
        });
        return review;
    }

    getReviewsByUserId = async (userId) => {
        const reviews = await prisma.review.findMany({
            where: {
                userId: userId
            }
        });
        return reviews;
    }

    getAllReviews = async () => {
        const reviews = await prisma.review.findMany({
            where: {
                isDeleted: false
            }
        });
        return reviews;
    }

    getAverageRating = async () => {
        const reviews = await prisma.review.findMany();
        if (reviews.length === 0) {
            return 0;
        }

        const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
        const averageRating = (totalRating / reviews.length).toFixed(1);

        return parseFloat(averageRating);
    }

    updateReview = async (reviewDto) => {
        const review = await prisma.review.update({
            where: {
                id: reviewDto.id
            },
            data: reviewDto
        });
        return review;
    }

    deleteReview = async (reviewId) => {
        const review = await prisma.review.update({
            where: {
                id: reviewId
            },
            data: {
                isDeleted: true
            }
        });
        return review;
    }
}