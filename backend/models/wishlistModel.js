import mongoose from 'mongoose'

const wishlistSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'ShopUser' },
    items: [
        {
            product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
            createdAt: { type: Date, default: Date.now }, // Track when the product was added to the wishlist
            // name: String,
            // category:String,
            // price: Number,
            // image: String,
            // stock:Number,
            // color:String,
            // description: String,
        },
    ],
    createdAt: { type: Date, default: Date.now },
});

const Wishlist = mongoose.model('Wishlist', wishlistSchema);

export default Wishlist;
