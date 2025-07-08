export type Product = {
  id: string
  name: string
  price: number
  image: string
  description: string
  category: string
  inStock: boolean
  rating: number
  reviews: number
  isTopSelling: boolean
  isLatestArrival: boolean
}

export type CartItem = {
  product: Product
  quantity: number
}

export type CartContextType = {
  cartItems: CartItem[]
  addToCart: (product: Product) => void
  removeFromCart: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  getTotalPrice: () => number
  getTotalItems: () => number
}
