import express from "express";
import dotenv from 'dotenv'
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import { errorHandler, notFound } from "./middleware/errormiddleware.js";

connectDB(); // connect to mongodb

const port = process.env.PORT || 5000;
const app = express();

app.get('/' , (req, res)=>{
    res.send('API is running...');
});

app.use('/api/products', productRoutes)
app.use(notFound);
app.use(errorHandler);
app.listen(port, ()=> console.log(`server running on ${port}`))