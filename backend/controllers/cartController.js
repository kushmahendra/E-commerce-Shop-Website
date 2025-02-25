import express from 'express';
import Product from '../models/productModel.js';
import { Cart } from '../models/cartAndCartItemModel.js';



// Add an item to the cart
const handleAddCart = async (req, res) => {
  try {
    const { userId, productId, quantity = 1, size = 'M', color = "black", image ,volume = "50ml" } = req.body;

    console.log('id', userId);
    console.log('Pid', productId);
    console.log('q', quantity);
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

    let cart = await Cart.findOne({ user: userId }).populate({
      path: "items.product", 
      model: "Product",
      select: "name price images category description stock sizes color",
    });

    console.log('Existing cart product:', cart?.items[0]?.product);

    if (!cart) {
      cart = new Cart({ user: userId, items: [] });
    }

    // Check if the product with the same size and color already exists in the cart
    const existingCartItemIndex = cart.items.findIndex(item => {
      return (
        item.product._id.toString() === productId.toString() &&
        item.product.sizes.includes(size) && 
        item.product.color.includes(color)
      );
    });

    if (existingCartItemIndex > -1) {
      // Update quantity and total price
      cart.items[existingCartItemIndex].quantity += quantity;
      cart.items[existingCartItemIndex].totalPrice =
      cart.items[existingCartItemIndex].quantity * product.price;

      // // ✅ Ensure that the size is part of the array without overriding existing sizes
      // if (!cart.items[existingCartItemIndex].product.sizes.includes(size)) {
      //   cart.items[existingCartItemIndex].product.sizes.push(size);
      // }

      cart.items[existingCartItemIndex].product.images = [image]; // Always replace with a single image
      cart.items[existingCartItemIndex].product.color = [color];
      cart.items[existingCartItemIndex].product.sizes = [size];
      cart.items[existingCartItemIndex].product.volume = [volume];
    } else {
      // Add a new product to the cart
      cart.items.push({
        product: {
          _id: product._id,
          name: product.name,
          price: product.price,
          category: product.category,
          description: product.description,
          images: [image],
          sizes: [size], // ✅ Store sizes as an array
          color: [color],
          volume: [volume],
          rating: product.rating,
          stock: product.stock,
          oldPrice: product.oldPrice,
        },
        quantity,
        totalPrice: product.price * quantity,
      });
    }

    console.log('Added cart item:', cart.items);
    console.log('Cart Item Index:', existingCartItemIndex);

    cart.totalCartPrice = cart.items.reduce((sum, item) => sum + item.totalPrice, 0);

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

//update Item
const handleUpdateCartItem = async (req, res) => {
  try {
      const { userId, itemId, quantity, size, color, image } = req.body;

      console.log('Updating Cart Item');
      console.log('User ID:', userId);
      console.log('Item ID:', itemId);
      console.log('Quantity:', quantity);
      console.log('Size:', size);
      console.log('Color:', color);
      console.log('Image:', image);

      if (!userId || !itemId) {
        return res.status(400).json({ message: 'Invalid input data' });
    }

    // Find the cart by user ID
    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
        return res.status(404).json({ message: 'Cart not found' });
    }

    // Find the index of the cart item using `itemId`
    const itemIndex = cart.items.findIndex((item) => item._id.toString() === itemId);

    if (itemIndex === -1) {
        return res.status(404).json({ message: 'Cart item not found' });
    }

    // Update the item details if provided
    if (quantity >= 0) cart.items[itemIndex].quantity = quantity;  // Ensure valid quantity
    if (size) cart.items[itemIndex].product.sizes = [size];  // Assuming size array to be updated
    if (color) cart.items[itemIndex].product.color = color;
    if (image) cart.items[itemIndex].product.images = [image];  // Update with the first image

    // Update the total price of the item
    const productPrice = cart.items[itemIndex].product.price;
    cart.items[itemIndex].totalPrice = cart.items[itemIndex].quantity * productPrice;

    // Recalculate the total cart price
    cart.totalCartPrice = cart.items.reduce(
        (sum, item) => sum + item.totalPrice,
        0
    );

    // Save the updated cart details
    await cart.save();

    return res.status(200).json({ message: 'Cart item updated', updatedItem: cart.items[itemIndex] });
} catch (error) {
    return res.status(500).json({ message: 'Internal Server Error', error: error.message });
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

export {handleAddCart,handleGetSingleCart,handleUpdateCart,handleUpdateCartItem ,handleRemoveCart ,handleClearCart }
