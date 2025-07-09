import { Link } from "react-router-dom"

type FooterProps = {
  // for future use if needed
}

const Footer = (_: FooterProps) => {
  return (
    <footer className="bg-indigo-600  py-8">
      <div className="container mx-auto px-4 text-center">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* logo */}
          <div className="text-xl font-bold text-white">🎁 GiftShop</div>

          {/* links */}
          <div className="flex gap-6 text-sm ">
            <Link to="/" className="hover:text-orange-400 text-white">
              Home
            </Link>
            <Link to="/products" className="hover:text-orange-400 text-white">
              Products
            </Link>
            <Link to="/about" className="hover:text-orange-400 text-white">
              About
            </Link>
            <Link to="/contact" className="hover:text-orange-400 text-white">
              Contact
            </Link>
          </div>
        </div>

        {/* copyright */}
        <div className="mt-4 pt-4 border-t border-base-content/40">
          <p className="text-sm text-slate-300">© 2024 GiftShop. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
