import React from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface PaymentStatusProps {
  status: 'success' | 'error';
  message?: string;
}

export const PaymentStatus: React.FC<PaymentStatusProps> = ({ 
  status, 
  message 
}) => {
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>
          {status === 'success' ? 'Payment Successful' : 'Payment Failed'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Alert variant={status === 'success' ? 'default' : 'destructive'}>
          <AlertDescription>
            {message || (status === 'success' 
              ? 'Your payment has been processed successfully.' 
              : 'There was an error processing your payment.')}
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
};
