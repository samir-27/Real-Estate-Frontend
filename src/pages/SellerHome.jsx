import React from 'react';
import ReviewList from '../components/Reviews';
import VisionMission from '../components/VisionMission';

const SellerHome = () => {
  return (
    <div className="bg-blue-100 min-h-screen">
      {/* Hero Section */}
      <section className="relative text-center py-20 mb-10 h-92vh flex flex-col items-center justify-center bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1582407947304-fd86f028f716?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmVhbCUyMGVzdGF0ZXxlbnwwfHwwfHx8MA%3D%3D')" }}>
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <div className="relative max-w-5xl mx-auto px-4 z-10 text-white">
          <h1 className="text-4xl md:text-5xl font-bold">Welcome to Your Property Selling Hub</h1>
          <p className="mt-4 text-lg md:text-xl">Connect with buyers and sell your property with ease.</p>
          <button className="mt-6 px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-400 transition duration-300">
            Get Started
          </button>
        </div>
      </section>

      <VisionMission />

      <ReviewList />
    </div>
  );
};

export default SellerHome;