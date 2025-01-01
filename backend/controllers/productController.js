import express from 'express'
import Product from '../models/productModel.js';
import Reviews from '../models/reviewsModel.js';

const handleProduct = async (req, res) => {
    try {
        // Create a new product instance using the Product model
        const newProduct = new Product({ 
            ...req.body 
        });

        // Save the new product to the database
        const savedProduct = await newProduct.save();
const reviews=await Reviews.find({productId: savedProduct._id});
if(reviews.length >0)
{
    const totalRating=reviews.reduce((acc,review)=> acc + review.rating,0); 
    const averageRating=totalRating =reviews.length;

    savedProduct.rating = averageRating;
    await savedProduct.save();
}
        // Return a success response
        res.status(201).json({
            success: true,
            message: 'Product created successfully',
            data: savedProduct,
        });
    } catch (error) {
        console.error('Error while creating product:', error.message);
        res.status(500).json({
            success: false,
            message: 'Failed to create product',
            error: error.message,
        });
    }
};

//get all products
const handleAllProducts=async(req,res)=>
{
    try {
        const {category,color,minPrice,maxPrice,page=1,limit=10}=req.query
        let filter={}
        if(category && category !=='all')
        {
            filter.category=category;
        }
        if(color && color !=='all')
        {
            filter.color=color
        }
        if(minPrice && maxPrice)
        {
            const min=parseFloat(minPrice);
            const max=parseFloat(maxPrice);
            if(!isNAN(min) && !isNAN(max))
            {
                filter.price={$gte:min,$lte: max};
            }
        }
        const skip=(parseInt(page) - 1) * parseInt(limit);
        const totalProducts=await Product.countDocuments(filter);
        const totalPages= Math.ceil(totalProducts / parseInt(limit));
        const products=await Product.find(filter)
        .skip(skip)
        .limit(parseInt(limit))
        .populate('author','email')
        .sort({createdAt: -1})
        res.status(200).send({products,totalPages,totalProducts})
    
    } catch (error) {
        console.error('Error while fetching all product:', error.message);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch products',
            error: error.message,
        });
    }
};

//single product
const handleSingleProduct=async(req,res)=>
{
    try {
        const productId=req.params.id;
        console.log('id',productId)
        const product=await Product.findById(productId).populate('author','email userName');
        if(!product)
        {
            return res.status(404).send({message:'Product not found'});
        }
        const reviews=await Reviews.find({productId}).populate('userId','userName email');
        res.status(200).send({product,reviews});
        
    } catch (error) {
        console.log("Error fetching the product",error);
        res.status(500).send({message:"Failed to fetch product"})
    }
};

//update a product
const handleUpdateProduct=async(req,res)=>
{
    try {
        const productId=req.params.id;
        const upadateProduct= await Product.findByIdAndUpdate(productId,{...req.body},{new:true});
        if(! upadateProduct)
        {
        return res.status(404).send({message:'Product not found'})
        }
        res.status(200).send({message:"Product updated successfully",product:upadateProduct})
    } catch (error) {
        console.log("Error updating the product",error);
        res.status(500).send({message:"Failed to update product"})
    }
};

//Delete product
const handleDeleteProduct=async(req,res)=>
{
try {
    const productId=req.params.id;
    const deleteProduct=await Product.findByIdAndDelete(productId);
    if(!deleteProduct)
    {
        return res.status(404).send({message:"Product not found"});
    }
    await Reviews.deleteMany({productId: productId});
    res.status(200).send({message:"Product deleted successfully"});
    
} catch (error) {
    console.log("Error deleting the product",error);
    res.status(500).send({message:"Failed to eleting product"})
}
};

//get related products
const handleRelatedProduct=async(req,res)=>
{
    try {
        const {id}=req.params
        if(!id){
            return res.status(404).send({message:"Product Id is required"})
        }
        const product=await Product.findById(id);
        if(!product)
        {
            return res.status(404).send({message:"Product not found"})
        }
        const titleRegex=new RegExp(product.name.split(' ').filter((word)=> word.length > 1).join('|'),'i');

        const relatedProducts=await Product.find({
            _id:{$ne:id},
            $or:[{name:{$regex:titleRegex}},
                {category:product.category},
            ],
        });

        res.status(200).send(relatedProducts);
    } catch (error) {
        console.log("Error fetching the related product",error);
        res.status(500).send({message:"Failed to fetch related product"})
    }
}


export { handleProduct,handleAllProducts,handleSingleProduct,handleUpdateProduct,handleDeleteProduct,handleRelatedProduct};