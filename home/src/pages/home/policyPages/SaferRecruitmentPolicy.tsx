import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../../../components/ui/accordion";

const SaferRecruitmentPolicy = () => {
    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8">
            {/* Header Section */}
            <div className="mb-8 text-center">
                <div className="relative inline-block px-6 py-4 bg-gradient-to-r from-blue-950 to-blue-900 text-white rounded-2xl shadow-lg">
                    <h1 className="text-3xl md:text-5xl font-extrabold mb-2">
                        SBCODL
                    </h1>
                    <h2 className="text-lg md:text-xl font-semibold">
                        Safer Recruitment Policy
                    </h2>
                </div>
                <div className="mt-4 flex justify-center">
                    <span className="block w-16 h-1 bg-gradient-to-r from-blue-900 to-blue-700 rounded"></span>
                </div>
            </div>

            {/* Main Content */}
            <Card className="max-w-4xl mx-auto">
                <CardHeader>
                    <CardTitle className="text-lg md:text-xl text-gray-100">
                        Safer Recruitment at SBCODL
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-gray-100 mb-6 space-y-4">
                        <p>
                            SBCODL is committed to safeguarding and promoting the welfare of children, young people, and vulnerable adults. Our Safer Recruitment Policy ensures that all individuals recruited to work with us are thoroughly vetted to minimize the risk of harm to learners.
                        </p>
                        <p>
                            <strong>Scope:</strong> This policy applies to the recruitment of all staff, volunteers, contractors, and any other individuals who may come into contact with children or vulnerable learners through SBCODL's programs.
                        </p>
                    </div>

                    <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="key-principles">
                            <AccordionTrigger className="text-left">
                                Key Principles
                            </AccordionTrigger>
                            <AccordionContent className="text-gray-800 bg-foreground p-4 rounded-md">
                                <div className="space-y-4">
                                    <div>
                                        <h3 className="font-semibold mb-2">1. Commitment to Safeguarding</h3>
                                        <p>All recruitment practices will emphasize the importance of safeguarding. This includes embedding safeguarding considerations into every stage of the hiring process to prevent individuals who may pose a risk from joining our organization.</p>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold mb-2">2. Job Descriptions and Person Specifications</h3>
                                        <p>Each role at SBCODL, especially those that involve contact with children or vulnerable adults, will include a clear job description and person specification outlining safeguarding responsibilities. All candidates must demonstrate their commitment to safeguarding in their application and interview.</p>
                                    </div>
                                </div>
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="pre-employment">
                            <AccordionTrigger className="text-left">
                                Pre-Employment Checks
                            </AccordionTrigger>
                            <AccordionContent className="text-gray-800 bg-foreground p-4 rounded-md">
                                <p className="mb-3">SBCODL will conduct the following checks on all potential candidates before making any formal offers of employment:</p>
                                <ul className="space-y-2 list-disc pl-6">
                                    <li><strong>Identity Verification:</strong> Confirm the identity of the candidate through original documentation.</li>
                                    <li><strong>Qualification Checks:</strong> Verify academic and professional qualifications relevant to the role.</li>
                                    <li><strong>Criminal Record Checks:</strong> Conduct a Disclosure and Barring Service (DBS) check for all staff working directly with children or vulnerable learners.</li>
                                    <li><strong>References:</strong> Obtain at least two professional references, verifying their suitability to work with children and vulnerable adults.</li>
                                    <li><strong>Employment History:</strong> Review the candidate's employment history and check for any gaps or discrepancies.</li>
                                </ul>
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="interview-process">
                            <AccordionTrigger className="text-left">
                                Interview Process
                            </AccordionTrigger>
                            <AccordionContent className="text-gray-800 bg-foreground p-4 rounded-md">
                                <p>All interviews will include specific questions related to safeguarding, and candidates will be assessed on their understanding and commitment to child protection and the safeguarding of vulnerable individuals. If concerns are raised during the interview process, further checks may be undertaken.</p>
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="post-appointment">
                            <AccordionTrigger className="text-left">
                                Post-Appointment Induction and Training
                            </AccordionTrigger>
                            <AccordionContent className="text-gray-800 bg-foreground p-4 rounded-md">
                                <p>Once appointed, all staff and volunteers must complete mandatory safeguarding training as part of their induction program. Ongoing training and professional development will be provided to ensure that safeguarding responsibilities are clearly understood and adhered to.</p>
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="contractors">
                            <AccordionTrigger className="text-left">
                                External Contractors and Partners
                            </AccordionTrigger>
                            <AccordionContent className="text-gray-800 bg-foreground p-4 rounded-md">
                                <p>When engaging contractors or external partners who may have access to children or vulnerable adults, SBCODL requires them to follow the same safeguarding and safer recruitment procedures, including providing evidence of appropriate background checks.</p>
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="reporting">
                            <AccordionTrigger className="text-left">
                                Reporting Concerns
                            </AccordionTrigger>
                            <AccordionContent className="text-gray-800 bg-foreground p-4 rounded-md">
                                <p>Any concerns regarding the recruitment process or the suitability of staff members must be reported to the designated safeguarding officer. Immediate action will be taken to investigate and resolve any issues.</p>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>

                    <div className="mt-6 p-4 bg-blue-950 text-white rounded-lg">
                        <h3 className="font-semibold mb-2">Contact Information</h3>
                        <p>For queries or concerns about our safer recruitment process, please contact us at:</p>
                        <ul className="mt-2">
                            <li>Email: solankibrotherinstitute@gmail.com</li>
                            <li>Phone: +91 9997874343</li>
                        </ul>
                    </div>
                </CardContent>
            </Card>

            {/* Footer */}
            <div className="mt-8 text-center text-gray-800">
                <p>For additional information about our policies, please contact us</p>
            </div>
        </div>
    );
};

export default SaferRecruitmentPolicy;