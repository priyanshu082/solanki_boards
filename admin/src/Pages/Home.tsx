import { useNavigate } from 'react-router-dom';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Grid, BookOpen, Users, School, MessageSquare, Info } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();

  const menuItems = [
    { title: 'Student Admission', description: 'New Student Admission', icon: Users, path: '/admission' },
    { title: 'All Students', description: 'View and manage all student records', icon: Users, path: '/all-students' },
    { title: 'Institute Registration', description: 'New Institute Registration', icon: School, path: '/institute-registration' },
    { title: 'All Institutes', description: 'View and manage all institutes', icon: School, path: '/all-institutes' },
    { title: 'Create Course', description: 'Create new courses for institutes', icon: BookOpen, path: '/create-course' },
    { title: 'Create Subject', description: 'Add new subjects to courses', icon: Grid, path: '/create-subject' },
    { title: 'Enquiries', description: 'Manage student enquiries', icon: MessageSquare, path: '/enquiry' },
    { title: 'Notice Updates', description: 'Post and manage notices', icon: Info, path: '/notice-update' },
    // { title: 'Student Details', description: 'View detailed student information', icon: FileText, path: '/student-details/1' },
  ];

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-gray-500">Welcome to the SBCODL Admin Dashboard</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
        {menuItems.map((item, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <item.icon className="h-5 w-5" />
                {item.title}
              </CardTitle>
              <CardDescription>{item.description}</CardDescription>
            </CardHeader>
            <CardFooter>
              <Button
                className="w-full"
                onClick={() => navigate(item.path)}
              >
                Navigate
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Home;