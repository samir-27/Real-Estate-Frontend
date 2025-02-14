import { Route, Routes } from 'react-router-dom'
import './App.css'
import './index.css'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Property from './pages/Property'
import PropertyDetail from './components/PropertyDetail'
import Profile from './pages/Profile'
import MyProfile from './components/MyProfile'
import ChangePassword from './components/ChangePassword'
import CreateProperty from './pages/CreateProperty'
import MyProperties from './pages/MyProperties'
function App() {
  const userToken = localStorage.getItem("token"); // Get token from localStorage

  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} ></Route>
        <Route path='/properties' element={<Property />} ></Route>
        <Route path='/properties/:id' element={<PropertyDetail />} ></Route>
        <Route path="/profile" element={<Profile />}>
          <Route index element={<MyProfile />} />  {/* Default profile page */}
          <Route path="change-password" element={<ChangePassword />} />
        </Route>
        <Route path='/login' element={<Login />} ></Route>
        <Route path='/signup' element={<Signup />} ></Route>
        {/* <Route path='/seller/home' element={<SellerHome />} /> */}
        <Route path='/seller/create-property' element={<CreateProperty />} />
        <Route path='/seller/my-properties' element={<MyProperties token={userToken} />} />
        {/* <Route path='/seller/profile' element={<SellerProfile />} /> */}
      </Routes>
    </>
  )
}

export default App