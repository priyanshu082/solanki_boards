import { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Loader2, X, RotateCcw } from "lucide-react";
import axios from 'axios';
import { DocumentType } from '@/lib/Interfaces';
import { addmisionPutUrl, studentSearchUrl } from '@/Config';
import Swal from 'sweetalert2';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Document {
  id: string;
  documentType: keyof typeof DocumentType;
  fileName: string;
  fileUrl: string;
}

interface StudentDetails {
  id: string;
  name: string;
  fatherName: string;
  motherName: string;
  course: string;
  instituteId: string;
  documents: Document[];
}



const UploadDocuments = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isUpdating, setIsUpdating] = useState<string>('');
  const [studentData, setStudentData] = useState<StudentDetails | null>(null);
  const [uploadError, setUploadError] = useState<string>('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedDocType, setSelectedDocType] = useState<keyof typeof DocumentType>('PROFILE_PHOTO');

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Input',
        text: 'Please enter an application number',
        confirmButtonColor: '#3085d6'
      });
      return;
    }

    setIsLoading(true);
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

      const response = await axios.get(`${studentSearchUrl}/${searchQuery}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.data) {
        setStudentData(response.data);
        setUploadError('');
        setSelectedFile(null);
      } else {
        Swal.fire({
          icon: 'info',
          title: 'No Results',
          text: 'No student found with this application number',
          confirmButtonColor: '#3085d6'
        });
      }
    } catch (error: any) {
      console.error('Error fetching student data:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response?.data?.message || 'Failed to fetch student details',
        confirmButtonColor: '#3085d6'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDocumentUpload = async () => {
    try {
      setIsUploading(true);
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

      if (!selectedFile || !studentData) {
        Swal.fire({
          icon: 'error',
          title: 'File Required',
          text: 'Please select a file to upload',
          confirmButtonColor: '#3085d6'
        });
        return;
      }

      const formData = new FormData();
      formData.append('image', selectedFile);
      formData.append('id', studentData.id);
      formData.append('documentType', selectedDocType);

      const response = await axios.put(`${addmisionPutUrl}`, formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.data) {
        setUploadError('');
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Document uploaded successfully',
          confirmButtonColor: '#3085d6'
        });
        handleSearch();
      }
    } catch (error: any) {
      console.error('Error uploading document:', error);
      setUploadError(error.response?.data?.message || 'Failed to upload document');
      Swal.fire({
        icon: 'error',
        title: 'Upload Failed',
        text: error.response?.data?.message || 'Failed to upload document',
        confirmButtonColor: '#3085d6'
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileRemove = () => {
    setSelectedFile(null);
    setUploadError('');
  };

  const handleDocumentUpdate = async (documentId: string, documentType: keyof typeof DocumentType, file: File) => {
    try {
      setIsUpdating(documentId);
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

      const formData = new FormData();
      formData.append('image', file);
      formData.append('id', studentData!.id);
      formData.append('documentType', documentType);
      formData.append('documentId', documentId);

      const response = await axios.put(`${addmisionPutUrl}`, formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.data) {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Document updated successfully',
          confirmButtonColor: '#3085d6'
        });
        handleSearch(); // Refresh data
      }
    } catch (error: any) {
      Swal.fire({
        icon: 'error',
        title: 'Update Failed',
        text: error.response?.data?.message || 'Failed to update document',
        confirmButtonColor: '#3085d6'
      });
    } finally {
      setIsUpdating('');
    }
  };

  // Get list of document types that haven't been uploaded yet
  const getAvailableDocumentTypes = () => {
    if (!studentData) return Object.entries(DocumentType);

    const uploadedTypes = new Set(studentData.documents.map(doc => doc.documentType as keyof typeof DocumentType));
    return Object.entries(DocumentType).filter(([_, value]) => !uploadedTypes.has(value as keyof typeof DocumentType));
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
            <div className="flex-1">
              <Input
                placeholder="Enter Application Number"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <Button
              onClick={handleSearch}
              disabled={isLoading}
              className="w-full md:w-auto"
            >
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Search className="mr-2 h-4 w-4" />
              )}
              {isLoading ? 'Searching...' : 'Search'}
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
      {studentData && (
        <Card>
          <CardHeader>
            <CardTitle>Document Upload</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border rounded-lg">
                <div>
                  <Select
                    value={selectedDocType}
                    onValueChange={(value: keyof typeof DocumentType) => setSelectedDocType(value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select document type" />
                    </SelectTrigger>
                    <SelectContent>
                      {getAvailableDocumentTypes().map(([key, value]) => (
                        <SelectItem key={key} value={value}>
                          {key.replace(/_/g, ' ')}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <Input
                      type="file"
                      accept=".jpeg,.jpg,.png"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          setSelectedFile(file);
                        }
                      }}
                    />
                    {selectedFile && (
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={handleFileRemove}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  {uploadError && (
                    <p className="text-sm text-red-500">{uploadError}</p>
                  )}
                </div>
                <div className="flex items-center">
                  <Button
                    onClick={handleDocumentUpload}
                    disabled={!selectedFile || isUploading}
                    className="w-full"
                  >
                    {isUploading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Uploading...
                      </>
                    ) : uploadError ? (
                      <>
                        <RotateCcw className="mr-2 h-4 w-4" />
                        Retry Upload
                      </>
                    ) : (
                      'Upload'
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Uploaded Documents Section */}
      {studentData?.documents && studentData.documents.length > 0 && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Uploaded Documents</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {studentData.documents.map((doc) => (
                <div key={doc.id} className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 border rounded-lg items-center">
                  <div>
                    <p className="font-semibold">{doc.documentType.replace(/_/g, ' ')}</p>
                    <p className="text-sm text-gray-600">{doc.fileName}</p>
                  </div>

                  <div>
                    <a
                      href={doc.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      View Document
                    </a>
                  </div>

                  <div className="flex items-center gap-2">
                    <Input
                      type="file"
                      accept=".jpeg,.jpg,.png"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          handleDocumentUpdate(doc.id, doc.documentType, file);
                        }
                      }}
                    />
                  </div>

                  <div>
                    <Button
                      variant="outline"
                      className="w-full"
                      disabled={isUpdating === doc.id}
                      onClick={() => {
                        const input = document.createElement('input');
                        input.type = 'file';
                        input.accept = '.jpeg,.jpg,.png';
                        input.onchange = (e) => {
                          const file = (e.target as HTMLInputElement).files?.[0];
                          if (file) {
                            handleDocumentUpdate(doc.id, doc.documentType, file);
                          }
                        };
                        input.click();
                      }}
                    >
                      {isUpdating === doc.id ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Updating...
                        </>
                      ) : (
                        'Update Document'
                      )}
                    </Button>
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