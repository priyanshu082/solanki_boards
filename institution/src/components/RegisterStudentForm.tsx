import React from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { 
  formDataState, 
  centersState, 
  coursesState,
  countriesState,
  statesState,
  citiesState,
  admissionTypesState,
  sessionsState,
  mediumsState,
  gendersState,
  categoriesState,
} from '../store/atoms/formDataAtoms';
import { Button } from './ui/button';
import { 
  Card,
  CardContent
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useEffect } from 'react';
import axios from 'axios';

// Define FormData interface
interface FormData {
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

interface FormFieldProps {
  label: string;
  children: React.ReactNode;
  required?: boolean;
}

const FormField: React.FC<FormFieldProps> = ({ label, children, required }) => (
  <div className="mb-2">
    <Label className="block text-sm font-medium mb-0 text-gray-600">
      {label} {required && <span className="text-red-500">*</span>}
    </Label>
    {children}
  </div>
);

const RegisterStudentForm: React.FC = () => {
  const [formData, setFormData] = useRecoilState(formDataState);
  const setCenters = useSetRecoilState(centersState);
  const setCourses = useSetRecoilState(coursesState);
  const setCountries = useSetRecoilState(countriesState);
  const setStates = useSetRecoilState(statesState);
  const setCities = useSetRecoilState(citiesState);

  const centers = useRecoilValue(centersState);
  const courses = useRecoilValue(coursesState);
  const countries = useRecoilValue(countriesState);
  const states = useRecoilValue(statesState);
  const cities = useRecoilValue(citiesState);
  
  const admissionTypes = useRecoilValue(admissionTypesState);
  const sessions = useRecoilValue(sessionsState);
  const mediums = useRecoilValue(mediumsState);
  const genders = useRecoilValue(gendersState);
  const categories = useRecoilValue(categoriesState);

  // Fetch initial data
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const [centersRes, coursesRes, countriesRes] = await Promise.all([
          axios.get('/api/centers'),
          axios.get('/api/courses'),
          axios.get('/api/countries')
        ]);
        
        setCenters(centersRes.data);
        setCourses(coursesRes.data);
        setCountries(countriesRes.data);
      } catch (error) {
        console.error('Error loading initial data:', error);
      }
    };

    loadInitialData();
  }, [setCenters, setCourses, setCountries]);

  // Fetch states when country changes
  useEffect(() => {
    const fetchStates = async () => {
      if (formData.country) {
        try {
          const response = await axios.get(`/api/states/${formData.country}`);
          setStates(response.data);
        } catch (error) {
          console.error('Error fetching states:', error);
        }
      }
    };

    fetchStates();
  }, [formData.country, setStates]);

  // Fetch cities when state changes
  useEffect(() => {
    const fetchCities = async () => {
      if (formData.state) {
        try {
          const response = await axios.get(`/api/cities/${formData.state}`);
          setCities(response.data);
        } catch (error) {
          console.error('Error fetching cities:', error);
        }
      }
    };

    fetchCities();
  }, [formData.state, setCities]);

  const handleInputChange = <K extends keyof FormData>(field: K, value: FormData[K]): void => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
      // Reset dependent fields when parent field changes
      ...(field === 'country' && {
        state: '',
        city: '',
        corrState: prev.sameAsPermenant ? '' : prev.corrState,
        corrCity: prev.sameAsPermenant ? '' : prev.corrCity,
      }),
      ...(field === 'state' && {
        city: '',
        corrCity: prev.sameAsPermenant ? '' : prev.corrCity,
      }),
    }));
  };

  const handleSameAddressChange = (checked: boolean): void => {
    setFormData(prev => ({
      ...prev,
      sameAsPermenant: checked,
      corrAddress: checked ? prev.permanentAddress : '',
      corrCountry: checked ? prev.country : '',
      corrState: checked ? prev.state : '',
      corrCity: checked ? prev.city : '',
      corrPincode: checked ? prev.pincode : '',
    }));
  };

  // Rest of your JSX remains the same...
  return (
    <Card className="flex flex-col mx-auto">
      <CardContent>
        <div className='flex flex-col'>
          <div className="py-2">
            <div className="flex flex-col sm:flex-row items-center md:items-start gap-6">
              <div className="flex flex-col items-center space-y-4">
                <div className="w-[150px] h-[150px] border-2 border-gray-200 rounded-md overflow-hidden">
                  <img
                    src="/api/placeholder/150/150"
                    alt="Student Photo"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="flex flex-col justify-center">
                <div className='flex flex-col justify-center items-center md:items-start'>
                  <h3 className="text-lg font-normal mb-2">Student Photo</h3>
                  <Button 
                    variant="outline" 
                    className="bg-blue-500 text-white hover:bg-blue-600 w-fit">
                    Change
                  </Button>
                </div>

                <div className='text-purple-800 font-bold text-sm mt-[4vw] flex flex-col justify-center items-center md:items-start'>
                  NOTE: BOARDS IN THE LIST OF MOE WILL BE ACCEPTED. CHECK YOUR BOARD BEFORE PLACING ADMISSIONS.
                </div>
              </div>
            </div>
          </div>
        <form className="space-y-2">
          {/* Academic Information */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField label="Center" required>
              <Select onValueChange={(value) => handleInputChange('center', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select center" />
                </SelectTrigger>
                <SelectContent>
                  {centers.map(center => (
                    <SelectItem key={center} value={center}>{center}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormField>


            <FormField label="Admission Type" required>
              <Select onValueChange={(value) => handleInputChange('admissionType', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select admission type" />
                </SelectTrigger>
                <SelectContent>
                  {admissionTypes.map(type => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormField>

            <FormField label="Session" required>
              <Select onValueChange={(value) => handleInputChange('session', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select session" />
                </SelectTrigger>
                <SelectContent>
                  {sessions.map(session => (
                    <SelectItem key={session} value={session}>{session}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormField>

            <FormField label="Course" required>
              <Select onValueChange={(value) => handleInputChange('course', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select course" />
                </SelectTrigger>
                <SelectContent>
                  {courses.map(course => (
                    <SelectItem key={course} value={course}>{course}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormField>

            <FormField label="Medium of Instruction" required>
              <Select onValueChange={(value) => handleInputChange('mediumOfInstruction', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select medium" />
                </SelectTrigger>
                <SelectContent>
                  {mediums.map(medium => (
                    <SelectItem key={medium} value={medium}>{medium}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormField>
          </div>

          {/* Personal Information */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField label="Name" required>
              <Input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
              />
            </FormField>

            <FormField label="Father's Name" required>
              <Input
                type="text"
                value={formData.fatherName}
                onChange={(e) => handleInputChange('fatherName', e.target.value)}
              />
            </FormField>

            <FormField label="Mother's Name" required>
              <Input
                type="text"
                value={formData.motherName}
                onChange={(e) => handleInputChange('motherName', e.target.value)}
              />
            </FormField>

            <FormField label="Gender" required>
              <Select onValueChange={(value) => handleInputChange('gender', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  {genders.map(gender => (
                    <SelectItem key={gender} value={gender}>{gender}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormField>

            <FormField label="Date of Birth" required>
              <Input
                type="date"
                value={formData.dateOfBirth}
                onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
              />
            </FormField>

            <FormField label="Contact Number" required>
              <Input
                type="tel"
                value={formData.contactNumber}
                onChange={(e:any) => handleInputChange('contactNumber', e.target.value)}
              />
            </FormField>

            <FormField label="Email" required>
              <Input
                type="email"
                value={formData.email}
                onChange={(e:any) => handleInputChange('email', e.target.value)}
              />
            </FormField>

            <FormField label="Aadhaar Number" required>
              <Input
                type="number"
                value={formData.adhaarNumber}
                onChange={(e:any) => handleInputChange('adhaarNumber', e.target.value)}
              />
            </FormField>

            <FormField label="Category" required>
              <Select onValueChange={(value) => handleInputChange('category', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormField>
          </div>

          {/* Permanent Address */}
          <div className="  border-black border-2 rounded-md p-[1vw] bg-blue-50">
            <h3 className="text-lg font-semibold">Permanent Address</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField label="Address" required>
                <Input
                  type="text"
                  value={formData.permanentAddress}
                  onChange={(e:any) => handleInputChange('permanentAddress', e.target.value)}
                />
              </FormField>

              <FormField label="Country" required>
                <Select onValueChange={(value) => handleInputChange('country', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    {countries.map(country => (
                      <SelectItem key={country} value={country}>{country}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormField>

              <FormField label="State" required>
                <Select onValueChange={(value) => handleInputChange('state', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select state" />
                  </SelectTrigger>
                  <SelectContent>
                    {states.map(state => (
                      <SelectItem key={state} value={state}>{state}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormField>

              <FormField label="City" required>
                <Select onValueChange={(value) => handleInputChange('city', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select city" />
                  </SelectTrigger>
                  <SelectContent>
                    {cities.map(city => (
                      <SelectItem key={city} value={city}>{city}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormField>

              <FormField label="Pincode" required>
                <Input
                  type="number"
                  value={formData.pincode}
                  onChange={(e:any) => handleInputChange('pincode', e.target.value)}
                />
              </FormField>
            </div>
          </div>

          {/* Correspondence Address */}
          <div className=" border-black border-2 rounded-md p-[1vw] bg-blue-50">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="sameAddress"
                checked={formData.sameAsPermenant}
                onCheckedChange={handleSameAddressChange}
              />
              <label htmlFor="sameAddress" className="text-sm font-medium">
                Same as Permanent Address
              </label>
            </div>

            {!formData.sameAsPermenant && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField label="Address" required>
                  <Input
                    type="text"
                    value={formData.corrAddress}
                    onChange={(e:any) => handleInputChange('corrAddress', e.target.value)}
                  />
                </FormField>

                <FormField label="Country" required>
                  <Select onValueChange={(value) => handleInputChange('corrCountry', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      {countries.map(country => (
                        <SelectItem key={country} value={country}>{country}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormField>

                <FormField label="State" required>
                  <Select onValueChange={(value) => handleInputChange('corrState', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select state" />
                    </SelectTrigger>
                    <SelectContent>
                      {states.map(state => (
                        <SelectItem key={state} value={state}>{state}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormField>

                <FormField label="City" required>
                  <Select onValueChange={(value) => handleInputChange('corrCity', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select city" />
                    </SelectTrigger>
                    <SelectContent>
                      {cities.map(city => (
                        <SelectItem key={city} value={city}>{city}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormField>

                <FormField label="Pincode" required>
                  <Input
                    type="number"
                    value={formData.corrPincode}
                    onChange={(e:any) => handleInputChange('corrPincode', e.target.value)}
                  />
                </FormField>
              </div>
            )}
          </div>

        </form>
        </div>
        
      </CardContent>
    </Card>
  );
};

export default RegisterStudentForm;