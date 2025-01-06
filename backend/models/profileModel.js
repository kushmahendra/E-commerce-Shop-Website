import mongoose from 'mongoose';

const profileImageSchema = new mongoose.Schema({
  image: { type: String, required: true }, // Stores image URL from Cloudinary
});

const ProfileImage = mongoose.model('ProfileImage', profileImageSchema);

export default ProfileImage;
