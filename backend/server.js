import express from 'express'
import dotenv from 'dotenv'
import mongoDbConnect from './config/db.js';
import cors from 'cors'
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import authRoute from './routes/userRoute.js';
import productRoute from './routes/productRoute.js';
import reviewRoute from './routes/reviewsRoute.js';
import uploadRoutes from './routes/upload.js';
import profileRoute from './routes/profileRoute.js';
import adminRoute from './routes/adminRoute.js';
import resetPasswordrRouter from './routes/resetPasswordRoute.js';
import userOtpRoute from './routes/userOtpRoute.js';
import orderRoute from './routes/ordersRoute.js';
import cartItemRoute from './routes/cartItemRoute.js';
import cartRoute from './routes/cartRoute.js';


dotenv.config();
const app = express()

app.use(
    cors({
        origin:process.env.CLIENT_URL,
        methods:["GET","POST","PUT","DELETE"],
        allowedHeaders: ['Authorization', 'Content-Type'],
        credentials:true
    })
)

app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());


mongoDbConnect();


//All routes
app.get('/',(req,res)=>{
    res.json({message:"hello"})
})
app.use('/api/auth', authRoute)
app.use('/api', productRoute)
app.use('/api/reviews', reviewRoute)
// Routes
app.use('/api/upload', uploadRoutes);
app.use('/api', profileRoute);
app.use('/admin', adminRoute)
app.use('/api', resetPasswordrRouter);
app.use('/user',userOtpRoute);
app.use('/api',orderRoute);
app.use('/api',cartItemRoute)
app.use('/api',cartRoute)

const PORT = process.env.PORT

app.listen(PORT, () => { console.log(`Server is running on http://localhost:${PORT}`) })