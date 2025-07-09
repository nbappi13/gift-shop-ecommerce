import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { CartProvider } from "./context/CartContext"
import Layout from "./components/layout/Layout"
import Home from "./pages/Home"
import ProductDetail from "./pages/ProductDetail"

type AppProps = {
  // have to add props later if needed
}

const App = (_: AppProps) => {
  return (
    <CartProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            {/*have to add more routes here later */}
          </Routes>
        </Layout>
      </Router>
    </CartProvider>
  )
}

export default App
