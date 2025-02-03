import express from 'express';
import Product from '../models/productModel.js';
import { Cart } from '../models/cartAndCartItemModel.js';


// Add an item to the cart
const handleAddCart=async (req, res) => {
  try {
    // const { userId, _id:productId, quantity=1,selectedImageIndex } = req.body;
    const { userId, productId, quantity=1, size = 'M',color = "black", image  } = req.body;

    console.log('id',userId)
    console.log('Pid',productId)
    console.log('q',quantity)
    console.log('Size:', size);
    console.log("Color:", color);
    console.log("Image:", image);


    if (!userId || !productId || !quantity || quantity <= 0) {
      return res.status(400).json({ message: 'Invalid input data' });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

      //first update size and then check
      
      //  // Validate if selected size is available for this product
      //  if (!product.sizes.includes(size)) {
      //   return res.status(400).json({ 
      //     message: `Invalid size. Available sizes for this product: ${product.sizes.join(', ')}` 
      //   });
      // }

       // Validate if selected color is available
    // if (!product.color.includes(color)) {
    //   return res.status(400).json({
    //     message: `Invalid color. Available colors: ${product.color.join(", ")}`,
    //   });
    

    let cart = await Cart.findOne({ user: userId }).populate({
      path: "items.product", // Populate the product field
      model: "Product", // Reference the Product model
      select: "name price images category description stock sizes color", // Select only required fields
    });

    if (!cart) {
      cart = new Cart({ user: userId, items: [] });
    }

    // const existingCartItemIndex = cart.items.findIndex(
    //   (item) => item.product.toString() === productId
    // );
    // console.log('cartitemindex',existingCartItemIndex );

 // Check if the product with the same size and color already exists in the cart
 const existingCartItemIndex = cart.items.findIndex(
  (item) => item.product._id.toString() === productId && item.sizes === size && item.color === color
);


    if (existingCartItemIndex > -1) {
      cart.items[existingCartItemIndex].quantity += quantity;
      cart.items[existingCartItemIndex].totalPrice =
        cart.items[existingCartItemIndex].quantity * product.price;
    } else {
      // cart.items.push({
      //   product: productId,
      //   quantity,
      //   totalPrice: product.price * quantity,
      // });

         // Add a new product to the cart
      cart.items.push({
        product: {
          _id: product._id,
          name: product.name,
          price: product.price,
          category: product.category,
          description: product.description,
          images:image, 
          // images: product.images, 
        
          sizes:size,
          color:color,
          rating: product.rating,
          stock: product.stock,
          oldPrice: product.oldPrice,
        },
      
        quantity,
        totalPrice: product.price * quantity,
    
      });
    }
    console.log('cartItemIndex',existingCartItemIndex);

    cart.totalCartPrice = cart.items.reduce(
      (sum, item) => sum + item.totalPrice,
      0
    );

    await cart.save();
    res.status(200).json({ message: 'Cart updated', cart });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};

// Get the cart for a user
const handleGetSingleCart=async (req, res) => {
  try {
    const { userId } = req.params;

    const cart = await Cart.findOne({ user: userId }).populate({
      path: 'items.product',
      model: 'Product',
      select: 'name price category description images  sizes  color  rating stock oldPrice',
      // select: 'name price category description images selectedImage color rating stock oldPrice',
    });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

  return  res.status(200).json(cart);
  
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};


//handle update
const handleUpdateCart = async (req, res) => {
    try {
      const { userId, productId, quantity, size ,color , image } = req.body;
      console.log('update');
      console.log('id',userId)
      console.log('Pid',productId)
      console.log('q',quantity)
      console.log('Size:', size);
      console.log("Color:", color);
      console.log("Image:", image);
      
  
      if (!userId || !productId || quantity < 0) {
        return res.status(400).json({ message: 'Invalid input data' });
      }
  
      const cart = await Cart.findOne({ user: userId }).populate({
        path: 'items.product',
        model: 'Product',
        select: 'price sizes color images',
      });
  
      if (!cart) {
        return res.status(404).json({ message: 'Cart not found' });
      }
  
      const itemIndex = cart.items.findIndex(
        (item) => item.product._id.toString() === productId
      );
  
      if (itemIndex === -1) {
        return res.status(404).json({ message: 'Product not in cart' });
      }
  
      if (quantity === 0) {
        // Remove item from cart
        cart.items.splice(itemIndex, 1);
      } else {
        const productPrice = cart.items[itemIndex].product.price;
        cart.items[itemIndex].quantity = quantity;
        cart.items[itemIndex].totalPrice = quantity * productPrice;
      }

       // Optionally update product options (sizes, color, images) if provided
       if (size) cart.items[itemIndex].sizes = size;
       if (color) cart.items[itemIndex].color = color;
       if (image) cart.items[itemIndex].images = image;
  
      // Recalculate total cart price
      cart.totalCartPrice = cart.items.reduce(
        (sum, item) => sum + item.totalPrice,
        0
      );
  
      await cart.save();
      res.status(200).json({ message: 'Cart updated', cart });
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
  };
  

// Remove an item from the cart
const handleRemoveCart = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );

    if (itemIndex === -1) {
      return res.status(404).json({ message: 'Product not in cart' });
    }

    cart.items.splice(itemIndex, 1);

    cart.totalCartPrice = cart.items.reduce(
      (sum, item) => sum + item.totalPrice,
      0
    );

    await cart.save();
    res.status(200).json({ message: 'Item removed from cart', cart });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};


// Clear the cart
const handleClearCart = async (req, res) => {
  try {
    const { userId } = req.params;

    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }


    cart.items = [];
    cart.totalCartPrice = 0;

    await cart.save();
    res.status(200).json({ message: 'Cart cleared', cart });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};

export {handleAddCart,handleGetSingleCart,handleUpdateCart,handleRemoveCart ,handleClearCart }
