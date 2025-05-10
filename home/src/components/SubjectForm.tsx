import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { useRecoilState } from 'recoil';
import { admissionFormState } from '../Atoms/FormDataAtoms';
import { staticDataAtoms, SubjectType } from '../Atoms/staticDataAtoms';
import { useState, useEffect } from 'react';
import axios from "axios";
import { fetchAllSubjectsByCourseIdUrl } from "../data/config";

// Add prop type for setIsDeclarationComplete
interface SubjectFormProps {
  setIsDeclarationComplete?: (complete: boolean) => void;
}

const SubjectForm = ({ setIsDeclarationComplete }: SubjectFormProps) => {
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [formData, setFormData] = useRecoilState(admissionFormState);
  const [subjectsList, setSubjectsList] = useRecoilState(staticDataAtoms.subjectsAtom);
  // Add state for declaration
  const [declarationChecked, setDeclarationChecked] = useState(false);
  const [declarationName, setDeclarationName] = useState('');

  // Fetch subjects based on the selected course
  useEffect(() => {
    // TODO: Replace with actual API call to fetch subjects based on formData.courseId
    // console.log(`Fetching subjects for course ID: ${formData.courseId}`);
    const getSubjects = async () => {
      const response = await axios.post(fetchAllSubjectsByCourseIdUrl, {
        courseId: formData.courseId
      });

      if (response.status === 200) {
        setSubjectsList(response.data);
      }
    }
    getSubjects();
  }, [formData.courseId, setSubjectsList]);

  const handleSubjectChange = (subjectId: string) => {
    setSelectedSubjects(prevSelected => {
      const newSelected = prevSelected.includes(subjectId)
        ? prevSelected.filter(id => id !== subjectId)
        : [...prevSelected, subjectId];

      // Update the subjectIds in the main form data
      setFormData(prevData => ({
        ...prevData,
        subjectIds: newSelected
      }));

      return newSelected;
    });
  };

  const groupSubjectsByType = (subjects: typeof subjectsList) => {
    const grouped = {
      [SubjectType.LANGUAGE]: subjects.filter(subject => subject.type === SubjectType.LANGUAGE),
      [SubjectType.NON_LANGUAGE]: subjects.filter(subject => subject.type === SubjectType.NON_LANGUAGE),
      [SubjectType.VOCATIONAL]: subjects.filter(subject => subject.type === SubjectType.VOCATIONAL),
    };
    return grouped;
  };

  // Format subject type for display
  const formatSubjectType = (type: SubjectType) => {
    return type.split('_').map(word =>
      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    ).join(' ');
  };

  const groupedSubjects = groupSubjectsByType(subjectsList);
  const selectedSubjectsGrouped = groupSubjectsByType(
    subjectsList.filter(subject => formData.subjectIds.includes(subject.id))
  );

  useEffect(() => {
    if (setIsDeclarationComplete) {
      setIsDeclarationComplete(declarationChecked && !!declarationName.trim());
    }
  }, [declarationChecked, declarationName, setIsDeclarationComplete]);

  return (
    <Card className="w-full mx-auto bg-white rounded-lg shadow-md text-primary">
      <CardHeader>
        <CardTitle className="text-xl">Select Subjects</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="border rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-4">Available Subjects</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {Object.entries(groupedSubjects).map(([type, subjects]) => (
                <div key={type} className="border rounded p-3">
                  <h4 className="font-semibold mb-2">{formatSubjectType(type as SubjectType)}</h4>
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
                    {subjects.length === 0 && (
                      <p className="text-sm text-gray-500">No subjects available</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Declaration Section */}
          <div className="border rounded-lg p-4 flex items-start space-x-2 bg-gray-50">
            <input
              type="checkbox"
              id="declaration"
              checked={declarationChecked}
              onChange={e => setDeclarationChecked(e.target.checked)}
              className="mt-1 h-4 w-4"
            />
            <label htmlFor="declaration" className="text-sm flex-1">
              I <input
                type="text"
                value={declarationName}
                onChange={e => setDeclarationName(e.target.value)}
                placeholder="Your Name"
                className="border-b border-gray-400 outline-none px-1 w-40 mx-1"
              />, Applicant for Secondary Course at the SBCODL (Solanki Brothers Council for Open and Distance Learning), Schooling certify that I am literate, I can read and write HINDI/ENGLISH (Medium of Instruction). I understand that self learning is important in the open schooling system and I take the responsibility of my own studies.
            </label>
          </div>

          {/* Display currently selected subjects from form data */}
          {formData.subjectIds.length > 0 && (
            <div className="border rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-4">Selected Subjects</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {Object.entries(selectedSubjectsGrouped).map(([type, subjects]) => (
                  <div key={type} className="border rounded p-3">
                    <h4 className="font-semibold mb-2">{formatSubjectType(type as SubjectType)}</h4>
                    <div className="space-y-2">
                      {subjects.map(subject => (
                        <div key={subject.id} className="text-sm">
                          {subject.name}
                        </div>
                      ))}
                      {subjects.length === 0 && (
                        <p className="text-sm text-gray-500">No subjects selected</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default SubjectForm;