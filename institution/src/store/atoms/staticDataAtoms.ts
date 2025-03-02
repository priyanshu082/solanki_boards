import { atom, selector } from 'recoil';
import axios from 'axios';
// import { BASE_URL } from '../../data/config';

export enum CourseType {
  ACADEMIC = "ACADEMIC",
  DIPLOMA = "DIPLOMA",
  CERTIFICATE = "CERTIFICATE",
  DEGREE = "DEGREE",
  POST_GRADUATE = "POST_GRADUATE",
  PHD = "PHD"
}

enum SubjectType {
  LANGUAGE = "LANGUAGE",
  NON_LANGUAGE = "NON_LANGUAGE",
  VOCATIONAL = "VOCATIONAL"
}

export interface Course {
  id: string;
  name: string;
  code?: string;
  fees?: number;
  courseType: CourseType;
  createdAt: string;
  updatedAt: string;
  subjects: Subject[];
}

export interface Subject {
  id: string;
  name: string;
  code: string;
  fees?: number;
  type: SubjectType;
  courseId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Institute {
  id: string;
  name: string;
}


// Dummy data for development
const dummyCourses: Course[] = [
  {
    id: "c1",
    name: "Bachelor of Science",
    code: "BSC",
    fees: 50000,
    courseType: CourseType.DEGREE,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    subjects: [
      {
        id: "s1",
        name: "Physics",
        code: "PHY101",
        fees: 5000,
        type: SubjectType.NON_LANGUAGE,
        courseId: "c1",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: "s2",
        name: "Chemistry",
        code: "CHM101",
        fees: 5000,
        type: SubjectType.NON_LANGUAGE,
        courseId: "c1",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: "s3",
        name: "Mathematics",
        code: "MTH101",
        fees: 4500,
        type: SubjectType.NON_LANGUAGE,
        courseId: "c1",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
    ]
  },
  {
    id: "c2",
    name: "Bachelor of Arts",
    code: "BA",
    fees: 45000,
    courseType: CourseType.DEGREE,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    subjects: [
      {
        id: "s4",
        name: "English Literature",
        code: "ENG101",
        fees: 4000,
        type: SubjectType.LANGUAGE,
        courseId: "c2",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: "s5",
        name: "History",
        code: "HIS101",
        fees: 4000,
        type: SubjectType.NON_LANGUAGE,
        courseId: "c2",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
    ]
  }
];

const dummyInstitutes: Institute[] = [
  {
    id: "i1",
    name: "National Institute of Technology"
  },
  {
    id: "i2",
    name: "Delhi University"
  },
  {
    id: "i3",
    name: "Mumbai University"
  }
];

// Export the default courses
export const DEFAULT_COURSES: Course[] = [
  // Your default courses array
];

// Static data atoms
export const staticDataAtoms = {
  coursesAtom: atom<Course[]>({
    key: 'staticData/coursesAtom',
    default: DEFAULT_COURSES,
  }),
  
  selectedCourseAtom: atom<Course | null>({
    key: 'staticData/selectedCourseAtom',
    default: null,
  }),
  
  institutesAtom: atom<Institute[]>({
    key: 'staticData/institutesAtom',
    default: dummyInstitutes, // Using dummy data as default
  }),

  // Selectors to fetch data - commented out for now, using dummy data instead
  coursesSelector: selector({
    key: 'staticData/coursesSelector',
    get: async () => {
      // Using dummy data directly
      return dummyCourses;
      
      /* Commented out API call
      try {
        const response = await axios.get(`${API_URL}/courses`);
        return response.data;
      } catch (error) {
        console.error('Failed to fetch courses:', error);
        return [];
      }
      */
    },
    set: ({ set }, newValue) => {
      set(staticDataAtoms.coursesAtom, newValue as Course[]);
    }
  }),

  institutesSelector: selector({
    key: 'staticData/institutesSelector',
    get: async () => {
      // Using dummy data directly
      return dummyInstitutes;
      
      /* Commented out API call
      try {
        const response = await axios.get(`${API_URL}/institutes`);
        return response.data;
      } catch (error) {
        console.error('Failed to fetch institutes:', error);
        return [];
      }
      */
    },
    set: ({ set }, newValue) => {
      set(staticDataAtoms.institutesAtom, newValue as Institute[]);
    }
  }),
}; 