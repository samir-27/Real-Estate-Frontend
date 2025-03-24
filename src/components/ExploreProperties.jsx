import React, { useEffect, useState } from 'react';

const ExploreProperties = () => {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/v1/property/getallproperties');
                if (!response.ok) {
                    throw new Error('Failed to fetch properties');
                }
                const data = await response.json();
                setProperties(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProperties();
    }, []);

    return (
        <div className=' mx-auto container pt-10'>

        <h1 className='text-2xl'>Explore Property --></h1>
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-10">

        
    {loading && [1, 2, 3].map((index) => (
        <div key={index} className="w-full h-64 bg-gray-300 rounded-xl animate-pulse" />
    ))}

    {error && <p className="text-red-500 text-center col-span-full">{error}</p>}

    {properties.map((property) => (
        <div key={property.id} className="bg-white shadow-lg rounded-2xl overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl">
            <img src={property.images[0]} alt={property.name} className="w-full h-64 object-cover" />
            <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 hover:text-blue-600 transition-colors">{property.title}</h3>
                <p className="text-gray-500 mt-1">{property.address}</p>
                <p className="text-lg font-bold text-blue-600 mt-2">${property.price}</p>
            </div>
        </div>
    ))}
    </div>
</div>
    );
};

export default ExploreProperties;