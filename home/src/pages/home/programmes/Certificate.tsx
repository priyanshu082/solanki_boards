import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs";
import { Alert, AlertTitle, AlertDescription } from "../../../components/ui/alert";
import { Badge } from "../../../components/ui/badge";
import { Separator } from "../../../components/ui/separator";
import {
  GraduationCap,
  Calendar,
  UserCheck,
  ScrollText,
  Wrench,
  Cpu,
  Car,
  Zap,
  PenTool
} from "lucide-react";
import { useNavigate } from 'react-router-dom';

const certificatePrograms = [
  {
    name: "Certificate in Nanny Care (CNC)",
    duration: "1 Year",
    eligibility: "10th Pass",
    description: "Focuses on childcare, early childhood development, nutrition, and safety for professional nanny services.",
    icon: UserCheck
  },
  {
    name: "Certificate in Event Management (CEM)",
    duration: "1 Year",
    eligibility: "10th Pass",
    description: "Covers planning, organizing, and managing events, including corporate, social, and wedding events.",
    icon: ScrollText
  },
  {
    name: "Certificate in Mechanical Draughtsman",
    duration: "1 Year",
    eligibility: "10th Pass",
    description: "Teaches drafting, CAD software, and mechanical design principles.",
    icon: PenTool
  },
  {
    name: "Mechanic Motor Vehicle (MMV)",
    duration: "1 Year",
    eligibility: "10th Pass",
    description: "Covers automobile mechanics, maintenance, and repair of motor vehicles.",
    icon: Car
  },
  {
    name: "Certificate in Electrician (CE)",
    duration: "1 Year",
    eligibility: "10th Pass",
    description: "Provides training in electrical wiring, maintenance, and repair.",
    icon: Zap
  },
  {
    name: "Certificate in Electronics",
    duration: "1 Year",
    eligibility: "10th Pass",
    description: "Covers basic electronics, circuit design, and troubleshooting.",
    icon: Cpu
  }
];

const CertificatePrograms = ({
  programTitle = "Certificate Programs",
  program = "Certificate"
}) => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-6xl mx-auto px-4 py-16 sm:py-24 flex justify-between items-center">
          <div>
            <Badge className="mb-4 bg-gray-100 text-primary hover:bg-blue-500/30">
              SBCODL
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              {programTitle}
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl">
              Comprehensive {program} programs designed to provide practical knowledge and
              skill-based learning that enhances career prospects.
            </p>
          </div>
          <button className="bg-gray-100 text-primary py-2 px-4 rounded" onClick={() => navigate('/student-admission-form')}>
            Apply Now
          </button>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-12">
        <Tabs defaultValue="overview" className="space-y-8">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-3 gap-4 bg-gray-400">
            <TabsTrigger value="overview" className="text-white">Program Overview</TabsTrigger>
            <TabsTrigger value="courses" className="text-white">All Available Courses</TabsTrigger>
            <TabsTrigger value="details" className="text-white">Program Details</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-blue-800">Introduction</h2>
                <p className="text-gray-600 leading-relaxed">
                  SBCODL offers a diverse range of certificate programs across multiple
                  disciplines, each designed to provide practical skills and industry-relevant knowledge.
                </p>
                <Alert className="bg-blue-50 border-blue-200">
                  <AlertTitle className="text-blue-800">Key Features</AlertTitle>
                  <AlertDescription className="text-blue-700">
                    All programs are one-year duration with 10th pass eligibility,
                    focusing on practical training and skill development.
                  </AlertDescription>
                </Alert>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-6 bg-gradient-to-br from-blue-50 to-white rounded-lg border border-blue-100 flex flex-col items-center text-center">
                  <Calendar className="h-8 w-8 text-blue-600 mb-2" />
                  <h3 className="font-semibold text-blue-800">1 Year Duration</h3>
                </div>
                <div className="p-6 bg-gradient-to-br from-blue-50 to-white rounded-lg border border-blue-100 flex flex-col items-center text-center">
                  <UserCheck className="h-8 w-8 text-blue-600 mb-2" />
                  <h3 className="font-semibold text-blue-800">10th Pass Eligible</h3>
                </div>
                <div className="p-6 bg-gradient-to-br from-blue-50 to-white rounded-lg border border-blue-100 flex flex-col items-center text-center">
                  <Wrench className="h-8 w-8 text-blue-600 mb-2" />
                  <h3 className="font-semibold text-blue-800">Practical Training</h3>
                </div>
                <div className="p-6 bg-gradient-to-br from-blue-50 to-white rounded-lg border border-blue-100 flex flex-col items-center text-center">
                  <GraduationCap className="h-8 w-8 text-blue-600 mb-2" />
                  <h3 className="font-semibold text-blue-800">Career Focused</h3>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="courses" className="space-y-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {certificatePrograms.map((course, index) => (
                <div key={index} className="p-6 bg-white rounded-lg shadow-sm border border-gray-100 hover:border-blue-200 transition-colors">
                  <course.icon className="h-6 w-6 text-blue-600 mb-4" />
                  <h3 className="text-lg font-semibold text-blue-800 mb-2">{course.name}</h3>
                  <div className="space-y-2 text-gray-600">
                    <p className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" /> {course.duration}
                    </p>
                    <p className="flex items-center gap-2">
                      <UserCheck className="h-4 w-4" /> {course.eligibility}
                    </p>
                    <p className="mt-4">{course.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="details" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-r from-blue-50 to-white p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-blue-800 mb-4">Admission Process</h3>
                <div className="space-y-3 text-gray-600">
                  <p>• Complete online application form</p>
                  <p>• Submit required documents</p>
                  <p>• Pay application fee</p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-white p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-blue-800 mb-4">Program Benefits</h3>
                <div className="space-y-3 text-gray-600">
                  <p>• Industry-relevant skills</p>
                  <p>• Practical training focus</p>
                  <p>• Career placement assistance</p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <Separator className="my-12" />

        <div className="text-center space-y-4">
          <h2 className="text-2xl font-semibold text-blue-800">Start Your Career Journey</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Join SBCODL's certificate programs and gain the practical skills needed for
            a successful career. Visit www.sbiea.co.in or contact our administration for
            more details.
          </p>
        </div>
      </main>
    </div>
  );
};

export default CertificatePrograms;