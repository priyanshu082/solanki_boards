export const BASE_URL = 'http://localhost:8080/api';

export const ADMIN_BASE_URL = BASE_URL + '/admin';
export const INSTITUTE_BASE_URL = BASE_URL + '/institute';
export const STUDENT_BASE_URL = BASE_URL + '/student';

// From this onwards, create particular routes of admin,instiute and student using their respective base url.

// Admin Routes
export const instituteLoginUrl = INSTITUTE_BASE_URL + '/auth/login';
export const instituteRegisterUrl = INSTITUTE_BASE_URL + '/register';
export const instituteLogoutUrl = INSTITUTE_BASE_URL + '/logout';
export const instituteProfileUrl = INSTITUTE_BASE_URL + '/profile';
export const instituteDashboardUrl = INSTITUTE_BASE_URL + '/dashboard';




export enum alertTypeEnum{
    success="success",
    error="error",
    info="error",
    warning="warning"
}

export const paymentStatusEnum = {
    PASS: "PASS",
    FAIL: "FAIL",
    PENDING: "PENDING",
    INCOMPLETE: "INCOMPLETE",
    WITHHELD: "WITHHELD",
    CANCELLED: "CANCELLED"
}

export const InstituteAmount = 10000;