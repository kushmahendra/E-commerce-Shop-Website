import express from 'express';
import Product from '../models/productModel.js';
import Reviews from '../models/reviewsModel.js';

const handleReview = async (req, res) => {
    try {
        const { comment, rating, productId, userId, firstName ,lastName,profileImage } = req.body;

        // Validation: Check for required fields
        if (!comment || !rating || !productId || !userId ||!firstName || !profileImage) {
            return res.status(400).send({ message: "All fields are required" });
        }

        // Validate rating (1-5)
        if (typeof rating !== 'number' || rating < 1 || rating > 5) {
            return res.status(400).send({ message: "Rating must be a number between 1 and 5" });
        }

        // Check if the user has already reviewed the product
        const existingReview = await Reviews.findOne({ productId, userId,firstName,profileImage });
        // .populate('userId', 'userName')

        if (existingReview) {
            // Update existing review
            existingReview.comment = comment;
            existingReview.rating = rating;
            await existingReview.save();
        } else {
            // Create a new review
            await Reviews.create({
                comment,
                rating,
                productId,
                userId,
                firstName,
                lastName,
                profileImage,
            });
        }

        // Calculate the average rating
        const reviews = await Reviews.find({ productId });
        if (reviews.length > 0) {
            const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
            const averageRating = totalRating / reviews.length;

            const product = await Product.findById(productId);
            if (product) {
                product.rating = averageRating;
                await product.save();
            }
            else{
                return res.status(404).send({message:"Product not found"});
            }
        }

        return res.status(200).send({ message: "Review posted successfully" });
    } catch (error) {
        console.error("Error posting review:", error);
        res.status(500).send({ message: "Failed to post review" });
    }
};

const handleTotalReview=async(req,res)=>
{
    try {
       const totalReview=await Reviews.countDocuments({});
       res.status(200).send({totalReview});
 
    } catch (error) {
        console.error("Error getting total review:", error);
        res.status(500).send({ message: "Failed to count total review" });
    }

}

export { handleReview,handleTotalReview};
