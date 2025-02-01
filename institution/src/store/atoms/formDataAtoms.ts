// atoms.ts
import { atom, selector } from 'recoil';
import axios from 'axios';

export interface FormData {
  center: string;
  admissionType: string;
  session: string;
  course: string;
  mediumOfInstruction: string;
  name: string;
  fatherName: string;
  motherName: string;
  gender: string;
  dateOfBirth: string;
  contactNumber: string;
  email: string;
  adhaarNumber: string;
  category: string;
  permanentAddress: string;
  country: string;
  state: string;
  city: string;
  pincode: string;
  sameAsPermenant: boolean;
  corrAddress: string;
  corrCountry: string;
  corrState: string;
  corrCity: string;
  corrPincode: string;
}

// Form Data Atom
export const formDataState = atom<FormData>({
  key: 'formDataState',
  default: {
    center: '',
    admissionType: '',
    session: '',
    course: '',
    mediumOfInstruction: '',
    name: '',
    fatherName: '',
    motherName: '',
    gender: '',
    dateOfBirth: '',
    contactNumber: '',
    email: '',
    adhaarNumber: '',
    category: '',
    permanentAddress: '',
    country: '',
    state: '',
    city: '',
    pincode: '',
    sameAsPermenant: false,
    corrAddress: '',
    corrCountry: '',
    corrState: '',
    corrCity: '',
    corrPincode: '',
  },
});

// Dynamic Data Atoms
export const centersState = atom<string[]>({
  key: 'centersState',
  default: [],
});

export const coursesState = atom<string[]>({
  key: 'coursesState',
  default: [],
});

export const countriesState = atom<string[]>({
  key: 'countriesState',
  default: [],
});

export const statesState = atom<string[]>({
  key: 'statesState',
  default: [],
});

export const citiesState = atom<string[]>({
  key: 'citiesState',
  default: [],
});

// Static Data Atoms
export const admissionTypesState = atom({
  key: 'admissionTypesState',
  default: ["Regular", "Management", "NRI"],
});

export const sessionsState = atom({
  key: 'sessionsState',
  default: ["2024-25", "2025-26"],
});

export const mediumsState = atom({
  key: 'mediumsState',
  default: ["English", "Hindi"],
});

export const gendersState = atom({
  key: 'gendersState',
  default: ["Male", "Female", "Other"],
});

export const categoriesState = atom({
  key: 'categoriesState',
  default: ["General", "OBC", "SC", "ST"],
});

// API Integration
export const fetchCenters = selector({
  key: 'fetchCenters',
  get: async () => {
    try {
      const response = await axios.get('your-api-endpoint/centers');
      return response.data;
    } catch (error) {
      throw error;
    }
  },
});

export const fetchCourses = selector({
  key: 'fetchCourses',
  get: async () => {
    try {
      const response = await axios.get('your-api-endpoint/courses');
      return response.data;
    } catch (error) {
      throw error;
    }
  },
});

export const fetchCountries = selector({
  key: 'fetchCountries',
  get: async () => {
    try {
      const response = await axios.get('your-api-endpoint/countries');
      return response.data;
    } catch (error) {
      throw error;
    }
  },
});

export const fetchStates = selector({
  key: 'fetchStates',
  get: async ({get}) => {
    const selectedCountry = get(formDataState).country;
    if (!selectedCountry) return [];
    
    try {
      const response = await axios.get(`your-api-endpoint/states/${selectedCountry}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
});

export const fetchCities = selector({
  key: 'fetchCities',
  get: async ({get}) => {
    const selectedState = get(formDataState).state;
    if (!selectedState) return [];
    
    try {
      const response = await axios.get(`your-api-endpoint/cities/${selectedState}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
});