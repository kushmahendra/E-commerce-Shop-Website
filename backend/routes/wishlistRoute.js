import express from 'express'
import {handleAddToWishlist,handleDeleteFromWishlist,handleGetAllWishlistItems} from '../controllers/wishlistController.js'

const wishlistRoute=express.Router();

wishlistRoute.post('/add-to-wishlist',handleAddToWishlist)
wishlistRoute.delete('/remove-from-wishlist',handleDeleteFromWishlist)
wishlistRoute.get('/wishlist/:userId',handleGetAllWishlistItems)

export default wishlistRoute