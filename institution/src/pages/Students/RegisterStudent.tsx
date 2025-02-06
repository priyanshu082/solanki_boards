import { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { AdmissionFormData, admissionFormState } from '@/store/atoms/formDataAtoms';
import RegisterStudentForm from '@/components/RegisterStudentForm';
import EducationQualificationForm from '@/components/EducationQualificationForm';
import SubjectForm from '@/components/SubjectForm';
import { Button } from "@/components/ui/button";
import { toast } from '@/hooks/use-toast';

type FormType = 'student' | 'EducationalQualification' | 'Subjects';

const RegisterPage = () => {
  const [activeForm, setActiveForm] = useState<FormType>('student');
  const formData = useRecoilValue(admissionFormState);
  const [canProceed, setCanProceed] = useState(false);

  // Log the state of Recoil
  console.log('Recoil State:', formData);

  const validateStudentForm = (): boolean => {
    const requiredFields = [
      'name',
      'category',
      'dob',
      'gender',
      'fatherName',
      'motherName',
      'nationality',
      'email',
      'phoneNumber',
      'batch',
      'admissionType',
      'courseId',
      'studentPhoto'
    ] as const;
  
    const addressFields = ['address', 'city', 'district', 'state', 'pincode'] as const;
    
    type AddressKey = typeof addressFields[number];
  
    const hasBasicFields = requiredFields.every(field => 
      formData[field as keyof AdmissionFormData] && String(formData[field as keyof AdmissionFormData ]).trim() !== ''
    );
  
    const hasValidAddresses = addressFields.every((field: AddressKey) => 
      formData.permanentAddress[field as keyof typeof formData.permanentAddress] && 
      formData.correspondenceAddress[field as keyof typeof formData.correspondenceAddress] && 
      String(formData.permanentAddress[field as keyof typeof formData.permanentAddress]).trim() !== '' &&
      String(formData.correspondenceAddress[field as keyof typeof formData.correspondenceAddress]).trim() !== ''
    );
  
    return hasBasicFields && hasValidAddresses;
  };

  const validateEducationalQualifications = (): boolean => {
    // Check if there are any educational qualifications
    if (formData.educationalQualifications.length === 0) {
      return false; // No qualifications present
    }

    // Validate each qualification
    return formData.educationalQualifications.every(qual => {
      const hasExamination = Boolean(qual.examination);
      const hasSubjects = Boolean(qual.subjects);
      const hasYearOfPassing = Boolean(qual.yearOfPassing);
      const hasPercentage = typeof qual.percentage === 'number' && !isNaN(qual.percentage);
      

      return hasExamination && hasSubjects && hasYearOfPassing && hasPercentage;
    });
  };

  const validateSubjects = (): boolean => {
    return formData.subjectIds.length > 0;
  };

  const handleNext = () => {
    if (activeForm === 'student' && validateStudentForm()) {
      setActiveForm('EducationalQualification'); // Allow transition to Educational Qualification first
    } else if (activeForm === 'EducationalQualification' && validateEducationalQualifications()) {
      setActiveForm('Subjects');
    } else {
      toast({
        title: "Incomplete Form",
        description: "Please fill all required fields before proceeding",
        variant: "destructive",
      });
    }
  };

  const handleSubmit = async () => {
    if (!validateStudentForm() || !validateEducationalQualifications() || !validateSubjects()) {
      toast({
        title: "Incomplete Application",
        description: "Please ensure all sections are completed",
        variant: "destructive",
      });
      return;
    }

    const submissionData = {
      ...formData,
      studentPhoto: formData.studentPhoto,
    };

    try {
      const response = await fetch('/api/admission/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      });

      if (!response.ok) {
        throw new Error('Submission failed');
      }

      toast({
        title: "Success",
        description: "Your application has been submitted successfully",
      });
      
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit application. Please try again.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    const isFormValid = validateStudentForm();
    setCanProceed(isFormValid); // Allow proceeding regardless of active form
  }, [formData, activeForm]);

  const forms: Record<FormType, JSX.Element> = {
    student: <RegisterStudentForm />,
    EducationalQualification: <EducationQualificationForm />,
    Subjects: <SubjectForm />
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">
        Registration Portal
      </h1>

      <div className="flex gap-2 mb-4">
        <Button
          variant={activeForm === 'student' ? 'default' : 'outline'}
          onClick={() => setActiveForm('student')}
        >
          Student
        </Button>
        <Button
          variant={activeForm === 'EducationalQualification' ? 'default' : 'outline'}
          onClick={() => setActiveForm('EducationalQualification')}
          disabled={!canProceed}
        >
          Educational Qualification
        </Button>
        <Button
          variant={activeForm === 'Subjects' ? 'default' : 'outline'}
          onClick={() => setActiveForm('Subjects')}
          disabled={!canProceed}
        >
          Subjects
        </Button>
      </div>

      {forms[activeForm]}

      <div className="mt-6 flex justify-end gap-4">
        {activeForm !== 'Subjects' ? (
          <Button 
            onClick={handleNext}
            disabled={!canProceed}
          >
            Next
          </Button>
        ) : (
          <Button 
            onClick={handleSubmit}
            disabled={!canProceed}
            className="bg-green-600 hover:bg-green-700"
          >
            Submit Application
          </Button>
        )}
      </div>
    </div>
  );
};

export default RegisterPage;