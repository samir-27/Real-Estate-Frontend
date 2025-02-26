import { jwtDecode } from "jwt-decode";
import { useState } from "react";

const SellerUpdatePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [retypeNewPassword, setRetypeNewPassword] = useState("");
  const [message, setMessage] = useState("");

  const userTOKEN = localStorage.getItem("token");
  if (!userTOKEN) {
    setMessage("User not authenticated");
    return;
  }

  const decodedToken = jwtDecode(userTOKEN);
  const userId = decodedToken.id;

  const handleUpdatePassword = async (e) => {
    e.preventDefault();

    if (newPassword !== retypeNewPassword) {
      setMessage("New passwords do not match");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3000/api/v1/seller/updatepassword/${userId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ currentPassword: oldPassword, newPassword }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      setMessage(data.message);
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div className="">
      <div className="bg-white p-8">
        <h2 className="text-2xl mb-6 text-gray-700">Update Password</h2>

        {message && <p className="text-center text-red-500 mb-4">{message}</p>}

        <form onSubmit={handleUpdatePassword} className="space-y-4">
          <input
            type="password"
            placeholder="Old Password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="password"
            placeholder="Retype New Password"
            value={retypeNewPassword}
            onChange={(e) => setRetypeNewPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default SellerUpdatePassword;