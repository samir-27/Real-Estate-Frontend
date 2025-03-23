import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const PropertyDetail = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");

  const userTOKEN = localStorage.getItem("token");
  const decodedToken = jwtDecode(userTOKEN);
  const userId = decodedToken.id;

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };



  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/api/v1/property/apply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          property: property._id,
          seller: property.createdBy,
          buyer: userId
        }),
      });
      console.log(property.createdBy)
      if (!res.ok) {
        throw new Error("Failed to submit application");
      }

      const data = await res.json();
      alert(data.message);
      setIsFormOpen(false);
    } catch (err) {
      alert(err.message);
    }
  };


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
        className="w-full h-70vh object-contain rounded-md"
      />

      {/* Small Image Carousel */}
      <div className="flex gap-4 mt-4">
        {property.images?.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Property ${index + 1}`}
            className={`w-24 h-24 object-cover rounded-md cursor-pointer border-2 ${selectedImage === img ? "border-blue-500" : "border-transparent"
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
      {isFormOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-2xl font-bold mb-4">Apply for Property</h2>
            <form onSubmit={handleFormSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full mb-2 p-2 border rounded"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full mb-2 p-2 border rounded"
                required
              />
              <input
                type="text"
                name="phone"
                placeholder="Your Phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full mb-2 p-2 border rounded"
                required
              />
              <textarea
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleInputChange}
                className="w-full mb-2 p-2 border rounded"
              ></textarea>
              <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Submit Application
              </button>
              <button
                type="button"
                onClick={() => setIsFormOpen(false)}
                className="ml-2 text-red-500"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}

      <button
        onClick={() => setIsFormOpen(true)}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Apply for this Property
      </button>

    </div>
  );
};

export default PropertyDetail;
