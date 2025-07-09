"use client"

import { Link } from "react-router-dom"

type FooterProps = {
  // for future use if needed
}

const Footer = (_: FooterProps) => {
  return (
    <footer className="bg-base-300 py-8">
      <div className="container mx-auto px-4 text-center">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* logo */}
          <div className="text-xl font-bold text-primary">🎁 GiftShop</div>

          {/* links */}
          <div className="flex gap-6 text-sm">
            <Link to="/" className="hover:text-primary">
              Home
            </Link>
            <Link to="/products" className="hover:text-primary">
              Products
            </Link>
            <Link to="/about" className="hover:text-primary">
              About
            </Link>
            <Link to="/contact" className="hover:text-primary">
              Contact
            </Link>
          </div>
        </div>

        {/* copyright */}
        <div className="mt-4 pt-4 border-t border-base-content/10">
          <p className="text-sm text-gray-600">© 2024 GiftShop. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
