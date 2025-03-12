import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { ScrollArea } from "../../../components/ui/scroll-area";
import { Separator } from "../../../components/ui/separator";
import { BookOpen, GraduationCap, Globe, Users, Award } from 'lucide-react';

const InstitutionalProfile = () => {
  return (
    <div className=" mx-auto p-6 space-y-6 bg-white">
      {/* Header Section */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-primary mb-2">
          Solanki Brothers Council for Open and Distance Learning (SBCODL)
        </h1>
        <p className="text-xl text-primary">
          Pioneering Excellence in Open and Distance Education
        </p>
      </div>

      {/* Main Info Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* About Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Institutional Profile
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-md text-muted-foreground mb-4">
              SBCODL is a pioneering autonomous educational body that has been established in 2022 with the sole aim of enhancing quality education through innovative teaching methodologies. SBCODL is an ISO 9001:2015 certified institution under Section 8 of the Ministry of Corporate Affairs (MCA). It is dedicated to creating a learning environment that fosters academic excellence, inclusivity, and lifelong learning.
            </p>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Vision and Mission</h3>
                <p className="text-md">
                  SBCODL envisages becoming the world's best institution on open and distance education by imparting quality education, skills, and confidence to the learners to learn and excel in the dynamic world. Through making learning affordable, accessible, and innovative, we want to bring that extra mile for education and ensure that students can excel academically and professionally, irrespective of their geographies or socio-economic backgrounds.
                </p>
                <p className="text-md mt-4">
                  Our mission would redefine distance learning as:
                </p>
                <ul className="list-disc list-inside text-md">
                  <li> Accessibility & Inclusivity: Where education will be available to all learners regardless of their geographical regions or background, ensuring equal learning opportunities.</li>
                  <li> High-Quality Education: Structured and globally recognized programs from K-12 through higher education, promoting academic excellence.</li>
                  <li> Innovative Teaching Methods: Fully integrated with modern digital tools, interactive learning content, and personalized academic support to enhance student engagement and learning retention.</li>
                  <li> Building Strategic Global Partnerships: Establishing ties with international accrediting bodies, universities, and institutions to correspond with the highest educational standards.</li>
                  <li> Lifelong Learning and Career Development: Through skills acquisition and knowledge endowments, meeting the global competitive labor market for students, fostering professional growth, entrepreneurship, and leadership.</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Academic Programs Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GraduationCap className="h-5 w-5" />
              Academic Offerings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">K-12 Education</h3>
              <p className="text-md">
                Thorough online courses for grades Middle Programmes and Upper Programmes, using interactive and engaging learning resources.
              </p>
            </div>
            <Separator />
            <div>
              <h3 className="font-semibold mb-2">Higher Education</h3>
              <p className="text-md">
                Undergraduate, Postgraduate, and Doctoral (Ph.D.) programs in a wide range of disciplines.
              </p>
            </div>
            <Separator />
            <div>
              <h3 className="font-semibold mb-2">Specialized Degree/Certificate Programs</h3>
                <div className="pl-4 space-y-2 text-md">
                <div>
                  <p className="font-medium">Certificate in Biblical Studies:</p>
                  <p>Introduction to the Bible, Old and New Testament Foundations</p>
                </div>
                <div>
                  <p className="font-medium">Diploma in Theology:</p>
                  <p>Christian Ethics, Biblical Interpretation, and Church History</p>
                </div>
                <div>
                  <p className="font-medium">B.A. in Ministry:</p>
                  <p>Advanced Scriptural Analysis, Leadership in Ministry</p>
                </div>
                <div>
                  <p className="font-medium">M.Div. in Theology:</p>
                  <p>Apologetics, Biblical Hermeneutics, and Pastoral Counselling</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Global Memberships Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Global Memberships & Accreditations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-48">
            <ul className="space-y-2 text-md">
              <li>Partner membership The Global Education Accrediting Commission (GEAC)</li>
              <li>International Association for Biblical Education</li>
              <li>American Montessori Society</li>
              <li>Mediterranean Association of International Schools (MAIS)</li>
              <li>Association of Business Administrators of Christian Colleges</li>
              <li>Australian Boarding Schools Association</li>
              <li>Society for Mining, Metallurgy & Exploration</li>
              <li>The American Ceramic Society</li>
              <li>International Association of University Presidents (IAUP)</li>
              <li>The Council of International Schools India (TCISI)</li>
              <li>International Association for College Admission Counseling (ACAC)</li>
            </ul>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Commitment to Excellence Section */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Commitment to Excellence */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5" />
              Commitment to Excellence
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-md">
              <li>Quality training using development-appropriate methods.</li>
              <li>Strong measuring assessment frameworks to track academic progress.</li>
              <li>Comprehensive support services to ensure student success.</li>
              <li>Adequate and secure facilities and technology resources for effective learning.</li>
              <li>Sufficient and stable financial resources dedicated to continuous improvement.</li>
              <li>Through the blending of traditional educational values with modern teaching approaches, SBCODL fosters curiosity, creativity, and lifelong learning among its students, preparing them to become confident, independent thinkers ready to contribute meaningfully to society.</li>
            </ul>
          </CardContent>
        </Card>

        {/* Student-Centric Approach */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Student-Centric Approach
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-md">
              <li>Flexible learning pathways through open and distance modes.</li>
              <li>International student exchange programs for cultural and academic enrichment.</li>
              <li>Career counselling and placement assistance.</li>
              <li>Comprehensive resources for academic success and personal growth.</li>
              <li>Integration of technology to deliver engaging, interactive educational experiences.</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default InstitutionalProfile;