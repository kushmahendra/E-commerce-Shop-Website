import express from 'express'
import {handleCreateBlog,handleGetBlog ,handleUpdate,handleDeleteBlog,handleGetAllBlog} from '../controllers/blogController.js'
import { adminVerifyToken } from '../middlewares/adminMiddleware.js';

const blogRoute=express.Router();

blogRoute.get('/blogs/:id', adminVerifyToken,handleGetBlog)
blogRoute.get('/blogs', adminVerifyToken,handleGetAllBlog)
blogRoute.post('/blog', adminVerifyToken,handleCreateBlog)
blogRoute.put('/blogs/:id', adminVerifyToken,handleUpdate)
blogRoute.delete('/blogs/:id', adminVerifyToken,handleDeleteBlog)

export default blogRoute;
