import { Link } from "react-router-dom";
import { useSelector } from "react-redux"; // Import useSelector to access Redux state
import '../Csss/Navbar.css'
const Navbar = () => {

   // Access the length of the cart array from the Redux store
  const cartData = useSelector((state) => state.cartSlice.cart.length);
  return (
    <div>
    <div className="navbar">
        <Link to="/products">Magnet brains</Link>
        <Link to="/cart" className="cart-link" data-cart-count={cartData}>
            Cart
        </Link>
    </div>

    </div>
  )
}

export default Navbar
