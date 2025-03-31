import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRecoilState } from 'recoil';
import { admissionFormState } from '@/store/atoms/formDataAtoms';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {  InterfaceSubject } from '@/lib/Interfaces';

const SubjectForm = ({courses}:any) => {
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [formData, setFormData] = useRecoilState(admissionFormState);
  
  // Use the course passed from props directly
  const availableSubjects = courses?.subjects || [];

  // Handle when course changes
  useEffect(() => {
    // Reset selected subjects when course changes
    setSelectedSubjects([]);
    
    // Update form data to clear previous subject selections
    setFormData(prevData => ({
      ...prevData,
      subjectIds: []
    }));
  }, [formData.courseId, setFormData]);

  const handleSubjectChange = (subjectId: string) => {
    setSelectedSubjects(prevSelected => 
      prevSelected.includes(subjectId)
        ? prevSelected.filter(id => id !== subjectId)
        : [...prevSelected, subjectId]
    );
  };

  const handleAddSubjects = () => {
    // Update the subjectIds in the main form data
    setFormData(prevData => ({
      ...prevData,
      subjectIds: selectedSubjects
    }));
  };

  return (
    <Card className="w-full mx-auto">
      <CardHeader>
        <CardTitle className="text-xl">Select Subjects</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {!courses ? (
            <div className="text-center p-4 border rounded-lg">
              <p className="text-gray-500">Please select a course first to view available subjects</p>
            </div>
          ) : (
            <>
              <div className="border rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-4">Available Subjects for {courses.name}</h3>
                {availableSubjects.length === 0 ? (
                  <p className="text-gray-500">No subjects available for this course</p>
                ) : (
                  <div className="space-y-2">
                    {availableSubjects.map((subject:InterfaceSubject) => (
                      <div key={subject.id} className="flex items-center space-x-2">
                        <input 
                          type="checkbox"
                          id={subject.id}
                          value={subject.id}
                          checked={selectedSubjects.includes(subject.id)}
                          onChange={() => handleSubjectChange(subject.id)}
                          className="h-4 w-4"
                        />
                        <label htmlFor={subject.id} className="text-sm">
                          {subject.name.toUpperCase()} ({subject.type}) 
                          {subject.fees}
                        </label>
                      </div>
                    ))}
                  </div>
                )}
                <Button 
                  onClick={handleAddSubjects} 
                  className="mt-4"
                  disabled={selectedSubjects.length === 0}
                >
                  Add Selected Subjects
                </Button>
              </div>

              {/* Display currently selected subjects from form data */}
              {formData.subjectIds.length > 0 && (
                <div className="border rounded-lg p-4">
                  <h3 className="text-lg font-semibold mb-4">Selected Subjects</h3>
                  <div className="space-y-2">
                    {availableSubjects
                      .filter((subject:InterfaceSubject) => formData.subjectIds.includes(subject.id))
                      .map((subject:InterfaceSubject) => (
                        <div key={subject.id} className="flex justify-between items-center">
                          <span className="text-sm">{subject.name} ({subject.type})</span>
                          {subject.fees && <span className="text-sm font-medium">₹{subject.fees}</span>}
                        </div>
                      ))
                    }
                  </div>
                  <div className="mt-4 pt-2 border-t">
                    <div className="flex justify-between font-medium">
                      <span>Total Fees:</span>
                      <span>
                        ₹{availableSubjects
                          .filter((subject:InterfaceSubject) => formData.subjectIds.includes(subject.id))
                          .reduce((total:number, subject:InterfaceSubject) => total + (subject.fees || 0), 0)
                        }
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default SubjectForm;