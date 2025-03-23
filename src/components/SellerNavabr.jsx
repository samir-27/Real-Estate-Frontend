import React, { useState } from 'react'
import { FaBars, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const SellerNavabr = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleLinkClick = () => setIsOpen(false);
  
    return (
      <nav className="bg-blue-500 text-white ">
        <div className="container mx-auto flex justify-between items-center p-4 h-8vh">
       
          <Link to="/" className="text-xl font-bold">
            Home Scape
          </Link>
  
          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
  
          {/* Desktop Menu */}
          <ul className="hidden md:flex space-x-6">
            <li>
              <Link to="/seller/home" className="hover:text-gray-300">
                Home
              </Link>
            </li>
            <li>
              <Link to="/seller/create-property" className="hover:text-gray-300">
                Create Property
              </Link>
            </li>
            <li>
              <Link to="/seller/my-properties" className="hover:text-gray-300">
                My Properties
              </Link>
            </li>
            <li>
              <Link to="/seller/profile" className="hover:text-gray-300">
                Profile
              </Link>
            </li>
          </ul>
        </div>
  
        {/* Mobile Menu (visible when hamburger is toggled) */}
        {isOpen && (
          <ul className="md:hidden flex flex-col space-y-2 bg-blue-500 p-4">
            <li>
              <Link
                to="/"
                className="block hover:text-gray-300"
                onClick={handleLinkClick}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/properties"
                className="block hover:text-gray-300"
                onClick={handleLinkClick}
              >
                Properties
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="block hover:text-gray-300"
                onClick={handleLinkClick}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/profile"
                className="block hover:text-gray-300"
                onClick={handleLinkClick}
              >
                Profile
              </Link>
            </li>
          </ul>
        )}
      </nav>
    );
  };

export default SellerNavabr
