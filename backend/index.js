const express = require('express');
const app =express();
const port = 6000;
const connectDB = require('./utils/dbConnection');
const expenseRoutes=require('./routes/expenseRoutes');
const userRoutes = require('./routes/userRoutes');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/expense',expenseRoutes);
app.use('/user',userRoutes);
connectDB();
app.listen(port,()=>{
    console.log("server running on port",port);
})
