import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const resetUserPasswordSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    resetToken: {
        type: String,
        default: null
    },
    resetTokenExpiry: {
        type: Date,
        default: null
    }
});

resetUserPasswordSchema.methods.hashPassword = async function(password) {
    return await bcrypt.hash(password, 10);
};

const ResetUserPassword = mongoose.model('ResetUserPassword', resetUserPasswordSchema );
export default ResetUserPassword;
