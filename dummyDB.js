const mongoose = require('mongoose');
const connectDB = require('./config/database'); // Assuming this is the file you showed

// Define the schema for camping products
const campingProductSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String,
  category: String,
});

// Create a model based on the schema
const CampingProduct = mongoose.model('CampingProduct', campingProductSchema);

// Function to insert dummy data
const insertDummyData = async () => {
    await connectDB(); // Connect to the database
  
    // Drop the CampingProduct collection if it exists
    try {
      await mongoose.connection.dropCollection('campingproducts');
      console.log('Existing collection dropped');
    } catch (err) {
      // If the collection does not exist, catch the error and log it
      console.log('No existing collection to drop, proceeding to insert data');
    }
  
    // Array of dummy camping products
    const products = [
      { name: 'Tent', price: 99.99, description: 'A waterproof 2-person tent', category: 'Shelter' },
      { name: 'Sleeping Bag', price: 39.99, description: 'A warm and cozy sleeping bag', category: 'Sleeping Gear' },
      { name: 'Camping Stove', price: 29.99, description: 'Portable camping stove', category: 'Cooking' },
      // Add more products as needed
    ];
  
    // Insert dummy data into the database
    try {
      await CampingProduct.insertMany(products);
      console.log('Dummy data inserted successfully');
    } catch (err) {
      console.error('Error inserting dummy data:', err);
    }
  
    // Close the database connection
    mongoose.connection.close();
  };
// Call the function to insert dummy data
insertDummyData();