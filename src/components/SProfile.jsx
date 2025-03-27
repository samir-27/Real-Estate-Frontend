import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";

const SProfile = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    zipcode: "",
    city: "",
    state: "",
    profileImage: null,
  });
 const [errors, setErrors] = useState({});
  const userTOKEN = localStorage.getItem("token");
  const decodedToken = jwtDecode(userTOKEN);
  const userId = decodedToken.id;
  const API_URL = `http://localhost:3000/api/v1/seller/${userId}`;

  // Fetch user data
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Failed to fetch user data");

        const data = await response.json();
        setFormData((prev) => ({
          ...prev,
          name: data.name || "",
          email: data.email || "",
          phone: data.phone || "",
          zipcode: data.zipcode || "",
          city: data.city || "",
          state: data.state || "",
          profileImage: data.profileImage || null,
        }));
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUser();
  }, [API_URL]);
  // Validation Function
  const validateInput = (name, value) => {
    let error = "";

    if (name === "phone") {
      const phonePattern = /^[6-9]\d{9}$/; // Ensures 10-digit phone starting with 6-9
      if (!phonePattern.test(value)) {
        error = "Phone number must be 10 digits and start with 6-9.";
      }
    }

    if (name === "zipcode") {
      const zipcodePattern = /^\d{6}$/; // Ensures exactly 6 digits
      if (!zipcodePattern.test(value)) {
        error = "Pin code must be exactly 6 digits.";
      }
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    validateInput(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if there are validation errors before submitting
    if (errors.phone || errors.zipcode) {
      alert("Please fix validation errors before submitting.");
      return;
    }

    const userData = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      zipcode: formData.zipcode,
      city: formData.city,
      state: formData.state,
    };

    try {
      const response = await fetch(API_URL, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) throw new Error("Failed to update profile");

      const updatedData = await response.json();
      console.log("Updated Data:", updatedData);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile.");
    }
  };

  return (
    <div className="mx-auto bg-white p-6 border border-gray-200">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Update Profile</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Profile Image */}
        <img src={formData.profileImage} className="h-24" />

        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Phone</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          />
        {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
        </div>
        {/* zipcode */}
        <div>
          <label className="block text-sm font-medium text-gray-700">zipcode</label>
          <input
            type="text"
            name="zipcode"
            value={formData.zipcode}
            onChange={handleChange}
            required
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.zipcode && <p className="text-red-500 text-sm">{errors.zipcode}</p>}
        </div>

        {/* City */}
        <div>
          <label className="block text-sm font-medium text-gray-700">City</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* State */}
        <div>
          <label className="block text-sm font-medium text-gray-700">State</label>
          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleChange}
            required
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default SProfile;
