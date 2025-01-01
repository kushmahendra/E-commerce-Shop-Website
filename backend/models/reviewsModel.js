import mongoose from 'mongoose'

const reviewsSchema=new mongoose.Schema({
    comment:{type:String,required:true},
    rating:{type:Number,required:true},
    userId:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},

    productId:{
        type:mongoose.Schema.Types.ObjectId,ref:'Product',required:true
    },
},
    {
        timestamps:true
    },

)

const Reviews= mongoose.model('Reviews',reviewsSchema)

export default  Reviews;