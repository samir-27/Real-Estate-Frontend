import { Route, Routes } from 'react-router-dom'
import './App.css'
import './index.css'
import Login from './pages/Login'
import Signup from './pages/Signup'
function App() {
  return (
    <>
        <Routes>
          <Route path='/login' element={<Login />} ></Route>
          <Route path='/signup' element={<Signup />} ></Route>
        </Routes>
    </>
  )
}

export default App