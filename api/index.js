import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
const app = express();
const PORT = 3000;

// Connect to MongoDB database.
mongoose.connect(process.env.MONGODB_URL)
    .then(() => console.log("Connected to the Database!"))
    .catch((err) => console.error(err));

app.use(express.json());




app.listen(PORT, () => console.log(`server running ${PORT}`));
