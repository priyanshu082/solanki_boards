import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Layout from './Layout'
import RegisterStudent from './pages/Students/RegisterStudent'
import UploadDocuments from './pages/Students/UploadDocuments'
import ShowStudents from './pages/Students/ShowStudents'
import Profile from './pages/Profile'
import { Auth } from './pages/Login'
import Certificate from './pages/Certificate'
import Letter from './pages/Letter'
import { PaymentCallback } from './components/payments/PaymentCallback'
import { PaymentStatus } from './components/payments/PaymentStatus'
import PaymentPage from './pages/Payments/PaymentPage'

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
      <Routes>
        {/* Wrap pages with the Layout */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="register-student" element={<RegisterStudent />} />
          <Route path="upload-document" element={<UploadDocuments />} />
          <Route path="show-students" element={<ShowStudents />} />
          <Route path="profile" element={<Profile />} />
          <Route path="accredited-certificate" element={<Certificate />} />
          <Route path="sanctioned-letter" element={<Letter />} />



        <Route path="/pay" element={<PaymentPage />} />
        
        {/* PhonePe callback handler */}
        <Route path="/payment/callback" element={<PaymentCallback />} />
        
        {/* Success/Error pages */}
        <Route path="/payment/success" element={
          <PaymentStatus status="success" />
        } />
        <Route path="/payment/error" element={
          <PaymentStatus status="error" />
        } />
        </Route>
        <Route path="/login" element={<Auth />} />
        
        {/* Payment initiation page */}
        
      </Routes>
    </BrowserRouter>
  )
}

export default App