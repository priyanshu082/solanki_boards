import React, { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import {
  admissionFormState,
  AdmissionType,
  StudentCategory,
  Gender,
  BatchType,
  IndianState,
  // Country,
  sameAsPermanentState,
  LastPassedExam,
  SubjectType,
  staticDataAtoms,
  lastPassedExamState // Import the lastPassedExamState atom
} from '../Atoms/FormDataAtoms';
import { CourseType } from '../Atoms/staticDataAtoms';

import dummyAvatar from '../assets/images/dummy.jpeg'; // Updated import for dummy image
import Swal from 'sweetalert2'; // Import SweetAlert

import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../components/ui/select';
import { Checkbox } from '../components/ui/checkbox';
import { Button } from '../components/ui/button';
import axios from 'axios';
import { fetchAllCoursesUrl } from '../data/config';

// Reusable Form Field Component
const FormField: React.FC<{
  label: string;
  children: React.ReactNode;
  required?: boolean;
  error?: string;
}> = ({ label, children, required = false, error }) => (
  <div className="space-y-2">
    <label className="text-sm font-medium">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    {children}
    {error && <p className="text-sm text-red-500">{error}</p>}
  </div>
);

// Main Registration Form Component
const RegisterStudentForm: React.FC = () => {
  const [formData, setFormData] = useRecoilState(admissionFormState);
  const [sameAddress, setSameAddress] = useRecoilState(sameAsPermanentState);
  //@ts-ignore
  const [avatar, setAvatar] = useState<string | ArrayBuffer | null>(null);
  const [imageFile] = useState<File | null>(null);
  const [lastPassedExams, setLastPassedExams] = useRecoilState(lastPassedExamState); // Use the atom for last passed exams
  const [showLastPassedExamForm, setShowLastPassedExamForm] = useState(false); // State to control visibility of last passed exam form

  const [newSubject, setNewSubject] = useState<LastPassedExam>({
    subjectType: SubjectType.LANGUAGE, // Default value, adjust as necessary
    subject: '',
    practicalMarks: 0,
    assignmentMarks: 0,
    theoryMarks: 0,
    obtainedMarks: 0,
    maximumMarks: 0,
  });

  const handleAddLastPassedExam = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedExams = [...lastPassedExams, newSubject];
    setLastPassedExams(updatedExams);
    setFormData(prev => ({ ...prev, lastPassedExam: updatedExams }));

    // Reset the form
    setNewSubject({
      subjectType: SubjectType.LANGUAGE,
      subject: '',
      practicalMarks: 0,
      assignmentMarks: 0,
      theoryMarks: 0,
      obtainedMarks: 0,
      maximumMarks: 0,
    });
  };

  const [courses, setCoursesList] = useRecoilState(staticDataAtoms.coursesAtom); // Fetching courses from atoms

  useEffect(() => {
    // Set the avatar to the dummy image if no image is uploaded
    if (!imageFile) {
      setAvatar(dummyAvatar);
    }
  }, [imageFile]);

  const admissionTypes = Object.entries(AdmissionType).map(([key, value]) => ({
    id: value.toString(),
    name: key.replace(/_/g, ' ')
  }));

  const coursesTypes = Object.entries(CourseType).map(([key, value]) => ({
    id: value.toString(),
    name: key.replace(/_/g, ' ')
  }));

  const genders = Object.entries(Gender).map(([key, value]) => ({
    id: value.toString(),
    name: key
  }));

  const categories = Object.entries(StudentCategory).map(([key, value]) => ({
    id: value.toString(),
    name: key.replace(/_/g, ' ')
  }));

  const batches = Object.entries(BatchType).map(([key, value]) => ({
    id: value.toString(),
    name: key.replace(/_/g, ' ')
  }));

  const states = Object.entries(IndianState).map(([key, value]) => ({
    id: value.toString(),
    name: key.replace(/_/g, ' ')
  }));

  // const countries = Object.entries(Country).map(([key, value]) => ({
  //   id: value.toString(),
  //   name: key
  // }));

  // Handle form updates
  const updateField = (field: keyof typeof formData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Handle address updates
  const updateAddress = (
    addressType: 'permanentAddress' | 'correspondenceAddress',
    field: keyof typeof formData.permanentAddress,
    value: string
  ) => {
    setFormData(prev => ({
      ...prev,
      [addressType]: {
        ...prev[addressType],
        [field]: value
      }
    }));
  };

  // Handle same address checkbox
  const handleSameAddressCheckbox = (checked: boolean) => {
    setSameAddress(checked);
    if (checked) {
      setFormData(prev => ({
        ...prev,
        correspondenceAddress: { ...prev.permanentAddress }
      }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        Swal.fire({
          title: "Invalid File",
          text: "Please upload an image file",
          icon: "error",
          confirmButtonColor: "#3085d6"
        });
        return;
      }
      // Validate file size (e.g., 5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        Swal.fire({
          title: "File Too Large",
          text: "Please upload an image smaller than 5MB",
          icon: "error",
          confirmButtonColor: "#3085d6"
        });
        return;
      }
      setFormData(prev => ({
        ...prev,
        studentPhoto: file
      }));
    }
  };

  const handleAdmissionTypeChange = (value: string) => {
    updateField('admissionType', value);
    setShowLastPassedExamForm(value === AdmissionType.TOC.toString() || value === AdmissionType.PART_ADMISSION.toString());
  };

  const fetchCoursesByCourseType = async (courseType: CourseType) => {
    try {
      // Replace with your actual API endpoint
      const response = await axios.post(fetchAllCoursesUrl, {
        courseType: courseType
      });

      if (response.status !== 200) {
        throw new Error('Failed to fetch courses');
      }

      const data = response.data;
      setCoursesList(data);

      // Reset selected course when course type changes
      updateField('courseId', '');
    } catch (error) {
      console.error('Error fetching courses:', error);
      Swal.fire({
        title: "Error",
        text: "Failed to fetch courses. Please try again.",
        icon: "error",
        confirmButtonColor: "#3085d6"
      });
      setCoursesList([]);
    }
  };

  const handleCourseTypeChange = (value: CourseType) => {
    fetchCoursesByCourseType(value);
  };

  return (
    <Card className="w-full mx-auto bg-white rounded-lg shadow-md text-primary">
      <CardHeader>
        <CardTitle>Student Admission Form</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='flex flex-col '>
          <div className="py-2 h-fit">
            <div className="flex flex-col sm:flex-row items-center md:items-start gap-6">
              <div className="flex flex-col items-center space-y-4">
                <div className="w-[150px] h-[150px] border-2 border-gray-200 rounded-md overflow-hidden">
                  {formData.studentPhoto ? (
                    <img
                      src={URL.createObjectURL(formData.studentPhoto)}
                      alt="Student Photo"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <p className="text-gray-500">No photo uploaded</p>
                  )}
                </div>
              </div>

              <div className="flex flex-col justify-center">
                <div className='flex flex-col justify-center items-center md:items-start'>
                  <h3 className="text-lg font-normal mb-2">Student Photo</h3>
                  <Button
                    variant="outline"
                    className="bg-blue-500 text-white hover:bg-blue-600 w-fit"
                    onClick={() => document.getElementById('fileInput')?.click()} // Open file dialog on button click
                  >
                    Upload Photo
                  </Button>
                  <Input
                    id="fileInput" // Hidden file input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </div>

                <div className='text-purple-800 font-bold text-sm mt-[4vw] flex flex-col justify-center items-center md:items-start'>
                  NOTE: BOARDS IN THE LIST OF MOE WILL BE ACCEPTED. CHECK YOUR BOARD BEFORE PLACING ADMISSIONS.
                </div>
              </div>
            </div>
          </div>

          <form className="space-y-6">
            {/* Basic Details */}
            <section>
              <h3 className="text-lg font-semibold mb-4">Basic Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                <FormField label="Full Name" required>
                  <Input
                    value={formData.name}
                    onChange={(e) => updateField('name', e.target.value)}
                    placeholder="Enter full name"
                  />
                </FormField>

                <FormField label="Date of Birth" required>
                  <Input
                    type="date"
                    value={formData.dob}
                    onChange={(e) => updateField('dob', e.target.value)} // Send only the date part (YYYY-MM-DD)
                  />
                </FormField>

                <FormField label="Father's Name" required>
                  <Input
                    value={formData.fatherName}
                    onChange={(e) => updateField('fatherName', e.target.value)}
                    placeholder="Enter father's name"
                  />
                </FormField>

                <FormField label="Mother's Name" required>
                  <Input
                    value={formData.motherName}
                    onChange={(e) => updateField('motherName', e.target.value)}
                    placeholder="Enter mother's name"
                  />
                </FormField>

                <FormField label="Gender" required>
                  <Select
                    value={formData.gender.toString()}
                    onValueChange={(value) => updateField('gender', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      {genders.map(({ id, name }) => (
                        <SelectItem key={id} value={id}>{name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormField>

                <FormField label="Category" required>
                  <Select
                    value={formData.category.toString()}
                    onValueChange={(value) => updateField('category', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(({ id, name }) => (
                        <SelectItem key={id} value={id}>{name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormField>

                <FormField label="Email" required>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => updateField('email', e.target.value)}
                    placeholder="Enter email address"
                  />
                </FormField>
                <FormField label="Phone Number" required>
                  <Input
                    type="tel"
                    value={formData.phoneNumber}
                    onChange={(e) => updateField('phoneNumber', e.target.value)}
                    placeholder="Enter phone number"
                  />
                </FormField>
                <FormField label="Nationality" required>
                  <Input
                    value={formData.nationality}
                    onChange={(e) => updateField('nationality', e.target.value)}
                    placeholder="Enter nationality"
                  />
                </FormField>
              </div>
            </section>

            {/* Academic Details */}
            <section>
              <h3 className="text-lg font-semibold mb-4">Academic Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField label="Admission Type" required>
                  <Select
                    value={formData.admissionType.toString()}
                    onValueChange={handleAdmissionTypeChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select admission type" />
                    </SelectTrigger>
                    <SelectContent>
                      {admissionTypes.map(({ id, name }) => (
                        <SelectItem key={id} value={id}>{name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormField>
                <FormField label="Batch" required>
                  <Select
                    value={formData.batch.toString()}
                    onValueChange={(value) => updateField('batch', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select batch" />
                    </SelectTrigger>
                    <SelectContent>
                      {batches.map(({ id, name }) => (
                        <SelectItem key={id} value={id}>{name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormField>
                <FormField label="Course Type" required>
                  <Select
                    // value="ACADEMIC"
                    onValueChange={handleCourseTypeChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Course Type" />
                    </SelectTrigger>
                    <SelectContent>
                      {coursesTypes.map(({ id, name }) => (
                        <SelectItem key={id} value={id}>{name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormField>

                <FormField label="Course" required>
                  <Select
                    value={formData.courseId}
                    onValueChange={(value) => updateField('courseId', value)}
                  >
                    <SelectTrigger>
                      <SelectValue>
                        {formData.courseId
                          ? courses.find(course => course.id === formData.courseId)?.name || "Select course"
                          : "Select course"}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {courses.map(course => (
                        <SelectItem key={course.id} value={course.id}>{course.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormField>

              </div>
            </section>

            {/* Last Passed Exam Details if TOC is selected */}
            {showLastPassedExamForm && (
              <section className='bg-blue-100 p-4 rounded-md'>
                <h3 className="text-lg font-semibold mb-4">Last Passed Exam Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                  <FormField label="Subject Type" required>
                    <Select
                      value={newSubject.subjectType.toString()}
                      onValueChange={(value) => setNewSubject((prev: LastPassedExam) => ({ ...prev, subjectType: value as SubjectType }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select subject type" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(SubjectType).map(([key, value]) => (
                          <SelectItem key={value} value={value}>{key.replace(/_/g, ' ')}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormField>


                  <FormField label="Subject" required>
                    <Input
                      value={newSubject.subject || ''}
                      onChange={(e) => setNewSubject((prev: LastPassedExam) => ({ ...prev, subject: e.target.value ? String(e.target.value) : '' }))}
                      placeholder="Enter subject name"
                      className="border-gray-800" // Change border color for this field
                    />
                  </FormField>
                  <FormField label="Practical Marks" required>
                    <Input
                      type="number"
                      value={newSubject.practicalMarks || ''} // Ensure the input is empty if practicalMarks is 0
                      onChange={(e) => setNewSubject((prev: LastPassedExam) => ({ ...prev, practicalMarks: e.target.value ? Number(e.target.value) : 0 }))}
                      placeholder="Enter practical marks"
                      className="border-gray-800" // Change border color for this field
                    />
                  </FormField>
                  <FormField label="Assignment Marks" required>
                    <Input
                      type="number"
                      value={newSubject.assignmentMarks || ''} // Ensure the input is empty if assignmentMarks is 0
                      onChange={(e) => setNewSubject((prev: LastPassedExam) => ({ ...prev, assignmentMarks: e.target.value ? Number(e.target.value) : 0 }))}
                      placeholder="Enter assignment marks"
                      className="border-gray-800" // Change border color for this field
                    />
                  </FormField>
                  <FormField label="Theory Marks" required>
                    <Input
                      type="number"
                      value={newSubject.theoryMarks || ''} // Ensure the input is empty if theoryMarks is 0
                      onChange={(e) => setNewSubject((prev: LastPassedExam) => ({ ...prev, theoryMarks: e.target.value ? Number(e.target.value) : 0 }))}
                      placeholder="Enter theory marks"
                      className="border-gray-800" // Change border color for this field
                    />
                  </FormField>
                  <FormField label="Obtained Marks" required>
                    <Input
                      type="number"
                      value={newSubject.obtainedMarks || ''} // Ensure the input is empty if obtainedMarks is 0
                      onChange={(e) => setNewSubject((prev: LastPassedExam) => ({ ...prev, obtainedMarks: e.target.value ? Number(e.target.value) : 0 }))}
                      placeholder="Enter obtained marks"
                      className="border-gray-800" // Change border color for this field
                    />
                  </FormField>
                  <FormField label="Maximum Marks" required>
                    <Input
                      type="number"
                      value={newSubject.maximumMarks || ''} // Ensure the input is empty if maximumMarks is 0
                      onChange={(e) => setNewSubject((prev: LastPassedExam) => ({ ...prev, maximumMarks: e.target.value ? Number(e.target.value) : 0 }))}
                      placeholder="Enter maximum marks"
                      className="border-gray-800" // Change border color for this field
                    />
                  </FormField>
                </div>
                <Button onClick={handleAddLastPassedExam} className="mt-4">Add Subject Details</Button>
                {lastPassedExams.length > 0 && (
                  <div className="mt-4">
                    <h4 className="font-semibold">Added Subjects:</h4>
                    <table className="min-w-full border-collapse border border-gray-800">
                      <thead>
                        <tr>
                          <th className="border border-gray-800 p-2">Subject</th>
                          <th className="border border-gray-800 p-2">Type</th>
                          <th className="border border-gray-800 p-2">Practical Marks</th>
                          <th className="border border-gray-800 p-2">Assignment Marks</th>
                          <th className="border border-gray-800 p-2">Theory Marks</th>
                          <th className="border border-gray-800 p-2">Obtained Marks</th>
                          <th className="border border-gray-800 p-2">Maximum Marks</th>
                        </tr>
                      </thead>
                      <tbody>
                        {lastPassedExams.map((exam, index) => (
                          <tr key={index} className="border border-gray-800">
                            <td className="border border-gray-800 p-2 text-center">{exam.subject}</td>
                            <td className="border border-gray-800 p-2 text-center">{exam.subjectType}</td>
                            <td className="border border-gray-800 p-2 text-center">{exam.practicalMarks}</td>
                            <td className="border border-gray-800 p-2 text-center">{exam.assignmentMarks}</td>
                            <td className="border border-gray-800 p-2 text-center">{exam.theoryMarks}</td>
                            <td className="border border-gray-800 p-2 text-center">{exam.obtainedMarks}</td>
                            <td className="border border-gray-800 p-2 text-center">{exam.maximumMarks}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </section>
            )}

            {/* Address Details */}
            <section>
              <h3 className="text-lg font-semibold mb-4">Address Details</h3>

              {/* Permanent Address */}
              <div className="space-y-4 mb-4">
                <h4 className="font-medium">Permanent Address</h4>
                <FormField label="Address" required>
                  <Input
                    value={formData.permanentAddress.address}
                    onChange={(e) => updateAddress('permanentAddress', 'address', e.target.value)}
                    placeholder="Enter address"
                  />
                </FormField>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField label="City" required>
                    <Input
                      value={formData.permanentAddress.city}
                      onChange={(e) => updateAddress('permanentAddress', 'city', e.target.value)}
                      placeholder="Enter city"
                    />
                  </FormField>
                  <FormField label="District" required>
                    <Input
                      value={formData.permanentAddress.district}
                      onChange={(e) => updateAddress('permanentAddress', 'district', e.target.value)}
                      placeholder="Enter district"
                    />
                  </FormField>
                  <FormField label="State" required>
                    <Select
                      value={formData.permanentAddress.state.toString()}
                      onValueChange={(value) => updateAddress('permanentAddress', 'state', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select state" />
                      </SelectTrigger>
                      <SelectContent>
                        {states.map(({ id, name }) => (
                          <SelectItem key={id} value={id}>{name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormField>
                  <FormField label="Pincode" required>
                    <Input
                      value={formData.permanentAddress.pincode}
                      onChange={(e) => updateAddress('permanentAddress', 'pincode', e.target.value)}
                      placeholder="Enter pincode"
                    />
                  </FormField>
                </div>
              </div>

              {/* Same Address Checkbox */}
              <div className="flex items-center space-x-2 mb-4">
                <Checkbox
                  id="sameAddress"
                  checked={sameAddress}
                  onCheckedChange={handleSameAddressCheckbox}
                />
                <label
                  htmlFor="sameAddress"
                  className="text-sm font-medium leading-none"
                >
                  Correspondence Address Same as Permanent Address
                </label>
              </div>

              {/* Correspondence Address */}
              {!sameAddress && (
                <div className="space-y-4">
                  <h4 className="font-medium">Correspondence Address</h4>
                  <FormField label="Address" required>
                    <Input
                      value={formData.correspondenceAddress.address}
                      onChange={(e) => updateAddress('correspondenceAddress', 'address', e.target.value)}
                      placeholder="Enter address"
                    />
                  </FormField>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField label="City" required>
                      <Input
                        value={formData.correspondenceAddress.city}
                        onChange={(e) => updateAddress('correspondenceAddress', 'city', e.target.value)}
                        placeholder="Enter city"
                      />
                    </FormField>
                    <FormField label="District" required>
                      <Input
                        value={formData.correspondenceAddress.district}
                        onChange={(e) => updateAddress('correspondenceAddress', 'district', e.target.value)}
                        placeholder="Enter district"
                      />
                    </FormField>
                    <FormField label="State" required>
                      <Select
                        value={formData.correspondenceAddress.state.toString()}
                        onValueChange={(value) => updateAddress('correspondenceAddress', 'state', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select state" />
                        </SelectTrigger>
                        <SelectContent>
                          {states.map(({ id, name }) => (
                            <SelectItem key={id} value={id}>{name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormField>
                    <FormField label="Pincode" required>
                      <Input
                        value={formData.correspondenceAddress.pincode}
                        onChange={(e) => updateAddress('correspondenceAddress', 'pincode', e.target.value)}
                        placeholder="Enter pincode"
                      />
                    </FormField>
                  </div>
                </div>
              )}
            </section>

          </form>
        </div>
      </CardContent>
    </Card>
  );
};

export default RegisterStudentForm;