import { useEffect, useState } from "react"
import { useDispatch , useSelector } from "react-redux"
import { loadStripe } from "@stripe/stripe-js"
import { Link } from "react-router-dom"
import {qtyDecrease,qtyIncrease,removeCart,clearCart} from '../redux/slices/cartSlice';
import '../Csss/CartPage.css'
const CartPage = () => {
    let Sum =0 // initial  sum  to keep track of the  total price 
    const [cartItems , setCartItems] = useState(''); // State to store cart item count message
    const [email ,setEmail] = useState(""); // State to store user email
    const cartData = useSelector((state) => state.cartSlice.cart); // Get cart data from Redux store
    const dispatch = useDispatch(); // Initialize the dispatch function from Redux

    // Function to update cart item count message based on cart data like if cartdata is above 0 then display the length or else your cart is empty 
    const cartQuantity = () =>{
        if(cartData.length > 0)
        {
            setCartItems(`Cart (${cartData.length}) items`);
        } else
        {
            setCartItems("your cart is empty")
        }
    }
    useEffect(()=>{
        cartQuantity()  // Update cart item count message on component mount and cartData change
    })
    
    // Function to handle payment process with Stripe
    const makePayment = async ()=>{
        if(!email){
            alert("please enter your email")  // Alert user if email is not provided
            return ; // Exit the function if email is not provided
        }
        else{
            const stripe = await loadStripe(

                "" // your loadstripe
            );
            // the body which will be send to the  server
            const body ={
                products: cartData, // The cart data to be sent to the server
                email: email  // The user's email address
            };
            const headers = {
                "Content-Type": "application/json", // Indicates the type of data being sent in json
            };
            const response = await fetch(
                // create will sen a post request to the server to create a checkout session
                // and will  use the data to create a session with strip and will return a session id  
                        "http://localhost:7000/api/create-checkout-session",{
                            method: "POST",
                            headers,
                            body: JSON.stringify(body),
                        }
            );
            const session = await response.json(); // Parse the server's response as JSON   server id will be parsed into js object
            const result = stripe.redirectToCheckout({  // with the help of the session id it will redirect to the user to the stripe checkout
                sessionId :session.id,  // The ID of the Stripe Checkout session
            })
            console.log(result); // will log the result 
            if(result.error)
            {
                console.log(result.error);  // Log errors if redirecting to checkout fails
                
            }
        }
        setEmail("") // after completion clear the mail 
        dispatch(clearCart())  // and clear the cart from the store
    }

  return (
    <>
        <div className="cart-page">
            <h1 className="cart-title">Shopping Cart</h1>
            {/* items in the cart  */}
            <h3 className="cart-subtitle">{cartItems}</h3>
            {/* mapping the cards  */}
            {cartData.map((key) => {
                // sum will be multiply of quantity and the price 
                Sum += key.quantity * key.price;
                return (
                    <div className="cart-item" key={key.id}>
                        <div className="cart-item-img">
                            {/* will display the image  */}
                            <img src={key.image} alt={key.title} className="cart-item-image" />
                        </div>
                        <div className="cart-item-details">
                            <div className="cart-item-quantity">
                                {/* when click on this it will decrease the quantity of the particular product */}
                                <button
                                    onClick={() => dispatch(qtyDecrease({ id: key.id }))}
                                    className="cart-quantity-handler"
                                >
                                    -
                                </button>
                                {/* will display the quantity */}
                                <span className="cart-quantity">{key.quantity}</span>

                                {/* when click on this it will increase the quantity of the particular product */}
                                <button
                                    onClick={() => dispatch(qtyIncrease({ id: key.id }))}
                                    className="cart-quantity-handler"
                                >
                                    +
                                </button>
                            </div>
                            {/* will display the title */}
                            <p className="cart-item-title">{key.title}</p>
                            <div className="cart-item-actions">
                                {/* when click on this it will remove the product from the cart  */}
                                <button
                                    onClick={() => dispatch(removeCart({ id: key.id }))}
                                    className="cart-remove-button"
                                >
                                    <i className="ri-delete-bin-5-line cart-remove-icon"></i>
                                    <span className="cart-remove-text">Remove Item</span>
                                </button>
                                {/* will display the final  price of the product by quantity and price */}
                                <h2 className="cart-item-price">${key.quantity * key.price}</h2>
                            </div>
                        </div>
                    </div>
                );
            })}
            <div className="cart-summary">

                <h6 className="cart-summary-title">Checkout</h6>
                <div className="cart-summary-details">
                {/* mapping of the cartdata   */}
                    {cartData.map((item) => (
                        <div className="cart-summary-item" key={item.id}>
                            {/* will display the total quantity  */}
                            <p className="cart-summary-quantity">{item.quantity}</p>
                            {/* will display the total price  */}
                            <p className="cart-summary-price">${item.price}</p>
                        </div>
                    ))}
                </div>
                <hr className="cart-summary-divider" />
                <div className="cart-summary-total">
                    {/*  display the toal price  */}
                    <h3>Total Price</h3>
                    {/*  display the sum of the  total product by the quantity and the price */}
                    <h3>${Sum}</h3>
                </div>
                <div className="cart-summary-email">
                    {/* let user give email */}
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter email"
                        className="cart-email-input"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                {/*  on click the button will active the make payment function  */}
                <button className="cart-checkout-button" onClick={makePayment}>
                    <Link to="/checkout" className="cart-checkout-link">Go to Checkout</Link>
                </button>
            </div>
        </div>
    </>
  )
}

export default CartPage
