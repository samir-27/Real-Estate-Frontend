import React, { useState } from "react";

const SellerPropertyCard = ({ property, onDelete, onUpdate }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isApplicationsOpen, setIsApplicationsOpen] = useState(false);
  const [applications, setApplications] = useState([]);
  const [formData, setFormData] = useState({
    title: property.title,
    price: property.price,
    bedrooms: property.bedrooms,
    bathrooms: property.bathrooms,
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
    <div className="border border-gray-300 p-4 rounded-lg shadow-md bg-white">
      <img
        src={property.images[0] || "https://via.placeholder.com/300"}
        alt={property.title}
        className="w-full h-48 object-cover rounded-md"
      />
      <h3 className="mt-2 text-lg font-semibold">{property.title}</h3>
      <p className="text-gray-600">{property.city}, {property.state}</p>
      <p className="font-bold">Price: ${property.price}</p>
      <p>
        <strong>Bedrooms:</strong> {property.bedrooms} | <strong>Bathrooms:</strong> {property.bathrooms}
      </p>

      <div className="mt-3 flex space-x-2">
        <button onClick={() => setIsModalOpen(true)} className="bg-blue-500 p-2 rounded">
          Update
        </button>
        <button onClick={() => onDelete(property._id)} className="bg-red-500 p-2 rounded">
          Delete
        </button>
        <button onClick={fetchApplications} className="bg-green-500 p-2 rounded">
          View Applications
        </button>
      </div>

      {isModalOpen && (
        <Modal title="Update Property" onClose={() => setIsModalOpen(false)}>
          <form onSubmit={handleUpdate} className="space-y-3">
            {Object.keys(formData).map((key) => (
              <input
                key={key}
                type={typeof formData[key] === "number" ? "number" : "text"}
                value={formData[key]}
                onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                required
                className="w-full p-2 border rounded"
              />
            ))}
            <div className="flex space-x-2">
              <button type="submit" className="bg-green-500 p-2 rounded">Save</button>
            </div>
          </form>
        </Modal>
      )}

      {isApplicationsOpen && (
        <Modal title="Property Applications" onClose={() => setIsApplicationsOpen(false)}>
          {applications.length > 0 ? (
            applications.map((app) => (
              <div key={app._id} className="border p-4 rounded-lg mb-3">
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
    <div className="bg-white p-6 rounded-lg w-[500px] max-h-[80vh] overflow-y-auto">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      {children}
      <button onClick={onClose} className="w-full px-4 py-2 bg-gray-500 text-white rounded mt-3">Close</button>
    </div>
  </div>
);

export default SellerPropertyCard;