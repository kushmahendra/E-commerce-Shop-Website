import express from 'express'
import {handleUserRegister,handleLogin,handleDeleteUser,handleAllUsers,handleUpdateUser,handleProfile,handleGetUser} from '../controllers/userController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';


const authRoute=express.Router();


//Register endpoint
authRoute.post('/register',handleUserRegister)
authRoute.post('/login',handleLogin)
authRoute.delete('/users/:id',verifyToken ,handleDeleteUser)
authRoute.put('/users/:id',verifyToken ,handleUpdateUser)
authRoute.get('/users',verifyToken ,handleAllUsers)
authRoute.patch('/edit-profile',verifyToken ,handleProfile)
authRoute.get('/user/:id',verifyToken ,handleGetUser)
authRoute.get('/allusers',handleAllUsers)

export default authRoute