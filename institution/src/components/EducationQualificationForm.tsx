import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const EducationQualificationForm = () => {
  const educationLevels = [
    { level: "10th", label: "10th Standard" },
    { level: "12th", label: "12th Standard" },
    { level: "other", label: "Other Qualification" }
  ];

  return (
    <Card className="w-[80vw]  mx-auto">
      <CardHeader>
        <CardTitle className="text-xl">Educational Qualification Form</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {educationLevels.map((education) => (
            <div key={education.level} className="border rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-4">{education.label}</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Subjects Section */}
                <div className="space-y-2">
                  <Label htmlFor={`subjects-${education.level}`}>Subjects</Label>
                  <Input 
                    id={`subjects-${education.level}`}
                    placeholder="Enter subjects"
                  />
                </div>

                {/* Year of Passing */}
                <div className="space-y-2">
                  <Label htmlFor={`year-${education.level}`}>Year of Passing</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select year" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - i).map((year) => (
                        <SelectItem key={year} value={year.toString()}>
                          {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* University/Board */}
                <div className="space-y-2">
                  <Label htmlFor={`board-${education.level}`}>University/Board</Label>
                  <Input 
                    id={`board-${education.level}`}
                    placeholder="Enter board name"
                  />
                </div>

                {/* Division/Grade */}
                <div className="space-y-2">
                  <Label htmlFor={`grade-${education.level}`}>Division/Grade</Label>
                  <Input 
                    id={`grade-${education.level}`}
                    placeholder="Enter grade"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default EducationQualificationForm;