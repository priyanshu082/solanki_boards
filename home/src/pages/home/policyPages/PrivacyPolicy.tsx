import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../../../components/ui/accordion";

const PrivacyPolicy = () => {
    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8">
            {/* Header Section */}
            <div className="mb-8 text-center">
                <div className="relative inline-block px-6 py-4 bg-gradient-to-r from-blue-950 to-blue-900 text-white rounded-2xl shadow-lg">
                    <h1 className="text-3xl md:text-5xl font-extrabold mb-2">
                        SBCODL
                    </h1>
                    <h2 className="text-lg md:text-xl font-semibold">
                        Privacy & Refund Policies
                    </h2>
                </div>
                <div className="mt-4 flex justify-center">
                    <span className="block w-16 h-1 bg-gradient-to-r from-blue-900 to-blue-700 rounded"></span>
                </div>
            </div>

            {/* Privacy Policy Section */}
            <Card className="max-w-4xl mx-auto mb-8">
                <CardHeader>
                    <CardTitle className="text-2xl text-gray-100">Privacy Policy</CardTitle>
                    <p className="text-sm text-gray-300">Last updated: September 2024</p>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="text-gray-100">
                        <p className="mb-4">
                            This webpage sets out when and how we use your personal information that you or others provide to us. Your privacy is of the utmost importance to us. We want to make sure you fully understand the terms and conditions surrounding the capture and use of that information.
                        </p>
                        <p className="mb-4">
                            If you have any questions about this privacy policy, please contact the SBCODL team at sbcodlautomousboard@gmail.com.
                        </p>
                    </div>

                    <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="who-we-are">
                            <AccordionTrigger className="text-left">Who We Are</AccordionTrigger>
                            <AccordionContent className="text-gray-800 bg-foreground p-4 rounded-md">
                                Solanki Brothers Council for Open and Distance Learning (SBCODL) is an autonomous educational institution dedicated to providing quality education and fostering academic excellence. For the purposes of data protection laws, including the Indian General Data Protection Regulations (GDPR), SBCODL will be the 'data controller' for all personal information we process. We ensure compliance with all applicable data protection and privacy laws and regulations in the jurisdictions where we operate.
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="data-usage">
                            <AccordionTrigger className="text-left">How Do You Use My Data?</AccordionTrigger>
                            <AccordionContent className="text-gray-800 bg-foreground p-4 rounded-md">
                                <p>We gather information from you in the following circumstances:</p>
                                <ul className="list-disc pl-6 mt-2 space-y-2">
                                    <li>When you register with us as a student or member: We require personal information such as contact details, payment information, and educational details to provide our services effectively.</li>
                                    <li>When you engage with our programs or services: Your personal information may be used to assess, verify, or administer the educational services you have signed up for.</li>
                                    <li>When you participate in SBCODL events, webinars, or competitions: We may collect personal details to manage event participation, including dietary requirements and special needs, with consent.</li>
                                    <li>When visiting our website: Technical data such as IP addresses and browsing information may be collected to optimize your experience.</li>
                                </ul>
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="legal-basis">
                            <AccordionTrigger className="text-left">Legal Basis of Processing</AccordionTrigger>
                            <AccordionContent className="text-gray-800 bg-foreground p-4 rounded-md">
                                <p>We process your data under several legal bases, including:</p>
                                <ul className="list-disc pl-6 mt-2 space-y-2">
                                    <li>Performance of a contract: When providing our educational services.</li>
                                    <li>Consent: For marketing and communication purposes, where necessary.</li>
                                    <li>Legitimate interests: For the ongoing management and improvement of our services.</li>
                                </ul>
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="data-sharing">
                            <AccordionTrigger className="text-left">Data Sharing & Retention</AccordionTrigger>
                            <AccordionContent className="text-gray-800 bg-foreground p-4 rounded-md">
                                <p className="mb-2">We do not share your data unless necessary to deliver our services or as required by law. In cases where third-party service providers assist us, your data will be protected under strict data processing agreements.</p>
                                <p>We will retain your data only for as long as is necessary to fulfil the purposes we collected it for, including any legal or regulatory requirements. If you wish to request data removal, you may contact sbcodlautomousboard@gmail.com.</p>
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="your-rights">
                            <AccordionTrigger className="text-left">Your Rights</AccordionTrigger>
                            <AccordionContent className="text-gray-800 bg-foreground p-4 rounded-md">
                                <p>You have several rights under data protection law, including:</p>
                                <ul className="list-disc pl-6 mt-2 space-y-2">
                                    <li>Right to access: You can request details about the personal data we hold on you.</li>
                                    <li>Right to rectification: You can ask us to correct any inaccurate data.</li>
                                    <li>Right to erasure: You may request that we delete your data under certain circumstances.</li>
                                </ul>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </CardContent>
            </Card>

            {/* Refund Policy Section */}
            <Card className="max-w-4xl mx-auto">
                <CardHeader>
                    <CardTitle className="text-2xl text-gray-100">Refund Policy</CardTitle>
                    <p className="text-sm text-gray-300">Last updated: September 2024</p>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="text-gray-100">
                        <p className="mb-4">
                            At Solanki Brothers Council for Open and Distance Learning (SBCODL), we are committed to delivering high-quality educational services. We understand that situations may arise where a student may request a refund. Below is our policy regarding refunds.
                        </p>
                    </div>

                    <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="refund-eligibility">
                            <AccordionTrigger className="text-left">Refund Eligibility</AccordionTrigger>
                            <AccordionContent className="text-gray-800 bg-foreground p-4 rounded-md">
                                SBCODL offers a 10-day refund window from the date of payment for most courses and programs. After this period, refunds will not be issued unless there are special circumstances.
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="requests-after-10-days">
                            <AccordionTrigger className="text-left">Requests After 10 Days</AccordionTrigger>
                            <AccordionContent className="text-gray-800 bg-foreground p-4 rounded-md">
                                <p>If more than 10 days have passed since your payment, refunds will generally not be provided, unless:</p>
                                <ul className="list-disc pl-6 mt-2 space-y-2">
                                    <li>Exceptional Circumstances: Refunds may be considered in the event of documented illness, emergency situations, or other exceptional cases beyond the student's control.</li>
                                    <li>Service Errors: If SBCODL is responsible for errors such as incorrect program enrollment or technical issues preventing access to the course.</li>
                                    <li>Non-Participation in Course: Refund requests based solely on non-participation or failure to engage with the course material will not be entertained.</li>
                                </ul>
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="refund-process">
                            <AccordionTrigger className="text-left">How to Request a Refund</AccordionTrigger>
                            <AccordionContent className="text-gray-800 bg-foreground p-4 rounded-md">
                                <p>If you wish to request a refund, please send an email to refundsbcodl@gmail.com with the following details:</p>
                                <ul className="list-disc pl-6 mt-2 space-y-2">
                                    <li>Your full name</li>
                                    <li>Program/course enrolled in</li>
                                    <li>Date of payment</li>
                                    <li>Reason for refund request</li>
                                    <li>Any supporting documentation for exceptional circumstances</li>
                                </ul>
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="processing-details">
                            <AccordionTrigger className="text-left">Processing & Non-Refundable Items</AccordionTrigger>
                            <AccordionContent className="text-gray-800 bg-foreground p-4 rounded-md">
                                <p className="mb-2">Approved refunds will be processed within 10 business days. The refund will be issued to the original method of payment used.</p>
                                <p>Certain fees, including but not limited to registration fees, administrative costs, and materials fees, are non-refundable.</p>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </CardContent>
            </Card>

            {/* Footer */}
            <div className="mt-8 text-center text-gray-800">
                <p>For questions or concerns, please contact us at sbcodlautomousboard@gmail.com</p>
            </div>
        </div>
    );
};

export default PrivacyPolicy;