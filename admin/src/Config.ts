
export const BASE_URL = import.meta.env.VITE_BASE_URL;
export const ADMIN_URL = BASE_URL + "/api/admin";
export const PUBLIC_URL = BASE_URL + "/api/public";
export const updateenquiry = BASE_URL + "/enquiry";

export const getallstudents = ADMIN_URL + "/student/list";
export const getallinstitute = ADMIN_URL + "/institute/list";
export const getallcourse = ADMIN_URL + "/course/list";
export const getallenquiry = ADMIN_URL + "/enquiry/list";
export const getallnotice = ADMIN_URL + "/notice/list";
export const getallresult = ADMIN_URL + "/result/list";
export const getallsubject = ADMIN_URL + "/subject/list";

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


export const uploadresult = ADMIN_URL + "/result";





