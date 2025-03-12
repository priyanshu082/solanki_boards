import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../../components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs";
import { instituteRegistrationUrl } from '../../../data/config';
import axios from 'axios';
import dummyImage from '../../../assets/images/patners/patner_logo_4.png';
import { Oval } from 'react-loader-spinner'
// Enums
export enum Gender {
  MALE = "MALE",
  FEMALE = "FEMALE",
  OTHER = "OTHER"
}

export enum IndianState {
  ANDHRA_PRADESH = "ANDHRA_PRADESH",
  ARUNACHAL_PRADESH = "ARUNACHAL_PRADESH",
  ASSAM = "ASSAM",
  BIHAR = "BIHAR",
  CHHATTISGARH = "CHHATTISGARH", 
  GOA = "GOA",
  GUJARAT = "GUJARAT",
  HARYANA = "HARYANA",
  HIMACHAL_PRADESH = "HIMACHAL_PRADESH",
  JHARKHAND = "JHARKHAND",
  KARNATAKA = "KARNATAKA",
  KERALA = "KERALA",
  MADHYA_PRADESH = "MADHYA_PRADESH",
  MAHARASHTRA = "MAHARASHTRA",
  MANIPUR = "MANIPUR",
  MEGHALAYA = "MEGHALAYA",
  MIZORAM = "MIZORAM",
  NAGALAND = "NAGALAND",
  ODISHA = "ODISHA",
  PUNJAB = "PUNJAB",
  RAJASTHAN = "RAJASTHAN",
  SIKKIM = "SIKKIM",
  TAMIL_NADU = "TAMIL_NADU",
  TELANGANA = "TELANGANA",
  TRIPURA = "TRIPURA",
  UTTAR_PRADESH = "UTTAR_PRADESH",
  UTTARAKHAND = "UTTARAKHAND",
  WEST_BENGAL = "WEST_BENGAL"
}

// Helper function to format state display
const formatStateDisplay = (state: string) => {
  return state.replace(/_/g, ' ');
};

export enum UnionTerritory {
  DELHI = "DELHI",
}

export enum Country {
  INDIA = "INDIA",
}

// Update the FormData type to match your form fields
type FormData = {
  headName: string;
  headFatherName: string;
  headDob: string;
  headAadharNumber: string;
  headPanCardNumber: string;
  headMobileNumber: string;
  headEmailId: string;
  headGender: string;
  headAddress: string;
  headCity: string;
  headState: string;
  headUnionTerritory: string;
  headCountry: string;
  headPincode: string;
  headBankName: string;
  headAccountNumber: string;
  headIfscCode: string;
  centerName: string;
  centerEmailId: string;
  centerWebsiteUrl: string;
  centerPhoneNumber: string;
  centerAddress: string;
  centerCity: string;
  centerState: string;
  centerUnionTerritory: string;
  centerCountry: string;
  centerPincode: string;
};

