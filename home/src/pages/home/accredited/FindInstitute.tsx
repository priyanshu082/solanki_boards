import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import { Search } from 'lucide-react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Oval } from 'react-loader-spinner';
import { instituteFetchUrl } from '../../../data/config';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../../../components/ui/table";
import { useNavigate } from 'react-router-dom';

interface InstitutePreview {
    id: string;
    centerName: string;
    centercode: string;
    headName: string;
    headMobileNumber: string;
    centerCity: string;
    centerState: string;
}

const FindInstitute = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [institutes, setInstitutes] = useState<InstitutePreview[]>([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const [hasSearched, setHasSearched] = useState(false);
    const itemsPerPage = 9;

    const handleSearch = async () => {
        if (!searchTerm.trim()) {
            await Swal.fire({
                icon: 'warning',
                title: 'Empty Search',
                text: 'Please enter a search term',
                confirmButtonColor: '#3085d6'
            });
            return;
        }

        setLoading(true);
        setHasSearched(true);
        try {
            const skip = (currentPage - 1) * itemsPerPage;
            const limit = itemsPerPage;

            const response = await axios.post(instituteFetchUrl, {
                searchTerm,
                skip,
                limit
            });

            if (response.data.institutes) {
                setInstitutes(response.data.institutes);
                setTotalItems(response.data.total || response.data.institutes.length);
                setTotalPages(Math.ceil((response.data.total || response.data.institutes.length) / itemsPerPage));
            } else {
                setInstitutes(response.data);
                setTotalItems(response.data.length);
                setTotalPages(Math.ceil(response.data.length / itemsPerPage));
            }
        } catch (error) {
            console.error('Error searching institutes:', error);
            await Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to search institutes',
                confirmButtonColor: '#3085d6'
            });
        } finally {
            setLoading(false);
        }
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        handleSearch();
    };

    const handleViewDetails = (instituteId: string) => {
        navigate(`/institute-details/${instituteId}`);
    };

    return (
        <div className="mx-auto p-4 bg-white relative">
            {/* Add Loader Overlay */}
            {loading && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
                    <Oval
                        visible={true}
                        height="80"
                        width="80"
                        color="#0000FF"
                        secondaryColor="#FFFFFF"
                        ariaLabel="oval-loading"
                        strokeWidth={3}
                        strokeWidthSecondary={3}
                    />
                </div>
            )}

            <Card className='bg-white text-primary'>
                <CardHeader className="bg-gradient-to-r from-primary to-blue-900 p-2 rounded-lg shadow-lg mb-4">
                    <CardTitle className='text-2xl font-semibold text-white text-center tracking-wide drop-shadow-lg'>Find Accreditation</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex gap-4 mb-6">
                        <Input
                            type="text"
                            placeholder="Search by institute name, city, or state..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="flex-1 border-primary"
                        />
                        <Button
                            onClick={handleSearch}
                            className="bg-primary text-white hover:bg-primary/90"
                        >
                            <Search className="mr-2 h-4 w-4" />
                            Search
                        </Button>
                    </div>

                    {institutes.length > 0 ? (
                        <>
                            <div className="rounded-md border">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Center Code</TableHead>
                                            <TableHead>Center Name</TableHead>
                                            <TableHead>Head Name</TableHead>
                                            <TableHead>City</TableHead>
                                            <TableHead>State</TableHead>
                                            <TableHead className="text-right">Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {institutes.map((institute) => (
                                            <TableRow key={institute.id}>
                                                <TableCell className="font-medium">{institute.centercode}</TableCell>
                                                <TableCell>{institute.centerName}</TableCell>
                                                <TableCell>{institute.headName}</TableCell>
                                                <TableCell>{institute.centerCity}</TableCell>
                                                <TableCell>{institute.centerState.replace('_', ' ')}</TableCell>
                                                <TableCell className="text-right">
                                                    <Button
                                                        variant="outline"
                                                        onClick={() => handleViewDetails(institute.id)}
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
                                    disabled={currentPage === 1}
                                >
                                    Previous
                                </Button>

                                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                    <Button
                                        key={page}
                                        variant={currentPage === page ? "default" : "outline"}
                                        onClick={() => handlePageChange(page)}
                                    >
                                        {page}
                                    </Button>
                                ))}

                                <Button
                                    variant="outline"
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                >
                                    Next
                                </Button>
                            </div>

                            <div className="text-center mt-4 text-gray-600">
                                Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} institutes
                            </div>
                        </>
                    ) : hasSearched && !loading ? (
                        <div className="text-center text-gray-600 py-8">
                            No institutes found matching your search criteria
                        </div>
                    ) : null}
                </CardContent>
            </Card>
        </div>
    );
};

export default FindInstitute;
