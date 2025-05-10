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
    paymentAmount: 500,
    studentPhoto: null,
};
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
export const categoryState = atom<StudentCategory>({
    key: 'form/categoryState',
    default: StudentCategory.GENERAL,
});
export const fatherNameState = atom<string>({
    key: 'form/fatherNameState',
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

// export const staticDataAtoms = {
//     coursesAtom: atom<Course[]>({
//         key: 'staticData/coursesAtom',
//         default: []
//     }),

//     subjectsAtom: atom<Array<Subject>>({
//         key: 'staticData/subjectsAtom',
//         default: [],
//     }),

//     institutesAtom: atom<Array<{ id: string; name: string }>>({
//         key: 'staticData/institutesAtom',
//         default: [],
//     }),
// }; 