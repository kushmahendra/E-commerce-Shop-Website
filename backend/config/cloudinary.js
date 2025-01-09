// backend/config/cloudinary.js
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv'

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME, // Set in your .env file
  api_key: process.env.CLOUD_API_KEY, // Set in your .env file
  api_secret: process.env.CLOUD_API_SECRET, // Set in your .env file
});

export default cloudinary;


