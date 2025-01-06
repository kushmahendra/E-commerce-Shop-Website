import express from 'express';
import upload from '../config/multer.js';
import { uploadProfileImage } from '../controllers/uploadController.js';

const profileRoute = express.Router();

profileRoute.post('/avtar', upload.single('image'), uploadProfileImage);

export default profileRoute;
