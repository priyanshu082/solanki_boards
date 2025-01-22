import { useState } from 'react'
import RegisterStudentForm from '@/components/RegisterStudentForm'
import { Button } from "@/components/ui/button"
import EducationQualificationForm from '@/components/EducationQualificationForm'

type FormType = 'student' | 'EducationalQualification' | 'Subjects' 

const RegisterPage = () => {
  const [activeForm, setActiveForm] = useState<FormType>('student')

  const AdminForm = () => <div>Admin Registration Form</div>;

  const forms: Record<FormType, JSX.Element> = {
    student: <RegisterStudentForm />,
    EducationalQualification: <EducationQualificationForm />,
    Subjects: <AdminForm />
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
        >
          EducationalQualification
        </Button>
        <Button
          variant={activeForm === 'Subjects' ? 'default' : 'outline'}
          onClick={() => setActiveForm('Subjects')}
        >
          Subjects
        </Button>
      </div>
          {forms[activeForm]}
    </div>
  );
};

export default RegisterPage;