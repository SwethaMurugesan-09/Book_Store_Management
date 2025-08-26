import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import 'dotenv/config' 
import userRoutes from './routes/userRoutes.js';
import bookRoutes from './routes/bookRoutes.js';
import connectCloudinary from './config/cloudinary.js';
const app= express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));


await connectDB();
await connectCloudinary();

const PORT = process.env.PORT || 5001; 

app.get('/',(req,res)=>res.send("API WORKING"));
app.use('/api/user',userRoutes);
app.use('/api/book',bookRoutes);

app.listen(PORT, ()=>{
    console.log(`server connected successfully on port ${PORT}`);
})