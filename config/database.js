const mongoose = require('mongoose');

// Connection URI
const uri = 'mongodb://127.0.0.1:27017/ecommerce'; // Replace with your MongoDB connection string and database name

// Options for Mongoose
const options = {};

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(uri, options);
    console.log('Connected successfully to MongoDB');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;
 