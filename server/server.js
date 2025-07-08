// Import required packages
const express = require("express")
const cors = require("cors")
const { MongoClient } = require("mongodb")
require("dotenv").config()

// Create Express app
const app = express()
const PORT = process.env.PORT || 5000

// Middleware - allows frontend to talk to backend
app.use(cors())
app.use(express.json())

// MongoDB connection
let db
const client = new MongoClient(process.env.MONGODB_URI)

// Connect to MongoDB when server starts
async function connectDB() {
  try {
    await client.connect()
    db = client.db("eco_products") // Our database name
    console.log(" Connected to MongoDB Atlas")
  } catch (error) {
    console.error(" MongoDB connection error:", error)
  }
}

// API Routes

// Get all products
app.get("/api/products", async (req, res) => {
  try {
    // Get all products from database
    const products = await db.collection("products").find({}).toArray()
    res.json(products)
  } catch (error) {
    console.error("Error getting products:", error)
    res.status(500).json({ error: "Failed to get products" })
  }
})

// Get top selling products
app.get("/api/products/top-selling", async (req, res) => {
  try {
    // Find products where isTopSelling is true
    const products = await db.collection("products").find({ isTopSelling: true }).toArray()
    res.json(products)
  } catch (error) {
    console.error("Error getting top selling products:", error)
    res.status(500).json({ error: "Failed to get top selling products" })
  }
})

// Get latest arrivals
app.get("/api/products/latest", async (req, res) => {
  try {
    // Find products where isLatestArrival is true
    const products = await db.collection("products").find({ isLatestArrival: true }).toArray()
    res.json(products)
  } catch (error) {
    console.error("Error getting latest products:", error)
    res.status(500).json({ error: "Failed to get latest products" })
  }
})

// Get single product by ID
app.get("/api/products/:id", async (req, res) => {
  try {
    const productId = req.params.id
    // Find one product by ID
    const product = await db.collection("products").findOne({ id: productId })

    if (!product) {
      return res.status(404).json({ error: "Product not found" })
    }

    res.json(product)
  } catch (error) {
    console.error("Error getting product:", error)
    res.status(500).json({ error: "Failed to get product" })
  }
})

// Start server
app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`)
  connectDB() // Connect to database when server starts
})
