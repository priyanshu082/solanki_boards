import { useState, useEffect } from 'react';
import profileimage from "../../assets/dummy.jpeg"
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";


import { Upload } from 'lucide-react';
import { instituteDetailsUrl, instituteUpdateUrl } from '../../Config';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { instituteState, instituteDetailsSelector } from '@/store/atoms/instituteAtoms';

const Profile = () => {
    const instituteDetails = useRecoilValue(instituteDetailsSelector);
    const setInstituteDetails = useSetRecoilState(instituteState);
    const [isLoading, setIsLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    // Fetch institute data
    useEffect(() => {
        const fetchInstituteDetails = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Authentication Error',
                        text: 'Please login again to continue',
                        confirmButtonColor: '#3085d6'
                    });
                    return;
                }

                const instituteId = localStorage.getItem('id');

                const response = await axios.get(`${instituteDetailsUrl}/${instituteId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setInstituteDetails(response.data);
                
                // Set form default values
                form.reset({
                    headFatherName: response.data.headFatherName,
                    headAadharNumber: response.data.headAadharNumber,
                    headGender: response.data.headGender,
                    headDob: response.data.headDob,
                    headAddress: response.data.headAddress,
                    headCountry: response.data.headCountry,
                    headState: response.data.headState,
                    headCity: response.data.headCity,
                    headPincode: response.data.headPincode,
                    headPanCardNumber: response.data.headPanCardNumber,
                    headBankName: response.data.headBankName,
                    headAccountNumber: response.data.headAccountNumber,
                    headIfscCode: response.data.headIfscCode
                });

            } catch (error: any) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: error.response?.data?.message || 'Failed to fetch institute details',
                    confirmButtonColor: '#3085d6'
                });
            }
        };

        fetchInstituteDetails();
    }, []);

    // Profile image upload handler
    const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        try {
            // Show loading state
            Swal.fire({
                title: 'Uploading...',
                text: 'Please wait while we upload your photo',
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading();
                }
            });

            const token = localStorage.getItem('token');
            if (!token) {
                Swal.close();
                Swal.fire({
                    icon: 'error', 
                    title: 'Authentication Error',
                    text: 'Please login again to continue',
                    confirmButtonColor: '#3085d6'
                });
                return;
            }

            const data = new FormData();
            data.append('image', file);
            data.append('applicationNumber', instituteDetails?.applicationNumber || '');

            const response = await axios.put(instituteUpdateUrl, data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                },
            });

            if (response.data) {
                setInstituteDetails(prev => prev ? {...prev, headProfileImage: response.data.headProfileImage} : null);
                Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: 'Profile image updated successfully',
                    confirmButtonColor: '#3085d6'
                });
            }
        } catch (error: any) {
            console.error('Image upload failed:', error);
            if (error.response?.status === 401) {
                Swal.fire({
                    icon: 'error',
                    title: 'Authentication Error', 
                    text: 'Please login again to continue',
                    confirmButtonColor: '#3085d6'
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error Updating Profile Image',
                    text: error.response?.data?.message || 'Failed to update image. Please try again.',
                    confirmButtonColor: '#3085d6',
                    showCancelButton: true,
                    confirmButtonText: 'Try Again',
                    cancelButtonText: 'Cancel'
                }).then((result) => {
                    if (result.isConfirmed) {
                        handleImageUpload(event);
                    }
                });
            }
        } 
    };

    const handleUpdateDetails = async (data: any) => {
        setIsLoading(true);
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                Swal.fire({
                    icon: 'error',
                    title: 'Authentication Error', 
                    text: 'Please login again to continue',
                    confirmButtonColor: '#3085d6'
                });
                return;
            }

            const formData = new FormData();
            formData.append('applicationNumber', instituteDetails?.applicationNumber || '');
            Object.keys(data).forEach(key => {
                formData.append(key, data[key]);
            });

            const response = await axios.put(instituteUpdateUrl, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.data) {
                setInstituteDetails(response.data);
                setIsEditing(false);
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Profile updated successfully',
                    confirmButtonColor: '#3085d6'
                });
            }
        } catch (error: any) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.response?.data?.message || 'Failed to update profile',
                confirmButtonColor: '#3085d6'
            });
        } finally {
            setIsLoading(false);
        }
    };

    const form = useForm({
        defaultValues: {
            headFatherName: '',
            headAadharNumber: '',
            headGender: '',
            headDob: '',
            headAddress: '',
            headCountry: '',
            headState: '',
            headCity: '',
            headPincode: '',
            headPanCardNumber: '',
            headBankName: '',
            headAccountNumber: '',
            headIfscCode: ''
        }
    });

    return (
        <Card className="w-[80vw] rounded-none h-full mx-auto">
            <CardHeader>
                <CardTitle>Institute Details</CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleUpdateDetails)} className="space-y-6">
                        {/* Profile Image Section */}
                        <div className="flex items-center space-x-4">
                            <img 
                                src={instituteDetails?.headProfileImage || profileimage} 
                                alt="Profile" 
                                className="w-24 h-24 rounded-full object-cover"
                            />
                            <div>
                                <input 
                                    type="file" 
                                    accept="image/*" 
                                    onChange={handleImageUpload} 
                                    className="hidden" 
                                    id="profileImageUpload"
                                />
                                <Button 
                                    type="button" 
                                    variant="outline" 
                                    onClick={() => {
                                        const fileInput = document.getElementById('profileImageUpload') as HTMLInputElement | null;
                                        if (fileInput) {
                                            fileInput.click();
                                        }
                                    }}
                                >
                                    <Upload className="mr-2 h-4 w-4" /> Update Photo
                                </Button>
                            </div>
                        </div>

                        {/* Non-Editable Fields */}
                        <div className="grid grid-cols-3 gap-4 mb-4">
                            <div>
                                <label className="text-sm font-medium text-gray-500">Head Name</label>
                                <Input 
                                    value={instituteDetails?.headName} 
                                    readOnly 
                                    className="bg-gray-100 cursor-not-allowed" 
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-500">Center Code</label>
                                <Input 
                                    value={instituteDetails?.centerCode} 
                                    readOnly 
                                    className="bg-gray-100 cursor-not-allowed" 
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-500">Head Mobile Number</label>
                                <Input 
                                    value={instituteDetails?.headMobileNumber} 
                                    readOnly 
                                    className="bg-gray-100 cursor-not-allowed" 
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-500">Head Email Address</label>
                                <Input 
                                    value={instituteDetails?.headEmailId} 
                                    readOnly 
                                    className="bg-gray-100 cursor-not-allowed" 
                                />
                            </div>
                        </div>

                        {/* Editable Fields */}
                        <div className="grid grid-cols-3 gap-4">
                            <FormField
                                control={form.control}
                                name="headFatherName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Father's Name</FormLabel>
                                        <FormControl>
                                            <Input {...field} readOnly={!isEditing} className={!isEditing ? "bg-gray-100" : ""} />
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
                                            <Input {...field} readOnly={!isEditing} className={!isEditing ? "bg-gray-100" : ""} />
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
                                            <Input type="date" {...field} readOnly={!isEditing} className={!isEditing ? "bg-gray-100" : ""} />
                                        </FormControl>
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
                                            <Input {...field} readOnly={!isEditing} className={!isEditing ? "bg-gray-100" : ""} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* <FormField
                                control={form.control}
                                name="headState"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>State</FormLabel>
                                        <FormControl>
                                            <Input {...field} readOnly={!isEditing} className={!isEditing ? "bg-gray-100" : ""} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            /> */}

                            <FormField
                                control={form.control}
                                name="headCity"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>City</FormLabel>
                                        <FormControl>
                                            <Input {...field} readOnly={!isEditing} className={!isEditing ? "bg-gray-100" : ""} />
                                        </FormControl>
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
                                            <Input {...field} readOnly={!isEditing} className={!isEditing ? "bg-gray-100" : ""} />
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
                                        <FormLabel>PAN</FormLabel>
                                        <FormControl>
                                            <Input {...field} readOnly={!isEditing} className={!isEditing ? "bg-gray-100" : ""} />
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
                                            <Input {...field} readOnly={!isEditing} className={!isEditing ? "bg-gray-100" : ""} />
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
                                            <Input {...field} readOnly={!isEditing} className={!isEditing ? "bg-gray-100" : ""} />
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
                                            <Input {...field} readOnly={!isEditing} className={!isEditing ? "bg-gray-100" : ""} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="flex justify-between mt-6">
                            <Button 
                                type="button" 
                                variant="outline"
                                onClick={() => setIsEditing(!isEditing)}
                            >
                                {isEditing ? 'Cancel' : 'Edit Details'}
                            </Button>
                            
                            {isEditing && (
                                <Button 
                                    type="submit"
                                    disabled={isLoading}
                                >
                                    {isLoading ? 'Updating...' : 'Update Details'}
                                </Button>
                            )}
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
};

export default Profile;