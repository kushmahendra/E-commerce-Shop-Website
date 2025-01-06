import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
import Admin from '../models/adminModel.js';


dotenv.config();

const  JWT_SECRET=process.env.JWT_SECRET_KEY

const adminGenerateToken=async(adminId)=>
{
   try{
    const admin=await Admin.findById(adminId)
    if(!admin)
    {
        throw new Error('Admin not found')
    }

    const token= jwt.sign({
                       
                        userAdmin:admin._id,
                         },
                         JWT_SECRET,
                              {
                              expiresIn:'28d'
                         })
            return token
             }
   catch(error)
   {
    console.error("Error generating token",error)

   }
};



const adminVerifyToken=async(req,res,next)=>
{
    try{
        //  Get the token from cookies
        const token=req.cookies.token ||"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzcyODA2YzAzNjFhN2YxMTNlZjBmZDEiLCJyb2xlIjoidXNlciIsImlhdCI6MTczNTU3MzA0NiwiZXhwIjoxNzM2MTc3ODQ2fQ.TvsLaXl-vXnHKkkgPpFaJZWCY4QSsoIvH8b3wMs00zs"  // Optional chaining to prevent errors if cookies are undefined;
        // const token =req.headers['authorization'].split(" ")[1] || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzcyODA2YzAzNjFhN2YxMTNlZjBmZDEiLCJyb2xlIjoidXNlciIsImlhdCI6MTczNTU3MzA0NiwiZXhwIjoxNzM2MTc3ODQ2fQ.TvsLaXl-vXnHKkkgPpFaJZWCY4QSsoIvH8b3wMs00zs"  // Optional chaining to prevent errors if cookies are undefined
    
       
        console.log('Token:', token);

        if (!token) {
            return res.status(401).json({ message: 'Token is missing or invalid' }); // Changed from .end to .json
        }

        // Verify the token
        const decoded = jwt.verify(token, JWT_SECRET);
        if (!decoded) {
            return res.status(401).json({ message: 'Invalid token' }); // Changed from .end to .json
        }

        // Attach decoded data to req for further use
        req.adminId = decoded.adminId;
     

        next(); // Proceed to the next middleware or route handler
    }
    catch(error)
    {
        console.error("Error while verifying token",error)
        res.status(500).send({message:'Internal server error'})
    }
}


export {adminGenerateToken,adminVerifyToken};
