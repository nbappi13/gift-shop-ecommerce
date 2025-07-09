
import { useState, useEffect } from "react"
import ProductList from "../components/home/ProductList"
import type { Product } from "../types"
import { getAllProducts } from "../services/api"

type ProductsProps = {
  // for future use if needed
}

const Products = (_: ProductsProps) => {
  // state to store all products from database
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // load all products from database when page loads
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true)

        // get all products from backend api
        const allProducts = await getAllProducts()

        // update state with data from database
        setProducts(allProducts)
      } catch (error) {
        console.error("error loading products:", error)
        setError("failed to load products. please try again.")
      } finally {
        setLoading(false)
      }
    }

    loadProducts()
  }, [])

  // show loading message while getting data
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="loading loading-spinner loading-lg"></div>
          <p className="mt-4 text-gray-600">Loading all products...</p>
        </div>
      </div>
    )
  }

  // show error message if something went wrong
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button onClick={() => window.location.reload()} className="btn btn-primary">
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div>
      {/* page header */}
      <div className="bg-base-200 py-8">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">All Products</h1>
          <p className="text-gray-600">Discover our complete collection of gift items</p>
          <div className="w-24 h-1 bg-primary mx-auto mt-4 rounded"></div>
        </div>
      </div>

      {/* all products list */}
      <ProductList products={products} title={`🎁 All Gift Items`} />
    </div>
  )
}

export default Products
