export const BASE_URL = 'http://localhost:8080/api';


export const ADMIN_BASE_URL = BASE_URL + '/admin';
export const INSTITUTE_BASE_URL = BASE_URL + '/institute';
export const STUDENT_BASE_URL = BASE_URL + '/student';
export const PAYMENT_BASE_URL = BASE_URL + '/payment';

// From this onwards, create particular routes of admin,instiute and student using their respective base url.

// Admin Routes
export const instituteRegistrationUrl = INSTITUTE_BASE_URL + '/institute';
export const studentAdmissionUrl = STUDENT_BASE_URL + '/admission';
export const initiatePaymentUrl = PAYMENT_BASE_URL + '/initiate-payment';
export const paymentStatusUrl = PAYMENT_BASE_URL + '/check-payment-status';
export const verifyPaymentUrl = PAYMENT_BASE_URL + '/verify-payment';

