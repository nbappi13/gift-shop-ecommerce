const express = require("express")
const cors = require("cors")
const { MongoClient } = require("mongodb")
require("dotenv").config()

const app = express()
const PORT = process.env.PORT || 5000

// fixed CORS - removed trailing slashes
app.use(
  cors({
    origin: ["http://localhost:3000", "https://gift-shop-now.netlify.app"],
    credentials: true,
  }),
)

app.use(express.json())

// MongoDB connection variables
let db
let client
let isConnected = false

async function connectDB() {
  if (isConnected && db) {
    console.log("using existing database connection")
    return db
  }

  try {
    console.log("attempting to connect to MongoDB...")
    console.log("mongodb uri exists:", !!process.env.MONGODB_URI)

    if (process.env.MONGODB_URI) {
      console.log("mongodb uri preview:", process.env.MONGODB_URI.substring(0, 50) + "...")
    }

    if (!client) {
      client = new MongoClient(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
    }

    if (!isConnected) {
      await client.connect()
      db = client.db("eco_products")
      isConnected = true
      console.log("successfully connected to mongodb atlas")

      // test the connection by counting documents
      const productCount = await db.collection("products").countDocuments()
      console.log(` found ${productCount} products in database`)
    }

    return db
  } catch (error) {
    console.error(" mongodb connection error:", error.message)
    console.error(" full error:", error)
    isConnected = false
    throw error
  }
}

// root route - shows server is running
app.get("/", (req, res) => {
  console.log(" root route accessed")
  res.json({
    message: " GiftShop API server is running!",
    status: "success",
    timestamp: new Date().toISOString(),
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
  console.log("getting all products...")
  try {
    const database = await connectDB()

    if (!database) {
      throw new Error("Database connection failed")
    }

    const products = await database.collection("products").find({}).toArray()
    console.log(`found ${products.length} products`)

    res.json(products)
  } catch (error) {
    console.error("error getting products:", error)
    res.status(500).json({
      error: "Failed to get products",
      details: error.message,
      timestamp: new Date().toISOString(),
    })
  }
})

// get top selling products
app.get("/api/products/top-selling", async (req, res) => {
  console.log("getting top selling products...")
  try {
    const database = await connectDB()

    if (!database) {
      throw new Error("database connection failed")
    }

    const products = await database.collection("products").find({ isTopSelling: true }).toArray()
    console.log(`found ${products.length} top selling products`)

    res.json(products)
  } catch (error) {
    console.error("error getting top selling products:", error)
    res.status(500).json({
      error: "failed to get top selling products",
      details: error.message,
      timestamp: new Date().toISOString(),
    })
  }
})

// get latest arrivals
app.get("/api/products/latest", async (req, res) => {
  console.log("getting latest products...")
  try {
    const database = await connectDB()

    if (!database) {
      throw new Error("database connection failed")
    }

    const products = await database.collection("products").find({ isLatestArrival: true }).toArray()
    console.log(`found ${products.length} latest products`)

    res.json(products)
  } catch (error) {
    console.error("error getting latest products:", error)
    res.status(500).json({
      error: "failed to get latest products",
      details: error.message,
      timestamp: new Date().toISOString(),
    })
  }
})

// get single product by ID
app.get("/api/products/:id", async (req, res) => {
  console.log(`getting product with ID: ${req.params.id}`)
  try {
    const database = await connectDB()

    if (!database) {
      throw new Error("database connection failed")
    }

    const productId = req.params.id
    const product = await database.collection("products").findOne({ id: productId })

    if (!product) {
      console.log(`product not found: ${productId}`)
      return res.status(404).json({ error: "Product not found" })
    }

    console.log(`found product: ${product.name}`)
    res.json(product)
  } catch (error) {
    console.error("error getting product:", error)
    res.status(500).json({
      error: "Failed to get product",
      details: error.message,
      timestamp: new Date().toISOString(),
    })
  }
})

// for local development - add app.listen()
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, async () => {
    console.log(`Server running on http://localhost:${PORT}`)
    console.log(`Products: http://localhost:${PORT}/api/products`)

    // try to connect to database on startup
    try {
      await connectDB()
      console.log("initial database connection successful!")
    } catch (error) {
      console.error("initial database connection failed:", error.message)
    }
  })
}

// export the handler for vercel
module.exports = app
