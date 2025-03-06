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

// Protected Route wrapper component
const ProtectedRoute = ({ children }: any) => {
  // const id = localStorage.getItem('id')
  
  // if (!id) {
  //   return <Navigate to="/login" replace />
  // }
  
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
          <Route path="/all-students" element={<AllStudentDetails />} />
          <Route path="/create-course" element={<CourseCreate />} />
          <Route path="/create-subject" element={<CreateSubject />} />
          <Route path="/enquiry" element={<Enquiry />} />
          <Route path="/institute-details/:id" element={<InstituteDetails />} />
          <Route path="/notice-update" element={<NoticeUpdate />} />
          <Route path="/result-upload" element={<ResultUpload />} />
          <Route path="/student-details/:id" element={<StudentDetails />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
