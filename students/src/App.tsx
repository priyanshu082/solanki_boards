import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import Home from './pages/Home'

import Navbar from './components/Navbar'
import StudentIDCard from './pages/IDCard'
import StudentLogin from './pages/Login'

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
        <Route path="/login" element={<StudentLogin />} />
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/id-card" element={<ProtectedRoute><StudentIDCard /></ProtectedRoute>} />
      </Routes>
      <Navbar />
    </BrowserRouter>
  )
}

export default App