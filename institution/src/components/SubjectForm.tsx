import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRecoilState } from 'recoil';
import { admissionFormState, subjectsAtom } from '@/store/atoms/formDataAtoms';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

const SubjectForm = () => {
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [formData, setFormData] = useRecoilState(admissionFormState);
  //@ts-ignore
  const [subjectsList, setSubjectsList] = useRecoilState(subjectsAtom);

  // Dummy subjects data with IDs
  const subjects = [
    { id: 'subject-1', name: 'Mathematics' },
    { id: 'subject-2', name: 'Physics' },
    { id: 'subject-3', name: 'Chemistry' },
    { id: 'subject-4', name: 'Biology' },
    { id: 'subject-5', name: 'English' },
  ];

  // Fetch subjects based on the selected course
  useEffect(() => {
    // TODO: Replace with actual API call to fetch subjects based on formData.courseId
    console.log(`Fetching subjects for course ID: ${formData.courseId}`);
  }, [formData.courseId]);

  const handleSubjectChange = (subjectId: string) => {
    setSelectedSubjects(prevSelected => 
      prevSelected.includes(subjectId)
        ? prevSelected.filter(id => id !== subjectId)
        : [...prevSelected, subjectId]
    );
  };

  const handleAddSubjects = () => {
    // Update both atoms
    setSubjectsList(
      subjects.filter(subject => selectedSubjects.includes(subject.id))
    );
    
    // Update the subjectIds in the main form data
    setFormData(prevData => ({
      ...prevData,
      subjectIds: selectedSubjects
    }));

    // Reset selected subjects after adding
    setSelectedSubjects([]);
  };

  return (
    <Card className="w-full mx-auto">
      <CardHeader>
        <CardTitle className="text-xl">Select Subjects</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="border rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-4">Available Subjects</h3>
            <div className="space-y-2">
              {subjects.map(({ id, name }) => (
                <div key={id} className="flex items-center space-x-2">
                  <input 
                    type="checkbox"
                    id={id}
                    value={id}
                    checked={selectedSubjects.includes(id)}
                    onChange={() => handleSubjectChange(id)}
                    className="h-4 w-4"
                  />
                  <label htmlFor={id} className="text-sm">{name}</label>
                </div>
              ))}
            </div>
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
                {subjects
                  .filter(subject => formData.subjectIds.includes(subject.id))
                  .map(subject => (
                    <div key={subject.id} className="text-sm">
                      {subject.name}
                    </div>
                  ))
                }
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default SubjectForm;