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
  REGULAR = 'REGULAR',
  DISTANCE = 'DISTANCE',
  ONLINE = 'ONLINE'
}

export enum BatchType {
  MORNING = 'MORNING',
  AFTERNOON = 'AFTERNOON',
  EVENING = 'EVENING',
  WEEKEND = 'WEEKEND'
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

export enum DocumentType {
  PHOTO = 'PHOTO',
  SIGNATURE = 'SIGNATURE',
  AADHAR_CARD = 'AADHAR_CARD',
  PAN_CARD = 'PAN_CARD',
  MARKSHEET = 'MARKSHEET',
  CERTIFICATE = 'CERTIFICATE',
  OTHER = 'OTHER'
}

export interface InstitutePreview {
  id: string;
  centerName: string;
  centerAddress: string;
  centerCity: string;
  centerState: string;
  centercode: string;
}

export interface InstituteDetails {
  id: string;
  headName: string;
  headEmailId: string;
  headMobileNumber: string;
  centerName: string;
  centerEmailId: string;
  centerPhoneNumber: string;
  centerAddress: string;
  centerCity: string;
  centerState: string;
  centerPincode: string;
  centerWebsiteUrl?: string;
}

export interface CoursePreview {
  id: string;
  name: string;
  code?: string;
  courseType: string;
  subjects?: SubjectPreview[];
  fees?: number;
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

export interface ResultPreview {
  id: string;
  studentId: string;
  month: string;
  year: string;
  status: string;
}

export interface ResultDetails {
  id: string;
  studentId: string;
  month: string;
  year: string;
  totalMarks: number;
  obtainedMarks: number;
  status: string;
  details: Array<{
    code: string;
    name: string;
    totalMarks: number;
    obtainedMarks: number;
    grade: string;
    status: string;
  }>;
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