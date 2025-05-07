import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { getallstudents } from '@/Config'
import Swal from 'sweetalert2'
import { StudentPreview, PaymentStatus, AdmissionType, CourseStatus } from '@/lib/Interfaces'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface FilterParams {
  name?: string;
  paymentStatus?: PaymentStatus | null;
  admissionType?: AdmissionType | null;
  courseStatus?: CourseStatus | null;
}

const AllStudentDetails = () => {
  const [students, setStudents] = useState<StudentPreview[]>([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalItems, setTotalItems] = useState(0)
  const [filters, setFilters] = useState<FilterParams>({
    name: '',
    paymentStatus: null,
    admissionType: null,
    courseStatus: null
  })
  const itemsPerPage = 9
  const navigate = useNavigate()

  const fetchStudents = async (page: number = currentPage, filterParams: FilterParams = filters) => {
    try {
      const token = localStorage.getItem('token') || 'hjj'
      if (!token) {
        navigate('/login')
        return
      }

      const skip = (page - 1) * itemsPerPage
      const limit = itemsPerPage

      // Remove null/undefined values from filter params
      const cleanFilters = Object.fromEntries(
        Object.entries(filterParams).filter(([, value]) => value !== null && value !== undefined && value !== '')
      )

      const response = await axios.post(getallstudents, {
        skip,
        limit,
        ...cleanFilters
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
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

    } catch (error: unknown) {
      console.error('Error fetching students:', error)
      if (error instanceof Error && typeof error === 'object' && 'response' in error &&
        error.response && typeof error.response === 'object' && 'status' in error.response &&
        error.response.status === 401) {
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

  useEffect(() => {
    fetchStudents()
  }, [navigate])

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
    fetchStudents(page)
  }

  const handleFilterChange = (key: keyof FilterParams, value: string | null) => {
    const newFilters = {
      ...filters,
      [key]: value
    }
    setFilters(newFilters)
    setCurrentPage(1) // Reset to first page when filter changes
    fetchStudents(1, newFilters)
  }

  const clearFilters = () => {
    const emptyFilters: FilterParams = {
      name: '',
      paymentStatus: null,
      admissionType: null,
      courseStatus: null
    }
    setFilters(emptyFilters)
    setCurrentPage(1) // Reset to first page when clearing filters
    fetchStudents(1, emptyFilters)
  }

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">All Students</h1>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Input
          type="text"
          placeholder="Search by name"
          value={filters.name}
          onChange={(e) => handleFilterChange('name', e.target.value)}
        />

        <Select
          value={filters.paymentStatus || 'all'}
          onValueChange={(value: string) => handleFilterChange('paymentStatus', value === 'all' ? null : value as PaymentStatus)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Payment Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Payment Status</SelectItem>
            <SelectItem value={PaymentStatus.SUCCESS}>SUCCESS</SelectItem>
            <SelectItem value={PaymentStatus.FAILED}>FAILED</SelectItem>
            <SelectItem value={PaymentStatus.PENDING}>PENDING</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={filters.admissionType || 'all'}
          onValueChange={(value: string) => handleFilterChange('admissionType', value === 'all' ? null : value as AdmissionType)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Admission Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Admission Types</SelectItem>
            <SelectItem value={AdmissionType.FRESH}>FRESH</SelectItem>
            <SelectItem value={AdmissionType.TOC}>TOC</SelectItem>
            <SelectItem value={AdmissionType.PART_ADMISSION}>PART ADMISSION</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={filters.courseStatus || 'all'}
          onValueChange={(value: string) => handleFilterChange('courseStatus', value === 'all' ? null : value as CourseStatus)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Course Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Course Status</SelectItem>
            <SelectItem value={CourseStatus.COMPLETED}>COMPLETED</SelectItem>
            <SelectItem value={CourseStatus.ONGOING}>ONGOING</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex justify-end mb-4">
        <Button
          variant="outline"
          onClick={clearFilters}
        >
          Clear Filters
        </Button>
      </div>

      <div className="rounded-md border mb-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Application Number</TableHead>
              <TableHead>Payment Status</TableHead>
              <TableHead>Admission Type</TableHead>
              <TableHead>Course Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {students.map((student) => (
              <TableRow key={student.id}>
                <TableCell className="font-medium">{student.name}</TableCell>
                <TableCell>{student.applicationNumber}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs ${student.paymentStatus === PaymentStatus.SUCCESS ? 'bg-green-100 text-green-800' :
                    student.paymentStatus === PaymentStatus.FAILED ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                    {student.paymentStatus}
                  </span>
                </TableCell>
                <TableCell>{student.admissionType}</TableCell>
                <TableCell>{student.courseStatus}</TableCell>
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