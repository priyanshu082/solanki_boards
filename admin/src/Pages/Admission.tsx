import { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import type { JSX } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AdmissionFormData, admissionFormState, AdmissionType } from '@/Atoms/FormDataAtoms';
import { createadmission } from '@/Config';
import RegisterStudentForm from '@/components/RegisterStudentForm';
import EducationalQualificationForm from '@/components/EducationalQualification';
import SubjectForm from '@/components/SubjectForm';
type FormType = 'student' | 'EducationalQualification' | 'Subjects';
import { Button } from '@/components/ui/button';

const Admission = () => {
    const [activeForm, setActiveForm] = useState<FormType>('student');
    const formData = useRecoilValue(admissionFormState);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [canProceed, setCanProceed] = useState(false);
    const navigate = useNavigate();
    const [isDeclarationComplete, setIsDeclarationComplete] = useState(false);

    // Validation functions remain the same...
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
            return true;
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

    const validateLastPassedExam = (): boolean => {
        if (formData.admissionType === AdmissionType.FRESH) {
            return true; // Not required for fresh admission
        }

        if (formData.lastPassedExam.length === 0) {
            return false;
        }

        const exam = formData.lastPassedExam[0];
        return Boolean(exam.subject) &&
            Boolean(exam.subjectType) &&
            exam.practicalMarks >= 0 &&
            exam.assignmentMarks >= 0 &&
            exam.theoryMarks >= 0 &&
            exam.obtainedMarks >= 0 &&
            exam.maximumMarks > 0;
    };

    const validateAllForms = (): boolean => {
        return validateStudentForm() &&
            validateEducationalQualifications() &&
            validateSubjects() &&
            validateLastPassedExam();
    };

    const handleNext = () => {
        if (activeForm === 'student' && validateStudentForm()) {
            setActiveForm('EducationalQualification');
        } else if (activeForm === 'EducationalQualification' && validateEducationalQualifications()) {
            setActiveForm('Subjects');
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Incomplete Form',
                text: 'Please fill all required fields before proceeding',
                confirmButtonColor: '#3085d6'
            });
        }
    };

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (isSubmitting) return;

        if (!validateAllForms()) {
            Swal.fire({
                icon: 'error',
                title: 'Incomplete Form',
                text: 'Please fill all required fields before submitting',
                confirmButtonColor: '#3085d6'
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
                Swal.fire({
                    icon: 'error',
                    title: 'Missing Photo',
                    text: 'Please upload a student photo and try again',
                    confirmButtonColor: '#3085d6'
                });
                setIsSubmitting(false);
                return;
            }

            // Create submission data with proper lastPassedExam format
            const submissionData = {
                ...formData,
                lastPassedExam: formData.lastPassedExam.length > 0 ? formData.lastPassedExam[0] : null,
                dob: formData.dob.split('T')[0],
            };

            // Add all form fields directly
            Object.entries(submissionData).forEach(([key, value]) => {
                if (key === 'studentPhoto') return;
                if (value === null) return;
                if (typeof value === 'object') {
                    data.append(key, JSON.stringify(value));
                } else {
                    data.append(key, String(value));
                }
            });

            const response = await axios.post(createadmission, data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.data) {
                Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: 'Your application has been submitted successfully. Please check your email for further instructions.',
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'OK'
                }).then((result) => {
                    if (result.isConfirmed) {
                        navigate('/');
                    }
                });
            }
        } catch (error: unknown) {
            console.error('Submission error:', error);
            if (
                typeof error === 'object' &&
                error !== null &&
                'response' in error &&
                (error as { response?: { status?: number } }).response?.status === 401
            ) {
                Swal.fire({
                    icon: 'error',
                    title: 'Authentication Error',
                    text: 'Please login again to continue',
                    confirmButtonColor: '#3085d6'
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error Creating Student Profile',
                    text:
                        typeof error === 'object' &&
                            error !== null &&
                            'response' in error &&
                            (error as { response?: { data?: { message?: string } } }).response?.data?.message
                            ? (error as { response?: { data?: { message?: string } } }).response!.data!.message!
                            : 'Failed to submit application. Please try again.',
                    confirmButtonColor: '#3085d6',
                    showCancelButton: true,
                    confirmButtonText: 'Try Again',
                    cancelButtonText: 'Cancel'
                }).then((result) => {
                    if (result.isConfirmed) {
                        handleSubmit(e);
                    }
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
        EducationalQualification: <EducationalQualificationForm />,
        Subjects: <SubjectForm setIsDeclarationComplete={setIsDeclarationComplete} />
    };

    return (
        <div className=" mx-auto p-6 bg-white shadow-md rounded-lg">
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
                        disabled={!validateAllForms() || isSubmitting || !isDeclarationComplete}
                        className="bg-green-600 hover:bg-green-700"
                    >
                        {isSubmitting ? 'Submitting...' : 'Submit Application'}
                    </Button>
                )}
            </div>
        </div>
    );
};

export default Admission;
