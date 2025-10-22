import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectdb from './config/db.js';
import authRouter from './routes/useroute.js';
import cookieParser from 'cookie-parser';
import useRouter from './routes/authroute.js';
import geminiResponse from './gemini.js';
dotenv.config();
const app=express();
app.use(cors({
  origin: "https://virtualassistant-fronted.onrender.com",
  credentials: true
}))
const port=process.env.PORT
app.use(express.json());
app.use(cookieParser())
 app.use("/api/auth",authRouter);
 app.use("/api/user",useRouter);
 

app.listen(port,()=>{
connectdb()
    console.log(`server is running on port ${port}`);
})
