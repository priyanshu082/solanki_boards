import { useState } from 'react';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Loader2, CreditCard, CheckCircle2 } from "lucide-react";
import axios from 'axios';
import { getallinstitute } from '@/Config';
import Swal from 'sweetalert2';
import { InstituteDetails } from '@/lib/Interfaces';

const FeePayment = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [instituteData, setInstituteData] = useState<InstituteDetails | null>(null);

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

            const response = await axios.post(`${getallinstitute}`, {
                applicationNumber: searchQuery,
                skip: 0,
                limit: 1
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.data && response.data.length > 0) {
                setInstituteData(response.data[0]);
            } else {
                Swal.fire({
                    icon: 'info',
                    title: 'No Results',
                    text: 'No student found with this application number',
                    confirmButtonColor: '#3085d6'
                });
            }
        } catch (error) {
            console.error('Error fetching student data:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to fetch student details',
                confirmButtonColor: '#3085d6'
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handlePhonePePayment = async () => {

        try {
            Swal.fire({
                title: 'Initiating Payment',
                text: 'Please wait while we redirect you to Payment Page...',
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading();
                }
            });

            window.location.href = `https://www.sbiea.co.in/payment?amount=${1000}&instituteId=${instituteData?.id}&paymentType=INSTITUTE&name=${instituteData?.centerName}&number=${instituteData?.headMobileNumber}`;

        } catch (error: any) {
            Swal.fire({
                icon: 'error',
                title: 'Payment Initiation Failed',
                text: error.response?.data?.message || 'Unable to start payment process',
                confirmButtonColor: '#3085d6'
            });
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
            {instituteData && (
                <Card className="mb-6">
                    <CardHeader>
                        <CardTitle>Student Details</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <p className="font-semibold">Application Number:</p>
                                <p>{instituteData?.applicationNumber}</p>
                            </div>
                            <div>
                                <p className="font-semibold">Name:</p>
                                <p>{instituteData?.centerName}</p>
                            </div>
                            <div>
                                <p className="font-semibold">Payment Amount:</p>
                                <p>₹{1000}</p>
                            </div>
                            <div>
                                <p className="font-semibold">Phone Number:</p>
                                <p>{instituteData?.headMobileNumber}</p>
                            </div>
                            <div>
                                <p className="font-semibold">Payment Status:</p>
                                <p className={`flex items-center gap-2 ${instituteData?.paymentStatus ? 'text-green-600' : 'text-red-600'}`}>
                                    {instituteData?.paymentStatus ? (
                                        <>
                                            <CheckCircle2 className="h-5 w-5" />
                                            Payment Completed
                                        </>
                                    ) : (
                                        'Payment Pending'
                                    )}
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Payment Section */}
            {instituteData && !instituteData.paymentStatus && (
                <Card>
                    <CardHeader>
                        <CardTitle>Fee Payment</CardTitle>
                        <CardDescription>
                            Process the student's fee payment through PhonePe
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex justify-center">
                            <button
                                onClick={handlePhonePePayment}
                                className="group relative flex flex-col items-center p-6 border-2 border-gray-200 rounded-lg transition-all hover:border-blue-500 hover:shadow-md max-w-md w-full"
                            >
                                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mb-4 group-hover:bg-blue-500 transition-colors">
                                    <CreditCard className="h-6 w-6 text-blue-600 group-hover:text-white" />
                                </div>
                                <h3 className="text-lg font-medium text-gray-900">Pay with PhonePe</h3>
                                <p className="mt-2 text-sm text-gray-500 text-center">
                                    Amount to pay: ₹{1000}
                                </p>
                            </button>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Payment Completed Message */}
            {instituteData && instituteData.paymentStatus && (
                <Card className="bg-green-50 border-green-200">
                    <CardHeader>
                        <CardTitle className="text-green-700">Payment Completed</CardTitle>
                        <CardDescription className="text-green-600">
                            The student has already completed their payment
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center justify-center gap-3 text-green-700">
                            <CheckCircle2 className="h-8 w-8" />
                            <p className="text-lg font-medium">
                                Payment of ₹{1000} has been successfully processed
                            </p>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
};

export default FeePayment;
