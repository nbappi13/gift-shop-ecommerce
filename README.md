# 🎁 GiftShop - E-Commerce Web Application


A modern, responsive e-commerce web application built with React and Node.js for selling gift items like mugs, candles, notebooks, and more.

## 📋 Brief Description

GiftShop is a full-stack e-commerce single-page application (SPA) that allows users to browse products, add items to cart and wishlist, and complete purchases. The application features a clean, modern design with responsive layouts that work seamlessly across all devices.

### ✨ Key Features

-  **Product Browsing**: View all products, top-selling items, and latest arrivals
-  **Shopping Cart**: Add/remove items, adjust quantities, persistent cart storage
-  **Wishlist**: Save favorite items for later purchase
-  **Responsive Design**: Optimized for desktop, tablet, and mobile devices
-  **Product Details**: Detailed product pages with images and descriptions
-  **Checkout Process**: Simple checkout form with order simulation
-  **Modern UI**: Clean design using Tailwind CSS and DaisyUI components
-  **Real-time Updates**: Dynamic cart and wishlist counters

## 🚀 Live Demo

- **Frontend**: [Deployed on Netlify](https://gift-shop-now.netlify.app/) 
- **Backend**: [Deployed on Vercel](https://server-beryl-eta.vercel.app/) 


## GitHub Repository Link: https://github.com/nbappi13/gift-shop-ecommerce

## 🛠️ Tech Stack

### Frontend
- **React 18** - JavaScript library 
- **TypeScript** - Static type checking
- **React Router v6.30.1** - Client-side routing
- **Tailwind CSS v3.4.17** - Utility-first CSS framework
- **DaisyUI v4.12.24** - Tailwind CSS components
- **SweetAlert2** - Beautiful alert dialogs
- **React Context API** - State management for cart and wishlist

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **MongoDB Atlas** - Cloud database service
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management



## 📦 Installation & Local Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB Atlas account (or local MongoDB)
- Git

### 1. Clone the Repository
\`\`\`bash
git clone https://github.com/nbappi13/gift-shop-ecommerce.git
cd gift-shop-ecommerce
cd client
\`\`\`

### 2. Backend Setup
\`\`\`bash
# Navigate to backend directory
cd gift-shop-ecommerce
cd server

# Install dependencies
npm install

# Create .env file
touch .env
\`\`\`

Add the following environment variables to `.env`:
\`\`\`env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
\`\`\`

\`\`\`bash
# Start the backend server
npm run dev

\`\`\`

The backend server will run on `http://localhost:5000`

### 3. Frontend Setup
\`\`\`bash
# Navigate to frontend directory (in a new terminal)
cd client

# Install dependencies
npm install

# Start the development server
npm start
\`\`\`

The frontend application will run on `http://localhost:3000`

### 4. Database Setup
1. Create a MongoDB Atlas account at [mongodb.com](https://www.mongodb.com/atlas)
2. Create a new cluster and database named `eco_products`
3. Create a collection named `products`
4. Import sample product data (18 products with gift items)
5. Update the `MONGODB_URI` in your `.env` file



## 🚀 Deployment

### Frontend (Netlify)


### Backend (Vercel)




