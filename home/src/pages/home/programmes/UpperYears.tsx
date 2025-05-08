import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs";
import { Alert, AlertTitle, AlertDescription } from "../../../components/ui/alert";
import { Badge } from "../../../components/ui/badge";
import { Separator } from "../../../components/ui/separator";
import { Book, Code, Brain, Globe, Calculator, FlaskConical } from "lucide-react";
import { useNavigate } from 'react-router-dom';

const UpperYears = ({ 
  programTitle = "Upper School Curriculum",
  grades = "Grades 9-12",
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
              A rigorous academic program designed to equip students with knowledge, skills, and competencies 
              necessary for higher education and future career paths.
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
                  The upper school program at SBCODL integrates traditional academic disciplines 
                  with modern teaching methodologies, encouraging critical thinking, problem-solving, 
                  and independent research.
                </p>
                <Alert className="bg-blue-50 border-blue-200">
                  <AlertTitle className="text-blue-800">Program Highlights</AlertTitle>
                  <AlertDescription className="text-blue-700">
                    Our curriculum combines rigorous academics with innovative learning approaches, 
                    preparing students for college and professional careers.
                  </AlertDescription>
                </Alert>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-6 bg-gradient-to-br from-blue-50 to-white rounded-lg border border-blue-100 flex flex-col items-center text-center">
                  <Brain className="h-8 w-8 text-blue-600 mb-2" />
                  <h3 className="font-semibold text-blue-800">Advanced Studies</h3>
                </div>
                <div className="p-6 bg-gradient-to-br from-blue-50 to-white rounded-lg border border-blue-100 flex flex-col items-center text-center">
                  <Globe className="h-8 w-8 text-blue-600 mb-2" />
                  <h3 className="font-semibold text-blue-800">College Prep</h3>
                </div>
                <div className="p-6 bg-gradient-to-br from-blue-50 to-white rounded-lg border border-blue-100 flex flex-col items-center text-center">
                  <Code className="h-8 w-8 text-blue-600 mb-2" />
                  <h3 className="font-semibold text-blue-800">Tech Integration</h3>
                </div>
                <div className="p-6 bg-gradient-to-br from-blue-50 to-white rounded-lg border border-blue-100 flex flex-col items-center text-center">
                  <Book className="h-8 w-8 text-blue-600 mb-2" />
                  <h3 className="font-semibold text-blue-800">Research Focus</h3>
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
                  <li>English Literature & Composition</li>
                  <li>Second Language Options</li>
                  <li>Research Methodologies</li>
                </ul>
              </div>

              <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-100 hover:border-blue-200 transition-colors">
                <Calculator className="h-6 w-6 text-blue-600 mb-4" />
                <h3 className="text-lg font-semibold text-blue-800 mb-2">Mathematics</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>Advanced Algebra & Calculus</li>
                  <li>Statistics & Probability</li>
                  <li>Mathematical Modeling</li>
                </ul>
              </div>

              <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-100 hover:border-blue-200 transition-colors">
                    <FlaskConical className="h-6 w-6 text-blue-600 mb-4" />
                <h3 className="text-lg font-semibold text-blue-800 mb-2">Sciences</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>Physics & Chemistry</li>
                  <li>Biology & Biotechnology</li>
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
                  <p>• Fine Arts: Painting, sculpture, digital art</p>
                  <p>• Music: Theory, composition, instrumental practice</p>
                  <p>• Drama and Theatre: Acting, scriptwriting, production</p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-white p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-blue-800 mb-4">Business & Commerce</h3>
                <div className="space-y-3 text-gray-600">
                  <p>• Business Studies: Marketing, management</p>
                  <p>• Accounting and Finance</p>
                  <p>• Entrepreneurship Programs</p>
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
                  <p className="text-gray-600">Regular quizzes, assignments, oral presentations</p>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">Summative Assessments</h4>
                  <p className="text-gray-600">Term-end exams, research projects, dissertations</p>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">University Preparation</h4>
                  <p className="text-gray-600">SAT/ACT prep, college counseling, career workshops</p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <Separator className="my-12" />

        <div className="text-center space-y-4">
          <h2 className="text-2xl font-semibold text-blue-800">Ready to Excel?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Join SBCODL's upper school program and prepare for success in college and beyond 
            through our comprehensive curriculum and innovative learning approaches.
          </p>
        </div>
      </main>
    </div>
  );
};

export default UpperYears;