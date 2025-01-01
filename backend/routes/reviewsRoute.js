import express from 'express'
import {handleReview,handleTotalReview} from '../controllers/reviewsController.js';

const reviewRoute=express.Router();



// endpoint
reviewRoute.post('/post-review',handleReview);
reviewRoute.get('/total-review',handleTotalReview)

export default reviewRoute;