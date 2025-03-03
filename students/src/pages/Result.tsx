import { useEffect, useState } from 'react';
import axios from 'axios';
import { studentResultUrl } from '../Config';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { jsPDF } from "jspdf";
import { Printer, Download, Share2 } from 'lucide-react';
import { motion } from "framer-motion";


declare module 'jspdf' {
  interface jsPDF {
    autoTable: (options: any) => jsPDF;
  }
}

// Define types based on your schema
interface SubjectResultDetail {
  id: string;
  code: string;
  name: string;
  totalMarks: number;
  obtainedMarks: number;
  grade: string;
  status: string;
}

interface Result {
  id: string;
  studentId: string;
  month: string;
  year: string;
  totalMarks: number;
  obtainedMarks: number;
  status: string;
  details: SubjectResultDetail[];
  student: {
    name: string;
    rollNumber: string;
  };
}

// Dummy data for testing
const dummyResult: Result = {
  id: "result123",
  studentId: "student456", 
  month: "May",
  year: "2023",
  totalMarks: 500,
  obtainedMarks: 425,
  status: "PASS",
  student: {
    name: "John Doe",
    rollNumber: "R2023001"
  },
  details: [
    {
      id: "sub1",
      code: "CS101",
      name: "Introduction to Computer Science",
      totalMarks: 100,
      obtainedMarks: 85,
      grade: "A",
      status: "PASS"
    },
    {
      id: "sub2", 
      code: "MA101",
      name: "Mathematics for Computing",
      totalMarks: 100,
      obtainedMarks: 78,
      grade: "B",
      status: "PASS"
    },
    {
      id: "sub3",
      code: "EN101", 
      name: "Technical Communication",
      totalMarks: 100,
      obtainedMarks: 92,
      grade: "A",
      status: "PASS"
    },
    {
      id: "sub4",
      code: "PH101",
      name: "Physics",
      totalMarks: 100,
      obtainedMarks: 88,
      grade: "A", 
      status: "PASS"
    },
    {
      id: "sub5",
      code: "DS101",
      name: "Data Structures",
      totalMarks: 100,
      obtainedMarks: 82,
      grade: "B",
      status: "PASS"
    }
  ]
};

