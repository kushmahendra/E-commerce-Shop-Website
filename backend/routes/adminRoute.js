import express from 'express'
import { handleLogin,handleRegister,handleAdminUpdate,handleGetBlogByID} from '../controllers/adminController.js';
import { adminVerifyToken } from '../middlewares/adminMiddleware.js';

const adminRoute=express.Router();


adminRoute.post('/login',handleLogin);
adminRoute.post('/signup',handleRegister);
adminRoute.put('/detail/update/:id',handleAdminUpdate);
adminRoute.get('/adminblogs/:id',handleGetBlogByID)

export default adminRoute;


