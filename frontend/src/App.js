import { Routes,Route,BrowserRouter } from "react-router-dom"
import Layout from "./Layout"
import Products from "./pages/Products"
import CartPage from "./pages/CartPage"
import Success from "./components/Success"
import Cancel from "./components/Cancel"
const App = () => {
  return (
    <div>
        <BrowserRouter>
          <Routes>
            {/* route for layout */}
            <Route path="/" element={<Layout/>}> 

             {/* route for products  */}
            <Route index element={<Products/>} />
             {/* route for products  */}
            <Route path="/products" element={<Products/>} />

             {/* route for cart page */}
            <Route path="/cart" element={<CartPage/>}  />
            
            {/* route for success */}
            <Route path="/success" element={<Success/>} />

            {/* route for canceled  */}
            <Route path="/cancel" element={<Cancel/>} />

            </Route>
          </Routes>
        </BrowserRouter>
    </div>
  )
}

export default App
