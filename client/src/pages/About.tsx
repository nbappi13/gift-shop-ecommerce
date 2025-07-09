
type AboutProps = {
  // for future use if needed
}

const About = (_: AboutProps) => {
  return (
    <div className="min-h-screen bg-base-100">
      {/* Page Header */}
      <div className="bg-base-200 py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">About Us</h1>
          <p className="text-gray-600">Learn more about our gift shop</p>
          <div className="w-24 h-1 bg-primary mx-auto mt-4 rounded"></div>
        </div>
      </div>

      {/* About Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-6">🎁 Welcome to GiftShop</h2>
              <p className="text-gray-600 mb-4">
                We are passionate about helping you find the perfect gifts for your loved ones. Our carefully curated
                collection features unique and thoughtful items that bring joy and happiness.
              </p>
              <p className="text-gray-600 mb-4">
                From beautiful mugs and candle sets to practical notebooks and water bottles, we have something special
                for everyone on your list.
              </p>
              <p className="text-gray-600">
                Quality, affordability, and customer satisfaction are at the heart of everything we do.
              </p>
            </div>

            {/* Image */}
            <div className="flex justify-center">
              <img
                src="https://i.imgur.com/VQNeYm8.jpeg"
                alt="About us"
                className="rounded-lg shadow-lg w-full max-w-md"
              />
            </div>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="text-center">
              <div className="text-4xl mb-4">🚚</div>
              <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
              <p className="text-gray-600">Quick and reliable shipping to your doorstep</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">💝</div>
              <h3 className="text-xl font-semibold mb-2">Quality Products</h3>
              <p className="text-gray-600">Carefully selected items for the best experience</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="text-xl font-semibold mb-2">Great Support</h3>
              <p className="text-gray-600">Friendly customer service team ready to help</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
