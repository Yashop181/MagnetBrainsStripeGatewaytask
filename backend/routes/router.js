const express = require('express')

// Create a new router instance
const router = express.Router();

// Import the payment controller which contains the payment logic
const paymentController = require('../controllers/paymentController')

// route handle requests to '/api/create-checkout-session' and call the makePayment function from the paymentController
router.post('/api/create-checkout-session',paymentController.makePayment);

// Export the router
module.exports=router