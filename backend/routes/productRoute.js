import express from 'express'
import {handleProduct,handleAllProducts,handleSingleProduct,handleUpdateProduct,handleDeleteProduct,handleRelatedProduct} from '../controllers/productController.js';
import { verifyToken } from '../middlewares/userMiddleWare.js';
import verifyAdmin from '../middlewares/verifyAdminMiddleware.js';

const productRoute=express.Router();


productRoute.post('/create-product',handleProduct)
productRoute.get('/',handleAllProducts)
productRoute.get('/:id',handleSingleProduct)
productRoute.patch('/update-product/:id',verifyToken,verifyAdmin,handleUpdateProduct)
productRoute.delete('/:id',handleDeleteProduct)
productRoute.get('/related/:id',handleRelatedProduct)

export default productRoute;