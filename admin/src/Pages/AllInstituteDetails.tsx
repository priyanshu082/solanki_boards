import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getallinstitute } from '@/Config'
import Swal from 'sweetalert2'
import { InstitutePreview } from '@/lib/Interfaces'
import { Button } from '@/components/ui/button'

const AllInstituteDetails = () => {
  const [institutes, setInstitutes] = useState<InstitutePreview[]>([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalItems, setTotalItems] = useState(0)
  const itemsPerPage = 9
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
          limit
        })
        
        console.log(response.data)
        
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
        
      } catch (error: any) {
        console.error('Error fetching institutes:', error)
        if (error.response?.status === 401) {
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
  }, [navigate, currentPage])

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

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">All Institutes</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {institutes.map((institute) => (
          <Card 
            key={institute.id}
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => handleInstituteClick(institute.id)}
          >
            <CardHeader>
              <CardTitle className="text-xl">{institute.centerName}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">{institute.centerAddress}</p>
              <p className="text-gray-600">Contact: {institute.centercode}</p>
            </CardContent>
          </Card>
        ))}
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