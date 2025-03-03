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
// import { TOKEN_API_URL, UPLOAD_API_URL, DIGILOCKER_AUTH_URL, CLIENT_ID } from '../Config';   
import { downloadPDF, calculatePercentage } from '../Helper/pdfGenerator';

declare module 'jspdf' {
  interface jsPDF {
    autoTable: (options: any) => jsPDF;
  }
}

// Define types based on your schema
export interface SubjectResultDetail {
  id: string;
  code: string;
  name: string;
  totalMarks: number;
  obtainedMarks: number;
  grade: string;
  status: string;
}

export interface Result {
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

  // Use import.meta.env instead of process.env for Vite
  const CLIENT_ID = import.meta.env.VITE_DIGILOCKER_CLIENT_ID 
  const CLIENT_SECRET = import.meta.env.VITE_DIGILOCKER_CLIENT_SECRET;
  const REDIRECT_URI = import.meta.env.VITE_DIGILOCKER_REDIRECT_URI;
  const AUTH_URL = import.meta.env.VITE_DIGILOCKER_AUTH_URL;
  const CODE_VERIFIER = import.meta.env.VITE_CODE_VERIFIER; 


//   console.log(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI, AUTH_URL);

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

 

 

//   // Function to generate a code challenge from the verifier
//   const generateCodeChallenge = async (verifier: string): Promise<string> => {
//     const encoder = new TextEncoder();
//     const data = encoder.encode(verifier);
//     const digest = await window.crypto.subtle.digest('SHA-256', data);
//     return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
//       .replace(/\+/g, '-')
//       .replace(/\//g, '_')
//       .replace(/=/g, '');
//   };

  // Function to redirect to DigiLocker authentication
  const authenticateWithDigilocker = async () => {
    try { 
      const authUrl = new URL(AUTH_URL);
      window.location.href = authUrl.toString();
    } catch (error) {
      console.error('Error initiating DigiLocker authentication:', error);
      setError('Failed to initiate DigiLocker authentication');
    }
  };

  // Function to get access token using the code from DigiLocker
  const getAccessToken = async (code: string): Promise<string> => {
    try {
      
      if (!CODE_VERIFIER) {
        throw new Error('Code verifier not found. Please authenticate again.');
      }
      
      // Create form data with all required parameters
      const formData = new URLSearchParams();
      formData.append('code', code);
      formData.append('grant_type', 'authorization_code');
      formData.append('client_id', CLIENT_ID);
      formData.append('client_secret', CLIENT_SECRET);
      formData.append('redirect_uri', REDIRECT_URI);
      formData.append('code_verifier', CODE_VERIFIER);
      
      const response = await axios.post('https://api.digitallocker.gov.in/public/oauth2/1/token', formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      
      if (response.status !== 200) {
        const errorData = response.data;
        throw new Error(`Failed to get access token: ${errorData.error_description || 'Unknown error'}`);
      }
      
      const data = response.data;
      return data.access_token;
    } catch (error) {
      console.error('Error getting access token:', error);
      throw error;
    }
  };

//   const uploadFileToDigilocker = async (accessToken: string, fileBase64: string) => {
//     try {
//       // Create file path for DigiLocker
//       const fileName = `Result_${result?.student.rollNumber}_${result?.month}${result?.year}.pdf`;
//       const path = `/Results/${fileName}`;
      
//       // Calculate HMAC for file integrity verification
//       // Note: In a real application, you should implement proper HMAC calculation
//       // This is a placeholder - you need to implement this correctly
//       const hmac = await calculateHmac(fileBase64, CLIENT_SECRET || '');
      
//       // Upload file to DigiLocker
//       const response = await axios.post(UPLOAD_API_URL, fileBase64, {
//         headers: {
//           'Authorization': `Bearer ${accessToken}`,
//           'Content-Type': 'application/pdf',
//           'path': path,
//           'hmac': hmac
//         }
//       });
      
//       return response.data;
//     } catch (error) {
//       console.error("Error uploading file to DigiLocker:", error);
//       throw new Error("Failed to upload file to DigiLocker");
//     }
//   };

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
    try {
      setUploading(true);
      setUploadStatus('Preparing to upload to DigiLocker...');
      
      // Get code from localStorage
      const code = localStorage.getItem('digilockerCode');
      
      if (!code) {
        // If no code, redirect to authentication
        authenticateWithDigilocker();
        return;
      }
      
      setUploadStatus('Getting access token...');
      const accessToken = await getAccessToken(code);
      
      setUploadStatus('Generating PDF...');
      const pdfBase64 = await generatePDFBase64();
      
      setUploadStatus('Calculating HMAC...');
      const hmac = await calculateHmac(pdfBase64, CLIENT_SECRET);
      
      setUploadStatus('Uploading to DigiLocker...');
      const studentName = result?.student?.name?.replace(/\s+/g, '_') || 'Result';
      const fileName = `${studentName}_Result_${result?.month}_${result?.year}.pdf`;
      const path = `/issued-documents/results/${fileName}`;
      
      // Convert base64 to blob
      const binaryString = window.atob(pdfBase64);
      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      const blob = new Blob([bytes], { type: 'application/pdf' });
      
      // Upload to DigiLocker
      const uploadResponse = await fetch('https://api.digitallocker.gov.in/public/oauth2/1/file/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/pdf',
          'path': path,
          'hmac': hmac
        },
        body: blob
      });
      
      if (!uploadResponse.ok) {
        const errorData = await uploadResponse.json();
        throw new Error(`Upload failed: ${errorData.error_description || 'Unknown error'}`);
      }
      
      setUploadStatus('Successfully uploaded to DigiLocker!');
      
      // Clear the code after successful upload
      localStorage.removeItem('digilockerCode');
      localStorage.removeItem('digilockerCodeVerifier');
      setHasDigilockerCode(false);
      
    } catch (error) {
      console.error('Error uploading to DigiLocker:', error);
      setUploadStatus(`Upload failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
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
              onClick={() => downloadPDF({ result })} 
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