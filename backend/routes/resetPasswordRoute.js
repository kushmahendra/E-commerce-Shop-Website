import express from 'express'
import { handleForgetPassword, handleResetPassword } from '../controllers/resetPasswordController.js';
const resetPasswordrRouter = express.Router();

resetPasswordrRouter.post('/forgot-password', handleForgetPassword);
resetPasswordrRouter.put('/reset-password', handleResetPassword);

export default resetPasswordrRouter;