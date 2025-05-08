import { useState, useEffect } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { NoticePreview, NoticeDetails } from '../lib/Interfaces';
import Swal from 'sweetalert2';
import { Trash2, Search, Eye, Pencil } from 'lucide-react';
import { format } from 'date-fns';
import { getallnotice, createnotice, deleteNotice, getnoticebyid, updateNotice } from '../Config';
// Define the form schema for notice creation using zod
const noticeSchema = z.object({
  title: z.string().min(1, "Notice title is required"),
  description: z.string().min(1, "Notice description is required"),
  forInstitute: z.boolean().default(false)
});

type NoticeFormValues = z.infer<typeof noticeSchema>;

const NoticeUpdate = () => {
  const [notices, setNotices] = useState<NoticePreview[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredNotices, setFilteredNotices] = useState<NoticePreview[]>([]);
  const [selectedNotice, setSelectedNotice] = useState<NoticeDetails | null>(null);
  const [editingNoticeId, setEditingNoticeId] = useState<string | null>(null);

  // Initialize the form
  const form = useForm<NoticeFormValues>({
    resolver: zodResolver(noticeSchema),
    defaultValues: {
      title: "",
      description: "",
      forInstitute: false
    }
  });

  // Fetch all notices on component mount
  useEffect(() => {
    fetchNotices();
  }, []);

  // Filter notices based on search term
  useEffect(() => {
    const filtered = notices.filter(notice =>
      notice.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredNotices(filtered);
  }, [notices, searchTerm]);

  // Function to fetch notices from API
  const fetchNotices = async () => {
    try {
      setIsLoading(true);
      // Replace with your actual API endpoint
      const response = await axios.post(getallnotice, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setNotices(response.data);
    } catch (error) {
      console.error("Failed to fetch notices", error);
      Swal.fire({
        title: 'Error!',
        text: 'Failed to load notices. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Function to create a new notice
  const onSubmit = async (data: NoticeFormValues) => {
    try {
      setIsLoading(true);
      if (editingNoticeId) {
        // Update notice
        await axios.put(updateNotice, {
          id: editingNoticeId,
          ...data
        }, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        Swal.fire({
          title: 'Success!',
          text: 'Notice updated successfully!',
          icon: 'success',
          confirmButtonText: 'Great!'
        });
        setEditingNoticeId(null);
        setSelectedNotice(null);
      } else {
        // Create notice
        await axios.post(createnotice, data, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        Swal.fire({
          title: 'Success!',
          text: 'Notice created successfully!',
          icon: 'success',
          confirmButtonText: 'Great!'
        });
      }
      form.reset();
      fetchNotices();
    } catch (error) {
      console.error("Failed to create/update notice", error);
      Swal.fire({
        title: 'Error!',
        text: editingNoticeId ? 'Failed to update notice. Please try again.' : 'Failed to create notice. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Function to delete a notice
  const handleDeleteNotice = async (id: string) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`${deleteNotice}/${id}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          });
          fetchNotices();
          Swal.fire(
            'Deleted!',
            'Notice has been deleted.',
            'success'
          );
        } catch (error) {
          console.error("Failed to delete notice", error);
          Swal.fire({
            title: 'Error!',
            text: 'Failed to delete notice. Please try again.',
            icon: 'error',
            confirmButtonText: 'OK'
          });
        }
      }
    });
  };

  // Function to view notice details
  const handleViewNotice = async (id: string) => {
    try {
      setIsLoading(true);
      // Replace with your actual API endpoint
      const response = await axios.get(`${getnoticebyid}/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setSelectedNotice(response.data);
    } catch (error) {
      console.error("Failed to fetch notice details", error);
      Swal.fire({
        title: 'Error!',
        text: 'Failed to load notice details. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Function to handle edit click
  const handleEditNotice = (notice: NoticePreview) => {
    setEditingNoticeId(notice.id);
    form.setValue('title', notice.title);
    // Try to get description if available (from NoticeDetails), otherwise fallback to empty string
    const description = (notice as NoticeDetails).description || '';
    form.setValue('description', description);
    form.setValue('forInstitute', notice.forInstitute || false);
    setSelectedNotice(null);
  };

  // Function to handle cancel edit
  const handleCancelEdit = () => {
    setEditingNoticeId(null);
    form.reset();
  };

  return (
    <div className="container mx-auto p-6 space-y-8 max-w-full">
      {/* Notice Creation Form */}
      <Card className="w-full">
        <CardHeader>
          <CardTitle>{selectedNotice ? 'Edit Notice' : 'Create New Notice'}</CardTitle>
          <CardDescription>{selectedNotice ? 'Update an existing notice' : 'Add a new notice to the system'}</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Notice Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter notice title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Notice Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter notice description"
                        className="min-h-[150px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="forInstitute"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">For Institute Only</FormLabel>
                      <FormDescription>
                        Toggle on if this notice is only for institutes
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <div className="flex justify-between">
                {editingNoticeId ? (
                  <Button type="button" variant="secondary" onClick={handleCancelEdit}>
                    Cancel Edit
                  </Button>
                ) : (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      form.reset({
                        title: "",
                        description: "",
                        forInstitute: false
                      });
                      setSelectedNotice(null);
                    }}
                  >
                    Cancel
                  </Button>
                )}
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? (editingNoticeId ? "Updating..." : "Saving...") : (editingNoticeId ? "Update Notice" : (selectedNotice ? "Update Notice" : "Create Notice"))}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* Notice List */}
      <Card className="w-full">
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <CardTitle>Notice List</CardTitle>
              <CardDescription>Manage existing notices</CardDescription>
            </div>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search notices..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center items-center h-40">
              <div className="animate-spin h-8 w-8 border-4 border-blue-500 rounded-full border-t-transparent"></div>
            </div>
          ) : filteredNotices.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              {searchTerm ? "No notices found matching your search" : "No notices available"}
            </div>
          ) : (
            <div className="rounded-md border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Date Created</TableHead>
                    <TableHead>For Institute Only</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredNotices.map((notice) => (
                    <TableRow
                      key={notice.id}
                      className={editingNoticeId === notice.id ? 'bg-gray-100 scale-[1.01] transition-all duration-300' : ''}
                    >
                      <TableCell className="font-medium">{notice.title}</TableCell>
                      <TableCell>{format(new Date(notice.createdAt), 'PPP')}</TableCell>
                      <TableCell>{notice.forInstitute ? "Yes" : "No"}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleViewNotice(notice.id)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleEditNotice(notice)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="destructive"
                            size="icon"
                            className='text-white'
                            onClick={() => handleDeleteNotice(notice.id)}
                          >
                            <Trash2 className="h-4 w-4 text-white" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* View Notice Modal */}
      {selectedNotice && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-2xl mx-4">
            <CardHeader>
              <CardTitle>{selectedNotice.title}</CardTitle>
              <CardDescription>
                Created on {format(new Date(selectedNotice.createdAt), 'PPP')}
                {selectedNotice.forInstitute && " • For Institute Only"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="prose max-w-none">
                <p className="whitespace-pre-wrap">{selectedNotice.description}</p>
              </div>
            </CardContent>
            <div className="p-6 pt-0 flex justify-end">
              <Button
                variant="outline"
                onClick={() => setSelectedNotice(null)}
              >
                Close
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default NoticeUpdate;