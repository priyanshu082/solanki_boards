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
import { PaymentStatus } from './components/payments/PaymentStatus'
import PaymentPage from './pages/Payments/PaymentPage'
import InstituteDocumentUpload from './pages/Institute/InstituteDocumentUpload'

// Protected Route wrapper component
const ProtectedRoute = ({ children }: any) => {
  const id = localStorage.getItem('id')
  
  if (!id) {
    return <Navigate to="/login" replace />
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
          <Route path="profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="accredited-certificate" element={<ProtectedRoute><Certificate /></ProtectedRoute>} />
          <Route path="sanctioned-letter" element={<ProtectedRoute><Letter /></ProtectedRoute>} />
          <Route path="/institute-document" element={<ProtectedRoute><InstituteDocumentUpload /></ProtectedRoute>} />

          <Route path="/pay" element={<ProtectedRoute><PaymentPage /></ProtectedRoute>} />
          
          {/* PhonePe callback handler */}
          <Route path="/payment/callback" element={<ProtectedRoute><PaymentCallback /></ProtectedRoute>} />
          
          {/* Success/Error pages */}
          <Route path="/payment/success" element={
            <ProtectedRoute>
              <PaymentStatus status="success" />
            </ProtectedRoute>
          } />
          <Route path="/payment/error" element={
            <ProtectedRoute>
              <PaymentStatus status="error" />
            </ProtectedRoute>
          } />
        </Route>
        <Route path="/login" element={<Auth />} />
       
        
        {/* Payment initiation page */}
        
      </Routes>
    </BrowserRouter>
  )
}

export default App