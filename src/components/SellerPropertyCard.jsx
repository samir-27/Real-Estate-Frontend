import React, { useState } from "react";

const SellerPropertyCard = ({ property, onDelete, onUpdate }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: property.title,
    price: property.price,
    bedrooms: property.bedrooms,
    bathrooms: property.bathrooms,
  });

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/api/v1/property/update/${property._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Assuming token is stored in localStorage
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to update property");

      const updatedProperty = await response.json();
      onUpdate(updatedProperty); // Call parent function to update UI
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error updating property:", error);
    }
  };

  return (
    <div style={{ border: "1px solid #ddd", padding: "10px", borderRadius: "8px", boxShadow: "2px 2px 5px rgba(0,0,0,0.1)", position: "relative" }}>
      <img
        src={property.images[0] || "https://via.placeholder.com/300"}
        alt={property.title}
        style={{ width: "100%", height: "200px", objectFit: "cover", borderRadius: "6px" }}
      />
      <h3>{property.title}</h3>
      <p>{property.city}, {property.state}</p>
      <p><strong>Price:</strong> ${property.price}</p>
      <p><strong>Bedrooms:</strong> {property.bedrooms} | <strong>Bathrooms:</strong> {property.bathrooms}</p>

      <button onClick={() => setIsModalOpen(true)} style={{ marginRight: "10px", padding: "5px 10px", background: "#007bff", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer" }}>Update</button>

      <button onClick={() => onDelete(property._id)} style={{ padding: "5px 10px", background: "#dc3545", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer" }}>Delete</button>

      {isModalOpen && (
        <div style={{ position: "fixed", top: "0", left: "0", width: "100%", height: "100%", background: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <div style={{ background: "#fff", padding: "20px", borderRadius: "8px", width: "400px" }}>
            <h2>Update Property</h2>
            <form onSubmit={handleUpdate}>
              <input type="text" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required style={{ width: "100%", padding: "8px", marginBottom: "10px" }} />
              <input type="number" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} required style={{ width: "100%", padding: "8px", marginBottom: "10px" }} />
              <input type="number" value={formData.bedrooms} onChange={(e) => setFormData({ ...formData, bedrooms: e.target.value })} required style={{ width: "100%", padding: "8px", marginBottom: "10px" }} />
              <input type="number" value={formData.bathrooms} onChange={(e) => setFormData({ ...formData, bathrooms: e.target.value })} required style={{ width: "100%", padding: "8px", marginBottom: "10px" }} />
              <button type="submit" style={{ padding: "10px", background: "#28a745", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer", marginRight: "10px" }}>Save</button>
              <button type="button" onClick={() => setIsModalOpen(false)} style={{ padding: "10px", background: "#6c757d", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer" }}>Cancel</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SellerPropertyCard;
