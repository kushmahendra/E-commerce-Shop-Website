import express from 'express'
import { handleCreateOrders,handleGetAllOrders,handleSingleUserOrders,handleUpdateStatus,handleDeleteOrder,handleOrders} from '../controllers/ordersController.js'
import { verifyToken } from '../middlewares/authMiddleware.js';
// import { adminVerifyToken } from '../middlewares/adminMiddleware.js';

const orderRoute=express.Router();


orderRoute.post('/orders',verifyToken,handleCreateOrders)

orderRoute.post('/orders',verifyToken,handleOrders)
orderRoute.get('/orders',handleGetAllOrders)
orderRoute.get('/orders/:id',handleSingleUserOrders)
orderRoute.put('/orders/:orderId',handleUpdateStatus)
orderRoute.delete('/orders/:id',handleDeleteOrder)





export default orderRoute;