import { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { AdmissionFormData, admissionFormState } from '@/store/atoms/formDataAtoms';
import RegisterStudentForm from '@/components/RegisterStudentForm';
import EducationQualificationForm from '@/components/EducationQualificationForm';
import SubjectForm from '@/components/SubjectForm';
import { Button } from "@/components/ui/button";
import { toast } from '@/hooks/use-toast';
import axios from 'axios';
import { admissionRegistrationUrl } from '@/Config';

type FormType = 'student' | 'EducationalQualification' | 'Subjects';

const RegisterPage = () => {
  const [activeForm, setActiveForm] = useState<FormType>('student');
  const formData = useRecoilValue(admissionFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [canProceed, setCanProceed] = useState(false);

  // Validation functions remain the same...

  console.log(formData);  
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
      formData[field as keyof AdmissionFormData] && String(formData[field as keyof AdmissionFormData]).trim() !== ''
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
    if (formData.educationalQualifications.length === 0) {
      return false;
    }

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

  const validateAllForms = (): boolean => {
    return validateStudentForm() && 
           validateEducationalQualifications() && 
           validateSubjects();
  };

  const handleNext = () => {
    if (activeForm === 'student' && validateStudentForm()) {
      setActiveForm('EducationalQualification');
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

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    
    if (!validateAllForms()) {
      toast({
        title: "Incomplete Form",
        description: "Please fill all required fields before submitting",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const data = new FormData();

      // Add the photo
      if (formData.studentPhoto) {
        data.append('image', formData.studentPhoto);
      } else {
        alert("Missing Photo");
        setIsSubmitting(false);
        return;
      }

      // Create submission data with proper lastPassedExam format
      const submissionData = {
        ...formData,
        lastPassedExam: formData.lastPassedExam.length > 0 ? formData.lastPassedExam[0] : null,
        dob: formData.dob.split('T')[0]
      };

      // Add all form fields directly
      Object.entries(submissionData).forEach(([key, value]) => {
        if (key === 'studentPhoto') return;

        // Skip null values
        if (value === null) return;

        if (typeof value === 'object') {
          data.append(key, JSON.stringify(value));
        } else {
          data.append(key, String(value));
        }
      });

      const token = localStorage.getItem('token');
      if (!token) {
        alert("Authentication Error");
        setIsSubmitting(false);
        return;
      }

      console.log('Submitting form data:', Object.fromEntries(data.entries()));

      const response = await axios.post(admissionRegistrationUrl, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        },
      });

      if (response.data) {
        toast({
          title: "Success",
          description: "Your application has been submitted successfully",
        });
      }
      
    } catch (error: any) {
      console.error('Submission error:', error);
      if (error.response?.status === 401) {
        toast({
          title: "Authentication Error",
          description: "Please login again to continue",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to submit application. Please try again.",
          variant: "destructive",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const isFormValid = validateStudentForm();
    setCanProceed(isFormValid);
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
            disabled={!validateAllForms() || isSubmitting}
            className="bg-green-600 hover:bg-green-700"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Application'}
          </Button>
        )}
      </div>
    </div>
  );
};

export default RegisterPage;