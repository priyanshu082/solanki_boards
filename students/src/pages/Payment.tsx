import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, CreditCard } from 'lucide-react';
import Swal from 'sweetalert2';

const PaymentPage = () => {
    const [showPaymentForm, setShowPaymentForm] = useState(false);

    const studentId = localStorage.getItem("id");
    const name = localStorage.getItem("name");
    const number = localStorage.getItem("number");
    const amount = localStorage.getItem("paymentAmount");

    console.log(studentId, name, number, amount);


    useEffect(() => {
        Swal.fire({
            icon: 'warning',
            title: 'Payment Pending',
            text: 'Please complete your payment before proceeding.',
            confirmButtonColor: '#EF4444'
        });
    }, []);

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

            window.location.href = `https://www.sbiea.co.in/payment?amount=${amount}&studentId=${studentId}&paymentType=STUDENT&name=${name}&number=${number}`;

        } catch (error: any) {
            Swal.fire({
                icon: 'error',
                title: 'Payment Initiation Failed',
                text: error.response?.data?.message || 'Unable to start payment process',
                confirmButtonColor: '#EF4444'
            });
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">

            <div className=" mx-auto space-y-6">
                <Card className="shadow-lg">
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            {showPaymentForm && (
                                <button
                                    onClick={() => setShowPaymentForm(false)}
                                    className="text-gray-500 hover:text-gray-700 transition-colors flex items-center gap-2"
                                >
                                    <ArrowLeft className="h-4 w-4" />
                                    Back
                                </button>
                            )}
                            <div className="flex-1 text-center">
                                <CardTitle className="text-2xl font-bold text-gray-900">
                                    Student Registration Payment
                                </CardTitle>
                                <CardDescription className="mt-1 text-gray-500">
                                    Complete your student registration by making the payment through PhonePe
                                </CardDescription>
                            </div>
                        </div>
                    </CardHeader>

                    <CardContent className="p-6">
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
                                    Amount to pay: ₹{amount}
                                </p>
                            </button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default PaymentPage;
