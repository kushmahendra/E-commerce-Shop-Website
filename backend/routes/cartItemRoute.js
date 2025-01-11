import express from 'express';
import handleCreateCartItem from '../controllers/cartItemsController.js';

const cartItemRoute = express.Router();  // Declare the variable using `const` or `let`

cartItemRoute.post('/add-to-cart', handleCreateCartItem);

export default cartItemRoute;
