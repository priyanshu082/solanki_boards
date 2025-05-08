import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs";
import { Alert, AlertTitle, AlertDescription } from "../../../components/ui/alert";
import { Badge } from "../../../components/ui/badge";
import { Separator } from "../../../components/ui/separator";
import { GraduationCap, BookOpen, Users, Globe, School, Cross } from "lucide-react";
import { useNavigate } from 'react-router-dom';

const Research = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-6xl mx-auto px-4 py-16 sm:py-24 flex justify-between items-center">
          <div>
            <Badge className="mb-4 bg-gray-100 text-primary hover:bg-blue-500/30">
              Research Studies Program
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Research Studies at SBCODL
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl">
              Pursue the highest academic qualification through rigorous study and original research
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
            <TabsTrigger value="structure" className="text-white">Program Structure</TabsTrigger>
            <TabsTrigger value="specializations" className="text-white">Specializations</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8">
            <div className="prose max-w-none">
              <h2 className="text-2xl font-semibold text-blue-800 mb-4">Research Studies Program</h2>
              <p className="text-gray-600">
                The SBCODL Research Studies Program is equivalent to a Ph.D. and represents the highest academic qualification awarded following rigorous study and original research. Our program is designed to cultivate expertise in research methodologies, critical thinking, and academic writing.
              </p>
              
              <div className="bg-blue-50 p-6 rounded-lg mt-6">
                <h3 className="text-xl font-semibold text-blue-800 mb-4">Eligibility Criteria</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Master's degree in relevant discipline from recognized institution</li>
                  <li>• Minimum 55% aggregate marks or equivalent grade</li>
                  <li>• Prior research experience may be required for some specializations</li>
                </ul>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                {[
                  {
                    title: "Expert Faculty",
                    description: "Guidance from experienced academicians and researchers",
                    icon: Users
                  },
                  {
                    title: "Global Recognition",
                    description: "International educational organization memberships",
                    icon: Globe
                  },
                  {
                    title: "Research Support",
                    description: "Access to digital libraries and research software",
                    icon: School
                  },
                  {
                    title: "Publication Focus",
                    description: "Support for publishing in peer-reviewed journals",
                    icon: BookOpen
                  },
                  {
                    title: "Flexible Learning",
                    description: "Designed for working professionals",
                    icon: GraduationCap
                  },
                  {
                    title: "Interdisciplinary",
                    description: "Cross-disciplinary research opportunities",
                    icon: Cross
                  }
                ].map((feature, index) => (
                  <div key={index} className="p-6 bg-gradient-to-br from-blue-50 to-white rounded-lg border border-blue-100">
                    <feature.icon className="h-8 w-8 text-blue-600 mb-2" />
                    <h3 className="font-semibold text-blue-800 mb-2">{feature.title}</h3>
                    <p className="text-gray-600 text-sm">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="structure" className="space-y-6">
            <Alert className="bg-blue-50 border-blue-200">
              <AlertTitle className="text-blue-800">Program Duration: 3-5 Years</AlertTitle>
              <AlertDescription className="text-blue-700">
                Structured approach with coursework, research, and dissertation phases
              </AlertDescription>
            </Alert>

            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="text-xl font-semibold text-blue-800 mb-4">Program Phases</h3>
                <ul className="space-y-4 text-gray-600">
                  <li className="flex gap-4">
                    <span className="font-semibold">Year 1:</span>
                    <span>Coursework including Research Methodology, Academic Writing, and Ethics</span>
                  </li>
                  <li className="flex gap-4">
                    <span className="font-semibold">Year 2-3:</span>
                    <span>Independent Research and Dissertation Writing</span>
                  </li>
                  <li className="flex gap-4">
                    <span className="font-semibold">Final Year:</span>
                    <span>Thesis Submission and Defense</span>
                  </li>
                </ul>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="specializations" className="space-y-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="text-xl font-semibold text-blue-800 mb-4">Research Areas</h3>
              <div className="space-y-2">
                {[
                  "Business & Management",
                  "Humanities & Social Sciences",
                  "Science & Technology",
                  "Health Sciences",
                  "Legal Studies",
                  "Theological & Ministry Studies",
                  "Interdisciplinary Studies"
                ].map((dept, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-blue-50 rounded">
                    <span className="text-blue-800">{dept}</span>
                    <span className="font-semibold text-blue-600">Available</span>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <Separator className="my-12" />

        <div className="text-center space-y-4">
          <h2 className="text-2xl font-semibold text-blue-800">Begin Your Research Journey</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Join SBCODL's research community and make significant contributions to your field through advanced research and academic excellence.
          </p>
        </div>
      </main>
    </div>
  );
};

export default Research;