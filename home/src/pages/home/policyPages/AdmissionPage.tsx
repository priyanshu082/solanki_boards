
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";

const AdmissionPolicy = () => {
    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8">
            {/* Header Section - keeping the same */}
            <div className="mb-8 text-center">
                <div className="relative inline-block px-6 py-4 bg-gradient-to-r from-blue-950 to-blue-900 text-white rounded-2xl shadow-lg">
                    <h1 className="text-3xl md:text-5xl font-extrabold mb-2">
                        SBCODL
                    </h1>
                    <h2 className="text-lg md:text-xl font-semibold">
                        Admission Options and Requirements
                    </h2>
                </div>
                <div className="mt-4 flex justify-center">
                    <span className="block w-16 h-1 bg-gradient-to-r from-blue-900 to-blue-700 rounded"></span>
                </div>
            </div>

            <div className="space-y-8 max-w-4xl mx-auto">
                {/* Previous cards remain the same until the table section */}
                
                {/* Eligibility Criteria Table using shadcn/ui Table */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg md:text-xl text-gray-100">
                            SBCODL Eligibility Criteria for Admission
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="rounded-md border">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="font-semibold">Course Name</TableHead>
                                        <TableHead className="font-semibold">Entry</TableHead>
                                        <TableHead className="font-semibold">Cut Off Dates</TableHead>
                                        <TableHead className="font-semibold">Requirement</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    <TableRow>
                                        <TableCell rowSpan={2} className="font-medium">SEC MIDDLE PROG</TableCell>
                                        <TableCell>Block 1</TableCell>
                                        <TableCell>31st March</TableCell>
                                        <TableCell>15 years as on 31st March (before exam)</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Block 2</TableCell>
                                        <TableCell>30th September</TableCell>
                                        <TableCell>15 years as on 30th September (before exam)</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </div>

                        {/* Document Requirements Table */}
                        <div className="mt-8 rounded-md border">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="font-semibold">Document Type</TableHead>
                                        <TableHead className="font-semibold">Acceptable Documents</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    <TableRow>
                                        <TableCell className="font-medium">Valid Identity Proof</TableCell>
                                        <TableCell>
                                            <ul className="list-disc pl-4">
                                                <li>Aadhaar Card</li>
                                                <li>Passport</li>
                                                <li>Ration Card</li>
                                                <li>PAN Card</li>
                                            </ul>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-medium">Proof of Date of Birth</TableCell>
                                        <TableCell>
                                            <ul className="list-disc pl-4">
                                                <li>Birth Certificate (Municipal Authority/District Office) - for those born after 26.01.1989</li>
                                                <li>Passport</li>
                                                <li>School Leaving Certificate</li>
                                                <li>Transfer Certificate</li>
                                                <li>Aadhaar Card (with DOB)</li>
                                            </ul>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-medium">Additional Documents</TableCell>
                                        <TableCell>
                                            <ul className="list-disc pl-4">
                                                <li>Proof of Residence</li>
                                                <li>Domicile Certificate (Sikkim students)</li>
                                                <li>Caste Certificate (SC/ST/OBC)</li>
                                                <li>Disability Certificate (if applicable)</li>
                                            </ul>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-medium">Education Qualifications</TableCell>
                                        <TableCell>
                                            <ul className="list-disc pl-4">
                                                <li>Class VIII Certificate OR Self Certificate of language proficiency</li>
                                                <li>Secondary Certificate (for Senior Secondary admission)</li>
                                                <li>Senior Secondary Certificate (for Undergraduate admission)</li>
                                                <li>Graduation Certificate (for Postgraduate admission)</li>
                                            </ul>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </div>

                        <div className="mt-6">
                            <p className="text-red-600 font-medium">Important Note:</p>
                            <p className="mt-2">Date of birth once given in the Admission Form shall not be changed. Please check and state the correct date of birth in the Admission Form.</p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Footer */}
            <div className="mt-8 text-center text-gray-800">
                <p>For more information, please visit www.sbiea.co.in or contact your nearest SBCODL Admission Centre</p>
            </div>
        </div>
    );
};

export default AdmissionPolicy;