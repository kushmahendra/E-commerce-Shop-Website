import express from 'express'
import Order from "../models/ordersModel.js";
import Product from "../models/productModel.js";


// Create a new order
const handleCreateOrders= async (req, res) => {
    try {
      const { user, products, totalAmount } = req.body;
  
      // Check if all products exist
      for (const item of products) {
        const productExists = await Product.findById(item.product);
        if (!productExists) {
          return res.status(400).json({ error: `Product with ID ${item.product} does not exist.` });
        }
      }
  
      const newOrder = new Order({
        user,
        products,
        totalAmount,
      });
  
      const savedOrder = await newOrder.save();
      res.status(201).json(savedOrder);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // Get all orders
const handleGetAllOrders= async (req, res) => {
    try {
      const orders = await Order.find()
        .populate('user', 'name email') // Populate user details (adjust fields as needed)
        .populate('products.product', 'name price'); // Populate product details
      res.status(200).json(orders);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // Get a single order by ID
const handleGetSingleOrder= async (req, res) => {
    try {
      const order = await Order.findById(req.params.id)
        .populate('user', 'name email')
        .populate('products.product', 'name price');
      if (!order) {
        return res.status(404).json({ error: 'Order not found' });
      }
      res.status(200).json(order);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // Update an order
const handleUpdateOrder= async (req, res) => {
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
const handleDeleteOrder= async (req, res) => {
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

  export {handleCreateOrders,handleGetAllOrders,handleGetSingleOrder,handleUpdateOrder,handleDeleteOrder};