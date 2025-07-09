"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"
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

  // load cart from localStorage when app starts
  useEffect(() => {
    const savedCart = localStorage.getItem("giftshop-cart")
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart))
      } catch (error) {
        console.error("error loading cart from localStorage:", error)
      }
    }
  }, [])

  // save cart to localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem("giftshop-cart", JSON.stringify(cartItems))
  }, [cartItems])

  // add product to cart
  const addToCart = (product: Product) => {
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
    throw new Error("useCart must be used within a cart provider")
  }
  return context
}
