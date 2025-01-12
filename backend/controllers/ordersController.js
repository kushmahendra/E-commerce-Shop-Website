
import express from 'express';
// import { CartItem } from '../models/cartAndCartItemModel.js';
import Order from '../models/ordersModel.js';



// 1. Create a New Order
const   handleCreateOrders=async (req, res) => {
  try {
    const orderData = req.body;
    const newOrder = await Order.create(orderData);
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(400).json({ message: 'Error creating order', error: error.message });
  }
};

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
};

// // Create a new order
// const handleCreateOrders = async (req, res) => {
//   try {
//     const { user, cartItems, totalAmount } = req.body;

//     // Check if all CartItems exist
//     for (const item of cartItems) {
//       const cartItemExists = await CartItem.findById(item);
//       if (!cartItemExists) {
//         return res.status(400).json({ error: `CartItem with ID ${item} does not exist.` });
//       }
//     }

//     // Create the new order with cartItems and totalAmount
//     const newOrder = await Order.create({
//       user,
//       cartItems,
//       totalAmount,
//     });

//     // Return the created order
//     res.status(201).json(newOrder);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // Get all orders
// const handleGetAllOrders = async (req, res) => {
//   try {
//     const orders = await Order.find()
//       .populate({
//         path: 'user',
//         model: 'ShopUser',
//         select: 'firstName lastName email',
//       })
//       .populate({
//         path: 'cartItems',
//         model: 'CartItem',
//         populate: {
//           path: 'product',
//           model: 'Product',
//           select: 'name price color',
//         },
//       });

//     res.status(200).json(orders);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };


// // Get a single order by ID
// const handleGetSingleOrder = async (req, res) => {
//   try {
//     const order = await Order.findById(req.params.id)
//       .populate({
//         path: 'user',
//         model: 'ShopUser',
//         select: 'firstName lastName email',
//       })
//       .populate({
//         path: 'cartItems',
//         model: 'CartItem',
//         populate: {
//           path: 'product',
//           model: 'Product',
//           select: 'name price color',
//         },
//       });

//     if (!order) {
//       return res.status(404).json({ error: 'Order not found' });
//     }

//     res.status(200).json(order);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // Update an order
// const handleUpdateOrder = async (req, res) => {
//   try {
//     const { status } = req.body;
//     const order = await Order.findByIdAndUpdate(
//       req.params.id,
//       { status },
//       { new: true }
//     );

//     if (!order) {
//       return res.status(404).json({ error: 'Order not found' });
//     }

//     res.status(200).json(order);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // Delete an order
// const handleDeleteOrder = async (req, res) => {
//   try {
//     const order = await Order.findByIdAndDelete(req.params.id);
//     if (!order) {
//       return res.status(404).json({ error: 'Order not found' });
//     }
//     res.status(200).json({ message: 'Order deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// export {
//   handleCreateOrders,
//   handleGetAllOrders,
//   handleGetSingleOrder,
//   handleUpdateOrder,
//   handleDeleteOrder,
// };


