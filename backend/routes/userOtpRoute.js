import express from 'express'
import { handleForgetPassword, handleResetPassword } from '../controllers/userResetPasswordController.js';


const userOtpRoute=express.Router();


userOtpRoute.post('/forgotPassword', handleForgetPassword);
userOtpRoute.put('/resetPassword',handleResetPassword);

export default userOtpRoute;