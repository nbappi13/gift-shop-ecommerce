"use client"

type WhyShopWithUsProps = {
  // for future use if needed
}

const WhyShopWithUs = (_: WhyShopWithUsProps) => {
  return (
    <section className="py-16 bg-stone-300">
      <div className="container mx-auto px-4">
        {/* section title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Why Shop With Us?</h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded"></div>
        </div>

        {/* features grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="text-4xl mb-4">🚚</div>
            <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
            <p className="text-gray-600">Quick shipping to your doorstep</p>
          </div>

          <div className="text-center">
            <div className="text-4xl mb-4">💝</div>
            <h3 className="text-xl font-semibold mb-2">Quality Gifts</h3>
            <p className="text-gray-600">Carefully selected products</p>
          </div>

          <div className="text-center">
            <div className="text-4xl mb-4">🤝</div>
            <h3 className="text-xl font-semibold mb-2">Great Support</h3>
            <p className="text-gray-600">Friendly customer service</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default WhyShopWithUs
