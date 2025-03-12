import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../../../components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../../components/ui/accordion";
import { Alert, AlertDescription } from "../../../components/ui/alert";

const PowersOfSBCODL = () => {
  const generalPowers = [
    "Conduct surveys and studies on various aspects of education and publish the findings.",
    "Make recommendations to the Central and State Governments, Universities, University Grants Commission, and recognized institutions regarding the formulation of educational plans and programs.",
    "Coordinate and monitor the development of education across the country.",
    "Establish norms for specific courses or training programs, including eligibility criteria, selection methods, duration, curriculum, and course content.",
    "Set guidelines for recognized institutions regarding new courses, physical and instructional facilities, staffing patterns, and qualifications.",
    "Define examination standards for educational qualifications, admission criteria, and course schemes.",
    "Establish regulations regarding tuition and other fees chargeable by recognized institutions.",
    "Promote and conduct research and innovation in education and disseminate the results.",
    "Periodically review the implementation of norms, guidelines, and standards, advising institutions accordingly.",
    "Develop and implement a performance appraisal system to ensure accountability in recognized institutions.",
    "Formulate and implement schemes for educational courses, identify institutions for development programs, and establish new institutions.",
    "Take necessary measures to prevent the commercialization of education."
  ];

  const inspectionCompliance = [
    "Conduct inspections of recognized institutions to ensure compliance with the provisions of this Act.",
    "Notify institutions about the date and process of inspection, allowing their participation.",
    "Share inspection findings with the institution and seek their feedback before recommending actions.",
    "Require institutions to report actions taken in response to inspection recommendations."
  ];

  return (
    <div className="min-h-screen bg-gray-50 ">
      <div className="bg-primary text-white p-8 shadow-lg">
        <div className=" mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-center mb-4">
            Powers of SBCODL
          </h1>
          <p className="text-lg text-center max-w-4xl mx-auto">
            The Solanki Brothers Council for Open and Distance Learning (SBCODL) is entrusted with 
            ensuring the planned and coordinated development of education while maintaining and 
            determining educational standards.
          </p>
        </div>
      </div>

      <main className=" mx-auto py-8 space-y-8 px-12">
        <Card className="">
          <CardHeader>
            <CardTitle className="text-2xl">General Powers</CardTitle>
            <CardDescription>
              To fulfill its objectives, the Council is empowered with the following general functions:
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div className="grid gap-4 ">
              {generalPowers.map((power, index) => (
                <Alert key={index} className="text-primary bg-white">
                  <AlertDescription>{power}</AlertDescription>
                </Alert>
              ))}
            </div>
          </CardContent>

        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Inspection and Compliance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {inspectionCompliance.map((item, index) => (
                <Alert key={index} className="text-primary bg-white">
                  <AlertDescription>{item}</AlertDescription>
                </Alert>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Affiliation and Examination Authority</CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1 ">
                <AccordionTrigger className="border-white">Examination Body Restrictions</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4">
                    <p>No examining body shall, after the appointed day:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Grant affiliation (provisional or otherwise) to any institution without recognition or permission from the Council.</li>
                      <li>Conduct examinations for any course or training offered by a non-recognized institution.</li>
                    </ul>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Consequences of Non-Compliance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 text-primary">
              <Alert className="text-primary bg-white">
                <AlertDescription>
                  If a recognized institution violates provisions of this Act, regulations, or conditions 
                  of recognition or permission, the Regional Committee may withdraw its recognition, 
                  recording reasons in writing.
                </AlertDescription>
              </Alert>
              <Alert className="text-primary bg-white">
                <AlertDescription>
                  The institution must be given a fair opportunity to present its case before any 
                  recognition withdrawal.
                </AlertDescription>
              </Alert>
              <Alert className="text-primary bg-white">
                <AlertDescription>
                  Recognition withdrawal takes effect at the end of the following academic session 
                  after notification.
                </AlertDescription>
              </Alert>
              <Alert className="text-primary bg-white">
                <AlertDescription>
                  Once recognition is withdrawn, the institution must discontinue the course, and 
                  the examining body must cancel its affiliation.
                </AlertDescription>
              </Alert>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default PowersOfSBCODL;