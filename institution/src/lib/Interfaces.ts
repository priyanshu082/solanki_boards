export enum AdmissionType {
  FRESH = "FRESH",
  TOC = "TOC",
  PART_ADMISSION = "PART_ADMISSION",
}

export enum StudentCategory {
  GENERAL = "GENERAL",
  SC = "SC",
  ST = "ST",
  OBC = "OBC",
  MINORITY = "MINORITY",
  NRI = "NRI",
  FOREIGN_NATIONAL = "FOREIGN_NATIONAL",
  OTHER = "OTHER",
}

export enum Gender {
  MALE = "MALE",
  FEMALE = "FEMALE",
  OTHER = "OTHER",
}

export enum BatchType {
  BATCH_1_2022_O_22 = "BATCH_1_2022_O_22",
  BATCH_2_2022_M_23 = "BATCH_2_2022_M_23",
  BATCH_1_2023_O_23 = "BATCH_1_2023_O_23",
  BATCH_2_2023_M_24 = "BATCH_2_2023_M_24",
  BATCH_1_2024_O_24 = "BATCH_1_2024_O_24",
  BATCH_2_2024_M_25 = "BATCH_2_2024_M_25",
  BATCH_1_2025_O_25 = "BATCH_1_2025_O_25",
  BATCH_2_2025_M_26 = "BATCH_2_2025_M_26",
}

export enum IndianState {
  ANDHRA_PRADESH = "ANDHRA_PRADESH",
  ARUNACHAL_PRADESH = "ARUNACHAL_PRADESH",
  ASSAM = "ASSAM",
  BIHAR = "BIHAR",
  CHHATTISGARH = "CHHATTISGARH",
  GOA = "GOA",
  GUJARAT = "GUJARAT",
  HARYANA = "HARYANA",
  HIMACHAL_PRADESH = "HIMACHAL_PRADESH",
  JHARKHAND = "JHARKHAND",
  KARNATAKA = "KARNATAKA",
  KERALA = "KERALA",
  MADHYA_PRADESH = "MADHYA_PRADESH",
  MAHARASHTRA = "MAHARASHTRA",
  MANIPUR = "MANIPUR",
  MEGHALAYA = "MEGHALAYA",
  MIZORAM = "MIZORAM",
  NAGALAND = "NAGALAND",
  ODISHA = "ODISHA",
  PUNJAB = "PUNJAB",
  RAJASTHAN = "RAJASTHAN",
  SIKKIM = "SIKKIM",
  TAMIL_NADU = "TAMIL_NADU",
  TELANGANA = "TELANGANA",
  TRIPURA = "TRIPURA",
  UTTAR_PRADESH = "UTTAR_PRADESH",
  UTTARAKHAND = "UTTARAKHAND",
  WEST_BENGAL = "WEST_BENGAL",
}

export enum Country {
  INDIA = "INDIA"
}

export enum ExaminationType {
  X = "X",
  XII = "XII",
  OTHER = "OTHER"
}

export enum SubjectType {
  LANGUAGE = "LANGUAGE",
  NON_LANGUAGE = "NON_LANGUAGE",
  VOCATIONAL = "VOCATIONAL"
}

export const DocumentType = {
  PROFILE_PHOTO: 'PROFILE_PHOTO',
  AADHAR_CARD_FRONT: 'AADHAR_CARD_FRONT',
  AADHAR_CARD_BACK: 'AADHAR_CARD_BACK',
  MARKSHEET_10TH: 'MARKSHEET_10TH',
  MARKSHEET_12TH: 'MARKSHEET_12TH',
  TRANSFER_CERTIFICATE: 'TRANSFER_CERTIFICATE',
  BIRTH_CERTIFICATE: 'BIRTH_CERTIFICATE',
  INCOME_CERTIFICATE: 'INCOME_CERTIFICATE',
  CASTE_CERTIFICATE: 'CASTE_CERTIFICATE',
  PASSPORT: 'PASSPORT',
  OTHER: 'OTHER'
};

