const express = require('express'); // express framework import 
const app = express(); 
const cors = require('cors') //  Cross-Origin Resource Sharing
const dotenv = require('dotenv'); // manage environment variables

// Load environment variables from a .env file into process.env
dotenv.config()


const connectDb = require('./Database/database'); // Import the database connection module
connectDb();  // Establish the database connection

const router = require('./routes/router'); // Import the router for defining application routes

app.use(express.json()); // Parse incoming JSON requests and place the parsed data in req.body
app.use(cors()); //Enable CORS 

app.use(router)  // Mount the router to handle routes

// Export the Express application for use in other modules
module.exports = app;
