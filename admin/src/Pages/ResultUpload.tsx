import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Month, Year, ResultStatus, Grade, InterfaceStudentDetails, SubjectPreview, ResultDetails } from '@/lib/Interfaces'
import Swal from 'sweetalert2'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { getallstudents, uploadresult, updateResult, deleteResult, getallsubject, getcoursebyid } from '@/Config'
import { Pencil1Icon } from '@radix-ui/react-icons'
import { Trash2 } from 'lucide-react'

interface SubjectResult {
  code: string
  name: string
  totalMarks: number
  obtainedMarks: number
  grade: Grade
  status: ResultStatus
}

// interface Course {
//   id: string
//   name: string
//   subjects: SubjectPreview[]
// }

const ResultUpload = () => {
  const { id, courseId } = useParams<{ id: string, courseId: string }>()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [studentData, setStudentData] = useState<InterfaceStudentDetails | null>(null)
  const [courseName, setCourseName] = useState<string>('')
  const [month, setMonth] = useState<Month>(Month.JANUARY)
  const [year, setYear] = useState<Year>(Year.Y2023)
  const [totalMarks, setTotalMarks] = useState<number>(0)
  const [obtainedMarks, setObtainedMarks] = useState<number>(0)
  const [status, setStatus] = useState<ResultStatus>(ResultStatus.PASS)
  const [subjectResults, setSubjectResults] = useState<SubjectResult[]>([])
  const [results, setResults] = useState<ResultDetails[]>([])
  const [editingResultId, setEditingResultId] = useState<string | null>(null)
  const [selectedSubjects, setSelectedSubjects] = useState<SubjectPreview[]>([])

  useEffect(() => {
    const fetchData = async () => {
      if (!id || !courseId) return

      try {
        setLoading(true)
        const token = localStorage.getItem('token') || 'hjj'
        if (!token) {
          navigate('/login')
          return
        }

        // Fetch student data
        const studentResponse = await axios.post(getallstudents, {
          id,
          skip: 0,
          limit: 4
        }, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

        if (studentResponse.data && studentResponse.data[0]) {
          const student = studentResponse.data[0]
          setStudentData(student)
          // Extract results if they exist in the response
          if (student.results && Array.isArray(student.results)) {
            setResults(student.results)
          }

          // Fetch course name
          try {
            const courseResponse = await axios.get(`${getcoursebyid}/${courseId}`, {
              headers: {
                Authorization: `Bearer ${token}`
              }
            })
            if (courseResponse.data && courseResponse.data.name) {
              setCourseName(courseResponse.data.name)
            }
          } catch (error) {
            console.error('Error fetching course details:', error)
            setCourseName('Course not found')
          }

          // Fetch subjects only after student data is loaded
          if (student.subjectIds && student.subjectIds.length > 0) {
            try {
              const subjectResponse = await axios.post(`${getallsubject}`, {
                subjectIds: student.subjectIds
              }, {
                headers: {
                  Authorization: `Bearer ${token}`
                }
              })

              if (subjectResponse.data && subjectResponse.data.length > 0) {
                setSelectedSubjects(subjectResponse.data as SubjectPreview[]);
                const initialSubjectResults = (subjectResponse.data as SubjectPreview[]).map((subject: SubjectPreview) => ({
                  code: subject.code,
                  name: subject.name,
                  totalMarks: 100,
                  obtainedMarks: 0,
                  grade: Grade.A,
                  status: ResultStatus.PASS
                }));

                setSubjectResults(initialSubjectResults);
                calculateTotalMarks(initialSubjectResults);
              }
            } catch (error) {
              console.error('Error fetching course data:', error)
              Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to fetch course data',
                confirmButtonColor: '#3085d6'
              })
            }
          }
        }

        setLoading(false)
      } catch (error) {
        console.error('Error fetching student data:', error)
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to fetch student data',
          confirmButtonColor: '#3085d6'
        })
        setLoading(false)
      }
    }

    fetchData()
  }, [id, navigate])

  const handleUpdateSubject = (index: number, field: keyof SubjectResult, value: string | number | Grade | ResultStatus) => {
    const updatedSubjects = [...subjectResults];
    updatedSubjects[index] = {
      ...updatedSubjects[index],
      [field]: value
    };
    setSubjectResults(updatedSubjects);
    calculateTotalMarks(updatedSubjects);
  }

  const calculateTotalMarks = (subjects: SubjectResult[]) => {
    let total = 0;
    let obtained = 0;

    subjects.forEach(subject => {
      total += subject.totalMarks;
      obtained += subject.obtainedMarks;
    });

    setTotalMarks(total);
    setObtainedMarks(obtained);

    // Determine overall status
    if (subjects.length > 0) {
      const failedSubjects = subjects.filter(s => s.status === ResultStatus.FAIL);
      if (failedSubjects.length > 0) {
        setStatus(ResultStatus.FAIL);
      } else {
        setStatus(ResultStatus.PASS);
      }
    }
  }

  const handleEditResult = (result: ResultDetails) => {
    setEditingResultId(result.id)
    setMonth(result.month as Month)
    setYear(result.year as Year)
    setTotalMarks(result.totalMarks)
    setObtainedMarks(result.obtainedMarks)
    setStatus(result.status as ResultStatus)
    setSubjectResults(result.details.map((detail) => ({
      code: detail.code,
      name: detail.name,
      totalMarks: detail.totalMarks,
      obtainedMarks: detail.obtainedMarks,
      grade: detail.grade as Grade,
      status: detail.status as ResultStatus
    })))
  }

  const resetForm = () => {
    setEditingResultId(null)
    setMonth(Month.JANUARY)
    setYear(Year.Y2023)
    setTotalMarks(0)
    setObtainedMarks(0)
    setStatus(ResultStatus.PASS)
    setSubjectResults(selectedSubjects.map((subject: SubjectPreview) => ({
      code: subject.code,
      name: subject.name,
      totalMarks: 100,
      obtainedMarks: 0,
      grade: Grade.A,
      status: ResultStatus.PASS
    })) || [])
  }

  const fetchStudentResults = async () => {
    if (!id) return
    try {
      const token = localStorage.getItem('token') || 'hjj'
      const studentResponse = await axios.post(getallstudents, {
        id,
        skip: 0,
        limit: 4
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      if (studentResponse.data && studentResponse.data[0] && studentResponse.data[0].results) {
        setResults(studentResponse.data[0].results)
      }
    } catch {
      // Optionally handle error
    }
  }

  const handleSubmit = async () => {
    if (subjectResults.length === 0) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No subjects found for this course',
        confirmButtonColor: '#3085d6'
      })
      return
    }

    try {
      setLoading(true)

      const resultData = {
        studentId: id,
        month,
        year: 'Y' + year,
        totalMarks,
        obtainedMarks,
        status,
        details: subjectResults.map(subject => ({
          code: subject.code,
          name: subject.name,
          totalMarks: subject.totalMarks,
          obtainedMarks: subject.obtainedMarks,
          grade: subject.grade,
          status: subject.status
        }))
      }

      if (editingResultId) {
        // Update result
        await axios.put(updateResult, {
          id: editingResultId,
          ...resultData
        }, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Result updated successfully',
          confirmButtonColor: '#3085d6'
        })
      } else {
        // Upload new result
        await axios.post(uploadresult, resultData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Result uploaded successfully',
          confirmButtonColor: '#3085d6'
        })
      }

      // Refresh results and reset form
      await fetchStudentResults()
      resetForm()
    } catch (error) {
      console.error('Error uploading/updating result:', error)
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: editingResultId ? 'Failed to update result' : 'Failed to upload result',
        confirmButtonColor: '#3085d6'
      })
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteResult = async (resultId: string) => {
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
        await axios.delete(`${deleteResult}/${resultId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        await Swal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: 'Result has been deleted.',
          timer: 1500,
          showConfirmButton: false
        })
        await fetchStudentResults()
      }
    } catch {
      await Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to delete result',
        confirmButtonColor: '#3085d6'
      })
    }
  }

  if (loading && !studentData) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Upload Result</h1>

      {studentData && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Student Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p><strong>Name:</strong> {studentData.name}</p>
                <p><strong>Enrollment Number:</strong> {studentData.enrollmentNumber || 'Not assigned'}</p>
              </div>
              <div>
                <p><strong>Application Number:</strong> {studentData.applicationNumber}</p>
                <p><strong>Course:</strong> {courseName}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Result Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <Label htmlFor="month">Month</Label>
              <Select
                value={month}
                onValueChange={(value) => setMonth(value as Month)}
              >
                <SelectTrigger id="month">
                  <SelectValue placeholder="Select Month" />
                </SelectTrigger>
                <SelectContent>
                  {Object.values(Month).map((m) => (
                    <SelectItem key={m} value={m}>
                      {m.replace('_', ' ')}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="year">Year</Label>
              <Select
                value={year}
                onValueChange={(value) => setYear(value as Year)}
              >
                <SelectTrigger id="year">
                  <SelectValue placeholder="Select Year" />
                </SelectTrigger>
                <SelectContent>
                  {Object.values(Year).map((y) => (
                    <SelectItem key={y} value={y}>
                      {y.replace('Y', '')}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-4">
            <div>
              <Label htmlFor="totalMarks">Total Marks</Label>
              <Input
                id="totalMarks"
                type="number"
                value={totalMarks}
                readOnly
              />
            </div>
            <div>
              <Label htmlFor="obtainedMarks">Obtained Marks</Label>
              <Input
                id="obtainedMarks"
                type="number"
                value={obtainedMarks}
                readOnly
              />
            </div>
            <div>
              <Label htmlFor="status">Overall Status</Label>
              <Select
                value={status}
                onValueChange={(value) => setStatus(value as ResultStatus)}
              >
                <SelectTrigger id="status">
                  <SelectValue placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent>
                  {Object.values(ResultStatus).map((s) => (
                    <SelectItem key={s} value={s}>
                      {s.replace('_', ' ')}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Subject Results</CardTitle>
        </CardHeader>
        <CardContent>
          {subjectResults.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Code</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Total Marks</TableHead>
                  <TableHead>Obtained</TableHead>
                  <TableHead>Grade</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {subjectResults.map((subject, index) => (
                  <TableRow key={index}>
                    <TableCell>{subject.code}</TableCell>
                    <TableCell>{subject.name}</TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        value={subject.totalMarks}
                        onChange={(e) => handleUpdateSubject(index, 'totalMarks', parseInt(e.target.value) || 0)}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        value={subject.obtainedMarks}
                        onChange={(e) => handleUpdateSubject(index, 'obtainedMarks', parseInt(e.target.value) || 0)}
                      />
                    </TableCell>
                    <TableCell>
                      <Select
                        value={subject.grade}
                        onValueChange={(value) => handleUpdateSubject(index, 'grade', value as Grade)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select Grade" />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.values(Grade).map((g) => (
                            <SelectItem key={g} value={g}>
                              {g.replace('_', ' ')}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Select
                        value={subject.status}
                        onValueChange={(value) => handleUpdateSubject(index, 'status', value as ResultStatus)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select Status" />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.values(ResultStatus).map((s) => (
                            <SelectItem key={s} value={s}>
                              {s.replace('_', ' ')}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-4">No subjects found for this course</div>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-end gap-4">
        {editingResultId ? (
          <Button variant="secondary" onClick={resetForm}>
            Cancel Edit
          </Button>
        ) : (
          <Button variant="outline" onClick={resetForm}>
            Cancel
          </Button>
        )}
        <Button onClick={handleSubmit} disabled={loading}>
          {loading ? (editingResultId ? 'Updating...' : 'Uploading...') : (editingResultId ? 'Update Result' : 'Upload Result')}
        </Button>
      </div>

      {/* Uploaded Results Section */}
      {results && results.length > 0 && (
        <Card className="mb-6 mt-8">
          <CardHeader>
            <CardTitle className="text-2xl">Examination Results</CardTitle>
          </CardHeader>
          <CardContent>
            {results.map((result) => (
              <div
                key={result.id}
                className={`mb-6 pb-6 last:border-b-0 last:pb-0 transition-all duration-300 rounded-lg
                  ${editingResultId === result.id
                    ? 'bg-gray-100 shadow-lg scale-[1.01]'
                    : 'bg-white'}
                `}
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold">
                    {result.month} {result.year.replace('Y', '')} Examination
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className="mr-2">Status:</span>
                    <span className={`px-2 py-1 rounded text-sm ${result.status === ResultStatus.PASS
                      ? 'bg-green-100 text-green-800'
                      : result.status === ResultStatus.FAIL
                        ? 'bg-red-100 text-red-800'
                        : 'bg-yellow-100 text-yellow-800'
                      }`}>
                      {result.status}
                    </span>
                    <Button size="sm" variant="default" className="flex items-center gap-1" onClick={() => handleEditResult(result)} title="Edit Result">
                      <Pencil1Icon className="w-4 h-4" /> Edit
                    </Button>
                    <Button size="sm" variant="destructive" className="flex items-center gap-1" onClick={() => handleDeleteResult(result.id)} title="Delete Result">
                      <Trash2 className="w-4 h-4 text-white" />
                    </Button>
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
                    <p>{result.createdAt ? new Date(result.createdAt).toLocaleDateString() : ''}</p>
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
    </div>
  )
}

export default ResultUpload