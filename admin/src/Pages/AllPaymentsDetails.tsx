import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { getAllPayments } from '@/Config'
import Swal from 'sweetalert2'
import { PaymentStatus } from '@/lib/Interfaces'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

// Define the enums based on the provided schema
enum PaymentInstrumentType {
    UPI = 'UPI',
    NETBANKING = 'NETBANKING',
    CARD = 'CARD'
}

enum PaymentType {
    STUDENT = 'STUDENT',
    INSTITUTE = 'INSTITUTE'
}

interface Institute {
    id: string;
    centerName: string;
}

interface Student {
    id: string;
    name: string;
}

interface Payment {
    id: string;
    merchantTransactionId: string;
    amount: number;
    paymentType: PaymentType;
    paymentStatus: PaymentStatus;
    paymentInstrumentType?: PaymentInstrumentType;
    updatedAt: string;
    instituteId?: string;
    studentId?: string;
    institute?: Institute;
    student?: Student;
}

interface FilterParams {
    status?: PaymentStatus | null;
    paymentInstrumentType?: PaymentInstrumentType | null;
    type?: PaymentType | null;
    amount?: string;
}

interface ApiError {
    response?: {
        status: number;
        data: {
            message?: string;
            error?: string;
            payments?: Payment[];
            total?: number;
        };
    };
    message: string;
}

const AllPaymentsDetails = () => {
    const [payments, setPayments] = useState<Payment[]>([])
    const [loading, setLoading] = useState(true)
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [totalItems, setTotalItems] = useState(0)
    const [filters, setFilters] = useState<FilterParams>({
        status: null,
        paymentInstrumentType: null,
        type: null,
        amount: ''
    })
    const itemsPerPage = 10
    const navigate = useNavigate()

    const fetchPayments = async (page: number = currentPage, filterParams: FilterParams = filters) => {
        try {
            const token = localStorage.getItem('token') || 'hjj'
            if (!token) {
                navigate('/login')
                return
            }

            const skip = (page - 1) * itemsPerPage
            const limit = itemsPerPage

            // Remove null/undefined values from filter params
            const cleanFilters = Object.fromEntries(
                Object.entries(filterParams).filter(([, value]) => value !== null && value !== undefined && value !== '')
            )

            const response = await axios.post(getAllPayments, {
                skip,
                limit,
                ...cleanFilters
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            setPayments(response.data);
            setTotalItems(response.data.length)
            setTotalPages(Math.ceil(response.data.length / itemsPerPage))

            setLoading(false)

        } catch (error: unknown) {
            console.error('Error fetching payments:', error)
            const apiError = error as ApiError
            if (apiError.response?.status === 401) {
                navigate('/login')
                return
            }
            await Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to fetch payment details',
                confirmButtonColor: '#3085d6'
            })
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchPayments()
    }, [navigate])

    const handlePageChange = (page: number) => {
        setCurrentPage(page)
        fetchPayments(page)
    }

    const handleFilterChange = (key: keyof FilterParams, value: PaymentStatus | PaymentInstrumentType | PaymentType | string | null) => {
        const newFilters = {
            ...filters,
            [key]: value
        }
        setFilters(newFilters)
        setCurrentPage(1) // Reset to first page when filter changes
        fetchPayments(1, newFilters)
    }

    const clearFilters = () => {
        const emptyFilters: FilterParams = {
            status: null,
            paymentInstrumentType: null,
            type: null,
            amount: ''
        }
        setFilters(emptyFilters)
        setCurrentPage(1) // Reset to first page when clearing filters
        fetchPayments(1, emptyFilters)
    }

    if (loading) {
        return <div className="flex justify-center items-center min-h-screen">Loading...</div>
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">All Payments</h1>

            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <Select
                    value={filters.status || 'all'}
                    onValueChange={(value: string) => handleFilterChange('status', value === 'all' ? null : value as PaymentStatus)}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Payment Status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value={PaymentStatus.SUCCESS}>SUCCESS</SelectItem>
                        <SelectItem value={PaymentStatus.FAILED}>FAILED</SelectItem>
                        <SelectItem value={PaymentStatus.PENDING}>PENDING</SelectItem>
                    </SelectContent>
                </Select>

                <Select
                    value={filters.paymentInstrumentType || 'all'}
                    onValueChange={(value: string) => handleFilterChange('paymentInstrumentType', value === 'all' ? null : value as PaymentInstrumentType)}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Payment Instrument" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Instruments</SelectItem>
                        <SelectItem value={PaymentInstrumentType.UPI}>UPI</SelectItem>
                        <SelectItem value={PaymentInstrumentType.NETBANKING}>NETBANKING</SelectItem>
                        <SelectItem value={PaymentInstrumentType.CARD}>CARD</SelectItem>
                    </SelectContent>
                </Select>

                <Select
                    value={filters.type || 'all'}
                    onValueChange={(value: string) => handleFilterChange('type', value === 'all' ? null : value as PaymentType)}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Payment Type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value={PaymentType.STUDENT}>STUDENT</SelectItem>
                        <SelectItem value={PaymentType.INSTITUTE}>INSTITUTE</SelectItem>
                    </SelectContent>
                </Select>

                <Input
                    type="text"
                    placeholder="Amount"
                    value={filters.amount}
                    onChange={(e) => handleFilterChange('amount', e.target.value)}
                />
            </div>

            <div className="flex justify-end mb-4">
                <Button
                    variant="outline"
                    onClick={clearFilters}
                >
                    Clear Filters
                </Button>
            </div>

            {/* Table */}
            <div className="border rounded-lg">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Transaction ID</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Instrument</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {payments.map((payment) => (
                            <TableRow key={payment.id}>
                                <TableCell>
                                    {payment.paymentType === PaymentType.INSTITUTE
                                        ? payment.institute?.centerName
                                        : payment.student?.name}
                                </TableCell>
                                <TableCell>{payment.merchantTransactionId}</TableCell>
                                <TableCell>₹{payment.amount}</TableCell>
                                <TableCell>
                                    <span className={`px-2 py-1 rounded-full text-xs ${payment.paymentStatus === PaymentStatus.SUCCESS ? 'bg-green-100 text-green-800' :
                                        payment.paymentStatus === PaymentStatus.FAILED ? 'bg-red-100 text-red-800' :
                                            'bg-yellow-100 text-yellow-800'
                                        }`}>
                                        {payment.paymentStatus}
                                    </span>
                                </TableCell>
                                <TableCell>{payment.paymentType}</TableCell>
                                <TableCell>{payment.paymentInstrumentType || '-'}</TableCell>
                                <TableCell>{new Date(payment.updatedAt).toLocaleDateString()}</TableCell>
                                <TableCell className="text-right">
                                    <Button
                                        variant="outline"
                                        onClick={() => navigate(`/payment-details?id=${payment.paymentType === PaymentType.INSTITUTE ? payment.instituteId : payment.studentId}&type=${payment.paymentType}`)}
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
            <div className="text-center mt-2 text-sm text-gray-500">
                Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} payments
            </div>
        </div>
    )
}

export default AllPaymentsDetails
