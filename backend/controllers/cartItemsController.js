// import express from 'express'
// import Product from '../models/productModel.js';
// import { Cart } from '../models/cartAndCartItemModel.js';


// const handleCreateCartItem = async (req, res) => {
//     try {
//       const { userId, productId, quantity } = req.body;
  
//       // Validate input
//       if (!userId || !productId || !quantity || quantity <= 0) {
//         return res.status(400).json({ message: 'Invalid input data' });
//       }
  
//       // Find the product
//       const product = await Product.findById(productId);
//       if (!product) {
//         return res.status(404).json({ message: 'Product not found' });
//       }
  
//       // Find or create the user's cart
//       let userCart = await Cart.findOne({ user: userId });
//       if (!userCart) {
//         userCart = new Cart({ user: userId, items: [] });
//       }
  
//       // Check if the product is already in the cart
//       const existingCartItemIndex = userCart.items.findIndex(
//         (item) => item.product.toString() === productId
//       );
  
//       if (existingCartItemIndex > -1) {
//         // Update the quantity and total price of the existing cart item
//         userCart.items[existingCartItemIndex].quantity += quantity;
//         userCart.items[existingCartItemIndex].totalPrice =
//           userCart.items[existingCartItemIndex].quantity * product.price;
//       } else {
//         // Add a new item to the cart
//         userCart.items.push({
//           product: productId,
//           quantity,
//           totalPrice: product.price * quantity,
//         });
//       }
  

//       // Save the updated cart
//       await userCart.save();
  
//       res.status(200).json({ message: 'Cart updated', cart: userCart });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: 'Internal Server Error', error: error.message });
//     }
//   };
  


//   export default handleCreateCartItem;

