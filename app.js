const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');
const expressLayouts = require('express-ejs-layouts');
const app = express();
const path = require('path');

// Database configuration
mongoose.connect('mongodb://localhost:27017/ecommerce', { useNewUrlParser: true, useUnifiedTopology: true });

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: 'secret', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Use express-ejs-layouts middleware
app.use(expressLayouts);

// Set EJS as the view engine
app.engine('ejs', require('ejs').renderFile);
app.set('view engine', 'ejs');

// Set the directory for views (assuming 'views' directory in the root)
app.set('views', path.join(__dirname, 'views'));

// Routes
app.use('/', require('./routes/index')); 
app.use('/users', require('./routes/users'));

// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));  
       