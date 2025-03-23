import React, { useState } from "react";

const SellerPropertyCard = ({ property, onDelete, onUpdate }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isApplicationsOpen, setIsApplicationsOpen] = useState(false);
  const [applications, setApplications] = useState([]);
  const [formData, setFormData] = useState({
    title: property.title,
    price: property.price,
    address: property.address,
    bedrooms: property.bedrooms,
    bathrooms: property.bathrooms,
    city: property.city,
    state: property.state,
    description: property.description || "", // Optional description field
  });

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:3000/api/v1/property/update/${property._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) throw new Error("Failed to update property");

      const updatedProperty = await response.json();
      onUpdate(updatedProperty);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error updating property:", error);
    }
  };

  const fetchApplications = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/v1/property/getapplication/${property._id}`
      );
      if (!response.ok) throw new Error("Failed to fetch applications");
      const data = await response.json();
      setApplications(data);
      setIsApplicationsOpen(true);
    } catch (error) {
      console.error("Error fetching applications:", error);
    }
  };

  return (
    <div className="border p-3 border-gray-300  rounded-lg shadow-lg bg-white">
      <img
        src={property.images[0] || "https://via.placeholder.com/300"}
        alt={property.title}
        className="w-full h-48 object-cover rounded-md"
      />
      <div >

      <div className="">
        <h3 className="text-2xl font-semibold">{property.title}</h3>
        <p className="text-gray-600">{property.city}, {property.state}</p>
        <p className="font-bold text-xl text-blue-500">Price: ${property.price}</p>
        <p className="mt-2">
          <strong>Bedrooms:</strong> {property.bedrooms} | <strong>Bathrooms:</strong> {property.bathrooms}
        </p>
      </div>

      <div className="mt-4 flex space-x-4">
        <button onClick={() => setIsModalOpen(true)} className=" bg-blue-600 hover:bg-blue-700 text-white font-semibold p-2 rounded-lg shadow-md focus:outline-none">
          Update
        </button>
        <button onClick={fetchApplications} className=" bg-gray-700 hover:bg-gray-800 text-white font-semibold p-2 rounded-lg shadow-md focus:outline-none">
          View Applications
        </button>
        <button onClick={() => onDelete(property._id)} className=" bg-red-600 hover:bg-red-700 text-white p-2 font-semibold  rounded-lg shadow-md focus:outline-none">
          Delete
        </button>
      </div>
      </div>

      {isModalOpen && (
        <Modal title="Update Property" onClose={() => setIsModalOpen(false)}>
          <form onSubmit={handleUpdate} className="space-y-2">
            {Object.keys(formData).map((key) => (
              <div key={key} className="flex flex-col space-y-2">
                <label htmlFor={key} className="text-sm font-medium text-gray-700">{key.charAt(0).toUpperCase() + key.slice(1)}</label>
                <input
                  id={key}
                  type={key === "price" || key === "bedrooms" || key === "bathrooms" ? "number" : "text"}
                  value={formData[key]}
                  onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                  required
                  className="w-full p-2 border-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
                />
              </div>
            ))}
            <div className="flex justify-end space-x-4">
              <button type="submit" className="bg-blue-600 text-white py-2 w-full rounded-lg shadow-lg focus:outline-none hover:bg-blue-700 text-lg">
                Save
              </button>
            </div>
          </form>
        </Modal>

      )}

      {isApplicationsOpen && (
        <Modal title="Property Applications" onClose={() => setIsApplicationsOpen(false)}>
          {applications.length > 0 ? (
            applications.map((app) => (
              <div key={app._id} className="border p-4 rounded-lg mb-3 bg-gray-50 shadow-sm">
                <p><strong>Name:</strong> {app.name}</p>
                <p><strong>Email:</strong> {app.email}</p>
                <p><strong>Phone:</strong> {app.phone}</p>
                <p><strong>Message:</strong> {app.message}</p>
              </div>
            ))
          ) : (
            <p>No applications found.</p>
          )}
        </Modal>
      )}
    </div>
  );
};

const Modal = ({ title, children, onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white p-8 rounded-lg w-[500px] max-h-[80vh] overflow-y-auto shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">{title}</h2>
      {children}
      <button onClick={onClose} className="w-full px-6 py-2 bg-gray-600 text-white rounded-lg mt-4 hover:bg-gray-700">
        Close
      </button>
    </div>
  </div>
);

export default SellerPropertyCard;
