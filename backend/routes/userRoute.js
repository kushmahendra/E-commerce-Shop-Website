import express from 'express'
import {handleUserRegister,handleLogin,handleLogout,handleDeleteUser,handleAllUsers,handleUpdateUser,handleProfile} from '../controllers/userController.js';
import { verifyToken } from '../middlewares/userMiddleWare.js';
const authRoute=express.Router();



//Register endpoint
authRoute.post('/register',handleUserRegister)
authRoute.post('/login',handleLogin)
authRoute.post('/logout',verifyToken,handleLogout)
authRoute.delete('/users/:id',handleDeleteUser)
authRoute.put('/users/:id',handleUpdateUser)
authRoute.get('/users',handleAllUsers)
authRoute.patch('/edit-profile',handleProfile)

export default authRoute