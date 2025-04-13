import React from 'react';

const propertyTypes = [
  {
    id: 1,
    title: 'House',
    image: 'https://www.bhg.com/thmb/TD9qUnFen4PBLDuB2hn9yhGXPv8=/1866x0/filters:no_upscale():strip_icc()/white-house-a-frame-section-c0a4a3b3-e722202f114e4aeea4370af6dbb4312b.jpg',
  },
  {
    id: 2,
    title: 'Apartment',
    image: 'https://images.unsplash.com/photo-1515263487990-61b07816b324?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YXBhcnRtZW50fGVufDB8fDB8fHww',
  },
  {
    id: 3,
    title: 'Condo',
    image: 'https://media.theprovidencegroup.com/259/2024/11/5/Market_Square_at_Sawnee_Village_CummingGA.jpg',
  },
  {
    id: 4,
    title: 'Villa',
    image: 'https://www.rewariproperties.com/public/uploads/newsphotos/advantages-of-living-in-a-villa.jpg',
  },
];

const PropertyTypes = () => {
  return (
    <div className='mx-auto container'>
        <h2 className="text-4xl font-bold py-8">Property Types</h2>   
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {propertyTypes.map((property) => (
        <div key={property.id} className="bg-white border shadow-lg rounded-2xl overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl">
          <img src={property.image} alt={property.title} className="w-full h-48 object-cover" />
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-800 text-center">{property.title}</h3>
          </div>
        </div>
      ))}
    </div>
    </div>
  );
};

export default PropertyTypes;