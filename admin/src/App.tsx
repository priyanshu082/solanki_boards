import './index.css'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import Login from './Pages/Login'
import Layout from './Layout'
import Home from './Pages/Home'
import AllInstituteDetails from './Pages/AllInstituteDetails'
import AllStudentDetails from './Pages/AllStudentDetails'
import CourseCreate from './Pages/CourseCreate'
import CreateSubject from './Pages/CreateSubject'
import Enquiry from './Pages/Enquiry'
import InstituteDetails from './Pages/InstituteDetails'
import NoticeUpdate from './Pages/NoticeUpdate'
import ResultUpload from './Pages/ResultUpload'
import StudentDetails from './Pages/StudentDetails'
import AllPaymentsDetails from './Pages/AllPaymentsDetails'
import { PaymentDetails } from './Pages/PaymentsDetails'
import ChangePassword from './Pages/ChangePassword'
import Admission from './Pages/Admission'
import StudentUploadDocuments from './Pages/StudentUploadDocuments'
import FeePayment from './Pages/FeePayment'
import InstituteRegistration from './Pages/InstituteRegisteration'
import InstituteUploadDocuments from './Pages/InsituteUploadDocuments'
import InstituteFeePayment from './Pages/InstituteFeePayment'

// Protected Route wrapper component
const ProtectedRoute = ({ children }: any) => {
  const id = localStorage.getItem('id')
  // const id = '1'

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
        <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
          <Route index element={<Home />} />
          <Route path="/all-institutes" element={<AllInstituteDetails />} />
          <Route path="/institute-registration" element={<InstituteRegistration />} />
          <Route path="/admission" element={<Admission />} />
          <Route path="/fee-payment" element={<FeePayment />} />
          <Route path="/all-payments" element={<AllPaymentsDetails />} />
          <Route path="/all-students" element={<AllStudentDetails />} />
          <Route path="/upload-documents" element={<StudentUploadDocuments />} />
          <Route path="/institute-upload-documents" element={<InstituteUploadDocuments />} />
          <Route path="/institute-fee-payment" element={<InstituteFeePayment />} />
          <Route path="/create-course" element={<CourseCreate />} />
          <Route path="/create-subject" element={<CreateSubject />} />
          <Route path="/enquiry" element={<Enquiry />} />
          <Route path="/institute-details/:id" element={<InstituteDetails />} />
          <Route path="/notice-update" element={<NoticeUpdate />} />
          <Route path="/result-upload/:id/:courseId" element={<ResultUpload />} />
          <Route path="/student-details/:id" element={<StudentDetails />} />
          <Route path="/payment-details" element={<PaymentDetails />} />
          <Route path="/change-password" element={<ChangePassword />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
