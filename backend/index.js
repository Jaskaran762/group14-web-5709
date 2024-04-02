const express = require('express');
const app = express();
const port = 5000;
const cors = require('cors');
const connectDB = require('./utils/dbConnection');
const expenseRoutes = require('./routes/expenseRoutes');
const userRoutes = require('./routes/userRoutes');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())
app.use('/', userRoutes);
app.use('/expense', expenseRoutes);

connectDB();
app.listen(port, () => {
    console.log("Server running on port", port);
});
