import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PaymentForm } from '../../components/payments';
import { ArrowLeft, CreditCard, Building } from 'lucide-react';
import { Toaster, toast } from 'react-hot-toast';
import { useEffect } from 'react';
import { InstituteAmount } from '@/Config'; 

const PaymentPage = () => {
  const [paymentType, setPaymentType] = useState<'STUDENT' | 'INSTITUTE' | null>(null);
  const [paymentStatus, setPaymentStatus] = useState<string | null>("");

  useEffect(() => {
    const status = localStorage.getItem("paymentStatus");
    setPaymentStatus(status);
  }, []);

  const handlePaymentTypeSelect = (type: 'STUDENT' | 'INSTITUTE') => {
    setPaymentType(type);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Toaster
        position="top-right"
        toastOptions={{
          success: {
            duration: 3000,
            style: {
              background: '#10B981',
              color: 'white',
            },
          },
          error: {
            duration: 4000,
            style: {
              background: '#EF4444',
              color: 'white',
            },
          },
        }}
      />
      <div className="max-w-3xl mx-auto">
        <Card className="shadow-lg">
          <CardHeader>
            <div className="flex items-center justify-between">
              {paymentType && (
                <button
                  onClick={() => setPaymentType(null)}
                  className="text-gray-500 hover:text-gray-700 transition-colors flex items-center gap-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </button>
              )}
              <div className="flex-1 text-center">
                <CardTitle className="text-2xl font-bold text-gray-900">
                  Make Payment
                </CardTitle>
                <CardDescription className="mt-1 text-gray-500">
                  {paymentType === null 
                    ? "Choose your payment type to continue"
                    : `Paying as ${paymentType.charAt(0) + paymentType.slice(1).toLowerCase()}`
                  }
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="p-6">
            {paymentType === null ? (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
                <button
                  onClick={() => handlePaymentTypeSelect('STUDENT')}
                  className="group relative flex flex-col items-center p-6 border-2 border-gray-200 rounded-lg transition-all hover:border-blue-500 hover:shadow-md"
                >
                  <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mb-4 group-hover:bg-blue-500 transition-colors">
                    <CreditCard className="h-6 w-6 text-blue-600 group-hover:text-white" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900">Student Payment</h3>
                  <p className="mt-2 text-sm text-gray-500 text-center">
                    Pay your tuition fees, course materials, and other student expenses
                  </p>
                </button>
                
                <button
                  onClick={() => handlePaymentTypeSelect('INSTITUTE')}
                  className="group relative flex flex-col items-center p-6 border-2 border-gray-200 rounded-lg transition-all hover:border-green-500 hover:shadow-md"
                >
                  <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mb-4 group-hover:bg-green-500 transition-colors">
                    <Building className="h-6 w-6 text-green-600 group-hover:text-white" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900">Institute Payment</h3>
                  <p className="mt-2 text-sm text-gray-500 text-center">
                    Process institutional payments, subscriptions, and organizational fees
                  </p>
                </button>
              </div>
            ) : (
              <div className="animate-fadeIn">
                <PaymentForm
                  paymentType={paymentType}
                  userId="123"
                  amount={paymentType === 'INSTITUTE' ? InstituteAmount : InstituteAmount} // Set fixed amount for institute payment
                  onSuccess={(data) => {
                    console.log('Success', data);
                    toast.success('Payment successful!', {
                      icon: '✅',
                    });
                  }}
                  onError={(error) => {
                    console.log('Error', error);
                    toast.error('Payment failed. Please try again.', {
                      icon: '❌',
                    });
                  }}
                />
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PaymentPage;