export const InstituteDocumentType = {
  HEAD_AADHAR_CARD_FRONT: 'HEAD_AADHAR_CARD_FRONT',
  HEAD_AADHAR_CARD_BACK: 'HEAD_AADHAR_CARD_BACK',
  HEAD_PAN_CARD: 'HEAD_PAN_CARD',
  REGISTRATION_CERTIFICATE: 'REGISTRATION_CERTIFICATE',
  AFFILIATION_DOCUMENT: 'AFFILIATION_DOCUMENT',
  TAX_DOCUMENT: 'TAX_DOCUMENT',
  LOGO: 'LOGO',
  INFRASTRUCTURE_PLAN: 'INFRASTRUCTURE_PLAN',
  ACADEMIC_CALENDAR: 'ACADEMIC_CALENDAR',
  FACULTY_CREDENTIALS: 'FACULTY_CREDENTIALS',
  ACCREDITATION_CERTIFICATE: 'ACCREDITATION_CERTIFICATE',
  LAND_DOCUMENT: 'LAND_DOCUMENT',
  OTHER: 'OTHER'
};

// Interfaces
export interface Address {
  address: string;
  city: string;
  district: string;
  state: IndianState;
  country: Country;
  pincode: string;
}

export enum PaymentStatus {
  PENDING = 'PENDING',
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED',
  DECLINED = 'DECLINED',
  PROCESSING = 'PROCESSING',
  REFUNDED = 'REFUNDED',
  CANCELLED = 'CANCELLED',
  TIMED_OUT = 'TIMED_OUT',
  ERROR = 'ERROR'
}


export interface EducationalQualification {
  examination: ExaminationType;
  subjects: string;
  board?: string;
  university?: string;
  yearOfPassing: string;
  division?: string;
  grade?: string;
  percentage: number;
}

export interface LastPassedExam {
  subjectType: SubjectType;
  subject: string;
  practicalMarks: number;
  assignmentMarks: number;
  theoryMarks: number;
  obtainedMarks: number;
  maximumMarks: number;
}

// Main Form Data Interface
export interface AdmissionFormData {
  name: string;
  category: StudentCategory;
  dob: string;
  gender: Gender;
  fatherName: string;
  motherName: string;
  instituteId: string;
  nationality: string;
  email: string;
  phoneNumber: string;
  batch: BatchType;
  subjectIds: string[];
  studentPhoto?: File | null;
  admissionType: AdmissionType;
  courseId: string;
  paymentAmount: number;
  permanentAddress: Address;
  correspondenceAddress: Address;
  educationalQualifications: EducationalQualification[];
  lastPassedExam: LastPassedExam[];
}



export enum CourseType {
  ACADEMIC = "ACADEMIC",
  DIPLOMA = "DIPLOMA",
  CERTIFICATE = "CERTIFICATE",
  DEGREE = "DEGREE",
  POST_GRADUATE = "POST_GRADUATE",
  PHD = "PHD"
}



export interface InterfaceCourse {
  id: string;
  name: string;
  code?: string;
  fees?: number;
  courseType: CourseType;
  createdAt: string;
  updatedAt: string;
  subjects: InterfaceSubject[];
}

export interface InterfaceSubject {
  id: string;
  name: string;
  code: string;
  fees?: number;
  type: SubjectType;
  courseId: string;
  createdAt: string;
  updatedAt: string;
}

export interface InterfaceInstitute {
  id: string;
  name: string;
}

