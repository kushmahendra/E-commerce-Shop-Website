import express from 'express'
import { handleLogin,handleRegister,handleAdminUpdate} from '../controllers/adminController.js';
import { adminVerifyToken } from '../middlewares/adminMiddleware.js';

const adminRoute=express.Router();


adminRoute.post('/login',handleLogin);
adminRoute.post('/signup',handleRegister);
adminRoute.put('/detail/update/:id',handleAdminUpdate);

export default adminRoute;


