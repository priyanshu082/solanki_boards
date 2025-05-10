
export const BASE_URL = "https://sbiea.co.in/api/api";
// export const BASE_URL = "http://localhost:8080/api";
export const ADMIN_URL = BASE_URL + "/admin";
export const PUBLIC_URL = BASE_URL + "/public";
export const updateenquiry = BASE_URL + "/enquiry";

export const adminLogin = ADMIN_URL + "/auth/login";

export const getallstudents = ADMIN_URL + "/student/list";
export const getallinstitute = ADMIN_URL + "/institute/list";
export const getallcourse = ADMIN_URL + "/course/list";
export const getallenquiry = ADMIN_URL + "/enquiry/list";
export const getallnotice = ADMIN_URL + "/notice/list";
export const getallresult = ADMIN_URL + "/result/list";
export const getallsubject = ADMIN_URL + "/subject/list";

export const createadmission = ADMIN_URL + "/admission";
export const createcourse = ADMIN_URL + "/course";
export const createsubject = ADMIN_URL + "/subject";
export const createinstitute = ADMIN_URL + "/institute";
export const createnotice = ADMIN_URL + "/notice";
export const createresult = ADMIN_URL + "/result";


export const deletecoursebyid = ADMIN_URL + "/course";
export const deletesubjectbyid = ADMIN_URL + "/subject";
export const deleteinstitutebyid = ADMIN_URL + "/institute";
export const deletenoticebyid = ADMIN_URL + "/notice";
export const deleteresultbyid = ADMIN_URL + "/result";
export const deleteadmissionbyid = ADMIN_URL + "/admission";

export const getstudentbyid = ADMIN_URL + "/student";
export const getinstitutebyid = ADMIN_URL + "/institute";
export const getnoticebyid = ADMIN_URL + "/notice";
export const getresultbyid = ADMIN_URL + "/result";
export const getsubjectbyid = ADMIN_URL + "/subject";
export const getcoursebyid = PUBLIC_URL + "/course";
export const getenquirybyid = ADMIN_URL + "/enquiry";

export const updateAdmission = ADMIN_URL + "/admission";
export const updateInstitute = ADMIN_URL + "/institute";
export const updateResult = ADMIN_URL + "/result";
export const updateCourse = ADMIN_URL + "/course";
export const updateSubject = ADMIN_URL + "/subject";
export const updateNotice = ADMIN_URL + "/notice";

export const deleteAdmission = ADMIN_URL + "/admission";
export const deleteResult = ADMIN_URL + "/result";
export const deleteInstitute = ADMIN_URL + "/institute";
export const deleteCourse = ADMIN_URL + "/course";
export const deleteSubject = ADMIN_URL + "/subject";
export const deleteNotice = ADMIN_URL + "/notice";
export const deleteEnquiry = ADMIN_URL + "/enquiry";

export const uploadresult = ADMIN_URL + "/result";

export const getAllPayments = ADMIN_URL + "/payment/list";
export const getResult = ADMIN_URL + "/result/list";

export const getPaymentDetails = BASE_URL + "/payment/get-payment-details";

export const paymentApproved = ADMIN_URL + "/payment/approved";

export const changePassword = ADMIN_URL + "/auth/changePassword";