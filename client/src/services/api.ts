// API service to talk to backend
const API_BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://server-beryl-eta.vercel.app/api" 
    : "http://localhost:5000/api"

// get all products from database
export const getAllProducts = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/products`)
    if (!response.ok) {
      throw new Error("failed to get products")
    }
    return await response.json()
  } catch (error) {
    console.error("error getting products:", error)
    throw error
  }
}

// get top selling products
export const getTopSellingProducts = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/top-selling`)
    if (!response.ok) {
      throw new Error("failed to get top selling products")
    }
    return await response.json()
  } catch (error) {
    console.error("error getting top selling products:", error)
    throw error
  }
}

// get latest arrivals
export const getLatestProducts = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/latest`)
    if (!response.ok) {
      throw new Error("failed to get latest products")
    }
    return await response.json()
  } catch (error) {
    console.error("error getting latest products:", error)
    throw error
  }
}

// get single product by ID
export const getProductById = async (id: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/${id}`)
    if (!response.ok) {
      throw new Error("failed to get product")
    }
    return await response.json()
  } catch (error) {
    console.error("error getting product:", error)
    throw error
  }
}
