require('dotenv').config();
const paymentModel = require('../models/paymentModel');  // Import the payment model from models folder
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY); // Initialize Stripe with the secret key


// Controller function to handle payment creation
const makePayment = async(req,res)=>{

    // Extract products and email from request body
    const {products, email} = req.body;

    try {
        // Map products to Stripe line items format required by stripe
        const lineItems = products.map((product) =>{
            return {
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: product.title,
                        images: [product.image],
                    },
                    unit_amount: product.price * 100, // Convert price to cents
                },
                quantity: product.quantity,
            };
        });

         // Create a Stripe Checkout session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],  // Payment method type 
            line_items: lineItems,// items being purchased by the user
            mode: "payment",  // Mode of the checkout session
            success_url: "http://localhost:3000/success", // URL to redirect to on successful payment
            cancel_url: "http://localhost:3000/cancel", // URL to redirect to on cancel payment
        });

        // Respond with the session ID
        res.json({
            id: session.id, // used to redirect customer to the stripe checkout page , where they can completed the payment 
        });

                // Save payment details to the database
                const newdata = await new paymentModel({
                    email: email,
                    transactionId: session.id, // Use session ID as transaction ID
                    paymentStatus: "Success",  // Set initial payment status
                    products: products
                });
                await newdata.save();  // Save to MongoDB
    } catch (error) {
        console.error('Error occurred:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

// Export the makePayment function
module.exports = {
    makePayment
}