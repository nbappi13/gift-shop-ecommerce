import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Layout from "./components/layout/Layout"
import Home from "./pages/Home"
import ProductDetail from "./pages/ProductDetail"


type AppProps = {
  // add props later if needed.
}

const App = (_: AppProps) => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          {/* i'll add more routes here later */}
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
