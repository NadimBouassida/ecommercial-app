/**
 * This is the main file of the eCommerce app.
 * It sets up the server, middleware, routes, and database connection.
 */

const express = require("express");
const connectDB = require("./config/database"); // Import the database connection function
const passport = require("passport");
const session = require("express-session");
const flash = require("connect-flash");
const expressLayouts = require("express-ejs-layouts");
const app = express();
const path = require("path");

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: "secret", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

connectDB(); // Connect to MongoDB

// Use express-ejs-layouts middleware
app.use(expressLayouts);

// Set EJS as the view engine
app.engine("ejs", require("ejs").renderFile);
app.set("view engine", "ejs");

// Set the directory for views (assuming 'views' directory in the root)
app.set("views", path.join(__dirname, "views"));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "public")));
console.log(path.join(__dirname, "public"));

// Passport config
app.use(
  session({
    secret: "secret", // Secret key for session hashing
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }, // Session expires after 1 minute of inactivity
  })
);

// Flash messages
app.use((req, res, next) => {
  res.locals.messages = req.flash();
  next();
});

app.use((req, res, next) => {
  res.locals.user = req.user || null; 
  next();
});

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Parse JSON bodies for incoming requests
app.use(express.json());

// Parse URL-encoded bodies for incoming requests
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/", require("./routes/index"));
const usersRouter = require("./routes/users");
app.use("/users", usersRouter);

// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
