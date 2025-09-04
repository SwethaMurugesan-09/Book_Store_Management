import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import 'dotenv/config' 
import userRoutes from './routes/userRoutes.js';
import bookRoutes from './routes/bookRoutes.js';
import connectCloudinary from './config/cloudinary.js';
import { Socket } from 'socket.io';


const app= express();

const allowedOrigins = [
  "http://localhost:5173", // local dev
  "https://classic-reads-bay.vercel.app" // actual deployed client URL
];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization"
};

app.use(cors(corsOptions));
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