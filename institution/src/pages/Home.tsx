import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  UserPlusIcon, 
  FileUpIcon, 
  UserIcon,
  Package,
  CreditCard,
  FileText,
  FileAudio2Icon
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate();

  const studentCards = [
    {
      title: 'Register Student',
      description: 'Add new students to the system.',
      icon: UserPlusIcon,
      path: '/register-student',
      iconColor: 'text-blue-500',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Upload Document',
      description: 'Upload student documents securely.',
      icon: FileUpIcon,
      path: '/upload-document',
      iconColor: 'text-green-500',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Show Students',
      description: 'View all registered students.',
      icon: Package,
      path: '/show-students',
      iconColor: 'text-orange-500',
      bgColor: 'bg-orange-50'
    },
    {
      title: 'Fee Payment',
      description: 'Manage student fee payments.',
      icon: CreditCard,
      path: '/payment-student',
      iconColor: 'text-red-500',
      bgColor: 'bg-red-50'
    }
  ];

  const instituteCards = [
    {
      title: 'Profile',
      description: 'View and manage your profile.',
      icon: UserIcon,
      path: '/profile',
      iconColor: 'text-purple-500',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'Upload Documents',
      description: 'Upload institute documents.',
      icon: FileText,
      path: '/institute-document',
      iconColor: 'text-indigo-500',
      bgColor: 'bg-indigo-50'
    },
    {
      title: 'Accredited Certificate',
      description: 'View accreditation details.',
      icon: FileAudio2Icon,
      path: '/accredited-certificate',
      iconColor: 'text-yellow-500',
      bgColor: 'bg-yellow-50'
    },
    {
      title: 'Sanctioned Letter',
      description: 'Access sanctioned letters.',
      icon: FileText,
      path: '/sanctioned-letter',
      iconColor: 'text-teal-500',
      bgColor: 'bg-teal-50'
    }
  ];

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-screen">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
          Welcome to Your Dashboard
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Manage your students, upload documents, and view profiles seamlessly.
        </p>
      </div>

      {/* Students Section */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold mb-8 text-primary text-center relative">
          <span className="relative inline-block">
            STUDENTS
          </span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {studentCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <Card 
                key={index}
                className={`transform transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer ${card.bgColor}`}
                onClick={() => navigate(card.path)}
              >
                <CardHeader className="pb-2">
                  <div className={`rounded-full p-3 ${card.bgColor} w-16 h-16 mx-auto flex items-center justify-center`}>
                    <Icon className={`w-8 h-8 ${card.iconColor}`} />
                  </div>
                </CardHeader>
                <CardContent className="text-center">
                  <CardTitle className="text-xl mb-2">{card.title}</CardTitle>
                  <p className="text-sm text-gray-600">{card.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Settings Section */}
      <div>
        <h2 className="text-3xl font-bold mb-8 text-primary text-center relative">
          <span className="relative inline-block">
            INSTITUTE
          </span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {instituteCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <Card 
                key={index}
                className={`transform transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer ${card.bgColor}`}
                onClick={() => navigate(card.path)}
              >
                <CardHeader className="pb-2">
                  <div className={`rounded-full p-3 ${card.bgColor} w-16 h-16 mx-auto flex items-center justify-center`}>
                    <Icon className={`w-8 h-8 ${card.iconColor}`} />
                  </div>
                </CardHeader>
                <CardContent className="text-center">
                  <CardTitle className="text-xl mb-2">{card.title}</CardTitle>
                  <p className="text-sm text-gray-600">{card.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
