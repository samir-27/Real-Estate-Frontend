import React, { useState, useEffect } from 'react';
import PropertyCard from '../components/PropertyCard';

const Property = () => {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filters state
  const [filters, setFilters] = useState({
    propertyType: '',
    minPrice: '',
    maxPrice: '',
  });

  // Fetch properties from your API endpoint
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/v1/property/getallproperties');
        if (!response.ok) {
          throw new Error('Failed to fetch properties');
        }
        const data = await response.json();
        setProperties(data);
        setFilteredProperties(data); // initialize with all properties
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  // Handle filter input changes
  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  // Apply filters to the properties list
  const applyFilters = (e) => {
    e.preventDefault();
    let filtered = [...properties];

    if (filters.propertyType) {
      filtered = filtered.filter(
        (prop) =>
          prop.propertyType.toLowerCase() ===
          filters.propertyType.toLowerCase()
      );
    }
    if (filters.minPrice) {
      filtered = filtered.filter(
        (prop) => prop.price >= Number(filters.minPrice)
      );
    }
    if (filters.maxPrice) {
      filtered = filtered.filter(
        (prop) => prop.price <= Number(filters.maxPrice)
      );
    }

    setFilteredProperties(filtered);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row">
        {/* Left side: Filters */}
        <div className="md:w-1/4 p-4 border-r-2 border-gray-400 ">
          <h2 className="text-2xl font-bold mb-4">Filters</h2>
          <form onSubmit={applyFilters}>
            {/* Property Type Filter */}
            <div className="mb-4">
              <label
                className="block text-gray-700 mb-2"
                htmlFor="propertyType"
              >
                Property Type
              </label>
              <select
                id="propertyType"
                name="propertyType"
                value={filters.propertyType}
                onChange={handleFilterChange}
                className="w-full border border-gray-300 p-2 rounded"
              >
                <option value="">All</option>
                <option value="House">House</option>
                <option value="Apartment">Apartment</option>
                <option value="Condo">Condo</option>
                <option value="Land">Land</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Minimum Price Filter */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="minPrice">
                Min Price
              </label>
              <input
                type="number"
                id="minPrice"
                name="minPrice"
                value={filters.minPrice}
                onChange={handleFilterChange}
                placeholder="Minimum Price"
                className="w-full border border-gray-300 p-2 rounded"
              />
            </div>

            {/* Maximum Price Filter */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="maxPrice">
                Max Price
              </label>
              <input
                type="number"
                id="maxPrice"
                name="maxPrice"
                value={filters.maxPrice}
                onChange={handleFilterChange}
                placeholder="Maximum Price"
                className="w-full border border-gray-300 p-2 rounded"
              />
            </div>

            <button
              type="submit"
              className="bg-cyan-500 text-white px-4 py-2 rounded hover:bg-cyan-600"
            >
              Apply Filters
            </button>
          </form>
        </div>

        {/* Right side: Grid of Property Cards */}
        <div className="md:w-3/4 p-4">
          {loading ? (
            <p>Loading properties...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : filteredProperties.length === 0 ? (
            <p>No properties found.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {filteredProperties.map((property) => (
                <PropertyCard key={property._id} property={property} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Property;

