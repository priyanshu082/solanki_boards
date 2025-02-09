import { atom, selector } from 'recoil';

export interface PaymentState {
  amount: number;
  paymentType: 'STUDENT' | 'INSTITUTE';
  userId: string;
  status: 'idle' | 'loading' | 'success' | 'error';
  error: string | null;
  transactionId: string | null;
  redirectUrl: string | null;
  requestId: string | null;
  merchantTransactionId: string | null;
  paymentStatus: 'PENDING' | 'SUCCESS' | 'FAILED' | null;
}

export const paymentState = atom<PaymentState>({
  key: 'paymentState',
  default: {
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
  },
});

export const paymentStatusSelector = selector({
  key: 'paymentStatusSelector',
  get: ({ get }) => {
    const payment = get(paymentState);
    return payment.status;
  },
});