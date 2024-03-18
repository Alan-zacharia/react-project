import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
import {router} from './routes/userRouter.js'
const PORT = 4000;

const app = express();

// Connect to MongoDB database.
mongoose.connect(process.env.MONGODB_URL)
    .then(() => console.log("Connected to the Database!"))
    .catch((err) => console.error(err));

app.use(express.json());

app.use('/' , router)




app.listen(PORT, () => console.log(`server running ${PORT}`));
