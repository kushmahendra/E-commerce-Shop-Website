// backend/config/multer.js
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from './cloudinary.js'; // Make sure to use the import syntax

// Multer storage setup for Cloudinary
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'profile_images', // Folder in Cloudinary
    allowed_formats: ['jpg', 'jpeg', 'png'], // Allowed formats
    public_id: (req, file) => `${Date.now()}-${file.originalname}`, // Custom public_id
  },
});

const upload = multer({ storage });

export default upload;


