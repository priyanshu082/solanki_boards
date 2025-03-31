import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { getallstudents } from '@/Config'
import Swal from 'sweetalert2'
import { StudentPreview } from '@/lib/Interfaces'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const AllStudentDetails = () => {
  const [students, setStudents] = useState<StudentPreview[]>([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalItems, setTotalItems] = useState(0)
  const itemsPerPage = 9
  const navigate = useNavigate()

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const token = localStorage.getItem('token') || 'hjj'
        if (!token) {
          navigate('/login')
          return
        }

        const skip = (currentPage - 1) * itemsPerPage
        const limit = itemsPerPage

        const response = await axios.post(getallstudents, {
          skip,
          limit
        })
        
        if (response.data.students) {
          setStudents(response.data.students)
          setTotalItems(response.data.total || response.data.students.length)
          setTotalPages(Math.ceil((response.data.total || response.data.students.length) / itemsPerPage))
        } else {
          setStudents(response.data)
          setTotalItems(response.data.length)
          setTotalPages(Math.ceil(response.data.length / itemsPerPage))
        }
        
        setLoading(false)
        
      } catch (error: any) {
        console.error('Error fetching students:', error)
        if (error.response?.status === 401) {
          navigate('/login')
          return
        }
        await Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to fetch student details',
          confirmButtonColor: '#3085d6'
        })
        setLoading(false)
      }
    }

    fetchStudents()
  }, [navigate, currentPage])

  const handleStudentClick = async (id: string) => {
    const token = localStorage.getItem('token') || 'hjj'
    if (!token) {
      navigate('/login')
      return
    }

    await Swal.fire({
      title: 'Navigating...',
      text: 'Taking you to student details',
      timer: 1000,
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading()
      }
    })
    navigate(`/student-details/${id}`)
  }

  const handleResultUpload = (studentId: string, courseId: string) => {
    navigate(`/result-upload/${studentId}/${courseId}`)
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">All Students</h1>
      
      <div className="rounded-md border mb-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Enrollment Number</TableHead>
              <TableHead>Application Number</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {students.map((student) => (
              <TableRow key={student.id}>
                <TableCell className="font-medium">{student.name}</TableCell>
                <TableCell>{student.enrollmentNumber || 'Not assigned'}</TableCell>
                <TableCell>{student.applicationNumber}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button 
                      variant="outline" 
                      onClick={() => handleStudentClick(student.id)}
                    >
                      View Details
                    </Button>
                    <Button 
                      variant="default" 
                      onClick={() => handleResultUpload(student.id, student.courseId)}
                    >
                      Upload Result
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      {/* Pagination Controls */}
      <div className="flex justify-center mt-8 gap-2">
        <Button 
          variant="outline" 
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <Button
            key={page}
            variant={currentPage === page ? "default" : "outline"}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </Button>
        ))}
        
        <Button 
          variant="outline" 
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>
      <div className="text-center mt-2 text-sm text-gray-500">
        Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} students
      </div>
    </div>
  )
}

export default AllStudentDetails