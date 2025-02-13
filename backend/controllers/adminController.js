import { adminGenerateToken } from "../middlewares/adminMiddleware.js";
import Admin from "../models/adminModel.js";
import bcrypt from 'bcrypt';


const handleLogin=async(req,res)=>
{
    const {email,password}=req.body;
    try {
        const userAdmin=await Admin.findOne({email})
        if(!userAdmin)
        {
            return res.status(404).json({message:"Admin Not Found"})
        }
         const isPasswordValid = await bcrypt.compare(password, userAdmin.password); 
                 if (!isPasswordValid) 
                 {
                     return res.status(401).send({ message: 'Invalid password' }); 
                 }

                 const token=await adminGenerateToken(userAdmin._id)
                 console.log('asfsaf',userAdmin)
               
                 res.cookie('token',token,
                    {
                        httpOnly:true,
                        secure:true,
                        sameSite:'None',
                    }
                 )

        res.status(200).json({message:"Admin Login Successfully",token, id:userAdmin._id,profile_img:userAdmin.profile_img})
        
    } catch (error) {
        console.error("Admin failed to login",error)
        res.status(500).json("server internal error")
    }
}

const handleRegister=async(req,res)=>
    {
        const {adminName,email,password,profile_img}=req.body;
        console.log('gggggg',req.body)
        try {
            if(!adminName || !email || !password)
            {
                return res.json("adminName,email and password required")
            }

            const existingAdmin = await Admin.findOne({ email });
            if (existingAdmin) {
                return res.status(400).json({ message: "Admin with this email already exists" });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const userAdmin=await  Admin.create(
                {
                    adminName,
                    email,
                    password: hashedPassword,
                    profile_img
                }
            )
    
            res.status(200).json({message:"Admin Register Successfully", userAdmin})
            
        } catch (error) {
            console.error("Admin failed to Register",error)
            res.status(500).json("server internal error")
        }
    };

// Get Admin by ID with Blogs
const handleGetBlogByID=async (req, res) => {
    try {
        const { adminId } = req.params;

        // Fetch admin and populate blogs
        const admin = await Admin.findById(adminId).populate("blogs");

        if (!admin) {
            return res.status(404).json({ message: "Admin not found" });
        }

        return res.status(200).json({ message: "Admin fetched successfully", admin });
    } catch (error) {
        console.error("Error fetching admin:", error);
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

//update admin details
    const handleAdminUpdate=async(req,res)=>
        {
            const {adminName,profile_img}=req.body;
            const {id:_id}=req.params;
            console.log('id==',_id)
            try {
            
      const userAdmin=await Admin.findByIdAndUpdate(_id,{adminName,profile_img},{new:true})
      if (!userAdmin) {
        return res.status(404).json({ message: "Admin not found" });
    }
        
                res.status(200).json({message:"Admin details update succesfully", userAdmin})
                
            } catch (error) {
                console.error("Admin failed to update detail",error)
                res.status(500).json({message:"server internal error"})
            }
        };



export {handleLogin,handleRegister,handleAdminUpdate,handleGetBlogByID};
