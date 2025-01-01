import express from 'express'
import dotenv from 'dotenv'
import mongoDbConnect from './config/db.js';
import cors from 'cors'
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import authRoute from './routes/userRoute.js';
import productRoute from './routes/productRoute.js';
import reviewRoute from './routes/reviewsRoute.js';

dotenv.config();
const app=express()

//middleware setup
app.use(express.json({limit:'25mb'}))
app.use(express.urlencoded({limit:'25mb'}))
app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.use(cors({
    origin: process.env.CLIENT_URL, // Fixed the typo in the environment variable
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
}));
 
mongoDbConnect();

//All routes
app.use('/api/auth',authRoute)
app.use('/api/products',productRoute)
app.use('/api/reviews', reviewRoute)

const PORT=process.env.PORT

app.listen(PORT, ()=>{console.log(`Server is running on http://localhost:${PORT}`)})