import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function SignupPage() {
  const [role, setRole] = useState("buyer");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:3000/api/v1/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, role }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Signup failed");

      alert("Signup successful!");
      navigate("/login");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/2 bg-cover bg-center" style={{ backgroundImage: "url('https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?cs=srgb&dl=pexels-binyaminmellish-1396122.jpg&fm=jpg')" }}></div>
      <div className="w-1/2 flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 shadow-md rounded-lg w-96">
          <h2 className="text-2xl font-bold mb-6 text-center">Signup</h2>

          {error && <p className="text-red-500 text-center">{error}</p>}

          <div className="mb-4">
            <label className="block mb-2 font-medium">Signup as:</label>
            <div className="flex space-x-4">
              <button 
                className={`px-4 py-2 rounded ${role === "buyer" ? "bg-cyan-500 text-white" : "bg-gray-200"}`}
                onClick={() => setRole("buyer")}
              >
                Buyer
              </button>
              <button 
                className={`px-4 py-2 rounded ${role === "seller" ? "bg-cyan-500 text-white" : "bg-gray-200"}`}
                onClick={() => setRole("seller")}
              >
                Seller
              </button>
            </div>
          </div>

          <form onSubmit={handleSignup}>
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
            <p className="py-2">Already have an account? <Link to="/login"><span className="text-cyan-700">Login</span></Link></p>
            <button 
              type="submit"
              className="w-full bg-cyan-500 text-white p-2 rounded hover:bg-cyan-600"
              disabled={loading}
            >
              {loading ? "Signing up..." : `Signup as ${role.charAt(0).toUpperCase() + role.slice(1)}`}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
