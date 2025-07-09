import type { Product } from "../../types"
import ProductCard from "./ProductCard"

type ProductListProps = {
  products: Product[]
  title?: string
  onAddToCart?: (product: Product) => void
}

const ProductList = ({ products, title, onAddToCart }: ProductListProps) => {
  // show message if no products found
  if (products.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No products found.</p>
      </div>
    )
  }

  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        {/* section Title */}
        {title && (
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">{title}</h2>
            <div className="w-24 h-1 bg-primary mx-auto rounded"></div>
          </div>
        )}

        {/* products grid - responsive grid layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {products.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProductList