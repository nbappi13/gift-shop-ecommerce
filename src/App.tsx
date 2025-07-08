import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Layout from "./components/layout/Layout"
import Home from "./pages/Home"


type AppProps = {
  //  for future use if needed to add props
}

const App = (_: AppProps) => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* I'll add more routes here later */}
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
