import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AdmissionType, BatchType, PaymentStatus } from '@/lib/Interfaces';
import axios from 'axios';
import Swal from 'sweetalert2';
import {  allStudentsSearchUrl } from '@/Config';

interface Student {
  id: string;
  applicationNumber: string;
  name: string;
  fatherName: string;
  admissionType: AdmissionType;
  batch: string;
  courseId: string;
  paymentStatus: string;
  documents: string[];
}

const ShowStudents = () => {
  const [allStudents, setAllStudents] = useState<Student[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Filter states
  const [selectedAdmissionType, setSelectedAdmissionType] = useState('all');
  const [selectedBatch, setSelectedBatch] = useState('all');

  //@ts-ignore
  const [selectedCourse, setSelectedCourse] = useState('all');
  const [selectedPaymentStatus, setSelectedPaymentStatus] = useState('any');
  const [selectedDocumentStatus, setSelectedDocumentStatus] = useState('');

  const admissionTypes = Object.entries(AdmissionType).map(([key, value]) => ({
    id: value.toString(),
    name: key.replace(/_/g, ' ')
  }));

  const batches = Object.entries(BatchType).map(([key, value]) => ({
    id: value.toString(),
    name: key.replace(/_/g, ' ')
  }));

  const paymentStatuses = Object.entries(PaymentStatus).map(([key, value]) => ({
    id: value.toString(),
    name: key.replace(/_/g, ' ')
  }));

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        Swal.fire({
          icon: 'error',
          title: 'Authentication Error',
          text: 'Please login again to continue',
          confirmButtonColor: '#3085d6'
        });
        return;
      }

      const response = await axios.post(allStudentsSearchUrl,{}, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      setAllStudents(response.data);

    } catch (error: any) {
      console.error('Error fetching students:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response?.data?.message || 'Failed to fetch students',
        confirmButtonColor: '#3085d6'
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // Filter students whenever filter criteria changes
  useEffect(() => {
    let result = [...allStudents];

    if (selectedAdmissionType !== 'all') {
      result = result.filter(student => student.admissionType === selectedAdmissionType);
    }

    if (selectedBatch !== 'all') {
      result = result.filter(student => student.batch === selectedBatch);
    }

    if (selectedCourse !== 'all') {
      result = result.filter(student => student.courseId === selectedCourse);
    }

    if (selectedPaymentStatus !== 'any') {
      result = result.filter(student => student.paymentStatus === selectedPaymentStatus);
    }

    if (selectedDocumentStatus !== '') {
      result = result.filter(student => 
        selectedDocumentStatus === 'YES' ? student.documents.length > 0 : student.documents.length === 0
      );
    }

    setFilteredStudents(result);
    setCurrentPage(1);
  }, [selectedAdmissionType, selectedBatch, selectedCourse, selectedPaymentStatus, selectedDocumentStatus, allStudents]);

  // Get current page students
  const paginatedStudents = filteredStudents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Admission Type</label>
              <Select onValueChange={setSelectedAdmissionType} value={selectedAdmissionType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Admission Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  {admissionTypes.map((type) => (
                    <SelectItem key={type.id} value={type.id}>{type.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Batch</label>
              <Select onValueChange={setSelectedBatch} value={selectedBatch}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Batch" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  {batches.map((batch) => (
                    <SelectItem key={batch.id} value={batch.id}>{batch.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Payment Status</label>
              <Select onValueChange={setSelectedPaymentStatus} value={selectedPaymentStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Payment Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  {paymentStatuses.map((status) => (
                    <SelectItem key={status.id} value={status.id}>{status.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Documents Uploaded</label>
              <Select onValueChange={setSelectedDocumentStatus} value={selectedDocumentStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Document Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="YES">Yes</SelectItem>
                  <SelectItem value="NO">No</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            Student List {loading && <Loader2 className="inline ml-2 animate-spin" />}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between mb-4">
            <Button onClick={fetchStudents} disabled={loading}>
              Refresh
            </Button>
          </div>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-16">No.</TableHead>
                  <TableHead>Application No.</TableHead>
                  <TableHead>Student Name</TableHead>
                  <TableHead>Father Name</TableHead>
                  <TableHead>Admission Type</TableHead>
                  <TableHead>Batch</TableHead>
                  <TableHead>Course</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Documents Uploaded</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedStudents.map((student, index) => (
                  <TableRow key={student.id}>
                    <TableCell>{(currentPage - 1) * itemsPerPage + index + 1}</TableCell>
                    <TableCell>{student.applicationNumber}</TableCell>
                    <TableCell>{student.name}</TableCell>
                    <TableCell>{student.fatherName}</TableCell>
                    <TableCell>{student.admissionType}</TableCell>
                    <TableCell>{student.batch}</TableCell>
                    <TableCell>{student.courseId}</TableCell>
                    <TableCell>{student.paymentStatus}</TableCell>
                    <TableCell>{student.documents.length > 0 ? "Yes" : "No"}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="flex justify-between items-center mt-4">
            <Button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1 || loading}
            >
              Previous
            </Button>
            <span>Page {currentPage} of {Math.ceil(filteredStudents.length / itemsPerPage)}</span>
            <Button
              onClick={() => setCurrentPage(prev => prev + 1)}
              disabled={currentPage >= Math.ceil(filteredStudents.length / itemsPerPage) || loading}
            >
              Next
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ShowStudents;