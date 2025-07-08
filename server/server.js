// import required packages
const express = require("express")
const cors = require("cors")
const { MongoClient } = require("mongodb")
require("dotenv").config()

// create Express app
const app = express()
const PORT = process.env.PORT || 5000

// Middleware 
app.use(cors())
app.use(express.json())

// mongoDB connection
let db
const client = new MongoClient(process.env.MONGODB_URI)

// connect to mongoDB when server starts
async function connectDB() {
  try {
    await client.connect()
    db = client.db("eco_products") // Our database name
    console.log(" Connected to MongoDB Atlas")
  } catch (error) {
    console.error(" MongoDB connection error:", error)
  }
}

// API routes

// get all products
app.get("/api/products", async (req, res) => {
  try {
    // get all products from database
    const products = await db.collection("products").find({}).toArray()
    res.json(products)
  } catch (error) {
    console.error("Error getting products:", error)
    res.status(500).json({ error: "Failed to get products" })
  }
})

// get top selling products
app.get("/api/products/top-selling", async (req, res) => {
  try {
    // find products where isTopSelling is true
    const products = await db.collection("products").find({ isTopSelling: true }).toArray()
    res.json(products)
  } catch (error) {
    console.error("Error getting top selling products:", error)
    res.status(500).json({ error: "Failed to get top selling products" })
  }
})

// get latest arrivals
app.get("/api/products/latest", async (req, res) => {
  try {
    // find products where isLatestArrival is true
    const products = await db.collection("products").find({ isLatestArrival: true }).toArray()
    res.json(products)
  } catch (error) {
    console.error("Error getting latest products:", error)
    res.status(500).json({ error: "Failed to get latest products" })
  }
})

// get single product by ID
app.get("/api/products/:id", async (req, res) => {
  try {
    const productId = req.params.id
    // find one product by ID
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

// start server
app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`)
  connectDB() // connect to database when server starts
})
