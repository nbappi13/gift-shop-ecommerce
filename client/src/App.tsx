import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { CartProvider } from "./context/CartContext"
import { WishlistProvider } from "./context/WishlistContext"
import Layout from "./components/layout/Layout"
import Home from "./pages/Home"
import ProductDetail from "./pages/ProductDetail"

type AppProps = {
  //  add props later if needed
}

const App = (_: AppProps) => {
  return (
    <CartProvider>
      <WishlistProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              {/*  add more routes here later */}
            </Routes>
          </Layout>
        </Router>
      </WishlistProvider>
    </CartProvider>
  )
}

export default App
