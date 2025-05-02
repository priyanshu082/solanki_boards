import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getStudentDetailsUrl } from '@/Config'
import Swal from 'sweetalert2'
import { Button } from '@/components/ui/button'
import { InterfaceStudentDetails, ResultDetails, ResultStatus } from '@/lib/Interfaces'
import { format } from 'date-fns'
import { Table, TableHeader, TableBody, TableCell, TableRow, TableHead } from "@/components/ui/table"

const StudentDetails = () => {
    const [student, setStudent] = useState<InterfaceStudentDetails | null>(null)
    const [results, setResults] = useState<ResultDetails[]>([])
    const [loading, setLoading] = useState(true)
    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        const fetchStudentDetails = async () => {
            try {
                const token = localStorage.getItem('token')
                if (!token) {
                    navigate('/login')
                    return
                }

                const response = await axios.get(`${getStudentDetailsUrl}/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })

                setStudent(response.data)

                // Extract results if they exist in the response
                if (response.data.results && Array.isArray(response.data.results)) {
                    setResults(response.data.results)
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
                if (error instanceof Error && 'response' in error &&
                    typeof error.response === 'object' &&
                    error.response !== null &&
                    'status' in error.response &&
                    error.response.status === 401) {
                    navigate('/login')
                    return
                }
                await Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: error instanceof Error ? error.message : 'Failed to fetch student details',
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
                <Button onClick={handleBackClick}>Back to All Students</Button>
            </div>

            {/* Photo Section */}
            <Card className="mb-6">
                <CardHeader>
                    <CardTitle className="text-2xl">Student Photo</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex justify-center">
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
                    </div>
                </CardContent>
            </Card>

            <Card className="mb-6">
                <CardHeader>
                    <CardTitle className="text-2xl">Personal Information</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                </CardContent>
            </Card>

            <Card className="mb-6">
                <CardHeader>
                    <CardTitle className="text-2xl">Academic Information</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <h3 className="font-semibold text-gray-700">Enrollment Number</h3>
                        <p>{student.enrollmentNumber || 'Not assigned'}</p>
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-700">Application Number</h3>
                        <p>{student.applicationNumber}</p>
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-700">Course ID</h3>
                        <p>{student.courseId}</p>
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

            {student.correspondenceAddress && student.correspondenceAddress.length > 0 && (
                <Card className="mb-6">
                    <CardHeader>
                        <CardTitle className="text-2xl">Correspondence Address</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {student.correspondenceAddress.map((address, index) => (
                            <div key={index} className="col-span-2 border p-4 rounded-md">
                                <p>{address.address}</p>
                                <p>{address.city}, {address.district}</p>
                                <p>{address.state}, {address.country}</p>
                                <p>Pincode: {address.pincode}</p>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            )}

            {student.permanentAddress && student.permanentAddress.length > 0 && (
                <Card className="mb-6">
                    <CardHeader>
                        <CardTitle className="text-2xl">Permanent Address</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {student.permanentAddress.map((address, index) => (
                            <div key={index} className="col-span-2 border p-4 rounded-md">
                                <p>{address.address}</p>
                                <p>{address.city}, {address.district}</p>
                                <p>{address.state}, {address.country}</p>
                                <p>Pincode: {address.pincode}</p>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            )}

            {student.educationalQualifications && student.educationalQualifications.length > 0 && (
                <Card className="mb-6">
                    <CardHeader>
                        <CardTitle className="text-2xl">Educational Qualifications</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
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
                                    {student.educationalQualifications.map((edu, index) => (
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
                        </div>
                    </CardContent>
                </Card>
            )}

            {student.lastPassedExam && student.lastPassedExam.length > 0 && (
                <Card className="mb-6">
                    <CardHeader>
                        <CardTitle className="text-2xl">Last Passed Exam Details</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
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
                                    {student.lastPassedExam.map((exam, index) => (
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