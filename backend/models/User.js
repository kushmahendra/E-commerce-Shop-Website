import mongoose from 'mongoose'
const shopUserSchema=new mongoose.Schema({

userName:{type:String,require:true},

email:{type:String,require:true,unique:true},

password:{type:String,require:true},

role:{type:String,default:'user'},

profileImage:String,

bio:{type:String,maxlength:200},

profession:String,

createdAt:{
    type:Date,
    default:Date.now
}


})

const ShopUser=new mongoose.model('ShopUser',shopUserSchema);

export default ShopUser;