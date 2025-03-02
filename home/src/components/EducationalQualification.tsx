import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
  } from "../components/ui/card";
  import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "../components/ui/table";
  import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "../components/ui/select";
  import { Input } from "../components/ui/input";
  import { Label } from "../components/ui/label";
  import { Button } from "../components/ui/button"; // Assuming there's a Button component
  import { useRecoilState } from 'recoil';
  import { admissionFormState, ExaminationType } from '../Atoms/FormDataAtoms';
  import { useState } from 'react';
  import { EducationalQualification } from "../Atoms/FormDataAtoms";
  
  const EducationalQualificationForm = () => {
    const [formData, setFormData] = useRecoilState(admissionFormState);
    const [qualifications, setQualifications] = useState<EducationalQualification[]>(formData.educationalQualifications || []);
    
    const [newQualification, setNewQualification] = useState<EducationalQualification>({
      examination: ExaminationType.X, // Default value
      subjects: '',
      yearOfPassing: '',
      board: '',
      grade: '',
      percentage: 0,
    });
  
    const handleInputChange = (field: keyof EducationalQualification, value: any) => {
      setNewQualification({ ...newQualification, [field]: value });
    };
  
    const handleAddQualification = () => {
      const updatedQualifications = [...qualifications, newQualification];
      setQualifications(updatedQualifications);
      setFormData({ ...formData, educationalQualifications: updatedQualifications }); // Update Recoil state
      setNewQualification({ // Reset the new qualification form
        examination: ExaminationType.X,
        subjects: '',
        yearOfPassing: '',
        board: '',
        grade: '',
        percentage: 0,
      });
    };
  
    return (
      <Card className="w-full mx-auto bg-white rounded-lg shadow-md text-primary">
        <CardHeader>
          <CardTitle className="text-xl">Educational Qualification Form</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="border rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-4">Add Qualification</h3>
              
              {/* Examination Type */}
              <div className="space-y-2">
                <Label htmlFor={`examination`}>Examination Type</Label>
                <Select onValueChange={(value) => handleInputChange('examination', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select examination type" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(ExaminationType).map(([key, value]) => (
                      <SelectItem key={value} value={value}>{key.replace(/_/g, ' ')}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
  
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Subjects Section */}
                <div className="space-y-2">
                  <Label htmlFor={`subjects`}>Subjects</Label>
                  <Input 
                    id={`subjects`}
                    placeholder="Enter subjects"
                    value={newQualification.subjects}
                    onChange={(e) => handleInputChange('subjects', e.target.value)}
                  />
                </div>
  
                {/* Year of Passing */}
                <div className="space-y-2">
                  <Label htmlFor={`year`}>Year of Passing</Label>
                  <Select onValueChange={(value) => handleInputChange('yearOfPassing', value)}>
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
                  <Label htmlFor={`board`}>University/Board</Label>
                  <Input 
                    id={`board`}
                    placeholder="Enter board name"
                    value={newQualification.board}
                    onChange={(e) => handleInputChange('board', e.target.value)}
                  />
                </div>
  
                {/* Division/Grade */}
                <div className="space-y-2">
                  <Label htmlFor={`grade`}>Division/Grade</Label>
                  <Input 
                    id={`grade`}
                    placeholder="Enter grade"
                    value={newQualification.grade}
                    onChange={(e) => handleInputChange('grade', e.target.value)}
                  />
                </div>
  
                {/* Percentage */}
                <div className="space-y-2">
                  <Label htmlFor={`percentage`}>Percentage</Label>
                  <Input 
                    id={`percentage`}
                    type="number"
                    placeholder="Enter percentage"
                    value={newQualification.percentage}
                    onChange={(e) => handleInputChange('percentage', Number(e.target.value))}
                  />
                </div>
              </div>
              <Button onClick={handleAddQualification} className="mt-4">Add Qualification</Button>
            </div>
  
            {/* Displaying Qualifications in Table */}
            {qualifications.length > 0 && (
              <div className="mt-6">
                <h4 className="font-semibold">Added Qualifications:</h4>
                <Table className="mt-2">
                  <TableHeader>
                    <TableRow className="bg-gray-100 hover:bg-gray-100">
                      <TableHead className="font-semibold">Examination</TableHead>
                      <TableHead className="font-semibold">Subjects</TableHead>
                      <TableHead className="font-semibold">Year of Passing</TableHead>
                      <TableHead className="font-semibold">Board/University</TableHead>
                      <TableHead className="font-semibold">Grade</TableHead>
                      <TableHead className="font-semibold">Percentage</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {qualifications.map((qual, index) => (
                      <TableRow 
                        key={index}
                        className="hover:bg-gray-50"
                      >
                        <TableCell>{qual.examination}</TableCell>
                        <TableCell>{qual.subjects}</TableCell>
                        <TableCell>{qual.yearOfPassing}</TableCell>
                        <TableCell>{qual.board}</TableCell>
                        <TableCell>{qual.grade}</TableCell>
                        <TableCell>{qual.percentage}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    );
  };
  
  export default EducationalQualificationForm;