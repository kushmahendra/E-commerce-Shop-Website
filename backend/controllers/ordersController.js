
import express from 'express';
import Order from '../models/ordersModel.js';
import ShopUser from '../models/User.js';
import { Cart, CartItem } from '../models/cartAndCartItemModel.js';
import mongoose from 'mongoose';
import Razorpay from 'razorpay';
import dotenv from 'dotenv';

dotenv.config();

// Global Variables
const currency = 'INR';
const deliveryCharge = 10;

const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// 1. Create a New Order

const handleCreateOrders = async (req, res) => {
  try {
    const { userId, items, totalAmount, addressInfo, paymentMethod } = req.body;


    // Log input data for debugging
    console.log('User ID:', userId);
    console.log('Items:', items);
    console.log('Total Amount:', totalAmount);
    console.log('Address Info:', addressInfo);
    console.log('Payment Method:', paymentMethod);

    // Validate required fields
    if (!userId || !items || !totalAmount || !addressInfo || !paymentMethod) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Fetch the cart to verify items
    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(400).json({ message: 'Cart not found for this user' });
    }

     // Prepare items for the order
  
    // const orderItems = await Promise.all(items.map(async (item) => {
    //   const productDetails = item.product;  // Get product details

    //   // Spread the productDetails into the order item, and add quantity and totalPrice
    //   return {
    //     ...productDetails, // Spread product data here
    //     quantity: item.quantity,
    //     totalPrice: item.totalPrice,
    //   };
    // }));
    
    // Prepare items for the order with product validation
    const orderItems = await Promise.all(
      items.map(async (item) => {
        if (!item.product || !item.product._id) {
          throw new Error("Invalid product data in cart items");
        }

        return {
          product: item.product._id, // Ensure only the product ID is stored
          name: item.product.name, // Store product name for reference
          quantity: item.quantity,
          totalPrice: item.totalPrice,
        };
      })
    );
        // Create the order
        const newOrder = await Order.create({
          userId,
          items: orderItems,
          totalAmount,
          addressInfo,
          orderStatus: 'Pending',
          paymentMethod,
          paymentStatus: 'Pending',
          orderDate: Date.now(),
        })
 
    // Associate the order with the user
    await ShopUser.findByIdAndUpdate(
      userId,
      { $push: { orders: newOrder._id } },
      { new: true }
    );
     // // Clear the user's cart after successful order creation
    await ShopUser.findByIdAndUpdate(
      userId,
      { $set: { cart: [] } },
      { new: true }
    );

    res.status(201).json({ message: 'Order created successfully', newOrder });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ message: 'Error creating order', error: error.message });
  }
};


//RazorPay
const handleRazorPay=async(req,res)=>
{
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
      paymentMethod: 'RazorPay',
      paymentStatus,
      
      orderDate: Date.now(),
    });

    // Razorpay order creation options
    const options = {
      amount: totalAmount * 100, // Amount in smallest currency unit (e.g., paise for INR)
      currency: currency,
      receipt: newOrder._id.toString(),
    };

    razorpayInstance.orders.create(options, (error, order) => {
      if (error) {
        console.error('Razorpay Error:', error);
        return res.status(400).json({ message: 'Error creating Razorpay order', error });
      }
      res.status(200).json({ message: 'Order created successfully', order });
    });
  } catch (error) {
    console.error('Internal Server Error:', error.message);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
}

//verify Razorpay
const handleverifyRazorpay=async(req,res)=>
{
  try {
    const {userId,razorpay_order_id}=req.body
    const orderInfo=await razorpayInstance.orders.fetch(razorpay_order_id)
    if(orderInfo.status==='paid')
    {
      await Order.findByIdAndUpdate(orderInfo.receipt,{paymentStatus:'Completed'})
      await ShopUser.findByIdAndUpdate(userId, { $set: { cart: [] } },  { new: true }  );
      res.json({message:"Payment Successful"})
    }
    else
    {
      res.json({message:"Payment Failed"})
    }
    console.log('odinf', orderInfo)
  } catch (error) {
    console.error('Internal Server Error:', error.message);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
}

//orders
const handleOrders=async(req,res)=>
  {
  
  }

// 2. Get All Orders for Admin
// const   handleGetAllOrders=async (req, res) => {
//   try {
//     const orders = await Order.find({})
//       .populate('user', 'firstName lastName email')
//       .populate('cartItems')
//       .populate('cartId');
//     res.status(200).json(orders);
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching orders', error: error.message });
//   }
// };
const handleGetAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ orderDate: -1 })
      .populate('userId', 'firstName lastName email') // Assuming 'userId' is referencing a 'User' model
      // .populate('items', 'name category  description price oldPrice images color  rating stock') // Assuming 'items' references products or items in the order
      .populate({
        path: 'items.product', // Correct way to populate product inside items array
        model: 'Product',
        select: 'name category description price oldPrice images color rating stock',
      })
      .select('userId items addressInfo orderStatus paymentMethod paymentStatus totalAmount orderDate') // Select specific fields
      .exec();
    
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders', error: error.message });
  }
};



// 3. User Order data for frontend 
// const  handleSingleUserOrders= async (req, res) => {
//   const { id } = req.params;
//   try {
//       // Check if id is a valid ObjectId
//       if (!mongoose.Types.ObjectId.isValid(id)) {
//         return res.status(400).json({ message: 'Invalid Order ID' });
//       }
//     const order = await Order.findById(id)
//       // .populate('user', 'firstName lastName email')
//       // .populate('cartItems')
//       // .populate('cartId');
//     if (!order) {
//       return res.status(404).json({ message: 'Order not found' });
//     }
//     return res.status(200).json({message:"User get all order successfully",order});
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching order', error: error.message });
//   }
// };

const handleSingleUserOrders = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid Order ID' });
    }

    // Query by _id
    const order = await Order.findById(id).populate({
      path: 'items.product', // Correct way to populate product inside items array
      model: 'Product',
      select: 'name category description price oldPrice images color rating stock',
    });

    if (!order) {
      // Fallback to query by userId
      const userOrder = await Order.findOne({ userId: id });
      if (!userOrder) {
        return res.status(404).json({ message: 'Order not found' });
      }
      return res.status(200).json({ message: "User get all order successfully", order: userOrder });
    }

    res.status(200).json({ message: "User get all order successfully", order });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching order', error: error.message });
  }
};


// 4. Update Order Status or Details
const  handleUpdateStatus= async (req, res) => {
  const { orderId } = req.params;
  const {paymentStatus} = req.body;
  try {
    const updatedOrder = await Order.findByIdAndUpdate(orderId, {paymentStatus}, { new: true });
    if (!updatedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json({message:"Payment & Order status updated successfully",updatedOrder});
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
  handleSingleUserOrders,
  handleUpdateStatus,
  handleDeleteOrder,
  handleRazorPay,
  handleOrders,
  handleverifyRazorpay
};



