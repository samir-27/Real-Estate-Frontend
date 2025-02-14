import React from "react";

const SellerPropertyCard = ({ property }) => {
  return (
    <div style={{ border: "1px solid #ddd", padding: "10px", borderRadius: "8px", boxShadow: "2px 2px 5px rgba(0,0,0,0.1)" }}>
      <img src={property.images[0] || "https://via.placeholder.com/300"} alt={property.title} style={{ width: "100%", height: "200px", objectFit: "cover", borderRadius: "6px" }} />
      <h3>{property.title}</h3>
      <p>{property.city}, {property.state}</p>
      <p><strong>Price:</strong> ${property.price}</p>
      <p><strong>Bedrooms:</strong> {property.bedrooms} | <strong>Bathrooms:</strong> {property.bathrooms}</p>
    </div>
  );
};

export default SellerPropertyCard;
