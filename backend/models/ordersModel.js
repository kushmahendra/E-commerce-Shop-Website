import mongoose from 'mongoose';


const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ShopUser',
    required: true,
  },

  items: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Cart', 
      required: true,
    },
  ],
  addressInfo: {
    type: Object, 
    required: true,
  },
  orderStatus: {
    type: String,
    enum: ['Pending', 'Shipped', 'Delivered', 'Cancelled'],
    default: 'Pending',
  },
  paymentMethod: {
    type: String,
    enum: ['RazorPay', 'Credit Card', 'Cash On Delivery'],
    // required: true,
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



});

const Order = mongoose.model('Order', orderSchema);
export default Order;

  // orderUpdateDate: {
  //   type: Date,
  //   default: Date.now,
  // },
  // paymentId: {
  //   type: String,
  //   default: '',
  // },
  // payerId: {
  //   type: String,
  //   default: '',
  // },
    // cartId: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'Cart',
  //   required: true,
  // },

