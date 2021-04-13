// import express from 'express';
// in pakage-json :   "type": "module",
// import data from './data.js'
// const express = require("express");
// // const data = require("./data.js");
// const data = require("./data.js");

// import express from 'express';
// import data from './data.js';


// const express = require ("express");
// const data = require ("./data.js");

import express from 'express';
import mongoose from 'mongoose';
// import data from './data.js';
import dotenv from 'dotenv';
import productRouter from './routers/productRouter.js';
import userRouter from './routers/userRoutes.js';

dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGODB_URL || 'mongodb+srv://admin:admin@cluster0.iutbg.mongodb.net/MarketDMedical?retryWrites=true&w=majority',{
// mongoose.connect(process.env.MONGODB_URL || 'mongodb+srv://admin:admin@cluster0.iutbg.mongodb.net/amazona?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});

// app.get('/api/products/:id' , (req, res) => {
//     const product = data.products.find((x) => x._id === req.params.id);
//     if(product){
//         res.send(product);
//     } else{
//         res.status(404).send ({ message: 'Product not Fund' });
//     }
// } );

// app.get('/api/products', (req, res) => {
//     res.send(data.products);
// })

app.use('/api/users', userRouter);
app.use('/api/products', productRouter);
app.get('/', (req,res) => {
    res.send('Server is ready');
});

app.use((err, req, res, next) => {
    res.status(500).send({ message: err.message });
  });


const port = process.env.PORT || 5000;
app.listen(port, () =>{
    console.log(`Server at http://localhost:${port}`);
});