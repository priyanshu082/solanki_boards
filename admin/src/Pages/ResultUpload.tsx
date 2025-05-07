import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Month, Year, ResultStatus, Grade, InterfaceStudentDetails, SubjectPreview } from '@/lib/Interfaces'
import Swal from 'sweetalert2'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { getallstudents, getcoursebyid, uploadresult } from '@/Config'

interface SubjectResult {
  code: string
  name: string
  totalMarks: number
  obtainedMarks: number
  grade: Grade
  status: ResultStatus
}

interface Course {
  id: string
  name: string
  subjects: SubjectPreview[]
}

const ResultUpload = () => {
  const { id, courseId } = useParams<{ id: string, courseId: string }>()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [studentData, setStudentData] = useState<InterfaceStudentDetails | null>(null)
  const [courseData, setCourseData] = useState<Course | null>(null)
  const [month, setMonth] = useState<Month>(Month.JANUARY)
  const [year, setYear] = useState<Year>(Year.Y2023)
  const [totalMarks, setTotalMarks] = useState<number>(0)
  const [obtainedMarks, setObtainedMarks] = useState<number>(0)
  const [status, setStatus] = useState<ResultStatus>(ResultStatus.PASS)
  const [subjectResults, setSubjectResults] = useState<SubjectResult[]>([])

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
          setStudentData(studentResponse.data[0])
        }

        // Fetch course data directly using courseId from params
        try {
          const courseResponse = await axios.get(`${getcoursebyid}/${courseId}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
          setCourseData(courseResponse.data)

          // Initialize subject results from course subjects
          if (courseResponse.data.subjects && courseResponse.data.subjects.length > 0) {
            const initialSubjectResults = courseResponse.data.subjects.map((subject: SubjectPreview) => ({
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
  }, [id, courseId, navigate])

  const handleUpdateSubject = (index: number, field: keyof SubjectResult, value: any) => {
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

      // Send result data to backend
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

      navigate(`/student-details/${id}`)
    } catch (error) {
      console.error('Error uploading result:', error)
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to upload result',
        confirmButtonColor: '#3085d6'
      })
    } finally {
      setLoading(false)
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
                <p><strong>Course:</strong> {courseData?.name || courseId}</p>
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
        <Button variant="outline" onClick={() => navigate(`/student-details/${id}`)}>
          Cancel
        </Button>
        <Button onClick={handleSubmit} disabled={loading}>
          {loading ? 'Uploading...' : 'Upload Result'}
        </Button>
      </div>
    </div>
  )
}

export default ResultUpload