import Hero from "../components/home/Hero"

type HomeProps = {
  // for future use if needed
}

const Home = (_: HomeProps) => {
  return (
    <div>
      <Hero />
      {/* I'll add more sections here later */}
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-center">More sections coming soon...</h2>
      </div>
    </div>
  )
}

export default Home
