import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ShopUser',
    required: true,
  },
  cartId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cart',
    required: true,
  },
  cartItems: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'CartItem', // Reference to CartItem model
      required: true,
    },
  ],
  addressInfo: {
    type: Object, // Can be further structured (e.g., { street, city, state, postalCode })
    required: true,
  },
  orderStatus: {
    type: String,
    enum: ['Pending', 'Shipped', 'Delivered', 'Cancelled'],
    default: 'Pending',
  },
  paymentMethod: {
    type: String,
    enum: ['paypal', 'credit_card', 'cash_on_delivery'],
    required: true,
  },
  paymentStatus: {
    type: String,
    enum: ['Pending', 'Completed', 'Failed'],
    default: 'Pending',
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  orderDate: {
    type: Date,
    default: Date.now,
  },
  orderUpdateDate: {
    type: Date,
    default: Date.now,
  },
  paymentId: {
    type: String,
    default: '',
  },
  payerId: {
    type: String,
    default: '',
  },
});

const Order = mongoose.model('Order', orderSchema);
export default Order;


// const ordersSchema = new mongoose.Schema({
//   user: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'ShopUser',
//     required: true,
//   },
//   cartItems: [
//     {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'CartItem', // Reference to CartItem model
//       required: true,
//     },
//   ],
//   status: {
//     type: String,
//     enum: ['Pending', 'Shipped', 'Delivered', 'Cancelled'],
//     default: 'Pending',
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
// });


// const Order = mongoose.model('Order', ordersSchema);

// export default Order;
