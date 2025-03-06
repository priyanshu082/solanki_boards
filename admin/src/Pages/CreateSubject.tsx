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
import { createsubject, getallsubject, deletesubjectbyid, getallcourse } from '../Config';
import { CoursePreview,SubjectPreview} from '../lib/Interfaces';
import Swal from 'sweetalert2';
import { Trash2, Search } from 'lucide-react';

// Define SubjectType enum with correct values
enum SubjectType {
  LANGUAGE = 'LANGUAGE',
  NON_LANGUAGE = 'NON_LANGUAGE',
  VOCATIONAL = 'VOCATIONAL'
}

// Interface for subject data


// Define the form schema for subject creation using zod
const subjectSchema = z.object({
  name: z.string().min(1, "Subject name is required"),
  code: z.string().min(1, "Subject code is required"),
  fees: z.number().optional(),
  courseId: z.string().min(1, "Course is required"),
  type: z.nativeEnum(SubjectType, {
    required_error: "Subject type is required",
    invalid_type_error: "Subject type must be one of the valid types"
  })
});

type SubjectFormValues = z.infer<typeof subjectSchema>;

const CreateSubject = () => {
  const [subjects, setSubjects] = useState<SubjectPreview[]>([]);
  const [courses, setCourses] = useState<CoursePreview[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredSubjects, setFilteredSubjects] = useState<SubjectPreview[]>([]);

  // Initialize the form
  const form = useForm<SubjectFormValues>({
    resolver: zodResolver(subjectSchema),
    defaultValues: {
      name: "",
      code: "",
      fees: 0,
      courseId: "",
      type: undefined
    }
  });

  // Fetch all subjects and courses on component mount
  useEffect(() => {
    fetchSubjects();
    fetchCourses();
  }, []);

  // Filter subjects based on search term
  useEffect(() => {
    const filtered = subjects.filter(subject => 
      subject.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      subject.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (subject.course?.name || "").toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredSubjects(filtered);
  }, [subjects, searchTerm]);

  // Function to fetch subjects from API
  const fetchSubjects = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post(getallsubject);
      setSubjects(response.data);
    } catch (error) {
      console.error("Failed to fetch subjects", error);
      Swal.fire({
        title: 'Error!',
        text: 'Failed to load subjects. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Function to fetch courses for dropdown
  const fetchCourses = async () => {
    try {
    
      setIsLoading(true);
      const response = await axios.post(getallcourse);
      setCourses(response.data);
    } catch (error) {
      console.error("Failed to fetch courses", error);
      Swal.fire({
        title: 'Error!',
        text: 'Failed to load courses. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };

  // Function to create a new subject
  const onSubmit = async (data: SubjectFormValues) => {
    try {
      setIsLoading(true);
      await axios.post(createsubject, data);
      form.reset();
      fetchSubjects();
      Swal.fire({
        title: 'Success!',
        text: 'Subject created successfully!',
        icon: 'success',
        confirmButtonText: 'Great!'
      });
    } catch (error) {
      console.error("Failed to create subject", error);
      Swal.fire({
        title: 'Error!',
        text: 'Failed to create subject. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Function to delete a subject
  const handleDeleteSubject = async (id: string) => {
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
          await axios.delete(`${deletesubjectbyid}/${id}`);
          fetchSubjects();
          Swal.fire(
            'Deleted!',
            'Subject has been deleted.',
            'success'
          );
        } catch (error) {
          console.error("Failed to delete subject", error);
          Swal.fire({
            title: 'Error!',
            text: 'Failed to delete subject. Please try again.',
            icon: 'error',
            confirmButtonText: 'OK'
          });
        }
      }
    });
  };

  // Get course name by id
  const getCourseName = (courseId: string) => {
    const course = courses.find(c => c.id === courseId);
    return course ? course.name : "Unknown Course";
  };

  return (
    <div className="container mx-auto p-6 space-y-8">
      {/* Subject Creation Form */}
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Create New Subject</CardTitle>
          <CardDescription>Add a new subject to a course</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subject Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter subject name" {...field} />
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
                    <FormLabel>Subject Code</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter subject code" {...field} />
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
                    <FormLabel>Subject Fees (Optional)</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="Enter subject fees" 
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
                name="courseId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Course</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a course" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {courses.map((course) => (
                          <SelectItem key={course.id} value={course.id}>
                            {course.name} {course.code ? `(${course.code})` : ''}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subject Type</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select subject type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.values(SubjectType).map((type) => (
                          <SelectItem key={type} value={type}>
                            {type.replace('_', ' ')}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button type="submit" className="md:col-span-1" disabled={isLoading}>
                {isLoading ? "Creating..." : "Create Subject"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* Subject List */}
      <Card className="w-full">
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <CardTitle>Subject List</CardTitle>
              <CardDescription>Manage existing subjects</CardDescription>
            </div>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search subjects..."
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
          ) : filteredSubjects.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              {searchTerm ? "No subjects found matching your search" : "No subjects available"}
            </div>
          ) : (
            <div className="rounded-md border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Subject Name</TableHead>
                    <TableHead>Code</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Course</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSubjects.map((subject) => (
                    <TableRow key={subject.id}>
                      <TableCell className="font-medium">{subject.name}</TableCell>
                      <TableCell>{subject.code}</TableCell>
                      <TableCell>{subject.type.replace('_', ' ')}</TableCell>
                      <TableCell>{subject.course?.name || getCourseName(subject.courseId)}</TableCell>
                      <TableCell className="text-right">
                        
                          <Button
                            variant="destructive"
                            size="icon"
                            className='text-white'
                            onClick={() => handleDeleteSubject(subject.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                   
                      </TableCell>
                    </TableRow>
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

export default CreateSubject;