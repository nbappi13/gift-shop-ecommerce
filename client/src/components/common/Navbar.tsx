import { useState, useRef, useEffect } from "react"
import { Link } from "react-router-dom"
import { useCart } from "../../context/CartContext"
import CartSidebar from "../cart/CartSidebar"
import WishlistDropdown from "../wishlist/WishlistDropdown"

type NavbarProps = {
  // add props later if needed
}

const Navbar = (_: NavbarProps) => {
  const { getTotalItems } = useCart()
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  // toggle cart sidebar
  const toggleCart = () => {
    setIsCartOpen(!isCartOpen)
  }

  // toggle mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <>
      {/* added sticky  */}
      <nav className="navbar sticky top-0 z-50 transition-all bg-base-100 shadow-lg px-4">
        {/* logo/Brand with spacing fix */}
        <div className="navbar-start">
          <div className="dropdown" ref={menuRef}>
            <div 
              tabIndex={0} 
              role="button" 
              className="btn btn-ghost lg:hidden"
              onClick={toggleMenu}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16"></path>
              </svg>
            </div>
            <ul
              className={`menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 ${isMenuOpen ? 'block' : 'hidden'}`}
            >
              <li>
                <Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
              </li>
              <li>
                <Link to="/products" onClick={() => setIsMenuOpen(false)}>Products</Link>
              </li>
              <li>
                <Link to="/about" onClick={() => setIsMenuOpen(false)}>About</Link>
              </li>
              <li>
                <Link to="/contact" onClick={() => setIsMenuOpen(false)}>Contact</Link>
              </li>
            </ul>
          </div>
          <Link to="/" className="btn btn-ghost text-xl font-bold text-primary mr-2 sm:mr-0">
            🎁 GiftShop
          </Link>
        </div>

        {/* desktop Menu */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link to="/" className="btn btn-ghost">
                Home
              </Link>
            </li>
            <li>
              <Link to="/products" className="btn btn-ghost">
                Products
              </Link>
            </li>
            <li>
              <Link to="/about" className="btn btn-ghost">
                About
              </Link>
            </li>
            <li>
              <Link to="/contact" className="btn btn-ghost">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* right side icons with spacing fix */}
        <div className="navbar-end">
          <div className="flex items-center gap-1 sm:gap-2">
            {/* wishlist Dropdown */}
            <WishlistDropdown />

            {/* cart button */}
            <button onClick={toggleCart} className="btn btn-ghost btn-circle">
              <div className="indicator">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.293 2.293A1 1 0 005 16h12M7 13v4a2 2 0 002 2h6a2 2 0 002-2v-4m-8 0V9a2 2 0 012-2h4a2 2 0 012 2v4.01"
                  ></path>
                </svg>
                {getTotalItems() > 0 && (
                  <span className="badge badge-sm badge-primary indicator-item">{getTotalItems()}</span>
                )}
              </div>
            </button>

            {/* user profile button */}
            <button className="btn btn-ghost btn-circle">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* cart sidebar */}
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  )
}

export default Navbar