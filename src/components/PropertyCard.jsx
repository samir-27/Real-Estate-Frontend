import { Link } from "react-router-dom";

const PropertyCard = ({ property }) => {
    return (
        <div className="bg-white rounded-xl overflow-hidden shadow-lg transform hover:scale-105 transition duration-300 ease-in-out">
            <div className="relative">
                <img
                    src={property.images?.[0] || "https://via.placeholder.com/300"}
                    alt={property.title}
                    className="w-full h-56 object-cover"
                />
                {/* Property type badge */}
                <div className="absolute top-2 left-2 bg-gray-700 text-white text-xs font-bold px-2 py-1 rounded">
                    {property.propertyType}
                </div>
            </div>
            <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-800">
                        {property.title}
                    </h3>
                    <span className="text-cyan-500 font-bold">
                        ${property.price.toLocaleString()}
                    </span>
                </div>
                <p className="text-gray-600 text-sm mb-4">
                    {property.description.length > 100
                        ? property.description.substring(0, 100) + "..."
                        : property.description}
                </p>
                <Link
                    to={`/properties/${property._id}`}
                    className="block text-center bg-cyan-500 text-white px-4 py-2 rounded hover:bg-cyan-600 transition"
                >
                    View Details
                </Link>
            </div>
        </div>
    );
};

export default PropertyCard;
