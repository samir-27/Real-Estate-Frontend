import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const PropertyDetail = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/v1/property/getone/${id}`);
        if (!res.ok) {
          throw new Error("Failed to fetch property details");
        }
        const data = await res.json();
        setProperty(data);
        setSelectedImage(data.images?.[0] || "https://via.placeholder.com/600");
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  if (loading) return <div className="text-center text-xl">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="container mx-auto shadow-lg rounded-lg mt-6">
      {/* Main Image */}
      <img
        src={selectedImage}
        alt={property.title}
        className="w-full h-[500px] object-cover rounded-md"
      />

      {/* Small Image Carousel */}
      <div className="flex gap-4 mt-4">
        {property.images?.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Property ${index + 1}`}
            className={`w-24 h-24 object-cover rounded-md cursor-pointer border-2 ${
              selectedImage === img ? "border-cyan-500" : "border-transparent"
            }`}
            onClick={() => setSelectedImage(img)}
          />
        ))}
      </div>

      {/* Property Details */}
      <h2 className="text-3xl font-bold mt-4">{property.title}</h2>
      <p className="text-gray-600 mt-2">{property.description}</p>

      <div className="grid grid-cols-2 gap-4 mt-4">
        <div>
          <span className="text-lg font-semibold">Price:</span> ${property.price}
        </div>
        <div>
          <span className="text-lg font-semibold">Location:</span> {property.address}, {property.city}, {property.state}, {property.zipCode}, {property.country}
        </div>
        <div>
          <span className="text-lg font-semibold">Bedrooms:</span> {property.bedrooms}
        </div>
        <div>
          <span className="text-lg font-semibold">Bathrooms:</span> {property.bathrooms}
        </div>
        <div>
          <span className="text-lg font-semibold">Area:</span> {property.area} sqft
        </div>
        <div>
          <span className="text-lg font-semibold">Property Type:</span> {property.propertyType}
        </div>
      </div>

      <p className="text-gray-500 mt-4">
        Listed on: {new Date(property.listedDate).toLocaleDateString()}
      </p>
    </div>
  );
};

export default PropertyDetail;
