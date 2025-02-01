import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";

const SBCODLContent = () => {
  return (
    <div className=" pt-8 space-y-8 bg-white">
      {/* About Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-gray-300 text-3xl">About the Solanki Brothers Council for Open and Distance Learning (SBCODL)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            The Solanki Brothers Council for Open and Distance Learning (SBCODL) is a recognized global leader 
            in international education, committed to nurturing inquiring, knowledgeable, confident, and 
            compassionate young individuals. Our programs empower students to take ownership of their learning 
            journey and develop future-ready skills to thrive in a rapidly evolving world.
          </p>

          <h3 className="text-xl font-semibold text-gray-400">Delivering Excellence in Student-Centric Learning</h3>
          <p>
            SBCODL offers a seamless continuum of innovative, student-focused educational programs for 
            learners aged 3 to 19. These programs are thoughtfully designed to foster well-rounded individuals 
            who approach today's challenges with optimism, adaptability, and an open mind.
          </p>

          <h3 className="text-xl font-semibold text-gray-400">A Tradition of Quality Education</h3>
          <p>
            For over three years, SBCODL has provided a strong, consistent framework with the flexibility 
            to tailor education to meet diverse cultural and contextual needs. This adaptability ensures 
            students are equipped with the skills, knowledge, and resilience needed to navigate life's 
            complexities and contribute to their communities.
          </p>

          <h3 className="text-xl font-semibold text-gray-400">Empowering Educators and Students</h3>
          <p>
            Our programs prioritize the professional development of educators, enabling them to nurture 
            resilient and self-motivated learners. Through SBCODL's mission-driven approach, we prepare 
            students not only to excel academically but also to become active contributors to a better 
            and more sustainable world.
          </p>
        </CardContent>
      </Card>

      {/* Benefits Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-gray-300 text-3xl">Benefits for Schools/Institute Accreditation</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="font-semibold">Last updated: January 2025</p>
          
          <p>
            The Solanki Brothers Council for Open and Distance Learning (SBCODL) provides schools with 
            transformative benefits for upgrading their education standards and engagement globally.
          </p>

          <h3 className="text-xl font-semibold text-gray-400">Why Partner with SBCODL?</h3>
          <p>By being an SBCODL Global School, your institution will be able to have access to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>World-Class Educational Programmes: High-quality, student-centered curricula designed to 
                foster knowledgeable, inquisitive, and globally aware learners.</li>
            <li>Professional Development Excellence: A wealth of resources to support educators, including 
                collaborative learning communities and tailored training opportunities.</li>
            <li>A Global Network of Schools: Join a respected network of SBCODL Global Schools worldwide, 
                collaborating to share best practices and drive innovation in education.</li>
          </ul>
        </CardContent>
      </Card>

      {/* High-Performing Students Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-gray-300 text-3xl">High-Performing Students</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>Research underscores the benefits of SBCODL programmes:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Lower Education Programme, Middle Education Programme, and Upper School Programme students 
                performed better than their peers in the 2023-2024 International Schools' Assessment study.</li>
            <li>Diploma Programme graduates tend to graduate from college sooner than their peers, find 
                themselves better prepared for research-intensive courses, and succeed at handling heavy 
                workloads and managing time.</li>
          </ul>
        </CardContent>
      </Card>

      {/* Refund Policy Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-gray-300 text-3xl">Refund & Cancellation Policy for SBCODL</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-400">1. Introduction</h3>
          <p>
            At Solanki Brothers Council for Open and Distance Learning (SBCODL), we are committed to 
            making all our students and stakeholders' dealings with us completely open and user-friendly.
          </p>

          <h3 className="text-xl font-semibold text-gray-400">2. Refund Eligibility</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Withdrawal from a course prior to starting it.</li>
            <li>Error in fees transactions due to technical or administrative errors.</li>
            <li>Cancellation of a program by SBCODL.</li>
            <li>Exceptional circumstances with discretion, on an individual basis.</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-400">3. Cancellation and Refund Classes</h3>
          <h4 className="text-lg font-semibold mt-2">3.1 Pre-Enrolment Cancellation</h4>
          <p>
            If a student cancels his enrolment before the classes start, then the tuition fees will be 
            refunded after deducting a non-refundable processing fee of INR 1,000 or 5% of the total 
            fees paid, whichever is higher.
          </p>

          <h4 className="text-lg font-semibold mt-2 text-gray-400">3.2 Post-Registration Withdrawal</h4>
          <p>
            Where a withdrawal notice is received after commencement of classes, but within 10 days of 
            the term beginning, up to 50% of tuition fees may be refunded.
          </p>

          <h3 className="text-xl font-semibold text-gray-400">Contact Information</h3>
          <p>Email: solankibrotherinstitute@gmail.com</p>
          <p>Phone: 9997874343</p>
          <p>Website: www.sbiea.co.in</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default SBCODLContent;