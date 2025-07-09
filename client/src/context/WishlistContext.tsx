
import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import type { Product } from "../types"

type WishlistContextType = {
  wishlistItems: Product[]
  addToWishlist: (product: Product) => void
  removeFromWishlist: (productId: string) => void
  isInWishlist: (productId: string) => boolean
  moveToCart: (productId: string) => void
}

// create wishlist context
const WishlistContext = createContext<WishlistContextType | undefined>(undefined)

type WishlistProviderProps = {
  children: React.ReactNode
}

// wishlist provider Component
export const WishlistProvider = ({ children }: WishlistProviderProps) => {
  // state to store wishlist items
  const [wishlistItems, setWishlistItems] = useState<Product[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  // load wishlist from localStorage when component mounts
  useEffect(() => {
    try {
      const savedWishlist = localStorage.getItem("giftshop-wishlist")
      if (savedWishlist) {
        const parsedWishlist = JSON.parse(savedWishlist)
        setWishlistItems(parsedWishlist)
      }
    } catch (error) {
      console.error("error loading wishlist from localStorage:", error)
    } finally {
      setIsLoaded(true)
    }
  }, [])

  // Save wishlist to localStorage whenever wishlist changes (but only after initial load)
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem("giftshop-wishlist", JSON.stringify(wishlistItems))
      } catch (error) {
        console.error("error saving wishlist to localStorage:", error)
      }
    }
  }, [wishlistItems, isLoaded])

  // add product to wishlist
  const addToWishlist = (product: Product) => {
    setWishlistItems((prevItems) => {
      // check if product already exists in wishlist
      const exists = prevItems.find((item) => item.id === product.id)
      if (!exists) {
        return [...prevItems, product]
      }
      return prevItems
    })
  }

  // remove product from wishlist
  const removeFromWishlist = (productId: string) => {
    setWishlistItems((prevItems) => prevItems.filter((item) => item.id !== productId))
  }

  // check if product is in wishlist
  const isInWishlist = (productId: string) => {
    return wishlistItems.some((item) => item.id === productId)
  }

  // move item from wishlist to cart (will be implemented with cart context)
  const moveToCart = (productId: string) => {
    // This will be implemented when we integrate with cart
    console.log("move to cart:", productId)
  }

  // context value
  const value: WishlistContextType = {
    wishlistItems,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    moveToCart,
  }

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>
}

// custom hook to use wishlist context
export const useWishlist = () => {
  const context = useContext(WishlistContext)
  if (context === undefined) {
    throw new Error("useWishlist must be used within a WishlistProvider")
  }
  return context
}
