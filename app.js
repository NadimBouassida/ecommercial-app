// Main application file for the eCommerce app
// Configures server, middleware, routes, and database connection

const express = require("express");
const connectDB = require("./config/database");
const passport = require("passport");
const session = require("express-session");
const flash = require("connect-flash");
const expressLayouts = require("express-ejs-layouts");
const path = require("path");
const i18n = require("./config/i18n.config");
const cookieParser = require("cookie-parser");

const app = express();

// Middleware setup
app.use(express.urlencoded({ extended: true })); // Parses URL-encoded bodies
app.use(express.json()); // Parses JSON bodies

// Cookie parser
app.use(cookieParser());

// Session and Passport configuration
app.use(
  session({
    secret: "secret", 
    resave: false, 
    saveUninitialized: true, 
    cookie: { maxAge: 60000 }, 
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Internationalization
app.use(i18n.init);

// Flash messages middleware
app.use((req, res, next) => {
  res.locals.messages = req.flash();
  next();
});

// User data available globally
app.use((req, res, next) => {
  res.locals.user = req.user || null;
  next();
});

// Connect to MongoDB
connectDB();

// Set up EJS view engine with layouts
app.use(expressLayouts);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// Route definitions
app.use("/", require("./routes/index"));
app.use("/users", require("./routes/users"));

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

