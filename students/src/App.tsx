// import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import StudentIDCard from './pages/IDCard'
import StudentLogin from './pages/Login'
import Layout from './Layout'; // Import Layout component
import Result from './pages/Result';
import PaymentPage from './pages/Payment';
import { PaymentDetails } from './pages/PaymentDetails';
// Protected Route wrapper component

const ProtectedRoute = ({ children }: any) => {
  const id = localStorage.getItem('id')
  const paymentStatus = localStorage.getItem('paymentStatus')

  if (!id) {
    return <Navigate to="/login" replace />
  }

  //Redirect to payment page if payment is pending
  if (paymentStatus !== 'SUCCESS' && window.location.pathname !== '/payment') {
    return <Navigate to="/payment-initiate" replace />
  }

  return children
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<StudentLogin />} />
        <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
          <Route index element={<Home />} />
          <Route path="/id-card" element={<StudentIDCard />} />
          <Route path="/result" element={<Result />} />
          <Route path="/payment-initiate" element={<PaymentPage />} />
          <Route path="/payment" element={<PaymentDetails />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App