import { useEffect, useState } from 'react';
import axios from 'axios';
import { studentDetailsUrl, courseFetchUrl } from '../Config';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

import { motion } from "framer-motion";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import html2canvas from 'html2canvas';

import { ResultStatus, Grade, Month, Year } from "../lib/Interfaces";

// Define types based on your schema
export interface SubjectResultDetail {
  id: string;
  code: string;
  name: string;
  totalMarks: number;
  obtainedMarks: number;
  grade: Grade;
  status: ResultStatus;
  resultId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Result {
  id: string;
  studentId: string;
  month: Month;
  year: Year;
  totalMarks: number;
  obtainedMarks: number;
  status: ResultStatus;
  createdAt: Date;
  updatedAt: Date;
  details: SubjectResultDetail[];
  student: {
    name: string;
    rollNumber: string;
    enrollmentNumber?: string;
    applicationNumber?: string;
  };
}

const Result = () => {
  const [result, setResult] = useState<Result | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [student, setStudent] = useState<Result['student'] | null>(null);
  const [courseName, setCourseName] = useState('');

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        setLoading(true);
        const studentId = localStorage.getItem('id');

        if (!studentId) {
          throw new Error("Student ID not found");
        }

        // Fetch student details which includes results
        const response = await axios.get(`${studentDetailsUrl}/${studentId}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        const studentData = response.data;
        setStudent(studentData);
        // Fetch course name
        if (studentData && studentData.courseId) {
          try {
            const courseRes = await fetch(`${courseFetchUrl}/${studentData.courseId}`, {
              headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
              }
            });
            const course = await courseRes.json();
            setCourseName(course.name);
          } catch {
            setCourseName('');
          }
        }
        // Check if student has results
        if (studentData.results && studentData.results.length > 0) {
          // Get the most recent result
          const studentResult = studentData.results[0];
          setResult(studentResult);
        } else {
          // If no results found in API, use dummy data for testing
          console.warn("No results found for student, using dummy data");

        }
      } catch (err) {
        console.error("Error fetching student data:", err);
        setError("Failed to load result. Please try again later.");
        // Use dummy data as fallback

      } finally {
        setLoading(false);
      }
    };

    fetchStudentData();
  }, []);

  // const getStatusColor = (status: ResultStatus) => {
  //   switch (status) {
  //     case ResultStatus.PASS: return 'bg-emerald-500';
  //     case ResultStatus.FAIL: return 'bg-red-500';
  //     case ResultStatus.PENDING: return 'bg-amber-500';
  //     case ResultStatus.INCOMPLETE: return 'bg-orange-500';
  //     case ResultStatus.WITHHELD: return 'bg-purple-500';
  //     case ResultStatus.CANCELLED: return 'bg-gray-500';
  //     default: return 'bg-gray-500';
  //   }
  // };

  // const getGradeColor = (grade: Grade) => {
  //   switch (grade) {
  //     case Grade.A_PLUS: return 'bg-emerald-500';
  //     case Grade.A: return 'bg-emerald-600';
  //     case Grade.B_PLUS: return 'bg-blue-500';
  //     case Grade.B: return 'bg-blue-600';
  //     case Grade.C_PLUS: return 'bg-amber-500';
  //     case Grade.C: return 'bg-amber-600';
  //     case Grade.D: return 'bg-orange-500';
  //     case Grade.F: return 'bg-red-500';
  //     default: return 'bg-gray-500';
  //   }
  // };

  const formatGrade = (grade: string) => {
    if (grade === 'A_PLUS') return 'A+';
    if (grade === 'B_PLUS') return 'B+';
    if (grade === 'C_PLUS') return 'C+';
    return grade;
  };

  const formatMonth = (month: Month) => {
    return month.charAt(0) + month.slice(1).toLowerCase();
  };

  const calculatePercentage = (obtained: number, total: number) => {
    return ((obtained / total) * 100).toFixed(1);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-6xl">
        <Card className="border-none shadow-2xl">
          <CardHeader className="bg-gradient-to-br from-blue-900 to-indigo-900 text-white p-8">
            <Skeleton className="h-10 w-3/4 bg-white/20 rounded-lg" />
            <Skeleton className="h-6 w-1/2 bg-white/20 mt-4 rounded-lg" />
          </CardHeader>
          <CardContent className="p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2, 3, 4].map(i => (
                <Skeleton key={i} className="h-24 rounded-xl" />
              ))}
            </div>
            <Skeleton className="h-64 rounded-xl" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error && !result) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="border-none shadow-2xl">
            <CardHeader className="bg-gradient-to-br from-red-800 to-red-900 text-white p-8">
              <CardTitle className="text-3xl font-bold">Error</CardTitle>
              <CardDescription className="text-red-100 text-lg">We couldn't load your results</CardDescription>
            </CardHeader>
            <CardContent className="p-8">
              <p className="text-red-600 text-lg">{error}</p>
            </CardContent>
            <CardFooter className="bg-gray-50 p-6 rounded-b-lg">
              <Button
                onClick={() => window.location.reload()}
                className="bg-blue-800 hover:bg-blue-700 text-lg px-6 py-3"
              >
                Try Again
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-6xl">
        <Card className="border-none shadow-2xl">
          <CardHeader className="bg-gradient-to-br from-blue-900 to-indigo-900 text-white p-8">
            <CardTitle className="text-3xl font-bold">Result Not Found</CardTitle>
            <CardDescription className="text-blue-100 text-lg">The requested result could not be found.</CardDescription>
          </CardHeader>
          <CardContent className="p-12">
            <p className="text-center text-gray-600 text-xl">No result data is available for your account.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto my-10">
      <div id="result-section" className="bg-white p-6 rounded-lg shadow-lg border">
        <h1 className="text-2xl font-bold text-center text-blue-900 mb-6">Result</h1>
        {/* Top Info Box */}
        <div className="border rounded-md p-4 mb-8 bg-gray-50 flex flex-col md:flex-row md:justify-between md:items-center">
          <div className="flex-1 mb-2 md:mb-0">
            <span className="font-bold">Course :</span> <span className="ml-2">{courseName}</span>
          </div>
          <div className="flex-1 mb-2 md:mb-0">
            <span className="font-bold">Name :</span> <span className="ml-2">{student?.name}</span>
          </div>
          <div className="flex-1">
            <span className="font-bold">Enrollment No :</span> <span className="ml-2">{student?.enrollmentNumber || student?.applicationNumber}</span>
          </div>
        </div>

        {/* Result Summary */}
        <h2 className="text-xl font-semibold text-center mb-2 mt-6">Result Summary</h2>
        <div className="overflow-x-auto mb-8">
          <table className="min-w-full border text-center bg-white">
            <thead className="bg-blue-50">
              <tr>
                <th className="border px-4 py-2">EXAM MONTH & YEAR</th>
                <th className="border px-4 py-2">TOTAL MARKS</th>
                <th className="border px-4 py-2">OBTAINED MARKS</th>
                <th className="border px-4 py-2">% OF MARKS</th>
                <th className="border px-4 py-2">STATUS</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-gray-50">
                <td className="border px-4 py-2">{formatMonth(result.month)} {(result.year).split('Y')[1]}</td>
                <td className="border px-4 py-2">{result.totalMarks}</td>
                <td className="border px-4 py-2">{result.obtainedMarks}</td>
                <td className="border px-4 py-2">{calculatePercentage(result.obtainedMarks, result.totalMarks)}%</td>
                <td className="border px-4 py-2 font-semibold">{result.status}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Result Details */}
        <h2 className="text-xl font-semibold text-center mb-2 mt-8">Result Details</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border text-center bg-white">
            <thead className="bg-blue-50">
              <tr>
                <th className="border px-4 py-2">SUBJECT CODE</th>
                <th className="border px-4 py-2">SUBJECT</th>
                <th className="border px-4 py-2">TOTAL MARKS</th>
                <th className="border px-4 py-2">OBTAINED MARKS</th>
                <th className="border px-4 py-2">GRADE</th>
                <th className="border px-4 py-2">STATUS</th>
              </tr>
            </thead>
            <tbody>
              {result.details.map((subject, idx) => (
                <tr key={subject.id} className={idx % 2 === 0 ? 'bg-gray-50' : ''}>
                  <td className="border px-4 py-2">{subject.code}</td>
                  <td className="border px-4 py-2">{subject.name}</td>
                  <td className="border px-4 py-2">{subject.totalMarks}</td>
                  <td className="border px-4 py-2">{subject.obtainedMarks}</td>
                  <td className="border px-4 py-2">{formatGrade(subject.grade)}</td>
                  <td className="border px-4 py-2">{subject.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex justify-end mt-6">
        <button
          onClick={async () => {
            const resultSection = document.getElementById('result-section');
            if (resultSection) {
              resultSection.querySelectorAll('*').forEach(el => {
                const style = getComputedStyle(el);
                if (style.backgroundColor.includes('oklch')) {
                  (el as HTMLElement).style.backgroundColor = '#ffffff';
                }
                if (style.color.includes('oklch')) {
                  (el as HTMLElement).style.color = '#000000';
                }
              });
              const canvas = await html2canvas(resultSection, { scale: 2 });
              const imgData = canvas.toDataURL('image/png');
              const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'pt',
                format: 'a4',
              });
              const pageWidth = pdf.internal.pageSize.getWidth();
              // const pageHeight = pdf.internal.pageSize.getHeight();
              const imgProps = pdf.getImageProperties(imgData);
              const pdfWidth = pageWidth;
              const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
              pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
              pdf.save('Result.pdf');
            }
          }}
          className="px-6 py-2 bg-green-700 text-white rounded shadow hover:bg-green-800"
        >
          Download PDF
        </button>
      </div>
    </div>
  );
};

export default Result;