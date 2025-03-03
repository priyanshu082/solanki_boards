import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader } from "../components/ui/card";
import { Badge } from "../components/ui/badge";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import dummy from "../assets/dummy.jpeg";
import { studentDetailsUrl } from '../Config';
import axios from 'axios';

interface Address {
  address: string;
  city: string;
  district: string;
  state: string;
  country: string;
  pincode: string;
}

interface EducationalQualification {
  examination: string;
  subjects: string;
  board: string;
  university: string | null;
  yearOfPassing: string;
  division: string | null;
  grade: string;
  percentage: number;
}

interface StudentData {
  id: string;
  admissionType: string;
  name: string;
  dob: string;
  fatherName: string;
  motherName: string;
  category: string;
  gender: string;
  nationality: string;
  courseId: string;
  batch: string;
  studentPhoto: string;
  subjectIds: string[];
  applicationNumber: string;
  enrollmentNumber: string | null;
  phoneNumber: string;
  email: string;
  instituteId: string;
  paymentStatus: string;
  paymentAmount: number;
  correspondenceAddress: Address[];
  permanentAddress: Address[];
  educationalQualifications: EducationalQualification[];
  documents: any[];
  lastPassedExam: any[];
}

const StudentProfile: React.FC = () => {
  const [studentData, setStudentData] = useState<StudentData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const studentId = localStorage.getItem('id');

  // Check for DigiLocker code in the URL
  useEffect(() => {
    const url = new URL(window.location.href);
    const code = url.searchParams.get('code');
    const state = url.searchParams.get('state');
    
    // If code exists and state is 'oidc_flow', store it and clean the URL
    if (code && state === 'oidc_flow') {
      localStorage.setItem('digilockerCode', code);
      
      // Remove the query parameters from the URL
      window.history.replaceState({}, document.title, window.location.pathname);
      
      // Redirect to Result page after saving the code
      window.location.href = '/result';
    }
  }, []);

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${studentDetailsUrl}/${studentId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setStudentData(response.data);
      } catch (error) {
        console.error("Failed to fetch student data", error);
        setStudentData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchStudentData();
  }, [studentId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!studentData) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl text-red-500">
        No student data available
      </div>
    );
  }

  return (
    <div className=" mx-auto px-12 space-y-8  min-h-screen">
      {/* Profile Header with gradient background */}
      <Card className="w-full overflow-hidden border-none shadow-xl">
        <CardHeader className="bg-gradient-to-br from-blue-800 to-indigo-900 p-8">
          <div className="grid lg:grid-cols-[300px_1fr] gap-8 items-center">
            <div className="relative mx-auto lg:mx-0">
              <div className="w-64 h-64 rounded-2xl overflow-hidden border-4 border-white/20 shadow-2xl">
                <img 
                  src={studentData.studentPhoto || dummy} 
                  alt={studentData.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <Badge className="absolute bottom-4 right-4 bg-emerald-500 text-white px-4 py-1 text-sm font-medium">
                {studentData.batch}
              </Badge>
            </div>
            
            <div className="text-center lg:text-left space-y-6">
              <div>
                <h1 className="text-4xl font-bold text-white mb-2">
                  {studentData.name}
                </h1>
                <p className="text-blue-100 text-lg">
                  {studentData.enrollmentNumber || studentData.applicationNumber}
                </p>
              </div>

              <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                <Badge className="bg-white/10 text-white border-none px-4 py-1.5">
                  {studentData.admissionType}
                </Badge>
                <Badge className={`px-4 py-1.5 ${
                  studentData.paymentStatus === 'PASS' 
                    ? 'bg-emerald-500' 
                    : studentData.paymentStatus === 'PENDING'
                    ? 'bg-amber-500'
                    : 'bg-red-500'
                } text-white border-none`}>
                  {studentData.paymentStatus}
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-4 text-white/80">
                <div>
                  <p className="text-sm text-white/60">Email</p>
                  <p>{studentData.email}</p>
                </div>
                <div>
                  <p className="text-sm text-white/60">Phone</p>
                  <p>{studentData.phoneNumber}</p>
                </div>
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      <Tabs defaultValue="personal" className="w-full">
        <TabsList className="bg-white border rounded-lg p-0 space-x-2">
          <TabsTrigger 
            value="personal"
            className="data-[state=active]:bg-blue-800 data-[state=active]:text-white rounded-md px-6 py-2 transition-all"
          >
            Personal
          </TabsTrigger>
          <TabsTrigger 
            value="education"
            className="data-[state=active]:bg-blue-800 data-[state=active]:text-white rounded-md px-6 py-2 transition-all"
          >
            Education
          </TabsTrigger>
          <TabsTrigger 
            value="address"
            className="data-[state=active]:bg-blue-800 data-[state=active]:text-white rounded-md px-6 py-2 transition-all"
          >
            Address
          </TabsTrigger>
          <TabsTrigger 
            value="documents"
            className="data-[state=active]:bg-blue-800 data-[state=active]:text-white rounded-md px-6 py-2 transition-all"
          >
            Documents
          </TabsTrigger>
        </TabsList>

        <TabsContent value="personal">
          <Card className="border-none shadow-lg">
            <CardContent className="p-8">
              <h3 className="text-2xl font-semibold text-gray-800 mb-6">Personal Information</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { label: "Father's Name", value: studentData.fatherName },
                  { label: "Mother's Name", value: studentData.motherName },
                  { label: "Date of Birth", value: new Date(studentData.dob).toLocaleDateString() },
                  { label: "Gender", value: studentData.gender },
                  { label: "Nationality", value: studentData.nationality },
                  { label: "Category", value: studentData.category }
                ].map((detail, index) => (
                  <div key={index} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                    <p className="text-sm text-blue-800 font-medium mb-1">{detail.label}</p>
                    <p className="text-gray-700">{detail.value}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="education">
          <Card className="border-none shadow-lg">
            <CardContent className="p-8">
              <h3 className="text-2xl font-semibold text-gray-800 mb-6">Educational Qualifications</h3>
              <div className="space-y-4">
                {studentData.educationalQualifications.map((qual, index) => (
                  <div key={index} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div>
                        <p className="text-sm text-blue-800 font-medium mb-1">Examination</p>
                        <p className="text-gray-700">{qual.examination}</p>
                      </div>
                      <div>
                        <p className="text-sm text-blue-800 font-medium mb-1">Subjects</p>
                        <p className="text-gray-700">{qual.subjects}</p>
                      </div>
                      <div>
                        <p className="text-sm text-blue-800 font-medium mb-1">Board</p>
                        <p className="text-gray-700">{qual.board}</p>
                      </div>
                      <div>
                        <p className="text-sm text-blue-800 font-medium mb-1">Year of Passing</p>
                        <p className="text-gray-700">{qual.yearOfPassing}</p>
                      </div>
                      <div>
                        <p className="text-sm text-blue-800 font-medium mb-1">Grade</p>
                        <p className="text-gray-700">{qual.grade}</p>
                      </div>
                      <div>
                        <p className="text-sm text-blue-800 font-medium mb-1">Percentage</p>
                        <p className="text-gray-700">{qual.percentage}%</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="address">
          <Card className="border-none shadow-lg">
            <CardContent className="p-8">
              <h3 className="text-2xl font-semibold text-gray-800 mb-6">Address</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-xl font-semibold mb-4">Correspondence Address</h4>
                  {studentData.correspondenceAddress.map((addr, index) => (
                    <div key={index} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                      <p className="text-blue-800 font-medium mb-1">{addr.address}</p>
                      <p className="text-gray-700">{addr.city}, {addr.district}</p>
                      <p className="text-gray-700">{addr.state}, {addr.country}</p>
                      <p className="text-gray-700">PIN: {addr.pincode}</p>
                    </div>
                  ))}
                </div>
                <div>
                  <h4 className="text-xl font-semibold mb-4">Permanent Address</h4>
                  {studentData.permanentAddress.map((addr, index) => (
                    <div key={index} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                      <p className="text-blue-800 font-medium mb-1">{addr.address}</p>
                      <p className="text-gray-700">{addr.city}, {addr.district}</p>
                      <p className="text-gray-700">{addr.state}, {addr.country}</p>
                      <p className="text-gray-700">PIN: {addr.pincode}</p>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents">
          <Card className="border-none shadow-lg">
            <CardContent className="p-8">
              <h3 className="text-2xl font-semibold text-gray-800 mb-6">Documents</h3>
              {studentData.documents.length === 0 ? (
                <div className="text-center text-gray-500 py-8">
                  No documents uploaded yet
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {studentData.documents.map((doc, index) => (
                    <div key={index} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                      <div>
                        <p className="font-semibold">{doc.documentType.replace(/_/g, ' ')}</p>
                        <p className="text-sm text-gray-600">{doc.documentType.replace(/_/g, ' ')}</p>
                      </div>
                      <div className="mt-3">
                        <a 
                          href={doc.fileUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          View Document
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StudentProfile;
