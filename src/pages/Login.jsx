import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function LoginPage({ updateRole }) {
  const [role, setRole] = useState("buyer");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:3000/api/v1/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, role }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Login failed");

      localStorage.setItem("token", data.token);
      updateRole(); // Update role immediately
      alert("Login successful!");
      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen">
      <div
        className="w-1/2 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?cs=srgb&dl=pexels-binyaminmellish-1396122.jpg&fm=jpg')",
        }}
      ></div>
      <div className="w-1/2 flex items-center justify-center bg-blue-100">
        <div className="bg-white p-8 shadow-md rounded-lg w-96">
          <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
          <div className="mb-4">
            <label className="block mb-2 font-medium">Login as:</label>
            <div className="flex space-x-4">
              <button
                className={`px-4 py-2 rounded cursor-pointer ${
                  role === "buyer" ? "bg-blue-500 text-white" : "bg-gray-200"
                }`}
                onClick={() => setRole("buyer")}
              >
                Buyer
              </button>
              <button
                className={`px-4 py-2 rounded cursor-pointer ${
                  role === "seller" ? "bg-blue-500 text-white" : "bg-gray-200"
                }`}
                onClick={() => setRole("seller")}
              >
                Seller
              </button>
            </div>
          </div>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block font-medium">Email</label>
              <input
                type="email"
                className="w-full p-2 border rounded"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block font-medium">Password</label>
              <input
                type="password"
                className="w-full p-2 border rounded"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <p className="text-red-500">{error}</p>}
            <p className="py-2">
              Haven't created an account?{" "}
              <Link to={"/signup"}>
                <span className="text-blue-700">Sign up</span>
              </Link>
            </p>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
              disabled={loading}
            >
              {loading ? "Logging in..." : `Login as ${role.charAt(0).toUpperCase() + role.slice(1)}`}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
