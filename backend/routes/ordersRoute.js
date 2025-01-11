import express from 'express'
import { handleCreateOrders,handleGetAllOrders,handleGetSingleOrder,handleUpdateOrder,handleDeleteOrder } from '../controllers/ordersController.js'

const orderRoute=express.Router();


orderRoute.post('/orders',handleCreateOrders)
orderRoute.get('/orders',handleGetAllOrders)
orderRoute.get('/orders/:id',handleGetSingleOrder)
orderRoute.put('/orders/:id',handleUpdateOrder)
orderRoute.delete('/orders/:id',handleDeleteOrder)


export default orderRoute;