import React, { useState } from "react";

const CreateProperty = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    propertyType: "House",
    bedrooms: 0,
    bathrooms: 0,
    area: 0,
  });

  const [images, setImages] = useState([]); // Stores selected image files
  const token = localStorage.getItem("token");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    if (images.length >= 5) return; // Prevent more than 5 uploads

    const file = e.target.files[0]; // Get the selected file
    if (file) {
      setImages([...images, file]); // Add new file to state
    }
  };

  const removeImage = (index) => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });

    images.forEach((image) => {
      formDataToSend.append("images", image);
    });

    try {
      const response = await fetch("http://localhost:3000/api/v1/property/create", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formDataToSend,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Property Created:", data);
    } catch (error) {
      console.error("Error creating property:", error);
    }
  };

  return (
    <div className="bg-blue-100 h-92vh pt-10">


    <div className="container mx-auto bg-white p-6 rounded-lg shadow-md">
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

        {/* Image Upload Section */}
        <div className="col-span-2">
          <label className="block text-gray-700 font-bold mb-2">Upload Images (Max: 5)</label>
          <div className="flex gap-2">
            {images.map((image, index) => (
              <div key={index} className="relative w-24 h-24 border rounded overflow-hidden">
                <img src={URL.createObjectURL(image)} alt="Uploaded" className="w-full h-full object-cover" />
                <button
                  type="button"
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full px-2 py-1 text-xs"
                  onClick={() => removeImage(index)}
                >
                  ✖
                </button>
              </div>
            ))}

            {/* Plus (+) button for adding images */}
            {images.length < 5 && (
              <label className="w-24 h-24 flex items-center justify-center border rounded cursor-pointer">
                <span className="text-3xl text-gray-500">+</span>
                <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
              </label>
            )}
          </div>
        </div>

        <button type="submit" className="col-span-2 bg-blue-500 text-white p-2 rounded hover:bg-blue-600 w-52">
          Create Property
        </button>
      </form>
    </div>
            </div>
  );
};

export default CreateProperty;