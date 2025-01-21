import express from 'express'
import { handleCreateOrders,handleGetAllOrders,handleGetSingleOrder,handleUpdateOrder,handleDeleteOrder,handleRazorPay,handleOrders } from '../controllers/ordersController.js'
import { verifyToken } from '../middlewares/authMiddleWare.js';

const orderRoute=express.Router();


orderRoute.post('/orders',verifyToken,handleCreateOrders)
orderRoute.post('/razorpay',verifyToken,handleRazorPay)
orderRoute.post('/orders',verifyToken,handleOrders)
orderRoute.get('/orders',handleGetAllOrders)
orderRoute.get('/orders/:id',handleGetSingleOrder)
orderRoute.put('/orders/:id',handleUpdateOrder)
orderRoute.delete('/orders/:id',handleDeleteOrder)



export default orderRoute;