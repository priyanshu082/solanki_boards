import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import { Input } from "../../../components/ui/input";
import { Search } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "../../../components/ui/table";
import { ScrollArea } from "../../../components/ui/scroll-area";
import { useNavigate } from 'react-router-dom';




const diplomaCourses = [
  { programName: "Diploma in Human Resource Management", eligibility: "pass in 12th Class", duration: "2 Year" },
  { programName: "Diploma in Physical Education (D.P.Ed)", eligibility: "pass in 12th Class", duration: "2 Year" },
  { programName: "Diploma in Montessori Teacher Training (M.T.T)", eligibility: "pass in 12th Class", duration: "2 Year" },
  { programName: "Advanced Diploma in Montessori & Primary Education", eligibility: "pass in 12th Class", duration: "2 Year" },
  { programName: "Diploma in Teachers Education (D.T.Ed)", eligibility: "pass in 12th Class", duration: "2 Year" },
  { programName: "Diploma in Journalism and Mass Communication (DJMC)", eligibility: "pass in 12th Class", duration: "2 Year" },
  { programName: "Diploma in Taxation (DT)", eligibility: "pass in 12th Class", duration: "2 Year" },
  { programName: "Diploma in Labour Law (DLL)", eligibility: "pass in 12th Class", duration: "2 Year" },
  { programName: "Diploma in Public Administration (DPA)", eligibility: "pass in 12th Class", duration: "2 Year" },
  { programName: "Diploma in Police Administration (DPOA)", eligibility: "pass in 12th Class", duration: "2 Year" },
  { programName: "Diploma in Insurance and Risk Management (DIRM)", eligibility: "pass in 12th Class", duration: "2 Year" },
  { programName: "Diploma in Human Rights (DHR)", eligibility: "pass in 12th Class", duration: "2 Year" },
  { programName: "Diploma in Export Management (DEM)", eligibility: "pass in 12th Class", duration: "2 Year" },
  { programName: "Diploma in Computer Operator & Programming Assistant", eligibility: "pass in 12th Class", duration: "2 Year" },
  { programName: "Diploma in Computerized Accounting (DICA)", eligibility: "pass in 12th Class", duration: "2 Year" },
  { programName: "Diploma in Beautician (DIB)", eligibility: "pass in 12th Class", duration: "2 Year" },
  { programName: "Diploma in Yoga (DIY)", eligibility: "pass in 12th Class", duration: "2 Year" },
  { programName: "Diploma in Sports Teacher Training (DSTT)", eligibility: "pass in 12th Class", duration: "2 Year" },
  { programName: "Diploma in Anganwadi (DAW)", eligibility: "pass in 12th Class", duration: "2 Year" },
  { programName: "Diploma in Art and Craft (DAC)", eligibility: "pass in 12th Class", duration: "2 Year" },
  { programName: "Diploma in Early Childhood Education (DECE)", eligibility: "pass in 12th Class", duration: "2 Year" },
  { programName: "Diploma in Yoga Teacher Training (DYTT)", eligibility: "pass in 12th Class", duration: "2 Year" },
  { programName: "Diploma in Food Safety (DFS)", eligibility: "pass in 12th Class", duration: "2 Year" },
  { programName: "Diploma in Library and Information Science (DLIS)", eligibility: "pass in 12th Class", duration: "2 Year" },
  { programName: "Diploma in Power Distribution Management (DPDM)", eligibility: "pass in 12th Class", duration: "2 Year" },
  { programName: "Diploma in Aviation Management (DAM)", eligibility: "pass in 12th Class", duration: "2 Year" },
  { programName: "Diploma in Environmental Management (DEM)", eligibility: "pass in 12th Class", duration: "2 Year" },
  { programName: "Diploma in Food Technology (DFT)", eligibility: "pass in 12th Class", duration: "2 Year" },
  { programName: "Diploma in Rehabilitation Psychology (DRP)", eligibility: "pass in 12th Class", duration: "2 Year" },
  { programName: "Diploma in Health Assistant (DHA)", eligibility: "pass in 12th Class", duration: "2 Year" },
  { programName: "Diploma in Criminology (DIC)", eligibility: "pass in 12th Class", duration: "2 Year" },
  { programName: "Diploma in Management (DIM)", eligibility: "pass in 12th Class", duration: "2 Year" },
  { programName: "Diploma in Rural Development (DRD)", eligibility: "pass in 12th Class", duration: "2 Year" },
  { programName: "Diploma in Health & Sanitation (DHS)", eligibility: "pass in 12th Class", duration: "2 Year" },
  { programName: "Diploma in AutoCAD (DAC)", eligibility: "pass in 12th Class", duration: "2 Year" },
  { programName: "Diploma in Organic Farming (DOF)", eligibility: "pass in 12th Class", duration: "2 Year" },
  { programName: "Diploma in Vocational Rehabilitation (DVR)", eligibility: "pass in 12th Class", duration: "2 Year" },
  { programName: "Diploma in Panchakarma", eligibility: "pass in 12th Class", duration: "2 Year" },
  { programName: "Diploma in Physiotherapy and Ayurveda", eligibility: "pass in 12th Class", duration: "2 Year" },
  { programName: "Diploma in Ayurveda Medical Science", eligibility: "pass in 12th Class", duration: "2 Year" },
  { programName: "Diploma in Ayurveda Nursing & Pharmacy", eligibility: "pass in 12th Class", duration: "2 Year" },
  { programName: "Diploma in Panchakarma & Massage Therapy", eligibility: "pass in 12th Class", duration: "2 Year" },
  { programName: "Diploma in Ayurvedic Beauty Care", eligibility: "pass in 12th Class", duration: "2 Year" },
  { programName: "Diploma in Ayurveda Panchakarma Therapy", eligibility: "pass in 12th Class", duration: "2 Year" },
  { programName: "Diploma in Ayurveda, Panchakarma & Nursing", eligibility: "pass in 12th Class", duration: "2 Year" },
  { programName: "Diploma in Panchakarma", eligibility: "pass in 12th Class", duration: "2 Year" },
  { programName: "Advanced Diploma in Panchakarma", eligibility: "pass in 12th Class", duration: "2 Year" },
  { programName: "Diploma in Siddha Diet therapy", eligibility: "pass in 12th Class", duration: "2 Year" },
  { programName: "Diploma in Varma Niam Massage Therapy", eligibility: "pass in 12th Class", duration: "2 Year" },
  { programName: "Diploma in Beauty and Spa Therapies", eligibility: "pass in 12th Class", duration: "2 Year" },
  { programName: "Diploma in Naturopathy and Yoga Science", eligibility: "pass in 12th Class", duration: "2 Year" },
  { programName: "Diploma in Yoga Instructor", eligibility: "pass in 12th Class", duration: "2 Year" },
  { programName: "Assistant Diploma in Panchakarma Therapist", eligibility: "pass in 12th Class", duration: "2 Year" },
  { programName: "Diploma in Nutrition & Health Education", eligibility: "pass in 12th Class", duration: "2 Year" },
  { programName: "Diploma in Dry Needle Therapy", eligibility: "pass in 12th Class", duration: "2 Year" },
  { programName: "Diploma in Chiropractor Technique", eligibility: "pass in 12th Class", duration: "2 Year" },
  { programName: "Diploma in Health Inspector", eligibility: "pass in 12th Class", duration: "2 Year" },
  { programName: "Diploma in Event Management", eligibility: "pass in 12th Class", duration: "2 Year" },
  { programName: "Diploma in French", eligibility: "pass in 12th Class", duration: "2 Year" },
  { programName: "Diploma in Fine Arts", eligibility: "pass in 12th Class", duration: "2 Year" },
  { programName: "Diploma in German", eligibility: "pass in 12th Class", duration: "2 Year" },
  { programName: "Diploma in Cyber Law", eligibility: "pass in 12th Class", duration: "2 Year" },
  { programName: "Diploma in Taxation Law [DTL]", eligibility: "pass in 12th Class", duration: "2 Year" },
  { programName: "Diploma in Labour Laws and Labour Welfare", eligibility: "pass in 12th Class", duration: "2 Year" },
  { programName: "Diploma in Hotel Management", eligibility: "pass in 12th Class", duration: "2 Year" },
  { programName: "Diploma in Education [D.Ed]", eligibility: "pass in 12th Class", duration: "2 Year" },
  { programName: "Elementary Teacher Training [ETT]", eligibility: "pass in 12th Class", duration: "2 Year" },
  { programName: "Diploma in Nursery Teacher Training [NTT]", eligibility: "pass in 12th Class", duration: "2 Year" },
  { programName: "Diploma in Fashion Design", eligibility: "pass in 12th Class", duration: "2 Year" },
  { programName: "Diploma in Banking & Finance", eligibility: "pass in 12th Class", duration: "2 Year" },
  { programName: "Diploma in Accounting and Finance", eligibility: "pass in 12th Class", duration: "2 Year" },
  { programName: "Diploma in Agriculture", eligibility: "pass in 12th Class", duration: "2 Year" },
  { programName: "Diploma in Animal Husbandry", eligibility: "pass in 12th Class", duration: "2 Year" },
];

