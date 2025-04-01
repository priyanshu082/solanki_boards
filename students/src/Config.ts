export const BASE_URL = "https://sbiea.co.in/api/api";

export const ADMIN_BASE_URL = BASE_URL + '/admin';
export const INSTITUTE_BASE_URL = BASE_URL + '/institute';
export const STUDENT_BASE_URL = BASE_URL + '/student';
export const PUBLIC_URL = BASE_URL + '/public';
export const PAYMENT_BASE_URL = BASE_URL + '/payment';

// From this onwards, create particular routes of admin,instiute and student using their respective base url.

// Admin Routes
export const studentLoginUrl = STUDENT_BASE_URL + '/login';
export const studentDetailsUrl = STUDENT_BASE_URL + '/student';

export const courseFetchUrl= PUBLIC_URL + '/course';


// Student Routes
export const studentResultUrl = STUDENT_BASE_URL + '/result';

// Payment Routes
export const getPaymentDetailsUrl = PAYMENT_BASE_URL + '/get-payment-details';








