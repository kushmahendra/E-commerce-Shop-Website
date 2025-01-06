import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String },
    description: { type: String },
    price: { type: Number, required: true }, 
    oldPrice: { type: Number },
    image: { type: String },  // Image URL will be stored here
    // image: { type: mongoose.Schema.Types.Mixed },
    color: { type: String },
    rating: { type: Number, default: 0 },
    author: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
});


const Product = mongoose.model('Product', productSchema);

export default Product;


