
import express from 'express';
import { CartItem } from '../models/cartAndCartItemModel.js';
import Order from '../models/ordersModel.js';



// Create a new order
const handleCreateOrders = async (req, res) => {
  try {
    const { user, cartItems, totalAmount } = req.body;

    // Check if all CartItems exist
    for (const item of cartItems) {
      const cartItemExists = await CartItem.findById(item);
      if (!cartItemExists) {
        return res.status(400).json({ error: `CartItem with ID ${item} does not exist.` });
      }
    }

    // Create the new order with cartItems and totalAmount
    const newOrder = await Order.create({
      user,
      cartItems,
      totalAmount,
    });

    // Return the created order
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all orders
const handleGetAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate({
        path: 'user',
        model: 'ShopUser',
        select: 'firstName lastName email',
      })
      .populate({
        path: 'cartItems',
        model: 'CartItem',
        populate: {
          path: 'product',
          model: 'Product',
          select: 'name price color',
        },
      });

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single order by ID
const handleGetSingleOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate({
        path: 'user',
        model: 'ShopUser',
        select: 'firstName lastName email',
      })
      .populate({
        path: 'cartItems',
        model: 'CartItem',
        populate: {
          path: 'product',
          model: 'Product',
          select: 'name price color',
        },
      });

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update an order
const handleUpdateOrder = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete an order
const handleDeleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.status(200).json({ message: 'Order deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export {
  handleCreateOrders,
  handleGetAllOrders,
  handleGetSingleOrder,
  handleUpdateOrder,
  handleDeleteOrder,
};


// import express from 'express'
// import Order from "../models/ordersModel.js";
// import Product from "../models/productModel.js";


// // Create a new order
// const handleCreateOrders= async (req, res) => {
//     try {
//       const { user, products, totalAmount } = req.body;
  
//       // Check if all products exist
//       for (const item of products) {
//         const productExists = await Product.findById(item.product);
//         if (!productExists) {
//           return res.status(400).json({ error: `Product with ID ${item.product} does not exist.` });
//         }
//       }
//        // Use Mongoose's create method
//     const newOrder = await Order.create({
//       user,
//       products,
//       totalAmount,
//     });

//     // Return the created order
//     res.status(201).json(newOrder);
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   };
  
//   // Get all orders
// const handleGetAllOrders= async (req, res) => {
//     try {
//       const orders = await Order.find()
//       .populate({
//         path: 'user',
//         model: 'ShopUser',
//         select: 'firstName lastName email',
//       })
//       .populate({
//         path: 'products.product',
//         model: 'Product',
//         select: 'name price color',
//       });
//         // .populate('user', 'name email') // Populate user details (adjust fields as needed)
//         // .populate('products.product', 'name price'); // Populate product details
//       res.status(200).json(orders);
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   };
  
//   // Get a single order by ID
// const handleGetSingleOrder= async (req, res) => {
//     try {
//       const order = await Order.findById(req.params.id)
//       .populate({
//         path: 'user',
//         model: 'ShopUser',
//         select: 'firstName lastName email',
//       })
//       .populate({
//         path: 'products.product',
//         model: 'Product',
//         select: 'name price color',
//       });
//         // .populate('user', 'name email')
//         // .populate('products.product', 'name price');

//       if (!order) {
//         return res.status(404).json({ error: 'Order not found' });
//       }
//       res.status(200).json(order);
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   };
  
//   // Update an order
// const handleUpdateOrder= async (req, res) => {
//     try {
//       const { status } = req.body;
//       const order = await Order.findByIdAndUpdate(
//         req.params.id,
//         { status },
//         { new: true }
//       );
//       if (!order) {
//         return res.status(404).json({ error: 'Order not found' });
//       }
//       res.status(200).json(order);
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   };

  
//   // Delete an order
// const handleDeleteOrder= async (req, res) => {
//     try {
//       const order = await Order.findByIdAndDelete(req.params.id);
//       if (!order) {
//         return res.status(404).json({ error: 'Order not found' });
//       }
//       res.status(200).json({ message: 'Order deleted successfully' });
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   };

//   export {handleCreateOrders,handleGetAllOrders,handleGetSingleOrder,handleUpdateOrder,handleDeleteOrder};