export interface InterfaceStudentDetails {
  id: string;
  name: string;
  dob: Date;
  fatherName: string;
  motherName: string;
  category: StudentCategory;
  gender: Gender;
  nationality: string;
  courseId: string;
  batch: BatchType;
  studentPhoto?: string;
  subjectIds: string[];
  enrollmentNumber?: string;
  applicationNumber: string;
  phoneNumber: string;
  email: string;
  instituteId?: string;
  paymentStatus: PaymentStatus;
  paymentAmount: number;
  admissionType: AdmissionType;
  createdAt: Date;
  updatedAt: Date;
  correspondenceAddress?: CorrespondenceAddress[];
  permanentAddress?: PermanentAddress[];
  educationalQualifications?: EducationalQualification[];
  lastPassedExam?: LastPassedExam[];
  documents?: StudentDocument[];
  payments?: Payment[];
}

export interface CorrespondenceAddress {
  id: string;
  studentId: string;
  address: string;
  city: string;
  district: string;
  state?: IndianState;
  country: Country;
  pincode: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface PermanentAddress {
  id: string;
  studentId: string;
  address: string;
  city: string;
  district: string;
  state?: IndianState;
  country: Country;
  pincode: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface StudentDocument {
  id: string;
  studentId: string;
  documentType: DocumentType;
  fileName: string;
  fileUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Payment {
  id: string;
  merchantTransactionId: string;
  phonePeTransactionId?: string;
  merchantId: string;
  merchantUserId: string;
  amount: number;
  paymentType: PaymentType;
  paymentStatus: PaymentStatus;
  paymentInstrumentType?: PaymentInstrumentType;
  utr?: string;
  cardType?: string;
  pgTransactionId?: string;
  bankTransactionId?: string;
  pgAuthorizationCode?: string;
  arn?: string;
  bankId?: string;
  brn?: string;
  createdAt: Date;
  updatedAt: Date;
}

export enum PaymentType {
  STUDENT = 'STUDENT',
  INSTITUTE = 'INSTITUTE'
}

export enum PaymentInstrumentType {
  UPI = 'UPI',
  NET_BANKING = 'NET_BANKING',
  CARD = 'CARD',
  WALLET = 'WALLET',
  OTHER = 'OTHER'
}

export enum ResultStatus {
  PASS = 'PASS',
  FAIL = 'FAIL',
  PENDING = 'PENDING',
  INCOMPLETE = 'INCOMPLETE',
  WITHHELD = 'WITHHELD',
  CANCELLED = 'CANCELLED'
}

export interface ResultDetails {
  id: string;
  studentId: string;
  month: Month;
  year: Year;
  totalMarks: number;
  obtainedMarks: number;
  status: ResultStatus;
  createdAt: Date;
  updatedAt: Date;
  details: SubjectResultDetail[];
}

export enum Month {
  JANUARY = 'JANUARY',
  FEBRUARY = 'FEBRUARY',
  MARCH = 'MARCH',
  APRIL = 'APRIL',
  MAY = 'MAY',
  JUNE = 'JUNE',
  JULY = 'JULY',
  AUGUST = 'AUGUST',
  SEPTEMBER = 'SEPTEMBER',
  OCTOBER = 'OCTOBER',
  NOVEMBER = 'NOVEMBER',
  DECEMBER = 'DECEMBER'
}

export enum Year {
  Y2020 = '2020',
  Y2021 = '2021',
  Y2022 = '2022',
  Y2023 = '2023',
  Y2024 = '2024',
  Y2025 = '2025',
  Y2026 = '2026',
  Y2027 = '2027',
  Y2028 = '2028',
  Y2029 = '2029',
  Y2030 = '2030'
}

export interface SubjectResultDetail {
  id: string;
  code: string;
  name: string;
  totalMarks: number;
  obtainedMarks: number;
  grade: Grade;
  status: ResultStatus;
  resultId: string;
  createdAt: Date;
  updatedAt: Date;
}

export enum Grade {
  A_PLUS = 'A_PLUS',
  A = 'A',
  B_PLUS = 'B_PLUS',
  B = 'B',
  C_PLUS = 'C_PLUS',
  C = 'C',
  D = 'D',
  F = 'F'
}