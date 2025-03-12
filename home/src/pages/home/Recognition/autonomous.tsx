import { Card, CardContent } from "../../../components/ui/card"
import { Separator } from "../../../components/ui/separator"

const Autonomous = () => {
  return (
    <div className="px-4 py-12 bg-gray-50 text-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl w-fit p-4 mx-auto rounded-md bg-primary text-white font-bold mb-2 border-b-4 border-b-primary">
            Features of Autonomous Institutions
          </h1>
          <Separator className="w-24 h-1 bg-blue-600 mx-auto my-4" />
          <p className="text-blue-800 font-medium">Excellence through academic freedom and innovation</p>
        </div>

        {/* Introduction Section */}
        <Card className="mb-8 shadow-md border-t-4 border-t-blue-700">
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold mb-4 text-blue-200">Introduction</h2>
            <p className="text-lg leading-relaxed mb-4 ">
              Autonomous institutions have a vital role to play in the improvement of higher education by providing academic freedom, innovation, and self-regulation. The University Grants Commission (UGC) emphasizes the significance of autonomy in its XI Plan profile by expressing that institutions enjoying academic and operational freedom are more likely to excel and achieve greater credibility. Granting funds to such institutions also enhances their capability to undertake high-quality education and research.
            </p>
          </CardContent>
        </Card>

        {/* Need for Autonomy Section */}
        <Card className="mb-8 shadow-md border-l-4 border-l-indigo-600">
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold mb-4 text-blue-200">Need for Autonomy</h2>
            <p className="mb-4 ">
              Academic institutions that have the possibility of excellence are usually constrained in providing advanced courses because of inflexible affiliating patterns. The Education Commission (1964-66) underlined the need for teachers' academic freedom because it helps to create an environment conducive to intellectual progress. Absence of such an environment makes it difficult to attain academic excellence.
            </p>
            <p className="mb-4 bg-indigo-50 p-3 rounded-md text-indigo-800 border-l-4 border-indigo-500">
              Since students, teachers, and administrators are co-partners in the educational process, autonomy guarantees that they have a more active role to play in decision-making and curriculum formulation. Hence, the Education Commission (1964-66) suggested autonomy as a key instrument for inducing excellence in higher education.
            </p>
          </CardContent>
        </Card>

        {/* Objectives Section */}
        <Card className="mb-8 shadow-md border-r-4 border-r-emerald-600">
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold mb-4 text-emerald-700">Objectives of Autonomous Institutions</h2>
            <p className="mb-4 ">
              The National Policy on Education (1986-92) identified the following objectives for autonomous institutions:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4 ">
              <li>Autonomy to decide and set their own syllabi and courses of study.</li>
              <li>Redesign and restructure courses to address local and international demands.</li>
              <li>Formulate their admission procedure according to state reservation guidelines.</li>
              <li>Evolve independent procedures for student evaluation, conduct of examinations, and declaration of results.</li>
              <li>Develop learning outcomes and creativity using modern education technology.</li>
              <li>Develop projects for community services, extension work, and beneficiality to society.</li>
            </ul>
          </CardContent>
        </Card>

        {/* Special Features Section */}
        <Card className="mb-8 shadow-md bg-gradient-to-r from-cyan-50 to-white">
          <CardContent className="pt-6 text-primary">
            <h2 className="text-2xl font-bold mb-4 text-cyan-800">Special Features of an Autonomous Institution</h2>
            <p className="mb-4 ">
              Autonomous institutions have a number of benefits that differentiate them from affiliated colleges:
            </p>
            
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2 text-cyan-700">Curriculum and Course Structure:</h3>
              <ul className="list-disc pl-6 space-y-2 ">
                <li>They are free to initiate new diploma, certificate, undergraduate, and postgraduate courses without seeking the approval of an affiliating university.</li>
                <li>Colleges are allowed to modify and rename existing courses to suit the demands of industries and society.</li>
              </ul>
            </div>
            
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2 text-cyan-700">Examination System and Student Evaluation:</h3>
              <ul className="list-disc pl-6 space-y-2 ">
                <li>Autonomous institutions perform internal and external evaluation to mark student performance in a fair manner.</li>
                <li>A range of evaluation instruments is utilized, such as ongoing assessments, project evaluations, and semester tests.</li>
              </ul>
            </div>
            
            <div className="mb-4">
              <h3 className="text-xl font-semibold mb-2 text-cyan-700">Independent Governance:</h3>
              <ul className="list-disc pl-6 space-y-2 ">
                <li>They create their own academic institutions, which provide a seamless decision-making process.</li>
                <li>Financial planning and resource allocation flexibility increase institutional effectiveness.</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Examination System Section */}
        <Card className="mb-8 shadow-md border-b-4 border-b-purple-600">
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold mb-4 text-purple-700">Examination System in Autonomous Institutions</h2>
            <p className="mb-4 ">
              Assessment and examination in autonomous institutions is more inclusive and student-oriented than in conventional universities. The most important features are:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4 ">
              <li><span className="font-semibold">Continuous Internal Assessment (CIA):</span> Ongoing assignments, quizzes, and presentations are included in the final grade.</li>
              <li><span className="font-semibold">Semester Examinations:</span> Administered under the internal exam committee's supervision.</li>
              <li><span className="font-semibold">Technology Application:</span> Electronic grading systems, artificial intelligence-based assessment, and online evaluation tools improve the precision of results.</li>
            </ul>
            
            <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-500 mb-6 text-primary">
              <h3 className="text-xl font-semibold mb-2 text-purple-700">Controller of Examinations' Role</h3>
              <p className="mb-2 ">The Office of the Controller of Examinations oversees the effective implementation of academic evaluations, including:</p>
              <ul className="list-disc pl-6 space-y-1 ">
                <li>Organizing semester exams and redressal of grievances.</li>
                <li>Coordination of submission of assignments and other examinations.</li>
                <li>Overseeing valuation, tabulation, and preparation of grade cards.</li>
              </ul>
            </div>
            
            <div className="bg-purple-50 p-4 rounded-lg border-r-4 border-purple-500 text-primary">
              <h3 className="text-xl font-semibold mb-2 text-purple-700">Declaration of Results</h3>
              <ul className="list-disc pl-6 space-y-1 ">
                <li><span className="font-semibold">Moderation Committee:</span> Cross-checks results and identifies inconsistencies.</li>
                <li><span className="font-semibold">Academic Evaluation Committee (AEC):</span> sanctions results prior to their publication.</li>
                <li>Results are formally declared on institutional websites and internal portals.</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Committees Section */}
        <Card className="mb-8 shadow-md">
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold mb-4 text-rose-700">Statutory and Non-Statutory Committees in Autonomous Institutions</h2>
            <p className="mb-4 ">
              In order to ensure quality and efficiency, autonomous institutions operate with diverse statutory and non-statutory committees:
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 mb-4 text-primary">
              <div className="bg-rose-50 p-4 rounded-lg border-t-4 border-rose-500">
                <h3 className="text-xl font-semibold mb-3 text-rose-700">Statutory Committees</h3>
                <ul className="list-disc pl-6 space-y-2 ">
                  <li><span className="font-semibold">Board of Governors (BOG)</span> – Has jurisdiction over overall policy and decision-making.</li>
                  <li><span className="font-semibold">Academic Council</span> – Directs academic affairs, curriculum design, and evaluation.</li>
                  <li><span className="font-semibold">Finance Committee</span> – Oversees financial planning and budgeting.</li>
                  <li><span className="font-semibold">Board of Studies</span> – Develops and revises course syllabi.</li>
                  <li><span className="font-semibold">Controller of Examinations</span> – Conducts examination procedures.</li>
                  <li><span className="font-semibold">Academic Audit Committee</span> – Undertakes regular academic quality audits.</li>
                </ul>
              </div>
              
              <div className="bg-rose-50 p-4 rounded-lg border-b-4 border-rose-500">
                <h3 className="text-xl font-semibold mb-3 text-rose-700">Non-Statutory Committees</h3>
                <ul className="list-disc pl-6 space-y-2 ">
                  <li><span className="font-semibold">Departmental Academic Committee</span> – Deals with academic affairs at the departmental level.</li>
                  <li><span className="font-semibold">Grievance Redressal Committee</span> – Resolves student and faculty grievances.</li>
                  <li><span className="font-semibold">Research and Development Committee</span> – Promotes innovation and faculty research.</li>
                  <li><span className="font-semibold">Administrative Quality Circle</span> – Facilitates operational efficiency.</li>
                  <li><span className="font-semibold">Planning & Evaluation Committee</span> – Evaluates institutional performance and formulates future objectives.</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Short-Term Courses Section */}
        <Card className="mb-8 shadow-md border-l-4 border-l-amber-600">
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold mb-4 text-amber-700">Autonomy to Provide Short-Term Courses</h2>
            <ul className="list-disc pl-6 space-y-2 mb-4 ">
              <li>Autonomous institutions enjoy the autonomy to provide need-based short-term courses focusing on skill development.</li>
              <li>These courses are available to students and professionals outside the institution as well.</li>
              <li>Certificates and diplomas are awarded under the seal of the institution, thus maintaining authenticity.</li>
            </ul>
          </CardContent>
        </Card>

        {/* Quality Standards Section */}
        <Card className="mb-8 shadow-md border-r-4 border-r-teal-600">
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold mb-4 text-teal-200">Ensuring Quality Standards</h2>
            <p className="mb-4 ">
              A self-regulatory mechanism and quality control built into the system is mandatory. Autonomous institutions set up an Academic Evaluation Committee (AEC) to:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4 ">
              <li>Track academic progress.</li>
              <li>Present yearly reports and recommendations.</li>
              <li>Guarantee ongoing improvement in teaching practices and student results.</li>
            </ul>
          </CardContent>
        </Card>

        {/* Advantages Section */}
        <Card className="mb-8 shadow-md bg-gradient-to-r from-teal-50 to-white">
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold mb-4 text-teal-800">Advantages to Students and Teachers</h2>
            
            <div className="grid md:grid-cols-2 gap-6 mb-4 text-primary">
              <div className="bg-teal-50 p-4 rounded-lg border-l-4 border-teal-500">
                <h3 className="text-xl font-semibold mb-3 text-teal-700">To Students:</h3>
                <ul className="list-disc pl-6 space-y-2 ">
                  <li>Access to a vibrant curriculum designed in response to industry needs.</li>
                  <li>Free choice of learning routes, involving research projects and practical training.</li>
                  <li>Scope to receive certifications and diplomas in specializations.</li>
                  <li>Improved career opportunities because of current and industry-specific skills.</li>
                </ul>
              </div>
              
              <div className="bg-teal-50 p-4 rounded-lg border-r-4 border-teal-500">
                <h3 className="text-xl font-semibold mb-3 text-teal-700">For Faculty:</h3>
                <ul className="list-disc pl-6 space-y-2 ">
                  <li>Increased academic autonomy in course and research project design.</li>
                  <li>Access to collaboration with industries and foreign institutions.</li>
                  <li>Respect and prestige that comes with working in an autonomous institution.</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Conclusion Section */}
        <Card className="shadow-md border-t-4 border-t-blue-700">
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold mb-4 text-blue-200">Conclusion</h2>
            <p className="text-lg leading-relaxed mb-4 bg-blue-50 p-4 rounded-lg border-l-4 text-primary border-blue-600 ">
              The creation of autonomous institutions represents a major stride toward excellence in higher education. Through the development of academic freedom, curriculum design flexibility, and enhanced governance, these institutions better the quality of education and research. The model of autonomy promotes a student-focussed mechanism, enhanced faculty involvement, and conformity to global standards of education, thus ranking as the model of choice among aspiring learners and educators.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Autonomous