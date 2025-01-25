import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({
    adminName: {
        type: String,
        trim: true,
        required: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true, // Ensure emails are unique
    },
    password: {
        type: String,
        required: true,
    },
    profile_img:{
        type: String,
        default: null
    },
});


const Admin = mongoose.model('Admin', adminSchema); // Corrected "Model" to "model"

export default Admin;
