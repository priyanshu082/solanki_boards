
import ImageCard from './ImageCard'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'

// Image imports remain the same as in the original file
// import primaryYearsImage from '../../assets/images/img2.jpeg'
// import middleYearsImage from '../../assets/images/img4.jpeg'
import upperYearsImage from '../../assets/images/img16.jpeg'
import diplomaProgrammeImage from '../../assets/images/img6.jpeg'
import certificateProgrammeImage from '../../assets/images/img1.jpeg'
import researchProgrammeImage from '../../assets/images/img11.jpeg'

const SCHOOL_SECTIONS = [
    // {
    //     title: 'Middle Years Programme',
    //     image: primaryYearsImage
    // },
    // {
    //     title: 'Upper Years Programme', 
    //     image: middleYearsImage
    // },
    {
        title: 'Under Graduate Programme',
        image: upperYearsImage
    },
    {
        title: 'Post Graduate Programme',
        image: diplomaProgrammeImage
    },
    {
        title: 'Diploma Programme',
        image: certificateProgrammeImage
    },
    {
        title: 'Research Programme',
        image: researchProgrammeImage
    }
]

const SchoolSection = () => {
    return (
        <div className='flex flex-col md:flex-row p-4 md:p-8 lg:p-12 w-full gap-8 md:gap-12 bg-primary/20'>
            {/* Left content column */}
            <div className='w-full flex flex-col justify-start md:sticky md:top-24 md:self-start mb-8 md:mb-0'>
                <div className='text-2xl md:text-3xl lg:text-4xl font-light tracking-wider text-gray-600 leading-tight'>
                    Welcome to Solanki Brothers Council for Open and Distance Learning,
                    <p className='text-2xl md:text-3xl lg:text-4xl font-bold mt-3 text-gray-800'>
                        "Bridging Today's Classroom to Tomorrow's Dynamic Workplace"
                    </p>
                </div>
                
                <div className='text-sm 2xl:text-xl font-light tracking-wider text-gray-700 mt-6 leading-relaxed'>
                    <p>
                        The Solanki Brothers Council for Open and Distance Learning (SBCODL) was established and incorporated by the Uttar Pradesh legislature and is accredited by the International Accreditation/ Membership. SBCODL embodies the futuristic vision of a young India, driven by emerging trends and skill development.
                    </p>
                    <p className='mt-4'>
                        With substantial cooperation from the government, industry, and academia, technology-enabled learning has shifted the emphasis towards skill-led education.
                    </p>
                    <p className='mt-4'>
                        SBCODL focuses on academic, vocational, professional, technical, and life skill areas to promote skill development and societal enrichment for its students through traditional and non-traditional programs. We are committed to creating an environment where ideas, enthusiasm, and hard work come together to help students shape the future they desire.
                    </p>
                    <p className='mt-4'>
                        Our technology-enabled learning environment, industry-experienced faculty, simulated virtual lab experiences, transdisciplinary choice-based learning, observer ships, internships, apprenticeships, and industry placements are key differentiators of SBCODL education.
                    </p>
                    <p className='mt-4'>
                        Located in Eastern Uttar Pradesh, SBCODL provides students, alumni, and the local community with the essential skills to thrive in the new digital world. Our focus remains on empowering learners to navigate and excel in today's dynamic professional landscape.
                    </p>
                </div>
                
                <div className='flex flex-col sm:flex-row gap-4 mt-8'>
                    <Link to="/chairman-message" className="w-full sm:w-auto">
                        <Button 
                            variant='outline' 
                            className='bg-blue-600 hover:bg-blue-700 text-white border-blue-600 hover:border-blue-700 px-6 py-3 text-base font-medium transition-colors duration-200 w-full'
                        >
                            Chairman's Message
                        </Button>
                    </Link>

                    <Link to="/learn-more" className="w-full sm:w-auto">
                        <Button 
                            variant='outline' 
                            className='bg-gray-700 hover:bg-gray-800 text-white border-gray-700 hover:border-gray-800 px-6 py-3 text-base font-medium transition-colors duration-200 w-full'
                        >
                            Learn More
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Right column with scrollable images */}
            <div className='w-full md:w-3/5 flex flex-col gap-4  justify-center items-center'>
                {SCHOOL_SECTIONS.map((section, index) => (
                    <div key={index} className='w-full transition-transform duration-300 hover:scale-105 bg-yellow-400 flex flex-col justify-center items-center'>
                        <ImageCard
                            item={{
                                image: section.image,
                                desc1: section.title,
                            }}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default SchoolSection