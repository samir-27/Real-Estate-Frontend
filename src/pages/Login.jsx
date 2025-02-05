import { useState } from "react";
import { Link } from "react-router-dom";

export default function LoginPage() {
    const [role, setRole] = useState("buyer");
  
    return (
      <div className="flex h-screen">
        <div className="w-1/2 bg-cover bg-center" style={{ backgroundImage: "url('https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?cs=srgb&dl=pexels-binyaminmellish-1396122.jpg&fm=jpg')" }}>
        </div>
        <div className="w-1/2 flex items-center justify-center bg-gray-100">
          <div className="bg-white p-8 shadow-md rounded-lg w-96">
            <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
            <div className="mb-4">
              <label className="block mb-2 font-medium">Login as:</label>
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
            <form>
              <div className="mb-4">
                <label className="block font-medium">Email</label>
                <input type="email" className="w-full p-2 border rounded" placeholder="Enter your email" />
              </div>
              <div className="mb-4">
                <label className="block font-medium">Password</label>
                <input type="password" className="w-full p-2 border rounded" placeholder="Enter your password" />
              </div>
              <p className="py-2">Have't created account <Link to={'/signup'}><span className="text-cyan-700">Sign up</span></Link> </p>
              <button className="w-full bg-cyan-500 text-white p-2 rounded hover:bg-cyan-600">
                Login as {role.charAt(0).toUpperCase() + role.slice(1)}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }