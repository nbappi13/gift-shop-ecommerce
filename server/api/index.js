const express = require("express")
const cors = require("cors")
const { MongoClient } = require("mongodb")
require("dotenv").config()

const app = express()

app.use(
  cors({
    origin: ["http://localhost:3000", "https://gift-shop-now.netlify.app/"],
    credentials: true,
  })
)

app.use(express.json())

let db
const client = new MongoClient(process.env.MONGODB_URI)

async function connectDB() {
  try {
    if (!db) {
      await client.connect()
      db = client.db("eco_products")
      console.log("Connected to MongoDB Atlas")
    }
  } catch (error) {
    console.error("MongoDB connection error:", error)
  }
}

// Connect to DB immediately when cold-started
connectDB()

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
    res.status(500).json({ error: "failed to get products" })
  }
})


// get top selling products
app.get("/api/products/top-selling", async (req, res) => {
  try {
    const products = await db.collection("products").find({ isTopSelling: true }).toArray()
    res.json(products)
  } catch (error) {
    res.status(500).json({ error: "failed to get top selling products" })
  }
})


// get latest arrivals
app.get("/api/products/latest", async (req, res) => {
  try {
    const products = await db.collection("products").find({ isLatestArrival: true }).toArray()
    res.json(products)
  } catch (error) {
    res.status(500).json({ error: "failed to get latest products" })
  }
})

// get single product by ID
app.get("/api/products/:id", async (req, res) => {
  try {
    const productId = req.params.id
    const product = await db.collection("products").findOne({ id: productId })

    if (!product) return res.status(404).json({ error: "product not found" })
    res.json(product)
  } catch (error) {
    res.status(500).json({ error: "failed to get product" })
  }
})

// Export the handler for Vercel
module.exports = app
