import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
// import { ScrollArea } from "@/components/ui/scroll-area";
import SBCODLAdditionalSections from "../components/SBCODLAdditionalSections";
import campus from "../assets/images/img10.jpeg"
import board from "../assets/images/img12.jpeg"

const WhySBCODL = () => {
  return (
    <div className=" mx-auto px-4 pt-8 bg-white text-white">
      {/* Hero Section */}
      <div className="relative w-full h-64 mb-8 bg-blue-100 rounded-lg overflow-hidden">
        <img 
          src={campus} 
          alt="SBCODL Campus"
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <h1 className="text-4xl font-bold text-white text-center">
            Solanki Brothers Council for Open and Distance Learning
          </h1>
        </div>
      </div>

      {/* Board Profile Section */}
      <Card className="mb-8">
        <CardHeader >
          <CardTitle>Board Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <p >
                Established in 2022, the Solanki Brothers Council for Open and Distance Learning (SBCODL) 
                is a pioneering autonomous educational body committed to advancing quality education through 
                innovative teaching methodologies. As an ISO 9001:2015 certified institute operating under 
                Section 8 of the Companies Act, 2013, SBCODL is dedicated to fostering a learning environment 
                that promotes academic excellence, inclusivity, and lifelong learning.
              </p>
            </div>
            <div className="relative h-48">
              <img 
                src={board} 
                alt="Board Members"
                className="rounded-lg object-cover w-full h-full"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Vision and Mission */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Vision</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="">
              SBCODL envisions becoming a global leader in open and distance education, 
              empowering students with the knowledge, skills, and confidence to succeed 
              in a dynamic world.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Mission</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="">
              To bridge educational gaps and provide quality education accessible to all learners, 
              irrespective of geographical or socioeconomic constraints.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Global Recognition */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Global Recognition and Memberships</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              "American Montessori Society",
              "Association of Business Administrators of Christian Colleges",
              "Australian Boarding Schools Association",
              "Mediterranean Association of International Schools (MAIS)",
              "Global Education Accrediting Commission (GEAC)",
              "Society for Mining, Metallurgy & Exploration",
              "The American Ceramic Society",
              "International Association of University Presidents (IAUP)",
              "The Council of International Schools India (TCISI)",
              "International Association for College Admission Counseling (ACAC)"
            ].map((membership, index) => (
              <Badge key={index} variant="secondary" className="p-2 text-center">
                {membership}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Why Choose SBCODL */}
      <Card>
        <CardHeader>
          <CardTitle>Why Choose SBCODL?</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Global Standards",
                description: "Adherence to internationally recognized academic practices"
              },
              {
                title: "Diverse Programs",
                description: "A wide range of academic and skill-based courses"
              },
              {
                title: "International Memberships",
                description: "Partnerships with leading global educational organizations"
              },
              {
                title: "Student Support",
                description: "Comprehensive resources for academic success and personal growth"
              },
              {
                title: "Innovative Learning",
                description: "Integration of technology to deliver engaging, interactive educational experiences"
              }
            ].map((reason, index) => (
              <Card key={index} className="bg-secondary">
                <CardHeader>
                  <CardTitle className="text-lg ">{reason.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="">{reason.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
        <SBCODLAdditionalSections/>
    </div>
  );
};

export default WhySBCODL;