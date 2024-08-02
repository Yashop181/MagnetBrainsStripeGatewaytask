import { useDispatch } from "react-redux"
import {addtocart} from "../redux/slices/cartSlice";
import axios from "axios";
import { useState,useEffect } from "react";
import '../Csss/Products.css'
import { toast } from "react-toastify";

const Products = () => {
    const dispatch = useDispatch(); // Initialize the dispatch function from Redux
    const [products , setProducts] = useState([]);  // State to store products fetched from API
    useEffect(()=>{
        // Function to fetch products from the API
        const fetchProducts = async ()=>{
            try {
                // Send GET request to the API to fetch products
                const res = await axios.get('https://fakestoreapi.com/products');

                // Update products state  with fetched products
                setProducts(res.data);
            } catch (error) {
                console.error(error);
                toast.error('failed') // Display error message
            }
        }
        fetchProducts(); // Call the function to fetch products
    },[]); // Empty dependency array  runs only once after the initial render

     // Function to handle adding a product to the cart when clicked on the add to cart button 
    const addtoCart = async(product) =>{
        await dispatch(
            addtocart({
                id: product.id,
                title: product.title,
                image: product.image,
                price: product.price,
                quantity: 1,
            })
        )
    };
  return (
    <div className="cart-container1">
    <h1 className="cart-title1">My Products</h1>
    <div className="cart-products">
        {/* mapping of the products  */}
        {products.map((product) => (
            <div key={product.id} className="product-container1">
                
                {/* displays the  image */}
                <img src={product.image} alt={product.title} className="product-image1" /> 
                <div className="product-info1">
                    {/* displays the title*/}
                    <p className="flpclam">{product.title}</p>

                    {/* displays the price */}
                    <p>${product.price}</p>
                </div>
                {/* on clicking the  add to cart button  it will dispatch the action and add the product in the array with its details like image description and price  */}
                <button onClick={() => addtoCart(product)} className="add-to-cart-button">
                    Add to Cart
                </button>
            </div>
        ))}
    </div>
</div>
  )
}

export default Products
