export const BASE_URL = import.meta.env.VITE_BASE_URL;

export const PUBLIC_URL = BASE_URL + '/public';

export const createEnquiryUrl = PUBLIC_URL + '/enquiry';

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

export const fetchallinstitutesUrl = INSTITUTE_BASE_URL + '/all';

export const fetchallcoursesUrl = PUBLIC_URL + '/course/list';
