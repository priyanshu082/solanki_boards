import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, CreditCard } from 'lucide-react';
// import axios from 'axios';
import Swal from 'sweetalert2';
import {
  useRecoilValue,
  // useSetRecoilState 
} from 'recoil';
import {
  // instituteState, 
  instituteDetailsSelector, PaymentStatus
} from '@/store/atoms/instituteAtoms';
import { InstituteAmount } from '../../Config';

const PaymentPageInstitute = () => {
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  // const [isCheckingStatus, setIsCheckingStatus] = useState(false);
  // const [pollingCount, setPollingCount] = useState(0);
  // const maxPollingAttempts = 48;

  const instituteDetails = useRecoilValue(instituteDetailsSelector);
  // const setInstituteDetails = useSetRecoilState(instituteState);

  useEffect(() => {
    if (instituteDetails?.paymentStatus === PaymentStatus.PENDING) {
      Swal.fire({
        icon: 'warning',
        title: 'Payment Pending',
        text: 'Please complete your payment before proceeding.',
        confirmButtonColor: '#EF4444'
      });
    }
  }, [instituteDetails]);

  // const checkPaymentStatus = async () => {
  //   try {
  //     setIsCheckingStatus(true);

  //     if (!instituteDetails) return;

  //     const lastPayment = instituteDetails.payments?.[instituteDetails.payments.length - 1];
  //     const merchantTransactionId = lastPayment?.merchantTransactionId;

  //     if (!merchantTransactionId) {
  //       Swal.fire({
  //         icon: 'error',
  //         title: 'No Payment Found',
  //         text: 'No recent payment transaction was found',
  //         confirmButtonColor: '#3085d6'
  //       });
  //       return;
  //     }

  //     const pollStatus = async () => {
  //       if (pollingCount >= maxPollingAttempts) {
  //         throw new Error('Payment status check timed out');
  //       }

  //       const response = await axios.get(`${paymentStatusUrl}/${merchantTransactionId}`);

  //       if (response.data.status === "SUCCESS") {
  //         setInstituteDetails(prev => prev ? { ...prev, paymentStatus: PaymentStatus.SUCCESS } : null);
  //         Swal.fire({
  //           icon: 'success',
  //           title: 'Payment Successful!',
  //           text: 'Your payment has been processed successfully',
  //           confirmButtonColor: '#10B981'
  //         }).then(() => {
  //           window.location.href = '/';
  //         });
  //         return;
  //       } else if (response.data.status === "FAILED") {
  //         throw new Error('Payment failed');
  //       }

  //       setPollingCount(prev => prev + 1);
  //       const interval = pollingCount < 1 ? 20000 :
  //         pollingCount < 11 ? 3000 :
  //           pollingCount < 21 ? 6000 :
  //             pollingCount < 27 ? 10000 :
  //               pollingCount < 29 ? 30000 :
  //                 60000;

  //       setTimeout(pollStatus, interval);
  //     };

  //     await pollStatus();

  //   } catch (error: any) {
  //     Swal.fire({
  //       icon: 'error',
  //       title: 'Payment Failed',
  //       text: error.message || 'Payment verification failed. Please try again.',
  //       confirmButtonColor: '#EF4444'
  //     });
  //   } finally {
  //     setIsCheckingStatus(false);
  //     setPollingCount(0);
  //   }
  // };

  const handlePhonePePayment = async () => {
    try {
      const instituteId = localStorage.getItem("id");
      const name = localStorage.getItem("instituteName");
      const number = localStorage.getItem("instituteNumber");


      const merchantTransactionId = `TXN_${Date.now()}`;
      localStorage.setItem("merchantTransactionId", merchantTransactionId);



      Swal.fire({
        title: 'Initiating Payment',
        text: 'Please wait while we redirect you to Payment Page...',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });

      window.location.href = `https://www.sbiea.co.in/payment?amount=${InstituteAmount}&instituteId=${instituteId}&paymentType=INSTITUTE&name=${name}&number=${number}`;

      // const response = await axios.post(initiatePaymentUrl, {
      //   amount: InstituteAmount,
      //   instituteId,
      //   paymentType: 'INSTITUTE',
      //   name,
      //   number
      // });

      // console.log(response.data);

      // const PhonePeCheckout = (window as any).PhonePeCheckout;

      // if (response.data.redirectUrl) {
      //   PhonePeCheckout.transact({ tokenUrl: response.data.redirectUrl });
      // } else {
      //   throw new Error('Payment initiation failed');
      // }
      // if(!response.)
      // throw new Error('Payment initiation failed');
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
                  Institute Registration Payment
                </CardTitle>
                <CardDescription className="mt-1 text-gray-500">
                  Complete your institute registration by making the payment through PhonePe
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
                  Amount to pay: ₹{InstituteAmount}
                </p>
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Payment Status Check Section */}
        {/* <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-900">
              Check Payment Status
            </CardTitle>
            <CardDescription>
              Already made the payment? Check your payment status here
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex justify-center">
              <button
                onClick={checkPaymentStatus}
                disabled={isCheckingStatus}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                <RefreshCw className={`h-5 w-5 ${isCheckingStatus ? 'animate-spin' : ''}`} />
                {isCheckingStatus ? 'Checking...' : 'Check Status'}
              </button>
            </div>
          </CardContent>
        </Card> */}
      </div>
    </div>
  );
};

export default PaymentPageInstitute;
