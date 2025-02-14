import React, { useState } from 'react';

const CreateProperty = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    images: [],
    propertyType: 'House',
    bedrooms: 0,
    bathrooms: 0,
    area: 0,
  });
  const token = localStorage.getItem("token");
  console.log("token====",token);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("Token being sent:", token);
  
    try {
      const response = await fetch('http://localhost:3000/api/v1/property/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log('Property Created:', data);
    } catch (error) {
      console.error('Error creating property:', error);
    }
  };
  
  
  return (
    <div className="container mx-auto bg-white p-6 rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-bold mb-4">Create Property</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input type="text" name="title" placeholder="Title" onChange={handleChange} className="border p-2 rounded" required />
        <input type="text" name="description" placeholder="Description" onChange={handleChange} className="border p-2 rounded" required />
        <input type="number" name="price" placeholder="Price" onChange={handleChange} className="border p-2 rounded" required />
        <input type="text" name="address" placeholder="Address" onChange={handleChange} className="border p-2 rounded" required />
        <input type="text" name="city" placeholder="City" onChange={handleChange} className="border p-2 rounded" required />
        <input type="text" name="state" placeholder="State" onChange={handleChange} className="border p-2 rounded" required />
        <input type="text" name="zipCode" placeholder="Zip Code" onChange={handleChange} className="border p-2 rounded" required />
        <input type="text" name="country" placeholder="Country" onChange={handleChange} className="border p-2 rounded" required />
        <select name="propertyType" onChange={handleChange} className="border p-2 rounded">
          <option>House</option>
          <option>Apartment</option>
          <option>Condo</option>
          <option>Land</option>
          <option>Other</option>
        </select>
        <input type="number" name="bedrooms" placeholder="Bedrooms" onChange={handleChange} className="border p-2 rounded" />
        <input type="number" name="bathrooms" placeholder="Bathrooms" onChange={handleChange} className="border p-2 rounded" />
        <input type="number" name="area" placeholder="Area (sq ft)" onChange={handleChange} className="border p-2 rounded" />
        <button type="submit" className="col-span-2 bg-blue-500 text-white p-2 rounded hover:bg-blue-600 w-52">Create Property</button>
      </form>
    </div>
  );
};

export default CreateProperty;