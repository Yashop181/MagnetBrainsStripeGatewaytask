// Import the Mongoose library
const mongoose=require("mongoose");

// Define the schema for payment data
const paymentSchema=new mongoose.Schema({
email:{
    type:String
},
transactionId:{
    type:String
},
products:{
    type:Array
},
paymentStatus:{
    type:String
}
})
// Create a model based on the schema
const paymentModel= mongoose.model("userData",paymentSchema)


// Export the model to be used in other modules
module.exports=paymentModel