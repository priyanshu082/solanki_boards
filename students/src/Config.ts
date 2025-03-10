export const BASE_URL = process.env.VITE_BASE_URL;

export const ADMIN_BASE_URL = BASE_URL + '/admin';
export const INSTITUTE_BASE_URL = BASE_URL + '/institute';
export const STUDENT_BASE_URL = BASE_URL + '/student';

// From this onwards, create particular routes of admin,instiute and student using their respective base url.

// Admin Routes
export const studentLoginUrl = STUDENT_BASE_URL + '/login';
export const studentDetailsUrl = STUDENT_BASE_URL + '/student';


// Student Routes
export const studentResultUrl = STUDENT_BASE_URL + '/result';








