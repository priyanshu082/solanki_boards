import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import jsPDF from 'jspdf';
import axios from 'axios';
import html2canvas from 'html2canvas';
import { getPaymentDetailsUrl } from '@/Config';

interface PaymentDetails {
  name?: string;
  applicationNumber?: string;
  paymentAmount?: number;
  paymentStatus?: string;
  phonePeTransactionId?: string;
  merchantTransactionId?: string;
  paymentInstrument?: string;
  cardType?: string;
  pgTransationId?: string;
  pgAuthorizationCode?: string;
  arn?: string;
  brn?: string;
  bankTransactionId?: string;
  bankId?: string;
  utr?: string;
  date: Date;
}

export const PaymentDetails: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails | null>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<'success' | 'error' | 'pending'>('success');

  useEffect(() => {
    const fetchPaymentDetails = async () => {
      const type = searchParams.get('type');
      const id = searchParams.get('id');

      if (!type || !id) return;

      try {
        setLoading(true);
        const response = await axios.get(`${getPaymentDetailsUrl}?type=${type}&id=${id}`);
        // const response = await axios.get(`http://localhost:8080/api/payment/get-payment-details?type=${type}&id=${id}`);
        if (response.status !== 200) {
          throw new Error('Failed to fetch payment details');
        }
        const data = await response.data;

        setPaymentDetails(data);

        // Update status based on payment status from API
        if (data.paymentStatus) {
          if (data.paymentStatus === 'SUCCESS') {
            if (localStorage.getItem('paymentStatus') !== null)
              localStorage.setItem('paymentStatus', 'success');
            setStatus('success');
          } else if (data.paymentStatus === 'PENDING') {
            setStatus('pending');
          } else if (data.paymentStatus === 'FAILED') {
            setStatus('error');
          }
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchPaymentDetails();
  }, [searchParams]);

  const downloadAsPdf = () => {
    const element = document.getElementById('payment-receipt');
    if (!element) return;

    // Create a clone of the element to avoid modifying the original
    const clone = element.cloneNode(true) as HTMLElement;

    // Add specific styles to ensure proper rendering
    clone.style.backgroundColor = 'white';
    clone.style.color = 'black';
    clone.style.width = '210mm'; // A4 width
    clone.style.padding = '20px';

    // Temporarily append the clone to the document
    document.body.appendChild(clone);

    html2canvas(clone, {
      scale: 2, // Higher scale for better quality
      logging: false,
      useCORS: true,
      backgroundColor: '#ffffff',
      onclone: (clonedDoc) => {
        // Ensure all text is black for better PDF readability
        const elements = clonedDoc.querySelectorAll('*');
        elements.forEach((el) => {
          const element = el as HTMLElement;
          element.style.color = 'black';
          element.style.borderColor = 'black';
        });
      }
    }).then(canvas => {
      // Remove the clone from the document
      document.body.removeChild(clone);

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save('payment-receipt.pdf');
    });
  };

  const renderPaymentDetailsTable = () => {
    if (!paymentDetails) return null;

    const entries = Object.entries(paymentDetails).filter(([, value]) => value !== undefined && value !== null);

    return (
      <div id="payment-receipt" className="mt-4">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold mb-2">SOLANKI BROTHERS COUNCIL FOR OPEN AND DISTANCE LEARNING</h1>
          <p className="text-sm text-gray-500">Payment Receipt</p>
          <div className="border-t border-b my-4 py-2">
            <p className="text-sm text-gray-600">Receipt No: {paymentDetails.merchantTransactionId || 'N/A'}</p>
            <p className="text-sm text-gray-600">Date: {paymentDetails.date.toString().split('T')[0]}</p>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Student Information</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Name</p>
              <p className="font-medium">{paymentDetails.name || 'N/A'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Application Number</p>
              <p className="font-medium">{paymentDetails.applicationNumber || 'N/A'}</p>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Payment Details</h2>
          <Table className="border rounded-md">
            <TableHeader>
              <TableRow>
                <TableHead className="w-1/2 font-semibold">Detail</TableHead>
                <TableHead className="w-1/2 font-semibold">Value</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {entries.map(([key, value]) => (
                <TableRow key={key}>
                  <TableCell className="font-medium capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</TableCell>
                  <TableCell>{typeof value === 'number' ? `₹${value.toLocaleString()}` : String(value)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="mt-6 pt-4 border-t text-center">
          <p className="text-sm text-gray-600">This is a computer-generated receipt and does not require a signature.</p>
          <p className="text-sm text-gray-600 mt-2">For any queries, please contact our support team.</p>
        </div>
      </div>
    );
  };

  return (
    <Card className="w-full max-w-2xl mx-auto my-8">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>
            {status === 'success'
              ? 'Payment Successful'
              : status === 'pending'
                ? 'Payment Pending'
                : 'Payment Failed'}
          </span>
          {paymentDetails && (
            <Button
              variant="outline"
              size="sm"
              onClick={downloadAsPdf}
              className="flex items-center gap-1 cursor-pointer"
            >
              <Download size={16} />
              <span>Download Receipt</span>
            </Button>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Alert variant={
          status === 'success'
            ? 'default'
            : status === 'pending'
              ? 'default'
              : 'destructive'
        }>
          <AlertDescription>
            {(
              status === 'success'
                ? 'Your payment has been processed successfully.'
                : status === 'pending'
                  ? 'Your payment is being processed. Please check back later.'
                  : 'There was an error processing your payment.'
            )}
          </AlertDescription>
        </Alert>

        {loading && <p className="text-center mt-4">Loading payment details...</p>}
        {error && <Alert variant="destructive" className="mt-4"><AlertDescription>{error}</AlertDescription></Alert>}
        {renderPaymentDetailsTable()}
      </CardContent>
    </Card>
  );
};
