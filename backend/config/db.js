import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config();

const mongoDbConnect=async()=>
{
    try{
       await  mongoose.connect(process.env.MONGO_URI)
         {
            console.log("MongoDb connected Successfully")
         }
    }
    catch(error)
    {
 console.log("MongoDb Failed to Connect")
    }
}
export default mongoDbConnect;