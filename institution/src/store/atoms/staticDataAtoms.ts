import { atom } from 'recoil';

// Static data atoms
export const staticDataAtoms = {
  coursesAtom: atom<Array<{ id: string; name: string }>>({
    key: 'staticData/coursesAtom', // Add namespace to make key unique
    default: [
      { id: 'course-1', name: 'Course 1' },
      { id: 'course-2', name: 'Course 2' },
      { id: 'course-3', name: 'Course 3' },
    ],
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