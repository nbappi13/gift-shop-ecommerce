import { useState, useEffect } from "react"
import Hero from "../components/home/Hero"
import ProductList from "../components/home/ProductList"
import type { Product } from "../types"
import { getTopSellingProducts, getLatestProducts } from "../services/api"

type HomeProps = {
  // for future use if needed
}

const Home = (_: HomeProps) => {
  // state to store products from database
  const [topSellingProducts, setTopSellingProducts] = useState<Product[]>([])
  const [latestProducts, setLatestProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // load products from database when page loads
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true)

        // get data from backend api
        const [topSelling, latest] = await Promise.all([getTopSellingProducts(), getLatestProducts()])

        // update state with data from database
        setTopSellingProducts(topSelling)
        setLatestProducts(latest)
      } catch (error) {
        console.error("error loading products:", error)
        setError("failed to load products. please try again.")
      } finally {
        setLoading(false)
      }
    }

    loadProducts()
  }, [])

  // handle add to cart (have to implement cart context later)
  const handleAddToCart = (product: Product) => {
    console.log("added to cart:", product.name)
    // TODO: implement cart functionality
  }

  // show loading message while getting data
  if (loading) {
    return (
      <div>
        <Hero />
        <div className="text-center py-16">
          <div className="loading loading-spinner loading-lg"></div>
          <p className="mt-4 text-gray-600">Loading products...</p>
        </div>
      </div>
    )
  }

  // show error message if something went wrong
  if (error) {
    return (
      <div>
        <Hero />
        <div className="text-center py-16">
          <p className="text-red-500">{error}</p>
          <button onClick={() => window.location.reload()} className="btn btn-primary mt-4">
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div>
      <Hero />

      {/* top selling products from database */}
      <ProductList products={topSellingProducts} title="🔥 Top Selling Products" onAddToCart={handleAddToCart} />

      {/* latest arrivals from database */}
      <ProductList products={latestProducts} title="✨ Latest Arrivals" onAddToCart={handleAddToCart} />
    </div>
  )
}

export default Home
