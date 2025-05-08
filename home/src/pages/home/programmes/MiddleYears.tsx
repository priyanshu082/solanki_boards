
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs";
import { Alert, AlertTitle, AlertDescription } from "../../../components/ui/alert";
import { Badge } from "../../../components/ui/badge";
import { Separator } from "../../../components/ui/separator";
import { Book, Code, Brain, Globe, Microscope } from "lucide-react";
import { useNavigate } from 'react-router-dom';
const MiddleYears = ({ 
  programTitle = "Middle School Curriculum",
  grades = "Grades 6-8",
  program = "Middle School"
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
              {grades}
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              {programTitle}
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl">
              A comprehensive {program} program designed to engage students in a dynamic 
              and interactive learning environment, bridging elementary education and high school.
            </p>
          </div>
          <button className=" bg-gray-100 text-primary py-2 px-4 rounded" onClick={() => navigate('/student-admission-form')}>
            Registration
          </button>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-12">
        <Tabs defaultValue="overview" className="space-y-8">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 gap-4 bg-gray-400">
            <TabsTrigger value="overview" className="text-white">Program Overview</TabsTrigger>
            <TabsTrigger value="curriculum" className="text-white">Core Curriculum</TabsTrigger>
            <TabsTrigger value="electives" className="text-white">Electives</TabsTrigger>
            <TabsTrigger value="assessment" className="text-white">Assessment</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-blue-800">Introduction</h2>
                <p className="text-gray-600 leading-relaxed">
                  The middle school program at SBCODL serves as a bridge between elementary 
                  education and high school, focusing on academic development, critical thinking, 
                  and personal growth.
                </p>
                <Alert className="bg-blue-50 border-blue-200">
                  <AlertTitle className="text-blue-800">Program Highlights</AlertTitle>
                  <AlertDescription className="text-blue-700">
                    Our curriculum integrates traditional subjects with innovative learning 
                    methodologies, ensuring students are well-prepared for advanced studies.
                  </AlertDescription>
                </Alert>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-6 bg-gradient-to-br from-blue-50 to-white rounded-lg border border-blue-100 flex flex-col items-center text-center">
                  <Brain className="h-8 w-8 text-blue-600 mb-2" />
                  <h3 className="font-semibold text-blue-800">Critical Thinking</h3>
                </div>
                <div className="p-6 bg-gradient-to-br from-blue-50 to-white rounded-lg border border-blue-100 flex flex-col items-center text-center">
                  <Globe className="h-8 w-8 text-blue-600 mb-2" />
                  <h3 className="font-semibold text-blue-800">Global Perspective</h3>
                </div>
                <div className="p-6 bg-gradient-to-br from-blue-50 to-white rounded-lg border border-blue-100 flex flex-col items-center text-center">
                  <Code className="h-8 w-8 text-blue-600 mb-2" />
                  <h3 className="font-semibold text-blue-800">Digital Skills</h3>
                </div>
                <div className="p-6 bg-gradient-to-br from-blue-50 to-white rounded-lg border border-blue-100 flex flex-col items-center text-center">
                  <Book className="h-8 w-8 text-blue-600 mb-2" />
                  <h3 className="font-semibold text-blue-800">Academic Excellence</h3>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="curriculum" className="space-y-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-100 hover:border-blue-200 transition-colors">
                <Book className="h-6 w-6 text-blue-600 mb-4" />
                <h3 className="text-lg font-semibold text-blue-800 mb-2">Language Arts</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>English Language & Literature</li>
                  <li>Second Language Options</li>
                  <li>Grammar & Composition</li>
                </ul>
              </div>

              <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-100 hover:border-blue-200 transition-colors">
                <Brain className="h-6 w-6 text-blue-600 mb-4" />
                <h3 className="text-lg font-semibold text-blue-800 mb-2">Mathematics</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>Pre-algebra & Algebra</li>
                  <li>Geometry & Statistics</li>
                  <li>Problem Solving</li>
                </ul>
              </div>

              <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-100 hover:border-blue-200 transition-colors">
                <Microscope className="h-6 w-6 text-blue-600 mb-4" />
                <h3 className="text-lg font-semibold text-blue-800 mb-2">Science</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>Physical Science</li>
                  <li>Life Science</li>
                  <li>Earth & Space Science</li>
                </ul>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="electives" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-r from-blue-50 to-white p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-blue-800 mb-4">Arts and Humanities</h3>
                <div className="space-y-3 text-gray-600">
                  <p>• Visual arts: Drawing, painting, sculpture</p>
                  <p>• Performing arts: Music, drama, dance</p>
                  <p>• Literature studies and creative writing</p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-white p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-blue-800 mb-4">Physical Education</h3>
                <div className="space-y-3 text-gray-600">
                  <p>• Sports and fitness activities</p>
                  <p>• Health and nutrition education</p>
                  <p>• Mental well-being practices</p>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="assessment" className="space-y-6">
            <div className="bg-white p-6 rounded-lg border border-gray-100">
              <h3 className="text-xl font-semibold text-blue-800 mb-4">Evaluation Process</h3>
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">Formative Assessments</h4>
                  <p className="text-gray-600">Regular quizzes, class participation, assignments</p>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">Summative Assessments</h4>
                  <p className="text-gray-600">End-of-term exams, projects, presentations</p>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">Skill-based Evaluation</h4>
                  <p className="text-gray-600">Practical applications, coding exercises, artistic creations</p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <Separator className="my-12" />

        <div className="text-center space-y-4">
          <h2 className="text-2xl font-semibold text-blue-800">Ready to Begin Your Journey?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Join SBCODL's middle school program and embark on a comprehensive educational 
            journey that prepares students for success in high school and beyond.
          </p>
        </div>
      </main>
    </div>
  );
};

export default MiddleYears;