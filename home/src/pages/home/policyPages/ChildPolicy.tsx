import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../../../components/ui/accordion";

const ChildPolicy = () => {
    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8">
            {/* Header Section */}
            <div className="mb-8 text-center">
                <div className="relative inline-block px-6 py-4 bg-gradient-to-r from-blue-950  to-blue-900 text-white rounded-2xl shadow-lg">
                    <h1 className="text-3xl md:text-5xl font-extrabold mb-2">
                        SBCODL
                    </h1>
                    <h2 className="text-lg md:text-xl font-semibold">
                        Child Protection Policies and Procedures
                    </h2>
                </div>
                <div className="mt-4 flex justify-center">
                    <span className="block w-16 h-1 bg-gradient-to-r from-blue-900  to-blue-700 rounded"></span>
                </div>
            </div>

            {/* Main Content */}
            <Card className="max-w-4xl mx-auto">
                <CardHeader>
                    <CardTitle className="text-lg md:text-xl text-gray-100">
                        Safeguarding in Children's Aid Organizations
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-gray-100 mb-6">
                        The Council for Open and Distance Learning of Solanki Brothers (SBCODL) has developed detailed child protection policies and procedures to promote the safety and wellbeing of every learner.
                    </p>

                    <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="purpose">
                            <AccordionTrigger className="text-left">
                                1. Purpose and Scope of Child Protection Policy
                            </AccordionTrigger>
                            <AccordionContent className="text-gray-800 bg-foreground p-2 rounded-md">
                                <p>SBCODL aims at ensuring a safe and caring educational experience where students are free from harm, exploitation or neglect.</p>
                                <ul className="list-disc pl-6 mt-2 space-y-2">
                                    <li>States the clear principles with respect to the identification, prevention and management of risks.</li>
                                    <li>Details how instances of child abuse suspected or otherwise are to be reported and handled.</li>
                                    <li>Applies to all faculty and staff, and administrators, volunteers and any other persons engaged in any capacity with SBCODL students.</li>
                                </ul>
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="definitions">
                            <AccordionTrigger className="text-left">
                                2. Definition of Terms
                            </AccordionTrigger>
                            <AccordionContent className="text-gray-800 bg-foreground p-2 rounded-md">
                                <ul className="space-y-3">
                                    <li><strong>Child Abuse:</strong> Any form of internal human ill-effects to a child whether physical, emotional, sexual or even psychological.</li>
                                    <li><strong>Neglect:</strong> The lack of addressing the basic needs of a child which risks endangering the child.</li>
                                    <li><strong>Child:</strong> Endows any student under the banner of SBCODL with no regard to ageism.</li>
                                    <li><strong>Mandated Reporters:</strong> Persons as by law or policy expected to report any beliefs they may carry regarding abuse and so all faculty and staff of SBCODL inclusive.</li>
                                </ul>
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="roles">
                            <AccordionTrigger className="text-left">
                                3. Roles and Responsibilities
                            </AccordionTrigger>
                            <AccordionContent className="text-gray-800 bg-foreground p-2 rounded-md">
                                <ul className="space-y-3">
                                    <li><strong>Education Authority:</strong> Oversees the implementation of policies and compliance thereof on the child protection measures.</li>
                                    <li><strong>Teachers and Non-Teaching Staff:</strong> Training on child protection is provided at intervals and the abuse signs and reporting procedures is expected from them.</li>
                                    <li><strong>Learners:</strong> Acknowledged of the right to safety and reassured of expression over any safety concern.</li>
                                    <li><strong>Caregivers:</strong> Orientated on the child protection policies of SBCODL and strategies to facilitate safety.</li>
                                </ul>
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="prevention">
                            <AccordionTrigger className="text-left">
                                4. Measures of Prevention
                            </AccordionTrigger>
                            <AccordionContent className="text-gray-800 bg-foreground p-2 rounded-md">
                                <ul className="space-y-3">
                                    <li>Annual child protection training for all staff members</li>
                                    <li>Background checks for all staff, volunteers, and outside agencies</li>
                                    <li>Age-appropriate personal safety teaching materials</li>
                                </ul>
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="reporting">
                            <AccordionTrigger className="text-left">
                                5. Reporting Procedures
                            </AccordionTrigger>
                            <AccordionContent className="text-gray-800 bg-foreground p-2 rounded-md">
                                <ul className="space-y-3">
                                    <li><strong>Mandatory Reporting:</strong> Report to CPO within 24 hours</li>
                                    <li><strong>Anonymous Reporting:</strong> Available through secure online portal</li>
                                    <li><strong>Documentation:</strong> Secure storage of all reports</li>
                                </ul>
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="response">
                            <AccordionTrigger className="text-left">
                                6. Responding to Reports
                            </AccordionTrigger>
                            <AccordionContent className="text-gray-800 bg-foreground p-2 rounded-md">
                                <ul className="space-y-3">
                                    <li><strong>Immediate Response:</strong> CPO assessment and action</li>
                                    <li><strong>Investigation:</strong> Internal investigation following guidelines</li>
                                    <li><strong>External Reporting:</strong> Coordination with authorities when needed</li>
                                </ul>
                            </AccordionContent>
                        </AccordionItem>

                    </Accordion>
                </CardContent>
            </Card>

            {/* Footer */}
            <div className="mt-8 text-center text-gray-800">
                <p>For more information, please contact the Child Protection Officer</p>
            </div>
        </div>
    );
};

export default ChildPolicy;