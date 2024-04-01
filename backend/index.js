const express = require('express');
const app = express();
const port = 6000;
const connectDB = require('./utils/dbConnection');
const expenseRoutes = require('./routes/expenseRoutes');
const userRoutes = require('./routes/userRoutes');
const documentUploadRoutes = require('./routes/documentUploadRoutes');
const okrRoutes = require('./routes/okrRoutes');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', userRoutes);
app.use('/expense', expenseRoutes);
app.use('/documents', documentUploadRoutes)
app.use('/okr', okrRoutes);


connectDB();

app.listen(port, () => {
    console.log("Server running on port", port);
});
