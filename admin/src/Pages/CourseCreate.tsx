import { useState, useEffect } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { createcourse, getallcourse, deletecoursebyid, getallsubject } from '../Config';
import { CoursePreview,SubjectPreview } from '../lib/Interfaces';
import Swal from 'sweetalert2';
import { Trash2, Pencil, Search, ChevronDown, ChevronUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';


// Define CourseType enum since it's missing in Interfaces.ts
enum CourseType {
  ACADEMIC = 'ACADEMIC',
  DIPLOMA = 'DIPLOMA',
  CERTIFICATE = 'CERTIFICATE',
  DEGREE = 'DEGREE',
  POST_GRADUATE = 'POST_GRADUATE',
  PHD = 'PHD'
}

// Define the form schema for course creation using zod
const courseSchema = z.object({
  name: z.string().min(1, "Course name is required"),
  code: z.string().optional(),
  fees: z.number().optional(),
  courseType: z.nativeEnum(CourseType, {
    required_error: "Course type is required",
    invalid_type_error: "Course type must be one of the valid types"
  })
});

type CourseFormValues = z.infer<typeof courseSchema>;

// Extended CoursePreview interface with subjects
interface CourseWithSubjects extends CoursePreview {
  subjects?: SubjectPreview[];
}

const CourseCreate = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState<CourseWithSubjects[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCourses, setFilteredCourses] = useState<CourseWithSubjects[]>([]);
  const [expandedCourses, setExpandedCourses] = useState<Record<string, boolean>>({});

  // Initialize the form
  const form = useForm<CourseFormValues>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      name: "",
      code: "",
      fees: 0,
      courseType: undefined
    }
  });

  // Fetch all courses on component mount
  useEffect(() => {
    fetchCourses();
  }, []);

  // Filter courses based on search term
  useEffect(() => {
    const filtered = courses.filter(course => 
      course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (course.code && course.code.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setFilteredCourses(filtered);
  }, [courses, searchTerm]);

  // Function to toggle course expansion
  const toggleCourseExpansion = (courseId: string) => {
    setExpandedCourses(prev => ({
      ...prev,
      [courseId]: !prev[courseId]
    }));
  };

  // Function to fetch courses and their subjects from API
  const fetchCourses = async () => {
    try {
      setIsLoading(true);
      const courseResponse = await axios.post(getallcourse);
      const subjectResponse = await axios.post(getallsubject);
      
      // Group subjects by courseId
      const subjectsByCourse: Record<string, SubjectPreview[]> = {};
      subjectResponse.data.forEach((subject: SubjectPreview) => {
        if (!subjectsByCourse[subject.courseId]) {
          subjectsByCourse[subject.courseId] = [];
        }
        subjectsByCourse[subject.courseId].push(subject);
      });
      
      // Add subjects to courses
      const coursesWithSubjects = courseResponse.data.map((course: CoursePreview) => ({
        ...course,
        subjects: subjectsByCourse[course.id] || []
      }));
      
      setCourses(coursesWithSubjects);
    } catch (error) {
      console.error("Failed to fetch courses", error);
      Swal.fire({
        title: 'Error!',
        text: 'Failed to load courses. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Function to create a new course
  const onSubmit = async (data: CourseFormValues) => {
    try {
      setIsLoading(true);
      await axios.post(createcourse, data);
      form.reset();
      fetchCourses();
      Swal.fire({
        title: 'Success!',
        text: 'Course created successfully!',
        icon: 'success',
        confirmButtonText: 'Great!'
      });
    } catch (error) {
      console.error("Failed to create course", error);
      Swal.fire({
        title: 'Error!',
        text: 'Failed to create course. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Function to delete a course
  const handleDeleteCourse = async (id: string) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`${deletecoursebyid}/${id}`);
          fetchCourses();
          Swal.fire(
            'Deleted!',
            'Course has been deleted.',
            'success'
          );
        } catch (error) {
          console.error("Failed to delete course", error);
          Swal.fire({
            title: 'Error!',
            text: 'Failed to delete course. Please try again.',
            icon: 'error',
            confirmButtonText: 'OK'
          });
        }
      }
    });
  };

  return (
    <div className="container mx-auto p-6 space-y-8 max-w-full">
      {/* Course Creation Form */}
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Create New Course</CardTitle>
          <CardDescription>Add a new course to the system</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Course Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter course name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Course Code (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter course code" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="fees"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Course Fees (Optional)</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="Enter course fees" 
                        {...field}
                        onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="courseType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Course Type</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select course type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.values(CourseType).map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button type="submit" className="md:col-span-4" disabled={isLoading}>
                {isLoading ? "Creating..." : "Create Course"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* Course List */}
      <Card className="w-full">
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <CardTitle>Course List</CardTitle>
              <CardDescription>Manage existing courses</CardDescription>
            </div>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search courses..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center items-center h-40">
              <div className="animate-spin h-8 w-8 border-4 border-blue-500 rounded-full border-t-transparent"></div>
            </div>
          ) : filteredCourses.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              {searchTerm ? "No courses found matching your search" : "No courses available"}
            </div>
          ) : (
            <div className="rounded-md border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Course Name</TableHead>
                    <TableHead>Code</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Fees</TableHead>
                    <TableHead>Subjects</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCourses.map((course) => (
                    <>
                      <TableRow key={course.id}>
                        <TableCell className="font-medium">{course.name}</TableCell>
                        <TableCell>{course.code || "N/A"}</TableCell>
                        <TableCell>{course.courseType}</TableCell>
                        <TableCell>{course.fees ? `₹${course.fees}` : "N/A"}</TableCell>
                        <TableCell>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            className="flex items-center gap-1"
                            onClick={() => toggleCourseExpansion(course.id)}
                          >
                            {course.subjects && course.subjects.length > 0 ? (
                              <>
                                {course.subjects.length} Subject(s)
                                {expandedCourses[course.id] ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                              </>
                            ) : (
                              "No subjects"
                            )}
                          </Button>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => navigate(`/course-details/${course.id}`)}
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="destructive"
                              size="icon"
                              className='text-white'
                              onClick={() => handleDeleteCourse(course.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                      {expandedCourses[course.id] && course.subjects && course.subjects.length > 0 && (
                        <TableRow className="bg-gray-50">
                          <TableCell colSpan={6} className="p-0">
                            <div className="p-4">
                              <h4 className="font-medium mb-2">Subjects for {course.name}</h4>
                              <Table>
                                <TableHeader>
                                  <TableRow>
                                    <TableHead>Subject Name</TableHead>
                                    <TableHead>Code</TableHead>
                                    <TableHead>Type</TableHead>
                                  </TableRow>
                                </TableHeader>
                                <TableBody>
                                  {course.subjects.map(subject => (
                                    <TableRow key={subject.id}>
                                      <TableCell>{subject.name}</TableCell>
                                      <TableCell>{subject.code}</TableCell>
                                      <TableCell>{subject.type}</TableCell>
                                    </TableRow>
                                  ))}
                                </TableBody>
                              </Table>
                            </div>
                          </TableCell>
                        </TableRow>
                      )}
                    </>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CourseCreate;