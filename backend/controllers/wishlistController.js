import express from 'express'
import Wishlist from '../models/wishlistModel.js';
import Product from '../models/productModel.js';

// Add item to the wishlist
const handleAddToWishlist = async (req, res) => {
    const { userId, productId } = req.body;
  
    try {
      // Find or create a wishlist for the user
      let wishlist = await Wishlist.findOne({ userId });
  
      if (!wishlist) {
        wishlist = new Wishlist({ userId, items: [] });
      }
  
      // Check if the product is already in the wishlist
      const productExists = wishlist.items.some(
        (item) => item.product.toString() === productId
      );
  
      if (productExists) {
        return res.status(400).json({ message: 'Product already in wishlist' });
      }
  
      // Fetch product details
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      // Add the product and its details to the wishlist
      wishlist.items.push({
        product: product._id,
        name: product.name,
        price: product.price,
        image: product.image,
        stock: product.stock,
        color: product.color,
        category: product.category,
        description: product.description,
      });
  
      await wishlist.save();
  
      res.status(200).json({ message: 'Product added to wishlist successfully', wishlist });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  
  
  // Delete an item from the wishlist
  const handleDeleteFromWishlist = async (req, res) => {
    const { userId, productId } = req.body;
  
    try {
      // Find the user's wishlist
      const wishlist = await Wishlist.findOne({ userId });
  
      if (!wishlist) {
        return res.status(400).json({ message: 'Wishlist not found' });
      }
  
      // Find and remove the product from the wishlist
      wishlist.items = wishlist.items.filter(
        (item) => item.product.toString() !== productId
      );
  
      await wishlist.save();
  
      res.status(200).json({ message: 'Product removed from wishlist successfully', wishlist });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  
  // Get all items in the wishlist
  const handleGetAllWishlistItems = async (req, res) => {
    const { userId } = req.params;
  console.log('userId in wishlist',userId );
  
    try {
      const wishlist = await Wishlist.findOne({ userId }).populate('items.product');
  
      if (!wishlist) {
        return res.status(400).json({ message: 'Wishlist not found' });
      }
  
      res.status(200).json({message:"get all products successfully from  wishlist " ,wishlist });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };

export {handleAddToWishlist,handleDeleteFromWishlist,handleGetAllWishlistItems}
