import React, { useState } from 'react';
import { usePayment } from '@/hooks/usePayment';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface PaymentFormProps {
  paymentType: 'STUDENT' | 'INSTITUTE';
  userId: string;
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
  amount: number; // Ensure amount is passed as a prop
}

export const PaymentForm: React.FC<PaymentFormProps> = ({
  paymentType,
  userId,
  onSuccess,
  onError,
  amount
}) => {
  const [amountStudent, setAmountStudent] = useState('');
  const [amountInstitute] = useState(amount); // Fixed amount for institute
  const [registrationNumber, setRegistrationNumber] = useState('');
  const { payment, initiatePayment } = usePayment();

  const handleFetchAmount = async () => {
    // Fetch amount only for students
    if (paymentType === 'STUDENT') {
      try {
        const response = await fetch(`/api/getAmount?registrationNumber=${registrationNumber}`);
        const data = await response.json();
        if (data.amount) {
          setAmountStudent(data.amount.toString()); // Set amount for student
        } else {
          throw new Error('Amount not found');
        }
      } catch (error) {
        onError?.(error);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await initiatePayment({
        amount: paymentType === 'STUDENT' ? parseFloat(amountStudent) : amountInstitute, // Use student amount or fixed institute amount
        paymentType,
        userId
      });

      if (response.redirectUrl) {
        window.location.href = response.redirectUrl;
      }
      
      onSuccess?.(response);
    } catch (error) {
      onError?.(error);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Payment Details</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              {paymentType === 'INSTITUTE' ? 'Application Number' : 'Student ID'}
            </label>
            <Input
              type="text"
              value={registrationNumber}
              onChange={(e) => setRegistrationNumber(e.target.value)}
              required
              className="w-full"
              placeholder={paymentType === 'INSTITUTE' ? 'Enter application number' : 'Enter student ID'}
            />
            {paymentType === 'STUDENT' && (
              <Button 
                type="button" 
                onClick={handleFetchAmount} 
                className="mt-2 w-full"
              >
                Fetch Amount
              </Button>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Amount (₹)</label>
            <Input
              type="number"
              value={paymentType === 'STUDENT' ? amountStudent : amountInstitute} // Show appropriate amount
              readOnly
              className="w-full"
              placeholder="Amount will be fetched automatically"
            />
          </div>

          {payment.error && (
            <Alert variant="destructive">
              <AlertDescription>{payment.error}</AlertDescription>
            </Alert>
          )}

          <Button 
            type="submit" 
            className="w-full"
            disabled={payment.status === 'loading' || (paymentType === 'STUDENT' && !amountStudent)}
          >
            {payment.status === 'loading' ? 'Processing...' : 'Pay Now'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};