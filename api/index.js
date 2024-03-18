import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
import {router} from './routes/userRouter.js'
const PORT = process.env.PORT;

const app = express();

// Connect to MongoDB database.
mongoose.connect(process.env.MONGODB_URL)
    .then(() => console.log("Connected to the Database!"))
    .catch((err) => console.error(err));

app.use(express.json());

app.use('/api/' , router)

app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server error";
    return res.status(statusCode).json({
        success:false,
        error:message,
        statusCode
    })
});


app.listen(PORT, () => console.log(`server running ${PORT}`));
