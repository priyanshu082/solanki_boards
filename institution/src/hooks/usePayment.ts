import { useRecoilState  } from 'recoil';
import { paymentState } from '../store/atoms/paymentAtoms';
import axios from 'axios';

export const usePayment = () => {
  const [payment, setPayment] = useRecoilState(paymentState);

  const initiatePayment = async (paymentData: {
    amount: number;
    paymentType: 'STUDENT' | 'INSTITUTE';
    userId: string;
  }) => {
    try {
      setPayment(prev => ({
        ...prev,
        status: 'loading',
        error: null
      }));

      const payload = {
        amount: paymentData.amount,
        redirectUrl: `${window.location.origin}/payment/callback`,
        callbackUrl: `${process.env.REACT_APP_API_BASE_URL}/payments/callback`,
        paymentType: paymentData.paymentType,
        ...(paymentData.paymentType === 'STUDENT' 
          ? { studentId: paymentData.userId } 
          : { instituteId: paymentData.userId })
      };

      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/payments/initiate`,
        payload,
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      );

      if (response.data.success) {
        setPayment(prev => ({
          ...prev,
          status: 'success',
          redirectUrl: response.data.redirectUrl,
          merchantTransactionId: response.data.merchantTransactionId,
          paymentStatus: 'PENDING'
        }));

        return response.data;
      } else {
        throw new Error(response.data.message);
      }
    } catch (error: any) {
      setPayment(prev => ({
        ...prev,
        status: 'error',
        error: error.message || 'Payment initiation failed'
      }));
      throw error;
    }
  };

  const verifyPayment = async (transactionId: string) => {
    try {
      setPayment(prev => ({
        ...prev,
        status: 'loading',
        error: null
      }));

      const requestId = sessionStorage.getItem('currentPaymentRequestId');
      const storedDetails = requestId 
        ? JSON.parse(sessionStorage.getItem(requestId) || '{}') 
        : null;

      if (!storedDetails) {
        throw new Error('Invalid payment session');
      }

      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/payments/verify`,
        {
          transactionId,
          requestId
        },
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      );

      if (response.data.success) {
        setPayment(prev => ({
          ...prev,
          status: 'success',
          transactionId
        }));

        // Clear payment session data
        sessionStorage.removeItem(requestId || '');
        sessionStorage.removeItem('currentPaymentRequestId');
        
        return response.data;
      } else {
        throw new Error('Payment verification failed');
      }
    } catch (error: any) {
      setPayment(prev => ({
        ...prev,
        status: 'error',
        error: error.message || 'Payment verification failed'
      }));
      throw error;
    }
  };

  const checkPaymentStatus = async (merchantTransactionId: string) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/payments/status/${merchantTransactionId}`,
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      );

      if (response.data.success) {
        setPayment(prev => ({
          ...prev,
          status: 'success',
          paymentStatus: response.data.status
        }));
      }

      return response.data;
    } catch (error: any) {
      throw error;
    }
  };

  const resetPayment = () => {
    setPayment({
      amount: 0,
      paymentType: 'STUDENT',
      userId: '',
      status: 'idle',
      error: null,
      transactionId: null,
      redirectUrl: null,
      requestId: null,
      merchantTransactionId: null,
      paymentStatus: null,
    });
  };

  return {
    payment,
    initiatePayment,
    verifyPayment,
    checkPaymentStatus,
    resetPayment,
  };
};
