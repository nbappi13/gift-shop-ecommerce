
const express = require("express")
const cors = require("cors")
const { MongoClient } = require("mongodb")
require("dotenv").config()

// create Express app
const app = express()
const PORT = process.env.PORT || 5000

// Middleware 
app.use(
  cors({
    origin: [
      "http://localhost:3000", // local development
      // have to put netlify live link
    ],
    credentials: true,
  }),
)
app.use(express.json())

// mongodb connection
let db
const client = new MongoClient(process.env.MONGODB_URI)

// connect to mongodb when server starts
async function connectDB() {
  try {
    await client.connect()
    db = client.db("eco_products") // database name
    console.log(" connected to mongodb atlas")
  } catch (error) {
    console.error(" mongodb connection error:", error)
  }
}

// root route - shows server is running
app.get("/", (req, res) => {
  res.json({
    message: " GiftShop API server is running!",
    status: "success",
    endpoints: {
      "All Products": "/api/products",
      "Top Selling": "/api/products/top-selling",
      "Latest Arrivals": "/api/products/latest",
      "Single Product": "/api/products/:id",
    },
  })
})

// get all products
app.get("/api/products", async (req, res) => {
  try {
    const products = await db.collection("products").find({}).toArray()
    res.json(products)
  } catch (error) {
    console.error("error getting products:", error)
    res.status(500).json({ error: "failed to get products" })
  }
})

// get top selling products
app.get("/api/products/top-selling", async (req, res) => {
  try {
    const products = await db.collection("products").find({ isTopSelling: true }).toArray()
    res.json(products)
  } catch (error) {
    console.error("error getting top selling products:", error)
    res.status(500).json({ error: "failed to get top selling products" })
  }
})

// get latest arrivals
app.get("/api/products/latest", async (req, res) => {
  try {
    const products = await db.collection("products").find({ isLatestArrival: true }).toArray()
    res.json(products)
  } catch (error) {
    console.error("error getting latest products:", error)
    res.status(500).json({ error: "failed to get latest products" })
  }
})

// get single product by ID
app.get("/api/products/:id", async (req, res) => {
  try {
    const productId = req.params.id
    const product = await db.collection("products").findOne({ id: productId })

    if (!product) {
      return res.status(404).json({ error: "product not found" })
    }

    res.json(product)
  } catch (error) {
    console.error("error getting product:", error)
    res.status(500).json({ error: "failed to get product" })
  }
})

// start server
app.listen(PORT, () => {
  console.log(` server running on port ${PORT}`)
  connectDB() // connect to database when server starts
})

// export for vercel
module.exports = app
