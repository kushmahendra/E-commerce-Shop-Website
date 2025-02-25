import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String },
    description: { type: String },
    price: { type: Number, required: true }, 
    oldPrice: { type: Number },
    // image: { type: String,default: "" },  // Image URL will be stored here
    images: [{ type: String, default: [] }],  // Store multiple image URLs
    // selectedImage:{ type: String,default: "" },
 
    sizes: { 
      type: [String], 
      enum: ['S', 'M', 'L', 'XL', 'XXL'], 
      default: ['S','M', 'L', 'XL', 'XXL']  // Default size set to 'M'
  },

  volume: {
    type: [String],
    enum: ['50ml', '100ml', '250ml', '500ml', '1000ml'],
    default: [],
  },
    color: {
        type: [String],
        enum: ['red', 'blue', 'green', 'yellow', 'black', 'white',  'orange', 'purple', 'pink', 'brown', 'golden', 'gray','silver' ], // Allowed colors
        default: ['red', 'blue', 'green', 'yellow', 'black', 'white',  'orange', 'purple', 'pink', 'brown', 'golden', 'gray','silver' ], // Default color
      },
      
   

    rating: { type: Number, default: 0 },
    author: { type: mongoose.Types.ObjectId, ref: 'ShopUser' },
    // author: { type: mongoose.Types.ObjectId, ref: 'ShopUser', required: true },
    stock: {
        type: Number,
        // required: true,
        default: 0,
      },
      createdAt: { type: Date, default: Date.now },
});


const Product = mongoose.model('Product', productSchema);

export default Product;


