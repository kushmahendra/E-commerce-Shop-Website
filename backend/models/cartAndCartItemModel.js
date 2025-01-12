import  mongoose  from 'mongoose';

// Define the CartItem schema
const cartItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
});


// Define the Cart schema
const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ShopUser',
    required: true,
    unique: true, // Each user has only one cart
  },
  items: [cartItemSchema], // Array of CartItems
  totalCartPrice: {
    type: Number,
    default: 0, // Default total price of the cart
  },
});

// Middleware to calculate the totalCartPrice before saving the cart
cartSchema.pre('save', function (next) {
  this.totalCartPrice = this.items.reduce((acc, item) => acc + item.totalPrice, 0);
  next();
});

const Cart = mongoose.model('Cart', cartSchema);
const CartItem = mongoose.model('CartItem', cartItemSchema);

export { Cart, CartItem };
