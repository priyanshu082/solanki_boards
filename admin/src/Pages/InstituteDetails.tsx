import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { getinstitutebyid, deleteinstitutebyid } from '@/Config'
import { InstituteDetails as InstituteDetailsType } from '@/lib/Interfaces'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Trash2 } from 'lucide-react'
import Swal from 'sweetalert2'

const InstituteDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [institute, setInstitute] = useState<InstituteDetailsType | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchInstituteDetails = async () => {
      try {
        const response = await axios.get(`${getinstitutebyid}/${id}`)
        setInstitute(response.data)
        setLoading(false)
        await Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Institute details loaded successfully',
          timer: 1500,
          showConfirmButton: false
        })
      } catch (error) {
        console.error('Error fetching institute details:', error)
        await Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to fetch institute details',
          confirmButtonColor: '#3085d6'
        })
        setLoading(false)
      }
    }

    if (id) {
      fetchInstituteDetails()
    }
  }, [id])

  const handleDelete = async () => {
    try {
      // First confirmation
      const firstResult = await Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!'
      })

      if (firstResult.isConfirmed) {
        // Second confirmation for double security
        const secondResult = await Swal.fire({
          title: 'Double check!',
          text: `Are you absolutely sure you want to delete ${institute?.centerName}?`,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#d33',
          cancelButtonColor: '#3085d6',
          confirmButtonText: 'Yes, I am certain!'
        })

        if (secondResult.isConfirmed) {
          await axios.delete(`${deleteinstitutebyid}/${id}`)
          await Swal.fire({
            icon: 'success',
            title: 'Deleted!',
            text: 'Institute has been deleted.',
            timer: 1500,
            showConfirmButton: false
          })
          navigate('/all-institutes')
        }
      }
    } catch (error) {
      console.error('Error deleting institute:', error)
      await Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to delete institute',
        confirmButtonColor: '#3085d6'
      })
    }
  }

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>
  }

  if (!institute) {
    return <div className="flex justify-center items-center min-h-screen">Institute not found</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-4xl mx-auto shadow-lg">
        <CardHeader className="flex flex-row justify-between items-center border-b pb-4">
          <CardTitle className="text-3xl font-bold text-primary">{institute.centerName}</CardTitle>
          <Button 
            variant="destructive" 
            onClick={handleDelete}
            className="flex items-center gap-2 text-white"
          >
            <Trash2 size={16} />
            Delete Institute
          </Button>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4 text-primary">Head Details</h3>
            <div className="space-y-3">
              <p className="flex items-center">
                <span className="font-medium w-24">Name:</span> 
                <span className="text-gray-700">{institute.headName}</span>
              </p>
              <p className="flex items-center">
                <span className="font-medium w-24">Email:</span> 
                <span className="text-gray-700">{institute.headEmailId}</span>
              </p>
              <p className="flex items-center">
                <span className="font-medium w-24">Mobile:</span> 
                <span className="text-gray-700">{institute.headMobileNumber}</span>
              </p>
            </div>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4 text-primary">Center Details</h3>
            <div className="space-y-3">
              <p className="flex items-center">
                <span className="font-medium w-24">Email:</span> 
                <span className="text-gray-700">{institute.centerEmailId}</span>
              </p>
              <p className="flex items-center">
                <span className="font-medium w-24">Phone:</span> 
                <span className="text-gray-700">{institute.centerPhoneNumber}</span>
              </p>
              <p className="flex items-center">
                <span className="font-medium w-24">Address:</span> 
                <span className="text-gray-700">{institute.centerAddress}</span>
              </p>
              <p className="flex items-center">
                <span className="font-medium w-24">City:</span> 
                <span className="text-gray-700">{institute.centerCity}</span>
              </p>
              <p className="flex items-center">
                <span className="font-medium w-24">State:</span> 
                <span className="text-gray-700">{institute.centerState}</span>
              </p>
              <p className="flex items-center">
                <span className="font-medium w-24">Pincode:</span> 
                <span className="text-gray-700">{institute.centerPincode}</span>
              </p>
              {institute.centerWebsiteUrl && (
                <p className="flex items-center">
                  <span className="font-medium w-24">Website:</span>
                  <a 
                    href={institute.centerWebsiteUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-blue-600 hover:underline"
                  >
                    {institute.centerWebsiteUrl}
                  </a>
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default InstituteDetails