require("dotenv").config(); // Load environment variables from a .env file into process.env
const mongoose = require("mongoose");
const connectDB = require("./config/database"); // Assuming this is the file you showed
const cloudinary = require("cloudinary").v2;

// Define the schema for camping products
const ProductSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String,
  category: String,
  imageUrl: String, // Field to store the URL of the image
});

// Create a model based on the schema
const Product = mongoose.model("Product", ProductSchema);

// Function to insert dummy data
const insertDummyData = async () => {
  await connectDB(); // Connect to the database

  // Drop the CampingProduct collection if it exists
  try {
    await mongoose.connection.dropCollection("products");
    console.log("Existing collection dropped");
  } catch (err) {
    // If the collection does not exist, catch the error and log it
    console.log("No existing collection to drop, proceeding to insert data");
  }

  // Array of dummy camping products
  const products = [
    {
      name: "Tent",
      price: 99.99,
      description: "A waterproof 2-person tent",
      category: "Shelter",
    },
    {
      name: "Sleeping Bag",
      price: 39.99,
      description: "A warm and cozy sleeping bag",
      category: "Sleeping Gear",
    },
    {
      name: "Camping Stove",
      price: 29.99,
      description: "Portable camping stove",
      category: "Cooking",
    },
    // Add more products as needed
  ];

  // Insert dummy data into the database
  try {
    await Product.insertMany(products);
    console.log("Dummy data inserted successfully");
  } catch (err) {
    console.error("Error inserting dummy data:", err);
  }
};

// Function to fetch image URLs from Cloudinary and store them in the database
const fetchAndStoreImageUrls = async () => {
  await insertDummyData(); // Insert dummy data before fetching image URLs
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  // Fetch images from Cloudinary
  try {
    const result = await cloudinary.search
      .expression(`folder:${"products"}`) // Filter by folder name
      // .sort_by("public_id", "desc") // Optional: Sort the results
      // .max_results(30) // Optional: Limit the number of results
      .execute();
    const { resources } = result;
    try {
      const products = await Product.find();
      for (let i = 0; i < products.length; i++) {
        // Assign the URL to the imageUrl field
        products[i].imageUrl = resources[i].secure_url;
        // Save the updated product
        await products[i].save();
      }
      console.log("Images updated successfully");
    } catch (error) {
      //Quick error handling
      console.error("Error updating images:", error);
      return;
    }
  } catch (error) {
    console.error("Error fetching images from Cloudinary:", error);
  } finally {
    // Close the MongoDB connection
    await mongoose.disconnect();
    console.log("MongoDB connection closed.");
  }
};

// Call the function to fetch and store image URLs
fetchAndStoreImageUrls();
