// backend/routes/upload.js

import express from 'express';
import upload from '../config/multer.js';
import { uploadProfileImage } from '../controllers/uploadController.js';

const uploadRoutes = express.Router();

// POST route for uploading profile images
uploadRoutes.post('/upload', upload.single('image'), uploadProfileImage);

export default uploadRoutes;


