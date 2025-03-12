import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import { Card, CardContent } from "../../../components/ui/card";
import { Separator } from "../../../components/ui/separator";

const ExcecutiveCommittee = () => {
  return (
    <div className="min-h-screen bg-white p-4 md:p-8 lg:p-12">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary text-center mb-8">
          Executive Committee Members
        </h1>
        
        <Card className="mb-8">
          <CardContent className="pt-6">
            <p className="text-lg text-center font-bold">
              Solanki Brothers Council for Open and Distance Learning (SBCODL)
            </p>
          </CardContent>
        </Card>

        <Separator className="my-2" />

        <Table className="text-primary">
          <TableHeader>
            <TableRow>
              <TableHead className="font-bold text-black">Sl. No.</TableHead>
              <TableHead className="font-bold text-black">Name of the Designated Person</TableHead>
              <TableHead className="font-bold text-black">Designation</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">1</TableCell>
              <TableCell>Mr. Anoop Chauhan</TableCell>
              <TableCell>Chief Operating Officer</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">2</TableCell>
              <TableCell>Prof Kanika Singh</TableCell>
              <TableCell>Academic Director</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">3</TableCell>
              <TableCell>Mr Parmar Jitu Bhai</TableCell>
              <TableCell>Assistant Controller</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">4</TableCell>
              <TableCell>Prof Shubham Chauhan</TableCell>
              <TableCell>Co-Coordinator</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">5</TableCell>
              <TableCell>Mr. Rajveer Singh</TableCell>
              <TableCell>Public Relations Officer</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">6</TableCell>
              <TableCell>Mr Shivam Kumar</TableCell>
              <TableCell>Public Relations Officer</TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <Separator className="my-2" />

       
      </div>
    </div>
  );
}

export default ExcecutiveCommittee;