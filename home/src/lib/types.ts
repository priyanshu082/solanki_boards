export interface UGCourse {
    image: string;
    id: string;
    name: string;
    institution: string;
    duration: string | { minimum: string; maximum: string };
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

export interface PGCourse {
   
    id: string;
    programInfo: {
        name: string;
        institution: string;
        duration: string | { minimum: string; maximum: string };
        mode: string;
        annualFee: number;
        eligibility: string;
    };
    programObjectives: string[];
    curriculum: {
        firstYear: {
            courseCode: string;
            subjectName: string;
            credits: number;
        }[];
        secondYear: {
            courseCode: string;
            subjectName: string;
            credits: number;
        }[];
        thirdYear: {
            courseCode: string;
            subjectName: string;
            credits: number;
        }[];
        fourthYear: {
            courseCode: string;
            subjectName: string;
            credits: number;
        }[];
    };
    electiveSubjects: {
        [key: string]: {
            subjectName: string;
            subjectCode: string;
        }[];
    };
    learningMethodology: string[];
    assessmentAndEvaluation: {
        assignments: string;
        midSemesterExams: string;
        endSemesterExams: string;
        projectWork: string;
    };
    keyFeatures: string[];
    feeStructure: {
        semester: {
            semester: string;
            tuitionFee: number;
            examinationFee: number;
            totalFee: number;
        }[];
    };
    accreditationAndRecognition: string;
    careerOpportunities: string[];
    contactInformation: {
        website: string;
        email: string;
        phone: string;
    };
}