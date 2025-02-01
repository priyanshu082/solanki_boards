import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import img from "../assets/images/img3.jpeg"
import ContentComponent from '../components/ContentComponent';

interface DropdownItem {
  title: string;
  content: string;
}

const dropdowns: DropdownItem[] = [
  {
    title: "Our Mission",
    content: "To provide world-class education that empowers students to become global citizens and lifelong learners."
  },
  {
    title: "Our Vision",
    content: "To be the leading educational institution that nurtures innovative thinkers and compassionate leaders."
  },
  {
    title: "Our Values",
    content: "Excellence, Innovation, Integrity, Collaboration, and Global Mindedness guide everything we do."
  }
];

const WhySBCODL: React.FC = () => {
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);

  const toggleDropdown = (index: number): void => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  return (
    <div className="flex flex-col bg-white text-gray-800 px-4 lg:px-8 mx-auto w-full">
      {/* Top Section */}
      <div className="flex flex-col lg:flex-row">
        {/* heading */}
        <div className="p-4 lg:p-12 w-full lg:w-[45vw] text-xl lg:text-3xl font-serif text-blue-800 font-light leading-8 lg:leading-[4vw]">
          ABOUT THE <br/>
          Solanki brother solanki brother soalnki brother
        </div>
        
        {/* content of top */}
        <div className="p-4 lg:p-12 w-full leading-10 text-xl">
          The International Baccalaureate (IB) is a global leader in international education—
          developing inquiring, knowledgeable, confident, and caring young people. Our programmes 
          empower school-aged students to take ownership in their own learning and help them 
          develop future-ready skills to make a difference and thrive in a world that changes fast.
        </div>
      </div>

      {/* Lower Section */}
      <div className="flex flex-col lg:flex-row mt-4 lg:mt-8 bg-blue-200 rounded-tr-[7vw] rounded-lg">
        {/* Left Content Section */}
        <div className="w-full lg:w-[50vw] p-4 lg:p-12">
          {/* Lower Section Heading */}
          <h2 className="text-xl lg:text-2xl font-serif text-blue-950 font-semibold mb-4 lg:mb-4">
          Delivering a powerful continuum of student-centric learning for students aged 3-19 years.
          </h2>

          {/* Lower Section Content */}
          <p className="mb-4 lg:mb-8 text-sm lg:text-base text-gray-700">
            Our commitment to educational excellence spans decades, with a proven track record
            of nurturing students who go on to achieve remarkable success in their chosen fields.
            We believe in a holistic approach to education that combines academic rigor with
            personal development.
          </p>

          {/* Dropdowns */}
          <div className="space-y-3 lg:space-y-4">
            {dropdowns.map((dropdown: DropdownItem, index: number) => (
              <div key={index} className="border border-gray-800 rounded-lg">
                <button
                  onClick={() => toggleDropdown(index)}
                  className="w-full flex justify-between items-center p-3 lg:p-4 text-left hover:bg-blue-50 text-sm lg:text-base rounded-lg"
                  type="button"
                >
                  <span className="font-medium">{dropdown.title}</span>
                  {openDropdown === index ? (
                    <ChevronUp className="h-4 w-4 lg:h-5 lg:w-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="h-4 w-4 lg:h-5 lg:w-5 text-gray-500" />
                  )}
                </button>
                {openDropdown === index && (
                  <div className="p-3 lg:p-4 bg-gray-50 text-sm lg:text-base">
                    {dropdown.content}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right Image Section */}
        <div className="w-full lg:w-[50vw] p-4 lg:p-12 mt-4 lg:mt-0 rounded-4xl">
          <div className="h-[50vh] lg:h-full w-full bg-gray-200 rounded-lg overflow-hidden">
            <img
              src={img}
              alt="Educational Environment"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

<div className='bg-white w-full '>
<ContentComponent/>
<ContentComponent/>
<ContentComponent/>
<ContentComponent/>
</div>

    </div>
  );
};

export default WhySBCODL;