import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

// Define TypeScript interfaces for type safety
interface PersonalDetails {
  name: string;
  profileImage: string;
  email: string;
  phone: string;
  fatherName: string;
  motherName: string;
  dob: string;
  gender: string;
  nationality: string;
  category: string;
  address: string;
}

interface Subject {
  code: string;
  name: string;
  credits: number;
}

interface CourseDetails {
  program: string;
  session: string;
  semester: string;
  subjects: Subject[];
}

interface StudentData {
  personalDetails: PersonalDetails;
  courseDetails: CourseDetails;
}

const FAKE_STUDENT_DATA: StudentData = {
  personalDetails: {
    name: "John Doe",
    profileImage: "/api/placeholder/200/200",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    fatherName: "Michael Doe",
    motherName: "Sarah Doe",
    dob: "2005-06-15",
    gender: "Male",
    nationality: "American",
    category: "General",
    address: "123 Learning Street, Education City, 54321"
  },
  courseDetails: {
    program: "Bachelor of Computer Science",
    session: "2023-2024",
    semester: "3rd Semester",
    subjects: [
      { code: "CS101", name: "Programming Fundamentals", credits: 4 },
      { code: "CS202", name: "Data Structures", credits: 4 },
      { code: "MATH301", name: "Linear Algebra", credits: 3 }
    ]
  }
};

const StudentProfile: React.FC = () => {
  const [studentData, setStudentData] = useState<StudentData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        // Replace with actual API call
        const response = await fetch('/api/student-details');
        const data: StudentData = await response.json();
        setStudentData(data);
      } catch (error) {
        console.error("Failed to fetch student data", error);
        setStudentData(FAKE_STUDENT_DATA);
      } finally {
        setLoading(false);
      }
    };

    fetchStudentData();
  }, []);

  if (loading) {
    return <div className="p-4 text-center text-blue-400">Loading...</div>;
  }

  if (!studentData) {
    return <div className="p-4 text-center text-blue-400">No student data available</div>;
  }

  const { personalDetails, courseDetails } = studentData;

  return (
    <div className="container mx-auto p-4">
      <Card className="w-full shadow-2xl rounded-xl overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-blue-400 to-indigo-900 text-white p-6">
          <div className="grid md:grid-cols-[auto_1fr] items-center gap-6">
            <img 
              src={personalDetails.profileImage} 
              alt={personalDetails.name} 
              className="w-56 h-56 mx-auto md:mx-0 rounded-full object-cover border-6 border-white shadow-lg"
            />
            <div className="text-center md:text-left space-y-3">
              <CardTitle className="text-4xl font-extrabold drop-shadow-md">
                {personalDetails.name}
              </CardTitle>
              <div className="space-x-2">
                <Badge className="bg-white/20 text-white hover:bg-white/30">
                  {courseDetails.program}
                </Badge>
                <Badge variant="outline" className="border-white/50 text-white hover:bg-white/10">
                  {courseDetails.session}
                </Badge>
              </div>
              <p className="text-white/80 italic text-lg">
                Exploring Knowledge, Shaping Future in {courseDetails.program}
              </p>
            </div>
          </div>
        </CardHeader>
        
        <Separator />
        
        <CardContent className="p-6 bg-gray-50">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Personal Information */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-2xl font-bold text-blue-500 mb-5 border-b-4 border-blue-300 pb-2">
                Personal Information
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Father's Name", value: personalDetails.fatherName },
                  { label: "Mother's Name", value: personalDetails.motherName },
                  { label: "Date of Birth", value: personalDetails.dob },
                  { label: "Gender", value: personalDetails.gender },
                  { label: "Nationality", value: personalDetails.nationality },
                  { label: "Category", value: personalDetails.category }
                ].map((detail, index) => (
                  <div key={index} className="bg-blue-50 p-3 rounded-lg">
                    <span className="block text-sm text-blue-600 font-semibold">{detail.label}</span>
                    <p className="text-gray-700 font-medium">{detail.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Academic Details */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-2xl font-bold text-blue-500 mb-5 border-b-4 border-blue-300 pb-2">
                Academic Details
              </h3>
              <div className="space-y-4">
                {[
                  { label: "Program", value: courseDetails.program },
                  { label: "Session", value: courseDetails.session },
                  { label: "Semester", value: courseDetails.semester }
                ].map((detail, index) => (
                  <div key={index} className="bg-blue-50 p-3 rounded-lg">
                    <span className="block text-sm text-blue-600 font-semibold">{detail.label}</span>
                    <p className="text-gray-700 font-medium">{detail.value}</p>
                  </div>
                ))}
                
                <div className="bg-blue-50 p-3 rounded-lg">
                  <span className="block text-sm text-blue-600 font-semibold mb-2">Subjects</span>
                  <div className="grid grid-cols-2 gap-2">
                    {courseDetails.subjects.map(subject => (
                      <div key={subject.code} className="flex justify-between items-center bg-white p-2 rounded">
                        <span className="text-gray-700 text-sm">{subject.name}</span>
                        <Badge variant="outline" className="text-blue-00">{subject.code}</Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentProfile;
