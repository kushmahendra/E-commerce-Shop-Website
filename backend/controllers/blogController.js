import Blog from '../models/blogModel.js'; 

const handleCreateBlog = async (req, res) => {
    try {
        const { userAdminId,title, eventName, publisher, videos, images } = req.body;

       console.log('sggghh',userAdminId,title, eventName, publisher, videos, images );
       
        if ( !userAdminId|| !title || !publisher || !videos || !images) {
            return res.status(400).json({ message: "Title, Publisher, Videos, and Images are required." });
        }

        const blogData = await Blog.create({
            userAdminId,
            title,
            eventName,
            publisher,
            videos,
            images
        });

        return res.status(201).json({ message: "Blog created successfully", blog: blogData });

    } catch (error) {
        console.error("Error occurred while creating blog:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

//get blog
const handleGetBlog = async (req, res) => {
    try {
        const {id}=req.params
        console.log('id',id);
        
        const blogs = await Blog.findById(id);
        console.log('dddd',blogs);
        

        if (!blogs || blogs.length === 0) {
            return res.status(404).json({ message: "No blogs found." });
        }

        return res.status(200).json({ message: "Blogs fetched successfully", blogs });

    } catch (error) {
        console.error("Error occurred while fetching blogs:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};


//get all blogs
const handleGetAllBlog = async (req, res) => {
    try {
      
        const blogs = await Blog.find({}).populate("userAdminId");
        console.log('dddd',blogs);
        

        if (!blogs || blogs.length === 0) {
            return res.status(404).json({ message: "No blogs found." });
        }

        return res.status(200).json({ message: "Blogs fetched successfully", blogs });

    } catch (error) {
        console.error("Error occurred while fetching blogs:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};


//update
const handleUpdate =async(req,res)=>
{
try {
    const {id}=req.params;
    const { title, eventName, publisher, videos, images}=req.body;

    const updateBlog= await Blog.findByIdAndUpdate(id,{ title, eventName, publisher, videos, images},{new:true})

    if(!updateBlog)
    {
        return  res.status(404).json({message:"Blog not found"})
    }

    return res.status(200).json({message:"blog updated succcessfully",blog:updateBlog})
    
} catch (error) {
    console.error("error ocured while updateing blog",error)
    res.status(500).json({message:"Internal server error",error:error.message})
}
};


//delete blog
const handleDeleteBlog= async(req,res)=>
{
    try {
        const {id}=req.params;
        const removeBlog=await Blog.findByIdAndDelete(id)
        
        if(!removeBlog)
        {
      return   res.status(404).json({message:"blog not found"})
        }
       return   res.status(200).json({message:"blog deleted successfully",blog:removeBlog})
        
    } catch (error) {
        console.error("Error occurred while deleting blog:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
     
    }
}


export {handleCreateBlog,handleGetBlog ,handleUpdate,handleDeleteBlog,handleGetAllBlog};
