import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import "react-toastify/dist/ReactToastify.css";

const ReviewList = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  const userTOKEN = localStorage.getItem("token");
  if (!userTOKEN) {
    setMessage("User not authenticated");
    return;
  }

  const decodedToken = jwtDecode(userTOKEN);
  const userId = decodedToken.id;
  const role = decodedToken.role;
  const capitalizedRole = role.charAt(0).toUpperCase() + role.slice(1);
  
  
  const [formData, setFormData] = useState({
    stars: 5,
    description: "",
    userId: userId,
    userType: capitalizedRole,
  });
  
  
  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/v1/review/all");
      const data = await response.json();

      if (response.ok) {
        setReviews(data.reviews);
      } else {
        toast.error("Failed to load reviews.");
      }
    } catch (error) {
      toast.error("Error fetching reviews.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddReview = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/v1/review/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        toast.success("Review added successfully!");
        setModalOpen(false);
        fetchReviews(); // Refresh the reviews
      } else {
          console.log(formData)
        toast.error(data.error || "Failed to add review.");
      }
    } catch (error) {
      toast.error("Error submitting review.");
    }
  };

  return (
    <div className="min-h-screen mx-auto container py-16">
    <ToastContainer position="top-right" autoClose={3000} hideProgressBar />

    <div className="mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-4xl font-bold">Reviews</h2>
        <button
          onClick={() => setModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition duration-200"
        >
          + Add Review
        </button>
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Loading reviews...</p>
      ) : reviews.length === 0 ? (
        <p className="text-center text-gray-500">No reviews available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reviews.map((review) => (
            <div key={review._id} className="p-8 border rounded-lg shadow-lg hover:shadow-xl bg-white transition-transform transform hover:scale-105">
              <div className="flex items-center space-x-4">
                <img
                  src={review.userId?.profileImage || 'https://via.placeholder.com/48'}
                  alt="Profile"
                  className="w-12 h-12 rounded-full border border-gray-300"
                />
                <div>
                  <h3 className="font-bold text-lg text-gray-800">{review.userId?.name || "Anonymous"}</h3>
                  <p className="text-sm text-gray-500">{review.userType}</p>
                </div>
              </div>
              <p className="mt-2 text-gray-700">{review.description || "No description provided."}</p>
              <p className="mt-2 text-yellow-500 font-bold">⭐ {review.stars}/5</p>
            </div>
          ))}
        </div>
      )}
    </div>

    {/* Add Review Modal */}
    {modalOpen && (
      <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-lg  w-96">
          <h2 className="text-xl font-semibold mb-4">Add Review</h2>
          <form onSubmit={handleAddReview}>
            <label className="block text-gray-700 mb-1">Stars</label>
            <select
              className="w-full p-2 border rounded-md mb-4"
              value={formData.stars}
              onChange={(e) => setFormData({ ...formData, stars: Number(e.target.value) })}
              required
            >
              {[1, 2, 3, 4, 5].map((num) => (
                <option key={num} value={num}>{num}</option>
              ))}
            </select>

            <label className="block text-gray-700 mb-1">Description</label>
            <textarea
              className="w-full p-2 border rounded-md mb-4"
              placeholder="Write your review..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
            />

            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    )}
  </div>
  );
};

export default ReviewList;
