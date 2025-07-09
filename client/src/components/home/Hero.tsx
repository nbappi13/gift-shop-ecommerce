import { useState, useEffect } from "react"


import hero1 from "../../assets/hero1.webp"
import hero2 from "../../assets/hero2.webp"
import hero3 from "../../assets/hero3.webp"

type HeroProps = {
  // for future use if needed
}

const slides = [hero1, hero2, hero3]

const Hero = (_: HeroProps) => {
  const [currentSlide, setCurrentSlide] = useState(0)

  // auto slide functionality
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 3000) // change slide every 3 seconds

    return () => clearInterval(slideInterval)
  }, [])

  return (
    <div className="hero min-h-[500px] relative overflow-hidden">
      {/* background images */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={slide || "/placeholder.svg"}
            alt={`Hero slide ${index + 1}`}
            className="w-full h-full object-cover"
          />
          {/* overlay for readability */}
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        </div>
      ))}

      {/* content - always visible */}
      <div className="hero-content text-center relative z-10">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold text-white drop-shadow-lg">
            Perfect Gifts for
            <span className="text-yellow-300"> Everyone</span>
          </h1>
          <p className="py-6 text-white drop-shadow-md">
            Discover unique and thoughtful gifts that bring joy to your loved ones.
          </p>
          
        </div>
      </div>

      {/*  slide indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-4 h-4 rounded-full transition-all ${
              index === currentSlide ? "bg-white" : "bg-white bg-opacity-50"
            }`}
          />
        ))}
      </div>
    </div>
  )
}

export default Hero