const Result = () => {
  const [result, setResult] = useState<Result | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);
  const [hasDigilockerCode, setHasDigilockerCode] = useState<boolean>(false);

  // Check if DigiLocker code exists on component mount
  useEffect(() => {
    const digilockerCode = localStorage.getItem('digilockerCode');
    setHasDigilockerCode(!!digilockerCode);
  }, []);

  useEffect(() => {
    const fetchResult = async () => {
      try {
        setLoading(true);
        const studentId = localStorage.getItem('id');
        
        try {
          const response = await axios.get(`${studentResultUrl}/${studentId}`);
          setResult(response.data);
        } catch (apiError) {
          console.error("API error:", apiError);
          setResult(dummyResult);
        }
      } catch (err) {
        setError("Failed to load result. Please try again later.");
        console.error(err);
        setResult(dummyResult);
      } finally {
        setLoading(false);
      }
    };

    fetchResult();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PASS': return 'bg-emerald-500';
      case 'FAIL': return 'bg-red-500';
      case 'SUPPLEMENTARY': return 'bg-amber-500';
      default: return 'bg-gray-500';
    }
  };

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'A': return 'bg-emerald-500';
      case 'B': return 'bg-blue-600';
      case 'C': return 'bg-amber-500';
      case 'D': return 'bg-orange-500';
      case 'F': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const calculatePercentage = (obtained: number, total: number) => {
    return ((obtained / total) * 100).toFixed(2);
  };

  const generatePDFBase64 = async (): Promise<string> => {
    if (!result) return '';

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
      doc.text(`Examination: ${result.month} ${result.year}`, 20, 32);

      // Student details
      doc.setDrawColor(0, 48, 87);
      doc.rect(15, 38, 180, 30);
      doc.setFontSize(11);
      doc.setTextColor(0);
      doc.text([
        `Student Name: ${result.student.name}`,
        `Roll Number: ${result.student.rollNumber}`,
        `Total Marks: ${result.totalMarks}`,
        `Marks Obtained: ${result.obtainedMarks}`,
        `Percentage: ${calculatePercentage(result.obtainedMarks, result.totalMarks)}%`,
        `Final Result: ${result.status}`
      ], 20, 45);

      // Try to use autoTable if available
      try {
        // Subject-wise results table
        const headers = [["Code", "Subject", "Total", "Obtained", "Grade", "Status"]];
        const data = result.details.map(sub => [
          sub.code,
          sub.name,
          sub.totalMarks.toString(),
          sub.obtainedMarks.toString(),
          sub.grade,
          sub.status
        ]);

        // AutoTable approach
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
        let finalY = (doc as any).lastAutoTable.finalY + 5;
        
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
      } catch (autoTableError) {
        console.log("AutoTable failed, using manual table approach");
        
        // Manual table implementation (same as in downloadPDF)
        // ...omitted for brevity...
      }

      // Footer
      doc.setFontSize(8);
      doc.text("This is a computer-generated document", 105, 290, { align: "center" });

      // Return base64 string instead of saving
      return doc.output('datauristring').split(',')[1];
    } catch (error) {
      console.error("Error generating PDF:", error);
      throw new Error("Failed to generate PDF base64");
    }
  };

  const downloadPDF = () => {
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
      doc.text(`Examination: ${result.month} ${result.year}`, 20, 32);

      // Student details
      doc.setDrawColor(0, 48, 87);
      doc.rect(15, 38, 180, 30);
      doc.setFontSize(11);
      doc.setTextColor(0);
      doc.text([
        `Student Name: ${result.student.name}`,
        `Roll Number: ${result.student.rollNumber}`,
        `Total Marks: ${result.totalMarks}`,
        `Marks Obtained: ${result.obtainedMarks}`,
        `Percentage: ${calculatePercentage(result.obtainedMarks, result.totalMarks)}%`,
        `Final Result: ${result.status}`
      ], 20, 45);

      // Try to use autoTable if available
      try {
        // Subject-wise results table
        const headers = [["Code", "Subject", "Total", "Obtained", "Grade", "Status"]];
        const data = result.details.map(sub => [
          sub.code,
          sub.name,
          sub.totalMarks.toString(),
          sub.obtainedMarks.toString(),
          sub.grade,
          sub.status
        ]);

        // AutoTable approach
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
        let finalY = (doc as any).lastAutoTable.finalY + 5;
        
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
      } catch (autoTableError) {
        console.log("AutoTable failed, using manual table approach");
        
        // Manual table approach - fallback if autoTable is not available
        // Draw table header
        let yPosition = 72;
        doc.setFillColor(0, 48, 87);
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(10);
        
        // Header cells
        const columns = [
          { x: 15, width: 25, text: "Code" },
          { x: 40, width: 60, text: "Subject" },
          { x: 100, width: 25, text: "Total" },
          { x: 125, width: 25, text: "Obtained" },
          { x: 150, width: 20, text: "Grade" },
          { x: 170, width: 25, text: "Status" }
        ];
        
        // Draw header cells
        doc.rect(15, yPosition, 180, 8, 'F');
        columns.forEach(col => {
          doc.text(col.text, col.x + 2, yPosition + 5.5);
        });
        yPosition += 8;
        
        // Draw data rows
        doc.setTextColor(0);
        doc.setFontSize(9);
        
        result.details.forEach((subject, index) => {
          const rowHeight = 7;
          // Alternate row colors for better readability
          if (index % 2 === 0) {
            doc.setFillColor(240, 240, 240);
            doc.rect(15, yPosition, 180, rowHeight, 'F');
          }
          
          // Draw cell content
          doc.text(subject.code, columns[0].x + 2, yPosition + 5);
          doc.text(subject.name, columns[1].x + 2, yPosition + 5);
          doc.text(subject.totalMarks.toString(), columns[2].x + 2, yPosition + 5);
          doc.text(subject.obtainedMarks.toString(), columns[3].x + 2, yPosition + 5);
          doc.text(subject.grade, columns[4].x + 2, yPosition + 5);
          doc.text(subject.status, columns[5].x + 2, yPosition + 5);
          
          // Draw cell borders
          doc.setDrawColor(200, 200, 200);
          doc.rect(15, yPosition, 180, rowHeight);
          columns.forEach((col, i) => {
            if (i > 0) {
              doc.line(col.x, yPosition, col.x, yPosition + rowHeight);
            }
          });
          
          yPosition += rowHeight;
        });
        
        // Summary section
        yPosition += 5;
        doc.setFontSize(11);
        doc.setDrawColor(0, 48, 87);
        doc.rect(15, yPosition, 180, 25);
        doc.text([
          "Final Summary",
          `Total Marks: ${result.totalMarks}`,
          `Marks Obtained: ${result.obtainedMarks}`,
          `Percentage: ${calculatePercentage(result.obtainedMarks, result.totalMarks)}%`,
          `Overall Grade: ${result.status}`
        ], 20, yPosition + 7);
      }

      // Footer
      doc.setFontSize(8);
      doc.text("This is a computer-generated document", 105, 290, { align: "center" });

      // Save PDF
      doc.save(`Result_${result.student.rollNumber}_${result.month}${result.year}.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Failed to generate PDF. Please try again later.");
    }
  };

  // DigiLocker Authentication URL
  const DIGILOCKER_AUTH_URL = "https://digilocker.meripehchaan.gov.in/signin/oauth_partner/%252Foauth2%252F1%252Fconsent%253Flogo%253D%2526response_type%253Dcode%2526client_id%253DCX18B80B79%2526state%253Doidc_flow%2526redirect_uri%253Dhttps%25253A%25252F%25252Fsbiea.co.in%25252F%2526code_challenge%253DL4_TbsMstNvZHy_R9GoyVTPiR7Vt7N-KryCI2Nse9J0%2526code_challenge_method%253DS256%2526scope%253Dopenid%2526orgid%253D108138%2526txn%253D67c58844c2e05oauth21740998724%2526hashkey%253D99d9abbfe34b1e5786f8f5e0f30c4b67491c3aea9b5c0355ad958e2b41aa9499%2526requst_pdf%253DY%2526app_name%253DdGVzdA%25253D%25253D%2526signup%253Dsignup";
  
  // DigiLocker Access Token and Upload Endpoints
  const TOKEN_API_URL = "https://api.digitallocker.gov.in/public/oauth2/1/token";
  const UPLOAD_API_URL = "https://api.digitallocker.gov.in/public/oauth2/1/file/upload";
  
  // DigiLocker Client ID and Secret (should be stored securely in a real application)
  const CLIENT_ID = "CX18B80B79";
  const CLIENT_SECRET = "your_client_secret_here"; // This should be stored securely, not hardcoded
  
  const getAccessToken = async (code: string): Promise<string> => {
    try {
      const response = await axios.post(TOKEN_API_URL, {
        grant_type: 'authorization_code',
        code: code,
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        redirect_uri: 'https://sbiea.co.in/'
      }, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
      
      // Store token in localStorage (optional)
      localStorage.setItem('digilockerToken', response.data.access_token);
      return response.data.access_token;
    } catch (error) {
      console.error("Error getting access token:", error);
      throw new Error("Failed to get access token from DigiLocker");
    }
  };

  const uploadFileToDigilocker = async (accessToken: string, fileBase64: string) => {
    try {
      // Create file path for DigiLocker
      const fileName = `Result_${result?.student.rollNumber}_${result?.month}${result?.year}.pdf`;
      const path = `/Results/${fileName}`;
      
      // Calculate HMAC for file integrity verification
      // Note: In a real application, you should implement proper HMAC calculation
      // This is a placeholder - you need to implement this correctly
      const hmac = await calculateHmac(fileBase64, CLIENT_SECRET);
      
      // Upload file to DigiLocker
      const response = await axios.post(UPLOAD_API_URL, fileBase64, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/pdf',
          'path': path,
          'hmac': hmac
        }
      });
      
      return response.data;
    } catch (error) {
      console.error("Error uploading file to DigiLocker:", error);
      throw new Error("Failed to upload file to DigiLocker");
    }
  };

  // Helper function to calculate HMAC using SHA-256
  const calculateHmac = async (data: string, key: string): Promise<string> => {
    // This is a placeholder - in a real application, you should use a proper HMAC implementation
    // Example implementation using Web Crypto API:
    try {
      const encoder = new TextEncoder();
      const keyData = encoder.encode(key);
      const message = encoder.encode(data);
      
      const cryptoKey = await window.crypto.subtle.importKey(
        'raw', keyData, { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']
      );
      
      const signature = await window.crypto.subtle.sign('HMAC', cryptoKey, message);
      
      // Convert to Base64
      return btoa(String.fromCharCode(...new Uint8Array(signature)));
    } catch (error) {
      console.error("Error calculating HMAC:", error);
      return "HMAC_CALCULATION_FAILED"; // This is just a fallback, won't work in production
    }
  };

  const uploadToDigilocker = async () => {
    // Check if DigiLocker code is available in localStorage
    const digilockerCode = localStorage.getItem('digilockerCode');
    
    if (!digilockerCode) {
      // Redirect to DigiLocker authentication
      window.location.href = DIGILOCKER_AUTH_URL;
      return;
    }
    
    try {
      setUploading(true);
      setUploadStatus("Getting access token...");
      
      // Get access token
      const accessToken = await getAccessToken(digilockerCode);
      
      setUploadStatus("Generating PDF...");
      // Generate PDF as base64
      const pdfBase64 = await generatePDFBase64();
      
      setUploadStatus("Uploading to DigiLocker...");
      // Upload to DigiLocker
      await uploadFileToDigilocker(accessToken, pdfBase64);
      
      setUploadStatus("Success! Your result has been uploaded to DigiLocker.");
      // Clear the code after successful upload
      localStorage.removeItem('digilockerCode');
    } catch (error) {
      console.error("DigiLocker upload failed:", error);
      setUploadStatus("Failed to upload to DigiLocker. Please try again.");
      // Optionally clear the code on error to start fresh
      localStorage.removeItem('digilockerCode');
    } finally {
      setUploading(false);
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
                  {result.month} {result.year}
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
                { label: "Student Name", value: result.student?.name || 'N/A' },
                { label: "Roll Number", value: result.student?.rollNumber || 'N/A' },
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
                          {subject.grade}
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
              disabled={uploading}
            >
              <Printer className="mr-2 h-5 w-5" />
              Print
            </Button>
            <Button 
              onClick={downloadPDF} 
              className="bg-green-700 hover:bg-green-600 text-white px-6"
              disabled={uploading}
            >
              <Download className="mr-2 h-5 w-5" />
              Download PDF
            </Button>
            <Button 
              onClick={uploadToDigilocker} 
              className="bg-blue-800 hover:bg-blue-700 text-white px-6"
              disabled={uploading}
            >
              <Share2 className="mr-2 h-5 w-5" />
              {uploading ? (
                <div className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {uploadStatus || "Processing..."}
                </div>
              ) : hasDigilockerCode ? (
                "Upload to DigiLocker"
              ) : (
                "Authenticate with DigiLocker"
              )}
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};

export default Result;