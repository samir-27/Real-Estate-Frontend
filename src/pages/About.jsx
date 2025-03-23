import React from 'react';

const About = () => {
  return (
    <div className='bg-white text-gray-900'>
      {/* Hero Section */}
      <section className='relative h-92vh text-white text-center flex items-center justify-center px-4'>
        <div className='absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 z-10'></div>
        <div className=' mx-auto relative z-20'>
          <h1 className='text-6xl font-bold'>Welcome to RealEstate Pro</h1>
          <p className='mt-4 text-2xl'>Your trusted partner in finding the perfect home.</p>
        </div>
        <img 
          src='https://www.nuveen.com/en-us/global/-/media/nuveen/thinking/real-estate/outlook-2023/334100-real-estate-outlook-hero-1380x800px_.ashx?sc_lang=en' 
          alt='Real Estate' 
          className='absolute top-0 left-0 w-full h-full object-cover z-0' 
        />
      </section>
      
      {/* Why Us Section */}
      <section className='py-16 px-6 max-w-6xl mx-auto'>
        <h2 className='text-3xl font-bold text-center text-blue-500'>Why Choose Us?</h2>
        <div className='grid md:grid-cols-3 gap-8 mt-8'>
          <div className='p-6 shadow-lg rounded-lg bg-white border'>
            <img src='https://lh4.googleusercontent.com/proxy/dooHcJ5_GudIqmkxBPFZDRp6wBZ23D0Cx11jZ6IPGxWYVWGjvid_IHsTN0OvF85296-vUZJtk8ZSsCJNGd9a50BsWk08dVdsBKewwjhRaOOvYze8jKDz6ogHp4mP2xfcUw' alt='Expert Agents' className='w-full h-40 object-cover rounded-lg mb-4'/>
            <h3 className='text-xl font-semibold text-blue-500'>Expert Agents</h3>
            <p className='mt-2 text-gray-600'>We have a team of experienced professionals ready to assist you.</p>
          </div>
          <div className='p-6 shadow-lg rounded-lg bg-white border'>
            <img src='https://www.usnews.com/object/image/00000186-7f36-d937-a5e6-ff3f7e2a0000/gettyimages-1225702722.jpg?update-time=1677171573932&size=responsive640' alt='Top Locations' className='w-full h-40 object-cover rounded-lg mb-4'/>
            <h3 className='text-xl font-semibold text-blue-500'>Top Locations</h3>
            <p className='mt-2 text-gray-600'>Find properties in prime locations with the best amenities.</p>
          </div>
          <div className='p-6 shadow-lg rounded-lg bg-white'>
            <img src='https://via.placeholder.com/300' alt='Affordable Pricing' className='w-full h-40 object-cover rounded-lg mb-4'/>
            <h3 className='text-xl font-semibold text-blue-500'>Affordable Pricing</h3>
            <p className='mt-2 text-gray-600'>Get the best deals and value for your investment.</p>
          </div>
        </div>
      </section>
      
      {/* Our Mission */}
      <section className='bg-gray-100 py-16 px-6'>
        <div className='max-w-5xl mx-auto text-center'>
          <h2 className='text-3xl font-bold text-blue-500'>Our Mission</h2>
          <p className='mt-4 text-lg text-gray-700'>To connect people with their dream homes while ensuring transparency, affordability, and customer satisfaction.</p>
          <img src='https://via.placeholder.com/600x300' alt='Our Mission' className='mt-6 mx-auto rounded-lg'/>
        </div>
      </section>
      
      {/* Our Vision */}
      <section className='py-16 px-6'>
        <div className='max-w-5xl mx-auto text-center'>
          <h2 className='text-3xl font-bold text-blue-500'>Our Vision</h2>
          <p className='mt-4 text-lg text-gray-700'>To revolutionize the real estate industry by offering innovative and seamless property solutions.</p>
          <img src='https://via.placeholder.com/600x300' alt='Our Vision' className='mt-6 mx-auto rounded-lg'/>
        </div>
      </section>
    </div>
  );
};

export default About;