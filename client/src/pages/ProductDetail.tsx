"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import type { Product } from "../types"
import { getProductById } from "../services/api"

type ProductDetailProps = {
  // for future use if needed
}

const ProductDetail = (_: ProductDetailProps) => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  // state for product data
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // load product data when page loads
  useEffect(() => {
    const loadProduct = async () => {
      if (!id) {
        setError("Product ID not found")
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        // get product from database
        const productData = await getProductById(id)
        setProduct(productData)
      } catch (error) {
        console.error("error loading product:", error)
        setError("failed to load product. please try again.")
      } finally {
        setLoading(false)
      }
    }

    loadProduct()
  }, [id])

  // handle add to cart (have to implement cart context later)
  const handleAddToCart = () => {
    if (product) {
      console.log("added to cart:", product.name)
      // TODO: have to implement cart functionality
    }
  }

  // handle add to wishlist (have to implement wishlist later)
  const handleAddToWishlist = () => {
    if (product) {
      console.log("added to wishlist:", product.name)
      // TODO:  have to implement wishlist functionality
    }
  }

  // go back to home page
  const handleGoBack = () => {
    navigate("/")
  }

  // simple star rating component
  const StarRating = ({ rating }: { rating: number }) => {
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            className={`w-5 h-5 ${star <= rating ? "text-yellow-400" : "text-gray-300"} fill-current`}
            viewBox="0 0 20 20"
          >
            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
          </svg>
        ))}
      </div>
    )
  }

  // show loading message while getting data
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="loading loading-spinner loading-lg"></div>
          <p className="mt-4 text-gray-600">Loading product details...</p>
        </div>
      </div>
    )
  }

  // show error message if something went wrong
  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error || "Product not found"}</p>
          <button onClick={handleGoBack} className="btn btn-primary">
            Go Back Home
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* back Button */}
      <div className="mb-6">
        <button onClick={handleGoBack} className="btn btn-ghost">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
          </svg>
          Back to Products
        </button>
      </div>

      {/* product detail content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* product image */}
        <div className="flex justify-center">
          <img
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            className="w-full max-w-md rounded-lg shadow-lg"
          />
        </div>

        {/* product information */}
        <div className="space-y-6">
          {/* product title */}
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">{product.name}</h1>
            <div className="flex gap-2">
              {product.isTopSelling && <div className="badge badge-secondary">Top Selling</div>}
              {product.isLatestArrival && <div className="badge badge-accent">New Arrival</div>}
            </div>
          </div>

          {/* rating and reviews */}
          <div className="flex items-center gap-4">
            <StarRating rating={product.rating} />
            <span className="text-lg text-gray-600">
              {product.rating} ({product.reviews} reviews)
            </span>
          </div>

          {/* price */}
          <div className="flex items-center gap-4">
            <span className="text-4xl font-bold text-primary">${product.price}</span>
            <div className={`badge ${product.inStock ? "badge-success" : "badge-error"}`}>
              {product.inStock ? "In Stock" : "Out of Stock"}
            </div>
          </div>

          {/* category */}
          <div>
            <span className="text-gray-600">Category: </span>
            <span className="font-medium capitalize">{product.category}</span>
          </div>

          {/* description */}
          <div>
            <h3 className="text-xl font-semibold mb-3">Description</h3>
            <p className="text-gray-700 leading-relaxed">{product.description}</p>
          </div>

          {/* action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className={`btn flex-1 ${product.inStock ? "btn-primary" : "btn-disabled cursor-not-allowed"}`}
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.293 2.293A1 1 0 005 16h12M7 13v4a2 2 0 002 2h6a2 2 0 002-2v-4m-8 0V9a2 2 0 012-2h4a2 2 0 012 2v4.01"
                ></path>
              </svg>
              {product.inStock ? "Add to Cart" : "Out of Stock"}
            </button>

            <button onClick={handleAddToWishlist} className="btn btn-outline flex-1">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                ></path>
              </svg>
              Add to Wishlist
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
