"use client"

import { useNavigate } from "react-router-dom"
import { useCart } from "../../context/CartContext"
import type { Product } from "../../types"

type ProductCardProps = {
  product: Product
  onAddToCart?: (product: Product) => void
}

const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  const navigate = useNavigate()
  const { addToCart } = useCart()

  const handleAddToCart = () => {
    addToCart(product)
    if (onAddToCart) {
      onAddToCart(product)
    }
  }

  // navigate to product detail page
  const handleViewDetails = () => {
    navigate(`/product/${product.id}`)
  }

  // simple star rating component
  const StarRating = ({ rating }: { rating: number }) => {
    return (
      <div className="flex items-center">
        {/* create array of 5 stars */}
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            className={`w-4 h-4 ${star <= rating ? "text-yellow-400" : "text-gray-300"} fill-current`}
            viewBox="0 0 20 20"
          >
            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
          </svg>
        ))}
      </div>
    )
  }

  return (
    <div className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow duration-300 w-full max-w-sm">
      {/* product image */}
      <figure className="px-4 pt-4">
        <img
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          className="rounded-xl w-full h-48 object-cover"
        />
      </figure>

      {/* card body */}
      <div className="card-body p-4">
        {/* product name */}
        <h3 className="card-title text-lg font-semibold line-clamp-2 min-h-[3.5rem]">{product.name}</h3>

        {/* rating and reviews */}
        <div className="flex items-center gap-2 mb-2">
          <StarRating rating={product.rating} />
          <span className="text-sm text-gray-500">({product.reviews})</span>
        </div>

        {/* price */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-2xl font-bold text-primary">${product.price}</span>
          {!product.inStock && <span className="text-sm text-red-500 font-medium">Out of Stock</span>}
        </div>

        {/* buttons */}
        <div className="card-actions flex-col gap-2">
          {/* add to cart button */}
          <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className={`btn w-full ${
              product.inStock ? "btn-primary hover:btn-primary-focus" : "btn-disabled cursor-not-allowed"
            }`}
          >
            {product.inStock ? "Add to Cart" : "Out of Stock"}
          </button>

          {/* view details button */}
          <button onClick={handleViewDetails} className="btn btn-outline w-full">
            View Details
          </button>
        </div>

        {/* badges */}
        <div className="flex gap-2 mt-2">
          {product.isTopSelling && <div className="badge badge-secondary badge-sm">Top Selling</div>}
          {product.isLatestArrival && <div className="badge badge-accent badge-sm">New Arrival</div>}
        </div>
      </div>
    </div>
  )
}

export default ProductCard