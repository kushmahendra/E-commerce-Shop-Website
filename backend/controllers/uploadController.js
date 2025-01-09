

import cloudinary from '../config/cloudinary.js';

export const uploadProfileImage = async (req, res) => {
    try {
      const file = req.file;
  
      // Upload the file to Cloudinary
      const result = await cloudinary.uploader.upload(file.path);
  
      // Send the image URL back
      res.status(200).json({ imageUrl: result.secure_url });
    } catch (error) {
      res.status(500).json({ error: 'Image upload failed' });
    }
  };
  

  