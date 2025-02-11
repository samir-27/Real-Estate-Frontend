import { Route, Routes } from 'react-router-dom'
import './App.css'
import './index.css'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Property from './pages/Property'
function App() {
  return (
    <>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} ></Route>
          <Route path='/properties' element={<Property />} ></Route>
          <Route path='/login' element={<Login />} ></Route>
          <Route path='/signup' element={<Signup />} ></Route>
        </Routes>
    </>
  )
}

export default App