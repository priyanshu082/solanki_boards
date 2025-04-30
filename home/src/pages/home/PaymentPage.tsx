import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { ArrowLeft, CreditCard, IndianRupee } from 'lucide-react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useSearchParams } from 'react-router-dom';

import { initiatePaymentUrl } from '../../data/config';

const PaymentPage = () => {
  // const InstituteAmount = 1000;
  const [showPaymentForm, setShowPaymentForm] = useState(false);

  const [searchParams] = useSearchParams();
  const instituteId = searchParams.get("instituteId");
  const studentId = searchParams.get("studentId");
  const name = searchParams.get("name");
  const number = searchParams.get("number");
  const amount = searchParams.get("amount");
  const paymentType = searchParams.get("paymentType");

  const handlePhonePePayment = async () => {
    try {
      Swal.fire({
        title: 'Processing Payment',
        text: 'Redirecting you to PhonePe...',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });

      const response = await axios.post(initiatePaymentUrl, {
        amount: amount,
        [paymentType === 'INSTITUTE' ? 'instituteId' : 'studentId']: paymentType === 'INSTITUTE' ? instituteId : studentId,
        paymentType: paymentType,
        name,
        number
      });

      const PhonePeCheckout = (window as any).PhonePeCheckout;

      if (response.data.redirectUrl) {
        PhonePeCheckout.transact({ tokenUrl: response.data.redirectUrl });
      } else {
        throw new Error('Payment initiation failed');
      }
    } catch (error: any) {
      Swal.fire({
        icon: 'error',
        title: 'Payment Failed',
        text: error.response?.data?.message || 'Unable to process payment',
        confirmButtonColor: '#EF4444'
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto space-y-6">
        <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
          <CardHeader className="border-b border-gray-100">
            <div className="flex items-center justify-between">
              {showPaymentForm && (
                <button
                  onClick={() => setShowPaymentForm(false)}
                  className="text-gray-600 hover:text-gray-900 transition-colors flex items-center gap-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </button>
              )}
              <div className="flex-1 text-center">
                <CardTitle className="text-3xl font-bold text-gray-900">
                  Secure Payment
                </CardTitle>
                <CardDescription className="mt-2 text-gray-600">
                  Complete your payment securely through PhonePe
                </CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-8">
            <div className="flex flex-col items-center space-y-6">
              <div className="text-center space-y-2">
                <h3 className="text-2xl font-semibold text-gray-900">Payment Amount</h3>
                <div className="flex items-center justify-center gap-2">
                  <IndianRupee className="h-6 w-6 text-gray-600" />
                  <span className="text-4xl font-bold text-gray-900">{amount}</span>
                </div>
              </div>

              <button
                onClick={handlePhonePePayment}
                className="group relative flex flex-col items-center p-8 border-2 border-gray-200 rounded-xl transition-all hover:border-blue-500 hover:shadow-lg max-w-md w-full bg-white"
              >
                <div className="h-16 w-16 rounded-full bg-blue-50 flex items-center justify-center mb-4 group-hover:bg-blue-500 transition-colors">
                  <CreditCard className="h-8 w-8 text-blue-600 group-hover:text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Pay with PhonePe</h3>
                <p className="mt-2 text-sm text-gray-500 text-center">
                  Fast, secure, and convenient payment
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