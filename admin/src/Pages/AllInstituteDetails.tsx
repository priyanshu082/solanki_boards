import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { getallinstitute } from '@/Config'
import Swal from 'sweetalert2'
import { InstitutePreview, PaymentStatus } from '@/lib/Interfaces'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface FilterParams {
  searchQuery: string;
  paymentStatus?: PaymentStatus | null;
}

const AllInstituteDetails = () => {
  const [institutes, setInstitutes] = useState<InstitutePreview[]>([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalItems, setTotalItems] = useState(0)
  const [filters, setFilters] = useState<FilterParams>({
    searchQuery: '',
    paymentStatus: null
  })
  const itemsPerPage = 10
  const navigate = useNavigate()

  useEffect(() => {
    const fetchInstitutes = async () => {
      try {
        const token = localStorage.getItem('token') || 'hjj'
        if (!token) {
          navigate('/login')
          return
        }

        const skip = (currentPage - 1) * itemsPerPage
        const limit = itemsPerPage

        const response = await axios.post(getallinstitute, {
          skip,
          limit,
          ...(filters.paymentStatus && { paymentStatus: filters.paymentStatus })
        }, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

        if (response.data.institutes) {
          setInstitutes(response.data.institutes)
          setTotalItems(response.data.total || response.data.institutes.length)
          setTotalPages(Math.ceil((response.data.total || response.data.institutes.length) / itemsPerPage))
        } else {
          setInstitutes(response.data)
          setTotalItems(response.data.length)
          setTotalPages(Math.ceil(response.data.length / itemsPerPage))
        }

        setLoading(false)

      } catch (error: unknown) {
        console.error('Error fetching institutes:', error)
        if (error instanceof Error && 'response' in error && (error as { response?: { status?: number } }).response?.status === 401) {
          navigate('/login')
          return
        }
        await Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to fetch institute details',
          confirmButtonColor: '#3085d6'
        })
        setLoading(false)
      }
    }

    fetchInstitutes()
  }, [navigate, currentPage, filters.paymentStatus])

  const handleInstituteClick = async (id: string) => {
    const token = localStorage.getItem('token') || 'hjj'
    if (!token) {
      navigate('/login')
      return
    }

    await Swal.fire({
      title: 'Navigating...',
      text: 'Taking you to institute details',
      timer: 1000,
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading()
      }
    })
    navigate(`/institute-details/${id}`)
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleFilterChange = (key: keyof FilterParams, value: string | null) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }))
    setCurrentPage(1) // Reset to first page when filter changes
  }

  const clearFilters = () => {
    setFilters({
      searchQuery: '',
      paymentStatus: null
    })
    setCurrentPage(1) // Reset to first page when clearing filters
  }

  const filteredInstitutes = institutes.filter(institute => {
    const searchLower = filters.searchQuery.toLowerCase()
    return (
      institute.centerCode?.toLowerCase().includes(searchLower) ||
      institute.centerName.toLowerCase().includes(searchLower) ||
      institute.headName.toLowerCase().includes(searchLower) ||
      institute.centerCity.toLowerCase().includes(searchLower) ||
      institute.centerState?.toLowerCase().includes(searchLower)
    )
  })

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">All Institutes</h1>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <Input
          type="text"
          placeholder="Search institutes..."
          value={filters.searchQuery}
          onChange={(e) => handleFilterChange('searchQuery', e.target.value)}
          className="max-w-md"
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
      </div>

      <div className="flex justify-end mb-4">
        <Button
          variant="outline"
          onClick={clearFilters}
        >
          Clear Filters
        </Button>
      </div>

      {/* Table */}
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Center Code</TableHead>
              <TableHead>Center Name</TableHead>
              <TableHead>Head Name</TableHead>
              <TableHead>City</TableHead>
              <TableHead>State</TableHead>
              <TableHead>Payment Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredInstitutes.map((institute) => (
              <TableRow key={institute.id}>
                <TableCell>{institute.centerCode || '-'}</TableCell>
                <TableCell>{institute.centerName}</TableCell>
                <TableCell>{institute.headName}</TableCell>
                <TableCell>{institute.centerCity}</TableCell>
                <TableCell>{institute.centerState ? institute.centerState.replace("_", " ") : "-"}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs ${institute.paymentStatus === PaymentStatus.SUCCESS ? 'bg-green-100 text-green-800' :
                    institute.paymentStatus === PaymentStatus.FAILED ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                    {institute.paymentStatus}
                  </span>
                </TableCell>
                <TableCell>
                  <Button
                    variant="outline"
                    onClick={() => handleInstituteClick(institute.id)}
                  >
                    View Details
                  </Button>
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
        Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} institutes
      </div>
    </div>
  )
}

export default AllInstituteDetails