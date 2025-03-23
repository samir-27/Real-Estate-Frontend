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
    minBedrooms: '',
    maxBedrooms: '',
    minBathrooms: '',
    maxBathrooms: '',
    sortBy: '',
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

    // Filter by property type
    if (filters.propertyType) {
      filtered = filtered.filter(
        (prop) => prop.propertyType.toLowerCase() === filters.propertyType.toLowerCase()
      );
    }

    // Filter by min and max price
    if (filters.minPrice) {
      filtered = filtered.filter((prop) => prop.price >= Number(filters.minPrice));
    }
    if (filters.maxPrice) {
      filtered = filtered.filter((prop) => prop.price <= Number(filters.maxPrice));
    }

    // Filter by number of bedrooms
    if (filters.minBedrooms) {
      filtered = filtered.filter((prop) => prop.bedrooms >= Number(filters.minBedrooms));
    }
    if (filters.maxBedrooms) {
      filtered = filtered.filter((prop) => prop.bedrooms <= Number(filters.maxBedrooms));
    }

    // Filter by number of bathrooms
    if (filters.minBathrooms) {
      filtered = filtered.filter((prop) => prop.bathrooms >= Number(filters.minBathrooms));
    }
    if (filters.maxBathrooms) {
      filtered = filtered.filter((prop) => prop.bathrooms <= Number(filters.maxBathrooms));
    }

    // Sorting logic
    if (filters.sortBy === 'priceAsc') {
      filtered = filtered.sort((a, b) => a.price - b.price);
    } else if (filters.sortBy === 'priceDesc') {
      filtered = filtered.sort((a, b) => b.price - a.price);
    } else if (filters.sortBy === 'dateAsc') {
      filtered = filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    } else if (filters.sortBy === 'dateDesc') {
      filtered = filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    setFilteredProperties(filtered);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row">
        {/* Left side: Filters */}
        <div className="md:w-1/4 p-4 border-r-2 border-gray-400">
          <h2 className="text-2xl font-bold mb-4">Filters</h2>
          <form onSubmit={applyFilters}>
            {/* Property Type Filter */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="propertyType">
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

            {/* Minimum Bedrooms Filter */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="minBedrooms">
                Min Bedrooms
              </label>
              <input
                type="number"
                id="minBedrooms"
                name="minBedrooms"
                value={filters.minBedrooms}
                onChange={handleFilterChange}
                placeholder="Minimum Bedrooms"
                className="w-full border border-gray-300 p-2 rounded"
              />
            </div>

            {/* Maximum Bedrooms Filter */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="maxBedrooms">
                Max Bedrooms
              </label>
              <input
                type="number"
                id="maxBedrooms"
                name="maxBedrooms"
                value={filters.maxBedrooms}
                onChange={handleFilterChange}
                placeholder="Maximum Bedrooms"
                className="w-full border border-gray-300 p-2 rounded"
              />
            </div>

            {/* Minimum Bathrooms Filter */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="minBathrooms">
                Min Bathrooms
              </label>
              <input
                type="number"
                id="minBathrooms"
                name="minBathrooms"
                value={filters.minBathrooms}
                onChange={handleFilterChange}
                placeholder="Minimum Bathrooms"
                className="w-full border border-gray-300 p-2 rounded"
              />
            </div>

            {/* Maximum Bathrooms Filter */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="maxBathrooms">
                Max Bathrooms
              </label>
              <input
                type="number"
                id="maxBathrooms"
                name="maxBathrooms"
                value={filters.maxBathrooms}
                onChange={handleFilterChange}
                placeholder="Maximum Bathrooms"
                className="w-full border border-gray-300 p-2 rounded"
              />
            </div>

            {/* Sort By Filter */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="sortBy">
                Sort By
              </label>
              <select
                id="sortBy"
                name="sortBy"
                value={filters.sortBy}
                onChange={handleFilterChange}
                className="w-full border border-gray-300 p-2 rounded"
              >
                <option value="">Select Sort Option</option>
                <option value="priceAsc">Price: Low to High</option>
                <option value="priceDesc">Price: High to Low</option>
                <option value="dateAsc">Date: Old to New</option>
                <option value="dateDesc">Date: New to Old</option>
              </select>
            </div>

            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
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
