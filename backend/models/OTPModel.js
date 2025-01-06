import mongoose from 'mongoose'


const OTPSchema = new mongoose.Schema({
    otp:{
        type:String,
        trim:true,
        default:null
    },
    userId:{
        type: mongoose.Types.ObjectId, ref: 'User', required: false
    },
    adminId:{
        type: mongoose.Types.ObjectId, ref: 'Admin', required: false 
    }

})

const OTP = mongoose.model('OTP',OTPSchema);
export default OTP;

