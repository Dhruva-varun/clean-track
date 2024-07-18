const express = require('express');
const connectDB = require('./config/db');
const adminRoutes = require('./routes/adminRoutes');
const driverRoutes = require('./routes/driverRoutes');
const userRoutes = require('./routes/userRoutes');
require('dotenv').config();
const cors = require('cors');
const path  = require("path");


const app = express();
app.use(cors({
    origin: 'http://localhost:3000' // Replace with your frontend URL
  }));

// Middlewares
app.use(express.json());

app.use(express.static(path.join(__dirname,'../frontend/build')))
app.get('*',(req,res)=>{
  res.sendFile(path.join(__dirname,"../frontend/build/index.html"))
});

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/admin', adminRoutes);
app.use('/api/driver', driverRoutes);
app.use('/api/user', userRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));