import mongoose from 'mongoose';

const ordersSchema = new mongoose.Schema({
    user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'ShopUser',
            required: true,
          },
    products: [
               {
            product: {
                     type: mongoose.Schema.Types.ObjectId,
                     ref: 'Product',
                      required: true,
                     },
            quantity: {
                      type: Number,
                      required: true,
                      default: 1,
                     },
                },
              ],
    totalAmount: {
                  type: Number,
                  required: true,
                  },
    status: {
               type: String,
               enum: ['Pending', 'Shipped', 'Delivered', 'Cancelled'],
              default: 'Pending',
            },
    createdAt: {
                type: Date,
              default: Date.now,
               },
  });
  
  const Order =new  mongoose.model('Order', ordersSchema);

   export default Order;
  