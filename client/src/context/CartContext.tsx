"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import Swal from "sweetalert2"
import type { Product, CartItem, CartContextType } from "../types"

// create cart context
const CartContext = createContext<CartContextType | undefined>(undefined)

type CartProviderProps = {
  children: React.ReactNode
}

// cart provider component
export const CartProvider = ({ children }: CartProviderProps) => {
  // state to store cart items
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  // load cart from localStorage when component mounts
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("giftshop-cart")
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart)
        setCartItems(parsedCart)
      }
    } catch (error) {
      console.error("error loading cart from localStorage:", error)
    } finally {
      setIsLoaded(true)
    }
  }, [])

  // save cart to localStorage whenever cart changes (but only after initial load)
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem("giftshop-cart", JSON.stringify(cartItems))
      } catch (error) {
        console.error("error saving cart to localStorage:", error)
      }
    }
  }, [cartItems, isLoaded])

  // add product to cart with sweet alert
  const addToCart = async (product: Product) => {
    try {
      // simulate potential failure (5% chance)
      const isSuccess = Math.random() > 0.05

      if (!isSuccess) {
        throw new Error("Failed to add to cart")
      }

      setCartItems((prevItems) => {
        // check if product already exists in cart
        const existingItem = prevItems.find((item) => item.product.id === product.id)

        if (existingItem) {
          // if exists, increase quantity
          return prevItems.map((item) =>
            item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
          )
        } else {
          // if new product, add to cart with quantity 1
          return [...prevItems, { product, quantity: 1 }]
        }
      })

      // show success alert
      await Swal.fire({
        icon: "success",
        title: "Added to Cart!",
        text: `${product.name} has been added to your cart.`,
        timer: 2000,
        showConfirmButton: false,
        toast: true,
        position: "top-end",
      })
    } catch (error) {
      console.error("error adding to cart:", error)

      // show error alert
      await Swal.fire({
        icon: "error",
        title: "Failed to Add!",
        text: "Something went wrong while adding the item to cart. Please try again.",
        confirmButtonText: "Try Again",
        confirmButtonColor: "#ef4444",
      })
    }
  }

  // remove product from cart completely
  const removeFromCart = (productId: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.product.id !== productId))
  }

  // update quantity of specific product
  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      // if quantity is 0 or less, remove item
      removeFromCart(productId)
      return
    }

    setCartItems((prevItems) => prevItems.map((item) => (item.product.id === productId ? { ...item, quantity } : item)))
  }

  // clear all items from cart
  const clearCart = () => {
    setCartItems([])
  }

  // calculate total price of all items in cart
  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0)
  }

  // calculate total number of items in cart
  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0)
  }

  // context value with all cart functions
  const value: CartContextType = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalPrice,
    getTotalItems,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

// custom hook to use cart context
export const useCart = () => {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
