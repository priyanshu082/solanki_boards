import { useEffect, useState } from 'react';
import axios from 'axios';
import { studentDetailsUrl } from '../Config';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

import { Printer, Download } from 'lucide-react';
import { motion } from "framer-motion";
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

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
  };
}

const Result = () => {
  const [result, setResult] = useState<Result | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [student, setStudent] = useState<any>(null);

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        setLoading(true);
        const studentId = localStorage.getItem('id');
        
        if (!studentId) {
          throw new Error("Student ID not found");
        }
        
        // Fetch student details which includes results
        const response = await axios.get(`${studentDetailsUrl}/${studentId}`,{
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        const studentData = response.data;
        setStudent(studentData);
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

  const getStatusColor = (status: ResultStatus) => {
    switch (status) {
      case ResultStatus.PASS: return 'bg-emerald-500';
      case ResultStatus.FAIL: return 'bg-red-500';
      case ResultStatus.PENDING: return 'bg-amber-500';
      case ResultStatus.INCOMPLETE: return 'bg-orange-500';
      case ResultStatus.WITHHELD: return 'bg-purple-500';
      case ResultStatus.CANCELLED: return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const getGradeColor = (grade: Grade) => {
    switch (grade) {
      case Grade.A_PLUS: return 'bg-emerald-500';
      case Grade.A: return 'bg-emerald-600';
      case Grade.B_PLUS: return 'bg-blue-500';
      case Grade.B: return 'bg-blue-600';
      case Grade.C_PLUS: return 'bg-amber-500';
      case Grade.C: return 'bg-amber-600';
      case Grade.D: return 'bg-orange-500';
      case Grade.F: return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const formatGrade = (grade: Grade) => {
    switch (grade) {
      case Grade.A_PLUS: return 'A+';
      case Grade.A: return 'A';
      case Grade.B_PLUS: return 'B+';
      case Grade.B: return 'B';
      case Grade.C_PLUS: return 'C+';
      case Grade.C: return 'C';
      case Grade.D: return 'D';
      case Grade.F: return 'F';
      default: return grade;
    }
  };

  const formatMonth = (month: Month) => {
    return month.charAt(0) + month.slice(1).toLowerCase();
  };

  const calculatePercentage = (obtained: number, total: number) => {
    return ((obtained / total) * 100).toFixed(2);
  };

  const handleDownloadPDF = () => {
    if (!result) return;

    try {
      const doc = new jsPDF({ unit: 'mm', format: 'a4' });

      // Header
      doc.setFontSize(24);
      doc.setTextColor(0, 48, 87);
      doc.text("STUDENT RESULT CARD", 105, 15, { align: "center" });

      // Institution details
      doc.setFontSize(12);
      doc.setTextColor(100);
      doc.text(`Academic Year: ${result.year}`, 20, 25);
      doc.text(`Examination: ${formatMonth(result.month)} ${result.year}`, 20, 32);

      // Student details
      doc.setDrawColor(0, 48, 87);
      doc.rect(15, 38, 180, 30);
      doc.setFontSize(11);
      doc.setTextColor(0);
      doc.text([
        `Student Name: ${student.name  || 'N/A'}`,
        `Total Marks: ${result.totalMarks}`,
        `Marks Obtained: ${result.obtainedMarks}`,
        `Percentage: ${calculatePercentage(result.obtainedMarks, result.totalMarks)}%`,
        `Final Result: ${result.status}`
      ], 20, 45);

      // Subject-wise results table
      const headers = [["Code", "Subject", "Total", "Obtained", "Grade", "Status"]];
      const data = result.details.map(sub => [
        sub.code,
        sub.name,
        sub.totalMarks.toString(),
        sub.obtainedMarks.toString(),
        formatGrade(sub.grade),
        sub.status
      ]);

      // @ts-ignore - Using autoTable from the imported jspdf-autotable
      doc.autoTable({
        startY: 72,
        head: headers,
        body: data,
        theme: 'striped',
        headStyles: { fillColor: [0, 48, 87], textColor: 255, fontSize: 10 },
        styles: { fontSize: 9, cellPadding: 2 },
        columnStyles: { 1: { cellWidth: 60 } },
        margin: { left: 15, right: 15 }
      });

      // Get the final Y position from autoTable
      // @ts-ignore
      let finalY = doc.lastAutoTable.finalY + 5;
      
      // Summary section after the table
      doc.setFontSize(11);
      doc.setDrawColor(0, 48, 87);
      doc.rect(15, finalY, 180, 25);
      doc.text([
        "Final Summary",
        `Total Marks: ${result.totalMarks}`,
        `Marks Obtained: ${result.obtainedMarks}`,
        `Percentage: ${calculatePercentage(result.obtainedMarks, result.totalMarks)}%`,
        `Overall Grade: ${result.status}`
      ], 20, finalY + 7);

      // Footer
      doc.setFontSize(8);
      doc.text("This is a computer-generated document", 105, 290, { align: "center" });

      // Save PDF
      doc.save(`Result_${result.month}${result.year}.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Failed to generate PDF. Please try again later.");
    }
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
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-6xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="mb-8 border-none shadow-2xl overflow-hidden">
          <CardHeader className="bg-gradient-to-br from-blue-900 to-indigo-900 text-white p-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <CardTitle className="text-4xl font-bold">Examination Result</CardTitle>
                <CardDescription className="text-blue-100 text-xl mt-2">
                  {formatMonth(result.month)} {result.year}
                </CardDescription>
              </div>
              <Badge className={`${getStatusColor(result.status)} text-white px-6 py-2 text-lg font-medium rounded-full`}>
                {result.status}
              </Badge>
            </div>
          </CardHeader>
          
          <CardContent className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {[
                { label: "Student Name", value: student?.name || 'N/A' },
                { label: "Roll Number", value: student?.rollNumber || 'N/A' },
                { label: "Percentage", value: `${calculatePercentage(result.obtainedMarks, result.totalMarks)}%` },
                { label: "Result Status", value: result.status, isBadge: true }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300"
                >
                  <p className="text-sm text-blue-800 font-medium mb-2">{item.label}</p>
                  {item.isBadge ? (
                    <Badge className={`${getStatusColor(result.status)} text-white px-4 py-1.5 text-base`}>
                      {item.value}
                    </Badge>
                  ) : (
                    <p className="text-gray-700 text-xl font-semibold">{item.value}</p>
                  )}
                </motion.div>
              ))}
            </div>
            
            <div className="bg-white rounded-xl border border-gray-100 shadow-lg overflow-hidden">
              <Table>
                <TableCaption className="py-4 text-lg">Subject-wise Result Details</TableCaption>
                <TableHeader className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white">
                  <TableRow>
                    <TableHead className="text-white font-bold">Subject Code</TableHead>
                    <TableHead className="text-white font-bold">Subject Name</TableHead>
                    <TableHead className="text-white font-bold text-right">Total Marks</TableHead>
                    <TableHead className="text-white font-bold text-right">Obtained Marks</TableHead>
                    <TableHead className="text-white font-bold">Grade</TableHead>
                    <TableHead className="text-white font-bold">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {result.details.map((subject, index) => (
                    <motion.tr
                      key={subject.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="hover:bg-slate-50"
                    >
                      <TableCell className="font-medium">{subject.code}</TableCell>
                      <TableCell>{subject.name}</TableCell>
                      <TableCell className="text-right">{subject.totalMarks}</TableCell>
                      <TableCell className="text-right">{subject.obtainedMarks}</TableCell>
                      <TableCell>
                        <Badge className={`${getGradeColor(subject.grade)} text-white px-3 py-1`}>
                          {formatGrade(subject.grade)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={`${getStatusColor(subject.status)} text-white px-3 py-1`}>
                          {subject.status}
                        </Badge>
                      </TableCell>
                    </motion.tr>
                  ))}
                </TableBody>
              </Table>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-8 p-8 bg-gradient-to-r from-slate-100 to-slate-200 rounded-xl shadow-inner"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { label: "Total Marks", value: result.totalMarks },
                  { label: "Marks Obtained", value: result.obtainedMarks },
                  { label: "Percentage", value: `${calculatePercentage(result.obtainedMarks, result.totalMarks)}%` }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="bg-white p-6 rounded-xl border border-gray-100 shadow-md hover:shadow-lg transition-all duration-300 text-center"
                  >
                    <p className="text-sm text-blue-800 font-medium mb-2">{item.label}</p>
                    <p className="text-3xl font-bold text-gray-800">{item.value}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </CardContent>
          
          <CardFooter className="flex flex-wrap justify-end gap-4 p-8 bg-gradient-to-r from-slate-100 to-slate-200">
            <Button 
              variant="outline" 
              onClick={() => window.print()} 
              className="border-blue-800 text-blue-800 hover:bg-blue-50 text-base px-6"
            >
              <Printer className="mr-2 h-5 w-5" />
              Print
            </Button>
            <Button 
              onClick={handleDownloadPDF} 
              className="bg-green-700 hover:bg-green-600 text-white px-6"
            >
              <Download className="mr-2 h-5 w-5" />
              Download PDF
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};

export default Result;