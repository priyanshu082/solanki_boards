import { atom, selector } from 'recoil';
import axios from 'axios';
import { instituteDetailsUrl } from '@/Config';

// Enums matching your Prisma schema
export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  OTHER = 'OTHER'
}

export enum Country {
  INDIA = 'INDIA'
}

export enum PaymentStatus {
  PENDING = 'PENDING',
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED'
}

export enum InstituteDocumentType {
  LOGO = 'LOGO',
  REGISTRATION_CERTIFICATE = 'REGISTRATION_CERTIFICATE',
  AFFILIATION_CERTIFICATE = 'AFFILIATION_CERTIFICATE',
  OTHER = 'OTHER'
}

// Types matching Prisma schema
export interface InstituteDocument {
  id: string;
  instituteId: string;
  documentType: InstituteDocumentType;
  fileName: string;
  fileUrl: string;
  createdAt: Date;
  updatedAt: Date;
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
  headState?: string;
  headUnionTerritory?: string;
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
  centerState?: string;
  centerUnionTerritory?: string;
  centerCountry: Country;
  centerPincode: string;
  paymentStatus: PaymentStatus;
  createdAt: Date;
  updatedAt: Date;
  documents: InstituteDocument[];
}

// Atom for institute details
export const instituteState = atom<InstituteDetails | null>({
  key: 'instituteState',
  default: null
});

// Selector to fetch institute details
export const instituteDetailsSelector = selector({
  key: 'instituteDetailsSelector',
  get: async () => {
    try {
      const token = localStorage.getItem('token');
      const instituteId = localStorage.getItem('id');

      if (!token || !instituteId) {
        throw new Error('Authentication required');
      }

      const response = await axios.get(`${instituteDetailsUrl}/${instituteId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch institute details');
    }
  },
  set: ({ set }, newValue) => {
    set(instituteState, newValue);
  }
});

// Useful selectors for specific data
export const instituteDocumentsSelector = selector({
  key: 'instituteDocumentsSelector',
  get: ({ get }) => {
    const institute = get(instituteState);
    return institute?.documents || [];
  }
});

export const instituteProfileSelector = selector({
  key: 'instituteProfileSelector',
  get: ({ get }) => {
    const institute = get(instituteState);
    return {
      headName: institute?.headName,
      headProfileImage: institute?.headProfileImage,
      centerName: institute?.centerName,
      centerCode: institute?.centerCode,
      centerAddress: institute?.centerAddress,
      paymentStatus: institute?.paymentStatus
    };
  }
});

export const instituteBankDetailsSelector = selector({
  key: 'instituteBankDetailsSelector',
  get: ({ get }) => {
    const institute = get(instituteState);
    return {
      bankName: institute?.headBankName,
      accountNumber: institute?.headAccountNumber,
      ifscCode: institute?.headIfscCode
    };
  }
});

export const instituteContactDetailsSelector = selector({
  key: 'instituteContactDetailsSelector',
  get: ({ get }) => {
    const institute = get(instituteState);
    return {
      email: institute?.centerEmailId,
      phone: institute?.centerPhoneNumber,
      website: institute?.centerWebsiteUrl
    };
  }
}); 