import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card"
import { Separator } from "../../../components/ui/separator"
import { governingBodyMembers } from "../../../data/governingBody"

const GoverningBody = () => {
  
  return (
    <div className="min-h-screen bg-white p-4 md:p-8 lg:p-12">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary text-center mb-8">
          Governing Body of SBCODL
        </h1>
        
        <Card className="mb-8">
          <CardContent className="pt-6">
            <p className="text-white text-lg">
              The Governing Body of SBCODL constitutes dedicated professionals toward strategic leadership and ethical governance through fostering excellence in open and distance education. Roles and responsibilities constituting the governed body are reflected in the layout below.
            </p>
          </CardContent>
        </Card>

        <Separator className="my-2" />

        

        <Table className="text-primary">
          <TableHeader>
            <TableRow>
              <TableHead className="font-bold text-black">Position</TableHead>
              <TableHead className="font-bold text-black">Name</TableHead>
              <TableHead className="font-bold text-black">Key Responsibilities</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {governingBodyMembers.map((member, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{member.position}</TableCell>
                <TableCell>{member.name}</TableCell>
                <TableCell>
                  <ul className="list-disc pl-4">
                    {member.responsibilities.map((responsibility, idx) => (
                      <li key={idx}>{responsibility}</li>
                    ))}
                  </ul>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Separator className="my-2" />

        <Card className="text-white mt-8">
          <CardHeader>
            <CardTitle className="text-2xl ">Core Responsibilities of the Governing Body</CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="list-decimal list-inside space-y-2">
              <li>Developing the long-term vision and mission for SBCODL</li>
              <li>Formulating governance, academic, and operation excellence frameworks</li>
              <li>Effective use of financial and infrastructure resources</li>
              <li>Open two-way communication, coordination, and liaison among the students, the faculty, and the partners of SBCODL</li>
              <li>International engagement and presence with global organizations as a partner, member, etc.</li>
            </ol>

            <p className="mt-6">
              This governance structure ensures accountability, innovation, and a student-centered approach, enabling SBCODL to remain a leader in open and distance learning globally.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default GoverningBody;