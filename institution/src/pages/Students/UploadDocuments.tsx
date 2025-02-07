import { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import axios from 'axios';
import { ExaminationType } from '@/store/atoms/formDataAtoms'; // Importing ExaminationType

interface StudentDetails {
  name: string;
  fatherName: string;
  motherName: string;
  course: string;
  instituteId: string;
  qualifications: Array<{
    type: ExaminationType; // Updated to use ExaminationType
    yearOfPassing?: string;
  }>;
}

const UploadDocuments = () => {
  const [searchType, setSearchType] = useState<'name' | 'application'>('name');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [studentData, setStudentData] = useState<StudentDetails | null>(null);

  const handleSearch = async () => {
    setIsLoading(true);
    try {
      // Using dummy data for now
      const dummyData: StudentDetails = {
        name: "John Doe",
        fatherName: "Richard Doe",
        motherName: "Jane Doe",
        course: "Computer Science",
        instituteId: "INST12345",
        qualifications: [
          { type: ExaminationType.X, yearOfPassing: "2020" }, // Updated to use ExaminationType
          { type: ExaminationType.XII, yearOfPassing: "2024" } // Updated to use ExaminationType
        ]
      };
      // Simulating an API call with axios
      const response = await axios.get(`/api/students/search?type=${searchType}&query=${searchQuery}`);
      // Uncomment the line below to use actual data from the response
      // setStudentData(response.data);
      setStudentData(dummyData); // Use dummy data for now
    } catch (error) {
      console.error('Error fetching student data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDocumentUpload = async (qualificationType: ExaminationType, file: File) => { // Updated to use ExaminationType
    const formData = new FormData();
    formData.append('document', file);
    formData.append('qualificationType', qualificationType);
    formData.append('studentId', studentData?.name || '');

    try {
      // Replace with your actual upload endpoint
      const response = await axios.post('/api/documents/upload', formData);
      
      if (response.status === 200) {
        // Update UI to show success
        console.log('Document uploaded successfully');
      }
    } catch (error) {
      console.error('Error uploading document:', error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      {/* Search Section */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Search Student</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <Select
              value={searchType}
              onValueChange={(value: 'name' | 'application') => setSearchType(value)}
            >
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Search by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="application">Application Number</SelectItem>
              </SelectContent>
            </Select>
            
            <div className="flex-1">
              <Input
                placeholder={`Enter student ${searchType}`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <Button 
              onClick={handleSearch}
              disabled={isLoading}
              className="w-full md:w-auto"
            >
              <Search className="mr-2 h-4 w-4" />
              Search
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Student Details Section */}
      {studentData && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Student Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="font-semibold">Name:</p>
                <p>{studentData.name}</p>
              </div>
              <div>
                <p className="font-semibold">Father's Name:</p>
                <p>{studentData.fatherName}</p>
              </div>
              <div>
                <p className="font-semibold">Mother's Name:</p>
                <p>{studentData.motherName}</p>
              </div>
              <div>
                <p className="font-semibold">Course:</p>
                <p>{studentData.course}</p>
              </div>
              <div>
                <p className="font-semibold">Institute ID:</p>
                <p>{studentData.instituteId}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Document Upload Section */}
      {studentData?.qualifications && (
        <Card>
          <CardHeader>
            <CardTitle>Document Upload</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {studentData.qualifications.map((qual, index) => (
                <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border rounded-lg">
                  <div>
                    <p className="font-semibold">{qual.type}</p>
                    {qual.yearOfPassing && (
                      <p className="text-sm text-gray-600">Year: {qual.yearOfPassing}</p>
                    )}
                  </div>
                  <div className="flex items-center">
                    <Input
                      type="file"
                      accept=".pdf"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          handleDocumentUpload(qual.type, file); // Updated to use ExaminationType
                        }
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default UploadDocuments;