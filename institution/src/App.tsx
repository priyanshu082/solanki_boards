import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Layout from './Layout'
import RegisterStudent from './pages/Students/RegisterStudent'
import UploadDocuments from './pages/Students/UploadDocuments'
import ShowStudents from './pages/Students/ShowStudents'
import Profile from './pages/Institute/Profile'
import { Auth } from './pages/Login'
import Certificate from './pages/Institute/Certificate'
import Letter from './pages/Institute/Letter'
import { PaymentCallback } from './components/payments/PaymentCallback'
import { PaymentDetails } from './pages/Payments/PaymentDetails'
import PaymentPageStudent from './pages/Payments/PaymentPageStudent'
import InstituteDocumentUpload from './pages/Institute/InstituteDocumentUpload'
import PaymentPageInstitute from './pages/Payments/PaymentPageInstitute'
import StudentDetails from './pages/Students/StudentDetails'
import ShowPayments from './pages/Payments/ShowPayments'

// Protected Route wrapper component
const ProtectedRoute = ({ children }: any) => {
  const id = localStorage.getItem('id')
  const paymentStatus = localStorage.getItem('paymentStatus')

  if (!id) {
    return <Navigate to="/login" replace />
  }

  //Redirect to payment page if payment is pending
  if (paymentStatus !== 'SUCCESS' && window.location.pathname !== '/payment-institute') {
    return <Navigate to="/payment-institute" replace />
  }

  return children
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Wrap pages with the Layout */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="register-student" element={<ProtectedRoute><RegisterStudent /></ProtectedRoute>} />
          <Route path="upload-document" element={<ProtectedRoute><UploadDocuments /></ProtectedRoute>} />
          <Route path="show-students" element={<ProtectedRoute><ShowStudents /></ProtectedRoute>} />
          <Route path="/student-details/:id" element={<ProtectedRoute><StudentDetails /></ProtectedRoute>} />
          <Route path="profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="accredited-certificate" element={<ProtectedRoute><Certificate /></ProtectedRoute>} />
          <Route path="sanctioned-letter" element={<ProtectedRoute><Letter /></ProtectedRoute>} />
          <Route path="/institute-document" element={<ProtectedRoute><InstituteDocumentUpload /></ProtectedRoute>} />

          <Route path="/payment-student" element={<ProtectedRoute><PaymentPageStudent /></ProtectedRoute>} />
          <Route path="/payment-institute" element={<ProtectedRoute><PaymentPageInstitute /></ProtectedRoute>} />
          <Route path="/show-payments" element={<ProtectedRoute>< ShowPayments/></ProtectedRoute>} />

          {/* PhonePe callback handler */}
          <Route path="/payment/callback" element={<ProtectedRoute><PaymentCallback /></ProtectedRoute>} />
        </Route>
        <Route path="/payment" element={<PaymentDetails />} />
        <Route path="/login" element={<Auth />} />


        {/* Payment initiation page */}

      </Routes>
    </BrowserRouter>
  )
}

export default App