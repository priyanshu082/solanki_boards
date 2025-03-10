import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../../../components/ui/accordion";

const SafeguardingPolicy = () => {
    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8">
            {/* Header Section */}
            <div className="mb-8 text-center">
                <div className="relative inline-block px-6 py-4 bg-gradient-to-r from-blue-950 to-blue-900 text-white rounded-2xl shadow-lg">
                    <h1 className="text-3xl md:text-5xl font-extrabold mb-2">
                        SBCODL
                    </h1>
                    <h2 className="text-lg md:text-xl font-semibold">
                        Safeguarding Policy
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
                        Safeguarding at SBCODL
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {/* Purpose and Scope Section */}
                    <div className="text-gray-100 mb-6 space-y-4">
                        <div className="p-4 bg-blue-950 rounded-lg">
                            <h3 className="text-lg font-semibold mb-2">Purpose</h3>
                            <p>
                                At SBCODL, the safety and well-being of all learners are our top priority. We are committed to safeguarding children, young people, and vulnerable adults involved in our educational programs, whether online or in person. Our safeguarding policy outlines the measures in place to protect our learners from harm, abuse, or neglect while maintaining a secure learning environment.
                            </p>
                        </div>
                        
                        <div className="p-4 bg-blue-950 rounded-lg">
                            <h3 className="text-lg font-semibold mb-2">Scope</h3>
                            <p>
                                This policy applies to all staff, educators, volunteers, and partners working with SBCODL.
                            </p>
                        </div>
                    </div>

                    {/* Key Principles */}
                    <div className="mb-6">
                        <h3 className="text-xl font-semibold mb-4 text-gray-100">Key Principles</h3>
                        <div className="grid gap-4">
                            <div className="p-4 bg-blue-950 rounded-lg text-white">
                                <h4 className="font-semibold mb-2">1. Child-Centered Approach</h4>
                                <p>SBCODL believes that every child has the right to a safe learning environment. All decisions and actions will prioritize the best interests of the child.</p>
                            </div>

                            <div className="p-4 bg-blue-950 rounded-lg text-white">
                                <h4 className="font-semibold mb-2">2. Prevention</h4>
                                <p>We are proactive in ensuring the safety of learners by promoting an environment where they feel safe, respected, and able to communicate concerns. All staff undergo regular training on safeguarding issues, including recognizing signs of abuse and understanding their responsibilities.</p>
                            </div>

                            <div className="p-4 bg-blue-950 rounded-lg text-white">
                                <h4 className="font-semibold mb-2">3. Safe Recruitment</h4>
                                <p>SBCODL ensures that all staff, volunteers, and partners undergo thorough background checks (including DBS checks for those working directly with minors) and adhere to our safeguarding code of conduct.</p>
                            </div>
                        </div>
                    </div>

                    <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="reporting">
                            <AccordionTrigger className="text-left">
                                Reporting and Responding to Concerns
                            </AccordionTrigger>
                            <AccordionContent className="text-gray-800 bg-foreground p-4 rounded-md">
                                <p>All concerns or allegations of abuse will be taken seriously and handled promptly. We have clear procedures in place for reporting safeguarding issues to designated safeguarding officers, who are trained to take appropriate action in line with local laws and regulations.</p>
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="online-safety">
                            <AccordionTrigger className="text-left">
                                Online Safety
                            </AccordionTrigger>
                            <AccordionContent className="text-gray-800 bg-foreground p-4 rounded-md">
                                <p>Given our focus on open and distance learning, we implement robust measures to ensure the online safety of our learners. This includes monitoring digital platforms, promoting responsible internet use, and providing guidance on cyberbullying and digital well-being.</p>
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="partnerships">
                            <AccordionTrigger className="text-left">
                                Partnerships
                            </AccordionTrigger>
                            <AccordionContent className="text-gray-800 bg-foreground p-4 rounded-md">
                                <p>SBCODL works closely with local authorities, educational institutions, and safeguarding organizations to ensure that our policies remain up-to-date and in compliance with international safeguarding standards.</p>
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="review">
                            <AccordionTrigger className="text-left">
                                Policy Review
                            </AccordionTrigger>
                            <AccordionContent className="text-gray-800 bg-foreground p-4 rounded-md">
                                <p>Our safeguarding policy is reviewed annually to ensure its effectiveness, and any updates are communicated to all stakeholders.</p>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>

                    {/* Contact Information */}
                    <div className="mt-6 p-4 bg-blue-950 text-white rounded-lg">
                        <h3 className="font-semibold mb-2">Contact Information</h3>
                        <p>If any safeguarding concerns arise, please contact our designated safeguarding officer:</p>
                        <ul className="mt-2">
                            <li>Email: solankibrotherinstitute@gmail.com</li>
                            <li>Phone: +91 9997874343</li>
                        </ul>
                    </div>
                </CardContent>
            </Card>

            {/* Footer */}
            <div className="mt-8 text-center text-gray-800">
                <p>For additional information about our safeguarding policies, please contact us</p>
            </div>
        </div>
    );
};

export default SafeguardingPolicy;