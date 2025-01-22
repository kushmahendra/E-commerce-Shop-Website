import crypto from 'crypto';
import bcrypt from 'bcrypt';
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

const handleForgetPassword = async (req,res)=>{
    try {
        const {email} = req.body;
        if(email ==='')
        {
            return res.json({message:"Invalid request"})
        }
        const user = await Admin.findOne({email});
        if(!user){
            res.status(404).json({message:'user not found'})
        }
        const otp=crypto.randomInt(1000, 9999).toString();
        const options = {upsert:true,new:true};

        const newOtp = await OTP.findOneAndUpdate(
            {adminId:user._id},
            { $set: { otp: otp, createdAt: new Date() } },
            options)

        if(newOtp){
            await transporter.sendMail({
                from:EMAIL_USER,
                to:email,
                subject:"Reset your password",
                text: `Your OTP is ${otp}.It will expire in 1 minutes.`
            })
            res.status(200).json({message:'OTP generated successfully'})
        }
        
    } catch (error) {
        console.error('Error',error)
        res.status(500).json({message:'Internal Server Error'});
    }
};

const handleResetPassword = async (req,res)=>{
    try {
        const {otp,password,email}=req.body;
        const user = await Admin.findOne({email});
        console.log('my user is',user)
        if(!user){
            return res.status(404).json({message:"User not found"});
        }
        const enteredOtp = await OTP.findOne({
            otp:otp,
            adminId:user._id
        })
        console.log('efsaf',enteredOtp)
        if(!enteredOtp){
           return res.status(400).json({message:"Invalid OTP"});
        }
       
         // Optionally, check the expiration manually
         const expirationTime = 60 * 1000; // 1 minute in milliseconds
         console.log('expt',expirationTime)
         const currentTime = new Date().getTime();
         console.log('ctt',currentTime)
         const otpTime = new Date(enteredOtp.createdAt).getTime();
         console.log('ctt',otpTime )
         const tt=currentTime - otpTime > expirationTime;
         console.log(tt);
         if (tt) {
             // OTP has expired
             await OTP.deleteOne({ otp: enteredOtp.otp }); // Delete expired OTP
             return res.status(400).json({ message: "OTP has expired" });
         }


        const hashedPassword = await bcrypt.hash(password, 10);
        const newAdminDetails = await Admin.findByIdAndUpdate(
            user._id,
            { password: hashedPassword },
            { new: true } // Returns the updated document
        );

        console.log('result after',newAdminDetails);
        if(newAdminDetails){
            return res.status(201).json({message:"Password changed successfully"});
        }

        // Optionally, delete OTP after successful reset
        await OTP.deleteOne({ adminId: user._id });

    } catch (error) {
        console.error("Error",error);
        return res.status(500).json({message:"Internal Server Error"})
    }
}

//for contact message
const handleContactForm = async (req, res) => {
    try {
        const { name, email, message } = req.body;

        // Validate the input
        if (!name || !email || !message) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const savedMessage ={
            name,
            email,
            message,
            createdAt: new Date(),
        };

        if (savedMessage) {
            // Sending email notification (adjust `transporter` with your configuration)
            await transporter.sendMail({
                from: EMAIL_USER,
                to:email, // Replace with your admin/support email
                subject: "New Contact Form Submission",
                text: `You have a new message from ${name} (${email}):\n\n${message}`,
            });

            return res.status(200).json({ message: "Your message has been sent successfully" });
        } else {
            return res.status(500).json({ message: "Failed to save your message" });
        }

    } catch (error) {
        console.error("Error handling contact form submission:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
  

export { handleForgetPassword, handleResetPassword,handleContactForm  };
