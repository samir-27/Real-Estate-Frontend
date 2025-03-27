import { Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import './index.css';
import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

// Pages & Components
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Property from './pages/Property';
import PropertyDetail from './components/PropertyDetail';
import Profile from './pages/Profile';
import MyProfile from './components/MyProfile';
import ChangePassword from './components/ChangePassword';
import CreateProperty from './pages/CreateProperty';
import MyProperties from './pages/MyProperties';
import SellerProfile from './pages/SellerProfile';
import SProfile from './components/SProfile';
import SellerUpdatePassword from './components/SellerChangePassword';
import SellerNavbar from './components/SellerNavabr';
import SellerHome from './pages/SellerHome';
import About from './pages/About';
import Footer from './components/Footer';

function App() {
  const [role, setRole] = useState(null);

  const getRoleFromToken = () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        return jwtDecode(token).role;
      } catch {
        console.error("Invalid token");
        localStorage.removeItem("token");
      }
    }
    return null;
  };

  useEffect(() => {
    setRole(getRoleFromToken());
  }, []);

  const updateRole = () => setRole(getRoleFromToken());

  return (
    <>
      {role === "seller" ? <SellerNavbar /> : <Navbar />}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/properties' element={<Property />} />
        <Route path='/properties/:id' element={<PropertyDetail />} />
        <Route path='/about' element={<About />} />
        <Route path='/profile' element={<Profile />}>
          <Route index element={<MyProfile />} />
          <Route path="change-password" element={<ChangePassword />} />
        </Route>
        <Route path='/login' element={<Login updateRole={updateRole} />} />
        <Route path='/signup' element={<Signup />} />

        {/* Seller Routes - Protected */}
        {role === "seller" ? (
          <>
            <Route path='/seller/home' element={<SellerHome />} />
            <Route path='/seller/create-property' element={<CreateProperty />} />
            <Route path='/seller/my-properties' element={<MyProperties />} />
            <Route path='/seller/profile' element={<SellerProfile />}>
              <Route index element={<SProfile />} />
              <Route path="change-password" element={<SellerUpdatePassword />} />
            </Route>
          </>
        ) : (
          <Route path='/seller/*' element={<Navigate to="/" />} />
        )}
      </Routes>
      <Footer />
    </>
  );
}

export default App;
