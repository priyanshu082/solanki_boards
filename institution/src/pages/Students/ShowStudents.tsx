import { useState, useEffect } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { allStudentsSearchUrl } from '@/Config';
import { useNavigate } from 'react-router-dom';

interface Student {
  id: string;
  applicationNumber: string;
  name: string;
  admissionType: AdmissionType;
  batch: string;
  paymentStatus: string;
}

interface FilterParams {
  name?: string;
  applicationNumber?: string;
  admissionType?: string;
  batch?: string;
  paymentStatus?: string;
}

const ShowStudents = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const itemsPerPage = 10;
  const navigate = useNavigate();

  // Filter states
  const [filters, setFilters] = useState<FilterParams>({
    name: '',
    applicationNumber: '',
    admissionType: 'all',
    batch: 'all',
    paymentStatus: 'any'
  });

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

  const fetchStudents = async (page: number = currentPage) => {
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

      const skip = (page - 1) * itemsPerPage;
      const limit = itemsPerPage;

      // Remove empty or 'all'/'any' values from filters
      const cleanFilters = Object.fromEntries(
        Object.entries(filters).filter(([, value]) =>
          value !== '' && value !== 'all' && value !== 'any'
        )
      );

      const response = await axios.post(allStudentsSearchUrl, {
        instituteId: localStorage.getItem('id'),
        skip,
        limit,
        ...cleanFilters
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.data.students) {
        setStudents(response.data.students);
        setTotalItems(response.data.total || response.data.students.length);
        setTotalPages(Math.ceil((response.data.total || response.data.students.length) / itemsPerPage));
      } else {
        setStudents(response.data);
        setTotalItems(response.data.length);
        setTotalPages(Math.ceil(response.data.length / itemsPerPage));
      }

    } catch (error: unknown) {
      console.error('Error fetching students:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error instanceof Error ? error.message : 'Failed to fetch students',
        confirmButtonColor: '#3085d6'
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, [filters]);

  const handleStudentClick = (id: string) => {
    navigate(`/student-details/${id}`);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    fetchStudents(page);
  };

  const handleFilterChange = (key: keyof FilterParams, value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setFilters({
      name: '',
      applicationNumber: '',
      admissionType: 'all',
      batch: 'all',
      paymentStatus: 'any'
    });
    setCurrentPage(1);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">All Students</h1>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Input
          type="text"
          placeholder="Search by name"
          value={filters.name}
          onChange={(e) => handleFilterChange('name', e.target.value)}
        />

        <Input
          type="text"
          placeholder="Search by application number"
          value={filters.applicationNumber}
          onChange={(e) => handleFilterChange('applicationNumber', e.target.value)}
        />

        <Select
          value={filters.admissionType}
          onValueChange={(value) => handleFilterChange('admissionType', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Admission Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Admission Types</SelectItem>
            {admissionTypes.map((type) => (
              <SelectItem key={type.id} value={type.id}>{type.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={filters.batch}
          onValueChange={(value) => handleFilterChange('batch', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Batch" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Batches</SelectItem>
            {batches.map((batch) => (
              <SelectItem key={batch.id} value={batch.id}>{batch.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={filters.paymentStatus}
          onValueChange={(value) => handleFilterChange('paymentStatus', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Payment Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="any">All Payment Status</SelectItem>
            {paymentStatuses.map((status) => (
              <SelectItem key={status.id} value={status.id}>{status.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button onClick={() => fetchStudents(1)} disabled={loading}>
          {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          Refresh
        </Button>

        <Button
          variant="outline"
          onClick={clearFilters}
          disabled={loading}
        >
          Clear Filters
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Application No.</TableHead>
              <TableHead>Student Name</TableHead>
              <TableHead>Admission Type</TableHead>
              <TableHead>Batch</TableHead>
              <TableHead>Payment Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {students.map((student) => (
              <TableRow key={student.id}>
                <TableCell>{student.applicationNumber}</TableCell>
                <TableCell>{student.name}</TableCell>
                <TableCell>{student.admissionType}</TableCell>
                <TableCell>{student.batch}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs ${student.paymentStatus === PaymentStatus.SUCCESS ? 'bg-green-100 text-green-800' :
                    student.paymentStatus === PaymentStatus.FAILED ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                    {student.paymentStatus}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="outline"
                    onClick={() => handleStudentClick(student.id)}
                  >
                    View Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-8 gap-2">
        <Button
          variant="outline"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1 || loading}
        >
          Previous
        </Button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <Button
            key={page}
            variant={currentPage === page ? "default" : "outline"}
            onClick={() => handlePageChange(page)}
            disabled={loading}
          >
            {page}
          </Button>
        ))}

        <Button
          variant="outline"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages || loading}
        >
          Next
        </Button>
      </div>
      <div className="text-center mt-2 text-sm text-gray-500">
        Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} students
      </div>
    </div>
  );
};

export default ShowStudents;