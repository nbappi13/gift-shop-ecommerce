import { useState, useRef, useEffect } from "react"
import { useWishlist } from "../../context/WishlistContext"
import { useCart } from "../../context/CartContext"

type WishlistDropdownProps = {
  // no props needed for now
}

const WishlistDropdown = (_: WishlistDropdownProps) => {
  const { wishlistItems, removeFromWishlist } = useWishlist()
  const { addToCart } = useCart()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // toggle dropdown
  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  // move item to cart
  const handleMoveToCart = async (productId: string) => {
    const product = wishlistItems.find((item) => item.id === productId)
    if (product) {
      await addToCart(product)
      removeFromWishlist(productId)
    }
  }

  // remove from wishlist
  const handleRemoveFromWishlist = (productId: string) => {
    removeFromWishlist(productId)
  }

  return (
    <div className="relative" ref={dropdownRef}>
      {/* wishlist button */}
      <button onClick={toggleDropdown} className="btn btn-ghost btn-circle relative">
        <svg
          className={`w-5 h-5 ${wishlistItems.length > 0 ? "text-red-500 fill-current" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
        {wishlistItems.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {wishlistItems.length}
          </span>
        )}
      </button>

      {/* dropdown menu */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          {/* dropdown header */}
          <div className="p-4 border-b">
            <h3 className="font-semibold">Wishlist ({wishlistItems.length})</h3>
          </div>

          {/* dropdown content */}
          <div className="max-h-64 overflow-y-auto">
            {wishlistItems.length === 0 ? (
              // empty wishlist message
              <div className="p-4 text-center text-gray-500">
                <svg
                  className="w-12 h-12 mx-auto mb-2 text-gray-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
                <p>Your wishlist is empty</p>
              </div>
            ) : (
              // wishlist items
              <div className="p-2">
                {wishlistItems.map((product) => (
                  <div key={product.id} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded">
                    {/* product image */}
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-12 h-12 object-cover rounded"
                    />

                    {/* product info */}
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium truncate">{product.name}</h4>
                      <p className="text-sm text-primary font-semibold">${product.price}</p>
                    </div>

                    {/* action buttons */}
                    <div className="flex flex-col gap-1">
                      <button
                        onClick={() => handleMoveToCart(product.id)}
                        disabled={!product.inStock}
                        className={`btn btn-xs ${product.inStock ? "btn-primary" : "btn-disabled"}`}
                      >
                        Move to Cart
                      </button>
                      <button
                        onClick={() => handleRemoveFromWishlist(product.id)}
                        className="btn btn-xs btn-outline btn-error"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default WishlistDropdown
