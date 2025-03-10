import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../../../components/ui/accordion";

const CookiePolicy = () => {
    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8">
            {/* Header Section */}
            <div className="mb-8 text-center">
                <div className="relative inline-block px-6 py-4 bg-gradient-to-r from-blue-950 to-blue-900 text-white rounded-2xl shadow-lg">
                    <h1 className="text-3xl md:text-5xl font-extrabold mb-2">
                        SBCODL
                    </h1>
                    <h2 className="text-lg md:text-xl font-semibold">
                        Cookie Policy
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
                        Cookie Policy for SBCODL
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-gray-100 mb-6">
                        Last updated: September 2024 - This is the Cookie Policy for Solanki Brothers Council for Open and Distance Learning (SBCODL), accessible from https://www.sbiea.co.in and www.sbcodl.in
                    </p>

                    <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="what-are-cookies">
                            <AccordionTrigger className="text-left">
                                What Are Cookies
                            </AccordionTrigger>
                            <AccordionContent className="text-gray-800 bg-foreground p-2 rounded-md">
                                <p>As is common practice with almost all professional websites, this site uses cookies, which are tiny files that are downloaded to your computer to improve your experience. This page describes what information they gather, how we use it, and why we sometimes need to store these cookies.</p>
                                <p className="mt-2">For more general information on cookies, see the Wikipedia article on HTTP Cookies.</p>
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="cookie-usage">
                            <AccordionTrigger className="text-left">
                                How We Use Cookies
                            </AccordionTrigger>
                            <AccordionContent className="text-gray-800 bg-foreground p-2 rounded-md">
                                <p>We use cookies for a variety of reasons, detailed below. Unfortunately, in most cases, there are no industry-standard options for disabling cookies without completely disabling the functionality and features they add to this site.</p>
                                <p className="mt-2">It is recommended that you leave on all cookies if you are not sure whether you need them, in case they are used to provide a service that you use.</p>
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="cookie-types">
                            <AccordionTrigger className="text-left">
                                The Cookies We Set
                            </AccordionTrigger>
                            <AccordionContent className="text-gray-800 bg-foreground p-2 rounded-md">
                                <ul className="space-y-3">
                                    <li><strong>Account-related cookies:</strong> If you create an account with us, we will use cookies for the management of the signup process and general administration.</li>
                                    <li><strong>Login-related cookies:</strong> We use cookies when you are logged in, so we can remember this fact.</li>
                                    <li><strong>Form-related cookies:</strong> When you submit data through a form, cookies may be set to remember your user details for future correspondence.</li>
                                    <li><strong>Site preferences cookies:</strong> To provide you with a great experience on this site, we offer the functionality to set your preferences.</li>
                                </ul>
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="third-party">
                            <AccordionTrigger className="text-left">
                                Third-Party Cookies
                            </AccordionTrigger>
                            <AccordionContent className="text-gray-800 bg-foreground p-2 rounded-md">
                                <ul className="space-y-3">
                                    <li><strong>Google Analytics:</strong> This site uses Google Analytics to help us understand how you use the site and how we can improve your experience.</li>
                                    <li><strong>Social Media Sharing Cookies:</strong> Our site contains links to Facebook, Twitter, and other social media sites that enable you to share our content.</li>
                                </ul>
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="contact">
                            <AccordionTrigger className="text-left">
                                More Information
                            </AccordionTrigger>
                            <AccordionContent className="text-gray-800 bg-foreground p-2 rounded-md">
                                <p>If you need more information or have questions about our cookie policy, you can contact us:</p>
                                <ul className="mt-2 space-y-2">
                                    <li><strong>Email:</strong> sbcodlautomousboard@gmail.com</li>
                                    <li><strong>Phone:</strong> +91 9997874343</li>
                                </ul>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </CardContent>
            </Card>

            {/* Footer */}
            <div className="mt-8 text-center text-gray-800">
                <p>For additional information about our policies, please contact us</p>
            </div>
        </div>
    );
};

export default CookiePolicy;