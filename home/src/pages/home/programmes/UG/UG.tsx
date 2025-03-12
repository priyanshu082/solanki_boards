import { Link } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../../../../components/ui/card";
import { Badge } from "../../../../components/ui/badge";
import { GraduationCap, Clock, IndianRupee } from 'lucide-react';
import { UGprograms } from '../../../../data/course';
import { UGCourse } from '../../../../lib/Types/Courses';

// Define the types for the course data

const UG = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-center text-primary">Our Undergraduate programmes</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {(UGprograms as unknown as UGCourse[]).map((course) => (
            <Link to={`/ugcourse/${course.id}`} key={course.id}>
              <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer h-full">
                <img 
                  src={course.image} 
                  alt={course.name}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-xl font-bold text-blue-400">
                      {course.name}
                    </CardTitle>
                    <Badge variant="secondary">
                      {course.mode}
                    </Badge>
                  </div>
                  <CardDescription className="mt-2">
                    {course.institution}
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-gray-200 line-clamp-2">
                      {course.overview}
                    </p>
                    
                    <div className="grid grid-cols-3 gap-4 mt-4">
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-gray-500" />
                        <span className="text-sm">{typeof course.duration === 'string' ? course.duration : `${course.duration.minimum} to ${course.duration.maximum}`}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <GraduationCap className="w-4 h-4 text-gray-500" />
                        <span className="text-sm">{course.curriculum.firstYear.subjects.length} Subjects/Year</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <IndianRupee className="w-4 h-4 text-gray-500" />
                        <span className="text-sm">
                          {course.annualFee ? `₹${course.annualFee.toLocaleString()}/year` : 'Contact for fees'}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-4">
                      {course.features.map((feature, idx) => (
                        <Badge key={idx} variant="outline" className="bg-blue-50 text-primary">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UG;