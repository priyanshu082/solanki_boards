import { useState, useEffect } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, X, RotateCcw } from "lucide-react";
import axios from 'axios';
import { InstituteDocumentType } from '@/lib/Interfaces';
import { instituteDetailsUrl, instituteUpdateUrl } from '@/Config';
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
  documentType: keyof typeof InstituteDocumentType;
  fileName: string;
  fileUrl: string;
}

interface InstituteDetails {
  id: string;
  centerCode: string;
  centerName: string;
  applicationNumber: string;
  documents: Document[];
}

const InstituteDocumentUpload = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [instituteData, setInstituteData] = useState<InstituteDetails | null>(null);
  const [uploadError, setUploadError] = useState<string>('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedDocType, setSelectedDocType] = useState<keyof typeof InstituteDocumentType>('LOGO');
  const [isUploading, setIsUploading] = useState(false); // New state for upload status
  const [isUpdating, setIsUpdating] = useState(false); // New state for update status

  useEffect(() => {
    const fetchInstituteDetails = async () => {
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

        const instituteId = localStorage.getItem('id');
        const response = await axios.get(`${instituteDetailsUrl}/${instituteId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.data) {
          setInstituteData(response.data);
          setUploadError('');
          setSelectedFile(null);
        }
      } catch (error: any) {
        console.error('Error fetching institute data:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.response?.data?.message || 'Failed to fetch institute details',
          confirmButtonColor: '#3085d6'
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchInstituteDetails();
  }, []);

  const handleDocumentUpload = async () => {
    setIsUploading(true); // Set uploading state to true
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

      if (!selectedFile || !instituteData) {
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
      formData.append('documentType', selectedDocType);
      formData.append('applicationNumber', instituteData.applicationNumber);

      const response = await axios.put(`${instituteUpdateUrl}`, formData, {
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
        // Refresh institute data
        const refreshResponse = await axios.get(`${instituteDetailsUrl}/${instituteData.id}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        setInstituteData(refreshResponse.data);
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
      setIsUploading(false); // Reset uploading state
    }
  };

  const handleDocumentUpdate = async (documentId: string, documentType: keyof typeof InstituteDocumentType, file: File) => {
    setIsUpdating(true); // Set updating state to true
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

      const formData = new FormData();
      formData.append('image', file);
      formData.append('applicationNumber', instituteData!.applicationNumber);
      formData.append('documentType', documentType);
      formData.append('documentId', documentId);

      const response = await axios.put(`${instituteUpdateUrl}`, formData, {
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
        // Refresh institute data
        const refreshResponse = await axios.get(`${instituteDetailsUrl}/${instituteData!.id}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        setInstituteData(refreshResponse.data);
      }
    } catch (error: any) {
      Swal.fire({
        icon: 'error',
        title: 'Update Failed',
        text: error.response?.data?.message || 'Failed to update document',
        confirmButtonColor: '#3085d6'
      });
    } finally {
      setIsUpdating(false); // Reset updating state
    }
  };

  const handleFileRemove = () => {
    setSelectedFile(null);
    setUploadError('');
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      {/* Institute Details Section */}
      
      {/* Document Upload Section */}
      {instituteData && (
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
                    onValueChange={(value: keyof typeof InstituteDocumentType) => setSelectedDocType(value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select document type" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(InstituteDocumentType).map(([key, value]) => (
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
                    disabled={!selectedFile || isUploading} // Disable button while uploading
                    className="w-full"
                  >
                    {isUploading ? ( // Show loading state
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
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
      {instituteData?.documents && instituteData.documents.length > 0 && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Uploaded Documents</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {instituteData.documents.map((doc) => (
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
                    {isUpdating && <Loader2 className="h-4 w-4 animate-spin" />} {/* Show loading state while updating */}
                  </div>

                  <div>
                    <Button
                      variant="outline"
                      className="w-full"
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
                      Update Document
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

export default InstituteDocumentUpload;