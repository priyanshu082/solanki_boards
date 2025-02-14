export interface Course {
    id: string;
    name: string;
    institution: string;
    duration: string;
    mode: string;
    totalSemesters: number;
    annualFee: number;
    eligibility: string;
    overview: string;
    features: string[];
    featureDescriptions: Record<string, string>;
    careerProspects: string[];
    curriculum: {
      firstYear: {
        year: number;
        subjects: { code: string; name: string; maxMarks: number }[];
      };
      secondYear: {
        year: number;
        subjects: { code: string; name: string; maxMarks: number }[];
      };
      thirdYear: {
        year: number;
        subjects: { code: string; name: string; maxMarks: number }[];
      };
    };
    disclaimer: string;
}