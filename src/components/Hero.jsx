import React from 'react';

const Hero = () => {
  return (
    <div className="relative flex items-center justify-center h-screen">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('https://mbluxury1.s3.amazonaws.com/2024/02/01151752/luxury-real-estate-website-design-scaled.jpg')" }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black opacity-70"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-white text-center px-6 md:px-12">
        <h1 className="text-5xl md:text-6xl font-bold leading-tight">Find Your Dream Home</h1>
        <p className="text-lg md:text-xl mt-4">Discover properties that fit your budget and lifestyle.</p>

        <button className="mt-6 px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-lg font-medium transition duration-300">
          Explore Listings
        </button>
      </div>
    </div>
  );
}

export default Hero;