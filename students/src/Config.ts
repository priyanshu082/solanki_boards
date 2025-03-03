export const BASE_URL = 'http://localhost:8080/api';

export const ADMIN_BASE_URL = BASE_URL + '/admin';
export const INSTITUTE_BASE_URL = BASE_URL + '/institute';
export const STUDENT_BASE_URL = BASE_URL + '/student';

// From this onwards, create particular routes of admin,instiute and student using their respective base url.

// Admin Routes
export const studentLoginUrl = STUDENT_BASE_URL + '/login';
export const studentDetailsUrl = STUDENT_BASE_URL + '/student';


// Student Routes
export const studentResultUrl = STUDENT_BASE_URL + '/result';

// export const DIGILOCKER_AUTH_URL = "https://digilocker.meripehchaan.gov.in/signin/oauth_partner/%252Foauth2%252F1%252Fconsent%253Flogo%253D%2526response_type%253Dcode%2526client_id%253DCX18B80B79%2526state%253Doidc_flow%2526redirect_uri%253Dhttps%25253A%25252F%25252Fsbiea.co.in%25252F%2526code_challenge%253DL4_TbsMstNvZHy_R9GoyVTPiR7Vt7N-KryCI2Nse9J0%2526code_challenge_method%253DS256%2526scope%253Dopenid%2526orgid%253D108138%2526txn%253D67c58844c2e05oauth21740998724%2526hashkey%253D99d9abbfe34b1e5786f8f5e0f30c4b67491c3aea9b5c0355ad958e2b41aa9499%2526requst_pdf%253DY%2526app_name%253DdGVzdA%25253D%25253D%2526signup%253Dsignup";
  
//   // DigiLocker Access Token and Upload Endpoints
// export const TOKEN_API_URL = "https://api.digitallocker.gov.in/public/oauth2/1/token";
// export const UPLOAD_API_URL = "https://api.digitallocker.gov.in/public/oauth2/1/file/upload";
  
  // DigiLocker Client ID and Secret (should be stored securely in a real application)







