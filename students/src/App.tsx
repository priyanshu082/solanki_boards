import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'

import Navbar from './components/Navbar'
import StudentIDCard from './pages/IDCard'
import StudentLogin from './pages/Login'
// import Layout from './components/Sidebar'
// import { Signin } from './pages/Signin'
// import { Home } from './pages/Home'
// import { RoomDetails } from './pages/Room'
// import CreateRoom from './pages/CreateRoom'
// import BookingPage from './pages/BookingPage'
// import Bookings from './pages/Bookings'
// import Footer from './components/Footer'
// Protected Route wrapper component
// const ProtectedRoute = ({ children }:any) => {
//   const id = localStorage.getItem('id')
  
//   if (!id) {
//     return <Navigate to="/signin" replace />
//   }
  
//   return children
// }

function App() {
  return (
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path="/login" element={<StudentLogin/>}/>
        <Route path="/" element={<Home />}/>
        <Route path="/id-card" element={<StudentIDCard/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App