const Diploma = () => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [durationFilter, setDurationFilter] = React.useState("all");
  const navigate = useNavigate();

  const filteredCourses = diplomaCourses.filter(course => {
    const matchesSearch = course.programName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDuration = durationFilter === "all" || course.duration === durationFilter;
    return matchesSearch && matchesDuration;
  });

  return (
    <div className="min-h-screen bg-primary p-4 md:p-8 lg:p-12">
      <Card className="mx-auto bg-white">

        <CardHeader className="text-center flex flex-row  justify-between px-[10vw]">

        
            <div className='flex justify-center flex-col text-center'>
              <CardTitle className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary">
              Diploma Courses
            </CardTitle>

            <CardDescription className="text-lg mt-4 max-w-3xl mx-auto text-primary">
              The Solanki Brothers Council for Open and Distance Learning offers a diverse 
              range of diploma programs catering to various fields, ensuring quality education 
              and skill development for students.
            </CardDescription>
            </div>

          <div className="flex justify-end ">
            <button className="mt-6 h-fit  text-white text-xl py-2 px-6 rounded bg-primary" onClick={() => navigate('/student-admission-form')}>
              Apply Now
            </button>
          </div>
        </CardHeader>

        <CardContent>
          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted" />
              <Input
                placeholder="Search courses..."
                className="pl-8 text-primary"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select
              value={durationFilter}
              onValueChange={setDurationFilter}
            >
                <SelectTrigger className="w-[180px] text-primary">
                  <SelectValue placeholder="Duration" />
                </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Durations</SelectItem>
                <SelectItem value="2 Year">2 Years</SelectItem>
                <SelectItem value="18 Months">18 Months</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Table */}
          <ScrollArea className="rounded-md border">
            <Table className='text-primary'>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-16 text-center text-muted">No.</TableHead>
                  <TableHead className=' font-bold text-muted'>Program Name</TableHead>
                  <TableHead className="w-48  font-bold text-muted">Eligibility</TableHead>
                  <TableHead className="w-32  font-bold text-muted">Duration</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCourses.map((course, index) => (
                  <TableRow key={index} className='hover:bg-primary hover:text-white'>
                    <TableCell className="text-center font-medium">
                      {index + 1}
                    </TableCell>
                    <TableCell className="font-medium">
                      {course.programName}
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">
                        {course.eligibility}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {course.duration}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>

          {filteredCourses.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No courses found matching your criteria
            </div>
          )}
        </CardContent>
      </Card>
    <div className="text-center py-4">
      <p className="text-sm text-gray-200">
        For more details on admission procedures, course modules, and fee structures, please visit <a href="http://www.sbiea.co.in" className="text-blue-500 underline">www.sbiea.co.in</a> or contact the SBCODL administration.
      </p>
    </div>
    </div>
  );
};

export default Diploma