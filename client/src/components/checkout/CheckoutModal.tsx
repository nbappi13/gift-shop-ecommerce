import type React from "react"

import { useState } from "react"
import Swal from "sweetalert2"
import { useCart } from "../../context/CartContext"

type CheckoutModalProps = {
  isOpen: boolean
  onClose: () => void
}

type CheckoutFormData = {
  name: string
  email: string
  address: string
}

const CheckoutModal = ({ isOpen, onClose }: CheckoutModalProps) => {
  const { cartItems, getTotalPrice, clearCart } = useCart()
  const [formData, setFormData] = useState<CheckoutFormData>({
    name: "",
    email: "",
    address: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  // handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    try {
      // simulate random success/failure (90% success rate)
      const isSuccess = Math.random() > 0.1

      if (isSuccess) {
        // success - clear cart and show success alert
        clearCart()
        onClose()

        await Swal.fire({
          icon: "success",
          title: "Order Placed Successfully!",
          text: `Thank you ${formData.name}! Your order has been placed successfully.`,
          confirmButtonText: "Continue Shopping",
          confirmButtonColor: "#10b981",
        })

        // reset form
        setFormData({ name: "", email: "", address: "" })
      } else {
        // failure - show error alert
        await Swal.fire({
          icon: "error",
          title: "Order Failed!",
          text: "Something went wrong while placing your order. Please try again.",
          confirmButtonText: "Try Again",
          confirmButtonColor: "#ef4444",
        })
      }
    } catch (error) {
      console.error("checkout error:", error)
      await Swal.fire({
        icon: "error",
        title: "Order Failed!",
        text: "Something went wrong while placing your order. Please try again.",
        confirmButtonText: "Try Again",
        confirmButtonColor: "#ef4444",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // don't render if not open
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-bold">Checkout</h2>
          <button onClick={onClose} className="btn btn-ghost btn-sm btn-circle">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        {/* Order Summary */}
        <div className="p-6 border-b">
          <h3 className="font-semibold mb-3">Order Summary</h3>
          <div className="space-y-2 max-h-32 overflow-y-auto">
            {cartItems.map((item) => (
              <div key={item.product.id} className="flex justify-between text-sm">
                <span>
                  {item.product.name} x {item.quantity}
                </span>
                <span>${(item.product.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-between font-bold text-lg mt-3 pt-3 border-t">
            <span>Total:</span>
            <span className="text-primary">${getTotalPrice().toFixed(2)}</span>
          </div>
        </div>

        {/* checkout form */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-4">
            {/* name field */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">
                Full Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="input input-bordered w-full"
                placeholder="Enter your full name"
              />
            </div>

            {/* email field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="input input-bordered w-full"
                placeholder="Enter your email address"
              />
            </div>

            {/* address field */}
            <div>
              <label htmlFor="address" className="block text-sm font-medium mb-1">
                Delivery Address *
              </label>
              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                required
                rows={3}
                className="textarea textarea-bordered w-full"
                placeholder="Enter your delivery address"
              />
            </div>
          </div>

          {/* submit button */}
          <div className="flex gap-3 mt-6">
            <button type="button" onClick={onClose} className="btn btn-outline flex-1">
              Cancel
            </button>
            <button type="submit" disabled={isSubmitting} className="btn btn-primary flex-1">
              {isSubmitting ? (
                <>
                  <span className="loading loading-spinner loading-sm"></span>
                  Processing...
                </>
              ) : (
                "Place Order"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CheckoutModal
