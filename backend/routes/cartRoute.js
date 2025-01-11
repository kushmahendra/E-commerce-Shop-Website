import express from 'express'
import { handleAddCart, handleClearCart, handleGetSingleCart, handleRemoveCart, handleUpdateCart } from '../controllers/cartController.js';


const cartRoute=express.Router();

cartRoute.post('/add-to-cart',handleAddCart);
cartRoute.get('/:userId', handleGetSingleCart);
cartRoute.put('/update-cart',handleUpdateCart);
cartRoute.delete('/remove-cart',handleRemoveCart);
cartRoute.delete('/clear-cart/:userId',handleClearCart);

export default cartRoute;