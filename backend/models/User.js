import mongoose from 'mongoose'
const shopUserSchema=new mongoose.Schema({
    
    firstName: { type: String, required: true },
    lastName: { type: String, default: "" },
  
    email: { type: String, required: true, unique: true },
  
    password: { type: String, required: true },
  
    phoneNumber: { type: Number, required: true },
  
    role: { type: String, default: "user" },
  
    profileImage: { type: String, default: "" },
  
    bio: { type: String, default: "", maxlength: 200 },
  
    profession: { type: String, default: "" },
    orders: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order',
    },
    

    cart: [{   //square bracket represents cart array
      type: mongoose.Schema.Types.ObjectId,
      ref: 'CartItem', // Reference to CartItem model
    }],
  
    createdAt: {
      type: Date,
      default: Date.now,
    },

});

const ShopUser=new mongoose.model('ShopUser',shopUserSchema);

export default ShopUser;