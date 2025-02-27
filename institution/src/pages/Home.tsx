import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  UserPlusIcon, 
  FileUpIcon, 
  UserIcon, 
} from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="container mx-auto px-8 py-8 min-h-screen justify-center flex flex-col items-center">
      {/* Header Section */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">Welcome to Your Dashboard</h1>
        <p className="text-lg text-gray-600">
          Manage your students, upload documents, and view profiles seamlessly.
        </p>
      </div>

      {/* Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {/* Register Student */}
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardHeader>
            <UserPlusIcon className="w-12 h-12 text-blue-500 mx-auto" />
          </CardHeader>
          <CardContent className="text-center">
            <CardTitle>Register Student</CardTitle>
            <p className="text-sm text-gray-600">Add new students to the system.</p>
          </CardContent>
        </Card>

        {/* Upload Document */}
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardHeader>
            <FileUpIcon className="w-12 h-12 text-green-500 mx-auto" />
          </CardHeader>
          <CardContent className="text-center">
            <CardTitle>Upload Document</CardTitle>
            <p className="text-sm text-gray-600">Upload important files securely.</p>
          </CardContent>
        </Card>

        {/* Profile */}
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardHeader>
            <UserIcon className="w-12 h-12 text-purple-500 mx-auto" />
          </CardHeader>
          <CardContent className="text-center">
            <CardTitle>Profile</CardTitle>
            <p className="text-sm text-gray-600">View and manage your profile.</p>
          </CardContent>
        </Card>
        
      </div>
    </div>
  );
};

export default Home;
