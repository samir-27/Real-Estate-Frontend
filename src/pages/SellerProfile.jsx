import { Outlet, Link } from "react-router-dom";

const SellerProfile = () => {
  return (
    <div className="container mx-auto mt-10">
      <div className="flex bg-white rounded-xl overflow-hidden border border-gray-200">
        
        {/* Sidebar */}
        <div className="w-1/4 p-6 bg-gray-100 flex flex-col gap-6 border-r border-gray-200">
          
          <nav className="flex flex-col gap-4">
            <Link
              to="/seller/profile"
              className="flex items-center gap-3 px-5 py-3 rounded-lg bg-white shadow-md hover:bg-blue-500 hover:text-white transition-all duration-300"
            >
              🏠 <span className="font-semibold text-lg">sellerProfile</span>
            </Link>
            <Link
              to="/seller/profile/change-password"
              className="fle            x items-center gap-3 px-5 py-3 rounded-lg bg-white shadow-md hover:bg-yellow-500 hover:text-white transition-all duration-300"
            >
              🔒 <span className="font-semibold text-lg">Change Password</span>
            </Link>
            <button className="flex items-center gap-3 px-5 py-3 mt-auto bg-red-500 text-white rounded-lg shadow-lg hover:bg-red-600 transition-all duration-300">
              🚪 <span className="font-semibold text-lg">Logout</span>
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

export default SellerProfile;
