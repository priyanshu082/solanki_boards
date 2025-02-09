import { PaymentStatus } from '../../components/payments';

const PaymentResultPage = () => {
  return (
    <PaymentStatus 
      status="success"
      message="Your payment was successful!"
    />
  );
};

export default PaymentResultPage;