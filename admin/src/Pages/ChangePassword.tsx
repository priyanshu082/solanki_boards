import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import Swal from 'sweetalert2';
import axios from 'axios';
import { changePassword } from '../Config';

const changePasswordSchema = z.object({
    oldPassword: z.string().min(6, 'Old password is required'),
    newPassword: z.string().min(6, 'New password must be at least 6 characters'),
    adminSecret: z.string().min(1, 'Admin secret key is required'),
});

type ChangePasswordFormValues = z.infer<typeof changePasswordSchema>;

const ChangePassword = () => {
    const [isLoading, setIsLoading] = useState(false);
    const form = useForm<ChangePasswordFormValues>({
        resolver: zodResolver(changePasswordSchema),
        defaultValues: {
            oldPassword: '',
            newPassword: '',
            adminSecret: '',
        },
    });

    const onSubmit = async (data: ChangePasswordFormValues) => {
        setIsLoading(true);
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(
                changePassword,
                {
                    id: localStorage.getItem('id'),
                    oldPassword: data.oldPassword,
                    newPassword: data.newPassword,
                    adminSecretKey: data.adminSecret,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            if (response.status === 200) {
                await Swal.fire({
                    icon: 'success',
                    title: 'Password Changed',
                    text: 'Your password has been updated successfully.',
                    timer: 1800,
                    showConfirmButton: false,
                });
                form.reset();
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Change Failed',
                    text: response.data?.message || 'Failed to change password.',
                });
            }
        } catch (error: unknown) {
            let errorMessage = 'Failed to change password.';
            if (error && typeof error === 'object' && 'response' in error && error.response && typeof error.response === 'object' && 'data' in error.response && error.response.data && typeof error.response.data === 'object' && 'message' in error.response.data) {
                errorMessage = (error.response as { data?: { message?: string } }).data?.message || errorMessage;
            } else if (error instanceof Error) {
                errorMessage = error.message;
            }
            Swal.fire({
                icon: 'error',
                title: 'Change Failed',
                text: errorMessage,
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container mx-auto p-6 max-w-md flex justify-center items-center min-h-[80vh]">
            <Card className="w-full">
                <CardHeader>
                    <CardTitle>Change Password</CardTitle>
                    <CardDescription>Update your admin password securely.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <FormField
                                control={form.control}
                                name="oldPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Old Password</FormLabel>
                                        <FormControl>
                                            <Input type="password" placeholder="Enter old password" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="newPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>New Password</FormLabel>
                                        <FormControl>
                                            <Input type="password" placeholder="Enter new password" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="adminSecret"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Admin Secret Key</FormLabel>
                                        <FormControl>
                                            <Input type="password" placeholder="Enter admin secret key" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" className="w-full" disabled={isLoading}>
                                {isLoading ? 'Changing...' : 'Change Password'}
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
};

export default ChangePassword;
