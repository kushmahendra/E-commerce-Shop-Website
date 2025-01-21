
import express from 'express';
import Order from '../models/ordersModel.js';
import ShopUser from '../models/User.js';
import { Cart, CartItem } from '../models/cartAndCartItemModel.js';


// 1. Create a New Order

import mongoose from 'mongoose';

const handleCreateOrders = async (req, res) => {
  try {
    const {userId , items, totalAmount, addressInfo } = req.body;
    // const userId = req.userId;

    console.log('User ID:', userId);
    console.log('Items:', items);
    console.log('Total Amount:', totalAmount);
    console.log('Addresses:', addressInfo);

   
    const cart = await Cart.findOne({ 'user': userId });

    if (!cart) {
      return res.status(400).json({ message: 'Cart not found for this user' });
    }

    // Create the new order with validated items
    const newOrder = await Order.create({
      userId,
      items,
      totalAmount,
      addressInfo,
      orderStatus: 'Pending',
      paymentMethod: 'Cash On Delivery',
      paymentStatus: 'Pending',
      orderDate: Date.now(),
    });

    // Clear the user's cart after successful order creation
    await ShopUser.findByIdAndUpdate(
      userId,
      // { $set: { 'cart.items': [] } }, // Clear the items array properly
      { $set: { cart: [] } },
      { new: true }
    );

    res.status(201).json({ message: 'Order created successfully', newOrder });
  } catch (error) {
    console.error('Error creating order:', error.message);
    res.status(400).json({ message: 'Error creating order', error: error.message });
  }
};


//RazorPay
const handleRazorPay=async(req,res)=>
{

}

//orders
const handleOrders=async(req,res)=>
  {
  
  }

// 2. Get All Orders
const   handleGetAllOrders=async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('user', 'firstName lastName email')
      .populate('cartItems')
      .populate('cartId');
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders', error: error.message });
  }
};

// 3. Get a Specific Order by ID
const  handleGetSingleOrder= async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Order.findById(id)
      .populate('user', 'firstName lastName email')
      .populate('cartItems')
      .populate('cartId');
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching order', error: error.message });
  }
};

// 4. Update Order Status or Details
const  handleUpdateOrder= async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  try {
    const updatedOrder = await Order.findByIdAndUpdate(id, updates, { new: true });
    if (!updatedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(400).json({ message: 'Error updating order', error: error.message });
  }
};

// 5. Delete an Order
const  handleDeleteOrder= async (req, res) => {
  const { id } = req.params;
  try {
    const deletedOrder = await Order.findByIdAndDelete(id);
    if (!deletedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json({ message: 'Order deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting order', error: error.message });
  }
};

export {
  handleCreateOrders,
  handleGetAllOrders,
  handleGetSingleOrder,
  handleUpdateOrder,
  handleDeleteOrder,
  handleRazorPay,handleOrders
};



