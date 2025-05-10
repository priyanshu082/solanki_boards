export enum StudentCategory {
  GENERAL = 'GENERAL',
  SC = 'SC',
  ST = 'ST',
  OBC = 'OBC',
  MINORITY = 'MINORITY',
  NRI = 'NRI',
  FOREIGN_NATIONAL = 'FOREIGN_NATIONAL',
  OTHER = 'OTHER'
}

export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  OTHER = 'OTHER'
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

export enum EnquiryStatus {
  NEW = 'NEW',
  IN_PROGRESS = 'IN_PROGRESS',
  FOLLOW_UP = 'FOLLOW_UP',
  CONVERTED = 'CONVERTED',
  CLOSED = 'CLOSED',
  REJECTED = 'REJECTED'
}

export enum AdmissionType {
  FRESH = 'FRESH',
  TOC = 'TOC',
  PART_ADMISSION = 'PART_ADMISSION'
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

export enum ExaminationType {
  SECONDARY = 'SECONDARY',
  HIGHER_SECONDARY = 'HIGHER_SECONDARY',
  GRADUATION = 'GRADUATION',
  POST_GRADUATION = 'POST_GRADUATION',
  DIPLOMA = 'DIPLOMA',
  OTHER = 'OTHER'
}

export enum SubjectType {
  THEORY = 'THEORY',
  PRACTICAL = 'PRACTICAL',
  BOTH = 'BOTH'
}

export enum ResultStatus {
  PASS = 'PASS',
  FAIL = 'FAIL',
  PENDING = 'PENDING',
  INCOMPLETE = 'INCOMPLETE',
  WITHHELD = 'WITHHELD',
  CANCELLED = 'CANCELLED'
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

export enum IndianState {
  ANDHRA_PRADESH = 'ANDHRA_PRADESH',
  ARUNACHAL_PRADESH = 'ARUNACHAL_PRADESH',
  ASSAM = 'ASSAM',
  BIHAR = 'BIHAR',
  CHHATTISGARH = 'CHHATTISGARH',
  GOA = 'GOA',
  GUJARAT = 'GUJARAT',
  HARYANA = 'HARYANA',
  HIMACHAL_PRADESH = 'HIMACHAL_PRADESH',
  JHARKHAND = 'JHARKHAND',
  KARNATAKA = 'KARNATAKA',
  KERALA = 'KERALA',
  MADHYA_PRADESH = 'MADHYA_PRADESH',
  MAHARASHTRA = 'MAHARASHTRA',
  MANIPUR = 'MANIPUR',
  MEGHALAYA = 'MEGHALAYA',
  MIZORAM = 'MIZORAM',
  NAGALAND = 'NAGALAND',
  ODISHA = 'ODISHA',
  PUNJAB = 'PUNJAB',
  RAJASTHAN = 'RAJASTHAN',
  SIKKIM = 'SIKKIM',
  TAMIL_NADU = 'TAMIL_NADU',
  TELANGANA = 'TELANGANA',
  TRIPURA = 'TRIPURA',
  UTTAR_PRADESH = 'UTTAR_PRADESH',
  UTTARAKHAND = 'UTTARAKHAND',
  WEST_BENGAL = 'WEST_BENGAL',
  DELHI = 'DELHI'
}

export enum Country {
  INDIA = 'INDIA',
  OTHER = 'OTHER'
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
export enum UnionTerritory {
  ANDAMAN_AND_NICOBAR = 'ANDAMAN_AND_NICOBAR',
  CHANDIGARH = 'CHANDIGARH',
  DADRA_AND_NAGAR_HAVELI = 'DADRA_AND_NAGAR_HAVELI',
  DAMAN_AND_DIU = 'DAMAN_AND_DIU',
  DELHI = 'DELHI',
  JAMMU_AND_KASHMIR = 'JAMMU_AND_KASHMIR',
  LADAKH = 'LADAKH',
  LAKSHADWEEP = 'LAKSHADWEEP',
  PUDUCHERRY = 'PUDUCHERRY'
}

export enum InstituteDocumentType {
  REGISTRATION_CERTIFICATE = 'REGISTRATION_CERTIFICATE',
  AFFILIATION_CERTIFICATE = 'AFFILIATION_CERTIFICATE',
  RECOGNITION_CERTIFICATE = 'RECOGNITION_CERTIFICATE',
  NO_OBJECTION_CERTIFICATE = 'NO_OBJECTION_CERTIFICATE',
  BUILDING_OWNERSHIP = 'BUILDING_OWNERSHIP',
  FIRE_SAFETY = 'FIRE_SAFETY',
  SANITATION = 'SANITATION',
  OTHER = 'OTHER'
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

export enum CourseStatus {
  COMPLETED = 'COMPLETED',
  ONGOING = 'ONGOING'
}

export interface InstitutePreview {
  id: string;
  centerName: string;
  centerCity: string;
  centerState: string;
  centerCode: string;
  headName: string;
  paymentStatus: PaymentStatus;
}

export interface InstituteDetails {
  id: string;
  applicationNumber?: string;
  registrationNumber?: string;
  headDob: string;
  headName: string;
  headFatherName: string;
  headAadharNumber: string;
  headPanCardNumber: string;
  headMobileNumber: string;
  headEmailId: string;
  headProfileImage?: string;
  headGender: Gender;
  headAddress: string;
  headCity: string;
  headState?: IndianState;
  headUnionTerritory?: UnionTerritory;
  headCountry: Country;
  headPincode: string;
  headBankName: string;
  headAccountNumber: string;
  headIfscCode: string;
  centerCode?: string;
  centerName: string;
  centerEmailId: string;
  centerWebsiteUrl?: string;
  centerPhoneNumber: string;
  centerAddress: string;
  centerCity: string;
  centerState?: IndianState;
  centerUnionTerritory?: UnionTerritory;
  centerCountry: Country;
  centerPincode: string;
  paymentStatus: PaymentStatus;
  createdAt: Date;
  updatedAt: Date;
  documents: InstituteDocument[];
  payments: Payment[];
}

export interface InstituteDocument {
  id: string;
  documentType: InstituteDocumentType;
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

export interface CoursePreview {
  id: string;
  name: string;
  code?: string;
  courseType: string;
  subjects?: SubjectPreview[];
  fees?: number;
  duration: number;
  durationType: string;
}

export interface SubjectPreview {
  id: string;
  name: string;
  code: string;
  type: string;
  courseId: string;
  course?: {
    name: string;
  };
}

export interface CourseDetails {
  id: string;
  name: string;
  code?: string;
  fees?: number;
  courseType: string;
  subjects: Array<{
    id: string;
    name: string;
    code: string;
    fees?: number;
    type: string;
  }>;
}

export interface StudentPreview {
  id: string;
  name: string;
  enrollmentNumber?: string;
  applicationNumber: string;
  courseId: string;
  paymentStatus: PaymentStatus;
  admissionType: AdmissionType;
  courseStatus: CourseStatus;
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

export interface EducationalQualification {
  id: string;
  studentId: string;
  examination: ExaminationType;
  subjects: string;
  board?: string;
  university?: string;
  yearOfPassing: string;
  division?: string;
  grade?: string;
  percentage: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface LastPassedExam {
  id: string;
  studentId: string;
  subjectType: SubjectType;
  subject: string;
  practicalMarks: number;
  assignmentMarks: number;
  theoryMarks: number;
  obtainedMarks: number;
  maximumMarks: number;
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

export interface NoticePreview {
  id: string;
  title: string;
  createdAt: Date;
  forInstitute: boolean;
}

export interface NoticeDetails {
  id: string;
  title: string;
  description: string;
  forInstitute: boolean;
  createdAt: Date;
  updatedAt: Date;
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

export interface ResultPreview {
  id: string;
  studentId: string;
  month: Month;
  year: Year;
  status: ResultStatus;
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

export interface EnquiryPreview {
  id: string;
  title: string;
  name: string;
  status: EnquiryStatus;
}

export interface EnquiryDetails {
  id: string;
  title: string;
  description: string;
  name: string;
  phoneNumber: string;
  email: string;
  status: EnquiryStatus;
  createdAt: Date;
  updatedAt: Date;
}