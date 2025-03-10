import React from 'react';
import img from "../../assets/images/img11.jpeg"
import ContentComponent from '../../components/ContentComponent';
import { ArrowRight } from 'lucide-react';
import img1 from "../../assets/images/whyImg/whyimg1.jpeg"
import img2 from "../../assets/images/whyImg/whyimg2.jpeg"
import img3 from "../../assets/images/whyImg/whyimg3.jpeg"
import img4 from "../../assets/images/whyImg/whyimg4.jpeg"
import img5 from "../../assets/images/whyImg/whyimg5.jpeg"
import img6 from "../../assets/images/whyImg/whyimg6.jpeg"

const WhySBCODL: React.FC = () => {

  const content = [
    {
      image: img6,
      heading: "Mission & Vision",
      description: `According to the Vision and Mission of Solanki Brothers Council for Open and Distance Learning (SBCODL)
Vision
SBCODL envisages becoming the world's best institution on open and distance education by imparting quality education, skills, and confidence to the learners to learn and excel in the dynamic world. Through making learning affordable, accessible, and innovative, we want to bring that extra mile for education and ensure that students can excel academically and professionally, irrespective of their geographies or socio-economic backgrounds.

Mission
Our mission would redefine distance learning as: 

 Accessibility & Inclusivity Where Education Will Be Available to All Learners Regardless of Their Geographical Regions or Background: Equal Learning Opportunities. 

 High-Quality Education Structured and Globally Recognized Programs from K-12 through Higher Education: Academic Excellence. 

 Innovative Teaching Methods: Fully Integrated with Modern Digital Tools, Interactive Learning Content, and Personalized Academic Support: Student Engagement and Learning Retention Enhancement.

 Building Strategic Global Partnerships: Establishing Ties with International Accrediting Bodies, Universities, and Institutions in Order to Correspond With the Highest Educational Standards. 

 Life Long Learning and Careers Development Through Skills Acquisition and Knowledge Endowments in Meeting the Global Competitive Labour Market for Students: Professional Growth Entrepreneurship and Leadership.`
    },
    {
      image: img1,
      heading: "A Tradition of Quality Education",
      description: "As a globally recognized institution, SBCODL is dedicated to upholding the highest educational standards. Our curricula are regularly reviewed and updated to align with industry trends and global academic best practices. We ensure that our programs meet the evolving needs of learners and employers alike."
    },
    {
      image: img2,
      heading: "Empowering Educators and Students",
      description: "SBCODL believes in empowering educators through continuous professional development, training, and support. By equipping educators with the latest teaching strategies and technological tools, we ensure that they can effectively guide students toward academic success. Students benefit from a nurturing environment that encourages curiosity, creativity, and critical thinking."
    },
    {
      image: img3,
      heading: "Benefits for Schools/Institution Accreditation",
      description: `SBCODL offers comprehensive accreditation services that enable schools and educational institutions to achieve high educational standards and international recognition. The benefits of accreditation with SBCODL include:

Enhanced Credibility and Reputation: Accreditation establishes the institution’s commitment to delivering quality education.

Continuous Improvement: SBCODL provides ongoing support and guidance to help institutions maintain and improve their educational standards.

Global Recognition: Accredited institutions gain access to a global network of educational partners and resources.

Increased Student Enrollment: Accreditation assures parents and students of the institution’s credibility, leading to higher enrollment rates.

Professional Development: Educators receive training and development opportunities to enhance their teaching effectiveness.`
    },
    {
      image: img4,
      heading: "Why Schools/Institutions Should Join SBCODL?",
      description: `Becoming a member of SBCODL provides educational institutions with unparalleled opportunities for growth, development, and collaboration. Here are key reasons why schools and institutions should consider membership:

Access to Innovative Educational Resources: Members gain access to advanced teaching methodologies, research insights, and digital learning tools.

Networking Opportunities: Connect with a global community of educational leaders, experts, and peers.

Customized Support Services: SBCODL offers tailored solutions to help institutions address unique challenges and achieve their educational goals.

Recognition and Certification: Members receive official recognition for their commitment to quality education.

Professional Development for Educators: Exclusive workshops, seminars, and training sessions are available to enhance educator capabilities.

Collaborative Learning Opportunities: Partner with other institutions to develop joint programs, research initiatives, and knowledge-sharing platforms.
`
    },
    {
      image: img5,
      heading: "Conclusion",
      description: "The Solanki Brothers Council for Open and Distance Learning (SBCODL) stands as a beacon of quality education and innovation. With its comprehensive academic offerings, global recognition, and unwavering commitment to excellence, SBCODL empowers students, educators, and institutions to thrive in an ever-changing world. By fostering a culture of lifelong learning, SBCODL continues to shape the future of education, making it more inclusive, accessible, and impactful for all."
    }

  ]

  return (
    <div className="flex flex-col bg-white text-gray-800 px-4 lg:px-8 mx-auto w-full">
      {/* Top Section */}
      <div className="flex flex-col lg:flex-row">
        {/* heading */}
        <div className="p-4 lg:p-12 w-full lg:w-[45vw] text-2xl lg:text-4xl font-serif text-blue-800 font-light leading-8 lg:leading-[4vw]">
          ABOUT THE <br />
          SBCODL
        </div>

        {/* content of top */}
        <div className="p-4 lg:p-12 w-full leading-8 text-xl">
          The Solanki Brothers Council for Open and Distance Learning (SBCODL) is a pioneering autonomous educational body founded in 2022. It is a registered non-profit organization under Section 8 of the Companies Act, 2013, and holds ISO 9001:2015 certification, reflecting its commitment to quality education and operational excellence. SBCODL strives to provide innovative, accessible, and student-centric learning experiences that prepare learners for a dynamic global landscape.

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
          SBCODL emphasizes personalized and flexible learning experiences. Our approach integrates traditional values with modern technological advancements to ensure that students receive a holistic education. We leverage digital platforms, virtual classrooms, and interactive learning materials to create engaging and impactful learning environments.
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
        {content.map((item, index) => (
          <ContentComponent
            key={index}
            image={item.image}
            heading={item.heading}
            description={item.description}
          />
        ))}
      </div>

    </div>
  );
};

export default WhySBCODL;