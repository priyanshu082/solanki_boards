import { useEffect, useState, ChangeEvent } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getstudentbyid, updateAdmission, deleteAdmission, getcoursebyid } from '@/Config'
import Swal from 'sweetalert2'
import { Button } from '@/components/ui/button'
import { InterfaceStudentDetails, ResultDetails, ResultStatus, IndianState, Country, ExaminationType, SubjectType, StudentCategory, Gender, BatchType, AdmissionType } from '@/lib/Interfaces'
import { format } from 'date-fns'
import { Table, TableHeader, TableBody, TableCell, TableRow, TableHead } from "@/components/ui/table"
import { Input } from '@/components/ui/input'
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select'
import { Trash2 } from 'lucide-react'

const StudentDetails = () => {
  const [student, setStudent] = useState<InterfaceStudentDetails | null>(null)
  const [results, setResults] = useState<ResultDetails[]>([])
  const [loading, setLoading] = useState(true)
  const [courseName, setCourseName] = useState<string>('')
  const { id } = useParams()
  const navigate = useNavigate()
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState<InterfaceStudentDetails | null>(null)
  const [editPhoto, setEditPhoto] = useState<File | null>(null)
  const [photoPreview, setPhotoPreview] = useState<string | null>(null)

  useEffect(() => {
    const fetchStudentDetails = async () => {
      try {
        const token = localStorage.getItem('token') || 'hjj'
        if (!token) {
          navigate('/login')
          return
        }

        const response = await axios.get(`${getstudentbyid}/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

        setStudent(response.data)
        setEditData(response.data)

        // Extract results if they exist in the response
        if (response.data.results && Array.isArray(response.data.results)) {
          setResults(response.data.results)
        }

        // Fetch course name if courseId exists
        if (response.data.courseId) {
          try {
            const courseResponse = await axios.get(`${getcoursebyid}/${response.data.courseId}`, {
              headers: {
                Authorization: `Bearer ${token}`
              }
            })
            setCourseName(courseResponse.data.name)
          } catch (error) {
            console.error('Error fetching course details:', error)
            setCourseName('Course not found')
          }
        }

        setLoading(false)
        await Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Student details loaded successfully',
          timer: 1500,
          showConfirmButton: false
        })
      } catch (error: unknown) {
        console.error('Error fetching student details:', error)
        const err = error as { response?: { status?: number } }
        if (err.response?.status === 401) {
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

    if (id) {
      fetchStudentDetails()
    }
  }, [id, navigate])

  const handleBackClick = () => {
    navigate('/all-students')
  }

  const handleEditClick = () => {
    setIsEditing(true)
    setEditData(student)
  }

  const handleCancelEdit = () => {
    setIsEditing(false)
    setEditData(null)
    setEditPhoto(null)
    setPhotoPreview(null)
  }

  const handleEditChange = <K extends keyof InterfaceStudentDetails>(field: K, value: InterfaceStudentDetails[K]) => {
    if (!editData) return
    setEditData({ ...editData, [field]: value })
  }

  const handleEditPhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setEditPhoto(file)
    if (file) {
      setPhotoPreview(URL.createObjectURL(file))
    } else {
      setPhotoPreview(null)
    }
  }

  const handleEditSubmit = async () => {
    if (!editData) return;
    try {
      const token = localStorage.getItem('token') || '';
      const data = new FormData();

      // Add the photo if updated
      if (editPhoto) {
        data.append('image', editPhoto);
      }

      // Helper to pick only allowed fields from an object
      const pickFields = (obj: { [key: string]: unknown }, allowed: string[]) => {
        const picked: { [key: string]: unknown } = {};
        allowed.forEach(key => {
          picked[key] = typeof obj[key] === 'undefined' ? (key === 'university' || key === 'division' ? '' : obj[key]) : obj[key];
        });
        return picked;
      };

      // Allowed fields for each nested object
      const addressFields = ['id', 'address', 'city', 'district', 'state', 'country', 'pincode'];
      const eduFields = ['examination', 'subjects', 'board', 'university', 'yearOfPassing', 'division', 'grade', 'percentage'];
      const lastExamFields = ['id', 'subjectType', 'subject', 'practicalMarks', 'assignmentMarks', 'theoryMarks', 'obtainedMarks', 'maximumMarks'];

      // Prepare addresses as single objects with only allowed fields
      const permanentAddress = editData.permanentAddress && editData.permanentAddress.length > 0
        ? pickFields(editData.permanentAddress[0] as unknown as { [key: string]: unknown }, addressFields)
        : undefined;
      const correspondenceAddress = editData.correspondenceAddress && editData.correspondenceAddress.length > 0
        ? pickFields(editData.correspondenceAddress[0] as unknown as { [key: string]: unknown }, addressFields)
        : undefined;

      // Prepare educationalQualifications as array of objects with only allowed fields
      const educationalQualifications = (editData.educationalQualifications || [])
        .map((eq, idx) => {
          const picked = pickFields(eq as unknown as { [key: string]: unknown }, eduFields);
          // Ensure university and division are always strings and not empty if original data has value
          const orig = student?.educationalQualifications?.[idx];
          // Fallback: use 'N/A' if both edited and original are empty
          picked.university = (typeof picked.university === 'string' && picked.university.trim() !== '')
            ? picked.university
            : (orig && typeof orig.university === 'string' && orig.university.trim() !== '' ? orig.university
              : 'N/A');
          picked.division = (typeof picked.division === 'string' && picked.division.trim() !== '')
            ? picked.division
            : (orig && typeof orig.division === 'string' && orig.division.trim() !== '' ? orig.division
              : 'N/A');
          return picked;
        });

      // Prepare lastPassedExam as a single object with only allowed fields
      const lastPassedExam = editData.lastPassedExam && editData.lastPassedExam.length > 0
        ? pickFields(editData.lastPassedExam[0] as unknown as { [key: string]: unknown }, lastExamFields)
        : undefined;

      // Build the update object strictly according to UpdateAdmission.ts
      const updateObj: { [key: string]: unknown } = {
        id: student?.id,
        admissionType: editData.admissionType,
        name: editData.name,
        dob: typeof editData.dob === 'string' && editData.dob
          ? (editData.dob as string).split('T')[0]
          : editData?.dob instanceof Date
            ? (editData.dob as Date).toISOString().split('T')[0]
            : '',
        fatherName: editData.fatherName,
        motherName: editData.motherName,
        category: editData.category,
        gender: editData.gender,
        nationality: editData.nationality,
        courseId: editData.courseId,
        batch: editData.batch,
        subjectIds: editData.subjectIds,
        phoneNumber: editData.phoneNumber,
        email: editData.email,
        permanentAddress,
        correspondenceAddress,
        educationalQualifications,
        lastPassedExam,
        instituteId: editData.instituteId,
      };

      // Remove any undefined fields
      Object.keys(updateObj).forEach(key => {
        if (updateObj[key] === undefined) {
          delete updateObj[key];
        }
      });

      // Append all fields to FormData as strings (except image)
      Object.entries(updateObj).forEach(([key, value]) => {
        if (value === undefined || value === null) return;
        if (typeof value === 'object') {
          data.append(key, JSON.stringify(value));
        } else {
          data.append(key, String(value));
        }
      });

      const response = await axios.put(updateAdmission, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      });

      setStudent(response.data);
      setIsEditing(false);
      setEditPhoto(null);
      setPhotoPreview(null);
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Student details updated successfully',
        timer: 1500,
        showConfirmButton: false
      });
    } catch (error: unknown) {
      const err = error as { response?: { status?: number, data?: { message?: string } } };
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: err.response?.data?.message || 'Failed to update student details',
        confirmButtonColor: '#3085d6'
      });
    }
  };

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
        await axios.delete(`${deleteAdmission}/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        await Swal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: 'Student has been deleted.',
          timer: 1500,
          showConfirmButton: false
        })
        navigate('/all-students')
      }
    } catch {
      await Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to delete student',
        confirmButtonColor: '#3085d6'
      })
    }
  }

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>
  }

  if (!student) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-6">Student Not Found</h1>
          <Button onClick={handleBackClick}>Back to All Students</Button>
        </div>
      </div>
    )
  }

  const formatDate = (date: Date) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Student Details</h1>
        <div className="flex gap-2">
          <Button variant="outline" className='cursor-pointer' onClick={handleBackClick}>Back to All Students</Button>
          {!isEditing && (
            <>
              <Button variant="outline" className='cursor-pointer' onClick={handleEditClick}>Edit</Button>
              <Button variant="destructive" className='cursor-pointer' onClick={handleDelete} size="icon" title="Delete Student">
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

      {/* Photo Section */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-2xl">Student Photo</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center gap-4">
            {isEditing ? (
              <>
                <div className="flex flex-col items-center gap-2">
                  <img
                    src={photoPreview || editData?.studentPhoto || ''}
                    alt="Preview"
                    className="w-48 h-48 object-cover rounded-lg border"
                  />
                  <input type="file" accept="image/*" onChange={handleEditPhotoChange} />
                </div>
              </>
            ) : (
              <>
                {student.studentPhoto ? (
                  <img
                    src={student.studentPhoto}
                    alt={`${student.name}'s photo`}
                    className="w-48 h-48 object-cover rounded-lg"
                  />
                ) : (
                  <div className="w-48 h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                    <span className="text-gray-500">No photo available</span>
                  </div>
                )}
              </>
            )}
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-2xl">Personal Information</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {isEditing ? (
            <>
              <div>
                <label className="font-semibold text-gray-700">Name</label>
                <Input value={editData?.name || ''} onChange={e => handleEditChange('name', e.target.value)} />
              </div>
              <div>
                <label className="font-semibold text-gray-700">Email</label>
                <Input value={editData?.email || ''} onChange={e => handleEditChange('email', e.target.value)} />
              </div>
              <div>
                <label className="font-semibold text-gray-700">Phone</label>
                <Input value={editData?.phoneNumber || ''} onChange={e => handleEditChange('phoneNumber', e.target.value)} />
              </div>
              <div>
                <label className="font-semibold text-gray-700">Date of Birth</label>
                <Input
                  type="date"
                  value={
                    typeof editData?.dob === 'string'
                      ? (editData.dob as string).split('T')[0]
                      : editData?.dob instanceof Date
                        ? (editData.dob as Date).toISOString().split('T')[0]
                        : ''
                  }
                  onChange={e => handleEditChange('dob', e.target.value as unknown as InterfaceStudentDetails['dob'])}
                />
              </div>
              <div>
                <label className="font-semibold text-gray-700">Gender</label>
                <Select value={editData?.gender || ''} onValueChange={val => handleEditChange('gender', val as InterfaceStudentDetails['gender'])}>
                  <SelectTrigger><SelectValue placeholder="Select Gender" /></SelectTrigger>
                  <SelectContent>
                    {Object.values(Gender).map(g => (
                      <SelectItem key={g} value={g}>{g.charAt(0) + g.slice(1).toLowerCase()}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="font-semibold text-gray-700">Father's Name</label>
                <Input value={editData?.fatherName || ''} onChange={e => handleEditChange('fatherName', e.target.value)} />
              </div>
              <div>
                <label className="font-semibold text-gray-700">Mother's Name</label>
                <Input value={editData?.motherName || ''} onChange={e => handleEditChange('motherName', e.target.value)} />
              </div>
              <div>
                <label className="font-semibold text-gray-700">Category</label>
                <Select value={editData?.category || ''} onValueChange={val => handleEditChange('category', val as InterfaceStudentDetails['category'])}>
                  <SelectTrigger><SelectValue placeholder="Select Category" /></SelectTrigger>
                  <SelectContent>
                    {Object.values(StudentCategory).map(c => (
                      <SelectItem key={c} value={c}>{c.replace('_', ' ')}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="font-semibold text-gray-700">Nationality</label>
                <Input value={editData?.nationality || ''} onChange={e => handleEditChange('nationality', e.target.value)} />
              </div>
            </>
          ) : (
            <>
              <div>
                <h3 className="font-semibold text-gray-700">Name</h3>
                <p>{student.name}</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-700">Email</h3>
                <p>{student.email}</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-700">Phone</h3>
                <p>{student.phoneNumber}</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-700">Date of Birth</h3>
                <p>{formatDate(student.dob)}</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-700">Gender</h3>
                <p>{student.gender}</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-700">Father's Name</h3>
                <p>{student.fatherName}</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-700">Mother's Name</h3>
                <p>{student.motherName}</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-700">Category</h3>
                <p>{student.category}</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-700">Nationality</h3>
                <p>{student.nationality}</p>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-2xl">Academic Information</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {isEditing ? (
            <>
              <div>
                <label className="font-semibold text-gray-700">Enrollment Number</label>
                <Input
                  value={editData?.enrollmentNumber || ''}
                  onChange={e => handleEditChange('enrollmentNumber', e.target.value)}
                  disabled={true}
                  className="bg-gray-100 cursor-not-allowed"
                />
              </div>
              <div>
                <label className="font-semibold text-gray-700">Application Number</label>
                <Input
                  value={editData?.applicationNumber || ''}
                  onChange={e => handleEditChange('applicationNumber', e.target.value)}
                  disabled={true}
                  className="bg-gray-100 cursor-not-allowed"
                />
              </div>
              <div>
                <label className="font-semibold text-gray-700">Course</label>
                <p>{isEditing ? (
                  <Input value={editData?.courseId || ''} onChange={e => handleEditChange('courseId', e.target.value)} />
                ) : (
                  courseName || student.courseId || 'Not assigned'
                )}</p>
              </div>
              <div>
                <label className="font-semibold text-gray-700">Institute ID</label>
                <Input value={editData?.instituteId || ''} onChange={e => handleEditChange('instituteId', e.target.value)} />
              </div>
              <div>
                <label className="font-semibold text-gray-700">Batch</label>
                <Select value={editData?.batch || ''} onValueChange={val => handleEditChange('batch', val as BatchType)}>
                  <SelectTrigger><SelectValue placeholder="Select Batch" /></SelectTrigger>
                  <SelectContent>
                    {Object.values(BatchType).map(b => (
                      <SelectItem key={b} value={b}>{b.charAt(0) + b.slice(1).toLowerCase()}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="font-semibold text-gray-700">Admission Type</label>
                <Select value={editData?.admissionType || ''} onValueChange={val => handleEditChange('admissionType', val as AdmissionType)}>
                  <SelectTrigger><SelectValue placeholder="Select Admission Type" /></SelectTrigger>
                  <SelectContent>
                    {Object.values(AdmissionType).map(a => (
                      <SelectItem key={a} value={a}>{a.replace('_', ' ')}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </>
          ) : (
            <>
              <div>
                <h3 className="font-semibold text-gray-700">Enrollment Number</h3>
                <p>{student.enrollmentNumber || 'Not assigned'}</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-700">Application Number</h3>
                <p>{student.applicationNumber}</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-700">Course</h3>
                <p>{courseName || student.courseId || 'Not assigned'}</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-700">Institute ID</h3>
                <p>{student.instituteId || 'Not assigned'}</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-700">Batch</h3>
                <p>{student.batch}</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-700">Admission Type</h3>
                <p>{student.admissionType}</p>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-2xl">Payment Information</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold text-gray-700">Payment Status</h3>
            <p>{student.paymentStatus}</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-700">Payment Amount</h3>
            <p>₹{student.paymentAmount}</p>
          </div>
        </CardContent>
      </Card>

      {results && results.length > 0 && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-2xl">Examination Results</CardTitle>
          </CardHeader>
          <CardContent>
            {results.map((result) => (
              <div key={result.id} className="mb-6 border-b pb-6 last:border-b-0 last:pb-0">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold">
                    {result.month} {result.year.replace('Y', '')} Examination
                  </h3>
                  <div className="flex items-center">
                    <span className="mr-2">Status:</span>
                    <span className={`px-2 py-1 rounded text-sm ${result.status === ResultStatus.PASS
                      ? 'bg-green-100 text-green-800'
                      : result.status === ResultStatus.FAIL
                        ? 'bg-red-100 text-red-800'
                        : 'bg-yellow-100 text-yellow-800'
                      }`}>
                      {result.status}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <h3 className="font-semibold text-gray-700">Total Marks</h3>
                    <p>{result.totalMarks}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-700">Obtained Marks</h3>
                    <p>{result.obtainedMarks}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-700">Percentage</h3>
                    <p>{((result.obtainedMarks / result.totalMarks) * 100).toFixed(2)}%</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-700">Date</h3>
                    <p>{formatDate(result.createdAt)}</p>
                  </div>
                </div>

                {result.details && result.details.length > 0 && (
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="border p-2 text-left">Subject Code</th>
                          <th className="border p-2 text-left">Subject Name</th>
                          <th className="border p-2 text-left">Total Marks</th>
                          <th className="border p-2 text-left">Obtained Marks</th>
                          <th className="border p-2 text-left">Grade</th>
                          <th className="border p-2 text-left">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {result.details.map((detail) => (
                          <tr key={detail.id}>
                            <td className="border p-2">{detail.code}</td>
                            <td className="border p-2">{detail.name}</td>
                            <td className="border p-2">{detail.totalMarks}</td>
                            <td className="border p-2">{detail.obtainedMarks}</td>
                            <td className="border p-2">{detail.grade}</td>
                            <td className="border p-2">
                              <span className={`px-2 py-1 rounded text-xs ${detail.status === ResultStatus.PASS
                                ? 'bg-green-100 text-green-800'
                                : detail.status === ResultStatus.FAIL
                                  ? 'bg-red-100 text-red-800'
                                  : 'bg-yellow-100 text-yellow-800'
                                }`}>
                                {detail.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Correspondence Address */}
      {((isEditing && editData?.correspondenceAddress && editData.correspondenceAddress.length > 0) || (!isEditing && student.correspondenceAddress && student.correspondenceAddress.length > 0)) && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-2xl">Correspondence Address</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {isEditing ? (
              editData?.correspondenceAddress?.map((address, idx) => (
                <div key={idx} className="col-span-2 border p-4 rounded-md">
                  <label>Address</label>
                  <Input value={address.address} onChange={e => {
                    const updated = [...editData.correspondenceAddress!]
                    updated[idx] = { ...address, address: e.target.value }
                    setEditData({ ...editData, correspondenceAddress: updated })
                  }} />
                  <label>City</label>
                  <Input value={address.city} onChange={e => {
                    const updated = [...editData.correspondenceAddress!]
                    updated[idx] = { ...address, city: e.target.value }
                    setEditData({ ...editData, correspondenceAddress: updated })
                  }} />
                  <label>District</label>
                  <Input value={address.district} onChange={e => {
                    const updated = [...editData.correspondenceAddress!]
                    updated[idx] = { ...address, district: e.target.value }
                    setEditData({ ...editData, correspondenceAddress: updated })
                  }} />
                  <label>State</label>
                  <Select value={address.state || ''} onValueChange={val => {
                    const updated = [...editData.correspondenceAddress!]
                    updated[idx] = { ...address, state: val as IndianState }
                    setEditData({ ...editData, correspondenceAddress: updated })
                  }}>
                    <SelectTrigger><SelectValue placeholder="Select State" /></SelectTrigger>
                    <SelectContent>
                      {Object.values(IndianState).map(s => (
                        <SelectItem key={s} value={s}>{s.replace('_', ' ')}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <label>Country</label>
                  <Select value={address.country || ''} onValueChange={val => {
                    const updated = [...editData.correspondenceAddress!]
                    updated[idx] = { ...address, country: val as Country }
                    setEditData({ ...editData, correspondenceAddress: updated })
                  }}>
                    <SelectTrigger><SelectValue placeholder="Select Country" /></SelectTrigger>
                    <SelectContent>
                      {Object.values(Country).map(c => (
                        <SelectItem key={c} value={c}>{c}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <label>Pincode</label>
                  <Input value={address.pincode} onChange={e => {
                    const updated = [...editData.correspondenceAddress!]
                    updated[idx] = { ...address, pincode: e.target.value }
                    setEditData({ ...editData, correspondenceAddress: updated })
                  }} />
                </div>
              ))
            ) : (
              student.correspondenceAddress?.map((address, index) => (
                <div key={index} className="col-span-2 border p-4 rounded-md">
                  <p>{address.address}</p>
                  <p>{address.city}, {address.district}</p>
                  <p>{address.state}, {address.country}</p>
                  <p>Pincode: {address.pincode}</p>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      )}

      {/* Permanent Address */}
      {((isEditing && editData?.permanentAddress && editData.permanentAddress.length > 0) || (!isEditing && student.permanentAddress && student.permanentAddress.length > 0)) && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-2xl">Permanent Address</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {isEditing ? (
              editData?.permanentAddress?.map((address, idx) => (
                <div key={idx} className="col-span-2 border p-4 rounded-md">
                  <label>Address</label>
                  <Input value={address.address} onChange={e => {
                    const updated = [...editData.permanentAddress!]
                    updated[idx] = { ...address, address: e.target.value }
                    setEditData({ ...editData, permanentAddress: updated })
                  }} />
                  <label>City</label>
                  <Input value={address.city} onChange={e => {
                    const updated = [...editData.permanentAddress!]
                    updated[idx] = { ...address, city: e.target.value }
                    setEditData({ ...editData, permanentAddress: updated })
                  }} />
                  <label>District</label>
                  <Input value={address.district} onChange={e => {
                    const updated = [...editData.permanentAddress!]
                    updated[idx] = { ...address, district: e.target.value }
                    setEditData({ ...editData, permanentAddress: updated })
                  }} />
                  <label>State</label>
                  <Select value={address.state || ''} onValueChange={val => {
                    const updated = [...editData.permanentAddress!]
                    updated[idx] = { ...address, state: val as IndianState }
                    setEditData({ ...editData, permanentAddress: updated })
                  }}>
                    <SelectTrigger><SelectValue placeholder="Select State" /></SelectTrigger>
                    <SelectContent>
                      {Object.values(IndianState).map(s => (
                        <SelectItem key={s} value={s}>{s.replace('_', ' ')}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <label>Country</label>
                  <Select value={address.country || ''} onValueChange={val => {
                    const updated = [...editData.permanentAddress!]
                    updated[idx] = { ...address, country: val as Country }
                    setEditData({ ...editData, permanentAddress: updated })
                  }}>
                    <SelectTrigger><SelectValue placeholder="Select Country" /></SelectTrigger>
                    <SelectContent>
                      {Object.values(Country).map(c => (
                        <SelectItem key={c} value={c}>{c}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <label>Pincode</label>
                  <Input value={address.pincode} onChange={e => {
                    const updated = [...editData.permanentAddress!]
                    updated[idx] = { ...address, pincode: e.target.value }
                    setEditData({ ...editData, permanentAddress: updated })
                  }} />
                </div>
              ))
            ) : (
              student.permanentAddress?.map((address, index) => (
                <div key={index} className="col-span-2 border p-4 rounded-md">
                  <p>{address.address}</p>
                  <p>{address.city}, {address.district}</p>
                  <p>{address.state}, {address.country}</p>
                  <p>Pincode: {address.pincode}</p>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      )}

      {/* Educational Qualifications */}
      {((isEditing && editData?.educationalQualifications && editData.educationalQualifications.length > 0) || (!isEditing && student.educationalQualifications && student.educationalQualifications.length > 0)) && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-2xl">Educational Qualifications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              {isEditing ? (
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border p-2 text-left">Examination</th>
                      <th className="border p-2 text-left">Subjects</th>
                      <th className="border p-2 text-left">Board/University</th>
                      <th className="border p-2 text-left">Year</th>
                      <th className="border p-2 text-left">Division/Grade</th>
                      <th className="border p-2 text-left">Percentage</th>
                    </tr>
                  </thead>
                  <tbody>
                    {editData?.educationalQualifications?.map((edu, idx) => (
                      <tr key={idx}>
                        <td className="border p-2">
                          <Input value={edu.examination} onChange={e => {
                            const updated = [...editData.educationalQualifications!]
                            updated[idx] = { ...edu, examination: e.target.value as ExaminationType }
                            setEditData({ ...editData, educationalQualifications: updated })
                          }} />
                        </td>
                        <td className="border p-2">
                          <Input value={edu.subjects} onChange={e => {
                            const updated = [...editData.educationalQualifications!]
                            updated[idx] = { ...edu, subjects: e.target.value }
                            setEditData({ ...editData, educationalQualifications: updated })
                          }} />
                        </td>
                        <td className="border p-2">
                          <Input value={edu.board || edu.university || ''} onChange={e => {
                            const updated = [...editData.educationalQualifications!]
                            updated[idx] = { ...edu, board: e.target.value }
                            setEditData({ ...editData, educationalQualifications: updated })
                          }} />
                        </td>
                        <td className="border p-2">
                          <Input value={edu.yearOfPassing} onChange={e => {
                            const updated = [...editData.educationalQualifications!]
                            updated[idx] = { ...edu, yearOfPassing: e.target.value }
                            setEditData({ ...editData, educationalQualifications: updated })
                          }} />
                        </td>
                        <td className="border p-2">
                          <Input value={edu.division || edu.grade || ''} onChange={e => {
                            const updated = [...editData.educationalQualifications!]
                            updated[idx] = { ...edu, division: e.target.value }
                            setEditData({ ...editData, educationalQualifications: updated })
                          }} />
                        </td>
                        <td className="border p-2">
                          <Input value={edu.percentage} onChange={e => {
                            const updated = [...editData.educationalQualifications!]
                            updated[idx] = { ...edu, percentage: Number(e.target.value) }
                            setEditData({ ...editData, educationalQualifications: updated })
                          }} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border p-2 text-left">Examination</th>
                      <th className="border p-2 text-left">Subjects</th>
                      <th className="border p-2 text-left">Board/University</th>
                      <th className="border p-2 text-left">Year</th>
                      <th className="border p-2 text-left">Division/Grade</th>
                      <th className="border p-2 text-left">Percentage</th>
                    </tr>
                  </thead>
                  <tbody>
                    {student.educationalQualifications?.map((edu, index) => (
                      <tr key={index}>
                        <td className="border p-2">{edu.examination}</td>
                        <td className="border p-2">{edu.subjects}</td>
                        <td className="border p-2">{edu.board || edu.university || 'N/A'}</td>
                        <td className="border p-2">{edu.yearOfPassing}</td>
                        <td className="border p-2">{edu.division || edu.grade || 'N/A'}</td>
                        <td className="border p-2">{edu.percentage}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Last Passed Exam */}
      {((isEditing && editData?.lastPassedExam && editData.lastPassedExam.length > 0) || (!isEditing && student.lastPassedExam && student.lastPassedExam.length > 0)) && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-2xl">Last Passed Exam Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              {isEditing ? (
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border p-2 text-left">Subject</th>
                      <th className="border p-2 text-left">Type</th>
                      <th className="border p-2 text-left">Theory Marks</th>
                      <th className="border p-2 text-left">Practical Marks</th>
                      <th className="border p-2 text-left">Assignment Marks</th>
                      <th className="border p-2 text-left">Obtained/Maximum</th>
                    </tr>
                  </thead>
                  <tbody>
                    {editData?.lastPassedExam?.map((exam, idx) => (
                      <tr key={idx}>
                        <td className="border p-2">
                          <Input value={exam.subject} onChange={e => {
                            const updated = [...editData.lastPassedExam!]
                            updated[idx] = { ...exam, subject: e.target.value }
                            setEditData({ ...editData, lastPassedExam: updated })
                          }} />
                        </td>
                        <td className="border p-2">
                          <Input value={exam.subjectType} onChange={e => {
                            const updated = [...editData.lastPassedExam!]
                            updated[idx] = { ...exam, subjectType: e.target.value as SubjectType }
                            setEditData({ ...editData, lastPassedExam: updated })
                          }} />
                        </td>
                        <td className="border p-2">
                          <Input value={exam.theoryMarks} onChange={e => {
                            const updated = [...editData.lastPassedExam!]
                            updated[idx] = { ...exam, theoryMarks: Number(e.target.value) }
                            setEditData({ ...editData, lastPassedExam: updated })
                          }} />
                        </td>
                        <td className="border p-2">
                          <Input value={exam.practicalMarks} onChange={e => {
                            const updated = [...editData.lastPassedExam!]
                            updated[idx] = { ...exam, practicalMarks: Number(e.target.value) }
                            setEditData({ ...editData, lastPassedExam: updated })
                          }} />
                        </td>
                        <td className="border p-2">
                          <Input value={exam.assignmentMarks} onChange={e => {
                            const updated = [...editData.lastPassedExam!]
                            updated[idx] = { ...exam, assignmentMarks: Number(e.target.value) }
                            setEditData({ ...editData, lastPassedExam: updated })
                          }} />
                        </td>
                        <td className="border p-2">
                          <Input value={`${exam.obtainedMarks}/${exam.maximumMarks}`} onChange={e => {
                            const [obtained, max] = e.target.value.split('/')
                            const updated = [...editData.lastPassedExam!]
                            updated[idx] = { ...exam, obtainedMarks: Number(obtained), maximumMarks: Number(max) }
                            setEditData({ ...editData, lastPassedExam: updated })
                          }} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border p-2 text-left">Subject</th>
                      <th className="border p-2 text-left">Type</th>
                      <th className="border p-2 text-left">Theory Marks</th>
                      <th className="border p-2 text-left">Practical Marks</th>
                      <th className="border p-2 text-left">Assignment Marks</th>
                      <th className="border p-2 text-left">Obtained/Maximum</th>
                    </tr>
                  </thead>
                  <tbody>
                    {student.lastPassedExam?.map((exam, index) => (
                      <tr key={index}>
                        <td className="border p-2">{exam.subject}</td>
                        <td className="border p-2">{exam.subjectType}</td>
                        <td className="border p-2">{exam.theoryMarks}</td>
                        <td className="border p-2">{exam.practicalMarks}</td>
                        <td className="border p-2">{exam.assignmentMarks}</td>
                        <td className="border p-2">{exam.obtainedMarks}/{exam.maximumMarks}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {student.documents && student.documents.length > 0 && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-2xl">Documents</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {student.documents.map((doc, index) => (
              <div key={index} className="border p-4 rounded-md">
                <h3 className="font-semibold">{String(doc.documentType).replace("_", " ")}</h3>
                <p className="text-sm text-gray-600">{doc.fileName}</p>
                <p className="text-xs text-gray-500">Uploaded: {formatDate(doc.createdAt)}</p>
                <a
                  href={doc.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline mt-2 inline-block"
                >
                  View Document
                </a>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Payments */}
      <Card>
        <CardHeader>
          <CardTitle className='text-2xl'>Payments</CardTitle>
        </CardHeader>
        <CardContent>
          {student.payments && student.payments.length > 0 ? (
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
                  {student.payments.map((payment) => (
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
                          onClick={() => navigate(`/payment-details?id=${student.id}&type=${payment.paymentType}`)}
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

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-2xl">Registration Information</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold text-gray-700">Created At</h3>
            <p>{formatDate(student.createdAt)}</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-700">Last Updated</h3>
            <p>{formatDate(student.updatedAt)}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default StudentDetails