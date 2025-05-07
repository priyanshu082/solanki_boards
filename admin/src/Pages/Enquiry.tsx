import { useState, useEffect } from 'react'
import axios from 'axios'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { EnquiryPreview, EnquiryDetails, EnquiryStatus } from '@/lib/Interfaces'
import { Loader2, Search, Filter, RefreshCw, Eye, Trash2 } from 'lucide-react'
import Swal from 'sweetalert2'
import { getallenquiry, updateenquiry, deleteEnquiry } from '@/Config'

const Enquiry = () => {
  const [enquiries, setEnquiries] = useState<EnquiryPreview[]>([]);
  const [selectedEnquiry, setSelectedEnquiry] = useState<EnquiryDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [updatedStatus, setUpdatedStatus] = useState<EnquiryStatus | "">("");

  // Dummy data for demonstration
  const dummyEnquiries: EnquiryPreview[] = [
    { id: "1", name: "John Doe", title: "Course Fee Inquiry", status: EnquiryStatus.NEW },
    { id: "2", name: "Jane Smith", title: "Admission Process", status: EnquiryStatus.IN_PROGRESS },
    { id: "3", name: "Robert Johnson", title: "Scholarship Information", status: EnquiryStatus.FOLLOW_UP },
    { id: "4", name: "Emily Davis", title: "Hostel Availability", status: EnquiryStatus.CONVERTED },
    { id: "5", name: "Michael Brown", title: "Exam Schedule", status: EnquiryStatus.CLOSED },
    { id: "6", name: "Sarah Wilson", title: "Transfer Certificate", status: EnquiryStatus.REJECTED },
    { id: "7", name: "David Miller", title: "Course Duration", status: EnquiryStatus.NEW },
    { id: "8", name: "Lisa Anderson", title: "Fee Structure", status: EnquiryStatus.FOLLOW_UP },
  ];

  // Dummy detailed enquiry data
  const dummyEnquiryDetails: { [key: string]: EnquiryDetails } = {
    "1": {
      id: "1",
      name: "John Doe",
      title: "Course Fee Inquiry",
      description: "I would like to know the fee structure for the Computer Science course. Are there any scholarships available?",
      phoneNumber: "+91 9876543210",
      email: "john.doe@example.com",
      status: EnquiryStatus.NEW,
      createdAt: new Date("2023-05-15T10:30:00"),
      updatedAt: new Date("2023-05-15T10:30:00")
    },
    "2": {
      id: "2",
      name: "Jane Smith",
      title: "Admission Process",
      description: "Could you please provide details about the admission process for the upcoming academic year?",
      phoneNumber: "+91 8765432109",
      email: "jane.smith@example.com",
      status: EnquiryStatus.IN_PROGRESS,
      createdAt: new Date("2023-05-10T14:45:00"),
      updatedAt: new Date("2023-05-12T09:15:00")
    },
    "3": {
      id: "3",
      name: "Robert Johnson",
      title: "Scholarship Information",
      description: "I'm interested in applying for scholarships. What are the eligibility criteria and application process?",
      phoneNumber: "+91 7654321098",
      email: "robert.johnson@example.com",
      status: EnquiryStatus.FOLLOW_UP,
      createdAt: new Date("2023-05-08T11:20:00"),
      updatedAt: new Date("2023-05-14T16:30:00")
    },
    "4": {
      id: "4",
      name: "Emily Davis",
      title: "Hostel Availability",
      description: "I'm an outstation student and would like to know about hostel facilities and availability for the upcoming semester.",
      phoneNumber: "+91 6543210987",
      email: "emily.davis@example.com",
      status: EnquiryStatus.CONVERTED,
      createdAt: new Date("2023-05-05T09:15:00"),
      updatedAt: new Date("2023-05-13T14:20:00")
    },
    "5": {
      id: "5",
      name: "Michael Brown",
      title: "Exam Schedule",
      description: "When will the final examination schedule be released? I need to plan my travel accordingly.",
      phoneNumber: "+91 5432109876",
      email: "michael.brown@example.com",
      status: EnquiryStatus.CLOSED,
      createdAt: new Date("2023-05-03T13:45:00"),
      updatedAt: new Date("2023-05-11T10:10:00")
    },
    "6": {
      id: "6",
      name: "Sarah Wilson",
      title: "Transfer Certificate",
      description: "I need a transfer certificate as I'm moving to another institution. What is the procedure to obtain it?",
      phoneNumber: "+91 4321098765",
      email: "sarah.wilson@example.com",
      status: EnquiryStatus.REJECTED,
      createdAt: new Date("2023-05-01T15:30:00"),
      updatedAt: new Date("2023-05-09T11:25:00")
    },
    "7": {
      id: "7",
      name: "David Miller",
      title: "Course Duration",
      description: "What is the total duration of the Engineering program? Are there any internship opportunities included?",
      phoneNumber: "+91 3210987654",
      email: "david.miller@example.com",
      status: EnquiryStatus.NEW,
      createdAt: new Date("2023-04-28T10:00:00"),
      updatedAt: new Date("2023-04-28T10:00:00")
    },
    "8": {
      id: "8",
      name: "Lisa Anderson",
      title: "Fee Structure",
      description: "Could you provide the detailed fee structure for all four years of the Computer Science program?",
      phoneNumber: "+91 2109876543",
      email: "lisa.anderson@example.com",
      status: EnquiryStatus.FOLLOW_UP,
      createdAt: new Date("2023-04-25T14:15:00"),
      updatedAt: new Date("2023-05-07T09:45:00")
    }
  };

  // Fetch enquiries from backend
  const fetchEnquiries = async () => {
    setLoading(true);
    try {
      const response = await axios.post(getallenquiry, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (response.data && response.data.length > 0) {
        setEnquiries(response.data);
      } else {
        // If no data is returned, use dummy data
        setEnquiries(dummyEnquiries);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching enquiries:", error);
      // Fallback to dummy data on error
      setEnquiries(dummyEnquiries);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  // Filter enquiries based on search term and status
  const filteredEnquiries = enquiries.filter(enquiry => {
    const matchesSearch = enquiry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enquiry.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter && statusFilter !== "all" ? enquiry.status === statusFilter : true;
    return matchesSearch && matchesStatus;
  });

  // Function to view enquiry details
  const handleViewEnquiry = async (id: string) => {
    try {
      setLoading(true);
      // Try to fetch from API first
      try {
        const response = await axios.get(`${getallenquiry}/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        if (response.data) {
          setSelectedEnquiry(response.data);
          setUpdatedStatus(response.data.status);
          setLoading(false);
          return;
        }
      } catch (apiError) {
        console.error("API error, falling back to dummy data:", apiError);
      }

      // Fallback to dummy data if API fails or returns no data
      const enquiryDetail = dummyEnquiryDetails[id] || {
        id,
        name: enquiries.find(e => e.id === id)?.name || "Unknown",
        title: enquiries.find(e => e.id === id)?.title || "Unknown",
        description: "Detailed information about this enquiry is not available.",
        phoneNumber: "Not available",
        email: "Not available",
        status: enquiries.find(e => e.id === id)?.status || EnquiryStatus.NEW,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      setSelectedEnquiry(enquiryDetail);
      setUpdatedStatus(enquiryDetail.status);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch enquiry details", error);
      Swal.fire({
        title: 'Error!',
        text: 'Failed to load enquiry details. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      setLoading(false);
    }
  };

  // Function to update enquiry status
  const handleUpdateEnquiry = async () => {
    if (!selectedEnquiry || !updatedStatus) return;

    setLoading(true);
    try {
      // Make the actual API call
      const response = await axios.put(updateenquiry, {
        id: selectedEnquiry.id,
        status: updatedStatus
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.data) {
        // Update the selected enquiry with the response data
        const updatedEnquiry = {
          ...selectedEnquiry,
          status: updatedStatus as EnquiryStatus,
          updatedAt: new Date()
        };
        setSelectedEnquiry(updatedEnquiry);

        // Update the enquiry in the list
        setEnquiries(prevEnquiries =>
          prevEnquiries.map(enquiry =>
            enquiry.id === selectedEnquiry.id
              ? { ...enquiry, status: updatedStatus as EnquiryStatus }
              : enquiry
          )
        );

        setLoading(false);

        Swal.fire({
          title: 'Success!',
          text: 'Enquiry status has been updated successfully.',
          icon: 'success',
          confirmButtonText: 'OK'
        });
      }
    } catch (error) {
      console.error("Failed to update enquiry status", error);
      Swal.fire({
        title: 'Error!',
        text: 'Failed to update enquiry status. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      setLoading(false);
    }
  };

  // Function to delete enquiry
  const handleDeleteEnquiry = async (enquiryId: string) => {
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!'
      })
      if (result.isConfirmed) {
        await axios.delete(`${deleteEnquiry}/${enquiryId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        await Swal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: 'Enquiry has been deleted.',
          timer: 1500,
          showConfirmButton: false
        })
        fetchEnquiries()
      }
    } catch {
      await Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to delete enquiry',
        confirmButtonColor: '#3085d6'
      })
    }
  }

  // Status badge component
  const StatusBadge = ({ status }: { status: EnquiryStatus }) => {
    const getStatusColor = () => {
      switch (status) {
        case EnquiryStatus.NEW:
          return "bg-blue-100 text-blue-800";
        case EnquiryStatus.IN_PROGRESS:
          return "bg-yellow-100 text-yellow-800";
        case EnquiryStatus.FOLLOW_UP:
          return "bg-purple-100 text-purple-800";
        case EnquiryStatus.CONVERTED:
          return "bg-green-100 text-green-800";
        case EnquiryStatus.CLOSED:
          return "bg-gray-100 text-gray-800";
        case EnquiryStatus.REJECTED:
          return "bg-red-100 text-red-800";
        default:
          return "bg-gray-100 text-gray-800";
      }
    };

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor()}`}>
        {status.replace('_', ' ')}
      </span>
    );
  };

  return (
    <div className="container mx-auto p-4">
      <Card className="mb-6">
        <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <CardTitle className="text-2xl font-bold">Enquiries Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search enquiries..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    <SelectValue placeholder="Filter by status" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  {Object.values(EnquiryStatus).map((status) => (
                    <SelectItem key={status} value={status}>
                      {status.replace('_', ' ')}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon" onClick={fetchEnquiries}>
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {loading && !selectedEnquiry ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
            </div>
          ) : selectedEnquiry ? (
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold">{selectedEnquiry.title}</h2>
                  <div className="mt-2 flex items-center gap-3">
                    <StatusBadge status={selectedEnquiry.status} />
                    <span className="text-sm text-gray-500">
                      Created: {selectedEnquiry.createdAt.toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <Button variant="outline" onClick={() => setSelectedEnquiry(null)}>
                  Back to List
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Contact Information</h3>
                  <div className="space-y-2">
                    <p><span className="font-medium">Name:</span> {selectedEnquiry.name}</p>
                    <p><span className="font-medium">Email:</span> {selectedEnquiry.email}</p>
                    <p><span className="font-medium">Phone:</span> {selectedEnquiry.phoneNumber}</p>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Enquiry Details</h3>
                  <div className="space-y-2">
                    <p><span className="font-medium">ID:</span> {selectedEnquiry.id}</p>
                    <p><span className="font-medium">Last Updated:</span> {selectedEnquiry.updatedAt.toLocaleDateString()}</p>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-500 mb-2">Description</h3>
                <div className="p-4 bg-gray-50 rounded-md">
                  <p className="whitespace-pre-wrap">{selectedEnquiry.description}</p>
                </div>
              </div>

              <div className="border-t pt-4">
                <h3 className="text-sm font-medium text-gray-500 mb-2">Actions</h3>
                <div className="flex gap-2">
                  <Select
                    value={updatedStatus}
                    onValueChange={(value) => setUpdatedStatus(value as EnquiryStatus)}
                  >
                    <SelectTrigger className="w-[200px]">
                      <SelectValue placeholder="Update Status" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.values(EnquiryStatus).map((status) => (
                        <SelectItem key={status} value={status}>
                          {status.replace('_', ' ')}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button
                    onClick={handleUpdateEnquiry}
                    disabled={loading || updatedStatus === selectedEnquiry.status}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Updating...
                      </>
                    ) : (
                      'Update Status'
                    )}
                  </Button>
                </div>
              </div>
            </div>
          ) : filteredEnquiries.length > 0 ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredEnquiries.map((enquiry) => (
                    <TableRow key={enquiry.id}>
                      <TableCell className="font-medium">{enquiry.id}</TableCell>
                      <TableCell>{enquiry.name}</TableCell>
                      <TableCell>{enquiry.title}</TableCell>
                      <TableCell>
                        <StatusBadge status={enquiry.status} />
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleViewEnquiry(enquiry.id)}
                            className="flex items-center gap-1"
                          >
                            <Eye className="h-4 w-4" /> View Details
                          </Button>
                          <Button
                            variant="destructive"
                            size="icon"
                            className='text-white'
                            onClick={() => handleDeleteEnquiry(enquiry.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="text-gray-500">No enquiries found. Try adjusting your filters.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default Enquiry