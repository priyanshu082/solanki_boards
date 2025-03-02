import { atom } from 'recoil';

// Add CourseType enum
export enum CourseType {
  ACADEMIC = "ACADEMIC",
  DIPLOMA = "DIPLOMA",
  CERTIFICATE = "CERTIFICATE",
  DEGREE = "DEGREE",
  POST_GRADUATE = "POST_GRADUATE",
  PHD = "PHD"
}

// Add interfaces for Course and Subject
export interface Subject {
  id: string;
  name: string;
  code: string;
  fees?: number;
  type: string;
  courseId: string;
}

export interface Course {
  id: string;
  name: string;
  code?: string;
  fees?: number;
  courseType: CourseType;
  subjects: Subject[];
}

// Static data atoms
export const staticDataAtoms = {
  coursesAtom: atom<Course[]>({
    key: 'staticData/coursesAtom',
    default: [
      {
        id: 'course-1',
        name: 'Bachelor of Science',
        code: 'BSC',
        fees: 50000,
        courseType: CourseType.DEGREE,
        subjects: [
          { id: 'subject-1', name: 'Mathematics', code: 'MATH101', courseId: 'course-1', type: 'CORE' },
          { id: 'subject-2', name: 'Physics', code: 'PHY101', courseId: 'course-1', type: 'CORE' },
          { id: 'subject-3', name: 'Chemistry', code: 'CHEM101', courseId: 'course-1', type: 'CORE' }
        ]
      },
      {
        id: 'course-2',
        name: 'Diploma in Computer Science',
        code: 'DCS',
        fees: 30000,
        courseType: CourseType.DIPLOMA,
        subjects: [
          { id: 'subject-4', name: 'Programming', code: 'CS101', courseId: 'course-2', type: 'CORE' },
          { id: 'subject-5', name: 'Database Systems', code: 'CS102', courseId: 'course-2', type: 'CORE' }
        ]
      }
    ]
  }),
  
  subjectsAtom: atom<Array<{ id: string; name: string }>>({
    key: 'staticData/subjectsAtom',
    default: [
      { id: 'subject-1', name: 'Mathematics' },
      { id: 'subject-2', name: 'Physics' },
      { id: 'subject-3', name: 'Chemistry' },
      { id: 'subject-4', name: 'Biology' },
      { id: 'subject-5', name: 'English' },
    ],
  }),
  
  institutesAtom: atom<Array<{ id: string; name: string }>>({
    key: 'staticData/institutesAtom',
    default: [
      { id: 'institute-1', name: 'Institute of Technology' },
      { id: 'institute-2', name: 'School of Science' },
      { id: 'institute-3', name: 'College of Arts' },
    ],
  }),
}; 