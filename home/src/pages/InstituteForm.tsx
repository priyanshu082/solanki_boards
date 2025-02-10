import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";

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
  WEST_BENGAL = "WEST_BENGAL",
}

export enum UnionTerritory {
  DELHI = "DELHI",
  // Add more if needed
}

export enum Country {
  INDIA = "INDIA",
  // Add more countries if needed
}

// Schema validation
export const createInstituteSchema = Joi.object({
  headDob: Joi.string().required(),
  headName: Joi.string().required(),
  headFatherName: Joi.string().required(),
  headAadharNumber: Joi.string().required(),
  headPanCardNumber: Joi.string().required(),
  headMobileNumber: Joi.string().required(),
  headEmailId: Joi.string().email({ tlds: { allow: false } }).required(), // Disable TLD validation
  headGender: Joi.string().valid(...Object.values(Gender)).required().messages({
      'any.only': '{{#label}} must be one of: {{#valids}}',
  }),
  headAddress: Joi.string().required(),
  headCity: Joi.string().required(),
  headState: Joi.string().valid(...Object.values(IndianState)),
  headUnionTerritory: Joi.string().valid(...Object.values(UnionTerritory)).messages({
      'any.only': '{{#label}} must be one of: {{#valids}}',
  }),
  headCountry: Joi.string().valid(...Object.values(Country)).required().messages({
      'any.only': '{{#label}} must be one of: {{#valids}}',
  }),
  headPincode: Joi.string().required(),
  headBankName: Joi.string().required(),
  headAccountNumber: Joi.string().required(),
  headIfscCode: Joi.string().required(),

  centerName: Joi.string().required(),
  centerEmailId: Joi.string().email({ tlds: { allow: false } }).required(), // Disable TLD validation
  centerWebsiteUrl: Joi.string().required(),
  centerPhoneNumber: Joi.string().required(),
  centerAddress: Joi.string().required(),
  centerCity: Joi.string().required(),
  centerState: Joi.string().valid(...Object.values(IndianState)).messages({
      'any.only': '{{#label}} must be one of: {{#valids}}',
  }),
  centerUnionTerritory: Joi.string().valid(...Object.values(UnionTerritory)).messages({
      'any.only': '{{#label}} must be one of: {{#valids}}',
  }),
  centerCountry: Joi.string().valid(...Object.values(Country)).required().messages({
      'any.only': '{{#label}} must be one of: {{#valids}}',
  }),
  centerPincode: Joi.string().required(),
}).xor('headState', 'headUnionTerritory').xor('centerState', 'centerUnionTerritory');

// Add this type definition before the form initialization
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

  const form = useForm<FormData>({
    resolver: joiResolver(createInstituteSchema),
    defaultValues: {
      headGender: '',
      headCountry: Country.INDIA,
      centerCountry: Country.INDIA,
    }
  });

  console.log(form.getValues());

  const onSubmit = async (data: any) => {
    try {
      const response = await fetch('/api/register-institute', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Registration failed');
      }

      const responseData = await response.json();
      setRegistrationResponse(responseData);
    } catch (error) {
      console.error('Registration error:', error);
      form.setError('root', { 
        type: 'manual', 
        message: 'Registration failed. Please try again.' 
      });
    }
  };

  const handleDownloadPDF = () => {
    alert('PDF Download functionality to be implemented');
  };

  return (
    <div className="mx-auto p-4 bg-white">
      <Card className='bg-white text-primary'>
        <CardHeader className="bg-gradient-to-r from-primary to-blue-900 p-2 rounded-lg shadow-lg mb-4">
          <CardTitle className='text-2xl font-semibold text-white text-center tracking-wide drop-shadow-lg'> Apply for Accreditation </CardTitle>
        </CardHeader>
        <CardContent>
          {!registrationResponse ? (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <Tabs defaultValue="head">
                  <TabsList className="grid w-full grid-cols-2 bg-white ">
                    <TabsTrigger value="head" className="bg-white text-black border-primary border-2 rounded-none">Head Details</TabsTrigger>
                    <TabsTrigger value="center" className="bg-white text-black border-primary border-2 rounded-none">Institutional / School Details</TabsTrigger>
                  </TabsList>
                  
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
                                {Object.values(IndianState).map((state) => (
                                  <SelectItem key={state} value={state}>
                                    {state}
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
                      <FormField
                        control={form.control}
                        name="centerState"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Institutional / School State</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select Center State" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {Object.values(IndianState).map((state) => (
                                  <SelectItem key={state} value={state}>
                                    {state}
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
                        name="centerUnionTerritory"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Institutional / School Union Territory</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select Center Union Territory" />
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
                </Tabs>

                {form.formState.errors.root && (
                  <div className="text-red-500">
                    {form.formState.errors.root.message}
                  </div>
                )}

                <Button type="submit" className="w-full bg-primary text-white hover:bg-primary">
                  Proceed to Payment
                </Button>
              </form>
            </Form>
          ) : (
            <div className="text-center space-y-4">
              <h2 className="text-2xl font-bold">Registration Successful!</h2>
              <div className="bg-green-50 p-4 rounded-lg">
                <p>Application Number: {registrationResponse.applicationNumber}</p>
                <p>Temporary Password: {registrationResponse.tempPassword}</p>
              </div>
              <Button onClick={handleDownloadPDF} variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
                Download Registration Details
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default InstituteRegistrationForm;