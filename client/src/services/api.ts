// API service to talk to our backend
const API_BASE_URL = "http://localhost:5000/api"

// Get all products from database
export const getAllProducts = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/products`)
    if (!response.ok) {
      throw new Error("Failed to get products")
    }
    return await response.json()
  } catch (error) {
    console.error("Error getting products:", error)
    throw error
  }
}

// Get top selling products
export const getTopSellingProducts = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/top-selling`)
    if (!response.ok) {
      throw new Error("Failed to get top selling products")
    }
    return await response.json()
  } catch (error) {
    console.error("Error getting top selling products:", error)
    throw error
  }
}

// Get latest arrivals
export const getLatestProducts = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/latest`)
    if (!response.ok) {
      throw new Error("Failed to get latest products")
    }
    return await response.json()
  } catch (error) {
    console.error("Error getting latest products:", error)
    throw error
  }
}

// Get single product by ID
export const getProductById = async (id: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/${id}`)
    if (!response.ok) {
      throw new Error("Failed to get product")
    }
    return await response.json()
  } catch (error) {
    console.error("Error getting product:", error)
    throw error
  }
}
