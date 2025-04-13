import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
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
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();

  const getRoleFromToken = () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        return decoded.role;
      } catch {
        console.error("Invalid token");
        localStorage.removeItem("token");
      }
    }
    return null;
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setRole(decoded.role);
        setIsAuthenticated(true);
      } catch {
        console.error("Invalid token");
        localStorage.removeItem("token");
        setIsAuthenticated(false);
      }
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const updateRole = () => {
    const role = getRoleFromToken();
    setRole(role);
    setIsAuthenticated(!!role);
  };

  const ProtectedRoute = ({ children }) => {
    return isAuthenticated ? children : <Navigate to="/login" replace />;
  };

  const hideNavAndFooter = ["/login", "/signup"].includes(location.pathname);

  return (
    <>
      {!hideNavAndFooter && (role === "seller" ? <SellerNavbar /> : <Navbar />)}

      <Routes>
        <Route path="/login" element={<Login updateRole={updateRole} />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/" element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        } />

        <Route path="/about" element={
          <ProtectedRoute>
            <About />
          </ProtectedRoute>
        } />

        <Route path="/properties" element={
          <ProtectedRoute>
            <Property />
          </ProtectedRoute>
        } />

        <Route path="/properties/:id" element={
          <ProtectedRoute>
            <PropertyDetail />
          </ProtectedRoute>
        } />

        <Route path="/profile" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }>
          <Route index element={<MyProfile />} />
          <Route path="change-password" element={<ChangePassword />} />
        </Route>

        {role === "seller" && (
          <>
            <Route path="/seller/home" element={
              <ProtectedRoute>
                <SellerHome />
              </ProtectedRoute>
            } />
            <Route path="/seller/create-property" element={
              <ProtectedRoute>
                <CreateProperty />
              </ProtectedRoute>
            } />
            <Route path="/seller/my-properties" element={
              <ProtectedRoute>
                <MyProperties />
              </ProtectedRoute>
            } />
            <Route path="/seller/profile" element={
              <ProtectedRoute>
                <SellerProfile />
              </ProtectedRoute>
            }>
              <Route index element={<SProfile />} />
              <Route path="change-password" element={<SellerUpdatePassword />} />
            </Route>
          </>
        )}

        {/* Catch-all for unauthorized seller access */}
        {!isAuthenticated || role !== "seller" ? (
          <Route path="/seller/*" element={<Navigate to="/"  />} />
        ) : null}

        {/* Catch-all route */}
        <Route path="*" element={<Navigate to={isAuthenticated ? "/" : "/login"}  />} />
      </Routes>

      {!hideNavAndFooter && <Footer />}
    </>
  );
}

export default App;
