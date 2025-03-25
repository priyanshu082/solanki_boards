import React, { useState, useEffect } from 'react';
import dummy from "../assets/dummy.jpeg";
import { studentDetailsUrl, courseFetchUrl } from '../Config';
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

interface Subject {
  id: string;
  name: string;
  code: string;
  description?: string;
  credits?: number;
}

interface Course {
  id: string;
  name: string;
  description: string;
  duration: string;
  subjects: Subject[];
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
  const [courseData, setCourseData] = useState<Course | null>(null);
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
        
        // Fetch course data using courseId from student data
        if (response.data && response.data.courseId) {
          fetchCourseData(response.data.courseId, token);
        }
      } catch (error) {
        console.error("Failed to fetch student data", error);
        setStudentData(null);
      } finally {
        setLoading(false);
      }
    };

    const fetchCourseData = async (courseId: string, token: string | null) => {
      try {
        const response = await axios.get(`${courseFetchUrl}/${courseId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setCourseData(response.data);
      } catch (error) {
        console.error("Failed to fetch course data", error);
        setCourseData(null);
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
    <div className="min-h-screen p-4 max-w-6xl mx-auto overflow-auto">
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        {/* Student Image */}
        <div className="w-32 h-32 md:w-40 md:h-40 flex-shrink-0">
          <img 
            src={studentData.studentPhoto || dummy} 
            alt={studentData.name} 
            className="w-full h-full object-cover rounded-md border border-gray-300"
          />
        </div>
        
        {/* Basic Info */}
        <div className="flex-1">
          <h1 className="text-xl font-bold">{studentData.name}</h1>
          <p className="text-sm text-gray-600">
            {studentData.enrollmentNumber || studentData.applicationNumber} | {studentData.batch}
          </p>
          <div className="mt-1 text-sm">
            <p><span className="font-semibold">Email:</span> {studentData.email}</p>
            <p><span className="font-semibold">Phone:</span> {studentData.phoneNumber}</p>
            <p><span className="font-semibold">Admission Type:</span> {studentData.admissionType}</p>
            <p><span className="font-semibold">Payment Status:</span> {studentData.paymentStatus}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Personal Information Section */}
        <div className="border rounded-md p-3">
          <h2 className="text-md font-bold border-b pb-1 mb-2">Personal Information</h2>
          <div className="text-sm space-y-1">
            <p><span className="font-semibold">Father's Name:</span> {studentData.fatherName}</p>
            <p><span className="font-semibold">Mother's Name:</span> {studentData.motherName}</p>
            <p><span className="font-semibold">Date of Birth:</span> {new Date(studentData.dob).toLocaleDateString()}</p>
            <p><span className="font-semibold">Gender:</span> {studentData.gender}</p>
            <p><span className="font-semibold">Nationality:</span> {studentData.nationality}</p>
            <p><span className="font-semibold">Category:</span> {studentData.category}</p>
          </div>
        </div>

        {/* Address Section */}
        <div className="border rounded-md p-3">
          <h2 className="text-md font-bold border-b pb-1 mb-2">Address Information</h2>
          <div className="text-sm">
            {studentData.correspondenceAddress.length > 0 && (
              <div className="mb-2">
                <h3 className="font-semibold">Correspondence Address:</h3>
                <p>{studentData.correspondenceAddress[0].address}</p>
                <p>{studentData.correspondenceAddress[0].city}, {studentData.correspondenceAddress[0].district}</p>
                <p>{studentData.correspondenceAddress[0].state}, {studentData.correspondenceAddress[0].country}</p>
                <p>PIN: {studentData.correspondenceAddress[0].pincode}</p>
              </div>
            )}
            
            {studentData.permanentAddress.length > 0 && (
              <div>
                <h3 className="font-semibold">Permanent Address:</h3>
                <p>{studentData.permanentAddress[0].address}</p>
                <p>{studentData.permanentAddress[0].city}, {studentData.permanentAddress[0].district}</p>
                <p>{studentData.permanentAddress[0].state}, {studentData.permanentAddress[0].country}</p>
                <p>PIN: {studentData.permanentAddress[0].pincode}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Course and Subjects Section */}
      <div className="border rounded-md p-3 mt-4 bg-gradient-to-r from-blue-50 to-indigo-50">
        <h2 className="text-md font-bold border-b pb-1 mb-2 text-blue-800">Course Information</h2>
        {courseData ? (
          <div className="text-sm">
            <div className="mb-3 bg-white p-4 rounded-lg shadow-sm">
              <p><span className="font-semibold text-blue-700">Course Name:</span> {courseData.name}</p>
        
            </div>
            
            <h3 className="font-semibold mt-4 mb-3 text-blue-800 border-b pb-1">Enrolled Subjects</h3>
            {courseData.subjects && courseData.subjects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {courseData.subjects.map((subject, index) => (
                  <div 
                    key={index} 
                    className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border-blue-300"
                  >
                    <h4 className="font-bold text-blue-900 text-base mb-2">{subject.name}</h4>
                    <div className="flex items-center mb-1">
                      <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded mr-2">
                        {subject.code}
                      </span>
                      {subject.credits && (
                        <span className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2 py-0.5 rounded">
                          {subject.credits} Credits
                        </span>
                      )}
                    </div>
                    {subject.description && (
                      <p className="text-gray-600 mt-2 text-sm">{subject.description}</p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-500 py-4 bg-white rounded-lg">
                No subjects available for this course
              </div>
            )}
          </div>
        ) : (
          <div className="text-center text-gray-500 py-4 bg-white rounded-lg">
            Course information not available
          </div>
        )}
      </div>

      {/* Educational Qualifications Section */}
      <div className="border rounded-md p-3 mt-4">
        <h2 className="text-md font-bold border-b pb-1 mb-2">Educational Qualifications</h2>
        <div className="text-sm">
          {studentData.educationalQualifications.map((qual, index) => (
            <div key={index} className="mb-3 pb-2 border-b last:border-b-0">
              <div className="grid grid-cols-2 gap-2">
                <p><span className="font-semibold">Examination:</span> {qual.examination}</p>
                <p><span className="font-semibold">Year of Passing:</span> {qual.yearOfPassing}</p>
                <p><span className="font-semibold">Board:</span> {qual.board}</p>
                <p><span className="font-semibold">Grade:</span> {qual.grade}</p>
                <p><span className="font-semibold">Subjects:</span> {qual.subjects}</p>
                <p><span className="font-semibold">Percentage:</span> {qual.percentage}%</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Documents Section - Commented out as in original code */}
      <div className="border rounded-md p-3 mt-4">
        <h2 className="text-md font-bold border-b pb-1 mb-2">Documents</h2>
        {studentData.documents.length === 0 ? (
          <div className="text-center text-gray-500 py-2 text-sm">
            No documents uploaded yet
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
            {studentData.documents.map((doc, index) => (
              <div key={index} className="border p-2 rounded">
                <p className="font-semibold">{doc.documentType.replace(/_/g, ' ')}</p>
                <a 
                  href={doc.fileUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  View Document
                </a>
              </div>
            ))}
          </div>
        )}
      </div> 
    </div>
  );
};

export default StudentProfile;
