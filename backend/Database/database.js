// Import Mongoose library
const mongoose = require("mongoose");

// Define an asynchronous function to connect to the MongoDB database
const connectDb=async()=>{
  try{
    // connect to the MongoDB database
    await mongoose.connect("mongodb://127.0.0.1:27017/magnetstripe")
    console.log("Database connected");// Log a success message if the connection is successful
  }catch(error){
    console.log(`Error in connecting with database ${error}`) // Log an error message if there is a problem connecting to the database
  }
}

// Export the connectDb function
module.exports = connectDb

