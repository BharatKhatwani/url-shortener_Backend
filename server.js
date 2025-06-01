require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
app.use(express.json());
const  ShortID = require('./Routes/Short');
const AuthRoute = require('./Routes/authRoute')

const cors = require('cors');


app.use(cors({
  origin: 'https://url-shortener-fhgs.vercel.app/',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));



// Connect to MongoDB
const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("MongoDB connected successfully")
    } catch (error) {
        console.log("Error in connecting the DB:", error);
    }
};

connectDb();

// // Test Route
// app.get('/', (req, res) => {
//     res.send("Hello from server");
// });

app.use('/auth', AuthRoute);
app.use('/', ShortID);
// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});
