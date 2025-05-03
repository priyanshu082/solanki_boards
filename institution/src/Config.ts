export const BASE_URL = "https://sbiea.co.in/api/api";
// export const BASE_URL = "http://localhost:8080/api";

export const ADMIN_BASE_URL = BASE_URL + '/admin';
export const INSTITUTE_BASE_URL = BASE_URL + '/institute';
export const STUDENT_BASE_URL = BASE_URL + '/student';
export const PUBLIC_BASE_URL = BASE_URL + '/public';
export const PAYMENT_BASE_URL = BASE_URL + '/payment';
// From this onwards, create particular routes of admin,instiute and student using their respective base url.

// Admin Routes
export const instituteLoginUrl = INSTITUTE_BASE_URL + '/auth/login';
export const instituteRegisterUrl = INSTITUTE_BASE_URL + '/register';
export const allStudentsSearchUrl = INSTITUTE_BASE_URL + '/student/list';
export const studentSearchUrl = INSTITUTE_BASE_URL + '/student';
export const admissionRegistrationUrl = INSTITUTE_BASE_URL + '/admission';
export const addmisionPutUrl = INSTITUTE_BASE_URL + '/admission';
export const instituteDetailsUrl = INSTITUTE_BASE_URL + '/institute'; //it will get param as instituteId
export const instituteUpdateUrl = INSTITUTE_BASE_URL + '/institute'; //put request 
export const paymentStatusUrl = PAYMENT_BASE_URL + '/check-payment-status';
export const getPaymentDetailsUrl = PAYMENT_BASE_URL + '/get-payment-details';
export const initiatePaymentUrl = PAYMENT_BASE_URL + '/initiate-payment';
export const verifyPaymentUrl = PAYMENT_BASE_URL + '/verify-payment';

export const courseFetchUrl = PUBLIC_BASE_URL + '/course/list';
export const instituteFetchUrl = PUBLIC_BASE_URL + '/institute/list';

export const instituteLogoutUrl = INSTITUTE_BASE_URL + '/logout';
export const instituteProfileUrl = INSTITUTE_BASE_URL + '/profile';
export const instituteDashboardUrl = INSTITUTE_BASE_URL + '/dashboard';

export const getStudentDetailsUrl = INSTITUTE_BASE_URL + '/student';

export const getAllStudentsPayments = INSTITUTE_BASE_URL + '/payment/list';



export enum alertTypeEnum {
    success = "success",
    error = "error",
    info = "error",
    warning = "warning"
}



export const InstituteAmount = 1;