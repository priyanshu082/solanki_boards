import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { Alert, AlertTitle, AlertDescription } from "../../components/ui/alert";
import { Separator } from "../../components/ui/separator";
import { GraduationCap, BookOpen, Users, Globe, School, Cross } from "lucide-react";

const Faculty = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-6xl mx-auto px-4 py-16 sm:py-24 flex justify-between items-center">
          <div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Faculty at SBCODL
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl">
              World-class education delivered by distinguished lecturers and experienced educators
            </p>
          </div>
          <button className="bg-gray-100 text-primary py-2 px-4 rounded">
            Contact Us
          </button>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-12">
        <Tabs defaultValue="overview" className="space-y-8">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-3 gap-4 bg-gray-400">
            <TabsTrigger value="overview" className="text-white">Faculty Overview</TabsTrigger>
            <TabsTrigger value="divisions" className="text-white">Major Divisions</TabsTrigger>
            <TabsTrigger value="admissions" className="text-white">Ph.D. Admissions</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8">
            <div className="prose max-w-none">
              <h2 className="text-2xl font-semibold text-blue-800 mb-4">Faculty of Distance Learning at SBCODL</h2>
              <p className="text-gray-600">
                At the Solanki Brothers Council for Open and Distance Learning (SBCODL), we are proud to offer 
                a diverse range of dynamic educational programs. As a prestigious and internationally recognized institution, 
                SBCODL delivers world-class education for K-12 learners and higher degree programs. Our faculty comprises 
                distinguished lecturers, experienced educators, and dedicated professors who bring passion and expertise 
                to every learning experience.
              </p>
            </div>
          </TabsContent>

          <TabsContent value="divisions" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "Management",
                  description: "Expert faculty imparts advanced knowledge in management practices, business strategies, and marketing techniques, empowering students with essential skills to thrive in the competitive corporate landscape.",
                  icon: Users
                },
                {
                  title: "Computer Science",
                  description: "Students pursuing degrees such as BCA, MCA, and other tech-focused programs benefit from specialized faculty guidance, fostering innovation and critical thinking for the digital age.",
                  icon: Globe
                },
                {
                  title: "Mass Communication",
                  description: "Our dedicated faculty prepares students for impactful careers in media, journalism, and communication, emphasizing hands-on training across print, digital, and broadcast platforms.",
                  icon: School
                },
                {
                  title: "Arts",
                  description: "The Arts faculty provides a diverse and enriching learning environment, fostering creativity and excellence across a wide array of disciplines, including visual arts, literature, and performing arts.",
                  icon: BookOpen
                },
                {
                  title: "Commerce",
                  description: "Our Commerce faculty equips students with critical knowledge in accounting, finance, and corporate operations, preparing them for leadership roles in a globally interconnected economy.",
                  icon: GraduationCap
                },
                {
                  title: "Christian Studies",
                  description: "Our faculty guides students in Christian Ethics, Biblical Interpretation, and Church History to nurture theological understanding and leadership in faith-based contexts.",
                  icon: Cross
                }
              ].map((faculty, index) => (
                <div key={index} className="p-6 bg-gradient-to-br from-blue-50 to-white rounded-lg border border-blue-100">
                  <faculty.icon className="h-8 w-8 text-blue-600 mb-2" />
                  <h3 className="font-semibold text-blue-800 mb-2">{faculty.title}</h3>
                  <p className="text-gray-600 text-sm">{faculty.description}</p>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="admissions" className="space-y-6">
            <Alert className="bg-blue-50 border-blue-200">
              <AlertTitle className="text-blue-800">Ph.D. Admissions - Session 2025</AlertTitle>
              <AlertDescription className="text-blue-700">
                Applications are invited for admission to Ph.D. programs in various faculties
              </AlertDescription>
            </Alert>

            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="text-xl font-semibold text-blue-800 mb-4">How to Apply</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• By Post: Send completed application form with required documents</li>
                  <li>• Online: Visit the official website to complete the application process</li>
                  <li>• In Person: Visit the institutional campus for on-site registration</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="text-xl font-semibold text-blue-800 mb-4">Application Fee</h3>
                <p className="text-gray-600">Application Processing & Entrance Test Fee: Rs. 3,500/-</p>
                <p className="text-gray-600 mt-2">Payment through DD in favor of "Solanki Brothers Council for Open and Distance Learning" payable at Farrukhabad</p>
              </div>

              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="text-xl font-semibold text-blue-800 mb-4">Available Seats by Department</h3>
                <div className="space-y-2">
                  {[
                    "Management", "Geography", "History", "Christian Studies",
                    "English", "Education", "Political Science"
                  ].map((dept, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-blue-50 rounded">
                      <span className="text-blue-800">{dept}</span>
                      <span className="font-semibold text-blue-600">30 Seats</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <Separator className="my-12" />

        <div className="text-center space-y-4">
          <h2 className="text-2xl font-semibold text-blue-800">Join Our Academic Community</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            At SBCODL, we are committed to fostering academic excellence, personal growth, and professional success, 
            empowering students to become changemakers in their respective fields.
          </p>
        </div>
      </main>
    </div>
  );
};

export default Faculty;