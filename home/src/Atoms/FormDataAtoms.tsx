import { atom } from 'recoil';

// Import static data atoms from separate file to avoid duplication
export { staticDataAtoms } from './staticDataAtoms';

// Enum Definitions
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
  EWS = "EWS",
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

export enum UnionTerritory {
  DELHI = "DELHI",
}

export enum ExaminationType {
  X = "X",
  XII = "XII",
  GRADUATION = "GRADUATION",
  POST_GRADUATION = "POST_GRADUATION"
}

export enum SubjectType {
  LANGUAGE = "LANGUAGE",
  NON_LANGUAGE = "NON_LANGUAGE",
  VOCATIONAL = "VOCATIONAL",
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
  PASS = "PASS",
  FAIL = "FAIL",
  PENDING = "PENDING",
  INCOMPLETE = "INCOMPLETE",
  WITHHELD = "WITHHELD",
  CANCELLED = "CANCELLED"
}

export interface EducationalQualification {
  examination: ExaminationType;
  subjects: string;
  board: string;
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
  dob: string;
  fatherName: string;
  motherName: string;
  category: StudentCategory;
  gender: Gender;
  nationality: string;
  email: string;
  phoneNumber: string;
  batch: BatchType;
  subjectIds: string[];
  studentPhoto: File | null;
  admissionType: AdmissionType;
  courseId: string;
  paymentAmount: number;
  permanentAddress: Address;
  correspondenceAddress: Address;
  educationalQualifications: EducationalQualification[];
  lastPassedExam: LastPassedExam[];
}

// Initial State
const initialFormState: AdmissionFormData = {
  admissionType: AdmissionType.FRESH,
  name: '',
  dob: '',
  fatherName: '',
  motherName: '',
  category: StudentCategory.GENERAL,
  gender: Gender.MALE,
  nationality: '',
  courseId: '',
  batch: BatchType.BATCH_1_2024_O_24,
  subjectIds: [],
  phoneNumber: '',
  lastPassedExam: [],
  email: '',
  permanentAddress: {
    address: '',
    city: '',
    district: '',
    state: IndianState.ANDHRA_PRADESH,
    country: Country.INDIA,
    pincode: '',
  },
  correspondenceAddress: {
    address: '',
    city: '',
    district: '',
    state: IndianState.ANDHRA_PRADESH,
    country: Country.INDIA,
    pincode: '',
  },
  educationalQualifications: [],
  paymentAmount: 500, // Default payment amount
  studentPhoto: null,
};

// Recoil Atoms
export const admissionFormState = atom<AdmissionFormData>({
  key: 'form/admissionFormState',
  default: initialFormState,
});

export const lastPassedExamState = atom<LastPassedExam[]>({
  key: 'form/lastPassedExamState',
  default: [],
});

export const educationalQualificationsState = atom<EducationalQualification[]>({
  key: 'form/educationalQualificationsState',
  default: [],
});

export const nameState = atom<string>({
  key: 'form/nameState',
  default: '',
});

export const categoryState = atom<StudentCategory>({
  key: 'form/categoryState',
  default: StudentCategory.GENERAL,
});

export const dobState = atom<string>({
  key: 'form/dobState',
  default: '',
});

export const genderState = atom<Gender>({
  key: 'form/genderState',
  default: Gender.MALE,
});

export const fatherNameState = atom<string>({
  key: 'form/fatherNameState',
  default: '',
});

export const motherNameState = atom<string>({
  key: 'form/motherNameState',
  default: '',
});

export const nationalityState = atom<string>({
  key: 'form/nationalityState',
  default: '',
});

export const emailState = atom<string>({
  key: 'form/emailState',
  default: '',
});

export const phoneNumberState = atom<string>({
  key: 'form/phoneNumberState',
  default: '',
});

export const batchState = atom<BatchType>({
  key: 'form/batchState',
  default: BatchType.BATCH_1_2024_O_24,
});

export const courseIdState = atom<string>({
  key: 'form/courseIdState',
  default: '',
});

export const paymentAmountState = atom<number>({
  key: 'form/paymentAmountState',
  default: 500,
});

export const permanentAddressState = atom<Address>({
  key: 'form/permanentAddressState',
  default: initialFormState.permanentAddress,
});

export const correspondenceAddressState = atom<Address>({
  key: 'form/correspondenceAddressState',
  default: initialFormState.correspondenceAddress,
});

export const fileUploadState = atom<{
  file: File | null;
  error: string | null;
}>({
  key: 'form/fileUploadState',
  default: { file: null, error: null },
});

export const submissionState = atom<{
  isSubmitting: boolean;
  error: string | null;
  applicationNumber: string | null;
}>({
  key: 'form/submissionState',
  default: { isSubmitting: false, error: null, applicationNumber: null },
});

export const sameAsPermanentState = atom<boolean>({
  key: 'form/sameAsPermanentState',
  default: false,
});
