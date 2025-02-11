const Hero = () => {
  return (
    <div className="relative flex items-center justify-center h-92vh">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('https://mbluxury1.s3.amazonaws.com/2024/02/01151752/luxury-real-estate-website-design-scaled.jpg')" }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/70"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-white text-center px-4">
        <h1 className="text-6xl font-bold">Find Your Dream Home</h1>
            <p className="text-xl mt-2">Discover properties that fit your budget and lifestyle.</p>

        <button className="mt-6 px-6 py-3 bg-cyan-500 hover:bg-cyan-600 rounded-lg text-lg font-medium">
          Explore Listings
        </button>
      </div>
    </div>
  )
}

export default Hero