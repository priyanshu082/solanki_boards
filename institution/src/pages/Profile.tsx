import { useState, useEffect } from 'react';
import profileimage from "../assets/dummy.jpeg"
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
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Upload } from 'lucide-react';

// Validation schema
const userDetailsSchema = z.object({
  fatherName: z.string().min(2, "Father name is required"),
  adharNumber: z.string().regex(/^\d{12}$/, "Adhar number must be 12 digits"),
  gender: z.enum(["male", "female", "other"]),
  dob: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format"),
  address: z.string().min(5, "Address is required"),
  country: z.string().min(2, "Country is required"),
  state: z.string().min(2, "State is required"),
  city: z.string().min(2, "City is required"),
  pincode: z.string().regex(/^\d{6}$/, "Pincode must be 6 digits"),
  panNo: z.string().regex(/^[A-Z]{5}\d{4}[A-Z]{1}$/, "Invalid PAN number"),
  bankName: z.string().min(2, "Bank name is required"),
  accountNumber: z.string().regex(/^\d{9,18}$/, "Invalid account number"),
  ifscCode: z.string().regex(/^[A-Z]{4}\d{7}$/, "Invalid IFSC code"),
  branchName: z.string().min(2, "Branch name is required")
});

interface UserData {
    fatherName: string;
    adharNumber: string;
    gender: "male" | "female" | "other";
    dob: string;
    address: string;
    country: string;
    state: string;
    city: string;
    pincode: string;
    panNo: string;
    bankName: string;
    accountNumber: string;
    ifscCode: string;
    branchName: string;
    profileImageUrl: string;
    name: string;
    centerCode: string;
    mobileNumber: string;
    emailAddress: string;
  }

const Profile = () => {
    const [userData, setUserData] = useState<UserData | null>(null);
    //@ts-ignore
  const [profileImage, setProfileImage] = useState(null);

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch('/api/user-details');
        const data: UserData = await response.json(); // Assert the type here
        setUserData(data);
      } catch (error) {
        console.error('Failed to fetch user details:', error);
      }
    };
  
    fetchUserDetails();
  }, []);

  // Profile image upload handler
  //@ts-ignore
  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('profileImage', file);

    try {
      const response = await fetch('/api/upload-profile-image', {
        method: 'POST',
        body: formData
      });
      const result = await response.json();
      setProfileImage(result.imageUrl);
    } catch (error) {
      console.error('Image upload failed:', error);
    }
  };

  // Form submission handler
  const onSubmit = async (data: any) => {
    try {
      const response = await fetch('/api/update-user-details', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      //@ts-ignore
      const result = await response.json();
      // Handle successful update
    } catch (error) {
      console.error('Update failed:', error);
    }
  };

  const form = useForm({
      resolver: zodResolver(userDetailsSchema),
      defaultValues: {
      fatherName: userData?.fatherName || '',
      adharNumber: userData?.adharNumber || '',
      gender: userData?.gender || '',
      dob: userData?.dob || '',
      address: userData?.address || '',
      country: userData?.country || '',
      state: userData?.state || '',
      city: userData?.city || '',
      pincode: userData?.pincode || '',
      panNo: userData?.panNo || '',
      bankName: userData?.bankName || '',
      accountNumber: userData?.accountNumber || '',
      ifscCode: userData?.ifscCode || '',
      branchName: userData?.branchName || ''
    }
  });

//   if (!userData) return <div>Loading...</div>;

  return (
    <Card className="w-[80vw] rounded-none h-full mx-auto">
      <CardHeader>
        <CardTitle>User Details</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Profile Image Section */}
            <div className="flex items-center space-x-4">
              <img 
                src={profileimage || userData?.profileImageUrl} 
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
                <label className="text-sm font-medium text-gray-500">Name</label>
                <Input 
                  value={userData?.name} 
                  readOnly 
                  className="bg-gray-100 cursor-not-allowed" 
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Center Code</label>
                <Input 
                  value={userData?.centerCode} 
                  readOnly 
                  className="bg-gray-100 cursor-not-allowed" 
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Mobile Number</label>
                <Input 
                  value={userData?.mobileNumber} 
                  readOnly 
                  className="bg-gray-100 cursor-not-allowed" 
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Email Address</label>
                <Input 
                  value={userData?.emailAddress} 
                  readOnly 
                  className="bg-gray-100 cursor-not-allowed" 
                />
              </div>
            </div>

            {/* Editable Fields */}
            <div className="grid grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="fatherName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Father's Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="adharNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Adhar Number</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
             <FormField
  control={form.control}
  name="gender"
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
          <SelectItem value="male">Male</SelectItem>
          <SelectItem value="female">Female</SelectItem>
          <SelectItem value="other">Other</SelectItem>
        </SelectContent>
      </Select>
      <FormMessage />
    </FormItem>
  )}
/>

<FormField
  control={form.control}
  name="dob"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Date of Birth</FormLabel>
      <FormControl>
        <Input type="date" {...field} placeholder="Enter your date of birth" />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

<FormField
  control={form.control}
  name="address"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Address</FormLabel>
      <FormControl>
        <Input type="text" {...field} placeholder="Enter your address" />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

<FormField
  control={form.control}
  name="country"
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
          <SelectItem value="india">India</SelectItem>
          <SelectItem value="usa">USA</SelectItem>
          <SelectItem value="uk">UK</SelectItem>
          {/* Add more countries as needed */}
        </SelectContent>
      </Select>
      <FormMessage />
    </FormItem>
  )}
/>

<FormField
  control={form.control}
  name="state"
  render={({ field }) => (
    <FormItem>
      <FormLabel>State</FormLabel>
      <FormControl>
        <Input type="text" {...field} placeholder="Enter your state" />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

<FormField
  control={form.control}
  name="city"
  render={({ field }) => (
    <FormItem>
      <FormLabel>City</FormLabel>
      <FormControl>
        <Input type="text" {...field} placeholder="Enter your city" />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

<FormField
  control={form.control}
  name="pincode"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Pincode</FormLabel>
      <FormControl>
        <Input type="number" {...field} placeholder="Enter your pincode" />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

<FormField
  control={form.control}
  name="panNo"
  render={({ field }) => (
    <FormItem>
      <FormLabel>PAN</FormLabel>
      <FormControl>
        <Input type="text" {...field} placeholder="Enter your PAN" />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

<FormField
  control={form.control}
  name="bankName"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Bank Details</FormLabel>
      <FormControl>
        <Input type="text" {...field} placeholder="Enter your bank details" />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

              {/* Add similar FormField components for other editable fields */}
              {/* DOB, Address, Country, State, City, Pincode, PAN, Bank Details */}
            </div>

            <Button type="submit">Update Details</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default Profile;