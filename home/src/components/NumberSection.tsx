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
    { icon: <FaUserGraduate size={40} />, number: 1200, heading: "STUDENTS" },
    { icon: <FaUniversity size={40} />, number: 250, heading: "ACCREDITED INSTITUTES" },
    { icon: <FaSchool size={40} />, number: 500, heading: "SCHOOL MEMBERSHIPS" },
    { icon: <FaGlobe size={40} />, number: 75, heading: "GLOBAL MEMBERSHIPS" },
  ];

  // Track if the section is in view
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
    <div
      id="number-section"
      className="bg-blue-950 w-full text-white py-16 px-4 md:px-8"
    >
      <div className="  grid grid-cols-1 md:grid-cols-4 gap-8">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center space-y-4"
          >
            <div className="text-white">{item.icon}</div>
            <h2 className="text-4xl font-bold">
              {isVisible ? <AnimatedNumber target={item.number} /> : 0}
            </h2>
            <p className="text-xl font-medium">{item.heading}</p>
          </div>
        ))}
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
