import { Outlet, Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const Profile = () => {
  const navigate = useNavigate();
  
  // Function to handle logout
  const handleLogout = () => {

    localStorage.removeItem("token");
    navigate('/login')
  
  };
  

  return (
    <div className="container mx-auto mt-10">
      <div className="flex bg-white rounded-xl overflow-hidden border border-gray-200">
        
        {/* Sidebar */}
        <div className="w-1/4 p-6 bg-gray-100 flex flex-col gap-6 border-r border-gray-200">
          
          <nav className="flex flex-col gap-4">
            <Link
              to="/profile"
              className="flex items-center gap-3 px-5 py-3 rounded-lg bg-white shadow-md hover:bg-blue-500 hover:text-white transition-all duration-300"
            >
              <span className="font-semibold text-lg">My Profile</span>
            </Link>
            <Link
              to="/profile/change-password"
              className="flex items-center gap-3 px-5 py-3 rounded-lg bg-white shadow-md hover:bg-blue-500 hover:text-white transition-all duration-300"
            >
              <span className="font-semibold text-lg">Change Password</span>
            </Link>
            <button 
              onClick={handleLogout}
              className="flex items-center gap-3 px-5 py-3 mt-auto bg-red-500 text-white rounded-lg shadow-lg hover:bg-red-600 transition-all duration-300"
            >
              <span className="font-semibold text-lg">Logout</span>
            </button>
          </nav>
        </div>

        {/* Main Content */}
        <div className="w-3/4 bg-gray-50">
          <div className="">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
