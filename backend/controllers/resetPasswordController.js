import crypto from 'crypto';
import sendEmail from '../utils/sendEmail.js';
import ResetUserPassword from '../models/ResetUserPasswordModel.js';
import bcrypt from 'bcrypt';
import User from '../models/User.js';
import Admin from '../models/adminModel.js';
import OTP from '../models/OTPModel.js';
import nodemailer from 'nodemailer'


const EMAIL_USER = process.env.EMAIL_USER 
const EMAIL_PASS = process.env.EMAIL_PASS


const transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:EMAIL_USER,
        pass:EMAIL_PASS
    }
})

// const handleForgotPassword = async (req, res) => {
//     const { email } = req.body;
//     try {
//         const user = await ResetUserPassword.findOne({ email });
//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }

//         user.resetToken = crypto.randomBytes(32).toString('hex');
//         user.resetTokenExpiry = Date.now() + 3600000;
//         await user.save();

//         const resetLink = `http://localhost:8080/api/reset-password/${user.resetToken}`;
//         await sendEmail(user.email, 'Password Reset', `Click here: ${resetLink}`);

//         res.status(200).json({ message: 'Reset link sent successfully' });
//     } catch (error) {
//         console.error('Failed to send reset link', error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// };

const handleForgetPassword = async (req,res)=>{
    try {
        const {email} = req.body;
        const user = await Admin.findOne({email});
        if(!user){
            res.status(404).json({message:'user not found'})
        }
        const newOtp = await OTP.create({
            otp:5555,
            adminId:user._id
        })
        if(newOtp){
            await transporter.sendMail({
                from:EMAIL_USER,
                to:email,
                subject:"Reset your password",
                text:"Your OTP is 5555"
            })
            res.status(200).json({message:'OTP generated successfully'})
        }
        
    } catch (error) {
        console.error('Error',error)
        res.status(500).json({message:'Internal Server Error'});
    }
}

// const handleResetPassword = async (req, res) => {
//     const { token } = req.params;
//     const { password } = req.body;
//     try {
//         const user = await ResetUserPassword.findOne({ resetToken: token, resetTokenExpiry: { $gt: Date.now() } });
//         if (!user) {
//             return res.status(400).json({ message: 'Invalid or expired token' });
//         }

//         // user.password = await user.hashPassword(password);
//         user.password = await bcrypt.hash(password, 10);
//         user.resetToken = undefined;
//         user.resetTokenExpiry = undefined;
//         await user.save();

//         res.status(200).json({ message: 'Password updated successfully' });
//     } catch (error) {
//         console.error('Failed to reset password', error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// };

const handleResetPassword = async (req,res)=>{
    try {
        const {otp,password,email}=req.body;
        const user = await Admin.findOne({email});
        console.log('my user is',user)
        if(!user){
            res.status(404).json({message:"User not found"});
        }
        const enteredOtp = await OTP.findOne({
            otp:otp,
            adminId:user._id
        })
        if(!enteredOtp){
            res.status(400).json({message:"Invalid OTP"});
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newAdminDetails = await Admin.findByIdAndUpdate(
            user._id,
            { password: hashedPassword },
            { new: true } // Returns the updated document
        );
        console.log('result after',newAdminDetails);
        if(newAdminDetails){
            res.status(201).json({message:"Password changed successfully"});
        }
    } catch (error) {
        console.error("Error",error);
        res.status(500).json({message:"Internal Server Error"})
    }
}




export { handleForgetPassword, handleResetPassword };
