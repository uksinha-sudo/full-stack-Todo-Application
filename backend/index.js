import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { userRouter } from './routes/userRoute.js';
import { todoRouter } from './routes/todoRoute.js';
import cors from 'cors'
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

//Routes

app.use("/api/v1/user", userRouter);
app.use("/api/v1/todo", todoRouter);


//Connection to Database
connectDB();
async function connectDB(){
    const mongoUrl = process.env.MONGO_URI;
    const PORT = process.env.PORT;
    if(!mongoUrl){
        throw new Error("Couldn't find MONGO_URL");
    }

    await mongoose.connect(mongoUrl);
    app.listen(PORT, ()=>{
        console.log(`Connected to DB, Server is now listening to PORT ${PORT}`)
    });
}