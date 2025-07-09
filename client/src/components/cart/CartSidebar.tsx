"use client"

import { useState } from "react"
import { useCart } from "../../context/CartContext"
import CheckoutModal from "../checkout/CheckoutModal"

type CartSidebarProps = {
  isOpen: boolean
  onClose: () => void
}

const CartSidebar = ({ isOpen, onClose }: CartSidebarProps) => {
  const { cartItems, updateQuantity, removeFromCart, getTotalPrice, getTotalItems, clearCart } = useCart()
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false)

  // handle quantity increase
  const handleIncrease = (productId: string, currentQuantity: number) => {
    updateQuantity(productId, currentQuantity + 1)
  }

  // handle quantity decrease
  const handleDecrease = (productId: string, currentQuantity: number) => {
    updateQuantity(productId, currentQuantity - 1)
  }

  // handle remove item
  const handleRemove = (productId: string) => {
    removeFromCart(productId)
  }

  // handle checkout
  const handleCheckout = () => {
    setIsCheckoutModalOpen(true)
  }

  return (
    <>
      {/* backdrop - click to close sidebar */}
      {isOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={onClose}></div>}

      {/* sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* sidebar header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-bold">Shopping Cart ({getTotalItems()})</h2>
          <button onClick={onClose} className="btn btn-ghost btn-sm btn-circle">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        {/* cart content */}
        <div className="flex flex-col h-full pb-4">
          {/* cart items */}
          <div className="flex-1 overflow-y-auto p-4">
            {cartItems.length === 0 ? (
              // empty cart message
              <div className="text-center py-8">
                <svg
                  className="w-16 h-16 mx-auto text-gray-300 mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.293 2.293A1 1 0 005 16h12M7 13v4a2 2 0 002 2h6a2 2 0 002-2v-4m-8 0V9a2 2 0 012-2h4a2 2 0 012 2v4.01"
                  ></path>
                </svg>
                <p className="text-gray-500 mb-4">Your cart is empty</p>
                <button onClick={onClose} className="btn btn-primary">
                  Continue Shopping
                </button>
              </div>
            ) : (
              // cart items list
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.product.id} className="flex items-center gap-3 p-3 border rounded-lg">
                    {/* product image */}
                    <img
                      src={item.product.image || "/placeholder.svg"}
                      alt={item.product.name}
                      className="w-16 h-16 object-cover rounded"
                    />

                    {/* product info */}
                    <div className="flex-1">
                      <h3 className="font-medium text-sm line-clamp-2">{item.product.name}</h3>
                      <p className="text-primary font-bold">${item.product.price}</p>

                      {/* quantity controls */}
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => handleDecrease(item.product.id, item.quantity)}
                          className="btn btn-xs btn-circle btn-outline"
                        >
                          -
                        </button>
                        <span className="w-8 text-center font-medium">{item.quantity}</span>
                        <button
                          onClick={() => handleIncrease(item.product.id, item.quantity)}
                          className="btn btn-xs btn-circle btn-outline"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* remove button */}
                    <button
                      onClick={() => handleRemove(item.product.id)}
                      className="btn btn-ghost btn-sm btn-circle text-red-500 hover:bg-red-50"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        ></path>
                      </svg>
                    </button>
                  </div>
                ))}

                {/* clear cart button */}
                <button onClick={clearCart} className="btn btn-ghost btn-sm w-full text-red-500">
                  Clear All Items
                </button>
              </div>
            )}
          </div>

          {/* cart footer - total and checkout - always show item exist */}
          {cartItems.length > 0 && (
            <div className="border-t p-12 space-y-4 bg-white">
              {/* Total Amount */}
              <div className="flex justify-between items-center text-lg font-bold">
                <span>Total:</span>
                <span className="text-primary">${getTotalPrice().toFixed(2)}</span>
              </div>

              {/* checkout button - main checkout button */}
              <button onClick={handleCheckout} className="btn btn-primary w-full text-white font-semibold">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                  ></path>
                </svg>
                Proceed to Checkout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* checkout modal */}
      <CheckoutModal isOpen={isCheckoutModalOpen} onClose={() => setIsCheckoutModalOpen(false)} />
    </>
  )
}

export default CartSidebar
