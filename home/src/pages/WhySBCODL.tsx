import React from 'react';
import img from "../assets/images/img3.jpeg"
import ContentComponent from '../components/ContentComponent';
import { ArrowRight } from 'lucide-react';

// interface DropdownItem {
//   title: string;
//   content: string;
// }

// const dropdowns: DropdownItem[] = [
//   {
//     title: "Our Mission",
//     content: "To provide world-class education that empowers students to become global citizens and lifelong learners."
//   },
//   {
//     title: "Our Vision",
//     content: "To be the leading educational institution that nurtures innovative thinkers and compassionate leaders."
//   },
//   {
//     title: "Our Values",
//     content: "Excellence, Innovation, Integrity, Collaboration, and Global Mindedness guide everything we do."
//   }
// ];

const WhySBCODL: React.FC = () => {
  // const [openDropdown, setOpenDropdown] = useState<number | null>(null);

  // const toggleDropdown = (index: number): void => {
  //   setOpenDropdown(openDropdown === index ? null : index);
  // };

  return (
    <div className="flex flex-col bg-white text-gray-800 px-4 lg:px-8 mx-auto w-full">
      {/* Top Section */}
      <div className="flex flex-col lg:flex-row">
        {/* heading */}
        <div className="p-4 lg:p-12 w-full lg:w-[45vw] text-2xl lg:text-4xl font-serif text-blue-800 font-light leading-8 lg:leading-[4vw]">
          ABOUT THE <br/>
          SBCODL
        </div>
        
        {/* content of top */}
        <div className="p-4 lg:p-12 w-full leading-8 text-xl">
        The Solanki Brothers Council for Open and Distance Learning (SBCODL) is a recognized global leader in international education, committed to nurturing inquiring, knowledgeable, confident, and compassionate young individuals. Our programs empower students to take ownership of their learning journey and develop future-ready skills to thrive in a rapidly evolving world.
        </div>

       
      </div>

      {/* Lower Section */}
      <div className="flex flex-col lg:flex-row mt-4 lg:mt-8 bg-blue-200 rounded-tr-[7vw] rounded-lg">
        {/* Left Content Section */}
        <div className="w-full lg:w-[50vw] p-4 lg:p-12">
          {/* Lower Section Heading */}
          <h2 className="text-xl lg:text-2xl font-serif text-blue-950 font-semibold mb-4 lg:mb-4">
          Delivering Excellence in Student-Centric Learning
          </h2>

          {/* Lower Section Content */}
          <p className="mb-4 lg:mb-8 text-lg text-gray-700">
          
          SBCODL offers a seamless continuum of innovative, student-focused educational programs for learners aged 3 to 19. These programs are thoughtfully designed to foster well-rounded individuals who approach today’s challenges with optimism, adaptability, and an open mind.
          </p>

          <div className=" flex flex-col gap-2">
                        <div className="flex text-sm text-blue-500 cursor-pointer flex-row justify-between hover:scale-[101%] transition-all duration-500 ease-in-out">
                            <div>
                            Discover the Benefits of Offering SBCODL Programs at Your School/Institution
                            </div>
                            <ArrowRight />
                        </div>
                        <div className="border border-blue-500" />
                    </div>

          {/* Dropdowns */}
          {/* <div className="space-y-3 lg:space-y-4">
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
          </div> */}
        </div>

        {/* Right Image Section */}
        <div className="w-full lg:w-[50vw] p-4 lg:p-12 mt-4 lg:mt-0 rounded-4xl">
          <div className="h-[50vh] lg:h-[20vw] w-full bg-gray-200 rounded-lg overflow-hidden">
            <img
              src={img}
              alt="Educational Environment"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

<div className='bg-white w-full mt-32'>
<ContentComponent/>
<ContentComponent/>
<ContentComponent/>
<ContentComponent/>
</div>

    </div>
  );
};

export default WhySBCODL;