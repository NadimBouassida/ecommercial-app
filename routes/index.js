// routes/index.js
const express = require('express');
const router = express.Router();
const Product = require("../models/Product"); // Import the Product model

// Route to fetch all products and render the index.ejs template
router.get('/', async (req, res) => {
    try {
        const products = await Product.find(); // Fetch all products from the database
        res.render('index', { products, user: req.user}); // Pass the products array to the index.ejs template
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching products');
    }
});

module.exports = router;
