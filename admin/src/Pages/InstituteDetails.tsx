import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { getinstitutebyid } from '@/Config'
import { InstituteDetails as InstituteDetailsType } from '@/lib/Interfaces'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ExternalLink } from 'lucide-react'
import Swal from 'sweetalert2'
import { format } from 'date-fns'
import { Table, TableHeader, TableBody, TableCell, TableRow, TableHead } from "@/components/ui/table"
import { Button } from "@/components/ui/button"

const InstituteDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [institute, setInstitute] = useState<InstituteDetailsType | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchInstituteDetails = async () => {
      try {
        const response = await axios.get(`${getinstitutebyid}/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        setInstitute(response.data)
        setLoading(false)
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

  // const handleDelete = async () => {
  //   try {
  //     const result = await Swal.fire({
  //       title: 'Are you sure?',
  //       text: "You won't be able to revert this!",
  //       icon: 'warning',
  //       showCancelButton: true,
  //       confirmButtonColor: '#d33',
  //       cancelButtonColor: '#3085d6',
  //       confirmButtonText: 'Yes, delete it!'
  //     })

  //     if (result.isConfirmed) {
  //       await axios.delete(`${deleteinstitutebyid}/${id}`)
  //       await Swal.fire({
  //         icon: 'success',
  //         title: 'Deleted!',
  //         text: 'Institute has been deleted.',
  //         timer: 1500,
  //         showConfirmButton: false
  //       })
  //       navigate('/all-institutes')
  //     }
  //   } catch (error) {
  //     console.error('Error deleting institute:', error)
  //     await Swal.fire({
  //       icon: 'error',
  //       title: 'Error',
  //       text: 'Failed to delete institute',
  //       confirmButtonColor: '#3085d6'
  //     })
  //   }
  // }

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>
  }

  if (!institute) {
    return <div className="flex justify-center items-center min-h-screen">Institute not found</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">{institute.centerName}</h1>
        {/* <Button
          variant="destructive"
          onClick={handleDelete}
          className="flex items-center gap-2"
        >
          <Trash2 size={16} />
          Delete Institute
        </Button> */}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Head Details */}
        <Card>
          <CardHeader>
            <CardTitle>Head Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Name</p>
                <p className="font-medium">{institute.headName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Father's Name</p>
                <p className="font-medium">{institute.headFatherName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Date of Birth</p>
                <p className="font-medium">{institute.headDob}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Gender</p>
                <p className="font-medium">{institute.headGender}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Aadhar Number</p>
                <p className="font-medium">{institute.headAadharNumber}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">PAN Card Number</p>
                <p className="font-medium">{institute.headPanCardNumber}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Mobile Number</p>
                <p className="font-medium">{institute.headMobileNumber}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium">{institute.headEmailId}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Center Details */}
        <Card>
          <CardHeader>
            <CardTitle>Center Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Center Code</p>
                <p className="font-medium">{institute.centerCode || '-'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Center Name</p>
                <p className="font-medium">{institute.centerName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium">{institute.centerEmailId}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p className="font-medium">{institute.centerPhoneNumber}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Website</p>
                {institute.centerWebsiteUrl ? (
                  <a
                    href={institute.centerWebsiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-blue-600 hover:underline flex items-center gap-1"
                  >
                    {institute.centerWebsiteUrl}
                    <ExternalLink size={14} />
                  </a>
                ) : (
                  <p className="font-medium">-</p>
                )}
              </div>
              <div>
                <p className="text-sm text-gray-500">Payment Status</p>
                <p className="font-medium">{institute.paymentStatus}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Head Address */}
        <Card>
          <CardHeader>
            <CardTitle>Head Address</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Address</p>
                <p className="font-medium">{institute.headAddress}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">City</p>
                <p className="font-medium">{institute.headCity}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">State</p>
                <p className="font-medium">{institute.headState || '-'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Union Territory</p>
                <p className="font-medium">{institute.headUnionTerritory || '-'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Country</p>
                <p className="font-medium">{institute.headCountry}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Pincode</p>
                <p className="font-medium">{institute.headPincode}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Center Address */}
        <Card>
          <CardHeader>
            <CardTitle>Center Address</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Address</p>
                <p className="font-medium">{institute.centerAddress}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">City</p>
                <p className="font-medium">{institute.centerCity}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">State</p>
                <p className="font-medium">{institute.centerState || '-'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Union Territory</p>
                <p className="font-medium">{institute.centerUnionTerritory || '-'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Country</p>
                <p className="font-medium">{institute.centerCountry}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Pincode</p>
                <p className="font-medium">{institute.centerPincode}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bank Details */}
        <Card>
          <CardHeader>
            <CardTitle>Bank Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Bank Name</p>
                <p className="font-medium">{institute.headBankName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Account Number</p>
                <p className="font-medium">{institute.headAccountNumber}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">IFSC Code</p>
                <p className="font-medium">{institute.headIfscCode}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Registeration Information */}
        <Card>
          <CardHeader>
            <CardTitle>Registeration Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Created At</p>
                <p className="font-medium">{institute.createdAt.toString().split('T')[0]}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Updated At</p>
                <p className="font-medium">{institute.updatedAt.toString().split('T')[0]}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Documents */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Documents</CardTitle>
        </CardHeader>
        <CardContent>
          {institute.documents.length > 0 ? (
            <div className="space-y-2">
              {institute.documents.map((doc) => (
                <div key={doc.id} className="flex items-center justify-between p-2 border rounded">
                  <div>
                    <p className="font-medium">{doc.fileName}</p>
                    <p className="text-sm text-gray-500">{doc.documentType}</p>
                  </div>
                  <a
                    href={doc.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    View
                  </a>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No documents uploaded</p>
          )}
        </CardContent>
      </Card>

      {/* Payments */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Payments</CardTitle>
        </CardHeader>
        <CardContent>
          {institute.payments.length > 0 ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Transaction ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {institute.payments.map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell>₹{payment.amount}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${payment.paymentStatus === 'SUCCESS' ? 'bg-green-100 text-green-800' :
                          payment.paymentStatus === 'FAILED' ? 'bg-red-100 text-red-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                          {payment.paymentStatus}
                        </span>
                      </TableCell>
                      <TableCell>{payment.paymentType}</TableCell>
                      <TableCell>{payment.merchantTransactionId}</TableCell>
                      <TableCell>{format(new Date(payment.createdAt), 'dd/MM/yyyy')}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="outline"
                          onClick={() => navigate(`/payment-details?id=${institute.id}&type=${payment.paymentType}`)}
                        >
                          View Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <p className="text-gray-500">No payments found</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default InstituteDetails