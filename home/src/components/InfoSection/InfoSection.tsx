// import ImageCardInfoSection from './ImageCardInfoSection'
// import img1 from "../../assets/images/img1.jpeg"
// import img2 from "../../assets/images/img2.jpeg"
// import img3 from "../../assets/images/img3.jpeg"
import { Link } from 'react-router-dom';

const InfoSection = () => {
  return (
    <div className="flex flex-col w-full items-center justify-center gap-12 py-16 border-y">
      <div className='flex flex-col items-center max-w-4xl text-center px-4'>
        <h1 className="text-4xl font-bold text-primary font-serif mb-4">
          Admission Options at SBCODL
        </h1>
        <p className='text-lg text-primary font-medium mb-8'>
          Hassle-free, seamless and secure admission procedures at SBCODL. Candidates need to fill the registration form to take direct online admission on website.
        </p>

        {/* Admission Blocks */}
        <div className="grid md:grid-cols-2 gap-8 w-full mb-12">
          {/* Block 1 */}
          <div className=' border-2 p-2 rounded-md h-fit'>
          <div className="border-2 border-primary rounded-lg p-4 bg-white">
            <h2 className="text-2xl font-bold text-primary mb-4">Block 1</h2>
            <ul className="space-y-2 text-gray-700">
              <li>• Registration: 1st March to 31st August</li>
              <li>• Examination: May-June</li>
              {/* <li>• For next year admission</li> */}
            </ul>
          </div>
            </div>
         

          {/* Block 2 */}
          <div className=' border-2 p-2 rounded-md h-fit'>
          <div className="border-2 border-primary rounded-lg p-4 bg-white">
            <h2 className="text-2xl font-bold text-primary mb-4">Block 2</h2>
            <ul className="space-y-2 text-gray-700">
              <li>• Registration:1st September to 28/29th February</li>
              <li>• Examination: November-December</li>
              {/* <li>• Same year admission</li> */}
            </ul>
          </div>
          </div>
        
        </div>

        <div className="flex flex-col items-center gap-4 mb-8 px-4">
          <p className="text-gray-700 text-center">
            For admission in Middle Programmes,Upper Programmes, Diploma,Undergraduate ,Postgraduate and Certificate Courses, candidates are required to submit scanned copies
            of original documents listed while registering for admission. To see the list of documents click below.
          </p>
          <Link to="/admission">
          
          <button className="px-6 py-2 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors">
            Read More
          </button>
          </Link>
        </div>
      </div>

     
    </div>
  );
};

export default InfoSection;