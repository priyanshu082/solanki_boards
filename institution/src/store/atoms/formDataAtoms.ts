import { Address, AdmissionType, BatchType, Country, EducationalQualification, Gender, IndianState, LastPassedExam, StudentCategory } from '@/lib/Interfaces';
import { AdmissionFormData } from '@/lib/Interfaces';
import { atom } from 'recoil';


const initialFormState: AdmissionFormData = {
  admissionType: AdmissionType.FRESH,
  name: '',
  dob: '',
  fatherName: '',
  motherName: '',
  instituteId: '',
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
  paymentAmount: 0,
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
  default: 'dummy-course-id',
});

export const paymentAmountState = atom<number>({
  key: 'form/paymentAmountState',
  default: 0,
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
