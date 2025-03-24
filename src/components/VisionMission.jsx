import React from 'react'

const VisionMission = () => {
  return (
    <div>
            {/* Our Mission */}
            <section className="container mx-auto mb-16">
        <div className="bg-white rounded-lg shadow-lg p-8 flex flex-col md:flex-row items-center">
          <img
            src="https://media.licdn.com/dms/image/v2/D4E12AQHgMxo-g7BYsw/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1658422953944?e=2147483647&v=beta&t=Z2tA86SPCvcG9ieACH8jr4SSL47dclFPchqYJIPI4gY"
            alt="Our Mission"
            className="w-full md:w-1/2 h-96 object-cover rounded-lg shadow-md"
          />
          <div className="md:w-1/2 md:pl-8 mt-6 md:mt-0">
            <h2 className="text-3xl font-bold text-blue-500">Our Mission</h2>
            <p className="mt-4 text-lg text-gray-700">
              To connect people with their dream homes while ensuring transparency, affordability, and customer satisfaction.
            </p>
            <p className="mt-4 text-lg text-gray-700">
              We believe that everyone deserves a place to call home. Our dedicated team works tirelessly to provide the best service and support to our clients, making the home-buying process as smooth as possible.
            </p>
          </div>
        </div>
      </section>

      {/* Our Vision */}
      <section className="container mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 md:pr-8">
            <h2 className="text-3xl font-bold text-blue-500">Our Vision</h2>
            <p className="mt-4 text-lg text-gray-700">
              To revolutionize the real estate industry by offering innovative and seamless property solutions.
            </p>
            <p className="mt-4 text-lg text-gray-700">
              We envision a future where technology and real estate come together to create a more efficient and user-friendly experience for buyers and sellers alike. Our goal is to lead the way in providing cutting-edge solutions that meet the evolving needs of our clients.
            </p>
          </div>
          <img
            src="https://jasfoundation.org.in/wp-content/uploads/2023/10/vision-jas-scaled.jpg"
            alt="Our Vision"
            className="w-full md:w-1/2 h-96 rounded-lg shadow-md mt-6 md:mt-0"
          />
        </div>
      </section>
    </div>
  )
}

export default VisionMission
