import React, { useEffect, useState } from "react";
import { FaUserGraduate, FaUniversity, FaSchool, FaGlobe } from "react-icons/fa";

type DataItem = {
  icon: JSX.Element;
  number: number;
  heading: string;
};

const NumberSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  
  const data: DataItem[] = [
    { icon: <FaUserGraduate size={40} />, number: 126, heading: "STUDENTS" },
    { icon: <FaUniversity size={40} />, number: 15, heading: "ACCREDITED INSTITUTES" },
    { icon: <FaSchool size={40} />, number: 9, heading: "SCHOOL MEMBERSHIPS" },
    { icon: <FaGlobe size={40} />, number: 12, heading: "GLOBAL MEMBERSHIPS" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById("number-section");
      if (section) {
        const rect = section.getBoundingClientRect();
        if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
          setIsVisible(true);
        }
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="flex flex-col border-t-[1px] w-full text-primary pt-6 border-b-[1px]">
 <div className="mb-4  text-center">
                <div className="relative inline-block px-24 py-4 bg-gradient-to-r from-blue-950  to-blue-900 text-white rounded-lg shadow-lg">
                    <h1 className="text-2xl md:text-5xl font-extrabold mb-2">
                        SBCODL
                    </h1>
                    <h2 className="text-sm md:text-xl font-semibold">
                        IN FIGURES
                    </h2>
                </div>
                
            </div>
 <div 
      id="number-section"
      className="bg-primary w-full text-blue-200 py-16 px-4 md:px-8 shadow-lg  "
    >
     
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center space-y-4 transform transition-transform hover:scale-105"
          >
            <div className="text-blue-200">{item.icon}</div>
            <h2 className="text-4xl font-bold">
              {isVisible ? <AnimatedNumber target={item.number} /> : 0}
            </h2>
            <p className="text-xl font-medium">{item.heading}</p>
          </div>
        ))}
      </div>
    </div>
    </div>
   
  );
};

type AnimatedNumberProps = {
  target: number;
};

const AnimatedNumber: React.FC<AnimatedNumberProps> = ({ target }) => {
  const [current, setCurrent] = useState<number>(0);
  
  useEffect(() => {
    let start = 0;
    const duration = 2000; // 2 seconds
    const increment = Math.ceil(target / (duration / 16)); // Approx. 60fps
    
    const interval = setInterval(() => {
      start += increment;
      if (start >= target) {
        start = target;
        clearInterval(interval);
      }
      setCurrent(start);
    }, 16);
    
    return () => clearInterval(interval);
  }, [target]);
  
  return <>{current}</>;
};

export default NumberSection;