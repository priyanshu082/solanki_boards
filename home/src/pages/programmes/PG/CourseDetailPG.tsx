import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs";
import { Progress } from "../../../components/ui/progress";
import { Badge } from "../../../components/ui/badge";
import { 
  GraduationCap, 
  Clock, 
  IndianRupee, 
  BookOpen, 
  CheckCircle2,
  Layout,
  Code,
  Network
} from 'lucide-react';
import { PGCourse } from '../../../lib/types';
import { PGprograms } from '../../../data/course';

type YearKey = 'firstYear' | 'secondYear';

const CourseDetails = () => {
  const { id } = useParams();
  console.log(id);  
  const [activeYear, setActiveYear] = useState(1);
  
  const program = PGprograms.find(course => course.id === id || '') as unknown as PGCourse;  

  if (!program) {
    return <div>Course not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 text-primary">
      {/* Hero Section */}
      <div className="bg-gradient-to-r bg-primary text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">{program.programInfo.name}</h1>
          <p className="text-xl opacity-90">{program.programInfo.institution}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
            <div className="flex items-center space-x-3">
              <Clock className="w-6 h-6" />
              <div>
                <p className="text-sm opacity-75">Duration</p>
                <p className="font-semibold">
                  {typeof program.programInfo.duration === 'string' 
                    ? program.programInfo.duration 
                    : `${program.programInfo.duration.minimum} to ${program.programInfo.duration.maximum}`}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <IndianRupee className="w-6 h-6" />
              <div>
                <p className="text-sm opacity-75">Annual Fee</p>
                <p className="font-semibold">₹{program.programInfo.annualFee.toLocaleString()}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <GraduationCap className="w-6 h-6" />
              <div>
                <p className="text-sm opacity-75">Eligibility</p>
                <p className="font-semibold">{program.programInfo.eligibility}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <BookOpen className="w-6 h-6" />
              <div>
                <p className="text-sm opacity-75">Program Objectives</p>
                <p className="font-semibold">{program.programObjectives[0]}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <Tabs defaultValue="overview" className="space-y-8">
          <TabsList className="grid w-full grid-cols-1 md:grid-cols-4 lg:max-w-[600px] bg-gray-400 text-primary font-bold">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
            <TabsTrigger value="careers">Careers</TabsTrigger>
            <TabsTrigger value="features">Features</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-2xl font-semibold mb-4">Program Objectives</h2>
              <ul className="list-disc pl-5 space-y-2">
                {program.programObjectives.map((objective, index) => (
                  <li key={index} className="text-gray-700">{objective}</li>
                ))}
              </ul>
            </div>
          </TabsContent>

          <TabsContent value="curriculum">
            <div className="space-y-6">
              {/* Year Selection */}
              <div className="flex space-x-4">
                {[1, 2].map(year => (
                  <button
                    key={year}
                    onClick={() => setActiveYear(year)}
                    className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                      activeYear === year 
                        ? 'bg-primary text-white' 
                        : 'bg-white text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    Year {year}
                  </button>
                ))}
              </div>

              {/* Subjects Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {program.curriculum[`${['first', 'second'][activeYear-1]}Year` as YearKey].map((subject) => (
                  <div key={subject.courseCode} className="bg-white p-6 rounded-lg shadow-sm">
                    <Badge variant="outline" className="mb-3 text-primary">{subject.courseCode}</Badge>
                    <h3 className="font-medium text-lg mb-2">{subject.subjectName}</h3>
                    <div className="flex items-center text-sm text-gray-600">
                      <Progress value={100} className="h-2 w-16 mr-2" />
                      Credits: {subject.credits}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="careers">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {program.careerOpportunities.map((role, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-sm flex items-start space-x-4">
                  {[Code, Layout, Network][index % 3] && 
                    React.createElement([Code, Layout, Network][index % 3], {
                      className: "w-6 h-6 text-blue-600 mt-1"
                    })
                  }
                  <div>
                    <h3 className="font-medium mb-2">{role}</h3>
                    <p className="text-sm text-gray-600">
                      Career opportunities in this field
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="features">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {program.keyFeatures.map((feature, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="flex items-center space-x-3 mb-4">
                    <CheckCircle2 className="w-6 h-6 text-green-500" />
                    <h3 className="font-medium text-lg">{feature}</h3>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Disclaimer */}
        <div className="mt-12 bg-gray-50 border border-gray-200 rounded-lg p-6">
          <h3 className="font-medium mb-2">Disclaimer</h3>
          <p className="text-sm text-gray-600">
            The information provided is subject to change. Please verify all details with the institution.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;