const InstituteRegistrationForm = () => {
  const [registrationResponse, setRegistrationResponse] = useState<any>(null);
  const [headLocationType, setHeadLocationType] = useState<'state' | 'unionTerritory'>('state');
  const [centerLocationType, setCenterLocationType] = useState<'state' | 'unionTerritory'>('state');
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormData>({
    defaultValues: {
      headName: '',
      headFatherName: '',
      headDob: '',
      headAadharNumber: '',
      headPanCardNumber: '',
      headMobileNumber: '',
      headEmailId: '',
      headGender: '',
      headAddress: '',
      headCity: '',
      headState: '',
      headUnionTerritory: '',
      headCountry: Country.INDIA,
      headPincode: '',
      headBankName: '',
      headAccountNumber: '',
      headIfscCode: '',

      // Center details
      centerName: '',
      centerEmailId: '',
      centerWebsiteUrl: '',
      centerPhoneNumber: '',
      centerAddress: '',
      centerCity: '',
      centerState: '',
      centerUnionTerritory: '',
      centerCountry: Country.INDIA,
      centerPincode: '',
    },
    mode: 'onSubmit'
  });


  const onSubmit = async (data: any) => {
    try {
      console.log('Form submitted with data:', data);
      const formData = new FormData();

      // Add image
      try {
        const fetchResponse = await fetch(dummyImage);
        const blob = await fetchResponse.blob();
        const imageFile = new File([blob], 'dummy.png', {
          type: 'image/png',
          lastModified: new Date().getTime()
        });
        formData.append('image', imageFile);
      } catch (error) {
        console.error('Error processing image:', error);
      }

      // Create cleaned data object based on location type selections
      const cleanedData = {
        ...data,
        // For head location
        headState: headLocationType === 'state' ? data.headState : undefined,
        headUnionTerritory: headLocationType === 'unionTerritory' ? data.headUnionTerritory : undefined,
        // For center location
        centerState: centerLocationType === 'state' ? data.centerState : undefined,
        centerUnionTerritory: centerLocationType === 'unionTerritory' ? data.centerUnionTerritory : undefined,
      };

      // Add form data, excluding undefined and empty values
      Object.entries(cleanedData).forEach(([key, value]) => {
        if (value && value !== 'undefined' && value !== '') {
          // Skip the field that wasn't selected based on location type
          if ((key === 'centerState' && centerLocationType === 'unionTerritory') ||
              (key === 'centerUnionTerritory' && centerLocationType === 'state') ||
              (key === 'headState' && headLocationType === 'unionTerritory') ||
              (key === 'headUnionTerritory' && headLocationType === 'state')) {
            return;
          }
          formData.append(key, String(value));
        }
      });

      console.log('Sending data to server...', Object.fromEntries(formData.entries()));
      setIsLoading(true);
      const response = await axios.post(instituteRegistrationUrl, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setIsLoading(false);
      if (response.data) {
        setRegistrationResponse(response.data);
      }
    } catch (error) {
      console.error('Submission error:', error);
    }
  };

  const handleDownloadPDF = () => {
    alert('PDF Download functionality to be implemented');
  };

  return (
    <div className="mx-auto p-4 bg-white relative">
      {/* Add Loader Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <Oval
            visible={true}
            height="80"
            width="80"
            color="#0000FF"
            secondaryColor="#FFFFFF"
            ariaLabel="oval-loading"
            strokeWidth={3}
            strokeWidthSecondary={3}
          />
        </div>
      )}

      <Card className='bg-white text-primary'>
        <CardHeader className="bg-gradient-to-r from-primary to-blue-900 p-2 rounded-lg shadow-lg mb-4">
          <CardTitle className='text-2xl font-semibold text-white text-center tracking-wide drop-shadow-lg'> Apply for Accreditation </CardTitle>
        </CardHeader>
        <CardContent>
         
          {!registrationResponse ? (
           
            <Form {...form}>
              <form onSubmit={form.handleSubmit((data) => {
                console.log('Form submitted!');
                onSubmit(data);
              })} className="space-y-8">
                <Tabs defaultValue="head" className="space-y-4">
                  <TabsList className="grid w-full grid-cols-2 bg-white">
                    <TabsTrigger value="head">Head Details</TabsTrigger>
                    <TabsTrigger value="center">Institutional / School Details</TabsTrigger>
                  </TabsList>

                  <div className="space-y-4">
                    <TabsContent value="head">
                      <div className="grid md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="headName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Head Name</FormLabel>
                              <FormControl>
                                <Input className="border-primary" placeholder="Enter head name" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="headFatherName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Father's Name</FormLabel>
                              <FormControl>
                                <Input className="border-primary" placeholder="Enter father's name" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="headDob"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Date of Birth</FormLabel>
                              <FormControl>
                                <Input className="border-primary" type="date" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="headAadharNumber"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Aadhar Number</FormLabel>
                              <FormControl>
                                <Input className="border-primary" placeholder="Enter Aadhar Number" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="headPanCardNumber"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>PAN Card Number</FormLabel>
                              <FormControl>
                                <Input className="border-primary" placeholder="Enter PAN Card Number" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="headMobileNumber"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Mobile Number</FormLabel>
                              <FormControl>
                                <Input className="border-primary" placeholder="Enter Mobile Number" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="headEmailId"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email ID</FormLabel>
                              <FormControl>
                                <Input className="border-primary" placeholder="Enter Email ID" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="headGender"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Gender</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select Gender" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {Object.values(Gender).map((gender) => (
                                    <SelectItem key={gender} value={gender}>
                                      {gender}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="headAddress"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Address</FormLabel>
                              <FormControl>
                                <Input className="border-primary" placeholder="Enter Address" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="headCity"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>City</FormLabel>
                              <FormControl>
                                <Input className="border-primary" placeholder="Enter City" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        {/* Head Location Selection */}
                        <div className="space-y-4">
                          <div className="flex gap-4 items-center">
                            <label className="text-sm font-medium">Select Location Type:</label>
                            <Select 
                              value={headLocationType} 
                              onValueChange={(value: 'state' | 'unionTerritory') => setHeadLocationType(value)}
                            >
                              <SelectTrigger className="w-[200px]">
                                <SelectValue placeholder="Select type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="state">State</SelectItem>
                                <SelectItem value="unionTerritory">Union Territory</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          {headLocationType === 'state' ? (
                            <FormField
                              control={form.control}
                              name="headState"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>State</FormLabel>
                                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Select State" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      {Object.entries(IndianState).map(([key, value]) => (
                                        <SelectItem key={key} value={value}>
                                          {formatStateDisplay(value)}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          ) : (
                            <FormField
                              control={form.control}
                              name="headUnionTerritory"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Union Territory</FormLabel>
                                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Select Union Territory" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      {Object.values(UnionTerritory).map((ut) => (
                                        <SelectItem key={ut} value={ut}>
                                          {ut}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          )}
                        </div>
                        <FormField
                          control={form.control}
                          name="headCountry"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Country</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select Country" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {Object.values(Country).map((country) => (
                                    <SelectItem key={country} value={country}>
                                      {country}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="headPincode"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Pincode</FormLabel>
                              <FormControl>
                                <Input className="border-primary" placeholder="Enter Pincode" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="headBankName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Bank Name</FormLabel>
                              <FormControl>
                                <Input className="border-primary" placeholder="Enter Bank Name" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="headAccountNumber"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Account Number</FormLabel>
                              <FormControl>
                                <Input className="border-primary" placeholder="Enter Account Number" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="headIfscCode"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>IFSC Code</FormLabel>
                              <FormControl>
                                <Input className="border-primary" placeholder="Enter IFSC Code" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="center">
                      <div className="grid md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="centerName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Institutional / School Name</FormLabel>
                              <FormControl>
                                <Input className="border-primary" placeholder="Enter center name" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="centerEmailId"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Institutional / School Email ID</FormLabel>
                              <FormControl>
                                <Input className="border-primary" placeholder="Enter Center Email ID" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="centerWebsiteUrl"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Institutional / School Website URL</FormLabel>
                              <FormControl>
                                <Input className="border-primary" placeholder="Enter Center Website URL" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="centerPhoneNumber"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Institutional / School Phone Number</FormLabel>
                              <FormControl>
                                <Input className="border-primary" placeholder="Enter Center Phone Number" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="centerAddress"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Institutional / School Address</FormLabel>
                              <FormControl>
                                <Input className="border-primary" placeholder="Enter Center Address" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="centerCity"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Institutional / School City</FormLabel>
                              <FormControl>
                                <Input className="border-primary" placeholder="Enter Center City" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        {/* Center Location Selection - Similar structure */}
                        <div className="space-y-4">
                          <div className="flex gap-4 items-center">
                            <label className="text-sm font-medium">Select Location Type:</label>
                            <Select 
                              value={centerLocationType} 
                              onValueChange={(value: 'state' | 'unionTerritory') => setCenterLocationType(value)}
                            >
                              <SelectTrigger className="w-[200px]">
                                <SelectValue placeholder="Select type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="state">State</SelectItem>
                                <SelectItem value="unionTerritory">Union Territory</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          {centerLocationType === 'state' ? (
                            <FormField
                              control={form.control}
                              name="centerState"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>State</FormLabel>
                                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Select State" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      {Object.entries(IndianState).map(([key, value]) => (
                                        <SelectItem key={key} value={value}>
                                          {formatStateDisplay(value)}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          ) : (
                            <FormField
                              control={form.control}
                              name="centerUnionTerritory"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Union Territory</FormLabel>
                                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Select Union Territory" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      {Object.values(UnionTerritory).map((ut) => (
                                        <SelectItem key={ut} value={ut}>
                                          {ut}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          )}
                        </div>
                        <FormField
                          control={form.control}
                          name="centerCountry"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Institutional / School Country</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select Center Country" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {Object.values(Country).map((country) => (
                                    <SelectItem key={country} value={country}>
                                      {country}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="centerPincode"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Institutional / School Pincode</FormLabel>
                              <FormControl>
                                <Input className="border-primary" placeholder="Enter Center Pincode" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </TabsContent>
                  </div>

                  {form.formState.errors.root && (
                    <div className="text-red-500">
                      {form.formState.errors.root.message}
                    </div>
                  )}
                </Tabs>

                <Button 
                  type="submit"
                  className="w-full bg-primary text-white hover:bg-primary mt-4"
                >
                  Submit Application
                </Button>
              </form>
            </Form>
          ) : (
            <div className="text-center space-y-4">
              <h2 className="text-2xl font-bold">Registration Successful!</h2>
              <div className="bg-green-50 p-4 rounded-lg">
                <p>Application Number: {registrationResponse.applicationNumber}</p>
                <p>  Check Your Email for Password</p>
              </div>
              <div className="flex gap-4 justify-center">
                <Button 
                  onClick={() => {
                    navigator.clipboard.writeText(registrationResponse.applicationNumber);
                    alert('Application number copied to clipboard!');
                  }} 
                variant="outline" 
                className="border-primary text-foreground hover:bg-primary"
              >
                Copy Application Number
              </Button>
              <Button onClick={handleDownloadPDF} variant="outline" className="border-primary text-foreground hover:bg-primary ">
                  Download Registration Details
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default InstituteRegistrationForm;