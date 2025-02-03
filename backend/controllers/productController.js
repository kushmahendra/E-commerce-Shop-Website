import express from 'express'
import Product from '../models/productModel.js';
import Reviews from '../models/reviewsModel.js';

//create products
const handleCreateProduct = async (req, res) => {
    try {
        // Destructure and validate request body
        const {
            name,
            category,
            description,
            price,
            oldPrice,
            images,        
            sizes,        
            color,
            rating,
            stock,
            author
        } = req.body;

        // Validate required fields
        // if (!name || !price || !author || !stock) {
        //     return res.status(400).json({
        //         success: false,
        //         message: 'Name, price, and author are required fields.'
        //     });
        // }
        if (!name || !price) {
            return res.status(400).json({
                success: false,
                message: 'Name, price, and author are required fields.'
            });
        }

        // Ensure numeric fields are properly cast
        const parsedPrice = parseFloat(price);
        const parsedOldPrice = oldPrice ? parseFloat(oldPrice) : undefined;
        const parsedRating = rating ? parseFloat(rating) : 0;

    
        // Ensure `images` is an array
        let imageList = [];
        if (Array.isArray(images)) {
            imageList = images;
        } else if (typeof images === 'string') {
            imageList = [images]; // Convert single string to array
        }

      // Automatically select the first image as `selectedImage`
         const selectedImage = imageList.length > 0 ? imageList[0] : null;

        // Validate `sizes` and ensure it matches allowed values
        const allowedSizes = ['S', 'M', 'L', 'XL', 'XXL'];
        let selectedSizes = [];

        if (Array.isArray(sizes)) {
            selectedSizes = sizes.filter(size => allowedSizes.includes(size));
        } else if (typeof sizes === 'string' && allowedSizes.includes(sizes)) {
            selectedSizes = [sizes];
        }

        // Apply default size if no valid size is provided
        if (selectedSizes.length === 0) {
            selectedSizes = ['M'];
        }


        // Ensure color is valid (default to black if empty)
        const selectedColor = color || "black";

        // Create a new product instance
        const newProduct = new Product({
            name,
            category,
            description,
            price: parsedPrice,
            oldPrice: parsedOldPrice,
            // image: imageField,
            images:selectedImage,           
            color:selectedColor,        
            rating: parsedRating,
            sizes:selectedSizes,
            stock,
            author
        });


        // Save the product to the database
        const savedProduct = await newProduct.save();

        return res.status(201).json({
            success: true,
            message: 'Product created successfully.',
            data: savedProduct
        });
    } catch (error) {
        console.error('Error while creating product:', error.message);

        return res.status(500).json({
            success: false,
            message: 'Failed to create product.',
            error: error.message
        });
    }
};


//get all products
const handleGetAllProducts = async (req, res) => {
    try {
        const { category, color, minPrice, maxPrice, page = 1, limit = 10 } = req.query
        let filter = {}

        // Filter by category if specified
        if (category && category !== 'all') {
            filter.category = category;
        }

        // Filter by color if specified
        if (color && color !== 'all') {
            filter.color = color
        }

        // Filter by price range if both minPrice and maxPrice are provided
        if (minPrice && maxPrice) {
            const min = parseFloat(minPrice);
            const max = parseFloat(maxPrice);

            // Correct the check from isNAN to isNaN
            if (!isNaN(min) && !isNaN(max)) {
                filter.price = { $gte: min, $lte: max };
            }
        }
        const skip = (parseInt(page) - 1) * parseInt(limit);
        const totalProducts = await Product.countDocuments(filter);
        const totalPages = Math.ceil(totalProducts / parseInt(limit));

        const products = await Product.find(filter)
            .skip(skip)
            .limit(parseInt(limit))
            .populate('author', 'email')
            .sort({ createdAt: -1 })
        res.status(200).send({ products, totalPages, totalProducts })

    } catch (error) {
        console.error('Error while fetching all product:', error.message);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch products',
            error: error.message,
        });
    }
};


//get all products
const getAllProducts = async (req, res) => {
    try {
        // Fetch all products from the database
        // const products = await Product.find();
        // Fetch all products from the database and sort by createdAt in descending order
        const products = await Product.find().sort({ createdAt: -1 }); // Most recent first

        return res.status(200).json({
            success: true,
            message: 'Products fetched successfully.',
            data: products,
        });
    } catch (error) {
        console.error('Error while fetching products:', error.message);

        return res.status(500).json({
            success: false,
            message: 'Failed to fetch products.',
            error: error.message,
        });
    }
};


//single product
const handleSingleProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        console.log('id', productId)
        const product = await Product.findById(productId).populate('author', 'email userName');
        if (!product) {
            return res.status(404).send({ message: 'Product not found' });
        }
        const reviews = await Reviews.find({ productId }).populate('userId', 'userName email');
        res.status(200).send({ product, reviews });

    } catch (error) {
        console.log("Error fetching the product", error);
        res.status(500).send({ message: "Failed to fetch product" })
    }
};

//update a product
const handleUpdateProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const updateData = { ...req.body };
        // Ensure images field is handled as an array
        if (req.body.images) {
            updateData.images = Array.isArray(req.body.images) ? req.body.images : [req.body.images];
        }

        // Ensure `sizes` contains only allowed values
        const allowedSizes = ['S', 'M', 'L', 'XL', 'XXL'];
        if (req.body.sizes) {
            if (Array.isArray(req.body.sizes)) {
                updateData.sizes = req.body.sizes.filter(size => allowedSizes.includes(size));
            } else if (typeof req.body.sizes === 'string' && allowedSizes.includes(req.body.sizes)) {
                updateData.sizes = [req.body.sizes];
            }
        }

        const upadateProduct = await Product.findByIdAndUpdate(productId, updateData, { new: true });
        console.log('hi', upadateProduct);

        if (!upadateProduct) {
            return res.status(404).send({ message: 'Product not found' })
        }

        res.status(200).send({ message: "Product updated successfully", product: upadateProduct })
    } catch (error) {
        console.log("Error updating the product", error);
        res.status(500).send({ message: "Failed to update product" })
    }
};

//Delete product
const handleDeleteProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const deleteProduct = await Product.findByIdAndDelete(productId);
        if (!deleteProduct) {
            return res.status(404).send({ message: "Product not found" });
        }
        await Reviews.deleteMany({ productId: productId });
        res.status(200).send({ message: "Product deleted successfully" });

    } catch (error) {
        console.log("Error deleting the product", error);
        res.status(500).send({ message: "Failed to eleting product" })
    }
};

//get related products
const handleRelatedProduct = async (req, res) => {
    try {
        const { id } = req.params
        if (!id) {
            return res.status(404).send({ message: "Product Id is required" })
        }
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).send({ message: "Product not found" })
        }
        const titleRegex = new RegExp(product.name.split(' ').filter((word) => word.length > 1).join('|'), 'i');

        const relatedProducts = await Product.find({
            _id: { $ne: id },
            $or: [{ name: { $regex: titleRegex } },
            { category: product.category },
            ],
        });

        res.status(200).send(relatedProducts);
    } catch (error) {
        console.log("Error fetching the related product", error);
        res.status(500).send({ message: "Failed to fetch related product" })
    }
}


export { handleCreateProduct, handleGetAllProducts, handleSingleProduct, handleUpdateProduct, handleDeleteProduct, handleRelatedProduct, getAllProducts };