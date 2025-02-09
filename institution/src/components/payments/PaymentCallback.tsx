import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { usePayment } from '@/hooks/usePayment';
import { Alert, AlertDescription } from '@/components/ui/alert';

export const PaymentCallback: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { payment, checkPaymentStatus } = usePayment();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const merchantTransactionId = searchParams.get('merchantTransactionId');
    if (merchantTransactionId) {
      const checkStatus = async () => {
        try {
          const result = await checkPaymentStatus(merchantTransactionId);
          if (result.status === 'SUCCESS') {
            setTimeout(() => navigate('/payment/success'), 2000);
          } else if (result.status === 'FAILED') {
            setTimeout(() => navigate('/payment/error'), 2000);
          } else {
            // If still pending, check again after 5 seconds
            setTimeout(checkStatus, 5000);
          }
        } catch (error) {
          setTimeout(() => navigate('/payment/error'), 2000);
        } finally {
          setChecking(false);
        }
      };

      checkStatus();
    }
  }, [searchParams]);

  return (
    <div className="max-w-md mx-auto mt-8 p-4">
      {checking && <p>Verifying payment status...</p>}
      {payment.paymentStatus === 'SUCCESS' && (
        <Alert>
          <AlertDescription>
            Payment successful! Redirecting...
          </AlertDescription>
        </Alert>
      )}
      {payment.paymentStatus === 'FAILED' && (
        <Alert variant="destructive">
          <AlertDescription>
            Payment failed. Redirecting...
          </AlertDescription>
        </Alert>
      )}
      {payment.paymentStatus === 'PENDING' && (
        <Alert>
          <AlertDescription>
            Payment is being processed. Please wait...
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};
