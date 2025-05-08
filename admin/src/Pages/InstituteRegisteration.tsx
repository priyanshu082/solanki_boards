import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { createinstitute } from '@/Config';
import axios from 'axios';
// import dummyImage from '../assets/images/patners/patner_logo_4.png';
import { Oval } from 'react-loader-spinner'
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Swal from 'sweetalert2';
import { Country, Gender, IndianState, UnionTerritory } from '@/lib/Interfaces';

// Helper function to format state display
const formatStateDisplay = (state: string) => {
    return state.replace(/_/g, ' ');
};

type FormData = z.infer<typeof formSchema>;

const formSchema = z.object({
    headName: z.string().min(2, "Name must be at least 2 characters"),
    headFatherName: z.string().min(2, "Father's name must be at least 2 characters"),
    headDob: z.string().refine((val) => {
        const date = new Date(val);
        const now = new Date();
        return date < now;
    }, "Date of birth must be in the past"),
    headAadharNumber: z.string().regex(/^\d{12}$/, "Aadhar number must be 12 digits"),
    headPanCardNumber: z.string().regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, "Invalid PAN card format"),
    headMobileNumber: z.string().regex(/^[6-9]\d{9}$/, "Invalid mobile number"),
    headEmailId: z.string().email("Invalid email address"),
    headGender: z.string().min(1, "Please select a gender"),
    headAddress: z.string().min(5, "Address must be at least 5 characters"),
    headCity: z.string().min(2, "City name must be at least 2 characters"),
    headState: z.string().optional(),
    headUnionTerritory: z.string().optional(),
    headCountry: z.string().min(1, "Please select a country"),
    headPincode: z.string().regex(/^\d{6}$/, "Pincode must be 6 digits"),
    headBankName: z.string().min(3, "Bank name must be at least 3 characters"),
    headAccountNumber: z.string().min(9, "Invalid account number"),
    headIfscCode: z.string().regex(/^[A-Z]{4}0[A-Z0-9]{6}$/, "Invalid IFSC code"),

    centerName: z.string().min(3, "Institution name must be at least 3 characters"),
    centerEmailId: z.string().email("Invalid email address"),
    centerWebsiteUrl: z.string().url("Invalid website URL").or(z.string().length(0)),
    centerPhoneNumber: z.string().regex(/^[0-9]{10,12}$/, "Invalid phone number"),
    centerAddress: z.string().min(5, "Address must be at least 5 characters"),
    centerCity: z.string().min(2, "City name must be at least 2 characters"),
    centerState: z.string().optional(),
    centerUnionTerritory: z.string().optional(),
    centerCountry: z.string().min(1, "Please select a country"),
    centerPincode: z.string().regex(/^\d{6}$/, "Pincode must be 6 digits"),
});

const InstituteRegistration = () => {
    const [registrationResponse, setRegistrationResponse] = useState<{ applicationNumber: string } | null>(null);
    const [headLocationType, setHeadLocationType] = useState<'state' | 'unionTerritory'>('state');
    const [centerLocationType, setCenterLocationType] = useState<'state' | 'unionTerritory'>('state');
    const [isLoading, setIsLoading] = useState(false);
    const [instituteLogo, setInstituteLogo] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string>('');

    const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setInstituteLogo(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

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
        mode: 'onBlur',
        resolver: zodResolver(formSchema),
    });

    const onSubmit = async (data: FormData) => {
        try {
            console.log('Form submitted with data:', data);
            const formData = new FormData();

            if (Object.keys(form.formState.errors).length > 0) {
                alert("Please fix all errors before submitting");
                return;
            }

            // Add institute logo
            if (instituteLogo) {
                formData.append('image', instituteLogo);
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Missing Logo',
                    text: 'Please upload an institute logo and try again',
                    confirmButtonColor: '#3085d6'
                });
                return;
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
            const response = await axios.post(createinstitute, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setIsLoading(false);
            if (response.data) {
                setRegistrationResponse(response.data);
                Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: 'Your application has been submitted successfully. Please check your email for further instructions.',
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'OK'
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.href = '/';
                    }
                });
            }
        } catch (error) {
            console.error('Submission error:', error);
            alert('Error submitting form. Please try again.');
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
                    <CardTitle className='text-2xl font-semibold text-white text-center tracking-wide drop-shadow-lg'>Institute Registration Form</CardTitle>
                </CardHeader>
                <CardContent>
                    {!registrationResponse ? (
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                <Tabs defaultValue="head" className="space-y-4">
                                    <TabsList className="grid w-full grid-cols-2 bg-white">
                                        <TabsTrigger
                                            value="head"
                                            className="data-[state=active]:bg-primary data-[state=active]:text-white transition-colors cursor-pointer"
                                        >
                                            Head Details
                                        </TabsTrigger>
                                        <TabsTrigger
                                            value="center"
                                            className="data-[state=active]:bg-primary data-[state=active]:text-white transition-colors cursor-pointer"
                                        >
                                            Institutional / School Details
                                        </TabsTrigger>
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
                                                <div className="col-span-2">
                                                    <div className="flex flex-col items-center gap-4 p-4 border-2 border-dashed border-gray-300 rounded-lg">
                                                        <div className="relative w-32 h-32">
                                                            {previewUrl ? (
                                                                <img
                                                                    src={previewUrl}
                                                                    alt="Institute Logo Preview"
                                                                    className="w-full h-full object-cover rounded-lg"
                                                                />
                                                            ) : (
                                                                <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-lg">
                                                                    <span className="text-gray-400">No Logo Selected</span>
                                                                </div>
                                                            )}
                                                        </div>
                                                        <div className="flex flex-col items-center gap-2">
                                                            <label
                                                                htmlFor="institute-logo"
                                                                className="cursor-pointer bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
                                                            >
                                                                {instituteLogo ? 'Change Logo' : 'Upload Logo'}
                                                            </label>
                                                            <input
                                                                id="institute-logo"
                                                                type="file"
                                                                accept="image/*"
                                                                onChange={handlePhotoChange}
                                                                className="hidden"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
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
                                                {/* Center Location Selection */}
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
                                    className="w-full bg-primary text-white hover:bg-primary mt-4 cursor-pointer"
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
                                <p>Check Your Email for Password</p>
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
                                <Button onClick={handleDownloadPDF} variant="outline" className="border-primary text-foreground hover:bg-primary">
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

export default InstituteRegistration;
