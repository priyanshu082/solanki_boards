import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { getinstitutebyid, updateInstitute, deleteInstitute } from '@/Config'
import { InstituteDetails as InstituteDetailsType } from '@/lib/Interfaces'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ExternalLink, Trash2 } from 'lucide-react'
import Swal from 'sweetalert2'
import { format } from 'date-fns'
import { Table, TableHeader, TableBody, TableCell, TableRow, TableHead } from "@/components/ui/table"
import { Button } from "@/components/ui/button"

// Define Gender enum locally for select
enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  OTHER = 'OTHER',
}

const InstituteDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [institute, setInstitute] = useState<InstituteDetailsType | null>(null)
  const [loading, setLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState<Partial<InstituteDetailsType> | null>(null)

  useEffect(() => {
    const fetchInstituteDetails = async () => {
      try {
        const response = await axios.get(`${getinstitutebyid}/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        setInstitute(response.data)
        setEditData(response.data)
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

  const handleDelete = async () => {
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!'
      })
      if (result.isConfirmed) {
        await axios.delete(`${deleteInstitute}/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        await Swal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: 'Institute has been deleted.',
          timer: 1500,
          showConfirmButton: false
        })
        navigate('/all-institutes')
      }
    } catch {
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

  const handleEditClick = () => {
    setIsEditing(true)
    setEditData(institute)
  }

  const handleEditChange = (field: string, value: string) => {
    setEditData({ ...editData, [field]: value })
  }

  const handleCancelEdit = () => {
    setIsEditing(false)
    setEditData(institute)
  }

  const handleEditSubmit = async () => {
    try {
      const token = localStorage.getItem('token') || ''
      const data = new FormData()
      // Add all fields as per schema
      const fields = [
        'applicationNumber',
        'headDob', 'headName', 'headFatherName', 'headAadharNumber', 'headPanCardNumber', 'headMobileNumber', 'headEmailId', 'headGender',
        'headAddress', 'headCity', 'headState', 'headUnionTerritory', 'headCountry', 'headPincode',
        'headBankName', 'headAccountNumber', 'headIfscCode',
        'centerCode', 'centerName', 'centerEmailId', 'centerWebsiteUrl', 'centerPhoneNumber',
        'centerAddress', 'centerCity', 'centerState', 'centerUnionTerritory', 'centerCountry', 'centerPincode',
        'documentId', 'documentType',
      ]
      fields.forEach(field => {
        if (editData && typeof editData[field as keyof typeof editData] !== 'undefined' && editData[field as keyof typeof editData] !== null) {
          data.append(field, String(editData[field as keyof typeof editData] ?? ''))
        }
      })
      await axios.put(updateInstitute, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      })
      setIsEditing(false)
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Institute details updated successfully',
        timer: 1500,
        showConfirmButton: false
      })
      // Refresh data
      const response = await axios.get(`${getinstitutebyid}/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      setInstitute(response.data)
      setEditData(response.data)
    } catch {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to update institute details',
        confirmButtonColor: '#3085d6'
      })
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">{institute.centerName}</h1>
        <div className="flex gap-2">
          <Button variant="outline" className='cursor-pointer' onClick={() => navigate('/all-institutes')}>Back to All Institutes</Button>
          {!isEditing && (
            <>
              <Button variant="outline" className='cursor-pointer' onClick={handleEditClick}>Edit</Button>
              <Button variant="destructive" className='cursor-pointer' onClick={handleDelete} size="icon" title="Delete Institute">
                <Trash2 className="h-5 w-5 text-white" />
              </Button>
            </>
          )}
          {isEditing && (
            <>
              <Button variant="default" className='cursor-pointer' onClick={handleEditSubmit}>Submit</Button>
              <Button variant="outline" className='cursor-pointer' onClick={handleCancelEdit}>Cancel</Button>
            </>
          )}
        </div>
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
                <p className="text-sm text-gray-500">Application Number</p>
                {isEditing ? (
                  <input
                    className="font-medium w-full border rounded px-2 py-1 bg-gray-100 cursor-not-allowed"
                    value={editData && editData.applicationNumber ? editData.applicationNumber : ''}
                    onChange={e => handleEditChange('applicationNumber', e.target.value)}
                    disabled={true}
                  />
                ) : <p className="font-medium">{institute.applicationNumber}</p>}
              </div>
              <div>
                <p className="text-sm text-gray-500">Name</p>
                {isEditing ? (
                  <input className="font-medium w-full border rounded px-2 py-1" value={editData && editData.headName ? editData.headName : ''} onChange={e => handleEditChange('headName', e.target.value)} />
                ) : <p className="font-medium">{institute.headName}</p>}
              </div>
              <div>
                <p className="text-sm text-gray-500">Father's Name</p>
                {isEditing ? (
                  <input className="font-medium w-full border rounded px-2 py-1" value={editData && editData.headFatherName ? editData.headFatherName : ''} onChange={e => handleEditChange('headFatherName', e.target.value)} />
                ) : <p className="font-medium">{institute.headFatherName}</p>}
              </div>
              <div>
                <p className="text-sm text-gray-500">Date of Birth</p>
                {isEditing ? (
                  <input type="date" className="font-medium w-full border rounded px-2 py-1" value={editData && editData.headDob ? editData.headDob.split('T')[0] : ''} onChange={e => handleEditChange('headDob', e.target.value)} />
                ) : <p className="font-medium">{institute.headDob}</p>}
              </div>
              <div>
                <p className="text-sm text-gray-500">Gender</p>
                {isEditing ? (
                  <select className="font-medium w-full border rounded px-2 py-1" value={editData && editData.headGender ? editData.headGender : ''} onChange={e => handleEditChange('headGender', e.target.value)}>
                    <option value="">Select Gender</option>
                    {Object.values(Gender).map(g => <option key={g} value={g}>{g}</option>)}
                  </select>
                ) : <p className="font-medium">{institute.headGender}</p>}
              </div>
              <div>
                <p className="text-sm text-gray-500">Aadhar Number</p>
                {isEditing ? (
                  <input className="font-medium w-full border rounded px-2 py-1" value={editData && editData.headAadharNumber ? editData.headAadharNumber : ''} onChange={e => handleEditChange('headAadharNumber', e.target.value)} />
                ) : <p className="font-medium">{institute.headAadharNumber}</p>}
              </div>
              <div>
                <p className="text-sm text-gray-500">PAN Card Number</p>
                {isEditing ? (
                  <input className="font-medium w-full border rounded px-2 py-1" value={editData && editData.headPanCardNumber ? editData.headPanCardNumber : ''} onChange={e => handleEditChange('headPanCardNumber', e.target.value)} />
                ) : <p className="font-medium">{institute.headPanCardNumber}</p>}
              </div>
              <div>
                <p className="text-sm text-gray-500">Mobile Number</p>
                {isEditing ? (
                  <input className="font-medium w-full border rounded px-2 py-1" value={editData && editData.headMobileNumber ? editData.headMobileNumber : ''} onChange={e => handleEditChange('headMobileNumber', e.target.value)} />
                ) : <p className="font-medium">{institute.headMobileNumber}</p>}
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                {isEditing ? (
                  <input type="email" className="font-medium w-full border rounded px-2 py-1" value={editData && editData.headEmailId ? editData.headEmailId : ''} onChange={e => handleEditChange('headEmailId', e.target.value)} />
                ) : <p className="font-medium">{institute.headEmailId}</p>}
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
                {isEditing ? (
                  <input
                    className="font-medium w-full border rounded px-2 py-1 bg-gray-100 cursor-not-allowed"
                    value={editData && editData.centerCode ? editData.centerCode : ''}
                    onChange={e => handleEditChange('centerCode', e.target.value)}
                    disabled={true}
                  />
                ) : <p className="font-medium">{institute.centerCode || '-'}</p>}
              </div>
              <div>
                <p className="text-sm text-gray-500">Center Name</p>
                {isEditing ? (
                  <input
                    className="font-medium w-full border rounded px-2 py-1"
                    value={editData && editData.centerName ? editData.centerName : ''}
                    onChange={e => handleEditChange('centerName', e.target.value)}
                  />
                ) : <p className="font-medium">{institute.centerName}</p>}
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                {isEditing ? (
                  <input
                    type="email"
                    className="font-medium w-full border rounded px-2 py-1"
                    value={editData && editData.centerEmailId ? editData.centerEmailId : ''}
                    onChange={e => handleEditChange('centerEmailId', e.target.value)}
                  />
                ) : <p className="font-medium">{institute.centerEmailId}</p>}
              </div>
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                {isEditing ? (
                  <input
                    className="font-medium w-full border rounded px-2 py-1"
                    value={editData && editData.centerPhoneNumber ? editData.centerPhoneNumber : ''}
                    onChange={e => handleEditChange('centerPhoneNumber', e.target.value)}
                  />
                ) : <p className="font-medium">{institute.centerPhoneNumber}</p>}
              </div>
              <div>
                <p className="text-sm text-gray-500">Website</p>
                {isEditing ? (
                  <input
                    type="url"
                    className="font-medium w-full border rounded px-2 py-1"
                    value={editData && editData.centerWebsiteUrl ? editData.centerWebsiteUrl : ''}
                    onChange={e => handleEditChange('centerWebsiteUrl', e.target.value)}
                  />
                ) : institute.centerWebsiteUrl ? (
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