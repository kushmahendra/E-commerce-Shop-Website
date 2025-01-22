import express from 'express'
import { handleForgetPassword, handleResetPassword,handleContactForm  } from '../controllers/resetPasswordController.js';
const resetPasswordrRouter = express.Router();

resetPasswordrRouter.post('/forgot-password', handleForgetPassword);
resetPasswordrRouter.put('/reset-password', handleResetPassword);
resetPasswordrRouter.post('/contact', handleContactForm);


export default resetPasswordrRouter;