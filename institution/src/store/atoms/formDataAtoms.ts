import { atom } from 'recoil';

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
  BATCH_1_2024_O_24 = "BATCH_1_2024_O_24",
  BATCH_2_2024_M_25 = "BATCH_2_2024_M_25",
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

// Types matching your Joi schema
export interface Address {
  address: string;
  city: string;
  district: string;
  state: IndianState;
  country: Country;
  pincode: string;
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

// Main form data interface
export interface AdmissionFormData {
  name: string;
  category: StudentCategory;
  dob: string; // Will store as string and convert to Date when sending to backend
  gender: Gender;
  fatherName: string;
  motherName: string;
  instituteId?: string;
  nationality: string;
  email: string;
  phoneNumber: string;
  batch: BatchType;
  subjectIds: string[]; // This will now hold subject IDs
  studentPhoto?: File | null; // For file upload
  admissionType: AdmissionType;
  courseId: string;
  paymentAmount: number;
  permanentAddress: Address;
  correspondenceAddress: Address;
  educationalQualifications: EducationalQualification[];
  lastPassedExam: LastPassedExam[]; // Optional based on admissionType
}

// Initial state
const initialFormState: AdmissionFormData = {
  admissionType: AdmissionType.FRESH,
  name: '',
  dob: '',
  fatherName: '',
  motherName: '',
  category: StudentCategory.GENERAL,
  gender: Gender.MALE,
  nationality: '',
  courseId: 'dummy-course-id', // Dummy data for courseId
  batch: BatchType.BATCH_1_2024_O_24,
  subjectIds: [], // Initialize with empty array for subject IDs
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
  educationalQualifications: [], // This will be updated from the EducationalQualificationForm component
  paymentAmount: 0,
  studentPhoto: null,
};



// Form state atom
export const admissionFormState = atom<AdmissionFormData>({
  key: 'admissionFormState',
  default: initialFormState,
});

//lastexam passes

// This is an array of subjects in which these details will be added

export const lastPassedExamState = atom<LastPassedExam[]>({
  key: 'lastPassedExamState',
  default: [],
});

export const subjectsAtom = atom<Array<{ id: string; name: string }>>({
  key: 'subjectsAtom',
  default: [], // Now holds an array of subject objects with IDs
});

// Educational qualifications atom
export const educationalQualificationsState = atom<EducationalQualification[]>({
  key: 'educationalQualificationsState',
  default: [],
});

// Individual state atoms for each detail
export const nameState = atom<string>({
  key: 'nameState',
  default: '',
});

export const categoryState = atom<StudentCategory>({
  key: 'categoryState',
  default: StudentCategory.GENERAL,
});

export const dobState = atom<string>({
  key: 'dobState',
  default: '',
});

export const genderState = atom<Gender>({
  key: 'genderState',
  default: Gender.MALE,
});

export const fatherNameState = atom<string>({
  key: 'fatherNameState',
  default: '',
});

export const motherNameState = atom<string>({
  key: 'motherNameState',
  default: '',
});

export const nationalityState = atom<string>({
  key: 'nationalityState',
  default: '',
});

export const emailState = atom<string>({
  key: 'emailState',
  default: '',
});

export const phoneNumberState = atom<string>({
  key: 'phoneNumberState',
  default: '',
});

export const batchState = atom<BatchType>({
  key: 'batchState',
  default: BatchType.BATCH_1_2024_O_24,
});

export const courseIdState = atom<string>({
  key: 'courseIdState',
  default: 'dummy-course-id',
});

export const paymentAmountState = atom<number>({
  key: 'paymentAmountState',
  default: 0,
});

export const permanentAddressState = atom<Address>({
  key: 'permanentAddressState',
  default: {
    address: '',
    city: '',
    district: '',
    state: IndianState.ANDHRA_PRADESH,
    country: Country.INDIA,
    pincode: '',
  },
});

export const correspondenceAddressState = atom<Address>({
  key: 'correspondenceAddressState',
  default: {
    address: '',
    city: '',
    district: '',
    state: IndianState.ANDHRA_PRADESH,
    country: Country.INDIA,
    pincode: '',
  },
});

// File upload state
export const fileUploadState = atom<{
  file: File | null;
  error: string | null;
}>({
  key: 'fileUploadState',
  default: {
    file: null,
    error: null,
  },
});

// Form submission state
export const submissionState = atom<{
  isSubmitting: boolean;
  error: string | null;
  applicationNumber: string | null;
}>({
  key: 'submissionState',
  default: {
    isSubmitting: false,
    error: null,
    applicationNumber: null,
  },
});

// Helper atoms for address copying
export const sameAsPermanentState = atom<boolean>({
  key: 'sameAsPermanentState',
  default: false,
});

// Static data atoms
export const staticDataAtoms = {
  coursesAtom: atom<Array<{ id: string; name: string }>>({
    key: 'coursesAtom',
    default: [
      { id: 'course-1', name: 'Course 1' },
      { id: 'course-2', name: 'Course 2' },
      { id: 'course-3', name: 'Course 3' },
    ], // Dummy data for courses
  }),
  subjectsAtom: atom<Array<{ id: string; name: string }>>({
    key: 'subjectsAtom',
    default: [
      { id: 'subject-1', name: 'Mathematics' },
      { id: 'subject-2', name: 'Physics' },
      { id: 'subject-3', name: 'Chemistry' },
      { id: 'subject-4', name: 'Biology' },
      { id: 'subject-5', name: 'English' },
    ], // Dummy data for subjects
  }),
  institutesAtom: atom<Array<{ id: string; name: string }>>({
    key: 'institutesAtom',
    default: [
      { id: 'institute-1', name: 'Institute of Technology' },
      { id: 'institute-2', name: 'School of Science' },
      { id: 'institute-3', name: 'College of Arts' },
    ], // Dummy data for institutes
  }),
};