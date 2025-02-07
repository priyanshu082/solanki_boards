import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Student {
  id: number;
  applicationNumber: string;
  name: string;
  fatherName: string;
  admissionType: string; // Added admissionType to Student interface
  batch: string; // Added batch to Student interface
  course: string; // Added course to Student interface
  status: string; // Added status to Student interface
  documentsUploaded: string; // Added documentsUploaded to Student interface
}

const ShowStudents = () => {
  const [batches, setBatches] = useState<any[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [filters, setFilters] = useState({
    admissionType: '',
    batch: '',
    course: '',
    status: '',
    documentsUploaded: ''
  });

  useEffect(() => {
    const fetchBatches = async () => {
      try {
        const response = await fetch('/api/batches');
        const data = await response.json();
        setBatches(data);
      } catch (error) {
        console.error('Error fetching batches:', error);
      }
    };
    fetchBatches();
  }, []);

  const handleSearch = async () => {
    try {
      const response = await fetch('/api/students/filter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(filters)
      });
      const data = await response.json();
      setStudents(data);
    } catch (error) {
      console.error('Error searching students:', error);
      // Using dummy data if API fails
      const dummyData: Student[] = [
        { id: 1, applicationNumber: "APP123", name: "John Doe", fatherName: "Richard Doe", admissionType: "TOC", batch: "Batch 1", course: "Senior", status: "Registered", documentsUploaded: "Yes" },
        { id: 2, applicationNumber: "APP124", name: "Jane Smith", fatherName: "Michael Smith", admissionType: "PART", batch: "Batch 2", course: "Senior Secondary", status: "Pending", documentsUploaded: "No" },
      ];
      setStudents(dummyData);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Student Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            <div>
              <Select onValueChange={(value) => setFilters({...filters, admissionType: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Admission Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="TOC">TOC</SelectItem>
                  <SelectItem value="PART">Part Admission</SelectItem>
                  <SelectItem value="BOSSE">BOSSE</SelectItem>
                  <SelectItem value="REPEAT">Repeat</SelectItem>
                  <SelectItem value="VOCATIONAL">Vocational</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Select onValueChange={(value) => setFilters({...filters, batch: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Batch" />
                </SelectTrigger>
                <SelectContent>
                  {batches.map((batch: any) => (
                    <SelectItem key={batch.id} value={batch.id}>{batch.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Select onValueChange={(value) => setFilters({...filters, course: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Course" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="SENIOR">Senior</SelectItem>
                  <SelectItem value="SENIOR_SECONDARY">Senior Secondary</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Select onValueChange={(value) => setFilters({...filters, status: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="REGISTERED">Registered</SelectItem>
                  <SelectItem value="PENDING">Pending</SelectItem>
                  <SelectItem value="ELIGIBLE">Eligible</SelectItem>
                  <SelectItem value="NON_ELIGIBLE">Non Eligible</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Select onValueChange={(value) => setFilters({...filters, documentsUploaded: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Documents Uploaded" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="YES">Yes</SelectItem>
                  <SelectItem value="NO">No</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button 
            onClick={handleSearch} 
            className="w-full md:w-auto"
          >
            <Search className="mr-2 h-4 w-4" />
            Search
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Student List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-16">No.</TableHead>
                  <TableHead>Application No.</TableHead>
                  <TableHead>Student Name</TableHead>
                  <TableHead>Father Name</TableHead>
                  <TableHead>Admission Type</TableHead> {/* Added Admission Type column */}
                  <TableHead>Batch</TableHead> {/* Added Batch column */}
                  <TableHead>Course</TableHead> {/* Added Course column */}
                  <TableHead>Status</TableHead> {/* Added Status column */}
                  <TableHead>Documents Uploaded</TableHead> {/* Added Documents Uploaded column */}
                </TableRow>
              </TableHeader>
              <TableBody>
                {students.map((student, index) => (
                  <TableRow key={student.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{student.applicationNumber}</TableCell>
                    <TableCell>{student.name}</TableCell>
                    <TableCell>{student.fatherName}</TableCell>
                    <TableCell>{student.admissionType}</TableCell> {/* Display Admission Type */}
                    <TableCell>{student.batch}</TableCell> {/* Display Batch */}
                    <TableCell>{student.course}</TableCell> {/* Display Course */}
                    <TableCell>{student.status}</TableCell> {/* Display Status */}
                    <TableCell>{student.documentsUploaded}</TableCell> {/* Display Documents Uploaded */}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ShowStudents;