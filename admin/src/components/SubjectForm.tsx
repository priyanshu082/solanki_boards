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
import { Button } from '../components/ui/button';
import axios from "axios";
import { getallsubject } from "../Config";

const SubjectForm = () => {
    const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
    const [formData, setFormData] = useRecoilState(admissionFormState);
    const [subjectsList, setSubjectsList] = useRecoilState(staticDataAtoms.subjectsAtom);

    // Fetch subjects based on the selected course
    useEffect(() => {
        // TODO: Replace with actual API call to fetch subjects based on formData.courseId
        // console.log(`Fetching subjects for course ID: ${formData.courseId}`);
        const getSubjects = async () => {
            const response = await axios.post(getallsubject, {
                courseId: formData.courseId
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (response.status === 200) {
                setSubjectsList(response.data);
            }
        }
        getSubjects();
    }, [formData.courseId, setSubjectsList]);

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
            subjectsList.filter(subject => selectedSubjects.includes(subject.id))
        );

        // Update the subjectIds in the main form data
        setFormData(prevData => ({
            ...prevData,
            subjectIds: selectedSubjects
        }));

        // Reset selected subjects after adding
        setSelectedSubjects([]);
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