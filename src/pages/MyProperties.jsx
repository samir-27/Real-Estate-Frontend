import React, { useEffect, useState } from "react";
import SellerPropertyCard from "../components/SellerPropertyCard";

const MyProperties = ({ token }) => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProperties = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/v1/property/getmyproperties", {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) throw new Error("Failed to fetch properties");

        const data = await response.json();
        setProperties(data);
      } catch (error) {
        console.error("Error fetching properties:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProperties();
  }, [token]);

  // 🗑️ Delete Property
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/v1/property/deleteproperty/${id}`, {
        method: "DELETE"
      });

      if (!response.ok) throw new Error("Failed to delete property");

      setProperties((prev) => prev.filter((property) => property._id !== id));
    } catch (error) {
      console.error("Error deleting property:", error);
    }
  };

  // 🔄 Update Property (After API call, update UI)
  const handleUpdate = (updatedProperty) => {
    setProperties((prev) =>
      prev.map((property) => (property._id === updatedProperty._id ? updatedProperty : property))
    );
  };

  return (
    <div className="container mx-auto">
      <h2>My Properties</h2>
      {loading ? (
        <p>Loading...</p>
      ) : properties.length === 0 ? (
        <p>No properties found.</p>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "10px" }}>
          {properties.map((property) => (
            <SellerPropertyCard key={property._id} property={property} onDelete={handleDelete} onUpdate={handleUpdate} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyProperties;
