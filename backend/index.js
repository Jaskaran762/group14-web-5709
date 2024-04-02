const userAuth = require('./middleware/auth')
const express = require('express');
const cors = require('cors')
const app = express();
const port = 5000;
const connectDB = require('./utils/dbConnection');
const expenseRoutes = require('./routes/expenseRoutes');
const userRoutes = require('./routes/userRoutes');
const documentUploadRoutes = require('./routes/documentUploadRoutes');
const subscriptionRoutes = require('./routes/subscriptionRoutes');
const bodyParser=require('body-parser');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', userRoutes);
app.use('/expense', expenseRoutes);
app.use('/documents', documentUploadRoutes)
app.use('/api/v1', subscriptionRoutes)
app.use(bodyParser.json())

connectDB();

app.listen(port, () => {
    console.log("Server running on port", port);
});
