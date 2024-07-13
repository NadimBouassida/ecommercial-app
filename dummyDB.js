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
  cloudinary.api.resources(
    { type: "upload", max_results: 500 }, // Adjust parameters as needed
    async (error, result) => {
      if (error) {
        console.error("Error fetching images from Cloudinary:", error);
        return;
      }

      const { resources } = result;
      // Declare the result variable and extract URLs
      console.log("fetching images from Cloudinary:", resources);
      try {
        const products = await Product.find();
        for (let i = 0; i < products.length; i++) {
          // Assign the URL to the imageUrl field
          products[i].imageUrl = resources[i].secure_url;
          // Save the updated product
          await products[i].save();
          await Product.updateOne(
            { _id: products[i]._id },
            { $set: { imageUrl: resources[i].secure_url } }
          );
        }
      } catch (error) {
        //Quick error handling
        console.error("Error fetching images from Cloudinary:", error);
        return;
      } finally {
        // Close the MongoDB connection
        await mongoose.disconnect();
        console.log("MongoDB connection closed.");
      }
      console.log("All images have been stored in the database.");
    }
  );
};


// Call the function to fetch and store image URLs
fetchAndStoreImageUrls();