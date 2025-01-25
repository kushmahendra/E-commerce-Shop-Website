import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String },
    description: { type: String },
    price: { type: Number, required: true }, 
    oldPrice: { type: Number },
    image: { type: String,default: "" },  // Image URL will be stored here
    // image: { type: mongoose.Schema.Types.Mixed },
    color: {
        type: String,
        enum: ['red', 'blue', 'green', 'yellow', 'black', 'white',  'orange', 'purple', 'pink', 'brown', 'golden', 'gray' ], // Allowed colors
        default: 'black', // Default color
      },

    rating: { type: Number, default: 0 },
    author: { type: mongoose.Types.ObjectId, ref: 'ShopUser' },
    // author: { type: mongoose.Types.ObjectId, ref: 'ShopUser', required: true },
    stock: {
        type: Number,
        required: true,
        default: 0,
      },
      createdAt: { type: Date, default: Date.now },
});


const Product = mongoose.model('Product', productSchema);

export default Product;


