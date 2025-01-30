import { Card, CardContent, CardTitle } from "@repo/ui/card";
import { Globe, Target, Handshake, Lightbulb, Rocket, School } from "lucide-react";

const ServicesSection = () => {
  const services = [
    {
      icon: <Globe className="w-10 h-10 text-white" />,
      title: "Established for Global Education",
      description: "Founded in 2022, SBCODL offers e-learning worldwide, breaking traditional classroom boundaries and ensuring accessibility."
    },
    {
      icon: <Target className="w-10 h-10 text-white" />,
      title: "Vision and Goals",
      description: "Combining modern and traditional methods, SBCODL provides globally recognized Undergraduate, Postgraduate, and Doctoral programs."
    },
    {
      icon: <Handshake className="w-10 h-10 text-white" />,
      title: "Global Partnerships",
      description: "SBCODL collaborates with international institutions to enhance education quality and provide global exposure for learners."
    },
    {
      icon: <Lightbulb className="w-10 h-10 text-white" />,
      title: "Innovative Learning Methods",
      description: "Holistic education is ensured through videos, animations, and resources to build critical, self-reliant learners."
    },
    {
      icon: <Rocket className="w-10 h-10 text-white" />,
      title: "Empowering Students Worldwide",
      description: "SBCODL focuses on personal and professional growth, encouraging innovative thinking and societal contributions."
    },
    {
      icon: <School className="w-10 h-10 text-white" />,
      title: "Join SBCODL Today",
      description: "Be part of SBCODL’s global learning community, where education has no boundaries and opportunities are limitless."
    }
  ];

  return (
    <div className="px-6 md:px-8 lg:px-12 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap -mx-3">
          {services.map((service, index) => (
            <div key={index} className=" md:w-1/2 lg:w-1/3 px-3 mb-6 flex flex-col ">
              <Card className="border shadow-sm hover:shadow-md transition-shadow ">
                <CardContent className="pt-6 ">
                  <div className="flex flex-col items-start text-start ">
                    <div className="mb-4">
                      {service.icon}
                    </div>
                    <CardTitle className="mb-3">{service.title}</CardTitle>
                    <p className="text-muted-foreground line-clamp-3">
                      {service.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesSection;